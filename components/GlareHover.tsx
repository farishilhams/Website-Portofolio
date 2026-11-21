"use client"
import React, { useState, useRef, useEffect, useCallback } from "react"

interface GlareHoverProps {
  width?: string
  height?: string
  background?: string
  borderRadius?: string
  borderColor?: string
  children?: React.ReactNode
  glareColor?: string
  glareOpacity?: number
  glareAngle?: number
  glareSize?: number
  transitionDuration?: number
  playOnce?: boolean
  className?: string
  style?: React.CSSProperties
  isTriggered?: boolean
}

const GlareHover: React.FC<GlareHoverProps> = ({
  children,
  glareColor = "#ffffff",
  glareOpacity = 0.45,
  glareAngle = -45,
  transitionDuration = 650,
  className = "",
  style = {},
  isTriggered = false,
}) => {
  const [isActive, setIsActive] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const hex = glareColor.replace("#", "")
  let rgba = glareColor
  if (/^[\dA-Fa-f]{6}$/.test(hex)) {
    const r = parseInt(hex.slice(0, 2), 16)
    const g = parseInt(hex.slice(2, 4), 16)
    const b = parseInt(hex.slice(4, 6), 16)
    rgba = `rgba(${r}, ${g}, ${b}, ${glareOpacity})`
  } else if (/^[\dA-Fa-f]{3}$/.test(hex)) {
    const r = parseInt(hex[0] + hex[0], 16)
    const g = parseInt(hex[1] + hex[1], 16)
    const b = parseInt(hex[2] + hex[2], 16)
    rgba = `rgba(${r}, ${g}, ${b}, ${glareOpacity})`
  }

  const triggerSweep = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    setIsActive(true)
    timerRef.current = setTimeout(() => {
      setIsActive(false)
    }, transitionDuration)
  }, [transitionDuration])

  // Efek kilatan programmatic HANYA aktif jika isTriggered bernilai true untuk instance kartu ini
  useEffect(() => {
    if (isTriggered) {
      triggerSweep()
    }
  }, [isTriggered, triggerSweep])

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  return (
    <div
      className={`relative overflow-hidden select-none ${className}`}
      style={{
        WebkitTapHighlightColor: "transparent",
        ...style,
      }}
      onMouseEnter={triggerSweep}
      onTouchStart={triggerSweep}
    >
      {/* Glare Light Sweep Overlay - 100% terisolasi per instance dan aktif di desktop maupun mobile touch */}
      <div
        className="pointer-events-none absolute inset-0 z-20 overflow-hidden rounded-xl"
        style={{
          opacity: isActive ? 1 : 0,
          transition: isActive ? "none" : `opacity ${transitionDuration}ms ease-out`,
        }}
      >
        <div
          style={{
            position: "absolute",
            width: "250%",
            height: "250%",
            top: "-75%",
            left: "-75%",
            background: `linear-gradient(${glareAngle}deg, hsla(0,0%,0%,0) 45%, ${rgba} 50%, hsla(0,0%,0%,0) 55%)`,
            transform: isActive
              ? "translateX(100%) translateY(100%)"
              : "translateX(-100%) translateY(-100%)",
            transition: isActive
              ? `transform ${transitionDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`
              : "none",
            pointerEvents: "none",
          }}
        />
      </div>
      {children}
    </div>
  )
}

export default GlareHover
