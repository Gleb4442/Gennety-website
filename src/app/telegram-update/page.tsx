import type { Metadata } from "next";
import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("telegramUpdate");

  return {
    title: `${t("pageTitle")} — Beajee`,
    description: t("pageDesc"),
  };
}

export default async function TelegramUpdatePage() {
  const t = await getTranslations();
  const locale = await getLocale();

  return (
    <div className="min-h-dvh bg-gradient-to-b from-[#030303] via-[#08080a] to-[#030303]">
      {/* ── Navbar ── */}
      <nav
        className="sticky top-0 z-50 bg-[#030303]/40 backdrop-blur-xl transition-all duration-300"
        style={{ paddingTop: "var(--safe-top)" }}
      >
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-sm font-semibold text-white tracking-tight leading-none pt-0.5 group-hover:text-neutral-300 transition-colors">
              {t("common.beajee")}
            </span>
            <img src="/beajee-star.png" alt="Beajee Star" className="w-4 h-4 object-contain select-none opacity-80 group-hover:opacity-100 transition-opacity" />
          </Link>
          <Link href="/" className="text-xs text-neutral-400 hover:text-white transition-colors flex items-center gap-1.5 font-medium">
            &larr; {t("common.back")}
          </Link>
        </div>
      </nav>

      {/* ── Main content ── */}
      <main lang={locale} className="py-12 sm:py-20">
        <article className="space-y-20">
          {/* Header */}
          <header className="max-w-2xl mx-auto text-center px-6 space-y-6">
            <div className="flex justify-center">
              <svg className="w-16 h-16 shadow-[0_10px_35px_rgba(34,158,217,0.25)] rounded-full" viewBox="0 0 240.1 240.1" xmlns="http://www.w3.org/2000/svg">
                <linearGradient id="Oval_1_" gradientUnits="userSpaceOnUse" x1="-838.041" y1="660.581" x2="-838.041" y2="660.3427" gradientTransform="matrix(1000 0 0 -1000 838161 660581)">
                  <stop offset="0" stopColor="#2AABEE" />
                  <stop offset="1" stopColor="#229ED9" />
                </linearGradient>
                <circle fillRule="evenodd" clipRule="evenodd" fill="url(#Oval_1_)" cx="120.1" cy="120.1" r="120.1" />
                <path fillRule="evenodd" clipRule="evenodd" fill="#FFFFFF" d="M54.3,118.8c35-15.2,58.3-25.3,70-30.2 c33.3-13.9,40.3-16.3,44.8-16.4c1,0,3.2,0.2,4.7,1.4c1.2,1,1.5,2.3,1.7,3.3s0.4,3.1,0.2,4.7c-1.8,19-9.6,65.1-13.6,86.3 c-1.7,9-5,12-8.2,12.3c-7,0.6-12.3-4.6-19-9c-10.6-6.9-16.5-11.2-26.8-18c-11.9-7.8-4.2-12.1,2.6-19.1c1.8-1.8,32.5-29.8,33.1-32.3 c0.1-0.3,0.1-1.5-0.6-2.1c-0.7-0.6-1.7-0.4-2.5-0.2c-1.1,0.2-17.9,11.4-50.6,33.5c-4.8,3.3-9.1,4.9-13,4.8 c-4.3-0.1-12.5-2.4-18.7-4.4c-7.5-2.4-13.5-3.7-13-7.9C45.7,123.3,48.7,121.1,54.3,118.8z" />
              </svg>
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-white leading-[1.15]">
              {t("telegramUpdate.introTitle")}
            </h1>
            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed max-w-xl mx-auto font-normal">
              {t("telegramUpdate.introDesc")}
            </p>
          </header>

          {/* Visual Gallery (Frameless) */}
          <section className="max-w-5xl mx-auto px-6">
            <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory no-scrollbar md:grid md:grid-cols-4 md:overflow-x-visible md:pb-0">
              {/* Card 1 */}
              <div className="w-[260px] shrink-0 snap-center md:w-auto group">
                <div className="aspect-[9/15] w-full rounded-2xl overflow-hidden bg-[#0c1621] border border-white/[0.04] shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-500 group-hover:translate-y-[-4px] group-hover:shadow-[0_30px_60px_rgba(34,158,217,0.15)]">
                  <img
                    src="/images/tma/chat.png"
                    alt="Beajee Chat screen"
                    className="w-full h-full object-cover select-none pointer-events-none"
                  />
                </div>
                <p className="mt-4 text-[11px] uppercase tracking-wider font-semibold text-center text-neutral-500 group-hover:text-neutral-300 transition-colors">
                  1. Member Chat
                </p>
              </div>

              {/* Card 2 */}
              <div className="w-[260px] shrink-0 snap-center md:w-auto group">
                <div className="aspect-[9/15] w-full rounded-2xl overflow-hidden bg-[#0c1621] border border-white/[0.04] shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-500 group-hover:translate-y-[-4px] group-hover:shadow-[0_30px_60px_rgba(34,158,217,0.15)]">
                  <img
                    src="/images/tma/profile.png"
                    alt="Beajee Agent Status"
                    className="w-full h-full object-cover select-none pointer-events-none"
                  />
                </div>
                <p className="mt-4 text-[11px] uppercase tracking-wider font-semibold text-center text-neutral-500 group-hover:text-neutral-300 transition-colors">
                  2. Agent Control
                </p>
              </div>

              {/* Card 3 */}
              <div className="w-[260px] shrink-0 snap-center md:w-auto group">
                <div className="aspect-[9/15] w-full rounded-2xl overflow-hidden bg-[#0c1621] border border-white/[0.04] shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-500 group-hover:translate-y-[-4px] group-hover:shadow-[0_30px_60px_rgba(34,158,217,0.15)]">
                  <img
                    src="/images/tma/matches.png"
                    alt="Beajee Matches list"
                    className="w-full h-full object-cover select-none pointer-events-none"
                  />
                </div>
                <p className="mt-4 text-[11px] uppercase tracking-wider font-semibold text-center text-neutral-500 group-hover:text-neutral-300 transition-colors">
                  3. Introductions
                </p>
              </div>

              {/* Card 4 */}
              <div className="w-[260px] shrink-0 snap-center md:w-auto group">
                <div className="aspect-[9/15] w-full rounded-2xl overflow-hidden bg-[#0c1621] border border-white/[0.04] shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-500 group-hover:translate-y-[-4px] group-hover:shadow-[0_30px_60px_rgba(34,158,217,0.15)]">
                  <img
                    src="/images/tma/status.png"
                    alt="Beajee Profile settings"
                    className="w-full h-full object-cover select-none pointer-events-none"
                  />
                </div>
                <p className="mt-4 text-[11px] uppercase tracking-wider font-semibold text-center text-neutral-500 group-hover:text-neutral-300 transition-colors">
                  4. Social Connect
                </p>
              </div>
            </div>
          </section>

          {/* Key Features (Minimal Narrative Flow) */}
          <section className="max-w-2xl mx-auto px-6 space-y-16">
            <div className="space-y-3">
              <h2 className="text-xl font-medium text-white tracking-tight">{t("telegramUpdate.feature1Title")}</h2>
              <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">{t("telegramUpdate.feature1Desc")}</p>
            </div>
            
            <div className="space-y-3">
              <h2 className="text-xl font-medium text-white tracking-tight">{t("telegramUpdate.feature2Title")}</h2>
              <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">{t("telegramUpdate.feature2Desc")}</p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-medium text-white tracking-tight">{t("telegramUpdate.feature3Title")}</h2>
              <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">{t("telegramUpdate.feature3Desc")}</p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-medium text-white tracking-tight">{t("telegramUpdate.feature4Title")}</h2>
              <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">{t("telegramUpdate.feature4Desc")}</p>
            </div>
          </section>

          {/* How to Get Started */}
          <section className="max-w-2xl mx-auto px-6 pt-10 space-y-8">
            <h2 className="text-2xl font-semibold text-white tracking-tight">{t("telegramUpdate.howToTitle")}</h2>
            
            <ol className="space-y-6 text-sm sm:text-base text-neutral-400 leading-relaxed list-none pl-0">
              <li className="flex items-start gap-4">
                <span className="flex-shrink-0 text-sm font-bold text-white mt-0.5 w-4 text-right">
                  1.
                </span>
                <span>{t("telegramUpdate.howToStep1").replace(/^\d+\.\s*/, "")}</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex-shrink-0 text-sm font-bold text-white mt-0.5 w-4 text-right">
                  2.
                </span>
                <span>{t("telegramUpdate.howToStep2").replace(/^\d+\.\s*/, "")}</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex-shrink-0 text-sm font-bold text-white mt-0.5 w-4 text-right">
                  3.
                </span>
                <span>{t("telegramUpdate.howToStep3").replace(/^\d+\.\s*/, "")}</span>
              </li>
            </ol>

            <div className="pt-4 flex justify-center">
              <a
                href="https://t.me/BeajeeBot"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#229ED9] px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-[#1d8bcb] hover:scale-[1.02] active:scale-[0.98] shadow-[0_15px_30px_rgba(34,158,217,0.25)]"
              >
                <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 240.1 240.1" xmlns="http://www.w3.org/2000/svg">
                  <linearGradient id="Oval_btn" gradientUnits="userSpaceOnUse" x1="-838.041" y1="660.581" x2="-838.041" y2="660.3427" gradientTransform="matrix(1000 0 0 -1000 838161 660581)">
                    <stop offset="0" stopColor="#2AABEE" />
                    <stop offset="1" stopColor="#229ED9" />
                  </linearGradient>
                  <circle fillRule="evenodd" clipRule="evenodd" fill="url(#Oval_btn)" cx="120.1" cy="120.1" r="120.1" />
                  <path fillRule="evenodd" clipRule="evenodd" fill="#FFFFFF" d="M54.3,118.8c35-15.2,58.3-25.3,70-30.2 c33.3-13.9,40.3-16.3,44.8-16.4c1,0,3.2,0.2,4.7,1.4c1.2,1,1.5,2.3,1.7,3.3s0.4,3.1,0.2,4.7c-1.8,19-9.6,65.1-13.6,86.3 c-1.7,9-5,12-8.2,12.3c-7,0.6-12.3-4.6-19-9c-10.6-6.9-16.5-11.2-26.8-18c-11.9-7.8-4.2-12.1,2.6-19.1c1.8-1.8,32.5-29.8,33.1-32.3 c0.1-0.3,0.1-1.5-0.6-2.1c-0.7-0.6-1.7-0.4-2.5-0.2c-1.1,0.2-17.9,11.4-50.6,33.5c-4.8,3.3-9.1,4.9-13,4.8 c-4.3-0.1-12.5-2.4-18.7-4.4c-7.5-2.4-13.5-3.7-13-7.9C45.7,123.3,48.7,121.1,54.3,118.8z" />
                </svg>
                <span>{t("telegramUpdate.ctaText")}</span>
              </a>
            </div>
          </section>
        </article>
      </main>
    </div>
  );
}
