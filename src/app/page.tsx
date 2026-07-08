"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { MatchCardCompact } from "@/components/match-card-compact";
import { MatchModal } from "@/components/match-modal";
import { LanguageSwitcher } from "@/components/language-switcher";
import { CookiePreferencesButton } from "@/components/cookie-preferences-button";
import { ProblemSection } from "@/components/problem-section";
import { GranovetterSection } from "@/components/granovetter-section";
import { TopBanner } from "@/components/top-banner";
import { HowItWorksSection } from "@/components/how-it-works-section";
import { MatchExampleSection } from "@/components/match-example-section";
import { KeyPrinciplesSection } from "@/components/key-principles-section";
import { cx, primaryButtonClass } from "@/components/ui/app-chrome";

const githubRepoUrl = "https://github.com/Beajee/Beajee";

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function useDialogueReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const container = ref.current;
    if (!container) return;
    const msgs = container.querySelectorAll(".dialogue-msg");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          msgs.forEach((msg, i) => {
            setTimeout(() => msg.classList.add("visible"), i * 400);
          });
          observer.unobserve(container);
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, []);
  return ref;
}

interface FeedMatch {
  id: string;
  status: string;
  createdAt: string;
  matchedAt: string | null;
  participants: [
    { displayName: string; currentWork: string; expertise: string[]; location: string | null; networkingGoal: string },
    { displayName: string; currentWork: string; expertise: string[]; location: string | null; networkingGoal: string }
  ];
  overlapSummary: string;
  outcome: string;
  negotiationSteps: number;
}

/*
interface RepoStats {
  url: string;
  stars: number;
  forks: number;
  openIssues: number;
  defaultBranch: string;
  license: string | null;
  pushedAt: string | null;
}
*/

const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://app.beajee.com";

