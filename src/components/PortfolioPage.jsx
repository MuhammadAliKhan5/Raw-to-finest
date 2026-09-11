import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Clapperboard,
  Palette,
  Play,
  Scissors,
  Volume2,
  VolumeX,
  Wand2,
} from "lucide-react";

import {
  Divider,
  SectionLabel,
  GlassPill,
  MagneticButton,
  ParticleField,
  DynamicCursor,
  Header,
  Footer,
  BookingModal,
  Reveal,
  RevealGroup,
  RevealItem,
  CountUp,
  useReveal,
  PageTransition,
  ScrollProgressBar,
  StickyCTA,
  PROGRAM_LINKS,
} from "./SiteChrome";
import GlobalStyles from "./GlobalStyles";
import { GsapHorizontalScroll, GsapScrollReveal } from "./effects/GsapKit";
import { Globe as GlobeIcon, Target as TargetIcon } from "lucide-react";

const PROGRAM_ICONS = [Palette, Clapperboard, GlobeIcon, TargetIcon];

/* ---------------------------------------------------------------------- */
/*  CONTENT — Raw to Finest portfolio / content menu                      */
/* ---------------------------------------------------------------------- */

const impactStats = [
  ["500+", "PROJECTS DELIVERED"],
  ["92%", "CLIENT RETENTION"],
  ["4.9/5", "AVERAGE RATING"],
  ["48HR", "AVG. TURNAROUND"],
];

const graphicDesignItems = [
  {
    src: "https://mycontentkitchen.com/wp-content/uploads/2025/07/HealthStay-Post-Portfolio-scaled-1024x652.jpg",
    tag: "SOCIAL POST",
    title: "HealthStay campaign",
    aspect: "aspect-[4/5]",
  },
  {
    src: "https://mycontentkitchen.com/wp-content/uploads/2025/07/Rectangle-8249-1024x699.jpg",
    tag: "BRAND CONTENT",
    title: "Feed design system",
    aspect: "aspect-square",
  },
  {
    src: "https://mycontentkitchen.com/wp-content/uploads/2025/07/Rectangle-8246-1024x699.jpg",
    tag: "SOCIAL POST",
    title: "Product spotlight",
    aspect: "aspect-[4/3]",
  },
  {
    src: "https://mycontentkitchen.com/wp-content/uploads/2025/07/Rectangle-8245-1024x699.jpg",
    tag: "CAMPAIGN",
    title: "Launch series",
    aspect: "aspect-[4/5]",
  },
  {
    src: "https://mycontentkitchen.com/wp-content/uploads/2025/07/Rectangle-8240-3.png",
    tag: "GRAPHIC",
    title: "Carousel design",
    aspect: "aspect-square",
  },
  {
    src: "https://mycontentkitchen.com/wp-content/uploads/2025/07/Rectangle-8240-2.png",
    tag: "GRAPHIC",
    title: "Story template",
    aspect: "aspect-[4/3]",
  },
  {
    src: "https://mycontentkitchen.com/wp-content/uploads/2025/07/Rectangle-8240-1.png",
    tag: "GRAPHIC",
    title: "Promo tile",
    aspect: "aspect-[4/5]",
  },
  {
    src: "https://mycontentkitchen.com/wp-content/uploads/2025/07/Rectangle-8240-1-1.png",
    tag: "GRAPHIC",
    title: "Announcement post",
    aspect: "aspect-square",
  },
  {
    src: "https://mycontentkitchen.com/wp-content/uploads/2025/07/Rectangle-8240-7.png",
    tag: "GRAPHIC",
    title: "Quote card",
    aspect: "aspect-[4/3]",
  },
  {
    src: "https://mycontentkitchen.com/wp-content/uploads/2025/07/Rectangle-8240-4.png",
    tag: "GRAPHIC",
    title: "Event graphic",
    aspect: "aspect-[4/5]",
  },
  {
    src: "https://darkgoldenrod-frog-789331.hostingersite.com/wp-content/uploads/2025/05/Group-2147226394-15.png",
    tag: "GRAPHIC",
    title: "Feature graphic",
    aspect: "aspect-square",
  },
  {
    src: "https://mycontentkitchen.com/wp-content/uploads/2025/07/Rectangle-8240-5.png",
    tag: "GRAPHIC",
    title: "Highlight cover",
    aspect: "aspect-[4/3]",
  },
];

