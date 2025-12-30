"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

// Matrix-style falling code effect - optimized for mobile
function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const updateSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    updateSize()

    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン<>/{}[];=+-*&^%$#@!'
    // Smaller font on mobile for better performance
    const isMobile = window.innerWidth < 768
    const fontSize = isMobile ? 10 : 14
    const columns = Math.floor(canvas.width / fontSize)
    const drops: number[] = []

    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(10, 10, 15, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = '#eab308'
      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)]
        const x = i * fontSize
        const y = drops[i] * fontSize

        const alpha = Math.random() * 0.5 + 0.1
        ctx.fillStyle = `rgba(234, 179, 8, ${alpha})`
        ctx.fillText(char, x, y)

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
    }

    // Slower interval on mobile for better performance
    const interval = setInterval(draw, isMobile ? 80 : 50)

    window.addEventListener('resize', updateSize)

    return () => {
      clearInterval(interval)
      window.removeEventListener('resize', updateSize)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 opacity-30" />
}

export default function RecruitmentForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    role: "",
    phoneNumber: "",
    yearOfStudy: "",
    reason: "",
    experience: "",
  })

  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        toast.success("Application submitted successfully!", {
          description: "System initialized. Welcome to the team.",
        })
        setFormData({
          fullName: "",
          role: "",
          phoneNumber: "",
          yearOfStudy: "",
          reason: "",
          experience: "",
        })
      } else {
        toast.error(data.error || "Failed to submit application")
      }
    } catch (error) {
      console.error("Submission error:", error)
      toast.error("Network error. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="min-h-screen min-h-[100dvh] bg-[#0a0a0f] flex items-center justify-center p-2 sm:p-4 relative overflow-hidden">
      {/* Matrix rain background */}
      {mounted && <MatrixRain />}

      {/* Circuit board pattern - hidden on mobile for performance */}
      <div className="absolute inset-0 circuit-pattern opacity-10 sm:opacity-20 pointer-events-none" />

      {/* Scan line effect - lighter on mobile */}
      <div className="absolute inset-0 scanlines pointer-events-none opacity-50 sm:opacity-100" />

      {/* Glowing orbs - fewer on mobile */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden sm:block">
        <div className="absolute top-20 left-20 w-2 h-2 bg-yellow-500 rounded-full animate-ping" />
        <div className="absolute top-40 right-32 w-1 h-1 bg-yellow-400 rounded-full animate-ping" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-amber-500 rounded-full animate-ping" style={{ animationDelay: '2s' }} />
      </div>

      <Card className={`w-full max-w-2xl bg-black/95 backdrop-blur-xl border border-yellow-500/30 rounded-none p-4 sm:p-6 md:p-10 lg:p-12 relative z-10 transition-all duration-700 mx-2 sm:mx-4 my-2 sm:my-4 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        style={{
          clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))',
          boxShadow: '0 0 30px rgba(234, 179, 8, 0.1), inset 0 0 50px rgba(234, 179, 8, 0.02)'
        }}>

        {/* Corner brackets - smaller on mobile */}
        <div className="absolute top-0 left-0 w-4 sm:w-6 md:w-8 h-4 sm:h-6 md:h-8 border-l-2 border-t-2 border-yellow-500" />
        <div className="absolute top-0 right-3 sm:right-4 md:right-5 w-4 sm:w-6 md:w-8 h-4 sm:h-6 md:h-8 border-r-2 border-t-2 border-yellow-500" />
        <div className="absolute bottom-3 sm:bottom-4 md:bottom-5 left-0 w-4 sm:w-6 md:w-8 h-4 sm:h-6 md:h-8 border-l-2 border-b-2 border-yellow-500" />
        <div className="absolute bottom-0 right-0 w-4 sm:w-6 md:w-8 h-4 sm:h-6 md:h-8 border-r-2 border-b-2 border-yellow-500" />

        {/* Tech lines - adjusted for mobile */}
        <div className="absolute top-0 left-8 sm:left-10 md:left-12 right-8 sm:right-10 md:right-12 h-px bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent" />
        <div className="absolute bottom-0 left-8 sm:left-10 md:left-12 right-8 sm:right-10 md:right-12 h-px bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent" />

        {/* Header - responsive text sizing */}
        <div className="mb-6 sm:mb-8 md:mb-10 text-center relative">
          <div className="inline-block">
            <p className="text-yellow-500/60 text-[10px] sm:text-xs font-mono tracking-[0.3em] sm:tracking-[0.5em] mb-1 sm:mb-2">&gt;_ INITIALIZING...</p>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-yellow-500 mb-1 sm:mb-2 tracking-wider font-mono glitch-text" data-text="CELESTIUS">
              CELESTIUS
            </h1>
            <div className="flex items-center justify-center gap-1 sm:gap-2 text-yellow-500/50 font-mono text-[10px] sm:text-xs">
              <span className="w-4 sm:w-6 md:w-8 h-px bg-yellow-500/50" />
              <span>TECH.CLUB.v2.0</span>
              <span className="w-4 sm:w-6 md:w-8 h-px bg-yellow-500/50" />
            </div>
          </div>
          <p className="text-gray-500 text-xs sm:text-sm mt-2 sm:mt-4 font-mono">
            <span className="text-yellow-500">[</span> Recruitment Portal <span className="text-yellow-500">]</span>
          </p>
        </div>

        {/* Status bar - responsive */}
        <div className="mb-4 sm:mb-6 flex flex-wrap items-center gap-1 sm:gap-2 text-[10px] sm:text-xs font-mono">
          <div className="flex items-center gap-1">
            <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-green-500">ONLINE</span>
          </div>
          <span className="text-gray-600 hidden sm:inline">|</span>
          <span className="text-gray-500 hidden sm:inline">FORM_STATUS: <span className="text-yellow-500">AWAITING_INPUT</span></span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 md:space-y-5">
          {/* Full Name */}
          <div className="relative group">
            <div className="absolute left-0 top-0 bottom-0 w-0.5 sm:w-1 bg-yellow-500/30 group-focus-within:bg-yellow-500 transition-colors duration-300" />
            <div className="flex items-center gap-1 sm:gap-2 mb-1 pl-2 sm:pl-3">
              <span className="text-yellow-500/60 text-[10px] sm:text-xs font-mono">&gt;</span>
              <span className="text-gray-500 text-[10px] sm:text-xs font-mono uppercase tracking-wider">user.name</span>
            </div>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              onFocus={() => setFocusedField("fullName")}
              onBlur={() => setFocusedField(null)}
              required
              className="w-full bg-black/50 border border-gray-800 rounded-none px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white font-mono placeholder:text-gray-600 focus:border-yellow-500/50 focus:outline-none transition-all duration-300 focus:shadow-[0_0_20px_rgba(234,179,8,0.1)]"
              placeholder="Enter your full name..."
            />
          </div>

          {/* Two-column layout - stacks on mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-5">
            {/* Role */}
            <div className="relative group">
              <div className="absolute left-0 top-0 bottom-0 w-0.5 sm:w-1 bg-yellow-500/30 group-focus-within:bg-yellow-500 transition-colors duration-300" />
              <div className="flex items-center gap-1 sm:gap-2 mb-1 pl-2 sm:pl-3">
                <span className="text-yellow-500/60 text-[10px] sm:text-xs font-mono">&gt;</span>
                <span className="text-gray-500 text-[10px] sm:text-xs font-mono uppercase tracking-wider">role.select</span>
              </div>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                onFocus={() => setFocusedField("role")}
                onBlur={() => setFocusedField(null)}
                required
                className="w-full bg-black/50 border border-gray-800 rounded-none px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white font-mono focus:border-yellow-500/50 focus:outline-none transition-all duration-300 appearance-none cursor-pointer"
              >
                <option value="" className="bg-black">-- SELECT --</option>
                <option value="video-editing" className="bg-black">Video Editing</option>
                <option value="graphic-design" className="bg-black">Graphic Design</option>
              </select>
              <div className="absolute right-2 sm:right-3 top-1/2 translate-y-1 pointer-events-none text-yellow-500">
                <svg className="w-3 sm:w-4 h-3 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Year */}
            <div className="relative group">
              <div className="absolute left-0 top-0 bottom-0 w-0.5 sm:w-1 bg-yellow-500/30 group-focus-within:bg-yellow-500 transition-colors duration-300" />
              <div className="flex items-center gap-1 sm:gap-2 mb-1 pl-2 sm:pl-3">
                <span className="text-yellow-500/60 text-[10px] sm:text-xs font-mono">&gt;</span>
                <span className="text-gray-500 text-[10px] sm:text-xs font-mono uppercase tracking-wider">year.study</span>
              </div>
              <select
                name="yearOfStudy"
                value={formData.yearOfStudy}
                onChange={handleChange}
                onFocus={() => setFocusedField("yearOfStudy")}
                onBlur={() => setFocusedField(null)}
                required
                className="w-full bg-black/50 border border-gray-800 rounded-none px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white font-mono focus:border-yellow-500/50 focus:outline-none transition-all duration-300 appearance-none cursor-pointer"
              >
                <option value="" className="bg-black">-- SELECT --</option>
                <option value="1st-year" className="bg-black">1st Year</option>
                <option value="2nd-year" className="bg-black">2nd Year</option>
              </select>
              <div className="absolute right-2 sm:right-3 top-1/2 translate-y-1 pointer-events-none text-yellow-500">
                <svg className="w-3 sm:w-4 h-3 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Phone Number */}
          <div className="relative group">
            <div className="absolute left-0 top-0 bottom-0 w-0.5 sm:w-1 bg-yellow-500/30 group-focus-within:bg-yellow-500 transition-colors duration-300" />
            <div className="flex items-center gap-1 sm:gap-2 mb-1 pl-2 sm:pl-3">
              <span className="text-yellow-500/60 text-[10px] sm:text-xs font-mono">&gt;</span>
              <span className="text-gray-500 text-[10px] sm:text-xs font-mono uppercase tracking-wider">contact.phone</span>
            </div>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              onFocus={() => setFocusedField("phoneNumber")}
              onBlur={() => setFocusedField(null)}
              required
              pattern="[0-9]*"
              inputMode="numeric"
              className="w-full bg-black/50 border border-gray-800 rounded-none px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white font-mono placeholder:text-gray-600 focus:border-yellow-500/50 focus:outline-none transition-all duration-300 focus:shadow-[0_0_20px_rgba(234,179,8,0.1)]"
              placeholder="Enter contact number..."
            />
          </div>

          {/* Reason */}
          <div className="relative group">
            <div className="absolute left-0 top-0 bottom-0 w-0.5 sm:w-1 bg-yellow-500/30 group-focus-within:bg-yellow-500 transition-colors duration-300" />
            <div className="flex items-center gap-1 sm:gap-2 mb-1 pl-2 sm:pl-3">
              <span className="text-yellow-500/60 text-[10px] sm:text-xs font-mono">&gt;</span>
              <span className="text-gray-500 text-[10px] sm:text-xs font-mono uppercase tracking-wider">motivation.log</span>
            </div>
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              onFocus={() => setFocusedField("reason")}
              onBlur={() => setFocusedField(null)}
              required
              rows={3}
              className="w-full bg-black/50 border border-gray-800 rounded-none px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white font-mono placeholder:text-gray-600 focus:border-yellow-500/50 focus:outline-none transition-all duration-300 resize-none focus:shadow-[0_0_20px_rgba(234,179,8,0.1)]"
              placeholder="// Why do you want to join?"
            />
          </div>

          {/* Experience */}
          <div className="relative group">
            <div className="absolute left-0 top-0 bottom-0 w-0.5 sm:w-1 bg-yellow-500/30 group-focus-within:bg-yellow-500 transition-colors duration-300" />
            <div className="flex items-center gap-1 sm:gap-2 mb-1 pl-2 sm:pl-3">
              <span className="text-yellow-500/60 text-[10px] sm:text-xs font-mono">&gt;</span>
              <span className="text-gray-500 text-[10px] sm:text-xs font-mono uppercase tracking-wider">experience.data</span>
            </div>
            <textarea
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              onFocus={() => setFocusedField("experience")}
              onBlur={() => setFocusedField(null)}
              required
              rows={3}
              className="w-full bg-black/50 border border-gray-800 rounded-none px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white font-mono placeholder:text-gray-600 focus:border-yellow-500/50 focus:outline-none transition-all duration-300 resize-none focus:shadow-[0_0_20px_rgba(234,179,8,0.1)]"
              placeholder="// Describe your experience..."
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2 sm:pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="relative w-full bg-transparent border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black font-mono font-bold py-3 sm:py-4 text-sm sm:text-base rounded-none transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group overflow-hidden active:scale-[0.98]"
              style={{
                clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))'
              }}
            >
              {/* Animated background */}
              <div className="absolute inset-0 bg-yellow-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />

              <span className="relative z-10 flex items-center justify-center gap-2">
                {isSubmitting ? (
                  <>
                    <span className="inline-block w-3 sm:w-4 h-3 sm:h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    PROCESSING...
                  </>
                ) : (
                  <>
                    <span className="text-base sm:text-lg">&gt;</span>
                    SUBMIT_APPLICATION
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">_</span>
                  </>
                )}
              </span>
            </Button>
          </div>
        </form>

        {/* Footer - responsive */}
        <div className="mt-4 sm:mt-6 md:mt-8 text-center font-mono">
          <p className="text-gray-600 text-[10px] sm:text-xs">
            <span className="text-yellow-500/50">[</span>
            v2.0.0 | CELESTIUS TECH CLUB
            <span className="text-yellow-500/50">]</span>
          </p>
        </div>
      </Card>
    </div>
  )
}
