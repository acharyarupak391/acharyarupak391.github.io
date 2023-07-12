import "./App.css";
import AboutMe from "./components/AboutMe";
import Contact from "./components/Contact";
import Education from "./components/Education";
import Experience from "./components/Experience";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Trainings from "./components/Trainings";

function App() {
  return (
    <div className="bg-bgPrimary  text-blueAccent font-firacode  ">
      <section className="max-w-[1440px] mx-auto">
        <Header />
        <Hero />
        <AboutMe />
        <Experience />
        <Skills />
        <Education />
        <Trainings />
        <Contact />
      </section>
    </div>
  );
}

export default App;
