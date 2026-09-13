import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Clapperboard,
  Palette,
  Pause,
  Play,
  Volume2,
  VolumeX,
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

const impactStats = [
  ["500+", "PROJECTS DELIVERED"],
  ["92%", "CLIENT RETENTION"],
  ["4.9/5", "AVERAGE RATING"],
  ["48HR", "AVG. TURNAROUND"],
];

const graphicDesignItems = [
  {
    src: "https://res.cloudinary.com/dc3h8zsv3/image/upload/v1789219179/ccxzqpum4ovpkbnzehcy.png",
    tag: "SOCIAL POST",
    title: "HealthStay campaign",
    aspect: "aspect-[4/5]",
  },
  {
    src: "https://res.cloudinary.com/dc3h8zsv3/image/upload/v1789219657/wumr9zjnqcyqmvxafc08.jpg",
    tag: "BRAND CONTENT",
    title: "Feed design system",
    aspect: "aspect-square",
  },
  {
    src: "https://res.cloudinary.com/dc3h8zsv3/image/upload/v1789219656/xuxxu6azfnzhqmuxnom7.png",
    tag: "SOCIAL POST",
    title: "Product spotlight",
    aspect: "aspect-[4/3]",
  },
  {
    src: "https://res.cloudinary.com/dc3h8zsv3/image/upload/v1789219656/pj8p3flbfy2qgu4ifwjv.jpg",
    tag: "CAMPAIGN",
    title: "Launch series",
    aspect: "aspect-[4/5]",
  },
  {
    src: "https://res.cloudinary.com/dc3h8zsv3/image/upload/v1789219656/mxzgf0jfexapawx5ntek.png",
    tag: "GRAPHIC",
    title: "Carousel design",
    aspect: "aspect-square",
  },
  {
    src: "https://res.cloudinary.com/dc3h8zsv3/image/upload/v1789219655/dbajok9w6q8scytv7lsi.png",
    tag: "GRAPHIC",
    title: "Story template",
    aspect: "aspect-[4/3]",
  },
];

const videoEditItems = [
  {
    src: "https://res.cloudinary.com/dc3h8zsv3/video/upload/q_auto,f_auto,w_720/v1789216207/ednxjhlhnrjzbh3f3kzu.mp4",
    title: "Brand reel",
    tag: "SOCIAL EDIT",
  },
  {
    src: "https://res.cloudinary.com/dc3h8zsv3/video/upload/q_auto,f_auto,w_720/v1789216189/sdiszag91gehxzxitzgu.mp4",
    title: "Campaign cut",
    tag: "CAMPAIGN",
  },
  {
    src: "https://res.cloudinary.com/dc3h8zsv3/video/upload/q_auto,f_auto,w_720/v1789216202/gsupf1ktfcocucqmxh0g.mp4",
    title: "Product edit",
    tag: "PRODUCT CUT",
  },
  {
    src: "https://res.cloudinary.com/dc3h8zsv3/video/upload/q_auto,f_auto,w_720/v1789216205/ckyuminrusxxgyalv7h5.mp4",
    title: "Founder story",
    tag: "TALKING HEAD",
  },
  {
    src: "https://res.cloudinary.com/dc3h8zsv3/video/upload/q_auto,f_auto,w_720/v1789216190/kxw2zd1rnd8ksarcjxdy.mp4",
    title: "Lifestyle reel",
    tag: "LIFESTYLE",
  },
   {
    src: "https://res.cloudinary.com/dc3h8zsv3/video/upload/q_auto,f_auto,w_720/v1789216208/icnqiktzcyzmcetfnkg7.mp4",
    title: "Podcast reel",
    tag: "PODCAST CUT",
  },
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
  { src: "https://res.cloudinary.com/dc3h8zsv3/video/upload/q_auto,f_auto,w_720/v1789217637/lvuv1paikqi09dxwca1o.mp4", title: "Interface art direction" },
  { src: "https://res.cloudinary.com/dc3h8zsv3/video/upload/q_auto,f_auto,w_720/v1789220566/pxjgac3szzder7yxuaql.mp4", title: "Brand design workspace" },
];

const heroVideos = videoEditItems.slice(0, 2);

const getVideoPoster = (src) =>
  src
    .replace(
      "/video/upload/q_auto,f_auto,w_720/",
      "/video/upload/so_0,q_auto,f_jpg,w_720/"
    )
    .replace(/\.mp4$/, ".jpg");

function useViewportPlayback(videoRef, threshold = 0.35) {
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    let visible = false;
    const syncPlayback = () => {
      if (visible && !document.hidden) {
        video.play().catch(() => undefined);
      } else {
        video.pause();
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        syncPlayback();
      },
      { threshold, rootMargin: "80px 0px" }
    );

    observer.observe(video);
    document.addEventListener("visibilitychange", syncPlayback);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", syncPlayback);
      video.pause();
    };
  }, [videoRef, threshold]);
}

