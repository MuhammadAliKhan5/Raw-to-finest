import { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  animate,
  useScroll,
  useSpring,
  useMotionValue,
  useMotionValueEvent,
} from "framer-motion";
import { Link } from "react-router-dom";
import emailjs from "@emailjs/browser";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GsapCharReveal } from "./effects/GsapKit";

gsap.registerPlugin(ScrollTrigger);
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Menu,
  ShieldCheck,
  Sparkles,
  UserRound,
  X,
} from "lucide-react";


export const EMAILJS_SERVICE_ID = "service_tkdrnyi";
export const EMAILJS_TEMPLATE_ID = "template_mxvm5kr";
export const EMAILJS_PUBLIC_KEY = "5dJmR2nFqVvAY4SRt";

export const navItems = [
  ["Home", "/"],
  ["Portfolio", "/portfolio"],
  ["Pricing", "/pricing"],
  ["Video Edits", "/video-edits"],
];

export const PROGRAM_LINKS = [
  ["01", "Graphic design"],
  ["02", "Video edits"],
  ["03", "Web design"],
  ["04", "Brand strategy"],
];

export const timeSlots = [
  "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM",
  "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM",
];

const landingAmbientDots = Array.from({ length: 52 }, (_, index) => ({
  left: `${(index * 37 + 7) % 100}%`,
  top: `${(index * 61 + 11) % 100}%`,
  size: `${1 + (index % 4) * 0.65}px`,
  delay: `${-((index * 0.43) % 11).toFixed(2)}s`,
  duration: `${6 + (index % 8) * 1.15}s`,
  drift: `${18 + (index % 6) * 8}px`,
  bright: index % 7 === 0,
}));

export function Divider({ variant = "wave", fill, position = "bottom", accent = true }) {
  return (
    <div
      className={`section-seam section-seam-${variant} pointer-events-none absolute left-0 right-0 z-20`}
      style={{
        [position]: -1,
        background: position === "top"
          ? `linear-gradient(to top, transparent, ${fill})`
          : `linear-gradient(to bottom, transparent, ${fill})`,
      }}
      aria-hidden="true"
    >
      {accent && <span />}
    </div>
  );
}

export function SectionLabel({ children, light = false }) {
  return (
    <div
      className={`label-mono flex items-center gap-3 text-[9px] tracking-[0.32em] ${light ? "text-white/45" : "text-[#0A1748]/50"
        }`}
    >
      <span className="flex items-center gap-1">
        <span className={`h-[3px] w-[3px] rounded-full ${light ? "bg-[var(--champagne)]" : "bg-[var(--violet)]"}`} />
        <span className={`h-px w-9 ${light ? "bg-[var(--orchid)]/40" : "bg-[var(--violet)]/35"}`} />
      </span>
      <span>{children}</span>
    </div>
  );
}

export function MagneticButton({ children, onClick, href, variant = "solid", className = "" }) {
  const ref = useRef(null);

  const move = (event) => {
    if (!ref.current || window.matchMedia("(pointer: coarse)").matches) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 12;
    ref.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };

  const leave = () => {
    if (ref.current) ref.current.style.transform = "translate3d(0,0,0)";
  };

  const styles = { solid: "btn-solid", ghost: "btn-ghost", light: "btn-light" };

  const content = (
    <motion.span
      ref={ref}
      onMouseMove={move}
      onMouseLeave={leave}
      whileHover={{ scale: 1.045 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 420, damping: 22 }}
      className={`group magnetic-btn ${styles[variant]} inline-flex items-center gap-3 rounded-full px-6 py-3.5 label-mono text-[10px] tracking-[0.16em] ${className}`}
    >
      <span className="btn-shine" aria-hidden="true" />
      <span className="relative z-10 flex items-center gap-3">{children}</span>
    </motion.span>
  );

  if (href) {
    const isExternal = /^(https?:)?\/\//.test(href) || href.startsWith("tel:") || href.startsWith("mailto:");
    if (isExternal) {
      return (
        <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined} className="inline-flex">
          {content}
        </a>
      );
    }
    return (
      <Link to={href} className="inline-flex">
        {content}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className="inline-flex">
      {content}
    </button>
  );
}

