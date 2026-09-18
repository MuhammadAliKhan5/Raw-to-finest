import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  Clock3,
  Film,
  Layers,
  Pause,
  Play,
  ShieldCheck,
  Sparkles,
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
  staggerParent,
  useReveal,
  PageTransition,
  ScrollProgressBar,
  StickyCTA,
} from "./SiteChrome";
import GlobalStyles from "./GlobalStyles";
import { GsapClipReveal, GsapMarquee, GsapScrollReveal } from "./effects/GsapKit";

const portfolioStrip = [
  { type: "Short-form edit", src: "https://res.cloudinary.com/dc3h8zsv3/video/upload/v1789217149/yuxlbbv3d9skvnhmnc0c.mp4" },
  { type: "Narrative edit", src: "https://res.cloudinary.com/dc3h8zsv3/video/upload/v1789217146/fduspouexvkzgoamkaez.mp4" },
  { type: "Personal brand", src: "https://res.cloudinary.com/dc3h8zsv3/video/upload/v1789217143/sd9n2wuhcjtova6adghs.mp4" },
  { type: "Commercial edit", src: "https://res.cloudinary.com/dc3h8zsv3/video/upload/v1789217140/ew9ocyuv0fcfq6upbuqc.mp4" },
  { type: "Social content", src: "https://res.cloudinary.com/dc3h8zsv3/video/upload/v1789217133/xqnm7il1mygx0ssysdrn.mp4" },
  { type: "Performance creative", src: "https://res.cloudinary.com/dc3h8zsv3/video/upload/v1789649216/ut1fl86sjz3j1qapokza.mp4" },
];

const shortFormPlans = [
  {
    tier: "Basic",
    fit: "Short-form package",
    price: "$999",
    features: [
      "10x short-form edits",
      "24\u201348 hour turnaround cycle",
      "Rolling delivery",
      "Unlimited within-scope revisions",
      "Shared editing team",
      "Expiry: 30 days",
    ],
    popular: false,
  },
  {
    tier: "Standard",
    fit: "Short-form package",
    price: "$2,999",
    features: [
      "30x short-form edits",
      "24\u201348 hour turnaround cycle",
      "Rolling delivery",
      "Unlimited within-scope revisions",
      "Dedicated editing team",
      "Priority delivery",
      "Expiry: 60 days",
    ],
    popular: true,
  },
  {
    tier: "Premium",
    fit: "Short-form package",
    price: "$4,999",
    features: [
      "50x short-form edits",
      "24\u201348 hour turnaround cycle",
      "Rolling delivery",
      "Unlimited within-scope revisions",
      "Dedicated editing team",
      "Faster revisions",
      "Priority support",
      "Backup editor",
      "Dedicated QA person",
      "Expiry: 90 days",
    ],
    popular: false,
  },
];

const longFormPlans = [
  {
    tier: "Basic",
    fit: "Long-form package",
    price: "$999",
    features: [
      "3x long-form videos",
      "Duration: 10 to 45 mins",
      "Unlimited within-scope revisions",
      "Faster revisions",
      "Priority support",
      "Shared editing team",
      "QA support",
      "Expiry: 30 days",
    ],
    popular: false,
  },
  {
    tier: "Standard",
    fit: "Long-form package",
    price: "$1,499",
    features: [
      "6x long-form videos",
      "Duration: 10 to 45 mins",
      "Unlimited within-scope revisions",
      "Faster revisions",
      "Priority support",
      "Dedicated editing team",
      "Dedicated support",
      "Expiry: 60 days",
    ],
    popular: false,
  },
  {
    tier: "Premium",
    fit: "Long-form package",
    price: "$2,199",
    features: [
      "10x long-form videos",
      "Duration: 10 to 45 mins",
      "Unlimited within-scope revisions",
      "Faster revisions",
      "Priority support",
      "Dedicated editing team",
      "Dedicated support",
      "Expiry: 90 days",
    ],
    popular: false,
  },
];

