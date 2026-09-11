import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Registering a plugin twice is a harmless no-op in GSAP, so it's safe for
// both this module and SiteChrome.jsx to register it independently of
// whichever one happens to load first.
gsap.registerPlugin(ScrollTrigger);

const reduceMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ------------------------------------------------------------------------ */
/*  GSAP CHAR REVEAL — splits text into masked, per-character spans that    */
/*  slide up into place with a stagger as the element scrolls into view.    */
/*  Usage: <GsapCharReveal as="span" text="next move." stagger={0.025} />   */
/* ------------------------------------------------------------------------ */

export function GsapCharReveal({ text = "", as: Tag = "span", className = "", stagger = 0.02 }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const chars = el.querySelectorAll("[data-char-inner]");

    if (reduceMotion()) {
      gsap.set(chars, { yPercent: 0, opacity: 1 });
      return undefined;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        chars,
        { yPercent: 115, opacity: 0, rotateZ: 4 },
        {
          yPercent: 0,
          opacity: 1,
          rotateZ: 0,
          duration: 0.85,
          ease: "power4.out",
          stagger,
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [text, stagger]);

  const words = text.split(" ");

  return (
    <Tag ref={ref} className={`inline-block ${className}`} aria-label={text}>
      <span aria-hidden="true">
        {words.map((word, wi) => (
          <span key={wi} className="inline-block whitespace-nowrap">
            {word.split("").map((char, ci) => (
              <span key={ci} className="inline-block overflow-hidden py-[0.06em] align-bottom">
                <span data-char-inner className="inline-block will-change-transform">
                  {char}
                </span>
              </span>
            ))}
            {wi < words.length - 1 ? "\u00A0" : ""}
          </span>
        ))}
      </span>
    </Tag>
  );
}

/* ------------------------------------------------------------------------ */
/*  GSAP MARQUEE — an infinitely-looping horizontal ticker. Duplicates its  */
/*  children once so the loop is seamless, pauses on hover.                */
/*  Usage: <GsapMarquee duration={30} direction={-1}>{items}</GsapMarquee>  */
/* ------------------------------------------------------------------------ */

export function GsapMarquee({ children, duration = 30, direction = 1, className = "" }) {
  const wrapRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    const wrap = wrapRef.current;
    if (!track || !wrap || reduceMotion()) return undefined;

    const ctx = gsap.context(() => {
      const tween = gsap.fromTo(
        track,
        { xPercent: direction === -1 ? -50 : 0 },
        { xPercent: direction === -1 ? 0 : -50, duration, ease: "none", repeat: -1 }
      );

      const pause = () => tween.pause();
      const resume = () => tween.play();
      wrap.addEventListener("mouseenter", pause);
      wrap.addEventListener("mouseleave", resume);

      return () => {
        wrap.removeEventListener("mouseenter", pause);
        wrap.removeEventListener("mouseleave", resume);
      };
    }, wrapRef);

    return () => ctx.revert();
  }, [duration, direction]);

  return (
    <div ref={wrapRef} className={`overflow-hidden ${className}`}>
      <div ref={trackRef} className="flex w-max items-center gap-10">
        <div className="flex shrink-0 items-center gap-10">{children}</div>
        <div className="flex shrink-0 items-center gap-10" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------ */
/*  GSAP HORIZONTAL SCROLL — pins the section and translates its track      */
/*  sideways as the visitor scrolls down, converting vertical scroll into   */
/*  horizontal motion. Falls back to plain native horizontal scrolling on   */
/*  touch devices and under reduced motion, matching the pattern already    */
/*  used by .journey-section elsewhere on the site.                        */
/*  Usage:                                                                  */
/*  <GsapHorizontalScroll trackClassName="gap-6 px-5" speed={0.9}>          */
/*    {cards}                                                               */
/*  </GsapHorizontalScroll>                                                 */
/* ------------------------------------------------------------------------ */

export function GsapHorizontalScroll({ children, trackClassName = "", speed = 1, className = "" }) {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  // Computed synchronously (before first paint) so the correct overflow
  // mode is already in place on first render — no flash of the wrong mode.
  const [nativeScroll] = useState(
    () =>
      reduceMotion() ||
      (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches)
  );

  useEffect(() => {
    if (nativeScroll) return undefined;
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return undefined;

    const ctx = gsap.context(() => {
      const distance = () => Math.max(0, track.scrollWidth - container.clientWidth);

      const tween = gsap.to(track, {
        // Always translate the FULL overflow distance so every card is
        // reachable — `speed` only paces how much vertical scroll that
        // costs (via `end` below), it must never shrink the travel itself
        // or the right-most content would stay permanently cut off.
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${Math.max(distance() / speed, 1)}`,
          scrub: 0.6,
          pin: true,
          invalidateOnRefresh: true,
        },
      });

      const onResize = () => ScrollTrigger.refresh();
      window.addEventListener("resize", onResize);
      // Layout (image loads, fonts) can change track width after mount.
      const settle = setTimeout(() => ScrollTrigger.refresh(), 300);

      return () => {
        window.removeEventListener("resize", onResize);
        clearTimeout(settle);
        tween.kill();
      };
    }, containerRef);

    return () => ctx.revert();
  }, [speed, nativeScroll]);

  return (
    <div
      ref={containerRef}
      className={`relative ${
        nativeScroll
          ? "overflow-x-auto [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          : "overflow-hidden"
      } ${className}`}
    >
      <div ref={trackRef} className={`flex w-max ${trackClassName}`}>
        {children}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------ */
/*  GSAP CLIP REVEAL — a big block of typography unclips into view (bottom  */
/*  to top) instead of just fading, for the huge hero headlines.            */
/*  Usage: <GsapClipReveal className="...">{headline}</GsapClipReveal>      */
/* ------------------------------------------------------------------------ */

export function GsapClipReveal({ children, className = "", as: Tag = "div" }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    if (reduceMotion()) {
      gsap.set(el, { clipPath: "inset(0% 0% 0% 0%)", opacity: 1, y: 0 });
      return undefined;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { clipPath: "inset(0% 0% 100% 0%)", opacity: 0.4, y: 24 },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: el,
            start: "top 92%",
            toggleActions: "play none none none",
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <Tag ref={ref} className={className} style={{ clipPath: "inset(0% 0% 100% 0%)", opacity: 0.4 }}>
      {children}
    </Tag>
  );
}

/* Scroll-scrubbed entrance. Unlike a short one-time reveal, this stays tied
   to the visitor's wheel movement so the motion remains obvious and tactile. */
export function GsapScrollReveal({ children, className = "", as: Tag = "div", direction = "up", index = 0, distance = 150 }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (reduceMotion()) {
      gsap.set(el, { clearProps: "transform,filter,opacity" });
      return undefined;
    }

    const horizontal = direction === "left" ? -distance : direction === "right" ? distance : 0;
    const vertical = direction === "up" ? distance * .72 : distance * .22;
    const rotation = direction === "left" ? -5 : direction === "right" ? 5 : 0;

    const ctx = gsap.context(() => {
      gsap.fromTo(el,
        { x: horizontal, y: vertical, rotateZ: rotation, rotateY: horizontal ? rotation * 2.2 : 0, scale: .86, opacity: 0, filter: "blur(12px)" },
        {
          x: 0, y: 0, rotateZ: 0, rotateY: 0, scale: 1, opacity: 1, filter: "blur(0px)", ease: "none",
          scrollTrigger: {
            trigger: el,
            start: `top ${96 - Math.min(index % 3, 2) * 3}%`,
            end: "top 58%",
            scrub: .65,
            invalidateOnRefresh: true,
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [direction, index, distance]);

  return <Tag ref={ref} className={className}>{children}</Tag>;
}
