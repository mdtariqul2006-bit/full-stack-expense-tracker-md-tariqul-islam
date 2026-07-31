"use client";

import { motion } from "framer-motion";

function FloatingPaths({ position }) {
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
      380 - i * 5 * position
    } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
      152 - i * 5 * position
    } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
      684 - i * 5 * position
    } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    color: `rgba(20,184,166,${0.1 + i * 0.03})`, // Seafoam/Teal mapping
    width: 0.5 + i * 0.03,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg
        className="w-full h-full text-teal-500"
        viewBox="0 0 696 316"
        fill="none"
      >
        <title>Menu Background Paths</title>
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={0.15 + path.id * 0.02}
            initial={{ pathLength: 0.3, opacity: 0.6 }}
            animate={{
              pathLength: 1,
              opacity: [0.15, 0.4, 0.15],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  );
}

export function SidebarPaths({ title = "Menu", children }) {
  const words = title.split(" ");

  return (
    <div className="relative h-full min-h-screen w-64 flex flex-col overflow-hidden bg-slate-950 border-r border-slate-800 shadow-2xl shadow-black">
      <div className="absolute inset-0 z-0">
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>

      <div className="relative z-10 flex flex-col h-full p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold tracking-tighter">
            {words.map((word, wordIndex) => (
              <span key={wordIndex} className="inline-block mr-2 last:mr-0">
                {word.split("").map((letter, letterIndex) => (
                  <motion.span
                    key={`${wordIndex}-${letterIndex}`}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      delay: wordIndex * 0.1 + letterIndex * 0.03,
                      type: "spring",
                      stiffness: 150,
                      damping: 25,
                    }}
                    className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-teal-200"
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
            ))}
          </h2>
        </motion.div>

        {/* Your menu links render here */}
        <div className="flex-1 flex flex-col gap-2 z-20">
            {children}
        </div>
      </div>
    </div>
  );
}