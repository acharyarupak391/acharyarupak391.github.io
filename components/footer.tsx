"use client";

import { EMAIL, GITHUB_PROFILE, LINKEDIN_PROFILE } from "@/lib/constants";
import { sendGAEvent } from "@next/third-parties/google";
import { Github, Linkedin, Mail, Heart } from "lucide-react";
import { useState, useEffect, useRef } from "react";

function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<"idle" | "playing" | "gameover">(
    "idle"
  );
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const GRID_SIZE = 20;
  const CANVAS_SIZE = 200;
  const CELL_SIZE = CANVAS_SIZE / GRID_SIZE;

  const gameLoopRef = useRef<number | null>(null);
  const snakeRef = useRef([{ x: 10, y: 10 }]);
  const directionRef = useRef({ x: 1, y: 0 });
  const foodRef = useRef({ x: 15, y: 10 });
  const scoreRef = useRef(0);
  const gameStateRef = useRef<"idle" | "playing" | "gameover">("idle");

  const generateFood = () => {
    let newFood: { x: number; y: number };
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
    } while (
      snakeRef.current.some((seg) => seg.x === newFood.x && seg.y === newFood.y)
    );
    return newFood;
  };

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas with dark background
    ctx.fillStyle = "#1a1a1a";
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    // Draw grid pattern
    ctx.strokeStyle = "#2a2a2a";
    ctx.lineWidth = 1;
    for (let i = 0; i <= GRID_SIZE; i++) {
      ctx.beginPath();
      ctx.moveTo(i * CELL_SIZE, 0);
      ctx.lineTo(i * CELL_SIZE, CANVAS_SIZE);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i * CELL_SIZE);
      ctx.lineTo(CANVAS_SIZE, i * CELL_SIZE);
      ctx.stroke();
    }

    // Draw food (pixelated)
    ctx.fillStyle = "#FF6B6B";
    ctx.fillRect(
      foodRef.current.x * CELL_SIZE + 1,
      foodRef.current.y * CELL_SIZE + 1,
      CELL_SIZE - 2,
      CELL_SIZE - 2
    );

    // Draw snake (pixelated)
    snakeRef.current.forEach((segment, index) => {
      ctx.fillStyle = index === 0 ? "#FFE156" : "#4ADE80";
      ctx.fillRect(
        segment.x * CELL_SIZE + 1,
        segment.y * CELL_SIZE + 1,
        CELL_SIZE - 2,
        CELL_SIZE - 2
      );
    });
  };

  const gameLoop = () => {
    if (gameStateRef.current !== "playing") return;

    const head = snakeRef.current[0];
    const newHead = {
      x: head.x + directionRef.current.x,
      y: head.y + directionRef.current.y,
    };

    // Wrap around walls
    if (newHead.x < 0) newHead.x = GRID_SIZE - 1;
    if (newHead.x >= GRID_SIZE) newHead.x = 0;
    if (newHead.y < 0) newHead.y = GRID_SIZE - 1;
    if (newHead.y >= GRID_SIZE) newHead.y = 0;

    // Check self collision
    if (
      snakeRef.current.some((seg) => seg.x === newHead.x && seg.y === newHead.y)
    ) {
      gameStateRef.current = "gameover";
      setGameState("gameover");

      // send score to GA
      sendGAEvent({ event: "snakeGameOver", value: scoreRef.current });

      setHighScore((prev) => Math.max(prev, scoreRef.current));
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
        gameLoopRef.current = null;
      }
      return;
    }

    snakeRef.current = [newHead, ...snakeRef.current];

    // Check food collision
    if (newHead.x === foodRef.current.x && newHead.y === foodRef.current.y) {
      scoreRef.current += 10;
      setScore(scoreRef.current);
      foodRef.current = generateFood();
    } else {
      snakeRef.current.pop();
    }

    draw();
  };

  const lastUpdateRef = useRef(0);
  const GAME_SPEED = 120; // ms per update

  const tick = (timestamp: number) => {
    if (gameStateRef.current !== "playing") return;

    if (timestamp - lastUpdateRef.current >= GAME_SPEED) {
      gameLoop();
      lastUpdateRef.current = timestamp;
    }

    gameLoopRef.current = requestAnimationFrame(tick);
  };

  const startGame = () => {
    // Reset game state
    snakeRef.current = [{ x: 10, y: 10 }];
    directionRef.current = { x: 1, y: 0 };
    foodRef.current = generateFood();
    scoreRef.current = 0;
    setScore(0);
    gameStateRef.current = "playing";
    setGameState("playing");
    lastUpdateRef.current = 0;

    draw();
    gameLoopRef.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameStateRef.current !== "playing") return;

      const keyMap: Record<string, { x: number; y: number }> = {
        ArrowUp: { x: 0, y: -1 },
        ArrowDown: { x: 0, y: 1 },
        ArrowLeft: { x: -1, y: 0 },
        ArrowRight: { x: 1, y: 0 },
        w: { x: 0, y: -1 },
        W: { x: 0, y: -1 },
        s: { x: 0, y: 1 },
        S: { x: 0, y: 1 },
        a: { x: -1, y: 0 },
        A: { x: -1, y: 0 },
        d: { x: 1, y: 0 },
        D: { x: 1, y: 0 },
      };

      const newDir = keyMap[e.key];
      if (newDir) {
        // Prevent 180-degree turns
        const currentDir = directionRef.current;
        if (newDir.x !== -currentDir.x || newDir.y !== -currentDir.y) {
          directionRef.current = newDir;
        }
        e.preventDefault();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, []);

  // Initial draw
  useEffect(() => {
    draw();
  }, []);

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative border-4 border-background shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)]">
        <canvas
          ref={canvasRef}
          width={CANVAS_SIZE}
          height={CANVAS_SIZE}
          className="block"
        />
        {gameState !== "playing" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80">
            {gameState === "gameover" && (
              <p className="text-neo-pink font-black text-sm mb-2 animate-pulse">
                GAME OVER!
              </p>
            )}
            <button
              onClick={() => {
                startGame();
                sendGAEvent({
                  event: "snakeGameStarted",
                  value: gameState === "idle" ? "first_time" : "replay",
                });
              }}
              className="px-4 py-2 bg-neo-yellow text-foreground border-2 border-background font-bold text-xs uppercase hover:bg-neo-green transition-colors"
            >
              {gameState === "idle" ? "Play Snake" : "Play Again"}
            </button>
          </div>
        )}
      </div>
      <div className="flex gap-4 text-xs font-mono">
        <span className="text-neo-green">Score: {score}</span>
        <span className="text-neo-yellow">Best: {highScore}</span>
      </div>
      {gameState === "playing" && (
        <p className="text-[10px] text-muted-foreground font-mono">
          Use Arrow Keys or WASD
        </p>
      )}
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 items-start">
          {/* Left - Branding */}
          <div className="text-center md:text-left">
            <h3 className="text-4xl md:text-5xl font-black mb-3">
              RUPAK<span className="text-neo-yellow">.</span>
            </h3>
            <p className="text-muted-foreground font-mono text-sm mb-6">
              Full Stack Developer
            </p>
            <div className="flex items-center justify-center md:justify-start gap-3">
              <a
                href={`mailto:${EMAIL}`}
                className="p-3 bg-neo-yellow text-foreground border-4 border-background hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transition-all"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href={GITHUB_PROFILE}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-neo-pink text-foreground border-4 border-background hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transition-all"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href={LINKEDIN_PROFILE}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-neo-blue text-foreground border-4 border-background hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transition-all"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Center - Snake Game */}
          <div className="flex flex-col items-center">
            <p className="text-sm font-bold uppercase tracking-wider text-neo-green mb-4">
              Take a Break
            </p>
            <SnakeGame />
          </div>

          {/* Right - Quick Links */}
          <div className="text-center md:text-right">
            <p className="text-sm font-bold uppercase tracking-wider text-neo-orange mb-4">
              Quick Links
            </p>
            <nav className="flex flex-col gap-2">
              {["About", "Experience", "Projects", "Skills", "Contact"].map(
                (link) => (
                  <a
                    key={link}
                    href={`#${link.toLowerCase()}`}
                    className="font-mono text-sm text-muted-foreground hover:text-neo-yellow transition-colors"
                  >
                    /{link.toLowerCase()}
                  </a>
                )
              )}
            </nav>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t-4 border-background/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="flex items-center gap-2 font-mono text-sm">
              Made with{" "}
              <Heart className="w-4 h-4 text-neo-pink fill-neo-pink animate-pulse" />{" "}
              by Rupak Acharya
            </p>
            <p className="font-mono text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} All rights reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
