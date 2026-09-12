import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Clapperboard,
  Film,
  Megaphone,
  Palette,
  Play,
  Sparkles,
  Target,
  UserRound,
} from "lucide-react";
import {
  BookingModal,
  DynamicCursor,
  Footer,
  Header,
  MagneticButton,
  PageTransition,
  ScrollProgressBar,
  SectionLabel,
  StickyCTA,
} from "./SiteChrome";
import GlobalStyles from "./GlobalStyles";

const services = [
  [Film, "Video Editing"],
  [Clapperboard, "Short-Form Content"],
  [Megaphone, "Social Media"],
  [Palette, "Graphic Design"],
  [Target, "Digital Marketing"],
];

const team = [
  { name: "Hassan Rashid", role: "CEO & Founder", initials: "HR", image: "" },
  { name: "Umer", role: "Video Editor", initials: "UM", image: "" },
  { name: "Muhammad Ali", role: "Website Developer", initials: "MA", image: "" },

  { name: "Hussian", role: "Video Editor", initials: "HU", image: "" },
  { name: "Muhib", role: "Video Editor", initials: "MU", image: "" },
  { name: "Hashir", role: "Video Editor", initials: "HA", image: "" },
  { name: "Hassan", role: "Graphic Designer", initials: "HS", image: "" },
  { name: "Huzifa", role: "Video Editor", initials: "HZ", image: "" },
  { name: "Ishaa", role: "Project Manager", initials: "IS", image: "" },
];

const process = [
  {
    number: "01",
    word: "RAW",
    title: "The starting point",
    copy: "Ideas, footage, concepts and stories full of potential, ready to be shaped.",
  },
  {
    number: "02",
    word: "REFINE",
    title: "The creative process",
    copy: "Strategy, editing, design and creativity working together with clarity and intent.",
  },
  {
    number: "03",
    word: "FINEST",
    title: "The final impact",
    copy: "Premium content that earns attention, communicates clearly and makes an impact.",
  },
];

const reveal = {
  hidden: { opacity: 0, y: 48, filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)" },
};

