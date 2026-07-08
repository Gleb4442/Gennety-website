"use client";

import { useState, useEffect } from "react";
import { motion, type Variants, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";

export function ProblemSection() {
  const t = useTranslations("landing");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [isMatchPrincipleOpen, setIsMatchPrincipleOpen] = useState(false);

  // Simulation states:
  // 0: Scanning (Initial state)
  // 1: Negotiating (Connecting lines and data flows)
  // 2: Double Confirmation (Both sides turn green/light up)
  // 3: Simultaneous Release (Proposal envelopes / alerts fly to both users simultaneously)
  const [simStep, setSimStep] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setSimStep((prev) => (prev + 1) % 4);
    }, 4000); // 4 seconds per state
    return () => clearInterval(interval);
  }, []);

  const draw: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { type: "spring", duration: 3, bounce: 0 },
        opacity: { duration: 0.5 }
      }
    }
  };

  const problemPoints = [
    {
      title: t("problemPointJobsTitle"),
      desc: [
        t("problemPointJobsDesc1"),
        t("problemPointJobsDesc2"),
        t("problemPointJobsDesc3")
      ]
    },
    {
      title: t("problemPoint1Title"),
      desc: [t("problemPoint1Desc")]
    },
    {
      title: t("problemPoint2Title"),
      desc: [t("problemPoint2Desc")]
    },
    {
      title: t("problemPoint3Title"),
      desc: [t("problemPoint3Desc")]
    },
    {
      title: t("problemPoint4Title"),
      desc: [t("problemPoint4Desc")]
    }
  ];

  return (
    <section className="mx-auto max-w-5xl space-y-32 px-4 py-16 sm:px-6 sm:py-24">
      {/* Block 1: Problem */}
      <div className="flex flex-col md:flex-row gap-12 md:gap-20 items-center">
        <div className="flex-1 space-y-8">
          <div>
            <h2 className="text-3xl font-semibold leading-tight text-white sm:text-4xl">
              {t("problemTitle")}
            </h2>
            <p className="mt-4 text-base leading-7 text-neutral-400">
              {t("problemSubtitle")}
            </p>
          </div>

          <div className="space-y-3">
            {problemPoints.map((item, i) => {
              const isOpen = openIndex === i;
              
              return (
                <div 
                  key={i} 
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className={`flex cursor-pointer items-start gap-4 rounded-xl border bg-[#0a0a0a] p-4 transition-colors ${isOpen ? 'border-white/[0.18] bg-white/[0.04]' : 'border-white/[0.08] hover:border-white/[0.14]'}`}
                >
                  <div className={`min-w-8 h-8 rounded-full border flex items-center justify-center text-xs font-medium mt-0.5 shrink-0 transition-colors ${isOpen ? 'bg-[#1a1a1a] border-[#333] text-white' : 'bg-[#111] border-[#2a2a2a] text-neutral-400'}`}>
                    {i + 1}
                  </div>
                  <div className="flex-1 mt-1">
                    <div className="flex items-start sm:items-center justify-between gap-4">
                      <h3 className={`text-sm font-medium transition-colors ${isOpen ? 'text-white' : 'text-neutral-300'}`}>
                        {item.title}
                      </h3>
                      <motion.div
                        initial={false}
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        className="text-neutral-500 shrink-0 mt-0.5 sm:mt-0"
                      >
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </motion.div>
                    </div>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="space-y-3 pt-2 text-sm leading-6 text-neutral-400">
                            {item.desc.map((paragraph, pIdx) => (
                              <p key={pIdx}>{paragraph}</p>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex-1 flex justify-center items-center w-full max-w-md aspect-square relative">
          <motion.svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-20px" }}
            className="text-white w-64 h-64 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]"
          >
            {/* Minimalist Handshake lines */}
            <motion.path d="m11 17 2 2a1 1 0 1 0 3-3" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" vectorEffect="nonScalingStroke" variants={draw} />
            <motion.path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" vectorEffect="nonScalingStroke" variants={draw} />
            <motion.path d="m21 3 1 11h-2" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" vectorEffect="nonScalingStroke" variants={draw} />
            <motion.path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" vectorEffect="nonScalingStroke" variants={draw} />
            <motion.path d="M3 4h8" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" vectorEffect="nonScalingStroke" variants={draw} />
          </motion.svg>
          {/* Subtle glow behind the SVG */}
          <div className="absolute inset-0 bg-white/[0.02] blur-3xl rounded-full" />
        </div>
      </div>

      {/* Block 2: Mutual Match principle */}
      <div className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          
          <div className="max-w-xl">
            <p className="mb-4 text-[13px] font-semibold uppercase text-neutral-400">
              {t("mutualPrincipleKicker")}
            </p>
            
            <div 
              className="group cursor-pointer"
              onClick={() => setIsMatchPrincipleOpen(!isMatchPrincipleOpen)}
            >
              <div className="flex items-start justify-between gap-6">
                <h3 className="text-2xl font-semibold leading-snug text-white transition-colors group-hover:text-neutral-200">
                  {t("mutualPrincipleTitle")}
                </h3>
                <motion.div
                  initial={false}
                  animate={{ rotate: isMatchPrincipleOpen ? 180 : 0 }}
                  className="text-neutral-500 mt-2 sm:mt-1.5 shrink-0 group-hover:text-neutral-300 transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.div>
              </div>

              <AnimatePresence initial={false}>
                {isMatchPrincipleOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4">
                      <p className="mb-8 text-base leading-7 text-neutral-400">
                        {t("mutualPrincipleDesc")}
                      </p>
                      <div className="pt-8 border-t border-[#1a1a1a]">
                        <p className="text-base leading-7 text-neutral-400">
                          {t("mutualPrincipleFooter")}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Redesigned Premium Simulation Widget */}
          <div className="w-full relative border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl rounded-2xl p-6 sm:p-8 flex flex-col justify-between overflow-hidden shadow-2xl group min-h-[360px] sm:min-h-[400px]">
            {/* Grid background matching stars / modern tech */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent pointer-events-none" />
            <div className="absolute -left-1/4 -top-1/4 w-1/2 h-1/2 bg-white/[0.02] blur-[80px] rounded-full pointer-events-none" />
            <div className="absolute -right-1/4 -bottom-1/4 w-1/2 h-1/2 bg-white/[0.02] blur-[80px] rounded-full pointer-events-none" />

            {/* Header info */}
            <div className="flex items-center justify-between gap-4 z-10">
              <span className="text-[10px] tracking-[0.15em] font-mono text-neutral-500 uppercase flex items-center gap-2 select-none">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                {t("simulationTitle")}
              </span>
              <span className="text-[10px] tracking-[0.1em] font-mono text-neutral-500 select-none">
                {t("simulationStep", { step: simStep + 1 })}
              </span>
            </div>

            {/* Visual simulation content */}
            <div className="mt-16 mb-4 sm:mt-20 sm:mb-0 flex flex-col justify-center items-center relative z-10 flex-1 w-full">
              <div className="flex items-center justify-between w-full max-w-[280px] sm:max-w-[340px] md:max-w-[480px] lg:max-w-[560px] mx-auto relative px-2">
                
                {/* User A (Human) */}
                <motion.div
                  animate={{
                    borderColor: simStep === 3 ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.08)",
                    boxShadow: simStep === 3 ? "0 0 15px rgba(255,255,255,0.15)" : "none"
                  }}
                  transition={{ duration: 0.5 }}
                  className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full border bg-neutral-950 flex items-center justify-center relative z-20 shrink-0"
                >
                  <span className="text-xs md:text-sm lg:text-lg font-semibold text-neutral-300 select-none">A</span>
                  
                  {/* User Label */}
                  <span className="absolute -bottom-5 md:-bottom-7 px-1.5 md:px-2.5 py-0.5 rounded-full border border-white/[0.04] bg-neutral-950 text-[7px] md:text-[10px] lg:text-xs font-mono text-neutral-500 uppercase tracking-wider select-none whitespace-nowrap">
                    {t("userA")}
                  </span>

                  {/* Notification bubble */}
                  <AnimatePresence>
                    {simStep === 3 && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -5, scale: 0.8 }}
                        className="absolute -top-12 lg:-top-14 -left-4 -right-4 bg-white text-black text-[9px] md:text-xs lg:text-sm font-semibold py-1 lg:py-1.5 px-1.5 lg:px-2 rounded-lg lg:rounded-xl shadow-xl text-center select-none z-30"
                      >
                        Meet Alex?
                        <div className="absolute bottom-[-3px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white rotate-45" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Agent A (AI) */}
                <motion.div
                  animate={{
                    scale: simStep >= 1 ? 1.05 : 0.95,
                    borderColor: simStep >= 2 ? "rgba(16,185,129,0.3)" : simStep === 1 ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.06)",
                    backgroundColor: simStep >= 2 ? "rgba(16,185,129,0.04)" : "rgba(0,0,0,0.4)"
                  }}
                  transition={{ duration: 0.4 }}
                  className="w-7 h-7 sm:w-8 sm:h-8 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full border flex items-center justify-center relative z-20 shrink-0"
                >
                  <svg
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className={`w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-5 md:h-5 lg:w-6 lg:h-6 transition-colors duration-300 ${simStep >= 2 ? "text-emerald-400" : "text-neutral-400"}`}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M5.938 12.835c.127-.039.285.02.373.143.028.038.036.092.046.14.003.014-.02.033-.04.05-.124-.098-.24-.194-.354-.291-.011-.01-.016-.027-.025-.042zM8.396 9.412c.195-.032.39-.06.588-.05a.54.54 0 01.148.026c.202.071.402.147.601.224.028.01.05.036.075.055l-.013.027a9.203 9.203 0 01-.26-.089c-.115-.038-.213-.077-.315-.098-.25-.05-.25-.046-.292-.014l.574.144c.275.139.55.276.823.417.042.022.09.057.107.098.026.06.063.076.117.072.066-.006.132-.017.213-.027l-.04.086c.051.08.142.02.216.064-.074.13-.247.09-.334.199l.061.074-.12.087c0 .106-.038.168-.306.243l.026.085-.196.042.07.124h-.25l-.007.137c-.081-.01-.161-.018-.244-.027l-.053.123c-.027-.008-.052-.011-.073-.023-.067-.038-.128-.056-.195.006-.019.017-.063.014-.093.008-.026-.006-.05-.029-.07-.042-.11.095-.11.095-.208.00" />
                  </svg>
                  {simStep === 0 && (
                    <span className="absolute -inset-1 rounded-full border border-white/[0.04] animate-pulse" />
                  )}
                </motion.div>

                {/* Central Hub */}
                <div className="w-9 h-9 sm:w-10 sm:h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full border border-white/[0.06] bg-neutral-900/80 backdrop-blur flex items-center justify-center relative z-20 shrink-0">
                  <motion.div
                    animate={{
                      scale: simStep === 1 ? [1, 1.15, 1] : 1,
                      rotate: simStep === 1 ? 360 : 0
                    }}
                    transition={{
                      rotate: { repeat: Infinity, duration: 6, ease: "linear" },
                      scale: { repeat: Infinity, duration: 2, ease: "easeInOut" }
                    }}
                    className="absolute inset-0.5 rounded-full border border-dashed border-white/[0.08]"
                  />
                  <motion.div
                    animate={{
                      backgroundColor: simStep >= 2 ? "rgba(16,185,129,0.2)" : "rgba(255,255,255,0.03)",
                      borderColor: simStep >= 2 ? "#10b981" : "rgba(255,255,255,0.08)",
                      boxShadow: simStep >= 2 ? "0 0 12px rgba(16,185,129,0.35)" : "none"
                    }}
                    transition={{ duration: 0.3 }}
                    className="w-4 h-4 sm:w-5 sm:h-5 md:w-8 md:h-8 lg:w-10 lg:h-10 rounded-full border flex items-center justify-center text-[8px] transition-all"
                  >
                    {simStep >= 2 ? (
                      <motion.svg
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-5 md:h-5 lg:w-6 lg:h-6 text-emerald-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="3"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </motion.svg>
                    ) : (
                      <div className="w-1 h-1 md:w-2 md:h-2 rounded-full bg-white/30 animate-pulse" />
                    )}
                  </motion.div>
                </div>

                {/* Agent B (AI) */}
                <motion.div
                  animate={{
                    scale: simStep >= 1 ? 1.05 : 0.95,
                    borderColor: simStep >= 2 ? "rgba(16,185,129,0.3)" : simStep === 1 ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.06)",
                    backgroundColor: simStep >= 2 ? "rgba(16,185,129,0.04)" : "rgba(0,0,0,0.4)"
                  }}
                  transition={{ duration: 0.4 }}
                  className="w-7 h-7 sm:w-8 sm:h-8 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full border flex items-center justify-center relative z-20 shrink-0"
                >
                  <svg
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className={`w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-5 md:h-5 lg:w-6 lg:h-6 transition-colors duration-300 ${simStep >= 2 ? "text-emerald-400" : "text-neutral-400"}`}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M5.938 12.835c.127-.039.285.02.373.143.028.038.036.092.046.14.003.014-.02.033-.04.05-.124-.098-.24-.194-.354-.291-.011-.01-.016-.027-.025-.042zM8.396 9.412c.195-.032.39-.06.588-.05a.54.54 0 01.148.026c.202.071.402.147.601.224.028.01.05.036.075.055l-.013.027a9.203 9.203 0 01-.26-.089c-.115-.038-.213-.077-.315-.098-.25-.05-.25-.046-.292-.014l.574.144c.275.139.55.276.823.417.042.022.09.057.107.098.026.06.063.076.117.072.066-.006.132-.017.213-.027l-.04.086c.051.08.142.02.216.064-.074.13-.247.09-.334.199l.061.074-.12.087c0 .106-.038.168-.306.243l.026.085-.196.042.07.124h-.25l-.007.137c-.081-.01-.161-.018-.244-.027l-.053.123c-.027-.008-.052-.011-.073-.023-.067-.038-.128-.056-.195.006-.019.017-.063.014-.093.008-.026-.006-.05-.029-.07-.042-.11.095-.11.095-.208.00" />
                  </svg>
                  {simStep === 0 && (
                    <span className="absolute -inset-1 rounded-full border border-white/[0.04] animate-pulse" />
                  )}
                </motion.div>

                {/* User B (Human) */}
                <motion.div
                  animate={{
                    borderColor: simStep === 3 ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.08)",
                    boxShadow: simStep === 3 ? "0 0 15px rgba(255,255,255,0.15)" : "none"
                  }}
                  transition={{ duration: 0.5 }}
                  className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full border bg-neutral-950 flex items-center justify-center relative z-20 shrink-0"
                >
                  <span className="text-xs md:text-sm lg:text-lg font-semibold text-neutral-300 select-none">B</span>
                  
                  {/* User Label */}
                  <span className="absolute -bottom-5 md:-bottom-7 px-1.5 md:px-2.5 py-0.5 rounded-full border border-white/[0.04] bg-neutral-950 text-[7px] md:text-[10px] lg:text-xs font-mono text-neutral-500 uppercase tracking-wider select-none whitespace-nowrap">
                    {t("userB")}
                  </span>

                  {/* Notification bubble */}
                  <AnimatePresence>
                    {simStep === 3 && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -5, scale: 0.8 }}
                        className="absolute -top-12 lg:-top-14 -left-4 -right-4 bg-white text-black text-[9px] md:text-xs lg:text-sm font-semibold py-1 lg:py-1.5 px-1.5 lg:px-2 rounded-lg lg:rounded-xl shadow-xl text-center select-none z-30"
                      >
                        Meet Arlan?
                        <div className="absolute bottom-[-3px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white rotate-45" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Responsive dynamic lines connecting the elements */}
                <div className="absolute left-[12%] right-[12%] top-1/2 -translate-y-1/2 h-[1px] bg-white/[0.04] z-10 pointer-events-none flex justify-between">
                  {/* Visual segment User A to Agent A */}
                  <div className="w-[18%] h-full bg-white/[0.08]" />
                  {/* Visual segment Agent A to Central Hub */}
                  <div className="w-[22%] h-full relative overflow-hidden bg-white/[0.08]">
                    {simStep === 1 && (
                      <motion.div
                        initial={{ left: "-100%" }}
                        animate={{ left: "100%" }}
                        transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                        className="absolute top-0 bottom-0 w-1/3 bg-gradient-to-r from-transparent via-white/80 to-transparent"
                      />
                    )}
                    {simStep === 3 && (
                      <motion.div
                        initial={{ left: "100%" }}
                        animate={{ left: "-100%" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="absolute top-0 bottom-0 w-1/3 bg-gradient-to-l from-transparent via-emerald-400 to-transparent"
                      />
                    )}
                  </div>
                  {/* Central Hub gap */}
                  <div className="w-[12%] h-full" />
                  {/* Visual segment Central Hub to Agent B */}
                  <div className="w-[22%] h-full relative overflow-hidden bg-white/[0.08]">
                    {simStep === 1 && (
                      <motion.div
                        initial={{ right: "-100%" }}
                        animate={{ right: "100%" }}
                        transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                        className="absolute top-0 bottom-0 w-1/3 bg-gradient-to-l from-transparent via-white/80 to-transparent"
                      />
                    )}
                    {simStep === 3 && (
                      <motion.div
                        initial={{ right: "100%" }}
                        animate={{ right: "-100%" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="absolute top-0 bottom-0 w-1/3 bg-gradient-to-r from-transparent via-emerald-400 to-transparent"
                      />
                    )}
                  </div>
                  {/* Visual segment Agent B to User B */}
                  <div className="w-[18%] h-full bg-white/[0.08]" />
                </div>

              </div>
            </div>

            {/* Status logs card */}
            <div className="z-10 bg-neutral-950/[0.4] border border-white/[0.04] rounded-xl p-4 flex flex-col gap-2">
              <span className="text-[9px] uppercase tracking-wider font-mono text-neutral-500 select-none">
                {t("simulationStatus")}
              </span>
              <div className="min-h-[40px] flex items-center justify-between gap-4">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={simStep}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="text-xs text-neutral-300 font-mono"
                  >
                    {simStep === 0 && t("simulationScanning")}
                    {simStep === 1 && t("simulationNegotiating")}
                    {simStep === 2 && t("simulationAgreed")}
                    {simStep === 3 && t("simulationReleased")}
                  </motion.p>
                </AnimatePresence>


              </div>
            </div>
            
          </div>
        </div>
        
        {/* Decorative background element */}
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/[0.02] blur-3xl rounded-full pointer-events-none" />
      </div>
    </section>
  );
}