function ViewportVideo({ src, label, className = "", interactive = false }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  useViewportPlayback(videoRef);

  const toggle = (event) => {
    if (!interactive) return;
    event.preventDefault();
    event.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) video.play().catch(() => undefined);
    else video.pause();
  };

  return (
    <div className="relative h-full w-full">
      <video
        ref={videoRef}
        src={src}
        poster={getVideoPoster(src)}
        aria-label={label}
        muted
        loop
        playsInline
        preload="metadata"
        className={className}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      {interactive && (
        <button
          type="button"
          onClick={toggle}
          aria-label={`${playing ? "Pause" : "Play"} ${label}`}
          className="absolute bottom-3 left-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur-md"
        >
          {playing ? <Pause size={12} fill="currentColor" /> : <Play size={12} fill="currentColor" />}
        </button>
      )}
    </div>
  );
}

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

function VideoCard({ item, index = 0 }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [failed, setFailed] = useState(false);
  useViewportPlayback(videoRef);

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play()
        .then(() => setPlaying(true))
        .catch(() => { });
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
      className="flex h-full justify-center"
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
          aspect-[4/5]
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
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/[.06] text-[#d8b4fe] backdrop-blur-xl">
              {failed ? <Clapperboard size={18} /> : <Play size={17} fill="currentColor" />}
            </span>
            <span className="text-[8px] font-semibold uppercase tracking-[.2em] text-white/45">
              {failed ? "Preview unavailable" : "Play preview"}
            </span>
          </div>
        </div>

        <video
          ref={videoRef}
          src={item.src}
          poster={getVideoPoster(item.src)}
          aria-label={`${item.title} video preview`}
          className="relative block h-full w-full object-cover"
          muted={muted}
          loop
          playsInline
          preload="metadata"
          disablePictureInPicture
          onError={() => {
            setFailed(true);
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

  useEffect(() => {
    document.body.classList.add("raw-to-finess-page");
    return () => document.body.classList.remove("raw-to-finess-page");
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
                {heroVideos.map((item, index) => (
                  <motion.div
                    key={item.src}
                    animate={{ y: [0, index % 2 ? 14 : -12, 0] }}
                    transition={{ duration: 6 + index, repeat: Infinity, ease: "easeInOut" }}
                    className={`absolute overflow-hidden rounded-[28px] border border-white/15 bg-white/5 p-2 shadow-[0_35px_90px_rgba(0,0,0,.45)] ${index === 0 ? "left-[8%] top-[4%] h-[360px] w-[270px] -rotate-6" : "right-[2%] top-[16%] h-[330px] w-[245px] rotate-6"}`}
                  >
                    <ViewportVideo
                      src={item.src}
                      label={`${item.title} portfolio preview`}
                      interactive
                      className="h-full w-full rounded-[21px] object-cover"
                    />
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
              {PROGRAM_LINKS.slice(0, 3).map(([number, label], index) => {
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
                        <ViewportVideo
                          src={visual.src}
                          label={visual.alt}
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
          <section id="web-design" className="portfolio-service-section menu-section relative overflow-hidden bg-[#EEF7FF] text-[#07102F]">
            <div className="absolute inset-0 opacity-60 [background-image:radial-gradient(circle_at_20%_10%,rgba(23,104,255,.22),transparent_34%),radial-gradient(circle_at_85%_75%,rgba(110,231,255,.2),transparent_30%)]" />
            <div className="portfolio-service-inner relative mx-auto max-w-[1480px] px-5 py-20 md:px-10 md:py-28">
              <Reveal className="text-center">
                <div className="mb-4 flex justify-center">
                  <GlassPill dark>
                    <GlobeIcon size={11} className="mr-1 inline -translate-y-px" />
                    DIGITAL EXPERIENCES
                  </GlassPill>
                </div>
                <h2 className="menu-heading">WEB DESIGN</h2>
                <p className="mx-auto mt-5 max-w-[560px] text-sm leading-7 text-[#07102F]/50">Conversion-minded websites shaped with clear hierarchy, distinctive art direction and smooth interactions.</p>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="menu-card relative mx-auto mt-10 max-w-[1080px] overflow-hidden rounded-[30px] border-[3px] border-[#07102F]/15 bg-[#EEF8FF] p-4 shadow-none md:mt-14 md:p-6">
                  <RevealGroup className="portfolio-service-grid grid grid-cols-2 gap-4 md:grid-cols-3">
                    {webDesignItems.map((item, index) => (
                      <GsapScrollReveal key={item.src} className="h-full" direction={index % 3 === 0 ? "left" : index % 3 === 2 ? "right" : "up"} index={index}>
                        <motion.article initial={{ opacity: 0, y: 35, scale: .92 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, amount: .15 }} whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 260, damping: 22, delay: index * .05 }} className="portfolio-service-card group relative flex aspect-[4/5] h-full flex-col overflow-hidden rounded-2xl border-2 border-[#07102F]/10 bg-white p-2 shadow-none">
                          <div className="min-h-0 flex-1 overflow-hidden rounded-xl"><img src={item.src} alt={`${item.title} web design concept`} loading="lazy" decoding="async" className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]" /></div>
                          <div className="flex min-h-[64px] items-end justify-between gap-2 px-2 pb-1 pt-3"><div className="min-w-0"><span className="label-mono block truncate text-[7px] tracking-[.18em] text-[var(--violet)]">{item.tag}</span><h3 className="mt-1 truncate font-display text-sm font-bold md:text-base">{item.title}</h3></div><span className="mb-1 h-3 w-3 shrink-0 rounded-full" style={{ background: item.accent }} /></div>
                        </motion.article>
                      </GsapScrollReveal>
                    ))}
                  </RevealGroup>
                </div>
              </Reveal>
            </div>
            <Divider variant="arc" fill="#060A31" />
          </section>

          {/* ================= VIDEO EDITS ================= */}
          <section
            id="video-edits"
            className="portfolio-service-section menu-section relative overflow-hidden"
            style={{ background: "#0A1748" }}
          >
            <div className="portfolio-service-inner relative mx-auto max-w-[1480px] px-5 py-20 md:px-10 md:py-28">
              <Reveal className="text-center">
                <div className="mb-4 flex justify-center">
                  <GlassPill>
                    <Clapperboard size={11} className="mr-1 inline -translate-y-px" />
                    THE MAIN COURSE
                  </GlassPill>
                </div>
                <h2 className="menu-heading menu-heading-light">VIDEO EDITS</h2>
                <p className="mx-auto mt-5 max-w-[560px] text-sm leading-7 text-white/50">Story-led edits built for retention, clarity and polished delivery across every major platform.</p>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="menu-card relative mx-auto mt-10 max-w-[1080px] overflow-hidden rounded-[30px] border-[3px] border-[#07102F]/15 bg-[#EEF8FF] p-4 shadow-[0_25px_60px_-20px_rgba(0,0,0,.35)] md:mt-14 md:p-6">
                  <RevealGroup className="portfolio-service-grid grid grid-cols-2 gap-4 md:grid-cols-3">
                    {videoEditItems.map((item, index) => (
                      <GsapScrollReveal key={item.src + index} className="h-full" direction={index % 3 === 0 ? "left" : index % 3 === 2 ? "right" : "up"} index={index}>
                        <VideoCard item={item} index={index} />
                      </GsapScrollReveal>
                    ))}
                  </RevealGroup>
                </div>
              </Reveal>

              <p className="label-mono mt-6 text-center text-[8px] uppercase tracking-[0.2em] text-white/35">
                Videos autoplay while visible · tap a clip to pause · tap the speaker to unmute
              </p>
            </div>

            <Divider variant="arc" fill="#060A31" />
          </section>

          {/* ================= GRAPHIC DESIGN ================= */}
          <section
            id="graphic-design"
            className="portfolio-service-section menu-section relative overflow-hidden"
            style={{ background: "#1646D8" }}
          >
            <div className="portfolio-service-inner relative mx-auto max-w-[1480px] px-5 py-20 md:px-10 md:py-28">
              <Reveal className="text-center">
                <div className="mb-4 flex justify-center">
                  <GlassPill dark>
                    <Palette size={11} className="mr-1 inline -translate-y-px" />
                    THE STARTER
                  </GlassPill>
                </div>
                <h2 className="menu-heading">GRAPHIC DESIGN</h2>
                <p className="mx-auto mt-5 max-w-[560px] text-sm leading-7 text-white/50">Consistent campaign visuals shaped to make your brand recognizable across every touchpoint.</p>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="menu-card relative mx-auto mt-10 max-w-[1080px] overflow-hidden rounded-[30px] border-[3px] border-[#07102F]/15 bg-[#EEF8FF] p-4 shadow-none md:mt-14 md:p-6">
                  <RevealGroup className="portfolio-service-grid grid grid-cols-2 gap-4 md:grid-cols-3">
                    {graphicDesignItems.map((item, index) => (
                      <motion.div
                        key={item.title + index}
                        initial={{ opacity: 0, y: 35, scale: .92 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true, amount: .15 }}
                        whileHover={{ y: -5 }}
                        transition={{ type: "spring", stiffness: 260, damping: 22, delay: index * .05 }}
                        className="portfolio-service-card group relative aspect-[4/5] overflow-hidden rounded-2xl border-2 border-[#07102F]/10 bg-white shadow-none"
                      >
                        <img
                          src={item.src}
                          alt={item.title}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                        />
                        <div className="absolute bottom-2 left-2 right-2 translate-y-2 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                          <span className="label-mono rounded-full bg-[#5b21b6]/85 px-2 py-1 text-[6.5px] uppercase tracking-[0.16em] text-white">
                            {item.tag}
                          </span>
                        </div>
                      </motion.div>
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
