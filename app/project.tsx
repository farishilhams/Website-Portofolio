"use client"
import Image from "next/image"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import FadeDown from "@/components/animations/FadeDown"
import FadeUp from "@/components/animations/FadeUp"
import ProjectCard from "@/components/ProjectCard"
import { projectList, type ProjectItem } from "@/data/projects"

export { projectList }
export type { ProjectItem }

export default function Project() {
  const [isOpen, setIsOpen] = useState<number | null>(null)
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null)
  const [flashingCardId, setFlashingCardId] = useState<string | null>(null)
  const mobileSliderRef = useRef<HTMLDivElement>(null)

  // Handler seleksi project: mengisolasi kilatan HANYA pada kartu yang diklik/disentuh
  const handleSelectProject = (project: ProjectItem, cardKey?: string) => {
    // 1. Kunci ID instance kartu unik untuk efek kilatan eksklusif pada kartu tersebut (desktop maupun mobile)
    setActiveProjectId(project.id)
    setFlashingCardId(cardKey || project.id)

    // 2. Berikan jeda mikro (180ms) agar kilatan cahaya terlihat jelas di layar sentuh mobile sebelum modal terbuka
    setTimeout(() => {
      setIsOpen(project.index)
    }, 180)

    // 3. Reset efek kilatan setelah durasi animasi berakhir
    setTimeout(() => {
      setFlashingCardId(null)
    }, 850)
  }

  // Touch event handlers untuk mobile touch agar tidak freeze setelah disentuh
  const handleTouchStart = () => {
    if (mobileSliderRef.current) {
      mobileSliderRef.current.style.animationPlayState = "paused"
    }
  }

  const handleTouchEnd = () => {
    if (mobileSliderRef.current) {
      mobileSliderRef.current.style.animationPlayState = "running"
    }
  }

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen !== null) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  const activeProject = projectList.find((p) => p.index === isOpen)

  return (
    <>
      <section id="projects" className="w-full max-w-7xl mx-auto py-24 md:py-32 cursor-default bg-background relative border-t border-text-secondary/10">
        <FadeDown>
          <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16 md:mb-24 w-full text-left">
            <h2 className="text-sm font-bold tracking-[0.2em] text-text-secondary uppercase mb-4">Portfolio</h2>
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-text-primary tracking-tighter">Selected Works</h3>
          </div>
        </FadeDown>

        {/* Desktop View: Grid */}
        <div className="hidden lg:grid max-w-7xl mx-auto grid-cols-3 gap-8 px-6 md:px-12">
          {projectList.map((project, index) => {
            const cardKey = `desktop-${project.id}`
            return (
              <FadeUp key={cardKey}>
                <ProjectCard
                  project={project}
                  cardKey={cardKey}
                  isFlashing={flashingCardId === cardKey}
                  onSelect={handleSelectProject}
                  priority={index === 0}
                />
              </FadeUp>
            )
          })}
        </div>

        {/* Mobile & Tablet View: Infinite Loop Slider with Touch Pan */}
        <div className="lg:hidden w-full overflow-hidden relative py-4 touch-pan-x">
          <div
            ref={mobileSliderRef}
            className="flex w-max animate-infinite-scroll cursor-grab active:cursor-grabbing"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={handleTouchEnd}
          >
            <div className="flex gap-6 px-3">
              {projectList.map((project) => {
                const cardKey = `mobile1-${project.id}`
                return (
                  <div key={cardKey} className="w-[82vw] sm:w-[360px] md:w-[400px] flex-shrink-0 infinite-card-item">
                    <ProjectCard
                      project={project}
                      cardKey={cardKey}
                      isFlashing={flashingCardId === cardKey}
                      onSelect={handleSelectProject}
                      priority={true}
                    />
                  </div>
                )
              })}
            </div>

            <div className="flex gap-6 px-3">
              {projectList.map((project) => {
                const cardKey = `mobile2-${project.id}`
                return (
                  <div key={cardKey} className="w-[82vw] sm:w-[360px] md:w-[400px] flex-shrink-0 infinite-card-item">
                    <ProjectCard
                      project={project}
                      cardKey={cardKey}
                      isFlashing={flashingCardId === cardKey}
                      onSelect={handleSelectProject}
                      priority={true}
                    />
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <FadeUp>
          <div className="mt-16 flex justify-center w-full px-6">
            <a
              href="https://github.com/farishilhams"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-background border border-text-secondary/20 text-text-primary hover:border-text-primary hover:bg-text-primary hover:text-background rounded-xl font-bold tracking-widest text-sm uppercase transition-all duration-300 ease-out group hover:-translate-y-1.5 hover:scale-[1.02] shadow-sm hover:shadow-xl"
            >
              <span>View More Project</span>
              <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </FadeUp>

        {/* Modal Detail Proyek (View Details) */}
        <AnimatePresence>
          {isOpen !== null && activeProject && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-background/90 backdrop-blur-md"
                onClick={() => setIsOpen(null)}
              />

              {/* Modal Container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="bg-background border border-text-secondary/20 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl relative z-10"
              >
                {/* Modal Header */}
                <div className="flex justify-between items-center p-6 border-b border-text-secondary/10">
                  <div>
                    <span className="text-xs font-bold tracking-widest text-text-secondary uppercase block mb-1">
                      {activeProject.category}
                    </span>
                    <h4 className="text-2xl font-black text-text-primary tracking-tight">{activeProject.title}</h4>
                  </div>
                  <button
                    type="button"
                    className="text-text-secondary hover:text-text-primary transition-colors p-2 bg-text-secondary/5 rounded-full"
                    onClick={() => setIsOpen(null)}
                    title="Tutup Modal"
                  >
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>

                {/* Modal Content */}
                <div className="p-6 md:p-8 overflow-y-auto flex-grow custom-scrollbar">
                  {/* Project Image Preview Banner */}
                  <div className="relative overflow-hidden aspect-[16/9] bg-thirdary/15 rounded-2xl mb-8 border border-text-secondary/10 flex items-center justify-center p-2">
                    <Image src={activeProject.imagePath} alt={activeProject.title} fill className="object-contain p-2" priority />
                  </div>

                  {/* Metadata Row: Waktu Rilis & Teknologi */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8 pb-8 border-b border-text-secondary/10">
                    <div>
                      <span className="text-xs font-bold tracking-widest text-text-secondary uppercase block mb-3">Waktu Rilis</span>
                      <span className="text-sm font-bold bg-thirdary text-text-primary px-3 py-1.5 rounded-lg border border-text-secondary/10">{activeProject.createdAt}</span>
                    </div>
                    <div>
                      <span className="text-xs font-bold tracking-widest text-text-secondary uppercase block mb-3">Teknologi</span>
                      <div className="flex flex-wrap gap-2">
                        {activeProject.tech.map((tech, i) => (
                          <span key={i} className="text-xs font-bold bg-thirdary text-text-primary px-3 py-1.5 rounded-lg border border-text-secondary/10 uppercase tracking-wider">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Deskripsi Lengkap Proyek (Perbaikan render konten 'View Details') */}
                  <div className="mb-8 pb-8 border-b border-text-secondary/10">
                    <span className="text-xs font-bold tracking-widest text-text-secondary uppercase block mb-3">
                      Tentang Proyek
                    </span>
                    <div className="bg-thirdary/30 p-5 md:p-6 rounded-2xl border border-text-secondary/10 space-y-3">
                      <p className="text-sm md:text-base text-text-secondary font-medium leading-relaxed">
                        {activeProject.longDescription || activeProject.details || activeProject.description || activeProject.shortDescription}
                      </p>
                      {activeProject.details && (
                        <p className="text-xs md:text-sm text-text-secondary/80 leading-relaxed pt-3 border-t border-text-secondary/10">
                          <span className="font-bold text-text-primary">Implementasi Teknis: </span>
                          {activeProject.details}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Fitur Utama */}
                  <div>
                    <span className="text-xs font-bold tracking-widest text-text-secondary uppercase block mb-5">Fitur Utama</span>
                    <ul className="space-y-3.5">
                      {activeProject.features.map((feature, i) => (
                        <li key={i} className="flex items-start bg-thirdary/50 p-4 rounded-xl border border-text-secondary/5">
                          <span className="text-text-primary mr-3 font-black text-sm shrink-0">&rarr;</span>
                          <span className="text-sm font-bold text-text-primary uppercase tracking-wide">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="p-6 border-t border-text-secondary/10 flex flex-col sm:flex-row gap-4 bg-background">
                  <a href={activeProject.liveDemoUrl} target="_blank" rel="noopener noreferrer" className="flex-1 text-center font-bold text-sm tracking-widest uppercase bg-text-primary text-background py-4 rounded-xl hover:-translate-y-1 transition-transform duration-300">
                    Lihat Demo
                  </a>
                  {activeProject.isPrivateRepo ? (
                    <button disabled className="flex-1 flex justify-center items-center gap-2 text-center font-bold text-sm tracking-widest uppercase border-2 border-text-secondary/20 text-text-secondary opacity-50 cursor-not-allowed py-4 rounded-xl">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      Source Code
                    </button>
                  ) : (
                    <a href={activeProject.githubUrl} target="_blank" rel="noopener noreferrer" className="flex-1 flex justify-center items-center gap-2 text-center font-bold text-sm tracking-widest uppercase border-2 border-text-secondary/20 text-text-primary hover:border-text-primary hover:-translate-y-1 transition-all duration-300 py-4 rounded-xl">
                      Source Code
                    </a>
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </section>
    </>
  )
}
