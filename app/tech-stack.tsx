"use client"
import FadeDown from "@/components/animations/FadeDown"
import FadeUp from "@/components/animations/FadeUp"

export default function TechStack() {
  return (
    <section id="techstack" className="w-full max-w-7xl mx-auto py-24 md:py-32 cursor-default bg-background relative border-t border-text-secondary/10 overflow-hidden">
      <FadeDown>
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16 md:mb-24 w-full text-left">
          <h2 className="text-sm font-bold tracking-[0.2em] text-text-secondary uppercase mb-4">Skills & Tools</h2>
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-text-primary tracking-tighter">My Tech Stack</h3>
        </div>
      </FadeDown>

      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col gap-16">
        {techCategories.map((category, idx) => (
          <div key={idx} className="flex flex-col md:flex-row gap-8 md:gap-16 items-start">
            <div className="md:w-1/3">
              <FadeDown delay={idx * 0.1}>
                <h4 className="text-2xl font-black text-text-primary tracking-tight mb-2">{category.title}</h4>
                <p className="text-text-secondary font-medium text-sm">{category.description}</p>
              </FadeDown>
            </div>
            <div className="md:w-2/3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full">
              {category.technologies.map((tech, techIdx) => (
                <FadeUp key={techIdx} delay={idx * 0.1 + techIdx * 0.05}>
                  <div className="group flex flex-col items-center justify-center p-6 bg-thirdary/20 hover:bg-thirdary/50 border border-text-secondary/10 hover:border-text-primary/50 rounded-2xl transition-all duration-300 hover:-translate-y-2 h-full">
                    <div className="w-12 h-12 mb-4 transition-colors flex items-center justify-center pointer-events-none">
                      {tech.svg ? (
                        tech.svg.startsWith("<") ? (
                          <div className="w-full h-full" dangerouslySetInnerHTML={{ __html: tech.svg }} />
                        ) : (
                          <img src={tech.svg} alt={tech.name} className="w-full h-full tech-icon-img" />
                        )
                      ) : (
                        <div className="w-full h-full flex items-center justify-center font-bold text-xl bg-thirdary/50 rounded-lg">{tech.name.charAt(0)}</div>
                      )}
                    </div>
                    <span className="text-sm font-bold text-text-primary text-center">{tech.name}</span>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

const techCategories = [
  {
    title: "Frontend",
    description: "Frameworks and libraries for building interactive user interfaces.",
    technologies: [
      { name: "React.js", svg: "/icons/react.svg" },
      { name: "Next.js", svg: "/icons/nextjs.svg" },
      { name: "Tailwind CSS", svg: "/icons/tailwindcss.svg" },
      { name: "TypeScript", svg: "/icons/typescript.svg" },
      { name: "HTML5", svg: "/icons/html.svg" },
      { name: "CSS3", svg: "/icons/css.svg" },
      { name: "Framer Motion", svg: "/icons/framermotion.svg" },
    ],
  },
  {
    title: "Backend & AI/ML",
    description: "Server-side architectures, APIs, and Machine Learning.",
    technologies: [
      {
        name: "Python",
        svg: `<svg viewBox="0 0 128 128" class="w-full h-full"><path fill="#3776AB" d="M63.5 6.5C41.2 6.5 42.6 16.2 42.6 16.2l.1 10.1h21.4v3.1H32.4S18.5 27.8 18.5 50.3c0 22.4 12.1 21.6 12.1 21.6h7.2v-10.2s-.4-12.1 12.1-12.1h20.8s11.5-.2 11.5-11.2V17.8s1.6-11.3-18.7-11.3zm-11.5 6.3c2.3 0 4.1 1.8 4.1 4.1s-1.8 4.1-4.1 4.1-4.1-1.8-4.1-4.1 1.8-4.1 4.1-4.1z"/><path fill="#FFD43B" d="M64.5 121.5c22.3 0 20.9-9.7 20.9-9.7l-.1-10.1H63.9v-3.1h31.7s13.9 1.6 13.9-20.9c0-22.4-12.1-21.6-12.1-21.6h-7.2v10.2s.4 12.1-12.1 12.1H47.3s-11.5.2-11.5 11.2v20.6s-1.6 11.3 18.7 11.3zm11.5-6.3c-2.3 0-4.1-1.8-4.1-4.1s1.8-4.1 4.1-4.1 4.1 1.8 4.1 4.1-1.8 4.1-4.1 4.1z"/></svg>`
      },
      { name: "Node.js", svg: "/icons/nodejs.svg" },
      { name: "Express.js", svg: "/icons/express.svg" },
      { name: "Laravel", svg: "/icons/laravel.svg" },
    ],
  },
  {
    title: "Databases & ORM",
    description: "Relational database management systems and Graph databases.",
    technologies: [
      { name: "MySQL", svg: "/icons/mysql.svg" },
      { name: "PostgreSQL", svg: "/icons/postgresql.svg" },
      { name: "Neo4j", svg: "/icons/neo4j.svg" },
    ],
  },
  {
    title: "Tools & Infrastructure",
    description: "Development tools, version control, and cloud deployment.",
    technologies: [
      { name: "Git", svg: "/icons/git.svg" },
      { name: "GitHub", svg: "/icons/github.svg" },
      { name: "Postman", svg: "/icons/postman.svg" },
      { name: "Vercel", svg: "/icons/vercel.svg" },
    ],
  },
]