function Reveal({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      variants={reveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.72, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Hero({ onBook }) {
  const reduceMotion = useReducedMotion();

  return (
    <section id="home" className="r2f-hero relative flex min-h-[92svh] overflow-hidden pt-[104px] text-white md:pt-[108px]">
      <div className="r2f-hero-vignette absolute inset-0" aria-hidden="true" />

      <div className="relative z-10 mx-auto flex w-full max-w-[1380px] flex-col px-5 pb-5 md:px-8 md:pb-6">
        <motion.div
          initial={{ opacity: 0, y: 34, scale: 0.965 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: reduceMotion ? 0 : 1, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto flex w-full max-w-[1080px] flex-1 flex-col items-center text-center"
        >
          <p className="r2f-hero-eyebrow mt-5 w-full text-[9px] font-semibold uppercase tracking-[.5em] text-white/75 sm:text-[10px] md:mt-0 md:text-[11px]">
            Raw to <span className="text-[#b455ff]">Finest</span>
          </p>
          <h1 className="r2f-reference-title mt-2.5 w-full font-display text-[clamp(2.35rem,5vw,4.65rem)] font-bold leading-[.9] tracking-[-.055em] text-white">
            <span className="block">Raw Ideas.</span>
            <span className="r2f-hero-title-shine block">Refined into Impact.</span>
          </h1>
          <p className="mt-3.5 w-full max-w-[575px] text-[13px] leading-6 text-white/67 md:text-sm md:leading-6">
            A creative agency turning raw footage, ideas and brands<br className="hidden sm:block" /> into powerful visual stories.
          </p>
          <div className="r2f-disciplines mt-3.5 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[8px] font-semibold uppercase tracking-[.18em] text-white/65 sm:gap-x-5 sm:text-[9px] md:text-[9px]">
            <span>Video Editing</span><i>/</i>
            <span>Graphic Design</span><i>/</i>
            <span>Automotive Videos</span><i>/</i>
            <span>Websites</span>
          </div>

          <div className="r2f-rock-stage relative w-full max-w-[920px]" aria-label="A raw rock breaking apart with violet energy">
            <img
              src="/images/r2f-rock-reveal-hero.png"
              alt=""
              className="r2f-rock-stage-image absolute inset-0 h-full w-full object-cover"
              aria-hidden="true"
            />
          </div>

          <div className="r2f-reference-actions -mt-4 flex flex-col items-center gap-3 sm:flex-row md:-mt-6">
            <MagneticButton href="/portfolio" className="min-w-[200px] justify-center py-3.5">
              View our work <ArrowRight size={15} />
            </MagneticButton>
            <MagneticButton onClick={onBook} variant="ghost" className="min-w-[235px] justify-center py-3.5">
              Get a free sample edit <ArrowRight size={15} />
            </MagneticButton>
          </div>
        </motion.div>

        <div className="r2f-service-dock mt-4 grid items-center gap-4 rounded-[22px] border border-white/15 px-4 py-3 md:px-5 lg:grid-cols-[170px_1fr_160px]">
          <a href="#about" className="group hidden items-center gap-4 text-white/50 transition hover:text-white lg:flex">
            <span className="flex h-10 w-6 items-start justify-center rounded-full border border-white/35 p-1.5">
              <motion.i animate={reduceMotion ? undefined : { y: [0, 12, 0] }} transition={{ duration: 1.8, repeat: Infinity }} className="h-1.5 w-1.5 rounded-full bg-[#c084fc]" />
            </span>
            <span className="text-[8px] font-semibold uppercase leading-4 tracking-[.28em]">Scroll<br />to explore</span>
          </a>

          <div className="grid min-w-0 grid-cols-2 gap-y-5 sm:grid-cols-5">
            {services.map(([Icon, label], index) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.75 + index * 0.08, duration: 0.5 }}
                className="flex min-w-0 items-center justify-center gap-2 border-white/10 px-1 text-center text-[9px] font-medium text-white/65 sm:border-r sm:gap-3 sm:px-3 md:text-[11px]"
              >
                <Icon size={22} className="shrink-0 text-[#c084fc]" strokeWidth={1.8} />
                <span>{label}</span>
              </motion.div>
            ))}
          </div>

          <a href="/video-edits" className="group hidden items-center justify-end gap-3 text-[8px] font-semibold uppercase tracking-[.22em] text-white/62 transition hover:text-white lg:flex">
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#8b5cf6]/60 text-white shadow-[0_0_24px_rgba(124,58,237,.25)] transition group-hover:scale-110 group-hover:bg-[#7c3aed]">
              <Play size={13} fill="currentColor" />
            </span>
            Watch showreel
          </a>
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="relative overflow-hidden py-24 text-white md:py-36">
      <div className="r2f-orb -left-32 top-10 h-[430px] w-[430px] bg-[#7c3aed]/18" />
      <div className="r2f-section-frame relative mx-5 grid max-w-[1320px] gap-14 rounded-[32px] p-7 md:mx-8 md:p-12 lg:mx-auto lg:grid-cols-[.8fr_1.2fr] lg:items-center lg:p-16">
        <Reveal>
          <SectionLabel light>01 / About us</SectionLabel>
          <h2 className="mt-6 font-display text-[clamp(2.6rem,5vw,5rem)] font-bold leading-[.9] tracking-[-.05em]">
            Who R2F<br /><span className="gradient-text-hero font-editorial italic">Studios is.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.12} className="relative">
          <span className="absolute -left-7 top-0 hidden h-full w-px bg-gradient-to-b from-[#a855f7] via-[#a855f7]/20 to-transparent lg:block" />
          <p className="max-w-[760px] text-xl leading-[1.8] text-white/68 md:text-2xl">
            R2F Studios Raw to Finest Studios is a creative production and digital media agency built to transform raw ideas, footage and brands into polished, high-impact content.
          </p>
          <p className="mt-6 max-w-[690px] text-base leading-8 text-white/48">
            From video editing and social media content to creative design and digital marketing, we help brands look, feel and perform at their finest.
          </p>
          <div className="mt-10 grid grid-cols-3 gap-3">
            {[["05+", "Years"], ["04", "Disciplines"], ["01", "Creative studio"]].map(([value, label]) => (
              <div key={label} className="r2f-glass rounded-2xl p-4 md:p-6">
                <strong className="font-display text-2xl text-white md:text-4xl">{value}</strong>
                <span className="mt-2 block text-[8px] uppercase tracking-[.2em] text-white/40">{label}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function StorySection() {
  return (
    <section id="story" className="relative overflow-hidden py-24 text-white md:py-36">
      <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(168,85,247,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,.05)_1px,transparent_1px)] [background-size:70px_70px]" />
      <div className="r2f-section-frame relative mx-5 max-w-[1320px] rounded-[32px] p-7 md:mx-8 md:p-12 lg:mx-auto lg:p-16">
        <Reveal className="grid gap-12 lg:grid-cols-[.58fr_1.42fr] lg:items-end">
          <div>
            <SectionLabel light>02 / Our story</SectionLabel>
            <div className="mt-8 flex h-20 w-20 items-center justify-center rounded-full border border-[#a855f7]/30 bg-[#a855f7]/10 text-[#d8b4fe] shadow-[0_0_50px_rgba(124,58,237,.15)]">
              <Sparkles size={28} />
            </div>
          </div>
          <h2 className="font-display text-[clamp(2.5rem,5vw,5.2rem)] font-bold leading-[.92] tracking-[-.05em]">
            Raw content has potential.<br /><span className="font-editorial italic text-[#a855f7]">We reveal it.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.12} className="mt-16 grid gap-8 border-t border-white/10 pt-10 md:grid-cols-2">
          <p className="text-lg leading-8 text-white/72">
            R2F started with a simple idea: raw content has potential, it just needs the right creative process.
          </p>
          <p className="text-base leading-8 text-white/48">
            What began with video editing grew through years of working with businesses, creators, automotive brands, real estate companies and agencies. Today, R2F brings that experience together under one creative studio.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function ExperienceSection() {
  return (
    <section id="experience" className="relative overflow-hidden py-24 text-white md:py-36">
      <div className="relative mx-auto max-w-[1320px] px-5 md:px-8">
        <div className="r2f-experience-card relative overflow-hidden rounded-[30px] border border-[#a855f7]/25 p-7 md:p-14 lg:p-20">
          <div className="absolute -right-10 -top-32 font-display text-[clamp(12rem,30vw,28rem)] font-black leading-none text-white/[.025]">5+</div>
          <div className="relative grid gap-12 lg:grid-cols-[.7fr_1.3fr] lg:items-center">
            <Reveal>
              <SectionLabel light>03 / Our experience</SectionLabel>
              <div className="mt-8 font-display text-[clamp(6rem,14vw,11rem)] font-black leading-[.72] tracking-[-.09em] text-white">5<span className="text-[#a855f7]">+</span></div>
              <div className="mt-5 text-xs uppercase tracking-[.35em] text-white/42">Years refining content</div>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display text-[clamp(2.7rem,5vw,5rem)] font-bold leading-[.9] tracking-[-.055em]">Experience built across <span className="font-editorial italic text-[#c084fc]">platforms.</span></h2>
              <p className="mt-8 max-w-[700px] text-lg leading-9 text-white/58">
                With 5+ years of experience in video editing and digital content, we've worked across industries and developed a deep understanding of what makes content attention grabbing, professional and built for today's platforms.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  return (
    <section id="programs" className="relative overflow-hidden py-24 text-white md:py-36">
      <div className="r2f-orb -right-40 top-24 h-[520px] w-[520px] bg-[#a855f7]/14" />
      <div className="relative mx-auto max-w-[1320px] px-5 md:px-8">
        <Reveal className="grid gap-8 lg:grid-cols-[1fr_.72fr] lg:items-end">
          <div>
            <SectionLabel light>04 / What makes R2F different</SectionLabel>
            <h2 className="mt-6 font-display text-[clamp(2.6rem,5vw,5.2rem)] font-bold leading-[.9] tracking-[-.05em]">We don't just edit content <br /><span className="gradient-text-hero font-editorial italic">we refine it.</span></h2>
          </div>
          <p className="max-w-[520px] text-base leading-8 text-white/52 lg:justify-self-end">Our approach is built around the Raw → Finest process: a clear path from possibility to polished impact.</p>
        </Reveal>

        <div className="relative mt-16 grid gap-4 lg:grid-cols-3">
          <div className="absolute left-[16%] right-[16%] top-[52px] hidden h-px bg-gradient-to-r from-[#7c3aed]/10 via-[#c084fc] to-[#7c3aed]/10 lg:block" />
          {process.map((item, index) => (
            <Reveal key={item.word} delay={index * 0.1}>
              <motion.article whileHover={{ y: -10 }} transition={{ type: "spring", stiffness: 300, damping: 22 }} className="r2f-process-card group relative h-full overflow-hidden rounded-[26px] border border-white/10 p-7 md:p-9">
                <span className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full border border-[#a855f7]/35 bg-[#08050c] text-[10px] font-bold text-[#d8b4fe] shadow-[0_0_28px_rgba(124,58,237,.2)]">{item.number}</span>
                <div className="mt-14 font-display text-[clamp(3rem,6vw,5.4rem)] font-black tracking-[-.065em] text-white transition group-hover:text-[#c084fc]">{item.word}</div>
                <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-white/46">{item.copy}</p>
              </motion.article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.16} className="mx-auto mt-14 max-w-[850px] text-center">
          <p className="text-lg leading-9 text-white/60">We combine <span className="text-white">creative thinking + technical execution + marketing understanding</span> to create content that isn't just good-looking, but has a purpose.</p>
        </Reveal>
      </div>
    </section>
  );
}

function TeamSection() {
  const railRef = useRef(null);
  const moveRail = (direction) => {
    railRef.current?.scrollBy({ left: direction * 310, behavior: "smooth" });
  };

  return (
    <section id="team" className="relative overflow-hidden py-24 text-white md:py-36">
      <div className="relative mx-auto max-w-[1320px] px-5 md:px-8">
        <Reveal className="grid gap-9 lg:grid-cols-[.85fr_1.15fr] lg:items-end">
          <div>
            <SectionLabel light>05 / The team</SectionLabel>
            <h2 className="mt-6 font-display text-[clamp(2.6rem,5vw,5.2rem)] font-bold leading-[.9] tracking-[-.05em]">Creative minds.<br /><span className="font-editorial italic text-[#a855f7]">One standard.</span></h2>
          </div>
          <p className="max-w-[680px] text-lg leading-9 text-white/75 lg:justify-self-end">Behind R2F is a growing team of editors, designers, marketers and creative minds who work together to turn ideas into finished content. We believe great work comes from collaboration, attention to detail and constantly pushing what's possible.</p>
        </Reveal>

        <div className="mt-12 flex items-center justify-between gap-5 border-t border-white/10 pt-6">
          <p className="text-sm font-medium text-white/65">Meet the people behind the work</p>
          <div className="flex items-center gap-2">
            <span className="mr-2 hidden text-[9px] font-semibold uppercase tracking-[.2em] text-white/40 sm:inline">Scroll team</span>
            <button type="button" onClick={() => moveRail(-1)} aria-label="Previous team members" className="r2f-rail-button"><ChevronLeft size={18} /></button>
            <button type="button" onClick={() => moveRail(1)} aria-label="Next team members" className="r2f-rail-button"><ChevronRight size={18} /></button>
          </div>
        </div>

        <div ref={railRef} className="r2f-team-rail -mx-5 mt-7 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-7 md:-mx-8 md:px-8">
          {team.map((member, index) => (
            <motion.article
              key={`${member.name}-${member.role}`}
              initial={{ opacity: 0, y: 42 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.22 }}
              transition={{ duration: 0.58, delay: Math.min(index * 0.055, 0.3), ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -9 }}
              className="r2f-team-portrait group relative w-[260px] shrink-0 snap-start overflow-hidden rounded-[26px] border border-white/10 bg-[#050307] p-3 md:w-[285px]"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-[19px] border border-white/[.07] bg-[#09050d]">
                {member.image ? (
                  <img src={member.image} alt={member.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(168,85,247,.2),transparent_43%),linear-gradient(160deg,#0d0712,#030204)]" />
                    <div className="absolute inset-6 rounded-full border border-[#a855f7]/10" />
                    <div className="absolute inset-12 rounded-full border border-[#a855f7]/10" />
                    <span className="relative flex h-24 w-24 items-center justify-center rounded-full border border-[#a855f7]/25 bg-black/60 text-[#d8b4fe] shadow-[0_0_60px_rgba(124,58,237,.24)]">
                      <UserRound size={42} strokeWidth={1.25} />
                    </span>
                    <span className="relative mt-5 text-[9px] font-semibold uppercase tracking-[.24em] text-white/38">Portrait coming soon</span>
                  </div>
                )}
                <span className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/55 px-3 py-2 text-[8px] font-semibold tracking-[.18em] text-white/60 backdrop-blur-xl">R2F / {String(index + 1).padStart(2, "0")}</span>
              </div>
              <div className="flex items-end justify-between gap-4 px-2 pb-2 pt-5">
                <div>
                  <strong className="block font-display text-xl tracking-[-.025em] text-white">{member.name}</strong>
                  <small className="mt-2 block text-[10px] font-semibold uppercase tracking-[.17em] text-[#c084fc]">{member.role}</small>
                </div>
                <span className="font-display text-sm font-bold text-white/22">{member.initials}</span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function LandingPage() {
  const [bookingOpen, setBookingOpen] = useState(false);

  useEffect(() => {
    document.body.classList.add("raw-to-finess-page");
    document.body.classList.add("r2f-landing-page");
    return () => {
      document.body.classList.remove("raw-to-finess-page");
      document.body.classList.remove("r2f-landing-page");
    };
  }, []);

  const openBooking = () => setBookingOpen(true);
  const closeBooking = () => setBookingOpen(false);

  return (
    <PageTransition>
      <DynamicCursor />
      <ScrollProgressBar />
      <div className="r2f-landing-shell relative min-h-screen [overflow:clip] bg-transparent font-body text-white selection:bg-[#a855f7] selection:text-white">
        <Header active="/" onBook={openBooking} />
        <main tabIndex="-1">
          <Hero onBook={openBooking} />
          <AboutSection />
          <StorySection />
          <ExperienceSection />
          <ProcessSection />
          <TeamSection />
        </main>
        <Footer onBook={openBooking} />
        <BookingModal isOpen={bookingOpen} onClose={closeBooking} />
        <StickyCTA onBook={openBooking} />
      </div>
      <GlobalStyles />
    </PageTransition>
  );
}