export function GlassPill({ children, dark = false }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 label-mono text-[8px] tracking-[0.22em] backdrop-blur-xl ${dark
          ? "border-[var(--violet)]/20 bg-[var(--violet)]/8 text-[#6c3dcc]"
          : "border-white/15 bg-white/[0.06] text-white/70"
        }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dark ? "bg-[var(--violet)]" : "bg-[var(--champagne)]"} shadow-[0_0_14px_currentColor]`} />
      {children}
    </span>
  );
}

const MotionLink = motion(Link);

export function AppLogo() {
  return (
    <Link
      to="/"
      aria-label="Raw to Finest — home"
      className="group flex items-center"
      data-cursor="hover"
    >
      <span className="relative block h-8 w-[94px] overflow-hidden md:h-9 md:w-[60px] ">
        <img
          src="/images/r2f-logo-white.png"
          alt="Raw to Finest"
          className="pointer-events-none absolute left-1/2 top-1/2 w-[166%] max-w-none -translate-x-1/2 -translate-y-1/2 transition duration-500 group-hover:scale-105"
        />
      </span>
    </Link>
  );
}

export function Preloader({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const controls = animate(0, 100, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setProgress(v),
      onComplete: () => {
        setLeaving(true);
        setTimeout(() => onDone?.(), 650);
      },
    });
    return () => controls.stop();
  }, [onDone]);

  return (
    <AnimatePresence>
      {!leaving || progress < 100 ? (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center gap-7 bg-[var(--ink)]"
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0, rotate: -10 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative h-16 w-44 overflow-hidden drop-shadow-[0_0_28px_rgba(192,132,252,.35)]"
          >
            <img
              src="/images/r2f-logo-white.png"
              alt=""
              className="pointer-events-none absolute left-1/2 top-1/2 w-[166%] max-w-none -translate-x-1/2 -translate-y-1/2"
            />
          </motion.div>

          <div className="flex flex-col items-center gap-4">
            <div className="label-mono text-[10px] tracking-[0.35em] text-white/50">
              Raw to Finest
            </div>
            <div className="relative h-[2px] w-[180px] overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full bg-[linear-gradient(90deg,var(--violet),var(--orchid),var(--champagne))]"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="label-mono text-[9px] tabular-nums tracking-[0.2em] text-white/25">
              {Math.floor(progress)}%
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export function useSmoothScroll() {
  useEffect(() => {
    if (
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    let lenis;
    let tickerFn;
    let cancelled = false;

    import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;
      lenis = new Lenis({
        duration: 0.78,
        easing: (t) => 1 - Math.pow(1 - t, 3),
        smoothWheel: true,
      });
      lenis.on("scroll", ScrollTrigger.update);
      tickerFn = (time) => lenis.raf(time * 1000);
      gsap.ticker.add(tickerFn);
    });

    return () => {
      cancelled = true;
      if (tickerFn) gsap.ticker.remove(tickerFn);
      lenis?.destroy();
    };
  }, []);
}

export function GrainOverlay() {
  return (
    <div
      aria-hidden="true"
      className="grain-anim pointer-events-none fixed inset-0 z-[90] opacity-[0.045] mix-blend-overlay"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      }}
    />
  );
}

export function AmbientBackground() {
  return (
    <div aria-hidden="true" className="ambient-mesh glass-ambient">
      <span className="glass-light glass-light-a" />
      <span className="glass-light glass-light-b" />
      <span className="glass-light glass-light-c" />
      <span className="glass-light glass-light-d" />
      <div className="ambient-hero-extension">
        <span className="landing-aurora landing-aurora-a" />
        <span className="landing-aurora landing-aurora-b" />
        <span className="landing-aurora landing-aurora-c" />
        <span className="landing-light-ribbon landing-light-ribbon-a" />
        <span className="landing-light-ribbon landing-light-ribbon-b" />
        <span className="landing-glass-shard landing-glass-shard-a" />
        <span className="landing-glass-shard landing-glass-shard-b" />
        <span className="landing-glass-shard landing-glass-shard-c" />
        <span className="landing-glass-shard landing-glass-shard-d" />
        <div className="landing-ambient-grid" />
        <div className="landing-dot-field">
          {landingAmbientDots.map((dot, index) => (
            <span
              key={index}
              className={`landing-ambient-dot ${dot.bright ? "is-bright" : ""}`}
              style={{
                left: dot.left,
                top: dot.top,
                width: dot.size,
                height: dot.size,
                animationDelay: dot.delay,
                animationDuration: dot.duration,
                "--dot-drift": dot.drift,
              }}
            />
          ))}
        </div>
      </div>
      <div className="glass-ambient-noise" />
    </div>
  );
}

export function SplitReveal({ text, className = "", delay = 0, as = "span" }) {
  const words = useMemo(() => text.split(" "), [text]);
  const Tag = motion[as] || motion.span;

  return (
    <Tag className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.15em] align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: "110%", opacity: 0, filter: "blur(6px)" }}
            whileInView={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{
              duration: 0.9,
              delay: delay + i * 0.06,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

export function useSpotlight() {
  const ref = useRef(null);

  const onMove = (event) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
    ref.current.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
  };

  return { ref, onMouseMove: onMove };
}

export function ParticleField() {
  const particles = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        left: `${(i * 41) % 100}%`,
        top: `${(i * 63) % 100}%`,
        delay: `${(i % 9) * 0.55}s`,
        duration: `${5 + (i % 7)}s`,
        size: `${1 + (i % 3)}px`,
        gold: i % 5 === 0,
      })),
    []
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((particle, i) => (
        <span
          key={i}
          className={`particle absolute rounded-full ${particle.gold ? "bg-[var(--champagne)]" : "bg-[var(--orchid)]"}`}
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
            animationDelay: particle.delay,
            animationDuration: particle.duration,
          }}
        />
      ))}
    </div>
  );
}

export function DynamicCursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const pos = useRef({ x: -100, y: -100 });
  const target = useRef({ x: -100, y: -100 });
  const raf = useRef(null);

  useEffect(() => {
    if (
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) return;

    const onMove = (event) => {
      target.current.x = event.clientX;
      target.current.y = event.clientY;
      if (!raf.current) raf.current = requestAnimationFrame(animateCursor);
    };
    window.addEventListener("pointermove", onMove);

    const animateCursor = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.14;
      pos.current.y += (target.current.y - pos.current.y) * 0.14;
      if (dot.current) dot.current.style.transform = `translate3d(${target.current.x}px, ${target.current.y}px, 0)`;
      if (ring.current) ring.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
      const distance = Math.abs(target.current.x - pos.current.x) + Math.abs(target.current.y - pos.current.y);
      raf.current = distance > 0.2 ? requestAnimationFrame(animateCursor) : null;
    };

    const enter = () => ring.current?.classList.add("cursor-hover");
    const leave = () => ring.current?.classList.remove("cursor-hover");
    const nodes = document.querySelectorAll("a, button, [data-cursor='hover']");
    nodes.forEach((node) => {
      node.addEventListener("mouseenter", enter);
      node.addEventListener("mouseleave", leave);
    });

    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf.current) cancelAnimationFrame(raf.current);
      nodes.forEach((node) => {
        node.removeEventListener("mouseenter", enter);
        node.removeEventListener("mouseleave", leave);
      });
    };
  }, []);

  return (
    <>
      <span ref={dot} className="custom-cursor-dot" />
      <span ref={ring} className="custom-cursor-ring"><span className="custom-cursor-star">✦</span></span>
    </>
  );
}

export const fadeUp = {
  hidden: { opacity: 0, y: 42 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

export const staggerParent = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

export function Reveal({ children, className = "", delay = 0, y = 42, as = "div", ...rest }) {
  const MotionTag = motion[as] || motion.div;
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

export function RevealGroup({ children, className = "", as = "div", ...rest }) {
  const MotionTag = motion[as] || motion.div;
  return (
    <MotionTag
      className={className}
      variants={staggerParent}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

export function RevealItem({ children, className = "", as = "div", ...rest }) {
  const MotionTag = motion[as] || motion.div;
  return (
    <MotionTag className={className} variants={fadeUp} {...rest}>
      {children}
    </MotionTag>
  );
}

export function CountUp({ value, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const match = useMemo(() => String(value).match(/^([^\d]*)([\d.]+)(.*)$/), [value]);
  const [display, setDisplay] = useState(match ? match[1] + "0" + match[3] : value);

  useEffect(() => {
    if (!inView || !match) return;
    const [, prefix, numStr, suffix] = match;
    const target = parseFloat(numStr);
    const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;
    const controls = animate(0, target, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(v) {
        setDisplay(`${prefix}${v.toFixed(decimals)}${suffix}`);
      },
    });
    return () => controls.stop();
  }, [inView, match]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}

export function useReveal() {
  useEffect(() => {
    const nodes = document.querySelectorAll("[data-reveal]");
    if (!nodes.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
}

export function PageTransition({ children }) {
  useSmoothScroll();

  return (
    <>
      <AmbientBackground />
      <motion.div
        className="site-page-layer relative z-[1]"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -18 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </>
  );
}

/* ---------------------------------------------------------------------- */
/*  SCROLL PROGRESS BAR — thin gradient line pinned under the header,    */
/*  fills left→right as the visitor scrolls the page.                    */
/* ---------------------------------------------------------------------- */

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed left-0 right-0 top-0 z-[80] h-[3px] origin-left bg-[linear-gradient(90deg,var(--violet),var(--orchid),var(--champagne))] shadow-[0_0_16px_rgba(46,175,255,.6)]"
    />
  );
}

/* ---------------------------------------------------------------------- */
/*  TILT CARD — subtle 3D pointer-follow tilt for cards/panels. Wrap any  */
/*  card in <TiltCard> to give it a premium tactile hover response.       */
/* ---------------------------------------------------------------------- */

export function TiltCard({ children, className = "", max = 9 }) {
  const ref = useRef(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const springRx = useSpring(rx, { stiffness: 320, damping: 22 });
  const springRy = useSpring(ry, { stiffness: 320, damping: 22 });

  const onMove = (event) => {
    if (!ref.current || window.matchMedia("(pointer: coarse)").matches) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    ry.set(px * max);
    rx.set(-py * max);
  };

  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: springRx, rotateY: springRy, transformPerspective: 1000 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ---------------------------------------------------------------------- */
/*  CORNER REVEAL BOX — a sealed badge sits quietly in the corner; once   */
/*  the visitor scrolls past a threshold it pops its lid open and a      */
/*  stat card springs out. Dismissible; reusable per page via props.     */
/* ---------------------------------------------------------------------- */

export function CornerRevealBox({
  eyebrow = "Milestone",
  stat = "500+",
  caption = "Transformations delivered",
  actionLabel = "Book a call",
  onAction,
  threshold = 0.16,
}) {
  const [opened, setOpened] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const { scrollYProgress } = useScroll();

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > threshold && !opened) setOpened(true);
  });

  if (dismissed) return null;

  return (
    <div
      className="pointer-events-none fixed bottom-24 right-4 z-[72] md:bottom-8 md:right-6"
      style={{ perspective: 1000 }}
    >
      <AnimatePresence mode="wait">
        {!opened ? (
          <motion.div
            key="corner-box-closed"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.3, rotate: -18 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="corner-box pointer-events-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-[var(--orchid)]/30 bg-[#060D2A]/90 shadow-[0_10px_40px_rgba(23,104,255,.35)] backdrop-blur-xl"
          >
            <Sparkles size={20} className="text-[var(--champagne)]" />
          </motion.div>
        ) : (
          <motion.div
            key="corner-box-open"
            initial={{ opacity: 0, y: 46, scale: 0.4, rotate: -10 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, y: 24, scale: 0.5 }}
            transition={{ type: "spring", stiffness: 260, damping: 17 }}
            className="corner-popup pointer-events-auto relative w-[220px] overflow-hidden rounded-[20px] border border-[var(--orchid)]/25 bg-gradient-to-br from-[#1c1030]/95 to-[#060D2A]/96 p-4 shadow-[0_25px_80px_rgba(23,104,255,.4)] backdrop-blur-2xl"
          >
            <span className="corner-popup-glow pointer-events-none absolute -right-8 -top-10 h-24 w-24 rounded-full bg-[var(--orchid)]/25 blur-2xl" />
            <button
              type="button"
              onClick={() => setDismissed(true)}
              aria-label="Dismiss"
              className="absolute right-2.5 top-2.5 text-white/35 transition hover:text-white"
            >
              <X size={13} />
            </button>
            <div className="label-mono text-[8px] tracking-[0.2em] text-[var(--champagne)]">{eyebrow}</div>
            <div className="mt-1 font-display text-[26px] font-bold leading-none text-white">{stat}</div>
            <div className="mt-1.5 text-[11px] leading-4 text-white/50">{caption}</div>
            {onAction && (
              <button
                type="button"
                onClick={onAction}
                className="label-mono mt-3.5 flex w-full items-center justify-center gap-2 rounded-full bg-[var(--champagne)] px-3 py-2.5 text-[8px] tracking-[0.14em] text-[#07102F] transition hover:bg-white"
              >
                {actionLabel}
                <ArrowUpRight size={12} />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/*  HEADER — identical position/markup on every page                     */
/* ---------------------------------------------------------------------- */

export function Header({ active = "/", onBook }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const mainTarget = active === "/"
    ? "#home"
    : active === "/portfolio"
      ? "#portfolio-top"
      : active === "/pricing"
        ? "#pricing-top"
        : "#video-edits-top";

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [menuOpen]);

  return (
    <header className="fixed left-0 top-0 z-[80] w-full px-3 pt-3 md:px-5">
      <a
        href={mainTarget}
        className="label-mono fixed left-4 top-3 z-[100] -translate-y-24 rounded-full bg-[var(--champagne)] px-5 py-3 text-[9px] tracking-[.16em] text-[#0B1452] shadow-xl transition focus:translate-y-0 focus:outline-none focus:ring-2 focus:ring-white"
      >
        Skip to content
      </a>
      <div className="mx-auto max-w-[1480px]">
        <div className="header-shell relative flex h-[70px] items-center justify-between rounded-[22px] border border-[var(--orchid)]/25 bg-[#050308]/94 px-3 shadow-[0_20px_65px_-18px_rgba(0,0,0,.88),0_0_32px_rgba(124,58,237,.12)] backdrop-blur-xl md:h-[76px] md:px-5">
          <span className="header-sheen pointer-events-none absolute inset-0 rounded-[22px]" aria-hidden="true" />
          <span className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[var(--orchid)]/50 to-transparent" aria-hidden="true" />

          <div className="relative pl-2">
            <AppLogo />
          </div>

          <nav className="relative hidden items-center gap-1 rounded-full border border-[var(--orchid)]/15 bg-[#12091b]/80 p-1.5 shadow-inner lg:flex">
            {navItems.map(([label, href]) => (
              <Link
                key={label}
                to={href}
                className={`nav-pill-link label-mono relative rounded-full px-5 py-2.5 tracking-[0.16em] transition hover:text-white ${href === active ? "bg-[var(--violet)] text-white shadow-[0_8px_24px_rgba(23,104,255,.3)]" : "text-white/70"
                  }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="relative hidden items-center gap-3 lg:flex">
            <a
              href="tel:+923001234567"
              className="label-mono flex items-center gap-2 pr-1 tracking-[0.13em] text-white/65 transition hover:text-[var(--champagne)]"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--champagne)] shadow-[0_0_10px_var(--champagne)]" />
              +92 300 1234567
            </a>
            <MagneticButton onClick={onBook}>
              Book a consultation
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#07102F] text-white transition-transform group-hover:rotate-45">
                <ArrowUpRight size={13} />
              </span>
            </MagneticButton>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white lg:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        <AnimatePresence initial={false}>
          {menuOpen && (
            <motion.div
              id="mobile-navigation"
              key="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="mobile-menu overflow-hidden rounded-b-[22px] border-x border-b border-[var(--orchid)]/15 bg-[#12091B]/97 backdrop-blur-2xl lg:hidden"
            >
              <motion.div variants={staggerParent} initial="hidden" animate="show" className="flex flex-col gap-1 px-5 py-6">
                {navItems.map(([label, href]) => (
                  <MotionLink
                    key={label}
                    to={href}
                    onClick={() => setMenuOpen(false)}
                    variants={fadeUp}
                    className={`mobile-link flex items-center justify-between border-b border-white/5 py-3 font-display text-2xl font-bold tracking-[-0.04em] ${href === active ? "text-[var(--champagne)]" : "text-white"
                      }`}
                  >
                    {label}
                    <ArrowUpRight size={16} className="text-white/25" />
                  </MotionLink>
                ))}
                <motion.button
                  variants={fadeUp}
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    onBook?.();
                  }}
                  className="btn-solid magnetic-btn relative mt-4 overflow-hidden rounded-full py-4 label-mono text-[10px] tracking-[0.18em]"
                >
                  <span className="relative z-10">Book a consultation</span>
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

/* ---------------------------------------------------------------------- */
/*  FOOTER — identical on every page                                     */
/* ---------------------------------------------------------------------- */

export function Footer({ onBook }) {
  return (
    <footer id="site-footer" className="relative overflow-hidden bg-[#020104] px-3 pb-3 pt-10 text-white md:px-5 md:pb-5">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--orchid),var(--champagne),var(--orchid),transparent)] opacity-60" />
      <div className="footer-glow absolute -right-20 top-[-40%] h-[550px] w-[550px] rounded-full bg-[var(--violet)]/14 blur-[100px]" />
      <div className="footer-glow-gold absolute -left-24 bottom-[-30%] h-[400px] w-[400px] rounded-full bg-[var(--champagne)]/8 blur-[100px]" />
      <div className="footer-grid absolute inset-0 opacity-[0.5]" />

      <div className="footer-shell relative mx-auto max-w-[1480px] overflow-hidden rounded-[34px] border border-[var(--orchid)]/20 bg-[#050308]/95 px-6 py-14 shadow-[0_30px_90px_rgba(0,0,0,.55),0_0_45px_rgba(124,58,237,.1)] md:px-10 md:py-20">
        <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[var(--orchid)]/65 to-transparent" />
        <Reveal className="mb-16 flex flex-col justify-between gap-10 rounded-[28px] border border-[var(--orchid)]/15 bg-[#12091b]/65 p-8 md:flex-row md:items-center md:p-12">
          <div>
            <SectionLabel light>Raw to finest</SectionLabel>
            <h2 className="mt-5 max-w-[850px] font-display text-[clamp(2.6rem,5.8vw,5.6rem)] font-bold leading-[0.86] tracking-[-0.06em]">
              Make your
              <br />
              <GsapCharReveal
                as="span"
                className="gradient-text-hero font-editorial italic"
                text="next move."
                stagger={0.025}
              />
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <span className="label-mono hidden text-right tracking-[0.16em] text-white/65 sm:block">
              Free 30-minute
              <br />
              consultation call
            </span>
            <motion.button
              whileHover={{ scale: 1.08, rotate: 12 }}
              whileTap={{ scale: 0.94 }}
              transition={{ type: "spring", stiffness: 320, damping: 18 }}
              type="button"
              onClick={onBook}
              className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[var(--champagne)] text-[#07102F] md:h-20 md:w-20"
              aria-label="Book a consultation"
            >
              <ArrowUpRight size={24} />
            </motion.button>
          </div>
        </Reveal>

        <div className="grid gap-12 border-t border-white/10 pt-14 lg:grid-cols-[1.3fr_.7fr_.8fr_.8fr]">
          <div>
            <AppLogo />
            <p className="mt-7 max-w-[440px] text-base leading-8 text-white/70">
              Raw to Finest is a creative studio for graphic design, video edits
              and web design built for brands and agencies that need
              dependable, premium output every week, not once a quarter.
            </p>
            <div className="mt-7 flex gap-3">
              {["IG", "in", "TT"].map((label, i) => (
                <a
                  key={label + i}
                  href="#home"
                  aria-label={label === "IG" ? "Instagram" : label === "in" ? "LinkedIn" : "TikTok"}
                  className="label-mono flex h-11 w-11 items-center justify-center rounded-full border border-[var(--orchid)]/20 bg-[#07133f] text-white/70 transition hover:border-[var(--orchid)] hover:bg-[var(--violet)] hover:text-white"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <div className="label-mono mb-6 tracking-[0.16em] text-[var(--champagne)]">Navigation</div>
            <div className="flex flex-col gap-4 text-base text-white/68">
              {navItems.map(([label, href]) => (
                <Link key={label} to={href} className="footer-link transition hover:text-white">
                  {label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div className="label-mono mb-6 tracking-[0.16em] text-[var(--champagne)]">Services</div>
            <div className="flex flex-col gap-4 text-base text-white/68">
              {PROGRAM_LINKS.map(([number, label]) => (
                <a key={number} href="/#programs" className="footer-link transition hover:text-white">
                  {label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <div className="label-mono mb-6 tracking-[0.16em] text-[var(--champagne)]">Contact</div>
            <div className="space-y-4 text-base text-white/68">
              <a href="mailto:hello@rawtofiness.com" className="footer-link block transition hover:text-white">
                hello@rawtofiness.com
              </a>
              <a href="tel:+923001234567" className="footer-link block transition hover:text-white">
                +92 300 1234567
              </a>
              <span className="block text-white/25">Mon — Fri · Online</span>
            </div>
          </div>
        </div>

        <div className="label-mono mt-14 flex flex-col justify-between gap-4 border-t border-[var(--orchid)]/15 pt-7 tracking-[0.14em] text-white/55 md:flex-row md:items-center">
          <span>© {new Date().getFullYear()} Raw to Finest. All rights reserved.</span>
          <span className="flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-[var(--champagne)]" />
            Built for people who are ready to build.
          </span>
        </div>
      </div>
    </footer>
  );
}

/* ---------------------------------------------------------------------- */
/*  STICKY BOTTOM CTA                                                    */
/* ---------------------------------------------------------------------- */

export function StickyCTA({ onBook }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-3 left-3 right-3 z-[75] md:bottom-7 md:left-auto md:right-7 md:w-[360px]"
    >
      <div className="sticky-cta-inner relative flex items-center justify-between gap-3 overflow-hidden rounded-[22px] border border-white/15 bg-[#060D2A]/88 px-3 py-3 shadow-[0_20px_70px_rgba(0,0,0,.45)] backdrop-blur-2xl md:px-4">
        <div className="sticky-shine absolute inset-y-0 left-[-35%] w-[30%] bg-gradient-to-r from-transparent via-white/15 to-transparent" />

        <div className="relative flex min-w-0 items-center gap-3">
          <div className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-[14px] bg-gradient-to-br from-[#BCEEFF] to-[#1646D8] text-[#07102F] sm:flex">
            <CalendarDays size={17} />
          </div>
          <div className="min-w-0">
            <div className="label-mono truncate text-[9px] tracking-[0.16em] text-white">Ready to start?</div>
            <div className="mt-1 hidden text-[8px] text-white/35 sm:block">Book a free consultation with Raw to Finest.</div>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          onClick={onBook}
          className="label-mono relative flex shrink-0 items-center gap-2 rounded-full bg-[var(--champagne)] px-4 py-3 text-[8px] tracking-[0.14em] text-[#07102F] transition hover:bg-white md:px-5"
        >
          Book a call
          <ArrowUpRight size={13} />
        </motion.button>
      </div>
    </motion.div>
  );
}

/* ---------------------------------------------------------------------- */
/*  BOOKING MODAL — self-contained (calendar + form + EmailJS submit)     */
/*  Drop `<BookingModal isOpen={x} onClose={fn} />` into any page to      */
/*  reuse the exact same booking functionality as the homepage.          */
/* ---------------------------------------------------------------------- */

export function BookingModal({ isOpen, onClose }) {
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingError, setBookingError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [calendarDate, setCalendarDate] = useState(() => new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");

  const [form, setForm] = useState({
    name: "", email: "", phone: "", goal: "", experience: "", message: "",
  });

  const today = useMemo(() => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
  }, []);

  const calendarDays = useMemo(() => {
    const year = calendarDate.getFullYear();
    const month = calendarDate.getMonth();
    const first = new Date(year, month, 1);
    const last = new Date(year, month + 1, 0);
    const days = [];
    for (let i = 0; i < first.getDay(); i++) days.push(null);
    for (let day = 1; day <= last.getDate(); day++) days.push(new Date(year, month, day));
    return days;
  }, [calendarDate]);

  const monthTitle = calendarDate.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  useEffect(() => {
    let resetFrame;
    if (isOpen) {
      resetFrame = requestAnimationFrame(() => {
        setBookingSuccess(false);
        setBookingError("");
      });
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      if (resetFrame) cancelAnimationFrame(resetFrame);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const isPast = (date) => {
    if (!date) return false;
    const value = new Date(date);
    value.setHours(0, 0, 0, 0);
    return value < today;
  };

  const isToday = (date) => Boolean(date) && date.toDateString() === today.toDateString();

  const isSelected = (date) =>
    Boolean(date && selectedDate) && date.toDateString() === selectedDate.toDateString();

  const changeMonth = (amount) => {
    setCalendarDate(new Date(calendarDate.getFullYear(), calendarDate.getMonth() + amount, 1));
    setSelectedDate(null);
    setSelectedTime("");
    setBookingError("");
  };

  const updateForm = (field, value) => setForm((current) => ({ ...current, [field]: value }));

  const submitBooking = async (event) => {
    event.preventDefault();
    setBookingError("");

    if (!selectedDate) {
      setBookingError("Please select a date first.");
      return;
    }
    if (!selectedTime) {
      setBookingError("Please select a meeting time.");
      return;
    }
    if (isPast(selectedDate)) {
      setBookingError("Past dates cannot be booked.");
      return;
    }

    setSubmitting(true);

    try {
      const formattedDate = selectedDate.toLocaleDateString("en-US", {
        weekday: "long", month: "long", day: "numeric", year: "numeric",
      });

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: form.name,
          email: form.email,
          phone: form.phone,
          goal: form.goal,
          experience: form.experience,
          message: form.message || "No message provided",
          appointment_date: formattedDate,
          appointment_time: selectedTime,
          booking_source: "Raw to Finest Website",
        },
        { publicKey: EMAILJS_PUBLIC_KEY }
      );

      setBookingSuccess(true);
      setForm({ name: "", email: "", phone: "", goal: "", experience: "", message: "" });
      setSelectedDate(null);
      setSelectedTime("");
    } catch (error) {
      console.error("EmailJS booking error:", error);
      setBookingError("We couldn't send the booking right now. Please check your EmailJS configuration and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[120] overflow-y-auto bg-[#050308]/82 p-3 backdrop-blur-2xl md:p-6"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose?.();
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.975 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="booking-shell mx-auto my-4 max-w-[1220px] overflow-hidden rounded-[34px] border border-white/10 bg-[var(--cream)] text-[#07102F] shadow-[0_40px_140px_rgba(0,0,0,.7)] md:my-10"
          >
            <div className="relative">
              <button
                type="button"
                onClick={onClose}
                className="absolute right-4 top-4 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-[#07102F] text-white transition hover:bg-[var(--violet)]"
                aria-label="Close booking"
              >
                <X size={17} />
              </button>

              {bookingSuccess ? (
                <div className="flex min-h-[650px] items-center justify-center px-6 py-20 text-center">
                  <div className="max-w-[560px]">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 260, damping: 18 }}
                      className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[var(--violet)] text-white shadow-[0_0_70px_rgba(23,104,255,.4)]"
                    >
                      <Check size={34} />
                    </motion.div>

                    <div className="label-mono mt-8 text-[8px] tracking-[0.28em] text-[#07102F]/35">Raw to finest</div>

                    <h2 className="mt-4 font-display text-5xl font-bold leading-[0.85] tracking-[-0.05em] md:text-7xl">
                      Request
                      <br />
                      <span className="font-editorial italic text-[var(--violet)]">received.</span>
                    </h2>

                    <p className="mt-6 text-sm leading-7 text-[#07102F]/45">
                      Your consultation request has been sent successfully. The
                      Raw to Finest team will contact you using the details you
                      provided.
                    </p>

                    <button
                      type="button"
                      onClick={onClose}
                      className="mt-8 rounded-full bg-[#07102F] px-7 py-4 label-mono text-[9px] tracking-[0.2em] text-white transition hover:bg-[var(--violet)]"
                    >
                      Done
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid lg:grid-cols-[.7fr_1.3fr]">
                  <div className="relative overflow-hidden bg-[#12091b] p-7 text-white md:p-10 lg:p-12">
                    <div className="absolute -right-32 -top-24 h-[500px] w-[500px] rounded-full bg-[var(--violet)]/22 blur-[100px]" />
                    <div className="absolute -bottom-32 -left-32 h-[400px] w-[400px] rounded-full bg-[var(--champagne)]/8 blur-[90px]" />

                    <div className="relative">
                      <GlassPill>Book a consultation</GlassPill>

                      <h2 className="mt-8 font-display text-[clamp(3.3rem,6.6vw,6.6rem)] font-bold leading-[0.83] tracking-[-0.07em]">
                        Let's talk
                        <br />
                        <span className="gradient-text-hero font-editorial italic">projects.</span>
                      </h2>

                      <p className="mt-7 max-w-[390px] text-sm leading-7 text-white/38">
                        Pick a future date and time, tell us where you want to go, and we'll take it from there.
                      </p>

                      <div className="mt-10 space-y-5 border-t border-white/10 pt-7">
                        <div className="flex gap-3">
                          <CalendarDays size={18} className="text-[var(--champagne)]" />
                          <div>
                            <div className="text-sm font-bold">30-minute consultation</div>
                            <div className="mt-1 text-xs text-white/28">Online / phone</div>
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <ShieldCheck size={18} className="text-[var(--champagne)]" />
                          <div>
                            <div className="text-sm font-bold">No pressure</div>
                            <div className="mt-1 text-xs text-white/28">Just a conversation.</div>
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <Clock3 size={18} className="text-[var(--champagne)]" />
                          <div>
                            <div className="text-sm font-bold">Future dates only</div>
                            <div className="mt-1 text-xs text-white/28">Past dates remain visible but locked.</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <form onSubmit={submitBooking} className="p-6 md:p-10">
                    <div className="grid gap-9 lg:grid-cols-2">
                      <div>
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="label-mono text-[8px] tracking-[0.2em] text-[#07102F]/35">Select a date</div>
                            <h3 className="mt-1 font-display text-2xl font-bold tracking-[-0.03em]">{monthTitle}</h3>
                          </div>
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() => changeMonth(-1)}
                              className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--violet)]/10 bg-white/60 transition hover:bg-[#B4E9FF]"
                              aria-label="Previous month"
                            >
                              <ChevronLeft size={15} />
                            </button>
                            <button
                              type="button"
                              onClick={() => changeMonth(1)}
                              className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--violet)]/10 bg-white/60 transition hover:bg-[#B4E9FF]"
                              aria-label="Next month"
                            >
                              <ChevronRight size={15} />
                            </button>
                          </div>
                        </div>

                        <div className="mt-6 grid grid-cols-7 gap-1">
                          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                            <div key={day} className="label-mono py-2 text-center text-[7px] tracking-[0.12em] text-[#07102F]/25">
                              {day}
                            </div>
                          ))}

                          {calendarDays.map((date, index) => {
                            const past = isPast(date);
                            const selected = isSelected(date);
                            return (
                              <button
                                type="button"
                                key={`${date?.toISOString() || "blank"}-${index}`}
                                disabled={!date || past}
                                onClick={() => {
                                  if (!past && date) {
                                    setSelectedDate(date);
                                    setSelectedTime("");
                                    setBookingError("");
                                  }
                                }}
                                className={`calendar-day relative aspect-square rounded-xl text-xs font-bold transition ${!date
                                    ? ""
                                    : past
                                      ? "cursor-not-allowed text-[#07102F]/10"
                                      : selected
                                        ? "bg-[var(--violet)] text-white shadow-lg shadow-[var(--violet)]/25"
                                        : "hover:bg-[#B4E9FF] hover:text-[var(--violet)]"
                                  }`}
                              >
                                {date?.getDate()}
                                {isToday(date) && (
                                  <span className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[var(--violet)]" />
                                )}
                              </button>
                            );
                          })}
                        </div>

                        <div className="label-mono mt-5 rounded-xl border border-[var(--violet)]/10 bg-[var(--violet)]/[0.04] px-4 py-3 text-[7px] tracking-[0.12em] text-[#07102F]/30">
                          Previous dates are visible for reference and cannot be selected.
                        </div>

                        <div className="mt-7">
                          <div className="label-mono mb-3 text-[8px] tracking-[0.2em] text-[#07102F]/35">Select a time</div>
                          <div className="grid grid-cols-2 gap-2">
                            {timeSlots.map((time) => (
                              <button
                                type="button"
                                key={time}
                                disabled={!selectedDate}
                                onClick={() => setSelectedTime(time)}
                                className={`rounded-xl border px-3 py-3 text-[9px] font-bold transition ${selectedTime === time
                                    ? "border-[var(--violet)] bg-[var(--violet)] text-white"
                                    : selectedDate
                                      ? "border-[var(--violet)]/10 bg-white hover:border-[var(--violet)]/30 hover:bg-[#B4E9FF]"
                                      : "cursor-not-allowed border-[#07102F]/5 text-[#07102F]/15"
                                  }`}
                              >
                                {time}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="label-mono text-[8px] tracking-[0.2em] text-[#07102F]/35">Your details</div>

                        <div className="mt-5 space-y-4">
                          <label className="block">
                            <span className="mb-2 block text-xs font-bold">Full name</span>
                            <div className="relative">
                              <UserRound size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#07102F]/25" />
                              <input
                                required
                                value={form.name}
                                onChange={(e) => updateForm("name", e.target.value)}
                                placeholder="Your name"
                                className="booking-input w-full rounded-xl border border-[var(--violet)]/10 bg-white px-11 py-3.5 text-sm outline-none transition focus:border-[var(--violet)] focus:ring-4 focus:ring-[var(--violet)]/8"
                              />
                            </div>
                          </label>

                          <label className="block">
                            <span className="mb-2 block text-xs font-bold">Email</span>
                            <input
                              required
                              type="email"
                              value={form.email}
                              onChange={(e) => updateForm("email", e.target.value)}
                              placeholder="you@example.com"
                              className="booking-input w-full rounded-xl border border-[var(--violet)]/10 bg-white px-4 py-3.5 text-sm outline-none transition focus:border-[var(--violet)] focus:ring-4 focus:ring-[var(--violet)]/8"
                            />
                          </label>

                          <label className="block">
                            <span className="mb-2 block text-xs font-bold">Phone</span>
                            <input
                              required
                              value={form.phone}
                              onChange={(e) => updateForm("phone", e.target.value)}
                              placeholder="+92 300 1234567"
                              className="booking-input w-full rounded-xl border border-[var(--violet)]/10 bg-white px-4 py-3.5 text-sm outline-none transition focus:border-[var(--violet)] focus:ring-4 focus:ring-[var(--violet)]/8"
                            />
                          </label>

                          <label className="block">
                            <span className="mb-2 block text-xs font-bold">What do you need?</span>
                            <select
                              required
                              value={form.goal}
                              onChange={(e) => updateForm("goal", e.target.value)}
                              className="booking-input w-full rounded-xl border border-[var(--violet)]/10 bg-white px-4 py-3.5 text-sm outline-none transition focus:border-[var(--violet)] focus:ring-4 focus:ring-[var(--violet)]/8"
                            >
                              <option value="">Select a service</option>
                              <option value="Graphic design">Graphic design</option>
                              <option value="Video editing">Video editing</option>
                              <option value="Web design">Web design</option>
                              <option value="Brand strategy">Brand strategy</option>
                              <option value="Not sure yet">Not sure yet</option>
                            </select>
                          </label>

                          <label className="block">
                            <span className="mb-2 block text-xs font-bold">Project timeline</span>
                            <select
                              required
                              value={form.experience}
                              onChange={(e) => updateForm("experience", e.target.value)}
                              className="booking-input w-full rounded-xl border border-[var(--violet)]/10 bg-white px-4 py-3.5 text-sm outline-none transition focus:border-[var(--violet)] focus:ring-4 focus:ring-[var(--violet)]/8"
                            >
                              <option value="">Select a timeline</option>
                              <option value="ASAP">ASAP</option>
                              <option value="Within a month">Within a month</option>
                              <option value="Flexible / exploring">Flexible / exploring</option>
                            </select>
                          </label>

                          <label className="block">
                            <span className="mb-2 block text-xs font-bold">Tell us about your project</span>
                            <textarea
                              rows={3}
                              value={form.message}
                              onChange={(e) => updateForm("message", e.target.value)}
                              placeholder="What are you trying to create?"
                              className="booking-input w-full resize-none rounded-xl border border-[var(--violet)]/10 bg-white px-4 py-3.5 text-sm outline-none transition focus:border-[var(--violet)] focus:ring-4 focus:ring-[var(--violet)]/8"
                            />
                          </label>
                        </div>

                        {bookingError && (
                          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-bold leading-5 text-red-600">
                            {bookingError}
                          </div>
                        )}

                        <div className="mt-4 rounded-xl border border-[var(--violet)]/10 bg-[var(--violet)]/[0.04] p-4">
                          <div className="label-mono text-[7px] tracking-[0.2em] text-[#07102F]/30">Appointment</div>
                          <div className="mt-2 text-xs font-bold">
                            {selectedDate
                              ? selectedDate.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" })
                              : "Choose a date"}
                            {selectedTime && (
                              <>
                                <span className="mx-2 text-[#07102F]/20">·</span>
                                {selectedTime}
                              </>
                            )}
                          </div>
                        </div>

                        <button
                          type="submit"
                          disabled={submitting}
                          className="btn-solid magnetic-btn relative mt-4 flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl px-5 py-4 label-mono text-[9px] tracking-[0.18em] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <span className="relative z-10 flex items-center gap-3">
                            {submitting ? "Sending request..." : "Confirm consultation"}
                            {!submitting && <ArrowRight size={15} />}
                          </span>
                        </button>

                        <p className="mt-3 text-center text-[7px] leading-5 text-[#07102F]/30">
                          Your request is sent to the Raw to Finest team by EmailJS.
                        </p>
                      </div>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
