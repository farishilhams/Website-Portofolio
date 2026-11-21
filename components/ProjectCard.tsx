"use client"
import React from "react"
import Image from "next/image"
import GlareHover from "@/components/GlareHover"
import type { ProjectItem } from "@/data/projects"

interface ProjectCardProps {
  project: ProjectItem
  isFlashing: boolean
  onSelect: (project: ProjectItem) => void
  priority?: boolean
}

export default function ProjectCard({
  project,
  isFlashing,
  onSelect,
  priority = false,
}: ProjectCardProps) {
  return (
    <div
      onClick={() => onSelect(project)}
      className="relative h-full flex flex-col cursor-pointer"
    >
      <GlareHover
        isTriggered={isFlashing}
        className="group flex flex-col h-full bg-background border border-text-secondary/20 hover:border-text-primary/50 rounded-xl overflow-hidden transition-[border-color,box-shadow,transform] duration-300 shadow-sm hover:shadow-2xl relative"
      >
        {/* Thumbnail Preview Banner */}
        <div className="relative overflow-hidden aspect-[16/9] bg-thirdary/15 border-b border-text-secondary/10 flex items-center justify-center p-2">
          <Image
            src={project.imagePath}
            alt={project.title}
            fill
            className="object-contain p-2 transition-transform duration-700 group-hover:scale-105"
            priority={priority}
          />

          {/* Tech Stack Overlay Badges */}
          <div className="absolute top-3 right-3 flex flex-wrap gap-1.5 justify-end z-10 opacity-0 group-hover:opacity-100 translate-y-1 scale-95 group-hover:translate-y-0 group-hover:scale-100 transition-all duration-300 ease-out pointer-events-none">
            {project.tech.slice(0, 3).map((tech, i) => (
              <span
                key={i}
                className="text-[10px] font-bold bg-background/95 text-text-primary px-2 py-1 rounded backdrop-blur-md border border-text-secondary/20 uppercase tracking-widest shadow-sm"
              >
                {tech}
              </span>
            ))}
            {project.tech.length > 3 && (
              <span className="text-[10px] font-bold bg-background/95 text-text-primary px-2 py-1 rounded backdrop-blur-md border border-text-secondary/20 uppercase tracking-widest shadow-sm">
                +{project.tech.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6 md:p-8 flex flex-col flex-grow relative">
          {/* Numbering Badge */}
          <div className="absolute top-0 right-6 -translate-y-1/2 bg-background border border-text-secondary/20 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest text-text-secondary shadow-sm">
            {String(project.index + 1).padStart(2, "0")}
          </div>

          <div className="flex flex-col mb-4">
            <span className="text-xs font-bold tracking-wider uppercase text-text-secondary mb-1">
              {project.category}
            </span>
            <h4 className="text-2xl font-black text-text-primary tracking-tight leading-tight group-hover:text-text-secondary transition-colors duration-300">
              {project.title}
            </h4>
          </div>

          <p className="text-sm text-text-secondary font-medium leading-relaxed mb-8 flex-grow line-clamp-3">
            {project.shortDescription || project.description}
          </p>

          <div className="flex items-center justify-between mt-auto pt-4 border-t border-text-secondary/10">
            <button
              type="button"
              className="text-xs font-bold tracking-[0.2em] uppercase text-text-primary flex items-center gap-3 group/btn"
              onClick={(e) => {
                e.stopPropagation()
                onSelect(project)
              }}
            >
              Lihat Detail
              <span className="w-8 h-[2px] bg-text-primary group-hover/btn:w-12 transition-all duration-300"></span>
            </button>

            <a
              href={project.liveDemoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-2 border border-text-secondary/20 rounded-full text-text-secondary hover:text-background hover:bg-text-primary hover:border-text-primary transition-all duration-300"
              title="Kunjungi Website"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </GlareHover>
    </div>
  )
}
