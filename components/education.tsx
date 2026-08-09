"use client"

import { useEffect, useRef, useState } from "react"
import { Award, BookOpen, GraduationCap } from "lucide-react"

const education = [
  {
    institution: "Malla Reddy College of Engineering & Technology",
    degree: "B.Tech in Computer Science & Engineering",
    location: "Hyderabad, India",
    year: "Jan 2020",
    icon: GraduationCap,
  },
  {
    institution: "Kalika H.S.S",
    degree: "Intermediate Degree, Science",
    location: "Butwal, Nepal",
    year: "Mar 2016",
    icon: BookOpen,
  },
  {
    institution: "Axis International School",
    degree: "School Leaving Certificate (SLC)",
    location: "Butwal, Nepal",
    year: "Aug 2014",
    icon: BookOpen,
  },
]

const certifications = [
  {
    name: "Full-Stack JavaScript Developer",
    issuer: "IBM",
    year: "Aug 2021",
    color: "bg-neo-blue",
  },
  {
    name: "Introduction To TensorFlow In Python",
    issuer: "Datacamp",
    year: "May 2020",
    color: "bg-neo-pink",
  },
  {
    name: "Machine Learning With Python",
    issuer: "Microsoft",
    year: "Jun 2019",
    color: "bg-neo-orange",
  },
]

export function Education() {
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
    <section ref={sectionRef} id="education" className="py-20 md:py-32 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Education */}
          <div>
            <div className="mb-8">
              <div className="inline-block mb-4 px-6 py-3 bg-neo-yellow border-4 border-foreground shadow-brutal transform rotate-1">
                <span className="font-bold uppercase tracking-widest flex items-center gap-2">
                  <GraduationCap className="w-5 h-5" />
                  Education
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black">
                ACADEMIC
                <br />
                <span className="text-neo-blue [-webkit-text-stroke:2px_black]">JOURNEY</span>
              </h2>
            </div>

            <div className="space-y-4">
              {education.map((edu, index) => (
                <div
                  key={edu.institution}
                  className={`bg-card p-6 border-4 border-foreground shadow-brutal group cursor-pointer transition-all duration-300 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-1 hover:-translate-y-1 ${
                    isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-20"
                  }`}
                  style={{
                    transitionDelay: `${index * 150}ms`,
                    transform: isVisible ? `rotate(${index % 2 === 0 ? "0.5deg" : "-0.5deg"})` : "none",
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-neo-yellow border-3 border-foreground transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                      <edu.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-black mb-1">{edu.institution}</h3>
                      <p className="font-bold text-muted-foreground">{edu.degree}</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className="px-2 py-1 bg-foreground text-background font-mono text-xs">{edu.year}</span>
                        <span className="px-2 py-1 bg-neo-pink border-2 border-foreground font-mono text-xs">
                          {edu.location}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <div className="mb-8">
              <div className="inline-block mb-4 px-6 py-3 bg-neo-pink border-4 border-foreground shadow-brutal transform -rotate-1">
                <span className="font-bold uppercase tracking-widest flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Certifications
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black">
                VERIFIED
                <br />
                <span className="text-neo-green [-webkit-text-stroke:2px_black]">CREDENTIALS</span>
              </h2>
            </div>

            <div className="space-y-4">
              {certifications.map((cert, index) => (
                <div
                  key={cert.name}
                  className={`${cert.color} p-6 border-4 border-foreground shadow-brutal group cursor-pointer transition-all duration-300 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-1 hover:-translate-y-1 ${
                    isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-20"
                  }`}
                  style={{
                    transitionDelay: `${index * 150 + 300}ms`,
                    transform: isVisible ? `rotate(${index % 2 === 0 ? "-1deg" : "1deg"})` : "none",
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-black mb-2">{cert.name}</h3>
                      <p className="font-bold">
                        <span className="bg-background px-2 py-1 border-2 border-foreground transition-colors duration-200 group-hover:bg-neo-yellow">
                          {cert.issuer}
                        </span>
                      </p>
                    </div>
                    <span className="px-3 py-1 bg-foreground text-background font-mono text-sm font-bold transition-transform duration-200 group-hover:scale-105">
                      {cert.year}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
