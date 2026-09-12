import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Globe, PenTool, Printer } from "lucide-react";

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
  TiltCard,
  SplitReveal,
  useSpotlight,
  StickyCTA,
} from "./SiteChrome";
import GlobalStyles from "./GlobalStyles";
import { GsapCharReveal, GsapScrollReveal } from "./effects/GsapKit";

const pillarWords = [
  "DESIGN",
  "STRATEGY",
  "CRAFT",
  "DELIVERY",
  "RESULTS",
];

/* ---------------------------------------------------------------------- */
/*  PRICING DATA — DESIGN MENU (digitals + printables)                    */
/* ---------------------------------------------------------------------- */

const designMenu = [
  {
    icon: PenTool,
    eyebrow: "DIGITALS",
    title: "Screen-ready design",
    items: [
      { name: "Logos", price: "$150 - $700" },
      { name: "Branding Kit", price: "$300 - $1,600" },
      { name: "Brand Guidelines (PDF)", price: "$150 - $1,000" },
      { name: "Presentation / Pitch Deck (10-20 slides)", price: "$300 - $2,000" },
      { name: "Company Profile Design (6-12 pages)", price: "$300 - $1,000" },
      { name: "Illustrations (Simple)", price: "$500 - $900" },
      { name: "Illustrations (Detailed / Character)", price: "$1,000 - $2,000" },
      { name: "LinkedIn Banner / Facebook Cover", price: "$30 - $90" },
      { name: "Podcast Cover Art", price: "$45 - $150" },
      { name: "Thumbnail Design (YouTube, etc.)", price: "$40 - $150" },
      { name: "Email Signature Design", price: "$150" },
      { name: "Infographic Design", price: "$150 - $300" },
      { name: "Social Media Post Design", price: "$25 - $50" },
      { name: "Carousel / Swipe Post Design (5-10 slides)", price: "$70 - $190" },
    ],
  },
  {
    icon: Printer,
    eyebrow: "PRINTABLES",
    title: "Print-ready design",
    items: [
      { name: "Brochure Design (Tri-fold / Bi-fold)", price: "$90 - $300" },
      { name: "Flyer Design", price: "$70 - $150" },
      { name: "Leaflet Design", price: "$70 - $150" },
      { name: "Poster Design", price: "$80 - $200" },
      { name: "Roll-up / Pull-up Banner", price: "$90 - $150" },
      { name: "Billboard Design", price: "$300 - $500" },
      { name: "Menu Design", price: "$450 - $900" },
      { name: "Catalog Design (10-20 pages)", price: "$600 - $1,000" },
      { name: "Magazine Design", price: "$600 - $1,500" },
      { name: "Postcard Design", price: "$150 - $500" },
      { name: "Packaging Design (Box / Label)", price: "$300 - $600" },
      { name: "Business Card Design", price: "$50 - $150" },
      { name: "Letterhead Design", price: "$50" },
      { name: "Envelope Design", price: "$50" },
    ],
  },
];

/* ---------------------------------------------------------------------- */
/*  PRICING DATA — WEB MENU                                               */
/* ---------------------------------------------------------------------- */

const websiteBuilds = [
  { name: "Landing Page (Design + Dev)", price: "$750 - $1,500" },
  { name: "5-Page Business Website", price: "$1,000 - $1,800" },
  { name: "Custom WordPress Website (up to 10 pages)", price: "$1,500 - $3,000" },
  { name: "One-Page Static Site", price: "$1,000 - $1,500" },
  { name: "E-commerce Website (Shopify / Woo)", price: "$1,800 - $3,000" },
  { name: "Webflow Website (5-10 pages)", price: "$1,800 - $4,000" },
  { name: "Corporate Website (10+ pages)", price: "$2,000 - $5,000" },
];

const websiteOngoing = [
  { name: "Ongoing Maintenance (Monthly)", price: "$200 - $750/mo" },
  { name: "Basic SEO (Monthly)", price: "$450/mo" },
  { name: "Advanced SEO (Monthly)", price: "$895/mo" },
];

/* ---------------------------------------------------------------------- */
/*  SMALL HELPERS                                                         */
/* ---------------------------------------------------------------------- */

function PriceRow({ name, price, dark = false, index = 0 }) {
  return (
    <GsapScrollReveal as="li" direction={index % 2 ? "right" : "left"} index={index} distance={55} className="flex items-baseline gap-3 py-2.5">
      <span className={`text-sm leading-6 ${dark ? "text-white/65" : "text-[#07102F]/65"}`}>{name}</span>
      <span
        aria-hidden="true"
        className={`price-leader mb-1 h-px flex-1 border-b border-dashed ${dark ? "border-white/15" : "border-[#07102F]/15"
          }`}
      />
      <span
        className={`label-mono shrink-0 text-[11px] font-bold tracking-[0.02em] ${dark ? "text-[var(--champagne)]" : "text-[var(--violet)]"
          }`}
      >
        {price}
      </span>
    </GsapScrollReveal>
  );
}