const videoEditItems = [
  {
    src: "https://www.pexels.com/download/video/15821942/",
    title: "Podcast reel",
    tag: "PODCAST CUT",
  },
  {
    src: "https://www.pexels.com/download/video/33812576/",
    title: "Brand reel",
    tag: "SOCIAL EDIT",
  },
  {
    src: "https://www.pexels.com/download/video/7103634/",
    title: "Founder story",
    tag: "TALKING HEAD",
  },
  {
    src: "https://www.pexels.com/download/video/33891312/",
    title: "Product edit",
    tag: "PRODUCT CUT",
  },
  {
    src: "https://www.pexels.com/download/video/38369995/",
    title: "Lifestyle reel",
    tag: "LIFESTYLE",
  },
  {
    src: "https://www.pexels.com/download/video/33891300/",
    title: "Campaign cut",
    tag: "CAMPAIGN",
  }
];

const webDesignItems = [
  { src: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=1400&q=88", title: "Aster Studio", tag: "CREATIVE STUDIO", accent: "#80EAFF" },
  { src: "https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=1400&q=88", title: "Northline", tag: "SAAS EXPERIENCE", accent: "#53C8FF" },
  { src: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1400&q=88", title: "Gather & Grow", tag: "COMMUNITY BRAND", accent: "#71DFFF" },
  { src: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=1400&q=88", title: "Atelier No. 08", tag: "EDITORIAL SHOP", accent: "#318DFF" },
  { src: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=1400&q=88", title: "Forma", tag: "PRODUCT LANDING", accent: "#BCEEFF" },
  { src: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1400&q=88", title: "Fieldwork", tag: "BUSINESS WEBSITE", accent: "#80EAFF" },
];

const heroVisuals = [
  { src: "https://images.unsplash.com/photo-1545235617-9465d2a55698?auto=format&fit=crop&w=1000&q=88", title: "Interface art direction" },
  { src: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1000&q=88", title: "Brand design workspace" },
  { src: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?auto=format&fit=crop&w=1000&q=88", title: "Digital design study" },
];

const fullSpreadVisuals = [
  {
    type: "image",
    src: graphicDesignItems[0].src,
    alt: "Graphic design campaign work",
    note: "Identity / campaigns / social",
    href: "#graphic-design",
  },
  {
    type: "video",
    src: videoEditItems[1].src,
    alt: "Video editing showreel preview",
    note: "Short-form / long-form / ads",
    href: "#video-edits",
  },
  {
    type: "image",
    src: webDesignItems[0].src,
    alt: "Website design workspace",
    note: "Strategy / UX / development",
    href: "#web-design",
  },
  {
    type: "image",
    src: heroVisuals[1].src,
    alt: "Brand strategy and creative direction workspace",
    note: "Positioning / systems / direction",
    href: "/#programs",
  },
];

/* ---------------------------------------------------------------------- */
/*  LOCAL HELPERS — the "menu" sections' decorative trims                 */
/* ---------------------------------------------------------------------- */

function ZigzagEdge({ color = "#3FA34D", side = "left" }) {
  const size = 16;
  const bgImage = `linear-gradient(135deg, ${color} 25%, transparent 25.5%),
    linear-gradient(225deg, ${color} 25%, transparent 25.5%),
    linear-gradient(315deg, ${color} 25%, transparent 25.5%),
    linear-gradient(45deg, ${color} 25%, transparent 25.5%)`;

  if (side === "top") {
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-4"
        style={{
          backgroundImage: bgImage,
          backgroundPosition: `0 -${size / 2}px, 0 -${size / 2}px, 0 0, 0 0`,
          backgroundSize: `${size}px ${size}px`,
        }}
      />
    );
  }

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-y-0 z-10 hidden w-4 md:block ${side === "left" ? "left-0" : "right-0"
        }`}
      style={{
        backgroundImage: bgImage,
        backgroundPosition: `-${size / 2}px 0, -${size / 2}px 0, 0 0, 0 0`,
        backgroundSize: `${size}px ${size}px`,
      }}
    />
  );
}

function Mascot({ accent = "#3FA34D", icon: Icon = Wand2, flip = false, className = "" }) {
  return (
    <div
      className={`pointer-events-none absolute z-10 hidden select-none sm:block ${className}`}
      aria-hidden="true"
    >
      <div className={`mascot-float relative ${flip ? "-scale-x-100" : ""}`}>
        <svg width="72" height="98" viewBox="0 0 86 118" fill="none">
          <path
            d="M43 6 L78 96 C78 108 62 114 43 114 C24 114 8 108 8 96 Z"
            fill="#EEF8FF"
            stroke="#07102F"
            strokeWidth="3"
          />
          <circle cx="34" cy="58" r="3.5" fill="#07102F" />
          <circle cx="52" cy="58" r="3.5" fill="#07102F" />
          <path d="M34 73 Q43 79 52 73" stroke="#07102F" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M12 92 L1 110 M74 92 L85 110" stroke="#07102F" strokeWidth="3" strokeLinecap="round" />
        </svg>
        <span
          className="absolute -top-3 left-1/2 flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full border-2 border-[#07102F] bg-white shadow-[0_4px_0_rgba(24,13,36,.9)]"
          style={{ color: accent }}
        >
          <Icon size={16} strokeWidth={2.4} />
        </span>
      </div>
    </div>
  );
}

function VideoCard({ item, index = 0, active = false }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (active) {
      video.play().catch(() => setPlaying(false));
    } else {
      video.pause();
    }
  }, [active]);

  const startWhenReady = () => {
    setReady(true);
    setFailed(false);
    if (active) {
      videoRef.current?.play().catch(() => setPlaying(false));
    }
  };

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play()
        .then(() => setPlaying(true))
        .catch(() => {});
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  const toggleSound = (event) => {
    event.stopPropagation();

    const video = videoRef.current;
    if (!video) return;

    const nextMuted = !video.muted;
    video.muted = nextMuted;
    setMuted(nextMuted);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.5,
        delay: index * 0.05,
      }}
      className="flex justify-center"
    >
      <div
        onClick={toggle}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            toggle();
          }
        }}
        role="button"
        tabIndex={0}
        aria-label={`${playing ? "Pause" : "Play"} ${item.title}`}
        className="
          relative
          w-full
          max-w-[280px]
          overflow-hidden
          rounded-2xl
          border border-white/10
          bg-black/30
          shadow-xl
          cursor-pointer
        "
      >
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_50%_35%,rgba(168,85,247,.24),transparent_42%),linear-gradient(155deg,#12091b,#030306)]">
          <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:24px_24px]" />
          <div className="relative flex flex-col items-center gap-3 text-center">
            <span className={`flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/[.06] text-[#d8b4fe] backdrop-blur-xl ${!ready && !failed ? "animate-pulse" : ""}`}>
              {failed ? <Clapperboard size={18} /> : <Play size={17} fill="currentColor" />}
            </span>
            <span className="text-[8px] font-semibold uppercase tracking-[.2em] text-white/45">
              {failed ? "Preview unavailable" : "Loading preview"}
            </span>
          </div>
        </div>

        <video
          ref={videoRef}
          src={item.src}
          aria-label={`${item.title} video preview`}
          className={`relative block aspect-[9/16] w-full object-cover transition-opacity duration-500 ${ready ? "opacity-100" : "opacity-0"}`}
          muted={muted}
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          onLoadedData={startWhenReady}
          onCanPlay={startWhenReady}
          onError={() => {
            setFailed(true);
            setReady(false);
            setPlaying(false);
          }}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        />

        {/* Controls */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
          <span className="rounded-full bg-black/60 px-3 py-1 text-xs text-white backdrop-blur-md">
            {item.tag}
          </span>

          <button
            type="button"
            onClick={toggleSound}
            aria-label={muted ? `Unmute ${item.title}` : `Mute ${item.title}`}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md"
          >
            {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
        </div>

        {/* Play icon */}
        {!playing && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md">
              <Play size={18} fill="currentColor" />
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ---------------------------------------------------------------------- */
/*  PAGE                                                                  */
/* ---------------------------------------------------------------------- */

export default function PortfolioPage() {
  useReveal();

  const [bookingOpen, setBookingOpen] = useState(false);
  const [videoSectionActive, setVideoSectionActive] = useState(false);
  const videoSectionRef = useRef(null);

  useEffect(() => {
    document.body.classList.add("raw-to-finess-page");
    return () => document.body.classList.remove("raw-to-finess-page");
  }, []);

  useEffect(() => {
    const section = videoSectionRef.current;
    if (!section) return;

    let sectionIsVisible = false;
    const syncPlayback = () => {
      setVideoSectionActive(sectionIsVisible && !document.hidden);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        sectionIsVisible = entry.isIntersecting;
        syncPlayback();
      },
      { threshold: 0.05, rootMargin: "0px 0px -12% 0px" }
    );

    observer.observe(section);
    document.addEventListener("visibilitychange", syncPlayback);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", syncPlayback);
    };
  }, []);

  const openBooking = () => setBookingOpen(true);
  const closeBooking = () => setBookingOpen(false);

  return (
    <PageTransition>
      <DynamicCursor />
      <ScrollProgressBar />

      <div className="min-h-screen [overflow:clip] bg-[var(--ink)] font-body text-[#F2FAFF] selection:bg-[var(--orchid)] selection:text-[#07102F]">
        <Header active="/portfolio" onBook={openBooking} />

        <main id="portfolio-top" tabIndex="-1">
          {/* ================= HERO ================= */}
          <section className="hero-section relative overflow-hidden pt-[130px] md:pt-[150px]">
            <div className="hero-orb hero-orb-a" />
            <div className="hero-orb hero-orb-b" />
            <ParticleField />

            <div className="relative mx-auto grid max-w-[1480px] items-center gap-14 px-5 pb-20 md:px-8 md:pb-28 lg:grid-cols-[1.05fr_.95fr]">
              <motion.div
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
                initial="hidden"
                animate="show"
              >
                <RevealItem>
                  <GlassPill>CLIENT RESULTS</GlassPill>
                </RevealItem>

                <RevealItem className="mt-7 max-w-[1050px] font-display text-[clamp(2.9rem,7.4vw,7.4rem)] font-bold leading-[0.85] tracking-[-0.07em]">
                  REAL WORK.
                  <br />
                  <span className="gradient-text-hero font-editorial italic">Real results.</span>
                </RevealItem>

                <RevealItem className="mt-7 max-w-[520px] text-sm leading-7 text-white/40 md:text-base">
                  Every piece here followed the same Raw to Finest method raw
                  footage and rough drafts, refined into work our clients are
                  proud to publish.
                </RevealItem>

                <RevealItem className="mt-9 flex flex-wrap items-center gap-4">
                  <MagneticButton onClick={openBooking}>
                    Start your project
                    <ArrowUpRight size={14} />
                  </MagneticButton>
                  <a
                    href="#graphic-design"
                    className="label-mono flex items-center gap-2 px-3 py-4 text-[10px] uppercase tracking-[0.18em] text-black transition hover:text-white hover:bg-black bg-white rounded-3xl"
                  >
                    See the work
                  </a>
                </RevealItem>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 90, rotate: 4 }} animate={{ opacity: 1, x: 0, rotate: 0 }} transition={{ duration: 1.05, delay: .2, ease: [0.16, 1, .3, 1] }} className="relative hidden h-[520px] lg:block">
                {heroVisuals.map((item, index) => (
                  <motion.div key={item.src} animate={{ y: [0, index % 2 ? 14 : -12, 0] }} transition={{ duration: 6 + index, repeat: Infinity, ease: "easeInOut" }} className={`absolute overflow-hidden rounded-[28px] border border-white/15 bg-white/5 p-2 shadow-[0_35px_90px_rgba(0,0,0,.45)] ${index === 0 ? "left-[8%] top-[4%] h-[360px] w-[270px] -rotate-6" : index === 1 ? "right-[2%] top-[16%] h-[330px] w-[245px] rotate-6" : "bottom-[0] left-[30%] h-[230px] w-[310px] rotate-1"}`}>
                    <img src={item.src} alt={item.title} className="h-full w-full rounded-[21px] object-cover" />
                  </motion.div>
                ))}
                <div className="absolute right-8 top-0 rounded-full border border-white/15 bg-[#201032]/80 px-4 py-2 label-mono text-[8px] uppercase tracking-[.2em] text-white/60 backdrop-blur-xl">Selected work / 2026</div>
              </motion.div>

              <RevealGroup className="mt-10 grid grid-cols-2 gap-4 border-y border-white/10 py-8 md:grid-cols-4 lg:col-span-2">
                {impactStats.map(([value, label]) => (
                  <RevealItem key={label}>
                    <CountUp value={value} className="block font-display text-3xl font-bold tracking-[-0.04em] text-white md:text-4xl" />
                    <div className="label-mono mt-2 text-[7px] uppercase tracking-[0.2em] text-white/30">{label}</div>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>

            <Divider variant="wave" fill="#060A31" />
          </section>

          {/* ================= HORIZONTAL SCROLL — THE FULL SPREAD ========== */}
          <section className="relative bg-[#060A31] py-20 md:py-28">
            <div className="mx-auto max-w-[1480px] px-5 md:px-8">
              <Reveal className="mb-12 text-center text-white">
                <SectionLabel light>THE FULL SPREAD</SectionLabel>
                <h2 className="mt-5 font-display text-[clamp(2.2rem,5vw,4.4rem)] font-bold leading-[0.9] tracking-[-0.05em]">
                  Four ways we take it
                  <br />
                  <span className="gradient-text-hero font-editorial italic">from raw to finest.</span>
                </h2>
                <p className="mx-auto mt-6 max-w-[620px] text-base leading-8 text-white/70">
                  Four connected disciplines, each designed to turn unfinished ideas into clear, high-impact work.
                </p>
              </Reveal>
            </div>

            <GsapHorizontalScroll trackClassName="gap-6 px-5 md:px-8" speed={0.9}>
              {PROGRAM_LINKS.map(([number, label], index) => {
                const Icon = PROGRAM_ICONS[index] || Palette;
                const visual = fullSpreadVisuals[index];
                return (
                  <motion.a
                    key={number}
                    href={visual.href}
                    whileHover={{ y: -10 }}
                    transition={{ type: "spring", stiffness: 300, damping: 24 }}
                    className="full-spread-card group relative h-[460px] w-[82vw] shrink-0 overflow-hidden rounded-[28px] border border-white/10 bg-[#050307] p-3 text-white sm:w-[430px] md:h-[500px]"
                  >
                    <div className="relative h-[64%] overflow-hidden rounded-[20px] border border-white/[.07] bg-[#0a060d]">
                      {visual.type === "video" ? (
                        <video
                          src={visual.src}
                          aria-label={visual.alt}
                          muted
                          loop
                          autoPlay
                          playsInline
                          preload="metadata"
                          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <img
                          src={visual.src}
                          alt={visual.alt}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/5 to-black/15" />
                      <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/55 px-3 py-2 label-mono text-[9px] tracking-[.18em] text-white/75 backdrop-blur-xl">R2F / {number}</span>
                      <span className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full border border-[#a855f7]/35 bg-black/60 text-[#d8b4fe] shadow-[0_0_28px_rgba(124,58,237,.24)] backdrop-blur-xl transition duration-300 group-hover:rotate-6 group-hover:bg-[#7c3aed] group-hover:text-white">
                        <Icon size={20} strokeWidth={1.7} />
                      </span>
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                        <span className="text-[9px] font-semibold uppercase tracking-[.18em] text-white/70">{visual.note}</span>
                        {visual.type === "video" && <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-black"><Play size={12} fill="currentColor" /></span>}
                      </div>
                    </div>
                    <div className="flex h-[36%] items-end justify-between gap-5 px-4 pb-5 pt-7 md:px-6">
                      <div>
                        <div className="font-display text-3xl font-bold tracking-[-0.04em] text-white md:text-4xl">{label}</div>
                        <p className="mt-3 max-w-[300px] text-sm leading-6 text-white/65">Raw input, refined into work your audience actually stops for.</p>
                      </div>
                      <span className="mb-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/12 text-white/65 transition duration-300 group-hover:border-[#a855f7] group-hover:bg-[#a855f7] group-hover:text-white">
                        <ArrowUpRight size={17} />
                      </span>
                    </div>
                  </motion.a>
                );
              })}
            </GsapHorizontalScroll>
            <Divider variant="softwave" fill="#1646D8" />
          </section>

          {/* ================= WEB DESIGN ================= */}
          <section id="web-design" className="menu-section relative overflow-hidden bg-[#EEF7FF] text-[#07102F]">
            <div className="absolute inset-0 opacity-60 [background-image:radial-gradient(circle_at_20%_10%,rgba(23,104,255,.22),transparent_34%),radial-gradient(circle_at_85%_75%,rgba(110,231,255,.2),transparent_30%)]" />
            <div className="relative mx-auto max-w-[1480px] px-5 py-20 md:px-10 md:py-28">
              <Reveal className="text-center">
                <SectionLabel>03 / DIGITAL EXPERIENCES</SectionLabel>
                <h2 className="mt-5 font-display text-[clamp(2.8rem,7vw,6rem)] font-bold uppercase leading-[.9]">Web Design</h2>
                <p className="mx-auto mt-5 max-w-[560px] text-sm leading-7 text-[#07102F]/50">Conversion-minded websites shaped with clear hierarchy, distinctive art direction and smooth interactions.</p>
              </Reveal>
              <RevealGroup className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {webDesignItems.map((item, index) => (
                  <GsapScrollReveal key={item.src} direction={index % 3 === 0 ? "left" : index % 3 === 2 ? "right" : "up"} index={index}>
                    <motion.article key={item.src} initial={{ opacity: 0, x: index % 3 === 0 ? -150 : index % 3 === 2 ? 150 : 0, y: index % 3 === 1 ? 120 : 35, rotateY: index % 3 === 0 ? -20 : index % 3 === 2 ? 20 : 0, scale: .88 }} whileInView={{ opacity: 1, x: 0, y: 0, rotateY: 0, scale: 1 }} viewport={{ once: true, amount: .3 }} transition={{ type: "spring", stiffness: 105, damping: 16, delay: (index % 3) * .12 }} whileHover={{ y: -12, rotate: index % 2 ? .8 : -.8, scale: 1.015 }} className="group overflow-hidden rounded-[26px] border border-[#07102F]/10 bg-white p-3 shadow-[0_20px_55px_-30px_rgba(24,13,36,.4)]">
                      <div className="media-raw aspect-[16/11] overflow-hidden rounded-[19px]"><img src={item.src} alt={`${item.title} web design concept`} loading="lazy" className="h-full w-full object-cover" /></div>
                      <div className="flex items-end justify-between gap-4 px-2 pb-2 pt-5"><div><span className="label-mono text-[7px] tracking-[.18em] text-[var(--violet)]">{item.tag}</span><h3 className="mt-1 font-display text-xl font-bold">{item.title}</h3></div><span className="h-3 w-3 rounded-full" style={{ background: item.accent }} /></div>
                    </motion.article>
                  </GsapScrollReveal>
                ))}
              </RevealGroup>
            </div>
            <Divider variant="arc" fill="#060A31" />
          </section>

          {/* ================= VIDEO EDITS ================= */}
          <section
            ref={videoSectionRef}
            id="video-edits"
            className="menu-section relative overflow-hidden"
            style={{ background: "#0A1748" }}
          >
            <ZigzagEdge color="#71DFFF" side="right" />
            <Mascot accent="#71DFFF" icon={Scissors} flip className="left-6 top-6 md:left-14 md:top-10" />

            <div className="relative mx-auto max-w-[1480px] px-5 py-20 md:px-10 md:py-28">
              <Reveal className="text-center">
                <div className="mb-4 flex justify-center">
                  <GlassPill>
                    <Clapperboard size={11} className="mr-1 inline -translate-y-px" />
                    THE MAIN COURSE
                  </GlassPill>
                </div>
                <h2 className="menu-heading menu-heading-light">VIDEO EDITS</h2>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="menu-card relative mt-10 overflow-hidden rounded-[30px] border-[3px] border-[#07102F]/15 bg-[#EEF8FF] p-5 shadow-[0_25px_60px_-20px_rgba(0,0,0,.35)] md:mt-14 md:p-9">
                  <RevealGroup className="grid grid-cols-3 gap-3 md:gap-4">
                    {videoEditItems.map((item, index) => (
                      <GsapScrollReveal key={item.src + index} direction={index % 3 === 0 ? "left" : index % 3 === 2 ? "right" : "up"} index={index}>
                        <VideoCard item={item} index={index} active={videoSectionActive} />
                      </GsapScrollReveal>
                    ))}
                  </RevealGroup>
                </div>
              </Reveal>

              <p className="label-mono mt-6 text-center text-[8px] uppercase tracking-[0.2em] text-white/35">
                Tap a clip to pause · tap the speaker to unmute
              </p>
            </div>

            <Divider variant="arc" fill="#060A31" />
          </section>

          {/* ================= GRAPHIC DESIGN ================= */}
          <section
            id="graphic-design"
            className="menu-section relative overflow-hidden"
            style={{ background: "#1646D8" }}
          >
            <ZigzagEdge color="#80EAFF" side="left" />
            <Mascot accent="#80EAFF" icon={Wand2} className="right-6 top-6 md:right-14 md:top-10" />

            <div className="relative mx-auto max-w-[1480px] px-5 py-20 md:px-10 md:py-28">
              <Reveal className="text-center">
                <div className="mb-4 flex justify-center">
                  <GlassPill dark>
                    <Palette size={11} className="mr-1 inline -translate-y-px" />
                    THE STARTER
                  </GlassPill>
                </div>
                <h2 className="menu-heading">GRAPHIC DESIGN</h2>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="menu-card relative mt-10 overflow-hidden rounded-[30px] border-[3px] border-[#07102F]/15 bg-[#EEF8FF] p-5 shadow-[0_25px_60px_-20px_rgba(0,0,0,.35)] md:mt-14 md:p-9">
                  <RevealGroup className="columns-2 gap-4 md:columns-3">
                    {graphicDesignItems.map((item, index) => (
                      <GsapScrollReveal key={item.title + index} direction={index % 3 === 0 ? "left" : index % 3 === 2 ? "right" : "up"} index={index} className="break-inside-avoid">
                        <motion.div
                          initial={{ opacity: 0, x: index % 3 === 0 ? -140 : index % 3 === 2 ? 140 : 0, y: index % 3 === 1 ? 110 : 35, rotate: index % 3 === 0 ? -7 : index % 3 === 2 ? 7 : 0, scale: .88 }}
                          whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }}
                          viewport={{ once: true, amount: .28 }}
                          whileHover={{ y: -7, rotate: index % 2 === 0 ? -0.6 : 0.6 }}
                          transition={{ type: "spring", stiffness: 280, damping: 20 }}
                          className={`media-raw group relative mb-4 break-inside-avoid rounded-2xl border-2 border-[#07102F]/10 bg-white shadow-[0_2px_0_rgba(24,13,36,.1)] transition-shadow duration-500 hover:shadow-[0_22px_45px_-15px_rgba(24,13,36,.45)] ${item.aspect}`}
                        >
                          <img
                            src={item.src}
                            alt={item.title}
                            loading="lazy"
                            decoding="async"
                            className="h-full w-full object-cover"
                          />
                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
                          <span className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/0 transition duration-500 group-hover:ring-white/20" />
                          <div className="absolute bottom-2 left-2 right-2 translate-y-2 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                            <span className="label-mono rounded-full bg-black/60 px-2 py-1 text-[6.5px] uppercase tracking-[0.16em] text-white">
                              {item.tag}
                            </span>
                          </div>
                        </motion.div>
                      </GsapScrollReveal>
                    ))}
                  </RevealGroup>
                </div>
              </Reveal>
            </div>

            <Divider variant="chevron" fill="#0A1748" />
          </section>





          {/* ================= READY TO ORDER ================= */}
          <section className="relative overflow-hidden bg-[#060A31] py-20 text-center text-white md:py-28">
            <ParticleField />
            <div className="relative mx-auto max-w-[900px] px-5 md:px-8">
              <Reveal>
                <SectionLabel light>
                  <span className="mx-auto">READY TO ORDER?</span>
                </SectionLabel>
                <h2 className="mt-7 font-display text-[clamp(2.4rem,6vw,5.2rem)] font-bold leading-[0.87] tracking-[-0.06em]">
                  LET'S COOK UP
                  <br />
                  <span className="gradient-text-hero font-editorial italic">your next project.</span>
                </h2>
                <p className="mx-auto mt-6 max-w-[480px] text-sm leading-7 text-white/40">
                  Book a free call and tell us what's on the menu — graphic
                  design, video edits, web design, or all three.
                </p>
                <div className="mt-9 flex flex-wrap justify-center gap-4">
                  <MagneticButton onClick={openBooking}>
                    Book a call
                    <ArrowUpRight size={14} />
                  </MagneticButton>
                  <MagneticButton href="/pricing" variant="ghost">
                    View pricing
                  </MagneticButton>
                </div>
              </Reveal>
            </div>
          </section>
        </main>

        <Footer onBook={openBooking} />
        <BookingModal isOpen={bookingOpen} onClose={closeBooking} />
        <StickyCTA onBook={openBooking} />
      </div>

      <GlobalStyles />

      <style>{`
        .menu-section { isolation: isolate; }

        .menu-heading {
          font-family: "Poppins", ui-sans-serif, system-ui, sans-serif;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: -0.03em;
          font-size: clamp(2.6rem, 8vw, 5.4rem);
          line-height: 0.95;
          color: #fff;
          -webkit-text-stroke: 2px #07102F;
          text-shadow: 4px 4px 0 #07102F;
        }
        .menu-heading-light {
          -webkit-text-stroke: 2px #0b1030;
          text-shadow: 4px 4px 0 #0b1030;
        }
        @media (min-width: 768px) {
          .menu-heading { -webkit-text-stroke: 3px #07102F; text-shadow: 6px 6px 0 #07102F; }
          .menu-heading-light { -webkit-text-stroke: 3px #0b1030; text-shadow: 6px 6px 0 #0b1030; }
        }

        .menu-card { position: relative; }

        .mascot-float { animation: mascotFloat 4.5s ease-in-out infinite; }

        @keyframes mascotFloat {
          0%, 100% { transform: translateY(0) rotate(-2deg); }
          50% { transform: translateY(-10px) rotate(2deg); }
        }

        @media (prefers-reduced-motion: reduce) {
          .mascot-float { animation: none; }
        }
      `}</style>
    </PageTransition>
  );
}