const trustPoints = [
  { icon: Clock3, label: "24\u201348 hour turnarounds" },
  { icon: ShieldCheck, label: "Unlimited within-scope revisions" },
  { icon: Layers, label: "Dedicated editing team" },
];

const optimizedVideoUrl = (src) =>
  src.replace(
    "/video/upload/",
    "/video/upload/q_auto:eco,f_auto,w_480/"
  );

const videoPosterUrl = (src) =>
  src
    .replace(
      "/video/upload/",
      "/video/upload/so_0,q_auto:eco,f_jpg,w_480/"
    )
    .replace(/\.mp4$/, ".jpg");

function ViewportPortfolioVideo({ item, index }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !item.src) return undefined;

    let visible = false;
    let playTimer;

    const syncPlayback = () => {
      window.clearTimeout(playTimer);
      if (visible && !document.hidden) {
        playTimer = window.setTimeout(() => {
          video.play().catch(() => setPlaying(false));
        }, index * 110);
      } else {
        video.pause();
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        syncPlayback();
      },
      { threshold: 0.3, rootMargin: "100px 0px" }
    );

    observer.observe(video);
    document.addEventListener("visibilitychange", syncPlayback);

    return () => {
      window.clearTimeout(playTimer);
      observer.disconnect();
      document.removeEventListener("visibilitychange", syncPlayback);
      video.pause();
    };
  }, [item.src, index]);

  if (!item.src) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_50%_35%,rgba(168,85,247,.28),transparent_45%),#0B1452]">
        <Film size={24} className="text-white/35" />
      </div>
    );
  }

  const togglePlayback = (event) => {
    event.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) video.play().catch(() => setPlaying(false));
    else video.pause();
  };

  return (
    <div className="absolute inset-0">
      <video
        ref={videoRef}
        src={optimizedVideoUrl(item.src)}
        poster={videoPosterUrl(item.src)}
        aria-label={`${item.label} video preview`}
        muted
        loop
        playsInline
        preload="none"
        disablePictureInPicture
        className="h-full w-full object-cover"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onError={() => {
          setFailed(true);
          setPlaying(false);
        }}
      />
      <button
        type="button"
        onClick={togglePlayback}
        aria-label={`${playing ? "Pause" : "Play"} ${item.label}`}
        className="absolute right-2.5 top-2.5 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-xl transition duration-300 hover:scale-110"
      >
        {failed ? <Film size={12} /> : playing ? <Pause size={11} fill="currentColor" /> : <Play size={11} fill="currentColor" />}
      </button>
    </div>
  );
}

