"use client"
import Image from "next/image"
import { useRef, useState, useEffect } from "react"
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion"
import FadeDown from "@/components/animations/FadeDown"

interface ExperienceImage {
  src: string
  fullSrc?: string
  alt: string
  title: string
}

interface ExperienceItem {
  id: number
  company: string
  role: string
  date: string
  description: string
  skills: string[]
  images?: ExperienceImage[]
}

const experiences: ExperienceItem[] = [
  {
    id: 1,
    company: "MPStore SuperApps",
    role: "Back-End Developer",
    date: "Juli 2025 - September 2025",
    description: "Bertanggung jawab merancang dan mengembangkan arsitektur backend untuk Web Panel internal perusahaan. Membangun RESTful API dengan Express.js, mengelola integritas basis data, melakukan pengujian menyeluruh via Postman, serta berkolaborasi aktif mengintegrasikan API dengan Frontend React.js.",
    skills: ["Express.js", "RESTful API", "MySQL", "Postman", "React.js"],
    images: [
      {
        src: "/images/experience/mpstore-certificate.jpg",
        fullSrc: "/images/experience/mpstore-certificate.jpg",
        alt: "Sertifikat Magang MPStore SuperApps - Farish Ilham Syahrani",
        title: "Sertifikat Magang Industri",
      },
      {
        src: "/images/experience/mpstore-team.jpg",
        fullSrc: "/images/experience/mpstore-team-full.jpg",
        alt: "Foto Bersama Tim Magang MPStore SuperApps",
        title: "Foto Bersama Tim",
      },
    ],
  },
]

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [selectedImage, setSelectedImage] = useState<ExperienceImage | null>(null)

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (selectedImage !== null) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [selectedImage])

  // Track scroll position of the entire section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  })

  // Add a slight spring physics to the line growth for smoothness
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <>
      <section id="experience" className="w-full max-w-7xl mx-auto py-24 md:py-32 cursor-default bg-background relative border-t border-text-secondary/10" ref={containerRef}>
        <FadeDown>
          <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16 md:mb-24 w-full text-left">
            <h2 className="text-sm font-bold tracking-[0.2em] text-text-secondary uppercase mb-4">Career Path</h2>
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-text-primary tracking-tighter">Work Experience</h3>
          </div>
        </FadeDown>

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative group/list flex flex-col">
          {experiences.map((exp, index) => {
            return (
              <motion.div key={exp.id} initial={{ opacity: 0, y: 40, filter: "blur(5px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, delay: index * 0.1 }} className="group/item relative grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8 p-6 md:p-8 -mx-6 md:-mx-8 rounded-2xl transition-all duration-500 hover:!opacity-100 hover:!blur-none group-hover/list:opacity-40 group-hover/list:blur-[2px] hover:bg-text-secondary/5 hover:shadow-lg border border-transparent hover:border-text-secondary/10">

                {/* Left Column: Date */}
                <div className="md:col-span-1 pt-1 md:pt-2">
                  <span className="text-xs font-bold tracking-widest text-text-secondary uppercase">{exp.date}</span>
                </div>

                {/* Right Column: Details */}
                <div className="md:col-span-3 flex flex-col">
                  <h4 className="text-2xl font-bold text-text-primary tracking-tight mb-1 group-hover/item:text-text-primary transition-colors">{exp.role}</h4>
                  <h5 className="text-sm font-bold text-text-secondary tracking-wide uppercase mb-6">{exp.company}</h5>

                  <p className="text-base text-text-secondary font-medium leading-relaxed mb-6">{exp.description}</p>

                  {/* Uniform Experience Images Gallery */}
                  {exp.images && exp.images.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                      {exp.images.map((img, imgIdx) => (
                        <div
                          key={imgIdx}
                          onClick={() => setSelectedImage(img)}
                          className="group/img relative rounded-2xl overflow-hidden border border-text-secondary/15 bg-thirdary/40 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1"
                        >
                          <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/5 dark:bg-white/5">
                            <Image
                              src={img.src}
                              alt={img.alt}
                              fill
                              className="object-cover object-center group-hover/img:scale-105 transition-transform duration-500"
                              sizes="(max-width: 768px) 100vw, 400px"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-end p-3.5">
                              <span className="text-white text-xs font-bold flex items-center gap-1.5 drop-shadow-md">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                Klik untuk memperbesar
                              </span>
                            </div>
                          </div>
                          <div className="px-4 py-2.5 bg-background/90 backdrop-blur-xs border-t border-text-secondary/10 flex items-center justify-between">
                            <span className="text-xs font-bold text-text-primary tracking-tight">{img.title}</span>
                            <span className="text-[10px] uppercase font-bold text-text-secondary tracking-widest bg-text-secondary/10 px-2 py-0.5 rounded">Lihat</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map((skill, i) => (
                      <span key={i} className="text-xs font-bold bg-background md:bg-thirdary text-text-primary px-3 py-1.5 rounded-lg border border-text-secondary/10 uppercase tracking-wider group-hover/item:bg-background transition-colors duration-300">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md cursor-pointer"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-4xl max-h-[90vh] w-full bg-background rounded-2xl border border-text-secondary/20 shadow-2xl overflow-hidden flex flex-col cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-text-secondary/10 bg-background/80 backdrop-blur-md">
                <h4 className="text-base font-bold text-text-primary">{selectedImage.title}</h4>
                <button
                  onClick={() => setSelectedImage(null)}
                  className="p-2 rounded-full hover:bg-text-secondary/10 text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
                  aria-label="Tutup modal"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="relative flex-1 min-h-[300px] sm:min-h-[450px] md:min-h-[550px] bg-black/5 dark:bg-black/30 p-2 sm:p-4 flex items-center justify-center">
                <div className="relative w-full h-full min-h-[300px] sm:min-h-[450px] md:min-h-[550px]">
                  <Image
                    src={selectedImage.fullSrc || selectedImage.src}
                    alt={selectedImage.alt}
                    fill
                    className="object-contain"
                    sizes="(max-width: 1024px) 100vw, 1000px"
                    priority
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
