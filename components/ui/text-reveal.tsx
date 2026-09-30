"use client"

import {
  useRef,
  type ComponentPropsWithoutRef,
  type FC,
  type ReactNode,
} from "react"
import { motion, MotionValue, useScroll, useTransform } from "motion/react"

import { cn } from "@/lib/utils"

export interface TextRevealProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode
}

export const TextReveal: FC<TextRevealProps> = ({ children, className }) => {
  const targetRef = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    // Empieza a pintarse cuando el elemento entra en el 90% de la ventana
    // y completa de pintarse cuando llega al 45% (centro de la pantalla)
    offset: ["start 0.95", "start 0.30"],
  })

  const extractText = (node: ReactNode): string => {
    if (typeof node === "string") return node
    if (typeof node === "number") return node.toString()
    if (Array.isArray(node)) return node.map(extractText).join("")
    if (node && typeof node === "object" && "props" in node) {
      return extractText((node as { props: { children?: ReactNode } }).props.children)
    }
    return ""
  }

  const textContent = extractText(children)
  const words = textContent.split(" ")

  return (
    <div ref={targetRef} className={cn("relative z-0", className)}>
      <p className="flex flex-wrap text-base sm:text-lg md:text-xl font-medium leading-relaxed">
        {words.map((word, i) => {
          const start = i / words.length
          const end = start + 1 / words.length
          return (
            <Word key={i} progress={scrollYProgress} range={[start, end]}>
              {word}
            </Word>
          )
        })}
      </p>
    </div>
  )
}

interface WordProps {
  children: ReactNode
  progress: MotionValue<number>
  range: [number, number]
}

const Word: FC<WordProps> = ({ children, progress, range }) => {
  // Ajuste de contraste: las palabras no leídas tienen opacidad 0.35 (legible),
  // y al ser reveladas pasan a 1.0 (opacidad total y texto negrita/brillante)
  const opacity = useTransform(progress, range, [0.35, 1])
  
  return (
    <span className="relative inline-block mr-1.5 my-0.5">
      {/* Texto base sutil y perfectamente legible */}
      <span className="absolute opacity-30 text-muted-foreground select-none">
        {children}
      </span>
      
      {/* Texto activo iluminado al scroll */}
      <motion.span
        style={{ opacity: opacity }}
        className="text-foreground font-semibold dark:text-white"
      >
        {children}
      </motion.span>
    </span>
  )
}