/* ---------------------------------------------------------------------- */
/*  PAGE                                                                  */
/* ---------------------------------------------------------------------- */

export default function PricingPage() {
  useReveal();

  const [bookingOpen, setBookingOpen] = useState(false);
  const spotlightRefs = [useSpotlight(), useSpotlight()];

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
        <Header active="/pricing" onBook={openBooking} />

        <main id="pricing-top" tabIndex="-1">
          {/* ================= HERO ================= */}
          <section className="hero-section relative overflow-hidden pt-[130px] md:pt-[150px]">
            <div className="hero-orb hero-orb-a" />
            <div className="hero-orb hero-orb-b" />
            <ParticleField />

            <div className="relative mx-auto flex max-w-[1100px] justify-center px-5 pb-16 text-center md:px-8 md:pb-20">
              <motion.div variants={staggerParent} initial="hidden" animate="show" className="flex w-full flex-col items-center">
                <RevealItem>
                  <GlassPill>SERVICE PRICING</GlassPill>
                </RevealItem>

                <RevealItem className="mt-7 max-w-[1000px] font-display text-[clamp(2.9rem,7.4vw,7.4rem)] font-bold leading-[0.85] tracking-[-0.07em]">
                  <SplitReveal as="span" text="REAL CRAFT." />
                  <br />
                  <SplitReveal
                    as="span"
                    className="gradient-text-hero font-editorial italic"
                    text="Clear pricing."
                    delay={0.15}
                  />
                </RevealItem>

                <RevealItem className="mx-auto mt-7 max-w-[560px] text-sm leading-7 text-white/40 md:text-base">
                  Clear starting ranges before the first call. Your final quote
                  reflects the scope, timeline and support your project needs.
                </RevealItem>
              </motion.div>
            </div>

            <div className="relative z-10 overflow-hidden border-y border-white/10 bg-black py-4 text-white">
              <div className="marquee-track flex min-w-max items-center gap-8">
                {[...Array(3)].flatMap((_, group) =>
                  pillarWords.map((word) => (
                    <React.Fragment key={`${group}-${word}`}>
                      <span className="font-display text-lg font-bold tracking-[-0.03em] md:text-2xl">{word}</span>
                      <span className="text-lg text-[var(--champagne)] md:text-2xl">✦</span>
                    </React.Fragment>
                  ))
                )}
              </div>
            </div>

            <div className="relative h-16 bg-[var(--ink)] md:h-24" />
            <Divider variant="wave" fill="#EEF7FF" />
          </section>

          {/* ================= DESIGN MENU (digitals + printables) ================= */}
          <section id="design-menu" className="relative overflow-hidden bg-[var(--cream)] text-[#07102F]">
            <div className="absolute right-[-15%] top-[-10%] h-[600px] w-[600px] rounded-full bg-[var(--orchid)]/18 blur-[110px]" />
            <div className="absolute left-[-10%] bottom-[-15%] h-[450px] w-[450px] rounded-full bg-[var(--champagne)]/10 blur-[110px]" />

            <div className="relative mx-auto max-w-[1480px] px-5 pb-28 pt-24 md:px-8 md:pb-36 md:pt-32">
              <Reveal className="mx-auto max-w-[720px] text-center" y={70}>
                <SectionLabel>01 / THE DESIGN MENU</SectionLabel>
                <h2 className="mt-6 font-display text-[clamp(2.9rem,6vw,5.8rem)] font-bold leading-[0.85] tracking-[-0.07em]">
                  DESIGN, PRICED
                  <br />
                  <span className="font-editorial italic text-[var(--violet)]">with clarity.</span>
                </h2>
                <p className="mx-auto mt-6 max-w-[500px] text-sm leading-7 text-[#07102F]/45">
                  From a single social post to a full brand kit — every design
                  service on the menu, priced by scope.
                </p>
              </Reveal>

              <RevealGroup className="mt-16 grid gap-6 lg:grid-cols-2">
                {designMenu.map((category, index) => {
                  const Icon = category.icon;
                  const spot = spotlightRefs[index];
                  return (
                    <GsapScrollReveal key={category.eyebrow} direction={index === 0 ? "left" : "right"} index={index} distance={190}>
                      <motion.article
                        ref={spot.ref}
                        onMouseMove={spot.onMouseMove}
                        initial={{ opacity: 0, x: index === 0 ? -150 : 150, y: 70, rotateY: index === 0 ? -18 : 18, scale: .9 }}
                        whileInView={{ opacity: 1, x: 0, y: 0, rotateY: 0, scale: 1 }}
                        viewport={{ once: true, amount: .24 }}
                        whileHover={{ y: -10, scale: 1.01 }}
                        transition={{ type: "spring", stiffness: 105, damping: 17, delay: index * .12 }}
                        className="spotlight-card flex flex-col rounded-[28px] border border-[var(--violet)]/10 bg-white/70 p-7 backdrop-blur-xl md:p-9"
                      >
                        <div className="flex items-center gap-4">
                          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--violet)]/10 text-[var(--violet)]">
                            <Icon size={20} />
                          </span>
                          <div>
                            <span className="label-mono text-[9px] uppercase tracking-[0.2em] text-[var(--violet)]/70">
                              {category.eyebrow}
                            </span>
                            <h3 className="font-display text-xl font-bold tracking-[-0.02em] text-[#07102F]">
                              {category.title}
                            </h3>
                          </div>
                        </div>

                        <ul className="mt-6 divide-y divide-[#07102F]/[0.06] border-t border-[#07102F]/[0.06]">
                          {category.items.map((item, rowIndex) => (
                            <PriceRow key={item.name} name={item.name} price={item.price} index={rowIndex} />
                          ))}
                        </ul>
                      </motion.article>
                    </GsapScrollReveal>
                  );
                })}
              </RevealGroup>

              <Reveal className="mt-8 text-center text-xs text-[#07102F]/35">
                Final pricing depends on scope, revisions and turnaround. Terms &amp; conditions apply.
              </Reveal>
            </div>

            <Divider variant="chevron" fill="#060A31" />
          </section>

          {/* ================= WEB MENU ================= */}
          <section id="web-menu" className="relative overflow-hidden bg-[var(--ink)]">
            <div className="relative mx-auto max-w-[1200px] px-5 py-24 md:px-8 md:py-32">
              <Reveal className="mx-auto max-w-[720px] text-center">
                <SectionLabel light>02 / THE WEB MENU</SectionLabel>
                <h2 className="mt-6 font-display text-[clamp(2.9rem,6vw,5.8rem)] font-bold leading-[0.85] tracking-[-0.07em]">
                  <GsapCharReveal as="span" text="BUILT TO WORK" stagger={0.018} />
                  <br />
                  <span className="gradient-text-hero font-editorial italic">and impress.</span>
                </h2>
                <p className="mx-auto mt-6 max-w-[500px] text-sm leading-7 text-white/40">
                  From a one-page landing site to a full corporate build, plus
                  the ongoing care that keeps it running.
                </p>
              </Reveal>

              <GsapScrollReveal direction="up" distance={190} className="mt-16">
                <motion.div initial={{ opacity: 0, y: 130, scale: .9, rotateX: 10 }} whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }} viewport={{ once: true, amount: .2 }} transition={{ type: "spring", stiffness: 95, damping: 17 }} className="overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] backdrop-blur-xl">
                  <TiltCard max={3} className="grid md:grid-cols-[1.4fr_1fr]">
                    <motion.div initial={{ opacity: 0, x: -100 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: .9, delay: .2, ease: [0.16, 1, .3, 1] }} className="p-7 md:border-r md:border-white/10 md:p-9">
                      <div className="flex items-center gap-3">
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--violet)]/15 text-[var(--violet)]">
                          <Globe size={18} />
                        </span>
                        <span className="label-mono text-[9px] uppercase tracking-[0.2em] text-white/40">
                          WEBSITE BUILDS
                        </span>
                      </div>

                      <ul className="mt-6 divide-y divide-white/[0.06] border-t border-white/[0.06]">
                        {websiteBuilds.map((item, rowIndex) => (
                          <PriceRow key={item.name} name={item.name} price={item.price} dark index={rowIndex} />
                        ))}
                      </ul>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, x: 100 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: .9, delay: .32, ease: [0.16, 1, .3, 1] }} className="border-t border-white/10 p-7 md:border-t-0 md:p-9">
                      <div className="flex items-center gap-3">
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--champagne)]/15 text-[var(--champagne)]">
                          <ArrowUpRight size={18} />
                        </span>
                        <span className="label-mono text-[9px] uppercase tracking-[0.2em] text-white/40">
                          ONGOING &amp; SEO
                        </span>
                      </div>

                      <ul className="mt-6 divide-y divide-white/[0.06] border-t border-white/[0.06]">
                        {websiteOngoing.map((item, rowIndex) => (
                          <PriceRow key={item.name} name={item.name} price={item.price} dark index={rowIndex} />
                        ))}
                      </ul>

                      <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                        <p className="text-sm leading-6 text-white/45">
                          Not sure which build fits your project?
                        </p>
                        <div className="mt-4">
                          <MagneticButton onClick={openBooking}>
                            Get a custom quote
                            <ArrowUpRight size={14} />
                          </MagneticButton>
                        </div>
                      </div>
                    </motion.div>
                  </TiltCard>
                </motion.div>
              </GsapScrollReveal>

              <Reveal className="mt-8 text-center text-xs text-white/25">
                Website pricing depends on page count, integrations and content readiness. Terms &amp; conditions apply.
              </Reveal>
            </div>
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
