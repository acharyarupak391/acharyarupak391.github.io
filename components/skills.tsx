"use client"

import { useEffect, useRef, useState } from "react"

const skillCategories = [
  {
    title: "Frontend",
    color: "bg-neo-yellow",
    skills: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "React",
      "Next.js",
      "Gatsby",
      "AstroJS",
      "TypeScript",
      "Tailwind CSS",
      "SCSS",
    ],
  },
  {
    title: "Backend & API",
    color: "bg-neo-pink",
    skills: ["Node.js", "Express.js", "Python", "Flask", "Golang", "Gin", "PostgreSQL", "MongoDB", "GraphQL", "REST"],
  },
  {
    title: "Web3 & Blockchain",
    color: "bg-neo-blue",
    skills: ["Solidity", "Hardhat", "Ethers.js", "Web3.js", "IPFS", "Kubo", "Mocha", "Chai"],
  },
  {
    title: "ML & AI",
    color: "bg-neo-green",
    skills: ["TensorFlow", "Keras", "Scikit-learn", "Pandas", "CNN", "KNN", "Regression", "SVM"],
  },
  {
    title: "DevOps & Tools",
    color: "bg-neo-orange",
    skills: ["Docker", "AWS", "Azure", "Git", "GitHub", "Linux", "Shell", "Cypress", "Jest"],
  },
]

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="skills" className="py-20 md:py-32 px-4 bg-neo-blue">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block mb-6 px-6 py-3 bg-neo-yellow text-foreground border-4 border-foreground shadow-brutal transform rotate-2">
            <span className="font-bold uppercase tracking-widest">Tech Stack</span>
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black">
            MY
            <br />
            <span className="text-neo-yellow [-webkit-text-stroke:2px_black]">SKILLS</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, categoryIndex) => (
            <div
              key={category.title}
              className={`transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
              }`}
              style={{ transitionDelay: `${categoryIndex * 150}ms` }}
            >
              <div
                className={`${category.color} text-foreground p-6 border-4 border-foreground shadow-brutal h-full hover-brutal`}
                style={{
                  transform: `rotate(${categoryIndex % 2 === 0 ? "1deg" : "-1deg"})`,
                }}
              >
                <h3 className="text-xl md:text-2xl font-black mb-4 uppercase">{category.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <span
                      key={skill}
                      className={`px-3 py-1 bg-background text-foreground border-2 border-foreground font-mono text-sm font-bold transition-all duration-300 hover:bg-foreground hover:text-background ${
                        isVisible ? "opacity-100 scale-100" : "opacity-0 scale-0"
                      }`}
                      style={{
                        transitionDelay: `${categoryIndex * 150 + skillIndex * 50}ms`,
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
