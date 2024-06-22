import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AboutMe from "@/components/AboutMe";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Education from "@/components/Education";
import Trainings from "@/components/Trainings";
import Contact from "@/components/Contact";
import SEO from "@/components/SEO";
import Projects from "@/components/Projects";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div
      className={`bg-bgPrimary text-blueAccent font-firacode ${inter.className}`}
    >
      <section className="max-w-screen-xl mx-auto">
        <SEO />
        <Header />
        <Hero />
        <AboutMe />
        <Experience />
        <Skills />
        <Projects />
        <Education />
        <Trainings />
        <Contact />
      </section>
    </div>
  );
}