function CodexIcon({ className }: { className?: string }) {
  return (
    <svg
      style={{ flex: "none", lineHeight: 1 }}
      viewBox="0 0 24 24"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <title>Codex</title>
      <path
        d="M19.503 0H4.496A4.496 4.496 0 000 4.496v15.007A4.496 4.496 0 004.496 24h15.007A4.496 4.496 0 0024 19.503V4.496A4.496 4.496 0 0019.503 0z"
        fill="#fff"
      />
      <path
        d="M9.064 3.344a4.578 4.578 0 012.285-.312c1 .115 1.891.54 2.673 1.275.01.01.024.017.037.021a.09.09 0 00.043 0 4.55 4.55 0 013.046.275l.047.022.116.057a4.581 4.581 0 012.188 2.399c.209.51.313 1.041.315 1.595a4.24 4.24 0 01-.134 1.223.123.123 0 00.03.115c.594.607.988 1.33 1.183 2.17.289 1.425-.007 2.71-.887 3.854l-.136.166a4.548 4.548 0 01-2.201 1.388.123.123 0 00-.081.076c-.191.551-.383 1.023-.74 1.494-.9 1.187-2.222 1.846-3.711 1.838-1.187-.006-2.239-.44-3.157-1.302a.107.107 0 00-.105-.024c-.388.125-.78.143-1.204.138a4.441 4.441 0 01-1.945-.466 4.544 4.544 0 01-1.61-1.335c-.152-.202-.303-.392-.414-.617a5.81 5.81 0 01-.37-.961 4.582 4.582 0 01-.014-2.298.124.124 0 00.006-.056.085.085 0 00-.027-.048 4.467 4.467 0 01-1.034-1.651 3.896 3.896 0 01-.251-1.192 5.189 5.189 0 01.141-1.6c.337-1.112.982-1.985 1.933-2.618.212-.141.413-.251.601-.33.215-.089.43-.164.646-.227a.098.098 0 00.065-.066 4.51 4.51 0 01.829-1.615 4.535 4.535 0 011.837-1.388zm3.482 10.565a.637.637 0 000 1.272h3.636a.637.637 0 100-1.272h-3.636zM8.462 9.23a.637.637 0 00-1.106.631l1.272 2.224-1.266 2.136a.636.636 0 101.095.649l1.454-2.455a.636.636 0 00.005-.64L8.462 9.23z"
        fill="url(#lobe-icons-codex-_R_0_)"
      />
      <defs>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="lobe-icons-codex-_R_0_"
          x1="12"
          x2="12"
          y1="3"
          y2="21"
        >
          <stop stopColor="#B1A7FF" />
          <stop offset=".5" stopColor="#7A9DFF" />
          <stop offset="1" stopColor="#3941FF" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function OpenClawIcon({ className }: { className?: string }) {
  return (
    <svg
      style={{ flex: "none", lineHeight: 1 }}
      viewBox="0 0 24 24"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <title>OpenClaw</title>
      <path
        d="M12 2.568c-6.33 0-9.495 5.275-9.495 9.495 0 4.22 3.165 8.44 6.33 9.494v2.11h2.11v-2.11s1.055.422 2.11 0v2.11h2.11v-2.11c3.165-1.055 6.33-5.274 6.33-9.494S18.33 2.568 12 2.568z"
        fill="url(#lobe-icons-open-claw-0-_R_0_)"
      />
      <path
        d="M3.56 9.953C.396 8.898-.66 11.008.396 13.118c1.055 2.11 3.164 1.055 4.22-1.055.632-1.477 0-2.11-1.056-2.11z"
        fill="url(#lobe-icons-open-claw-1-_R_0_)"
      />
      <path
        d="M20.44 9.953c3.164-1.055 4.22 1.055 3.164 3.165-1.055 2.11-3.164 1.055-4.22-1.055-.632-1.477 0-2.11 1.056-2.11z"
        fill="url(#lobe-icons-open-claw-2-_R_0_)"
      />
      <path
        d="M5.507 1.875c.476-.285 1.036-.233 1.615.037.577.27 1.223.774 1.937 1.488a.316.316 0 01-.447.447c-.693-.693-1.279-1.138-1.757-1.361-.475-.222-.795-.205-1.022-.069a.317.317 0 01-.326-.542zM16.877 1.913c.58-.27 1.14-.323 1.616-.038a.317.317 0 01-.326.542c-.227-.136-.547-.153-1.022.069-.478.223-1.064.668-1.756 1.361a.316.316 0 11-.448-.447c.714-.714 1.36-1.218 1.936-1.487z"
        fill="#FF4D4D"
      />
      <path
        d="M8.835 9.109a1.266 1.266 0 100-2.532 1.266 1.266 0 000 2.532zM15.165 9.109a1.266 1.266 0 100-2.532 1.266 1.266 0 000 2.532z"
        fill="#050810"
      />
      <path
        d="M9.046 8.16a.527.527 0 100-1.056.527.527 0 000 1.055zM15.376 8.16a.527.527 0 100-1.055.527.527 0 000 1.054z"
        fill="#00E5CC"
      />
      <defs>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="lobe-icons-open-claw-0-_R_0_"
          x1="-.659"
          x2="27.023"
          y1=".458"
          y2="22.855"
        >
          <stop stopColor="#FF4D4D" />
          <stop offset="1" stopColor="#991B1B" />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="lobe-icons-open-claw-1-_R_0_"
          x1="0"
          x2="4.311"
          y1="9.672"
          y2="14.949"
        >
          <stop stopColor="#FF4D4D" />
          <stop offset="1" stopColor="#991B1B" />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="lobe-icons-open-claw-2-_R_0_"
          x1="19.385"
          x2="24.399"
          y1="9.953"
          y2="14.462"
        >
          <stop stopColor="#FF4D4D" />
          <stop offset="1" stopColor="#991B1B" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function FolkIcon({ className }: { className?: string }) {
  return (
    <img
      src="/images/agents/folk.png"
      className={className}
      alt="Folk Agent"
    />
  );
}

function KimiIcon({ className }: { className?: string }) {
  return (
    <svg
      style={{ flex: "none", lineHeight: 1 }}
      viewBox="0 0 24 24"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <title>Kimi</title>
      <path d="M21.846 0a1.923 1.923 0 110 3.846H20.15a.226.226 0 01-.227-.226V1.923C19.923.861 20.784 0 21.846 0z" fill="#1783FF" />
      <path d="M11.065 11.199l7.257-7.2c.137-.136.06-.41-.116-.41H14.3a.164.164 0 00-.117.051l-7.82 7.756c-.122.12-.302.013-.302-.179V3.82c0-.127-.083-.23-.185-.23H3.186c-.103 0-.186.103-.186.23V19.77c0 .128.083.23.186.23h2.69c.103 0 .186-.102.186-.23v-3.25c0-.069.025-.135.069-.178l2.424-2.406a.158.158 0 01.205-.023l6.484 4.772a7.677 7.677 0 003.453 1.283c.108.012.2-.095.2-.23v-3.06c0-.117-.07-.212-.164-.227a5.028 5.028 0 01-2.027-.807l-5.613-4.064c-.117-.078-.132-.279-.028-.381z" fill="#fff" />
    </svg>
  );
}

function HermesIcon({ className }: { className?: string }) {
  return (
    <img
      src="/images/agents/hermes.png"
      className={`${className || ""} object-cover`}
      alt="Hermes Agent"
    />
  );
}

function ClaudeCodeIcon({ className }: { className?: string }) {
  return (
    <svg
      style={{ flex: "none", lineHeight: 1 }}
      viewBox="0 0 24 24"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <title>Claude Code</title>
      <path clipRule="evenodd" d="M20.998 10.949H24v3.102h-3v3.028h-1.487V20H18v-2.921h-1.487V20H15v-2.921H9V20H7.488v-2.921H6V20H4.487v-2.921H3V14.05H0V10.95h3V5h17.998v5.949zM6 10.949h1.488V8.102H6v2.847zm10.51 0H18V8.102h-1.49v2.847z" fill="#D97757" fillRule="evenodd"></path>
    </svg>
  );
}

function ManusIcon({ className }: { className?: string }) {
  return (
    <svg
      fill="currentColor"
      fillRule="evenodd"
      style={{ flex: "none", lineHeight: 1 }}
      viewBox="0 0 24 24"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Manus</title>
      <path d="M8.047 1.163A.936.936 0 119.863.709c.063.256.132.508.2.76l.005.016c.158.58.315 1.16.416 1.771a.936.936 0 11-1.847.305c-.085-.517-.203-.949-.346-1.473v-.002c-.075-.274-.157-.573-.244-.923zM3.67 2.753a.936.936 0 00.428 1.252c.667.327 1.245.65 1.818 1.295a.936.936 0 001.4-1.242C6.5 3.138 5.66 2.687 4.922 2.325a.936.936 0 00-1.252.428z"></path>
      <path clipRule="evenodd" d="M15.672 21.284c-.17-.036-.356-.075-.546-.117-.7-.152-1.65-.365-2.097-.513l-.033-.011-.032-.012c-.198-.074-.534-.156-1.09-.283l-.103-.023c-.48-.11-1.07-.244-1.63-.413-.578-.176-1.294-.437-1.903-.862-.638-.446-1.364-1.232-1.404-2.412a5.024 5.024 0 01.009-.51 2.716 2.716 0 01-.65-1.24 2.632 2.632 0 01.03-1.275c.083-.317.21-.594.316-.8.036-.07.073-.14.11-.206-.35-.111-.747-.248-1.133-.412-.503-.215-1.218-.57-1.752-1.141a2.798 2.798 0 01-.71-1.327 2.55 2.55 0 01.226-1.68c.604-1.208 1.757-1.635 2.782-1.672.926-.033 1.912.226 2.795.536.804.282 1.955.807 2.933 1.264.322-.529.747-1.126 1.149-1.608l.08-.095.092-.084a3.43 3.43 0 012.06-.887 3.559 3.559 0 011.059.08l.036.008.023.007h.003l.002.001s.002 0-.477 1.786l.479-1.786.208.058.19.102c.964.516 1.238 1.406 1.31 1.876a2.9 2.9 0 01-.008.903l-.003.018v.005l-1.858-.37 1.857.371-.01.054-.3 1.19c-.058.292-.065.459-.062.547a.286.286 0 00.016.107v.001c.013.03.043.095.154.263.043.066.088.131.144.214l.058.084c.08.118.174.257.274.412.623.97.684 1.902.68 2.499v.026l.238.078.103.032.153.049c.076.024.173.056.267.09.11-.202.407-.636.945-.636.702 0 .99.987.99.987.275 1.838-.98 8.013-2.794 9.164-1.386.88-2.413-.427-3.176-2.437zM8.72 12.868c.118-.119.47-.37 1.136-.445a4.337 4.337 0 012.228.365c.623.276 1.053.908 1.233 1.667.088.371.104.731.066 1.025-.04.31-.128.465-.169.511-.05.058-.228.157-.721.053a3.417 3.417 0 01-.764-.266l-.006-.003a.936.936 0 00-.861 1.662h.001l.003.002.008.004.024.012a4.888 4.888 0 00.34.152c.215.086.52.194.866.267.615.13 1.75.23 2.52-.652.37-.424.548-.98.615-1.501a4.789 4.789 0 00-.1-1.697c-.268-1.128-.976-2.362-2.297-2.948a6.208 6.208 0 00-3.195-.513c-.619.07-1.211.242-1.69.504l-.02-.006h-.004c-1.183-.338-3.536-1.01-2.956-2.17.44-.88 1.643-.807 3.275-.234.663.232 1.584.647 2.453 1.051.27.125.534.25.784.367l.974.454c.693-.832.962-1.29 1.2-1.695.163-.278.312-.53.573-.862l.025-.032a9.902 9.902 0 01.146-.18.895.895 0 01.02-.017c.642-.567 1.389-.36 1.389-.36.427.228.318.806.318.806l-.296 1.178c-.284 1.386.03 1.845.547 2.6.09.133.188.275.29.433.412.643.392 1.26.377 1.765-.01.324-.019.602.09.809.224.425 1.06.69 1.61.862.132.042.247.078.333.11l.059.023c-.078.24-.148.489-.218.737-.313 1.103-.623 2.202-1.55 2.53-.632.225-1.263.214-1.71.156-.786-.17-1.716-.379-2.066-.495-.363-.135-.871-.25-1.424-.377-1.316-.3-2.883-.656-3.331-1.462a.975.975 0 01-.125-.447c-.026-.74.234-1.404.234-1.404s-.403.002-.685-.27a.853.853 0 01-.238-.431c-.03-.13-.042-.28-.025-.44.008 0 .012-.008.012-.028 0-.234.234-.702.702-1.17z"></path><path d="M14.077.604a.936.936 0 01.315 1.285c-.355.584-.561 1.181-.786 2.081a.936.936 0 11-1.816-.454c.243-.971.504-1.778 1.002-2.598a.936.936 0 011.285-.314z"></path>
    </svg>
  );
}

function CursorIcon({ className }: { className?: string }) {
  return (
    <svg
      fill="currentColor"
      fillRule="evenodd"
      style={{ flex: "none", lineHeight: 1 }}
      viewBox="0 0 24 24"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Cursor</title>
      <path d="M22.106 5.68L12.5.135a.998.998 0 00-.998 0L1.893 5.68a.84.84 0 00-.419.726v11.186c0 .3.16.577.42.727l9.607 5.547a.999.999 0 00.998 0l9.608-5.547a.84.84 0 00.42-.727V6.407a.84.84 0 00-.42-.726zm-.603 1.176L12.228 22.92c-.063.108-.228.064-.228-.061V12.34a.59.59 0 00-.295-.51l-9.11-5.26c-.107-.062-.063-.228.062-.228h18.55c.264 0 .428.286.296.514z"></path>
    </svg>
  );
}

function PerplexityIcon({ className }: { className?: string }) {
  return (
    <svg
      style={{ flex: "none", lineHeight: 1 }}
      viewBox="0 0 24 24"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <title>Perplexity</title>
      <rect x="3.5" y="3.5" width="17" height="12" rx="3" fill="none" stroke="currentColor" strokeWidth="2" />
      <rect x="2" y="18" width="20" height="2.2" rx="1.1" fill="currentColor" />
      <rect x="9" y="7.5" width="2" height="4" rx="1" fill="currentColor" />
      <rect x="13" y="7.5" width="2" height="4" rx="1" fill="currentColor" />
    </svg>
  );
}

function MarqueeIconsRow() {
  return (
    <div className="flex w-max animate-marquee items-center">
      <div className="flex items-center shrink-0">
        <CodexIcon className="h-8 w-8 sm:h-10 sm:w-10 text-white select-none shrink-0 mr-12 sm:mr-16" />
        <OpenClawIcon className="h-8 w-8 sm:h-10 sm:w-10 select-none shrink-0 mr-12 sm:mr-16" />
        <FolkIcon className="h-8 w-8 sm:h-10 sm:w-10 select-none shrink-0 mr-12 sm:mr-16" />
        <KimiIcon className="h-8 w-8 sm:h-10 sm:w-10 select-none shrink-0 mr-12 sm:mr-16" />
        <div className="flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full bg-black shadow-sm select-none overflow-hidden mr-12 sm:mr-16">
          <HermesIcon className="h-full w-full" />
        </div>
        <ClaudeCodeIcon className="h-8 w-8 sm:h-10 sm:w-10 text-white select-none shrink-0 mr-12 sm:mr-16" />
        <ManusIcon className="h-8 w-8 sm:h-10 sm:w-10 text-white select-none shrink-0 mr-12 sm:mr-16" />
        <PerplexityIcon className="h-8 w-8 sm:h-10 sm:w-10 text-white select-none shrink-0 mr-12 sm:mr-16" />
        <CursorIcon className="h-8 w-8 sm:h-10 sm:w-10 text-white select-none shrink-0 mr-12 sm:mr-16" />
      </div>
      <div className="flex items-center shrink-0">
        <CodexIcon className="h-8 w-8 sm:h-10 sm:w-10 text-white select-none shrink-0 mr-12 sm:mr-16" />
        <OpenClawIcon className="h-8 w-8 sm:h-10 sm:w-10 select-none shrink-0 mr-12 sm:mr-16" />
        <FolkIcon className="h-8 w-8 sm:h-10 sm:w-10 select-none shrink-0 mr-12 sm:mr-16" />
        <KimiIcon className="h-8 w-8 sm:h-10 sm:w-10 select-none shrink-0 mr-12 sm:mr-16" />
        <div className="flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full bg-black shadow-sm select-none overflow-hidden mr-12 sm:mr-16">
          <HermesIcon className="h-full w-full" />
        </div>
        <ClaudeCodeIcon className="h-8 w-8 sm:h-10 sm:w-10 text-white select-none shrink-0 mr-12 sm:mr-16" />
        <ManusIcon className="h-8 w-8 sm:h-10 sm:w-10 text-white select-none shrink-0 mr-12 sm:mr-16" />
        <PerplexityIcon className="h-8 w-8 sm:h-10 sm:w-10 text-white select-none shrink-0 mr-12 sm:mr-16" />
        <CursorIcon className="h-8 w-8 sm:h-10 sm:w-10 text-white select-none shrink-0 mr-12 sm:mr-16" />
      </div>
    </div>
  );
}

export default function LandingPage() {
  const t = useTranslations();
  const howRef = useReveal();
  const matchRef = useReveal();
  const principlesRef = useReveal();
  const dialogueRef = useDialogueReveal();
  const ctaRef = useReveal();
  const activityRef = useReveal();
  const [feedMatches, setFeedMatches] = useState<FeedMatch[]>([]);
  const [selectedMatch, setSelectedMatch] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // const [repoStats, setRepoStats] = useState<RepoStats | null>(null);

  // const formatCompactNumber = (value: number) =>
  //   new Intl.NumberFormat(locale, { notation: "compact", maximumFractionDigits: 1 }).format(value);

  useEffect(() => {
    fetch("/api/feed?limit=3")
      .then((r) => r.json())
      .then((data) => setFeedMatches(data.matches || []))
      .catch(() => {});
  }, []);

  /*
  useEffect(() => {
    let cancelled = false;

    fetch("/api/github/repo")
      .then((response) => (response.ok ? response.json() : null))
      .then((data: RepoStats | null) => {
        if (cancelled || !data) return;
        setRepoStats(data);
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, []);
  */

  return (
    <div className="min-h-dvh bg-transparent">
      {/* Telegram Update Banner */}
      <div className="w-full bg-[#26A4E3] py-2 text-center text-xs text-black select-none">
        <div className="mx-auto flex max-w-5xl items-center justify-center px-4">
          <Link href="/telegram-update" className="group inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1 hover:opacity-90 transition-opacity">
            <span className="inline-flex items-center gap-1 rounded-full bg-black px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white shadow-[0_0_10px_rgba(0,0,0,0.3)]">
              Update
            </span>
            <span className="font-semibold text-black">{t("telegramUpdate.bannerText")}</span>
            <span className="font-bold text-black underline-offset-4 group-hover:underline inline-flex items-center gap-0.5">
              {t("telegramUpdate.readMore")} <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
            </span>
          </Link>
        </div>
      </div>

      {/* ── Nav ── */}
      <nav
        className="sticky top-0 z-50 backdrop-blur-xl bg-[#010103]/60 border-b border-[#1a1a1a]"
        style={{ paddingTop: "var(--safe-top)" }}
      >
        <div className="flex items-center justify-between px-4 sm:px-6 h-12 sm:h-14 max-w-5xl mx-auto">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-base sm:text-lg font-semibold text-white tracking-tight leading-none pt-0.5">{t("common.beajee")}</span>
            <img src="/beajee-star.png" alt="Beajee Star" className="w-5 h-5 object-contain select-none" />
          </Link>

          {/* Desktop nav links */}
          <div className="hidden sm:flex items-center gap-4 md:gap-6">
            <LanguageSwitcher compact />
            <a href={`${appUrl}/feed`} className="text-sm text-neutral-400 hover:text-white transition-colors">
              {t("nav.feed")}
            </a>
            <a href={`${appUrl}/login`} className="text-sm text-neutral-400 hover:text-white transition-colors">
              {t("nav.logIn")}
            </a>
            <a
              href={`${appUrl}/login`}
              className="inline-flex min-h-8 items-center justify-center rounded-full bg-white px-4 py-1.5 text-xs sm:text-sm font-medium text-black transition-colors hover:bg-neutral-200"
            >
              {t("common.getStarted")}
            </a>
          </div>

          {/* Mobile: hamburger (language lives in bottom-right FAB) */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="p-2 text-neutral-400 hover:text-white transition-colors"
              aria-label="Menu"
            >
              {mobileMenuOpen ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="sm:hidden border-t border-[#1a1a1a] px-4 py-3 flex flex-col gap-1 bg-black/90">
            <Link
              href="/idea"
              className="flex items-center gap-2 py-2.5 text-sm text-neutral-400 transition-colors hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.7"
              >
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5z" />
              </svg>
              <span>The Idea</span>
            </Link>
            <a href={`${appUrl}/feed`} className="py-2.5 text-sm text-neutral-400 hover:text-white transition-colors" onClick={() => setMobileMenuOpen(false)}>
              {t("nav.feed")}
            </a>
            <a href={`${appUrl}/login`} className="py-2.5 text-sm text-neutral-400 hover:text-white transition-colors">
              {t("nav.logIn")}
            </a>
            <a
              href={`${appUrl}/login`}
              className="mt-1 inline-flex min-h-10 w-full items-center justify-center rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black transition-colors hover:bg-neutral-200"
            >
              {t("common.getStarted")}
            </a>
          </div>
        )}
      </nav>

      <Link
        href="/idea"
        aria-label={t("landing.ideaReadCta")}
        className="fixed right-0 top-[72%] z-40 hidden translate-y-[calc(-50%+100px)] rounded-l-full border border-r-0 border-white/[0.10] bg-[#080808]/90 px-3 py-2.5 text-neutral-300 shadow-[0_18px_45px_rgba(0,0,0,0.28)] backdrop-blur-xl transition-[border-color,background-color,color,transform] duration-300 hover:-translate-x-0.5 hover:border-white/[0.18] hover:bg-[#0d0d0d] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 sm:block"
      >
        <span className="flex items-center gap-2">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.7"
          >
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5z" />
          </svg>
          <span className="text-xs font-medium">The Idea</span>
        </span>
      </Link>

      {/* ── Hero & Our Thesis Background Wrapper ── */}
      <div className="relative w-full" style={{ clipPath: "inset(0)" }}>
        {/* Fixed Background Image Container */}
        <div className="fixed inset-0 -z-10 pointer-events-none w-full h-full">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: "url('/images/starry-night.jpg')",
            }}
          />
          {/* Dark premium overlay to blend with the dark page design and maintain readability */}
          <div className="absolute inset-0 bg-[#010103]/75" />
        </div>

        {/* ── Hero ── */}
        <section
          className="relative flex min-h-[74dvh] flex-col items-center justify-center px-4 py-10 sm:px-6 overflow-hidden z-10"
          style={{ background: "radial-gradient(ellipse at center, rgba(255,255,255,0.02) 0%, transparent 70%)" }}
        >
          <TopBanner />




          <div className="relative mt-7 w-full max-w-2xl text-center">
            <h1 className="hero-title text-[2.5rem] font-semibold leading-[1.12] text-white sm:text-5xl md:text-6xl">
              {t("landing.heroTitle1")}
              <br />
              {t("landing.heroTitle2")}
            </h1>
            <p className="hero-subtitle mx-auto mt-5 max-w-xl text-base leading-7 text-neutral-400">
              {t("landing.heroSubtitle")}
            </p>
            <div className="hero-cta mt-7">
              <a
                href={`${appUrl}/login`}
                className={cx(primaryButtonClass, "group gap-2 rounded-full px-6")}
              >
                <span>{t("common.getStarted")}</span>
                <svg
                  aria-hidden="true"
                  viewBox="0 0 16 16"
                  className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5"
                >
                  <path
                    d="M3.5 8h8m0 0-3-3m3 3-3 3"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                  />
                </svg>
              </a>
            </div>

            {/* Supported agent icons row (Marquee) */}
            <div className="hero-cta mt-16 sm:mt-20 flex flex-col items-center gap-5 w-full overflow-hidden max-w-[100vw]">
              <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-neutral-500">
                {t("landing.supportedAgents.title")}
              </p>
              <div 
                className="relative w-full py-4 overflow-hidden"
                style={{
                  maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
                  WebkitMaskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)"
                }}
              >
                <MarqueeIconsRow />
              </div>
            </div>
          </div>
        </section>

        {/* ── Our Thesis ── */}
        <div className="relative z-10">
          <GranovetterSection />
        </div>
      </div>

      <ProblemSection />

      {/* ── Live Activity ── */}

      {feedMatches.length > 0 && (
        <section ref={activityRef} className="reveal mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
          <p className="mb-8 text-center text-[13px] font-semibold uppercase text-neutral-400 sm:mb-10">
            {t("landing.liveActivity")}
          </p>
          <p className="mb-8 text-center text-sm text-neutral-400 sm:mb-10">
            {t("landing.happeningNow")}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {feedMatches.map((m) => (
              <MatchCardCompact
                key={m.id}
                id={m.id}
                status={m.status}
                participants={m.participants}
                overlapSummary={m.overlapSummary}
                onClick={() => setSelectedMatch(m.id)}
              />
            ))}
          </div>
          <div className="text-center mt-8">
            <a href={`${appUrl}/feed`} className="text-sm text-neutral-500 hover:text-white transition-colors">
              {t("landing.seeAllActivity")} &rarr;
            </a>
          </div>
        </section>
      )}

      {/* ── How It Works ── */}
      <HowItWorksSection 
        ref={howRef}
        title={t("landing.howItWorks")}
        steps={[
          { num: "01", title: t("landing.step01Title"), desc: t("landing.step01Desc") },
          { num: "02", title: t("landing.step02Title"), desc: t("landing.step02Desc") },
          { num: "03", title: t("landing.step03Title"), desc: t("landing.step03Desc") },
        ]}
      />

      {/* ── Match Example ── */}
      <MatchExampleSection 
        ref={matchRef}
        title={t("landing.matchExample")}
        agentA={t("landing.agentA")}
        agentAQuote={t("landing.agentAQuote")}
        negotiating={t("landing.negotiating")}
        agentB={t("landing.agentB")}
        agentBQuote={t("landing.agentBQuote")}
        matchResultQuote={t("landing.matchResultQuote")}
      />

      {/* ── Key Principles ── */}
      <KeyPrinciplesSection 
        ref={principlesRef}
        title={t("landing.keyPrinciples")}
        principles={[
          { title: t("landing.qualityTitle"), desc: t("landing.qualityDesc") },
          { title: t("landing.mutualTitle"),  desc: t("landing.mutualDesc") },
          { title: t("landing.contextTitle"), desc: t("landing.contextDesc") },
          { title: t("landing.privacyTitle"), desc: t("landing.privacyDesc") },
        ]}
      />

      {/* ── Agent Dialogue ── */}
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
        <p className="mb-10 text-center text-[13px] font-semibold uppercase text-neutral-400">
          {t("landing.agentDialogue")}
        </p>
        <div
          ref={dialogueRef}
          className="mx-auto max-w-2xl rounded-xl border border-white/[0.08] bg-[#080808] p-5 font-mono sm:p-7"
        >
          <div className="dialogue-msg">
            <p className="text-xs text-neutral-500">{t("landing.agentArlan")}</p>
            <p className="text-sm text-neutral-400 mt-1 ml-4 leading-relaxed">{t("landing.dialogueArlan1")}</p>
          </div>
          <div className="dialogue-msg my-5 sm:my-6">
            <p className="text-xs text-neutral-500">{t("landing.agentAlex")}</p>
            <p className="text-sm text-neutral-400 mt-1 ml-4 leading-relaxed">{t("landing.dialogueAlex1")}</p>
          </div>
          <div className="dialogue-msg my-5 sm:my-6">
            <p className="text-xs text-neutral-500">{t("landing.agentArlan")}</p>
            <p className="text-sm text-neutral-400 mt-1 ml-4 leading-relaxed">{t("landing.dialogueArlan2")}</p>
          </div>
          <div className="dialogue-msg mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-[#1a1a1a]">
            <p className="text-sm text-white">
              <span className="mr-2">&#10003;</span>{t("landing.mutualAgreement")}
            </p>
            <p className="text-sm text-neutral-500 mt-1">
              <span className="mr-2">&rarr;</span>{t("landing.proposingToOwners")}
            </p>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section
        ref={ctaRef}
        className="reveal flex flex-col items-center justify-center px-4 py-16 text-center sm:px-6 sm:py-24"
      >
        <h2 className="text-3xl font-semibold leading-tight text-white sm:text-4xl">
          {t("landing.ctaTitle1")}
          <br />
          {t("landing.ctaTitle2")}
        </h2>
        <div className="mt-8">
          <a
            href={`${appUrl}/login`}
            className={cx(
              primaryButtonClass,
              "group gap-2 rounded-full px-6 shadow-[0_0_80px_rgba(255,255,255,0.06)]"
            )}
          >
            <span>{t("common.getStarted")}</span>
            <svg
              aria-hidden="true"
              viewBox="0 0 16 16"
              className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5"
            >
              <path
                d="M3.5 8h8m0 0-3-3m3 3-3 3"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              />
            </svg>
          </a>
        </div>
      </section>

      {/* ── Open Source (Hidden) ── */}
      {/*
      <section className="px-4 sm:px-6 pb-20 sm:pb-24">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-xl border border-white/[0.08] bg-[linear-gradient(135deg,rgba(255,255,255,0.05),rgba(255,255,255,0.015))] p-5 sm:p-6">
            <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <h3 className="text-xl font-semibold text-white">
                  {t("landing.openSourceTitle")}
                </h3>
                <p className="mt-2.5 max-w-xl text-sm leading-relaxed text-neutral-400">
                  {t("landing.openSourceDesc")}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {[
                    { label: t("landing.repoStars"), value: repoStats ? formatCompactNumber(repoStats.stars) : "..." },
                    { label: t("landing.repoForks"), value: repoStats ? formatCompactNumber(repoStats.forks) : "..." },
                    { label: t("landing.repoIssues"), value: repoStats ? formatCompactNumber(repoStats.openIssues) : "..." },
                    { label: t("landing.repoLicense"), value: repoStats?.license ?? "MIT" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="inline-flex items-center gap-2 rounded-full border border-[#262626] bg-[#0a0a0a] px-3 py-1.5 text-xs text-neutral-300"
                    >
                      <span className="font-semibold text-white">{item.value}</span>
                      <span className="text-neutral-500">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <a
                href={githubRepoUrl}
                target="_blank"
                rel="noreferrer"
                className={cx(primaryButtonClass, "group self-start gap-2 rounded-full pl-3.5 pr-4")}
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-3.5 w-3.5 -translate-x-px fill-current">
                  <path d="M12 .5C5.65.5.5 5.66.5 12.02c0 5.09 3.29 9.4 7.85 10.93.57.1.78-.25.78-.56 0-.27-.01-1.18-.02-2.13-3.19.7-3.87-1.35-3.87-1.35-.52-1.34-1.28-1.69-1.28-1.69-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.72-1.55-2.55-.29-5.23-1.28-5.23-5.72 0-1.27.45-2.3 1.19-3.12-.12-.29-.52-1.47.11-3.07 0 0 .97-.31 3.19 1.19a11.06 11.06 0 0 1 5.8 0c2.21-1.5 3.18-1.19 3.18-1.19.64 1.6.24 2.78.12 3.07.74.82 1.19 1.85 1.19 3.12 0 4.45-2.69 5.42-5.25 5.7.41.36.78 1.08.78 2.19 0 1.58-.01 2.85-.01 3.23 0 .31.2.67.79.56a11.53 11.53 0 0 0 7.84-10.93C23.5 5.66 18.35.5 12 .5Z" />
                </svg>
                <span>{t("landing.openSourceCta")}</span>
                <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-0.5">&rarr;</span>
              </a>
            </div>
          </div>
        </div>
      </section>
      */}

      {/* ── Footer ── */}
      <footer className="py-10 sm:py-12 px-4 sm:px-6 border-t border-[#1a1a1a]" style={{ paddingBottom: "calc(2.5rem + var(--safe-bottom))" }}>
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0">
          <span className="text-sm text-neutral-500">{t("common.beajee")}</span>
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <CookiePreferencesButton />
            <span className="text-sm text-neutral-500">{t("common.builtForAgents")}</span>
          </div>
        </div>
      </footer>

      {/* Match Modal */}
      {selectedMatch && (
        <MatchModal matchId={selectedMatch} onClose={() => setSelectedMatch(null)} />
      )}
    </div>
  );
}
