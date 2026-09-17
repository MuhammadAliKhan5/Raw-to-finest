import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Clapperboard,
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
} from "./SiteChrome";
import GlobalStyles from "./GlobalStyles";
import { GsapHorizontalScroll, GsapScrollReveal } from "./effects/GsapKit";
import { Globe as GlobeIcon } from "lucide-react";

const impactStats = [
  ["500+", "PROJECTS DELIVERED"],
  ["92%", "CLIENT RETENTION"],
  ["4.9/5", "AVERAGE RATING"],
  ["48HR", "AVG. TURNAROUND"],
];

const fullSpreadVideoItems = [
  { src: "", title: "Featured reel 01", tag: "SELECTED WORK" },
  { src: "", title: "Featured reel 02", tag: "SELECTED WORK" },
  { src: "", title: "Featured reel 03", tag: "SELECTED WORK" },
  { src: "", title: "Featured reel 04", tag: "SELECTED WORK" },
  { src: "", title: "Featured reel 05", tag: "SELECTED WORK" },
  { src: "", title: "Featured reel 06", tag: "SELECTED WORK" },
];

const carDealershipItems = [
  { src: "https://res.cloudinary.com/dc3h8zsv3/video/upload/v1789648827/k4uxbsntbuoapdxxb6iq.mp4", title: "Dealership campaign 04", tag: "AUTOMOTIVE" },
  { src: "https://res.cloudinary.com/dc3h8zsv3/video/upload/v1789648821/d3xhqsz5nrw3qqa287on.mp4", title: "Dealership campaign 05", tag: "AUTOMOTIVE" },
  { src: "https://res.cloudinary.com/dc3h8zsv3/video/upload/v1789648809/xotiojj21jerrvpbnfv7.mp4", title: "Dealership campaign 06", tag: "AUTOMOTIVE" },
  { src: "https://res.cloudinary.com/dc3h8zsv3/video/upload/v1789648831/tpkhzu9lideqntqsgeym.mp4", title: "Dealership campaign 01", tag: "AUTOMOTIVE" },
  { src: "https://res.cloudinary.com/dc3h8zsv3/video/upload/v1789648828/ss2njqjwlgpirjcossjk.mp4", title: "Dealership campaign 02", tag: "AUTOMOTIVE" },
  { src: "https://res.cloudinary.com/dc3h8zsv3/video/upload/v1789648828/pzbujbkdewahhowqjca7.mp4", title: "Dealership campaign 03", tag: "AUTOMOTIVE" }
];

const realEstateItems = [
  { src: "https://res.cloudinary.com/dc3h8zsv3/video/upload/v1789649540/fnb8b6ovd75haqvby950.mp4", title: "Property showcase 02", tag: "REAL ESTATE" },
  { src: "https://res.cloudinary.com/dc3h8zsv3/video/upload/v1789649549/anojo86galbcv9aahvdj.mp4", title: "Property showcase 01", tag: "REAL ESTATE" },
  { src: "https://res.cloudinary.com/dc3h8zsv3/video/upload/v1789649216/ut1fl86sjz3j1qapokza.mp4", title: "Property showcase 06", tag: "REAL ESTATE" },
  { src: "https://res.cloudinary.com/dc3h8zsv3/video/upload/v1789649354/byivnhsqbkptlb2fqxqm.mp4", title: "Property showcase 04", tag: "REAL ESTATE" },
  { src: "https://res.cloudinary.com/dc3h8zsv3/video/upload/v1789649362/l3iqwuayrd2b9sh5rh5u.mp4", title: "Property showcase 03", tag: "REAL ESTATE" },
  { src: "https://res.cloudinary.com/dc3h8zsv3/video/upload/v1789649351/nwu7tprulr9nkvzhmzow.mp4", title: "Property showcase 05", tag: "REAL ESTATE" },
];

const viralReelItems = [
  { src: "https://res.cloudinary.com/dc3h8zsv3/video/upload/v1789649936/sezpteqwlrualvq07gzq.mp4", title: "Viral reel 01", tag: "VIRAL-REELS" },
  { src: "https://res.cloudinary.com/dc3h8zsv3/video/upload/v1789649915/etqmhfo7l9yd0k1vupty.mp4", title: "Viral reel 02", tag: "VIRAL-REELS" },
  { src: "https://res.cloudinary.com/dc3h8zsv3/video/upload/v1789649786/dnlqcgclkczhfgcknirl.mp4", title: "Viral reel 03", tag: "VIRAL-REELS" },
  { src: "https://res.cloudinary.com/dc3h8zsv3/video/upload/v1789649742/fwasqtnlrjrvrgevhiih.mp4", title: "Viral reel 04", tag: "VIRAL-REELS" },
];

const getVideoPoster = (src) =>
  src
    ? src
    .replace(
      "/video/upload/q_auto,f_auto,w_720/",
      "/video/upload/so_0,q_auto,f_jpg,w_720/"
    )
    .replace(/\.mp4$/, ".jpg")
    : undefined;

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