function PriceCard({ plan, onBuy, index = 0 }) {
  return (
    <motion.article
      initial={{ opacity: 0, x: index === 0 ? -150 : index === 2 ? 150 : 0, y: index === 1 ? 120 : 45, rotateY: index === 0 ? -20 : index === 2 ? 20 : 0, scale: .88 }}
      whileInView={{ opacity: 1, x: 0, y: 0, rotateY: 0, scale: 1 }}
      viewport={{ once: true, amount: .22 }}
      whileHover={{ y: -12 }}
      transition={{ type: "spring", stiffness: 100, damping: 16, delay: index * .13 }}
      className={`relative flex flex-col overflow-hidden rounded-[30px] border p-8 md:p-9 ${plan.popular
          ? "border-[var(--violet)]/30 bg-[linear-gradient(160deg,#0B1D5D,#1646D8_70%,#2457FF)] text-white shadow-[0_35px_90px_-25px_rgba(16,76,210,.55)] lg:-translate-y-4"
          : "border-[var(--violet)]/10 bg-white text-[#07102F] shadow-[0_20px_60px_-30px_rgba(24,13,36,.25)]"
        }`}
    >
      {plan.popular && (
        <span className="label-mono absolute right-7 top-7 rounded-full bg-[var(--champagne)] px-3 py-1.5 text-[7px] uppercase tracking-[0.2em] text-[#07102F]">
          Most popular
        </span>
      )}

      <span className={`label-mono text-[8px] uppercase tracking-[0.2em] ${plan.popular ? "text-white/40" : "text-[#07102F]/30"}`}>
        {plan.fit}
      </span>

      <h3 className="mt-3 font-display text-3xl font-bold tracking-[-0.03em]">{plan.tier}</h3>

      <div className="mt-7 flex items-end gap-2">
        <span className="font-display text-5xl font-bold tracking-[-0.04em]">{plan.price}</span>
        <span className={`mb-1.5 label-mono text-[9px] uppercase tracking-[0.15em] ${plan.popular ? "text-white/40" : "text-[#07102F]/35"}`}>
          / month
        </span>
      </div>

      <ul className="mt-8 flex-1 space-y-3.5">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm leading-6">
            <span
              className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${plan.popular ? "bg-white/15 text-[var(--champagne)]" : "bg-[var(--violet)]/10 text-[var(--violet)]"
                }`}
            >
              <Check size={11} />
            </span>
            <span className={plan.popular ? "text-white/75" : "text-[#07102F]/60"}>{feature}</span>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={onBuy}
        className={`group relative mt-9 flex items-center justify-center gap-3 overflow-hidden rounded-full py-4 label-mono text-[10px] uppercase tracking-[0.18em] transition ${plan.popular
            ? "bg-[var(--champagne)] text-[#07102F] hover:bg-white"
            : "bg-[#07102F] text-white hover:bg-[var(--violet)]"
          }`}
      >
        Buy now
        <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
      </button>
    </motion.article>
  );
}

/* ---------------------------------------------------------------------- */
/*  PAGE                                                                  */
/* ---------------------------------------------------------------------- */

export default function VideoEditsPage() {
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
        <Header active="/video-edits" onBook={openBooking} />

        <main id="video-edits-top" tabIndex="-1">
          {/* ================= HERO ================= */}
          <section className="hero-section relative overflow-hidden pt-[130px] md:pt-[150px]">
            <div className="hero-orb hero-orb-a" />
            <div className="hero-orb hero-orb-b" />
            <ParticleField />

            <div className="relative mx-auto max-w-[1100px] px-5 pb-16 text-center md:px-8 md:pb-20">
              <motion.div variants={staggerParent} initial="hidden" animate="show" className="flex flex-col items-center text-center">
                <RevealItem>
                  <GlassPill>VIDEO EDITING FOR AGENCIES</GlassPill>
                </RevealItem>

                <GsapClipReveal className="mx-auto mt-7 max-w-[1300px]">
                  <div className="font-display text-[clamp(2.6rem,6.6vw,6.2rem)] font-bold uppercase leading-[0.9] tracking-[-0.05em]">
                    TURN RAW FOOTAGE
                    <br />
                    INTO
                    <br />
                    <span className="gradient-text-hero font-editorial italic">CONTENT THAT CONVERTS</span>
                  </div>
                </GsapClipReveal>

                <RevealItem className="mx-auto mt-7 max-w-[580px] text-sm leading-7 text-white/40 md:text-base">
                  High-quality video editing for agencies and businesses that
                  need consistent content without the hassle of managing an
                  in-house editing team.
                </RevealItem>

                <RevealItem className="mt-9 flex flex-wrap items-center justify-center gap-4">
                  <MagneticButton onClick={openBooking}>
                    Book a consultation
                    <ArrowUpRight size={14} />
                  </MagneticButton>
                  <a
                    href="/portfolio#graphic-design"
                    className="label-mono flex items-center gap-2 rounded-full border border-[var(--orchid)]/30 bg-[#020617]/85 px-6 py-4 uppercase tracking-[0.16em] text-white transition hover:border-[var(--orchid)] hover:bg-[#07133f]"
                  >
                    View Our Work
                  </a>
                </RevealItem>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 150, scale: .86 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: .2 }}
                transition={{ duration: 1.1, ease: [0.16,1,.3,1] }}
                className="relative h-[460px] min-w-0 md:h-[650px]"
              >
                {portfolioStrip.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: 0, y: 130, rotate: 0, scale: .75 }}
                    whileInView={{ opacity: 1, x: `calc(${index - 2.5} * clamp(52px, 11vw, 165px))`, y: Math.abs(index - 2.5) * 22, rotate: (index - 2.5) * 8, scale: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ type: "spring", stiffness: 120, damping: 16, delay: index * .08 }}
                    whileHover={{ y: -35, scale: 1.09, zIndex: 30, rotate: 0 }}
                    className="group absolute bottom-14 left-1/2 flex aspect-[9/16] w-[145px] -translate-x-1/2 items-end overflow-hidden rounded-[22px] border border-white/15 bg-[#0B1452] p-3 shadow-[0_30px_65px_-18px_rgba(0,0,0,.75)] md:w-[240px]"
                  >
                    <ViewportPortfolioVideo item={item} index={index} />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#060A31] via-transparent to-black/10" />
                    <span className="label-mono relative text-[8px] uppercase leading-4 tracking-[0.08em] text-white/80">
                      <small className="mb-1 block text-[6px] tracking-[.2em] text-[var(--champagne)]">RAW TO FINEST / 0{index + 1}</small>
                      {item.label}
                    </span>
                  </motion.div>
                ))}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 label-mono text-[8px] uppercase tracking-[.22em] text-white/45">Hover to bring a cut forward</div>
              </motion.div>

            </div>

            <div className="relative z-10 overflow-hidden border-y border-white/10 bg-[#0B1452] py-4">
              <GsapMarquee duration={22} direction={-1}>
                {trustPoints.map((point) => (
                  <span key={point.label} className="flex items-center gap-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--champagne)]" />
                    <span className="label-mono text-[10px] uppercase tracking-[0.2em] text-white/35 md:text-xs">
                      {point.label}
                    </span>
                  </span>
                ))}
              </GsapMarquee>
            </div>

            <Divider variant="wave" fill="#EEF7FF" />
          </section>

          {/* ================= TRUST STRIP ================= */}
          <section className="relative bg-[var(--cream)] pt-14 text-[#07102F]">
            <div className="mx-auto max-w-[1480px] px-5 md:px-8">
              <RevealGroup className="grid gap-4 border-b border-[#07102F]/10 pb-14 sm:grid-cols-3">
                {trustPoints.map((point) => {
                  const Icon = point.icon;
                  return (
                    <RevealItem key={point.label} className="flex items-center gap-4">
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--violet)]/10 text-[var(--violet)]">
                        <Icon size={18} />
                      </span>
                      <span className="label-mono text-[10px] uppercase tracking-[0.16em] text-[#07102F]/55">
                        {point.label}
                      </span>
                    </RevealItem>
                  );
                })}
              </RevealGroup>
            </div>
          </section>

          {/* ================= SHORT-FORM PACKAGES ================= */}
          <section id="short-form" className="relative bg-[var(--cream)] text-[#07102F]">
            <div className="relative mx-auto max-w-[1480px] px-5 pb-28 pt-20 md:px-8 md:pb-36 md:pt-24">
              <Reveal className="mx-auto max-w-[700px] text-center">
                <SectionLabel>01 / SHORT-FORM</SectionLabel>
                <h2 className="mt-6 font-display text-[clamp(2.6rem,5.6vw,5.2rem)] font-bold uppercase leading-[0.87] tracking-[-0.06em]">
                  Short-form
                  <br />
                  <span className="font-editorial normal-case italic text-[var(--violet)]">video editing packages.</span>
                </h2>
                <p className="mx-auto mt-6 max-w-[520px] text-sm leading-7 text-[#07102F]/45">
                  Faster turnarounds, less revisions back and forth, quick
                  communication, more reliable system.
                </p>
              </Reveal>

              <RevealGroup className="mt-16 grid gap-5 lg:grid-cols-3">
                {shortFormPlans.map((plan, index) => (
                  <GsapScrollReveal key={plan.tier} direction={index === 0 ? "left" : index === 2 ? "right" : "up"} index={index} distance={190}>
                    <PriceCard plan={plan} index={index} onBuy={openBooking} />
                  </GsapScrollReveal>
                ))}
              </RevealGroup>

              <Reveal className="mt-8 text-center">
                <a href="#" className="label-mono text-[14px] uppercase tracking-[0.16em] text-white underline underline-offset-4">
                  Terms and conditions apply
                </a>
              </Reveal>
            </div>

            <Divider variant="chevron" fill="#102B82" />
          </section>

          {/* ================= LONG-FORM PACKAGES ================= */}
          <section id="long-form" className="relative overflow-hidden bg-[linear-gradient(150deg,#102B82,#1646D8_45%,#170B26_100%)] text-white">
            <div className="impact-noise absolute inset-0" />

            <div className="relative mx-auto max-w-[1480px] px-5 pb-28 pt-24 md:px-8 md:pb-36 md:pt-28">
              <Reveal className="mx-auto max-w-[700px] text-center">
                <SectionLabel light>02 / LONG-FORM</SectionLabel>
                <h2 className="mt-6 font-display text-[clamp(2.6rem,5.6vw,5.2rem)] font-bold uppercase leading-[0.87] tracking-[-0.06em]">
                  Long-form
                  <br />
                  <span className="gradient-text-hero font-editorial normal-case italic">video editing packages.</span>
                </h2>
                <p className="mx-auto mt-6 max-w-[560px] text-sm leading-7 text-white/45">
                  Best for podcasts, vlogs, interviews, documentaries,
                  trailers, event recaps, explainer videos...
                </p>
              </Reveal>

              <RevealGroup className="mt-16 grid gap-5 lg:grid-cols-3">
                {longFormPlans.map((plan, index) => (
                  <GsapScrollReveal key={plan.tier} direction={index === 0 ? "left" : index === 2 ? "right" : "up"} index={index} distance={190}>
                    <PriceCard plan={plan} index={index} onBuy={openBooking} />
                  </GsapScrollReveal>
                ))}
              </RevealGroup>

              <Reveal className="mt-8 text-center">
                <a href="#" className="label-mono text-[14px] uppercase tracking-[0.16em] text-white underline underline-offset-4">
                  Terms and conditions apply
                </a>
              </Reveal>
            </div>

            <Divider variant="diagonalRev" fill="#EEF7FF" />
          </section>

          {/* ================= CTA ================= */}
          <section className="relative overflow-hidden bg-[var(--cream)] py-24 text-[#07102F] md:py-32">
            <div className="relative mx-auto max-w-[1000px] px-5 text-center md:px-8">
              <Reveal>
                <Sparkles size={30} className="mx-auto text-[var(--violet)]" />
                <h2 className="mt-7 font-display text-[clamp(2.6rem,6.4vw,5.6rem)] font-bold leading-[0.87] tracking-[-0.06em]">
                  NOT SURE WHICH
                  <br />
                  <span className="font-editorial italic text-[var(--violet)]">package fits?</span>
                </h2>
                <p className="mx-auto mt-6 max-w-[480px] text-sm leading-7 text-[#07102F]/45">
                  Book a free consultation and we'll match a package to your
                  agency's publishing volume and turnaround needs.
                </p>
                <div className="mt-9 flex justify-center">
                  <MagneticButton onClick={openBooking}>
                    Book a consultation
                    <Film size={14} />
                  </MagneticButton>
                </div>
              </Reveal>
            </div>

            <Divider variant="zigzag" fill="#060A31" />
          </section>
        </main>

        <Footer onBook={openBooking} />
        <BookingModal isOpen={bookingOpen} onClose={closeBooking} />
        <StickyCTA onBook={openBooking} />
      </div>

      <GlobalStyles />
    </PageTransition>
  );
}