function VideoCard({ item, index = 0, aspectClassName = "aspect-[9/16]" }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [failed, setFailed] = useState(false);
  const hasSource = Boolean(item.src);
  useViewportPlayback(videoRef);

  const toggle = () => {
    const video = videoRef.current;
    if (!video || !hasSource) return;

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
        className={`
          relative
          w-full
          ${aspectClassName}
          overflow-hidden
          rounded-2xl
          border border-white/10
          bg-black/30
          shadow-xl
          cursor-pointer
        `}
      >
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_50%_35%,rgba(168,85,247,.24),transparent_42%),linear-gradient(155deg,#12091b,#030306)]">
          <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:24px_24px]" />
          <div className="relative flex flex-col items-center gap-3 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/[.06] text-[#d8b4fe] backdrop-blur-xl">
              {!hasSource || failed ? <Clapperboard size={18} /> : <Play size={17} fill="currentColor" />}
            </span>
            <span className="text-[8px] font-semibold uppercase tracking-[.2em] text-white/45">
              {!hasSource ? "Add video source" : failed ? "Preview unavailable" : "Play preview"}
            </span>
          </div>
        </div>

        <video
          ref={videoRef}
          src={item.src || undefined}
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
        {!playing && hasSource && (
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

            <div className="relative mx-auto max-w-[1480px] px-5 pb-20 text-center md:px-8 md:pb-28">
              <motion.div
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
                initial="hidden"
                animate="show"
                className="mx-auto flex max-w-[1050px] flex-col items-center"
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

                <RevealItem className="mt-9 flex flex-wrap items-center justify-center gap-4">
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

              <RevealGroup className="mx-auto mt-14 grid max-w-[1100px] grid-cols-2 gap-4 border-y border-white/10 py-8 md:grid-cols-4">
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

            <GsapHorizontalScroll trackClassName="gap-5 px-5 md:px-8" speed={0.9}>
              {fullSpreadVideoItems.map((item, index) => (
                <div key={item.title} className="w-[72vw] max-w-[290px] shrink-0 sm:w-[280px]">
                  <VideoCard item={item} index={index} />
                </div>
              ))}
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
                    AUTOMOTIVE CONTENT
                  </GlassPill>
                </div>
                <h2 className="menu-heading">CAR DEALERSHIPS</h2>
                <p className="mx-auto mt-5 max-w-[620px] text-sm leading-7 text-[#07102F]/50">High-energy dealership videos that showcase inventory, spotlight key features and turn online attention into showroom visits and qualified enquiries.</p>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="menu-card relative mx-auto mt-10 max-w-[1200px] overflow-hidden rounded-[30px] border-[3px] border-[#07102F]/15 bg-[#EEF8FF] p-4 shadow-none md:mt-14 md:p-6">
                  <RevealGroup className="portfolio-service-grid grid grid-cols-2 gap-4 md:grid-cols-3">
                    {carDealershipItems.map((item, index) => (
                      <GsapScrollReveal key={item.title} className="h-full" direction={index % 3 === 0 ? "left" : index % 3 === 2 ? "right" : "up"} index={index}>
                        <VideoCard item={item} index={index} aspectClassName="aspect-[5/8]" />
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
                <h2 className="menu-heading menu-heading-light">REAL ESTATE EDITS</h2>
                <p className="mx-auto mt-5 max-w-[620px] text-sm leading-7 text-white/50">Cinematic property edits that highlight space, lifestyle and location—crafted to hold attention, build desire and generate serious buyer enquiries.</p>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="menu-card relative mx-auto mt-10 max-w-[1200px] overflow-hidden rounded-[30px] border-[3px] border-[#07102F]/15 bg-[#EEF8FF] p-4 shadow-[0_25px_60px_-20px_rgba(0,0,0,.35)] md:mt-14 md:p-6">
                  <RevealGroup className="portfolio-service-grid grid grid-cols-2 gap-4 md:grid-cols-3">
                    {realEstateItems.map((item, index) => (
                      <GsapScrollReveal key={item.title} className="h-full" direction={index % 3 === 0 ? "left" : index % 3 === 2 ? "right" : "up"} index={index}>
                        <VideoCard item={item} index={index} aspectClassName="aspect-[5/8]" />
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
                    <Clapperboard size={11} className="mr-1 inline -translate-y-px" />
                    SHORT-FORM CONTENT
                  </GlassPill>
                </div>
                <h2 className="menu-heading">VIRAL REELS</h2>
                <p className="mx-auto mt-5 max-w-[620px] text-sm leading-7 text-white/50">Fast-paced vertical edits built around strong hooks, sharp pacing and platform-native storytelling that keeps viewers watching and sharing.</p>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="menu-card relative mx-auto mt-10 max-w-[1200px] overflow-hidden rounded-[30px] border-[3px] border-[#07102F]/15 bg-[#EEF8FF] p-4 shadow-none md:mt-14 md:p-6">
                  <RevealGroup className="portfolio-service-grid grid grid-cols-2 gap-4 md:grid-cols-4">
                    {viralReelItems.map((item, index) => (
                      <GsapScrollReveal key={item.title} className="h-full" direction={index % 2 === 0 ? "left" : "right"} index={index}>
                        <VideoCard item={item} index={index} aspectClassName="aspect-[5/8]" />
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
                  Book a free call and tell us what you need—car dealership
                  content, real estate edits, viral reels, or all three.
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
