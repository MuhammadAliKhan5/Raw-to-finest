export default function GlobalStyles() {
  return (
    <style>{`
          :root {
            --ink: #030306;
            --plum: #12091B;
            --violet: #7C3AED;
            --orchid: #A855F7;
            --champagne: #E9D5FF;
            --cream: #07040A;
          }

          html {
            scroll-behavior: smooth;
            background: var(--ink);
            font-family: "Poppins", ui-sans-serif, system-ui, sans-serif;
          }

          body.raw-to-finess-page {
            margin: 0;
            background: var(--ink);
          }

          *, *::before, *::after, body, button, input, textarea, select { font-family: "Poppins", sans-serif !important; }
          .font-body { font-family: "Poppins", sans-serif !important; }
          .font-display { font-family: "Poppins", sans-serif !important; }
          .font-editorial { font-family: "Poppins", sans-serif !important; font-style: italic; }
          .label-mono {
            font-family: "Poppins", sans-serif !important;
            font-size: clamp(9px, .68vw, 11px);
            font-weight: 600;
            line-height: 1.45;
          }

          body.raw-to-finess-page::-webkit-scrollbar { width: 8px; }
          body.raw-to-finess-page::-webkit-scrollbar-track { background: var(--ink); }
          body.raw-to-finess-page::-webkit-scrollbar-thumb {
            border-radius: 999px;
            background: linear-gradient(180deg, var(--orchid), var(--violet));
          }

          ::selection { background: var(--orchid); color: #07102F; }

          .custom-cursor-dot, .custom-cursor-ring {
            position: fixed; top: 0; left: 0; pointer-events: none; z-index: 9999;
            border-radius: 999px; transform: translate3d(-100px, -100px, 0);
          }
          .custom-cursor-dot {
            width: 8px; height: 8px; margin-left: -4px; margin-top: -4px;
            background: #fff; box-shadow: 0 0 8px #fff, 0 0 28px rgba(110,231,255,.95);
          }
          .custom-cursor-ring {
            width: 52px; height: 52px; margin-left: -26px; margin-top: -26px;
            border: 1px solid rgba(46,175,255,.72); box-shadow: inset 0 0 24px rgba(23,104,255,.1), 0 0 24px rgba(23,104,255,.2);
            background: radial-gradient(circle, transparent 56%, rgba(23,104,255,.12) 58%, transparent 72%);
            transition: width .35s cubic-bezier(.2,.8,.2,1), height .35s cubic-bezier(.2,.8,.2,1),
              margin .35s cubic-bezier(.2,.8,.2,1), background .35s ease, border-color .35s ease;
          }
          .custom-cursor-ring::before, .custom-cursor-ring::after { content: ""; position: absolute; left: 50%; top: 50%; opacity: .72; }
          .custom-cursor-ring::before { width: 72px; height: 1px; transform: translate(-50%,-50%); background: linear-gradient(90deg,transparent,var(--champagne),transparent); }
          .custom-cursor-ring::after { width: 1px; height: 72px; transform: translate(-50%,-50%); background: linear-gradient(transparent,var(--orchid),transparent); }
          .custom-cursor-star { position: absolute; left: 50%; top: 50%; color: var(--champagne); font-size: 10px; transform: translate(-50%,-50%); filter: drop-shadow(0 0 8px var(--champagne)); animation: cursorStar 2.4s linear infinite; }
          .custom-cursor-ring.cursor-hover {
            width: 82px; height: 82px; margin-left: -41px; margin-top: -41px;
            background: rgba(23,104,255,.16); border-color: rgba(110,231,255,.95);
          }
          @media (pointer: coarse) { .custom-cursor-dot, .custom-cursor-ring { display: none; } }
          @media (prefers-reduced-motion: reduce) { .custom-cursor-dot, .custom-cursor-ring { display: none; } }

          .hero-section {
            background:
              radial-gradient(circle at 72% 28%, rgba(36,140,255,.24), transparent 36%),
              radial-gradient(circle at 12% 78%, rgba(46,175,255,.13), transparent 32%),
              linear-gradient(145deg, #050a28 0%, #0d1760 52%, #07133f 100%);
          }
          .custom-cursor-ring.cursor-hover .custom-cursor-star { font-size: 17px; }
          section[id] { scroll-margin-top: 112px; }
          .section-seam {
            height: 34px; transform: translateY(100%); opacity: .98;
          }
          .section-seam > span {
            position: absolute; left: 5%; right: 5%; top: 0; height: 1px;
            background: linear-gradient(90deg, transparent, rgba(110,231,255,.3), rgba(46,175,255,.36), transparent);
          }
          .section-seam-diagonal, .section-seam-diagonalRev,
          .section-seam-zigzag, .section-seam-chevron { height: 26px; }
          .hero-orb {
            position: absolute; pointer-events: none; border-radius: 999px;
            filter: blur(90px); mix-blend-mode: screen; animation: orbFloat 12s ease-in-out infinite alternate;
          }
          .hero-orb-a { width: 560px; height: 560px; right: -180px; top: 90px; background: rgba(23,104,255,.24); }
          .hero-orb-b { width: 480px; height: 480px; left: -220px; bottom: -120px; background: rgba(46,175,255,.14); animation-duration: 16s; animation-direction: alternate-reverse; }
          .hero-orb-c { width: 260px; height: 260px; right: 35%; top: 18%; background: rgba(110,231,255,.1); animation-duration: 9s; }

          .particle { box-shadow: 0 0 14px currentColor; animation: particleDrift 6s ease-in-out infinite alternate; }

          .header-shell { animation: headerDrop .9s cubic-bezier(.16,1,.3,1) both; }
          .header-sheen {
            background: linear-gradient(180deg, rgba(255,255,255,.05), transparent 55%);
            mix-blend-mode: overlay;
          }

          .method-grid {
            background-image: linear-gradient(rgba(23,104,255,.07) 1px, transparent 1px), linear-gradient(90deg, rgba(23,104,255,.07) 1px, transparent 1px);
            background-size: 52px 52px;
            mask-image: radial-gradient(ellipse at 30% 20%, black, transparent 65%);
          }
          .method-grid-overlay {
            background-image: linear-gradient(rgba(255,255,255,.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.07) 1px, transparent 1px);
            background-size: 26px 26px;
          }
          .method-flow-line {
            height: 1px;
            background: linear-gradient(90deg, transparent, var(--violet), var(--champagne), transparent);
            opacity: .3;
          }

          .nav-pill-link::after {
            content: ""; position: absolute; left: 16px; right: 16px; bottom: 4px; height: 1px;
            background: var(--champagne); transform: scaleX(0); transform-origin: left;
            transition: transform .35s cubic-bezier(.16,1,.3,1);
          }
          .nav-pill-link:hover { background: rgba(255,255,255,.05); }
          .nav-pill-link:hover::after { transform: scaleX(1); }

          .gradient-text-hero {
            background: linear-gradient(100deg, #edfaff 0%, var(--orchid) 32%, var(--violet) 60%, var(--champagne) 100%);
            background-size: 220% auto;
            -webkit-background-clip: text; background-clip: text; color: transparent;
            animation: shine 7s ease-in-out infinite;
          }
          .gradient-text-gold {
            background: linear-gradient(100deg, var(--champagne), #a8f2ff, var(--champagne));
            -webkit-background-clip: text; background-clip: text; color: transparent;
          }

          .hero-star { color: var(--champagne); animation: starPulse 2.5s ease-in-out infinite; }

          /* RAW → FINEST pinned intro (LandingPage). Track is tall so there is
             room to scrub through; the stage inside is sticky so it holds the
             viewport while scrollYProgress (read in JS) drives every transform. */
          .raw-finest-pin { height: 180vh; }
          .raw-finest-stage { position: sticky; top: 0; height: 100vh; padding-top: 108px; }
          .raw-finest-idle { animation: idleBreathe 9s ease-in-out infinite alternate; }
          .pov-story-track { height: 160vh; }
          .pov-story-stage { position: sticky; top: 0; height: 100vh; }
          .service-story-track { height: 390vh; }
          .service-story-stage { position: sticky; top: 0; height: 100vh; }
          @keyframes idleBreathe {
            0% { transform: scale(1) translate3d(0,0,0); }
            100% { transform: scale(1.045) translate3d(-1%,-1%,0); }
          }
          @media (max-width: 767px) {
            .raw-finest-pin { height: 150vh; }
            .raw-finest-stage { padding-top: 84px; }
            .pov-story-track { height: 145vh; }
            .service-story-track { height: 360vh; }
            .hero-orb { filter: blur(60px); }
            .particle:nth-child(2n) { display: none; }
            .ambient-blob-3, .ambient-blob-4, .ambient-sheen { display: none; }
            .ambient-blob { filter: blur(72px); }
          }
          @media (prefers-reduced-motion: reduce) {
            .raw-finest-pin { height: auto; }
            .raw-finest-stage { position: relative; height: 92vh; padding-top: 84px; }
            .raw-finest-idle { animation: none; }
          }

          /* Raw → finest side rail (LandingPage only). Stays out of the way of
             short viewports where a fixed left-edge element could crowd content. */
          @media (max-height: 640px) {
            .raw-finest-rail { display: none !important; }
          }

          /* Ambient background mesh — sits behind every page (see AmbientBackground
             in SiteChrome), a slow-drifting layer of colour so no section ever
             reads as a flat, static block. */
          .ambient-mesh {
            position: fixed; inset: 0; z-index: 0; pointer-events: none; overflow: hidden;
          }
          .ambient-hero-extension {
            position: absolute; inset: 0; z-index: 2; overflow: hidden; opacity: 0;
            transition: opacity .9s ease;
          }
          body.r2f-landing-page .ambient-hero-extension { opacity: 1; }
          body.r2f-landing-page .r2f-landing-shell > footer { background: transparent !important; }
          .landing-ambient-grid {
            position: absolute; inset: -8%; z-index: 0; opacity: .2;
            background-image:
              linear-gradient(rgba(216,180,254,.12) 1px,transparent 1px),
              linear-gradient(90deg,rgba(216,180,254,.095) 1px,transparent 1px);
            background-size: 68px 68px;
            -webkit-mask-image: radial-gradient(ellipse 78% 72% at 50% 46%,black,transparent 88%);
            mask-image: radial-gradient(ellipse 78% 72% at 50% 46%,black,transparent 88%);
            animation: landingGridDrift 18s linear infinite;
          }
          .landing-aurora {
            position: absolute; z-index: 0; display: block; border-radius: 999px;
            filter: blur(82px); mix-blend-mode: screen; will-change: transform;
            animation: landingAuroraFloat 12s ease-in-out infinite alternate;
          }
          .landing-aurora-a { width: 62vw; height: 46vh; left: 18vw; top: -16vh; background: rgba(124,58,237,.26); }
          .landing-aurora-b { width: 42vw; height: 56vh; right: -13vw; top: 29vh; background: rgba(168,85,247,.2); animation-duration: 17s; animation-direction: alternate-reverse; }
          .landing-aurora-c { width: 46vw; height: 44vh; left: -16vw; bottom: -11vh; background: rgba(76,29,149,.24); animation-duration: 21s; }
          .landing-light-ribbon {
            position: absolute; z-index: 1; display: block; width: 112vw; height: 12vh;
            border-radius: 50%; filter: blur(34px); mix-blend-mode: screen; opacity: .42;
          }
          .landing-light-ribbon-a { left: -28vw; top: 24%; background: linear-gradient(90deg,transparent,rgba(124,58,237,.26),rgba(216,180,254,.18),transparent); animation: landingRibbonA 11s ease-in-out infinite alternate; }
          .landing-light-ribbon-b { right: -34vw; bottom: 15%; background: linear-gradient(90deg,transparent,rgba(34,211,238,.12),rgba(168,85,247,.28),transparent); animation: landingRibbonB 14s ease-in-out infinite alternate-reverse; }
          .landing-glass-shard {
            position: absolute; z-index: 2; display: block; border: 1px solid rgba(255,255,255,.16);
            border-radius: 999px; background: linear-gradient(135deg,rgba(255,255,255,.065),rgba(124,58,237,.025),rgba(255,255,255,.018));
            -webkit-backdrop-filter: blur(16px) saturate(165%); backdrop-filter: blur(16px) saturate(165%);
            box-shadow: inset 0 1px rgba(255,255,255,.13),0 18px 55px rgba(0,0,0,.14),0 0 35px rgba(124,58,237,.07);
            will-change: transform; animation: landingShardFloat 13s ease-in-out infinite alternate;
          }
          .landing-glass-shard-a { width: 270px; height: 82px; left: -92px; top: 17%; transform: rotate(54deg); }
          .landing-glass-shard-b { width: 225px; height: 70px; right: -74px; top: 12%; transform: rotate(-51deg); animation-duration: 18s; animation-direction: alternate-reverse; }
          .landing-glass-shard-c { width: 190px; height: 58px; left: 9%; bottom: 12%; transform: rotate(-24deg); animation-duration: 16s; }
          .landing-glass-shard-d { width: 180px; height: 55px; right: 8%; bottom: 24%; transform: rotate(31deg); animation-duration: 20s; animation-direction: alternate-reverse; }
          .landing-dot-field { position: absolute; inset: 0; z-index: 3; }
          .landing-ambient-dot {
            position: absolute; display: block; border-radius: 999px; background: #c084fc;
            box-shadow: 0 0 7px rgba(192,132,252,.95),0 0 18px rgba(124,58,237,.62);
            animation-name: landingDotFloat; animation-timing-function: ease-in-out; animation-iteration-count: infinite; animation-direction: alternate;
          }
          .landing-ambient-dot.is-bright {
            background: #fff; box-shadow: 0 0 8px #fff,0 0 22px #c084fc,0 0 38px rgba(124,58,237,.62);
          }
          @keyframes landingGridDrift { to { transform: translate3d(68px,68px,0); } }
          @keyframes landingAuroraFloat { from { transform: translate3d(-4%,-3%,0) scale(.88); opacity: .5; } to { transform: translate3d(7%,6%,0) scale(1.14); opacity: .94; } }
          @keyframes landingRibbonA { from { transform: translate3d(-9vw,-7vh,0) rotate(-8deg) scale(.9); } to { transform: translate3d(18vw,18vh,0) rotate(8deg) scale(1.18); } }
          @keyframes landingRibbonB { from { transform: translate3d(12vw,8vh,0) rotate(10deg) scale(.92); } to { transform: translate3d(-20vw,-20vh,0) rotate(-7deg) scale(1.2); } }
          @keyframes landingShardFloat { from { translate: -10px -16px; scale: .94; opacity: .34; } to { translate: 24px 25px; scale: 1.08; opacity: .7; } }
          @keyframes landingDotFloat { 0% { transform: translate3d(0,14px,0) scale(.65); opacity: .16; } 45% { opacity: .92; } 100% { transform: translate3d(var(--dot-drift),-38px,0) scale(1.3); opacity: .26; } }
          .shiny-surface { position: fixed; inset: 0; z-index: 2; overflow: hidden; pointer-events: none; mix-blend-mode: normal; opacity: .56; }
          .raw-stage { position: absolute; inset: 0; z-index: 5; background-image: repeating-linear-gradient(103deg,rgba(23,104,255,.11) 0 1px,transparent 1px 17px),repeating-linear-gradient(7deg,rgba(5,16,52,.16) 0 2px,transparent 2px 31px),url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150'%3E%3Cfilter id='r'%3E%3CfeTurbulence baseFrequency='.55' numOctaves='4' seed='8'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' fill='%237c3aed' filter='url(%23r)' opacity='.2'/%3E%3C/svg%3E"); mix-blend-mode: multiply; animation: rawJitter .32s steps(2) infinite; }
          .finest-stage { position: absolute; left: -20vmax; top: -45vmax; width: 140vmax; height: 140vmax; border-radius: 50%; background: conic-gradient(from 45deg,transparent 0 12%,rgba(16,76,210,.38) 22%,transparent 34%,rgba(23,104,255,.24) 48%,transparent 61%,rgba(46,175,255,.34) 76%,transparent 90%); filter: blur(48px) saturate(1.25); transform-origin: center; }
          .finest-stage::after { content: ""; position: absolute; inset: 18%; border-radius: 50%; background: radial-gradient(circle,rgba(23,104,255,.3),rgba(16,76,210,.16) 30%,transparent 67%); animation: finestPulse 3.8s ease-in-out infinite alternate; }
          .shiny-ribbon { position: absolute; width: 125vw; height: 28vh; border-radius: 50%; filter: blur(42px); will-change: transform; }
          .shiny-ribbon-a { left: -30vw; top: 12vh; background: linear-gradient(90deg,transparent,rgba(23,104,255,.38),rgba(46,175,255,.3),transparent); animation: ribbonFlow 6s ease-in-out infinite alternate; }
          .shiny-ribbon-b { right: -35vw; bottom: 5vh; background: linear-gradient(90deg,transparent,rgba(16,76,210,.3),rgba(23,104,255,.38),transparent); animation: ribbonFlowB 7.5s ease-in-out infinite alternate; }
          .shiny-ribbon-c { left: -15vw; top: 45vh; height: 15vh; background: linear-gradient(90deg,transparent,rgba(16,76,210,.22),rgba(46,175,255,.3),transparent); animation: ribbonFlow 4.8s ease-in-out -2s infinite alternate-reverse; }
          .shiny-beam { position: absolute; left: -35%; top: -25%; width: 32%; height: 160%; background: linear-gradient(90deg,transparent,rgba(46,175,255,.2),rgba(23,104,255,.24),transparent); filter: blur(18px); transform: rotate(24deg); animation: beamSweep 6.5s ease-in-out infinite; }
          .shiny-glint { position: absolute; width: 7px; height: 7px; border-radius: 50%; background: var(--orchid); box-shadow: 0 0 14px var(--orchid),0 0 35px var(--violet); animation: glintTravel 4s ease-in-out infinite; }
          .shiny-glint-a { left: 18%; top: 25%; }
          .shiny-glint-b { right: 15%; top: 68%; animation-delay: -4s; }
          .finish-meter { position: fixed; left: 18px; top: 50%; z-index: 8; display: flex; flex-direction: column; align-items: center; gap: 9px; transform: translateY(-50%); color: rgba(46,175,255,.72); font: 700 6px/1 "Poppins",sans-serif; letter-spacing: .16em; text-shadow: 0 1px 8px #060A31; }
          .finish-meter i { position: relative; width: 1px; height: 102px; background: rgba(23,104,255,.28); }
          .finish-meter b { position: absolute; inset: 0; display: block; transform-origin: top; background: linear-gradient(var(--orchid),var(--champagne)); box-shadow: 0 0 12px var(--orchid); }
          .finish-meter em { position: absolute; left: -3px; top: 0; width: 7px; height: 7px; border-radius: 50%; background: var(--champagne); box-shadow: 0 0 12px var(--champagne),0 0 20px var(--violet); }
          .ambient-blob {
            position: absolute; border-radius: 999px; filter: blur(100px);
            mix-blend-mode: screen; animation: meshDrift 18s ease-in-out infinite alternate;
          }
          .ambient-blob-1 { width: 58vw; height: 58vw; left: -14vw; top: -16vw; background: radial-gradient(circle, rgba(23,104,255,.68), transparent 70%); }
          .ambient-blob-2 { width: 50vw; height: 50vw; right: -12vw; top: 36vw; background: radial-gradient(circle, rgba(46,175,255,.52), transparent 70%); animation-duration: 23s; animation-direction: alternate-reverse; }
          .ambient-blob-3 { width: 42vw; height: 42vw; left: 22vw; bottom: -14vw; background: radial-gradient(circle, rgba(110,231,255,.4), transparent 70%); animation-duration: 15s; }
          .ambient-blob-4 { width: 36vw; height: 36vw; right: 16vw; bottom: 52vh; background: radial-gradient(circle, rgba(23,104,255,.46), transparent 70%); animation-duration: 26s; animation-direction: alternate-reverse; }
          .ambient-sheen {
            position: absolute; inset: -40%; opacity: .16; mix-blend-mode: soft-light;
            background: conic-gradient(from 0deg, transparent, var(--violet), transparent 30%, var(--champagne), transparent 55%, var(--orchid), transparent 80%);
            animation: sheenSpin 40s linear infinite;
          }
          @keyframes meshDrift {
            0% { transform: translate3d(-4%, -3%, 0) scale(1); }
            50% { transform: translate3d(6%, 4%, 0) scale(1.18); }
            100% { transform: translate3d(-3%, 5%, 0) scale(1); }
          }
          @keyframes sheenSpin { to { transform: rotate(360deg); } }
          @keyframes ribbonFlow { from { transform: translate3d(-10%,-12%,0) rotate(-8deg) scale(.85); } to { transform: translate3d(18%,42%,0) rotate(7deg) scale(1.18); } }
          @keyframes ribbonFlowB { from { transform: translate3d(12%,12%,0) rotate(9deg) scale(1); } to { transform: translate3d(-20%,-44%,0) rotate(-8deg) scale(1.25); } }
          @keyframes beamSweep { 0%,15% { transform: translateX(-20vw) rotate(24deg); opacity: 0; } 42% { opacity: 1; } 75%,100% { transform: translateX(170vw) rotate(24deg); opacity: 0; } }
          @keyframes glintTravel { 0%,100% { transform: translate3d(0,0,0) scale(.5); opacity: .1; } 50% { transform: translate3d(24vw,-12vh,0) scale(1.5); opacity: .85; } }
          @keyframes rawJitter { 0% { transform: translate3d(-1%,1%,0); } 50% { transform: translate3d(1%,-1%,0); } 100% { transform: translate3d(0,1%,0); } }
          @keyframes finestPulse { from { transform: scale(.72); opacity: .25; } to { transform: scale(1.24); opacity: .8; } }
          @keyframes cursorStar { to { transform: translate(-50%,-50%) rotate(360deg); } }
          @media (max-width: 767px) { .finish-meter { display: none; } .shiny-surface { opacity: .7; } }
          @media (prefers-reduced-motion: reduce) { .ambient-blob, .ambient-sheen { animation: none; } }

          /* Subtle living texture on the grain overlay — a slow diagonal   */
          /* drift so the noise never reads as a static, printed-on layer.  */
          .grain-anim { animation: grainDrift 9s steps(6) infinite; }
          @keyframes grainDrift {
            0% { transform: translate3d(0, 0, 0); }
            20% { transform: translate3d(-2%, 2%, 0); }
            40% { transform: translate3d(2%, -1%, 0); }
            60% { transform: translate3d(-1%, -2%, 0); }
            80% { transform: translate3d(1%, 2%, 0); }
            100% { transform: translate3d(0, 0, 0); }
          }
          @media (prefers-reduced-motion: reduce) { .grain-anim { animation: none; } }

          .hero-image-shell { isolation: isolate; }
          .hero-image-shell::before {
            content: ""; position: absolute; z-index: 4; inset: 0; pointer-events: none;
            background: linear-gradient(110deg, transparent 30%, rgba(255,255,255,.13) 45%, transparent 58%);
            transform: translateX(-120%); animation: shimmer 7s 1.4s ease-in-out infinite;
          }
          .hero-image { transform: scale(1.05); filter: saturate(.88) contrast(1.05); transition: transform 1s cubic-bezier(.2,.8,.2,1), filter .8s ease; }
          .hero-image-shell:hover .hero-image { transform: scale(1.11); filter: saturate(1.05) contrast(1.06); }

          .marquee-track { width: max-content; animation: marquee 28s linear infinite; }
          .marquee-shell:hover .marquee-track { animation-play-state: paused; }

          /* buttons */
          .magnetic-btn { position: relative; overflow: hidden; }
          .btn-shine {
            position: absolute; inset: 0; background: linear-gradient(115deg, transparent 40%, rgba(255,255,255,.35) 50%, transparent 60%);
            transform: translateX(-120%); transition: transform .6s ease;
          }
          .magnetic-btn:hover .btn-shine { transform: translateX(120%); }
          .btn-solid { background: linear-gradient(100deg, var(--violet), #318DFF); color: #fff; box-shadow: 0 10px 30px rgba(23,104,255,.28); }
          .btn-solid:hover { background: linear-gradient(100deg, var(--champagne), #81eaff); color: #07102F; box-shadow: 0 10px 34px rgba(110,231,255,.32); }
          .btn-ghost { border: 1px solid rgba(255,255,255,.16); color: #fff; background: rgba(255,255,255,.03); }
          .btn-ghost:hover { border-color: var(--champagne); color: var(--champagne); }
          .btn-light { background: #fff; color: #07102F; }
          .btn-light:hover { background: var(--champagne); }

          .reveal-up, .reveal-scale { opacity: 0; will-change: transform, opacity; }
          .reveal-up { transform: translateY(45px); }
          .reveal-scale { transform: translateY(28px) scale(.965); }
          .reveal-up.is-visible, .reveal-scale.is-visible {
            opacity: 1; transform: translateY(0) scale(1);
            transition: opacity .9s cubic-bezier(.16,1,.3,1), transform 1s cubic-bezier(.16,1,.3,1);
          }
          .reveal-delay-1 { transition-delay: .08s; }
          .reveal-delay-2 { transition-delay: .16s; }
          .reveal-delay-3 { transition-delay: .24s; }

          .program-card, .bento-card, .journey-card, .coach-card { transform-style: preserve-3d; }
          .program-card { transition: transform .7s cubic-bezier(.16,1,.3,1), box-shadow .7s cubic-bezier(.16,1,.3,1), border-color .5s ease; }
          .program-card:hover { transform: translateY(-9px) rotateX(1deg); box-shadow: 0 35px 100px rgba(23,104,255,.2); border-color: rgba(46,175,255,.3); }

          .bento-card { transition: transform .65s cubic-bezier(.16,1,.3,1), background .4s ease, border-color .4s ease, box-shadow .5s ease; }
          .bento-card:hover { transform: translateY(-7px) rotateX(1deg) rotateY(-.5deg); background: rgba(255,255,255,.85); border-color: rgba(23,104,255,.28); box-shadow: 0 25px 70px rgba(23,104,255,.12); }
          .bento-card:hover .bento-glow { opacity: 1; transform: scale(1.2); }

          .coach-card { transition: transform .7s cubic-bezier(.16,1,.3,1); }
          .coach-card:hover { transform: translateY(-9px); }

          .journey-section { height: 205vh; }
          .journey-section .journey-track { transform: translateX(0); animation: journeyDrift 6.5s ease-in-out infinite alternate; }
          .journey-card { transition: transform .65s cubic-bezier(.16,1,.3,1), border-color .4s ease, background .4s ease; }
          .journey-card:hover { transform: translateY(-7px); border-color: rgba(46,175,255,.35); background: linear-gradient(135deg, rgba(255,255,255,.09), rgba(255,255,255,.035)); }
          .journey-grid {
            background-image: linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px);
            background-size: 45px 45px; mask-image: radial-gradient(circle at center, black, transparent 78%);
          }

          .method-photo, .results-photo { position: relative; }
          .method-photo::after, .results-photo::after {
            content: ""; position: absolute; inset: 0; pointer-events: none;
            background: linear-gradient(135deg, rgba(23,104,255,.22), transparent 42%, rgba(110,231,255,.1));
          }

          .impact-noise { opacity: .2; background-image: radial-gradient(circle at 20% 20%, white 0 1px, transparent 1px); background-size: 24px 24px; }

          .testimonial-text { animation: testimonialIn .55s cubic-bezier(.16,1,.3,1) both; }

          .cta-orb { animation: orbFloat 13s ease-in-out infinite alternate; }
          .footer-glow { animation: orbFloat 14s ease-in-out infinite alternate-reverse; }
          .footer-glow-gold { animation: orbFloat 17s ease-in-out infinite alternate; }

          .footer-grid {
            background-image: linear-gradient(rgba(255,255,255,.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.025) 1px, transparent 1px);
            background-size: 60px 60px;
            mask-image: radial-gradient(ellipse at 50% 0%, black, transparent 70%);
          }
          .footer-link { position: relative; width: fit-content; }
          .footer-link::after {
            content: ""; position: absolute; left: 0; bottom: -5px; width: 0; height: 1px;
            background: var(--champagne); transition: width .35s ease;
          }
          .footer-link:hover::after { width: 100%; }

          .sticky-cta { animation: stickyIn .9s .7s cubic-bezier(.16,1,.3,1) both; }
          .sticky-cta-inner { box-shadow: 0 20px 70px rgba(0,0,0,.45), inset 0 1px 0 rgba(255,255,255,.06); }
          .sticky-shine { animation: stickyShine 5.5s 2s ease-in-out infinite; }

          .corner-box { animation: cornerPulse 2.6s ease-in-out infinite; cursor: pointer; }
          .corner-popup { animation: none; }
          .corner-popup-glow { animation: orbFloat 8s ease-in-out infinite alternate; }

          .booking-backdrop { animation: backdropIn .3s ease both; }
          .booking-backdrop > div { animation: modalIn .55s cubic-bezier(.16,1,.3,1) both; }
          .booking-input::placeholder { color: rgba(24,13,36,.25); }
          .success-ring { animation: successPop .65s cubic-bezier(.16,1,.3,1) both; }

          @media (max-width: 767px) {
            .journey-section { height: auto; padding: 6rem 0 7rem; }
            .journey-section .sticky { position: relative; min-height: auto; }
            .journey-section .journey-track { overflow-x: auto; padding-bottom: 12px; animation: none; scrollbar-width: none; }
            .journey-section .journey-track::-webkit-scrollbar { display: none; }
            .journey-card { min-width: 86vw; }
            .sticky-cta { bottom: 10px; }
          }

          @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-33.3333%); } }
          @keyframes shimmer { 0%, 45% { transform: translateX(-120%); } 75%, 100% { transform: translateX(120%); } }
          @keyframes shine { 0%, 100% { background-position: 0% center; } 50% { background-position: 100% center; } }
          @keyframes particleDrift { 0% { transform: translate3d(0,0,0); opacity: .12; } 50% { opacity: .85; } 100% { transform: translate3d(18px,-28px,0); opacity: .2; } }
          @keyframes orbFloat { 0% { transform: translate3d(-18px,0,0) scale(.96); } 50% { transform: translate3d(30px,-24px,0) scale(1.05); } 100% { transform: translate3d(-4px,28px,0) scale(1); } }
          @keyframes starPulse { 0%, 100% { transform: rotate(0deg) scale(1); opacity: .8; } 50% { transform: rotate(20deg) scale(1.2); opacity: 1; } }
          @keyframes headerDrop { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes journeyDrift { 0% { transform: translateX(0); } 100% { transform: translateX(-14%); } }
          @keyframes testimonialIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes stickyIn { from { opacity: 0; transform: translateY(25px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes stickyShine { 0%, 65% { transform: translateX(0); } 82%, 100% { transform: translateX(430%); } }
          @keyframes backdropIn { from { opacity: 0; } to { opacity: 1; } }
          @keyframes modalIn { from { opacity: 0; transform: translateY(28px) scale(.975); } to { opacity: 1; transform: translateY(0) scale(1); } }
          @keyframes successPop { 0% { opacity: 0; transform: scale(.6) rotate(-15deg); } 70% { transform: scale(1.08) rotate(2deg); } 100% { opacity: 1; transform: scale(1) rotate(0); } }
          @keyframes cornerPulse { 0%, 100% { box-shadow: 0 10px 40px rgba(23,104,255,.35), 0 0 0 0 rgba(110,231,255,.35); } 50% { box-shadow: 0 10px 40px rgba(23,104,255,.5), 0 0 0 10px rgba(110,231,255,0); } }

          /* Cursor-reactive spotlight glow — used with useSpotlight() */
          .spotlight-card { position: relative; isolation: isolate; }
          .spotlight-card::before {
            content: ""; position: absolute; inset: 0; z-index: 0; opacity: 0;
            border-radius: inherit; pointer-events: none;
            background: radial-gradient(280px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(46,175,255,.16), transparent 65%);
            transition: opacity .4s ease;
          }
          .spotlight-card:hover::before { opacity: 1; }
          .spotlight-card > * { position: relative; z-index: 1; }

          /* Generic premium hover utilities, reused across every page */
          .hover-lift { transition: transform .5s cubic-bezier(.16,1,.3,1), box-shadow .5s cubic-bezier(.16,1,.3,1), border-color .4s ease; }
          .hover-lift:hover { transform: translateY(-6px); box-shadow: 0 30px 80px rgba(23,104,255,.18); }

          .underline-sweep { position: relative; width: fit-content; }
          .underline-sweep::after {
            content: ""; position: absolute; left: 0; bottom: -3px; width: 100%; height: 1px;
            background: linear-gradient(90deg, var(--orchid), var(--champagne));
            transform: scaleX(0); transform-origin: right; transition: transform .45s cubic-bezier(.16,1,.3,1);
          }
          .underline-sweep:hover::after { transform: scaleX(1); transform-origin: left; }

          .media-hover { overflow: hidden; }
          .media-hover img { transition: transform 1.1s cubic-bezier(.16,1,.3,1), filter .8s ease; }
          .media-hover:hover img { transform: scale(1.08); filter: saturate(1.08) contrast(1.03); }

          /* RAW → FINESSE hover motif, reused on every image grid across the
             site: idle state reads desaturated/"raw", hover resolves to full
             colour/"finessed" — the same language as the homepage's pinned
             scroll intro, applied consistently wherever a card is browsable. */
          .media-raw { overflow: hidden; }
          .media-raw img, .media-raw video {
            filter: grayscale(0.85) contrast(1.06) saturate(0.9);
            transition: transform 1s cubic-bezier(.16,1,.3,1), filter .8s cubic-bezier(.16,1,.3,1);
          }
          .media-raw:hover img, .media-raw:hover video {
            transform: scale(1.07);
            filter: grayscale(0) contrast(1.02) saturate(1.08);
          }
          @media (prefers-reduced-motion: reduce) {
            .media-raw img, .media-raw video { transition: none; }
          }

          /* Headings share Poppins with the rest of the site for one consistent voice. */
          h1, h2, h3, h4 { letter-spacing: -0.02em; }

          /* Lenis smooth-scroll compatibility */
          html.lenis, html.lenis body { height: auto; }
          .lenis.lenis-smooth { scroll-behavior: auto !important; }
          .lenis.lenis-stopped { overflow: hidden; }

          /* Pinterest-inspired digital circuit theme */
          .circuit-background {
            background:
              radial-gradient(ellipse at 48% 108%, rgba(35, 112, 255, .48), transparent 46%),
              radial-gradient(circle at 82% 14%, rgba(34, 59, 255, .34), transparent 38%),
              radial-gradient(circle at 12% 22%, rgba(26, 72, 221, .2), transparent 32%),
              linear-gradient(145deg, #111765 0%, #10165d 48%, #090e44 100%);
          }
          .circuit-depth {
            position: absolute; inset: -12%; opacity: .2;
            background-image:
              linear-gradient(rgba(56, 106, 255, .2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(56, 106, 255, .2) 1px, transparent 1px);
            background-size: 64px 64px;
            mask-image: radial-gradient(ellipse at center, black 18%, transparent 88%);
            animation: circuitGridMove 9s linear infinite;
          }
          .circuit-halo {
            position: absolute; left: 8%; right: 8%; bottom: -28%; height: 60%;
            border-radius: 50%; background: rgba(42, 101, 255, .25); filter: blur(100px);
            animation: circuitBreathe 8s ease-in-out infinite alternate;
          }
          .circuit-trace {
            --trace-direction: 1;
            position: absolute; display: block; opacity: .74;
            border-top: 2px solid rgba(34, 116, 255, .98);
            border-right: 2px solid rgba(38, 132, 255, .96);
            border-radius: 0 2px 0 0;
            box-shadow: inset -1px 1px 0 rgba(105, 218, 255, .42);
            filter: drop-shadow(0 0 3px #166bff) drop-shadow(0 0 9px rgba(29, 103, 255, .8));
            will-change: transform, opacity;
            animation: circuitTravel 4.4s linear infinite;
          }
          .circuit-trace::before, .circuit-trace::after {
            content: ""; position: absolute; border-radius: 50%; background: #c3f5ff;
            box-shadow: 0 0 5px #57d5ff, 0 0 14px #187aff;
          }
          .circuit-trace::before { width: 3px; height: 3px; left: -1px; top: -2px; }
          .circuit-trace::after { width: 2px; height: 2px; right: -2px; bottom: -1px; }
          .circuit-trace-1 { --trace-direction: -1; opacity: .58; animation-duration: 3.6s; }
          .circuit-trace-2 { border-color: rgba(52, 177, 255, .96); opacity: .82; animation-duration: 5.2s; }
          .circuit-node {
            position: absolute; width: 2px; height: 2px; border-radius: 50%;
            background: #9beaff; box-shadow: 0 0 7px #53c8ff;
            animation: circuitTwinkle 4.4s ease-in-out infinite;
          }
          .hero-section {
            background: linear-gradient(145deg, rgba(5,8,43,.82), rgba(9,17,69,.7));
          }
          .method-grid {
            background-image: linear-gradient(rgba(83,200,255,.07) 1px, transparent 1px), linear-gradient(90deg, rgba(83,200,255,.07) 1px, transparent 1px);
          }
          .custom-cursor-dot { background: #a8efff; box-shadow: 0 0 8px #fff, 0 0 24px #53c8ff; }
          .custom-cursor-ring {
            border-color: rgba(83,200,255,.75); box-shadow: inset 0 0 20px rgba(36,87,255,.14), 0 0 24px rgba(83,200,255,.24);
            background: radial-gradient(circle, transparent 56%, rgba(36,87,255,.14) 58%, transparent 72%);
          }
          .custom-cursor-ring::before { background: linear-gradient(90deg,transparent,var(--orchid),transparent); }
          .custom-cursor-ring::after { background: linear-gradient(transparent,var(--champagne),transparent); }
          .btn-solid { background: linear-gradient(100deg, #1f4fff, #2f8cff); box-shadow: 0 10px 34px rgba(30,94,255,.34); }
          .btn-solid:hover { background: linear-gradient(100deg, #53c8ff, #91edff); color: #05082b; box-shadow: 0 10px 38px rgba(83,200,255,.38); }
          .gradient-text-hero { background-image: linear-gradient(100deg,#eefaff 0%,#80eaff 30%,#3e89ff 62%,#b4f5ff 100%); }
          @keyframes circuitTravel {
            0% { clip-path: inset(0 100% 94% 0); transform: translate3d(calc(-6vw * var(--trace-direction)), -4vh, 0) scaleX(var(--trace-direction)); opacity: 0; }
            12% { clip-path: inset(0 42% 88% 0); opacity: .72; }
            38% { clip-path: inset(0 0 0 0); opacity: 1; }
            78% { clip-path: inset(0 0 0 0); opacity: .9; }
            100% { clip-path: inset(88% 0 0 72%); transform: translate3d(calc(8vw * var(--trace-direction)), 6vh, 0) scaleX(var(--trace-direction)); opacity: 0; }
          }
          @keyframes circuitGridMove { to { transform: translate3d(64px, 64px, 0); } }
          @keyframes circuitTwinkle { 0%,100% { opacity: .12; transform: scale(.7); } 50% { opacity: .9; transform: scale(1.5); } }
          @keyframes circuitBreathe { from { opacity: .55; transform: scale(.92); } to { opacity: .95; transform: scale(1.08); } }

          /* Dark blue + black section system. Translucency keeps the moving
             circuit layer visible behind every route without hurting copy. */
          body.raw-to-finess-page section {
            background-color: rgba(2, 4, 15, .16) !important;
            background-image: none !important;
            color: #edf8ff;
          }
          body.raw-to-finess-page section:nth-of-type(even) {
            background-color: rgba(2, 5, 20, .3) !important;
          }
          body.raw-to-finess-page [class~="bg-white"],
          body.raw-to-finess-page [class*="bg-white/"],
          body.raw-to-finess-page [class*="bg-[#EEF7FF]"],
          body.raw-to-finess-page [class*="bg-[#EEF8FF]"],
          body.raw-to-finess-page [class*="bg-[#F4FBFF]"],
          body.raw-to-finess-page [class*="bg-[#F2FAFF]"] {
            background-color: rgba(2, 6, 22, .92) !important;
            color: #edf8ff !important;
            border-color: rgba(46, 175, 255, .22) !important;
          }
          body.raw-to-finess-page [class*="text-[#07102F]"] { color: #edf8ff !important; }
          body.raw-to-finess-page [class*="text-[#0B1452]"] { color: #edf8ff !important; }
          body.raw-to-finess-page p { color: rgba(237, 248, 255, .7) !important; }
          body.raw-to-finess-page [class*="bg-[var(--champagne)]"] { color: #020617 !important; }
          body.raw-to-finess-page [class*="border-[#07102F]"] { border-color: rgba(83, 200, 255, .18) !important; }
          body.raw-to-finess-page [class*="divide-[#07102F]"] > :not(:last-child) { border-color: rgba(83, 200, 255, .14) !important; }
          body.raw-to-finess-page input,
          body.raw-to-finess-page textarea,
          body.raw-to-finess-page select {
            background: rgba(3, 8, 30, .88) !important;
            color: #edf8ff !important;
            border-color: rgba(83, 200, 255, .2) !important;
          }
          .site-page-layer > div { background-color: transparent !important; }
          .section-seam { background: transparent !important; }

          /* Landing-page imagery uses a cool blue grade instead of the old
             plum cast. Hover retains detail without returning to purple. */
          .landing-media {
            filter: grayscale(.58) sepia(.2) hue-rotate(170deg) saturate(1.75) contrast(1.08) brightness(.78) !important;
          }
          .group:hover .landing-media,
          .landing-media:hover {
            filter: grayscale(.18) sepia(.12) hue-rotate(170deg) saturate(1.55) contrast(1.06) brightness(.88) !important;
          }

          /* Legibility and shared premium surface treatment */
          body.raw-to-finess-page main p { font-size: clamp(1rem, 1.08vw, 1.125rem); line-height: 1.85; font-weight: 400; }
          body.raw-to-finess-page [class*="text-white/20"],
          body.raw-to-finess-page [class*="text-white/25"],
          body.raw-to-finess-page [class*="text-white/30"],
          body.raw-to-finess-page [class*="text-white/32"],
          body.raw-to-finess-page [class*="text-white/35"],
          body.raw-to-finess-page [class*="text-white/38"],
          body.raw-to-finess-page [class*="text-white/40"],
          body.raw-to-finess-page [class*="text-white/42"],
          body.raw-to-finess-page [class*="text-white/45"] { color: rgba(237,248,255,.64) !important; }
          .premium-panel { isolation: isolate; }
          .premium-panel::before {
            content: ""; position: absolute; inset: 0; z-index: -1; pointer-events: none; opacity: .34;
            background-image: linear-gradient(rgba(46,175,255,.055) 1px, transparent 1px), linear-gradient(90deg,rgba(46,175,255,.055) 1px,transparent 1px);
            background-size: 28px 28px;
            mask-image: linear-gradient(to bottom, black, transparent 78%);
          }
          .footer-shell, .header-shell { transform: translateZ(0); }

          /* R2F cinematic violet system — shared by all four routes. */
          .circuit-background {
            background:
              radial-gradient(circle at 18% 16%, rgba(124,58,237,.2), transparent 34%),
              radial-gradient(circle at 82% 58%, rgba(168,85,247,.14), transparent 36%),
              linear-gradient(155deg, #020104 0%, #09040e 52%, #030205 100%) !important;
          }
          .circuit-depth {
            background-image: linear-gradient(rgba(168,85,247,.045) 1px,transparent 1px), linear-gradient(90deg,rgba(168,85,247,.045) 1px,transparent 1px) !important;
          }
          .circuit-halo { background: radial-gradient(circle,rgba(124,58,237,.2),transparent 66%) !important; }
          .circuit-trace { border-color: rgba(168,85,247,.55) !important; filter: drop-shadow(0 0 5px rgba(124,58,237,.55)) !important; }
          .circuit-node { background: #d8b4fe !important; box-shadow: 0 0 9px #a855f7 !important; }
          .hero-section {
            background: radial-gradient(circle at 74% 18%,rgba(124,58,237,.24),transparent 34%), linear-gradient(145deg,#020104,#12091b 58%,#050208) !important;
          }
          .btn-solid {
            background: linear-gradient(105deg,rgba(109,40,217,.7),rgba(147,51,234,.7) 56%,rgba(168,85,247,.7)) !important;
            color: white !important;
            border: 1px solid rgba(255,255,255,.3) !important;
            -webkit-backdrop-filter: blur(26px) saturate(180%);
            backdrop-filter: blur(26px) saturate(180%);
            box-shadow: inset 0 1.5px 0 rgba(255,255,255,.4),inset 0 -1px 0 rgba(255,255,255,.06),0 14px 42px rgba(124,58,237,.38) !important;
          }
          .btn-solid:hover { background: linear-gradient(105deg,rgba(168,85,247,.78),rgba(192,132,252,.78)) !important; color: white !important; box-shadow: inset 0 1.5px 0 rgba(255,255,255,.48),0 16px 50px rgba(168,85,247,.46) !important; }
          .btn-ghost {
            border-color: rgba(255,255,255,.32) !important;
            background: rgba(255,255,255,.035) !important;
            color: white !important;
            -webkit-backdrop-filter: blur(26px) saturate(180%);
            backdrop-filter: blur(26px) saturate(180%);
            box-shadow: inset 0 1.5px 0 rgba(255,255,255,.18);
          }
          .btn-ghost:hover { border-color: #c084fc !important; background: rgba(124,58,237,.14) !important; }
          .gradient-text-hero {
            background-image: linear-gradient(100deg,#fff 0%,#e9d5ff 28%,#c084fc 58%,#7c3aed 100%) !important;
          }
          body.raw-to-finess-page section { background-color: transparent !important; }
          body.raw-to-finess-page section:nth-of-type(even) { background-color: transparent !important; }
          body.raw-to-finess-page [class~="bg-white"],
          body.raw-to-finess-page [class*="bg-white/"],
          body.raw-to-finess-page [class*="bg-[#EEF7FF]"],
          body.raw-to-finess-page [class*="bg-[#EEF8FF]"],
          body.raw-to-finess-page [class*="bg-[#F4FBFF]"],
          body.raw-to-finess-page [class*="bg-[#F2FAFF]"] {
            background-color: #08050b !important;
            color: #faf7fc !important;
            border-color: rgba(168,85,247,.2) !important;
          }
          body.raw-to-finess-page p { color: rgba(252,248,255,.82) !important; }
          body.raw-to-finess-page [class*="border-[#07102F]"],
          body.raw-to-finess-page [class*="divide-[#07102F]"] > :not(:last-child) { border-color: rgba(168,85,247,.18) !important; }
          body.raw-to-finess-page input,
          body.raw-to-finess-page textarea,
          body.raw-to-finess-page select { background: rgba(8,4,12,.92) !important; color: #faf7fc !important; border-color: rgba(168,85,247,.22) !important; }
          .premium-panel::before {
            background-image: linear-gradient(rgba(168,85,247,.055) 1px,transparent 1px), linear-gradient(90deg,rgba(168,85,247,.055) 1px,transparent 1px) !important;
          }

          /* Landing page: transparent, light-built hero with a liquid wordmark. */
          .r2f-hero { background: transparent !important; isolation: isolate; }
          .r2f-hero-aurora {
            background:
              radial-gradient(ellipse 42% 35% at 50% 31%,rgba(192,132,252,.2),transparent 72%),
              radial-gradient(ellipse 30% 42% at 12% 54%,rgba(76,29,149,.18),transparent 72%),
              radial-gradient(ellipse 34% 46% at 92% 42%,rgba(168,85,247,.12),transparent 72%);
            opacity: .94;
            animation: heroAuroraBreathe 12s ease-in-out infinite alternate;
          }
          .r2f-hero-grid {
            opacity: .16;
            background-image:
              linear-gradient(rgba(216,180,254,.13) 1px,transparent 1px),
              linear-gradient(90deg,rgba(216,180,254,.1) 1px,transparent 1px);
            background-size: 72px 72px;
            -webkit-mask-image: radial-gradient(ellipse 54% 56% at 50% 35%,black,transparent 82%);
            mask-image: radial-gradient(ellipse 54% 56% at 50% 35%,black,transparent 82%);
          }
          .r2f-hero-vignette {
            background:
              linear-gradient(180deg,rgba(2,1,4,.28),transparent 22%,transparent 73%,#020104 100%),
              radial-gradient(ellipse at center,transparent 28%,rgba(2,1,4,.3) 70%,rgba(2,1,4,.78) 100%);
          }
          .r2f-hero-refractions { pointer-events: none; perspective: 1200px; }
          .r2f-hero-slab {
            position: absolute; display: block; border: 1px solid rgba(255,255,255,.26);
            border-radius: 999px;
            background: linear-gradient(135deg,rgba(255,255,255,.075),rgba(124,58,237,.018) 48%,rgba(255,255,255,.025));
            -webkit-backdrop-filter: blur(18px) saturate(170%);
            backdrop-filter: blur(18px) saturate(170%);
            box-shadow: inset 0 1px rgba(255,255,255,.16),inset 0 -1px rgba(255,255,255,.025),0 24px 80px rgba(0,0,0,.16),0 0 48px rgba(124,58,237,.08);
            opacity: .52;
            animation: heroSlabDrift 17s ease-in-out infinite alternate;
          }
          .r2f-hero-slab::after {
            content: ""; position: absolute; inset: 0; border-radius: inherit;
            background: linear-gradient(110deg,transparent 25%,rgba(255,255,255,.09) 47%,transparent 69%);
            opacity: .38;
          }
          .r2f-hero-slab-a { width: 330px; height: 118px; left: -118px; top: 34%; transform: rotate(57deg); }
          .r2f-hero-slab-b { width: 300px; height: 108px; right: -105px; top: 27%; transform: rotate(-54deg); animation-duration: 21s; animation-direction: alternate-reverse; }
          .r2f-hero-slab-c { width: 210px; height: 76px; right: 13%; bottom: 13%; transform: rotate(24deg); animation-duration: 24s; }
          .r2f-hero-glint {
            position: absolute; width: 5px; height: 5px; border-radius: 999px; background: #f5eaff;
            box-shadow: 0 0 12px #fff,0 0 34px #c084fc,0 0 65px rgba(124,58,237,.8);
            animation: heroGlintFloat 9s ease-in-out infinite;
          }
          .r2f-hero-glint-a { left: 24%; top: 30%; }
          .r2f-hero-glint-b { right: 26%; top: 22%; animation-delay: -4.5s; animation-duration: 12s; }
          .r2f-hero-kicker { background: linear-gradient(110deg,rgba(255,255,255,.06),rgba(124,58,237,.04),rgba(255,255,255,.025)); }
          .r2f-logo-stage { min-height: clamp(170px,21vw,258px); }
          .r2f-logo-stage::before {
            content: ""; position: absolute; left: 50%; top: 50%; width: min(62vw,640px); aspect-ratio: 1.85;
            transform: translate(-50%,-50%); border-radius: 50%;
            background: radial-gradient(ellipse,rgba(124,58,237,.2),rgba(168,85,247,.06) 43%,transparent 72%);
            filter: blur(30px); opacity: .74; animation: stageOrbBreathe 8s ease-in-out infinite alternate;
          }
          .r2f-logo-orbit {
            position: absolute; left: 50%; top: 50%; display: block; border-radius: 50%;
            border: 1px solid rgba(216,180,254,.12); transform: translate(-50%,-50%) rotate(-7deg);
            box-shadow: inset 0 0 48px rgba(124,58,237,.035),0 0 40px rgba(124,58,237,.035);
          }
          .r2f-logo-orbit::after {
            content: ""; position: absolute; left: 11%; top: 13%; width: 5px; height: 5px; border-radius: 50%;
            background: #eadcff; box-shadow: 0 0 14px #fff,0 0 30px #a855f7;
          }
          .r2f-logo-orbit-a { width: min(62vw,620px); aspect-ratio: 2.8; animation: logoOrbit 15s linear infinite; }
          .r2f-logo-orbit-b { width: min(47vw,480px); aspect-ratio: 2.45; transform: translate(-50%,-50%) rotate(8deg); opacity: .72; animation: logoOrbitReverse 20s linear infinite; }
          .r2f-logo-scanline {
            position: absolute; z-index: 4; left: 23%; right: 23%; top: 50%; height: 1px;
            background: linear-gradient(90deg,transparent,rgba(255,255,255,.2),rgba(216,180,254,.85),rgba(255,255,255,.2),transparent);
            box-shadow: 0 0 18px rgba(192,132,252,.48); opacity: 0;
            animation: logoScan 7s cubic-bezier(.16,1,.3,1) infinite;
          }
          .r2f-liquid-logo {
            z-index: 3; width: clamp(220px,34vw,470px); aspect-ratio: 2.65 / 1;
            transform-origin: 50% 52%; will-change: transform;
          }
          .r2f-liquid-logo-halo {
            position: absolute; inset: 10% 2%; border-radius: 50%;
            background: radial-gradient(ellipse,rgba(168,85,247,.23),rgba(124,58,237,.09) 42%,transparent 72%);
            filter: blur(32px); animation: liquidHalo 6s ease-in-out infinite alternate;
          }
          .r2f-liquid-logo-mark,
          .r2f-liquid-logo-gloss {
            position: absolute; inset: 0; display: block;
            -webkit-mask-image: url("/images/r2f-logo-white.png");
            mask-image: url("/images/r2f-logo-white.png");
            -webkit-mask-repeat: no-repeat; mask-repeat: no-repeat;
            -webkit-mask-position: center; mask-position: center;
            -webkit-mask-size: 166% auto; mask-size: 166% auto;
          }
          .r2f-liquid-logo-depth {
            background: rgba(3,1,7,.94);
            filter: drop-shadow(-3px 0 2px rgba(34,211,238,.72)) drop-shadow(3px 0 2px rgba(236,72,153,.68)) drop-shadow(0 0 15px rgba(168,85,247,.92)) drop-shadow(0 18px 30px rgba(0,0,0,.85));
          }
          .r2f-liquid-logo-core {
            background:
              radial-gradient(circle at 30% 28%,rgba(255,255,255,.84),transparent 9%),
              radial-gradient(circle at 72% 64%,rgba(15,8,28,.96),transparent 34%),
              conic-gradient(from 20deg,#f5e7ff,#a855f7,#2563eb,#22d3ee,#f0abfc,#7c3aed,#ffffff,#f5e7ff);
            background-size: 150% 150%,130% 130%,260% 260%;
            filter: url(#r2f-liquid-distort) saturate(1.35) contrast(1.12);
            animation: liquidSpectrum 9s ease-in-out infinite alternate;
          }
          .r2f-liquid-logo-spectrum {
            inset: -1.5% -1%; opacity: .72; mix-blend-mode: screen;
            background: linear-gradient(105deg,transparent 15%,#22d3ee 28%,#ffffff 40%,#c084fc 50%,#ec4899 63%,transparent 78%);
            background-size: 240% 100%; filter: blur(.3px) url(#r2f-liquid-distort);
            animation: liquidSheen 5.8s ease-in-out infinite;
          }
          .r2f-liquid-logo-gloss {
            z-index: 3; background: linear-gradient(172deg,rgba(255,255,255,.9),transparent 19%,transparent 68%,rgba(192,132,252,.48));
            opacity: .54; mix-blend-mode: screen; transform: translateY(-1px);
          }
          .r2f-hero-title-shine {
            color: transparent;
            background: linear-gradient(95deg,#fff 3%,#e9d5ff 24%,#c084fc 48%,#7c3aed 67%,#f5e7ff 88%);
            background-size: 230% auto; -webkit-background-clip: text; background-clip: text;
            animation: liquidTitle 8s ease-in-out infinite;
          }
          .r2f-service-dock {
            position: relative; overflow: hidden;
            background: linear-gradient(120deg,rgba(255,255,255,.075),rgba(7,5,12,.06) 42%,rgba(124,58,237,.045)) !important;
            -webkit-backdrop-filter: blur(34px) saturate(180%);
            backdrop-filter: blur(34px) saturate(180%);
            border-color: rgba(255,255,255,.18) !important;
            box-shadow: inset 0 1px rgba(255,255,255,.16),inset 0 -1px rgba(255,255,255,.035),0 24px 72px rgba(0,0,0,.24),0 0 46px rgba(124,58,237,.07);
          }
          .r2f-service-dock::before {
            content: ""; position: absolute; inset: 0; pointer-events: none;
            background: linear-gradient(90deg,transparent,rgba(255,255,255,.075),transparent);
            transform: translateX(-120%); animation: serviceDockSheen 13s ease-in-out infinite;
          }
          .r2f-service-dock > * { position: relative; z-index: 1; }
          .r2f-orb { position: absolute; border-radius: 999px; filter: blur(100px); pointer-events: none; animation: r2fOrb 10s ease-in-out infinite alternate; }
          .r2f-glass {
            border: 1px solid rgba(168,85,247,.16);
            background: linear-gradient(145deg,#0a060d,#050307);
            box-shadow: inset 0 1px rgba(255,255,255,.05),0 22px 60px rgba(0,0,0,.38);
            backdrop-filter: blur(14px);
          }
          .r2f-section-frame {
            border: 1px solid rgba(168,85,247,.17);
            background:
              radial-gradient(circle at 0% 0%,rgba(124,58,237,.13),transparent 34%),
              linear-gradient(145deg,#08050b 0%,#040206 100%);
            box-shadow: inset 0 1px rgba(255,255,255,.045),0 30px 90px rgba(0,0,0,.38),0 0 60px rgba(124,58,237,.055);
          }
          .r2f-experience-card {
            background: radial-gradient(circle at 16% 18%,rgba(168,85,247,.2),transparent 32%), linear-gradient(130deg,rgba(21,9,31,.96),rgba(3,2,5,.94));
            box-shadow: inset 0 1px rgba(255,255,255,.05),0 35px 100px rgba(0,0,0,.45),0 0 70px rgba(124,58,237,.08);
          }
          .r2f-process-card, .r2f-team-card {
            background: linear-gradient(145deg,#09050c,#040206);
            box-shadow: inset 0 1px rgba(255,255,255,.04),0 18px 55px rgba(0,0,0,.38);
            backdrop-filter: blur(12px);
          }
          .r2f-process-card::after {
            content: ""; position: absolute; inset: auto -20% -55% 10%; height: 68%; border-radius: 50%;
            background: rgba(124,58,237,.16); filter: blur(50px); transition: transform .5s ease, opacity .5s ease; opacity: .5;
          }
          .r2f-process-card:hover::after { transform: translateY(-20%); opacity: .9; }
          .r2f-team-card { transition: border-color .35s ease, background .35s ease; }
          .r2f-team-card:hover { border-color: rgba(168,85,247,.38); background: linear-gradient(145deg,rgba(168,85,247,.095),rgba(255,255,255,.035)); }
          .r2f-team-rail {
            scrollbar-width: thin;
            scrollbar-color: rgba(168,85,247,.6) rgba(255,255,255,.06);
            overscroll-behavior-inline: contain;
          }
          .r2f-team-rail::-webkit-scrollbar { height: 5px; }
          .r2f-team-rail::-webkit-scrollbar-track { background: rgba(255,255,255,.055); border-radius: 99px; }
          .r2f-team-rail::-webkit-scrollbar-thumb { background: linear-gradient(90deg,#7c3aed,#c084fc); border-radius: 99px; }
          .r2f-team-portrait {
            box-shadow: inset 0 1px rgba(255,255,255,.04),0 24px 65px rgba(0,0,0,.42);
            transition: border-color .35s ease, box-shadow .35s ease;
          }
          .r2f-team-portrait:hover { border-color: rgba(168,85,247,.42); box-shadow: inset 0 1px rgba(255,255,255,.06),0 28px 75px rgba(0,0,0,.52),0 0 38px rgba(124,58,237,.1); }
          .full-spread-card {
            box-shadow: inset 0 1px rgba(255,255,255,.045),0 28px 75px rgba(0,0,0,.44);
            transition: border-color .35s ease, box-shadow .35s ease;
          }
          .full-spread-card::after {
            content: ""; position: absolute; inset: -60% auto -60% -40%; width: 28%; pointer-events: none;
            background: linear-gradient(90deg,transparent,rgba(255,255,255,.09),transparent);
            transform: rotate(18deg) translateX(-220%); transition: transform .8s cubic-bezier(.16,1,.3,1);
          }
          .full-spread-card:hover { border-color: rgba(168,85,247,.42); box-shadow: inset 0 1px rgba(255,255,255,.06),0 34px 90px rgba(0,0,0,.55),0 0 44px rgba(124,58,237,.1); }
          .full-spread-card:hover::after { transform: rotate(18deg) translateX(650%); }
          .full-spread-card p { font-size: .92rem !important; line-height: 1.65 !important; }
          .r2f-rail-button {
            display: inline-flex; width: 44px; height: 44px; align-items: center; justify-content: center;
            border: 1px solid rgba(168,85,247,.26); border-radius: 999px; background: #070409; color: rgba(255,255,255,.82);
            transition: transform .25s ease, background .25s ease, border-color .25s ease;
          }
          .r2f-rail-button:hover { transform: translateY(-2px); background: #7c3aed; border-color: #a855f7; color: white; }
          body.raw-to-finess-page main h1,
          body.raw-to-finess-page main h2,
          body.raw-to-finess-page main h3 { color: #fff; text-wrap: balance; text-shadow: 0 12px 34px rgba(0,0,0,.34); }
          @keyframes heroAuroraBreathe { from { opacity: .68; transform: scale(.96) translateY(-1%); } to { opacity: 1; transform: scale(1.035) translateY(1.5%); } }
          @keyframes r2fOrb { from { transform: translate3d(-3%,0,0) scale(.92); } to { transform: translate3d(5%,3%,0) scale(1.08); } }
          @keyframes heroSlabDrift { from { translate: 0 -10px; scale: .97; opacity: .42; } to { translate: 16px 18px; scale: 1.04; opacity: .72; } }
          @keyframes heroGlintFloat { 0%,100% { transform: translate3d(0,0,0) scale(.7); opacity: .35; } 50% { transform: translate3d(28px,-24px,0) scale(1.45); opacity: 1; } }
          @keyframes stageOrbBreathe { from { transform: scale(.82); opacity: .28; } to { transform: scale(1.14); opacity: .5; } }
          @keyframes logoOrbit { from { transform: translate(-50%,-50%) rotate(-7deg); } to { transform: translate(-50%,-50%) rotate(353deg); } }
          @keyframes logoOrbitReverse { from { transform: translate(-50%,-50%) rotate(368deg); } to { transform: translate(-50%,-50%) rotate(8deg); } }
          @keyframes logoScan { 0%,58% { opacity: 0; transform: translateY(-72px) scaleX(.72); } 67% { opacity: .65; } 82% { opacity: .12; transform: translateY(74px) scaleX(1); } 100% { opacity: 0; transform: translateY(74px) scaleX(1); } }
          @keyframes liquidHalo { from { transform: scale(.88); opacity: .42; } to { transform: scale(1.12); opacity: .82; } }
          @keyframes liquidSpectrum { 0% { background-position: 12% 22%,70% 30%,0% 38%; } 38% { background-position: 40% 4%,22% 80%,48% 70%; } 72% { background-position: 4% 72%,78% 12%,100% 42%; } 100% { background-position: 62% 18%,10% 52%,22% 88%; } }
          @keyframes liquidSheen { 0%,8% { background-position: 130% center; opacity: .18; } 48% { opacity: .86; } 88%,100% { background-position: -105% center; opacity: .28; } }
          @keyframes liquidTitle { 0%,100% { background-position: 0% center; } 50% { background-position: 100% center; } }
          @keyframes serviceDockSheen { 0%,70% { transform: translateX(-120%); } 88%,100% { transform: translateX(120%); } }

          /* Reference-led glass system: near-black canvas, restrained ambient
             light and translucent surfaces with crisp, luminous rims. */
          :root {
            --glass-fill: rgba(11, 8, 18, .28);
            --glass-fill-strong: rgba(13, 9, 22, .38);
            --glass-line: rgba(255, 255, 255, .24);
            --glass-line-soft: rgba(255, 255, 255, .15);
            --glass-highlight: rgba(255, 255, 255, .24);
          }
          .glass-ambient { background: #020104; }
          .glass-light {
            position: absolute; display: block; border-radius: 999px;
            filter: blur(90px); mix-blend-mode: screen; will-change: transform;
            animation: glassLightDrift 28s ease-in-out infinite alternate;
          }
          .glass-light-a {
            width: 24vw; height: 88vh; left: 35%; top: -18vh;
            background: linear-gradient(180deg,rgba(109,40,217,.05),rgba(124,58,237,.31) 46%,rgba(192,132,252,.12));
            transform: rotate(13deg);
          }
          .glass-light-b {
            width: 34vw; height: 64vh; right: -11vw; top: 18vh;
            background: radial-gradient(ellipse,rgba(168,85,247,.24),rgba(109,40,217,.1) 48%,transparent 72%);
            animation-duration: 34s; animation-direction: alternate-reverse;
          }
          .glass-light-c {
            width: 38vw; height: 55vh; left: -14vw; bottom: -9vh;
            background: radial-gradient(ellipse,rgba(124,58,237,.2),rgba(76,29,149,.08) 52%,transparent 73%);
            animation-duration: 38s;
          }
          .glass-light-d {
            width: 18vw; height: 78vh; left: 54%; bottom: -30vh;
            background: linear-gradient(180deg,transparent,rgba(192,132,252,.15),rgba(124,58,237,.18));
            transform: rotate(-18deg); animation-duration: 42s; animation-direction: alternate-reverse;
          }
          .glass-ambient-noise {
            position: absolute; inset: 0; opacity: .018;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.72' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E");
          }
          .header-shell,
          .footer-shell,
          .booking-shell,
          .corner-popup,
          .sticky-cta-inner,
          .premium-panel,
          .spotlight-card,
          .menu-card,
          .full-spread-card,
          .r2f-section-frame,
          .r2f-experience-card,
          .r2f-process-card,
          .r2f-team-card,
          .r2f-team-portrait,
          .r2f-glass {
            background: linear-gradient(135deg,rgba(255,255,255,.1),rgba(10,7,16,.16) 42%,rgba(255,255,255,.045) 100%) !important;
            border-color: var(--glass-line) !important;
            -webkit-backdrop-filter: blur(42px) saturate(185%);
            backdrop-filter: blur(42px) saturate(185%);
            box-shadow: inset 0 1.5px 0 var(--glass-highlight),inset 0 -1px 0 rgba(255,255,255,.06),0 26px 90px rgba(0,0,0,.34),0 0 60px rgba(124,58,237,.09) !important;
          }
          .header-shell {
            background: linear-gradient(120deg,rgba(255,255,255,.13),rgba(7,5,12,.2) 38%,rgba(255,255,255,.05)) !important;
            -webkit-backdrop-filter: blur(46px) saturate(195%);
            backdrop-filter: blur(46px) saturate(195%);
          }
          .header-shell nav,
          .mobile-menu {
            background: rgba(8,5,14,.15) !important;
            border-color: var(--glass-line-soft) !important;
            -webkit-backdrop-filter: blur(34px) saturate(170%);
            backdrop-filter: blur(34px) saturate(170%);
            box-shadow: inset 0 1px 0 rgba(255,255,255,.12);
          }
          .footer-shell > div[class*="rounded-[28px]"],
          body.raw-to-finess-page main [class*="backdrop-blur"] {
            background-color: rgba(12,8,20,.15) !important;
            border-color: var(--glass-line-soft) !important;
            -webkit-backdrop-filter: blur(32px) saturate(170%);
            backdrop-filter: blur(32px) saturate(170%);
            box-shadow: inset 0 1px 0 rgba(255,255,255,.1);
          }
          body.raw-to-finess-page [class~="bg-white"],
          body.raw-to-finess-page [class*="bg-white/"],
          body.raw-to-finess-page [class*="bg-[#EEF7FF]"],
          body.raw-to-finess-page [class*="bg-[#EEF8FF]"],
          body.raw-to-finess-page [class*="bg-[#F4FBFF]"],
          body.raw-to-finess-page [class*="bg-[#F2FAFF]"] {
            background-color: rgba(12,8,20,.22) !important;
            border-color: var(--glass-line-soft) !important;
            -webkit-backdrop-filter: blur(28px) saturate(160%);
            backdrop-filter: blur(28px) saturate(160%);
          }
          .r2f-process-card:hover,
          .r2f-team-card:hover,
          .r2f-team-portrait:hover,
          .full-spread-card:hover,
          .spotlight-card:hover {
            background: linear-gradient(135deg,rgba(255,255,255,.13),rgba(39,19,65,.3),rgba(255,255,255,.045)) !important;
            border-color: rgba(216,180,254,.4) !important;
            box-shadow: inset 0 1.5px 0 rgba(255,255,255,.22),0 32px 100px rgba(0,0,0,.5),0 0 68px rgba(124,58,237,.14) !important;
          }
          .booking-input {
            background: rgba(255,255,255,.045) !important;
            border-color: rgba(255,255,255,.16) !important;
            -webkit-backdrop-filter: blur(22px) saturate(160%); backdrop-filter: blur(22px) saturate(160%);
          }
          @keyframes glassLightDrift {
            0% { translate: -2% -2%; scale: .94; opacity: .62; }
            50% { translate: 4% 3%; scale: 1.04; opacity: .84; }
            100% { translate: -1% 7%; scale: .98; opacity: .68; }
          }
 
          @media (max-width: 767px) {
            body.raw-to-finess-page main p { font-size: .98rem; }
            .r2f-hero-slab { opacity: .36; filter: saturate(.9); }
            .r2f-hero-slab-a { width: 190px; height: 68px; left: -108px; top: 25%; }
            .r2f-hero-slab-b { width: 170px; height: 62px; right: -98px; top: 18%; }
            .r2f-hero-slab-c, .r2f-hero-glint-b { display: none; }
            .r2f-logo-stage { min-height: 158px; }
            .r2f-logo-orbit-a { width: 78vw; }
            .r2f-logo-orbit-b { width: 62vw; }
            .r2f-logo-scanline { left: 13%; right: 13%; }
            .landing-glass-shard-c, .landing-glass-shard-d { display: none; }
            .landing-glass-shard-a { left: -135px; }
            .landing-glass-shard-b { right: -125px; }
            .landing-ambient-grid { background-size: 52px 52px; }
            .glass-light { filter: blur(64px); opacity: .72; }
            .glass-light-a { width: 48vw; height: 70vh; left: 28%; }
            .glass-light-b { width: 70vw; right: -34vw; }
            .glass-light-c { width: 72vw; left: -38vw; }
            .hero-orb, .footer-glow, .footer-glow-gold { display: none; }
            .circuit-trace { filter: drop-shadow(0 0 4px rgba(29,103,255,.75)); }
            .circuit-node:nth-of-type(2n) { display: none; }
          }

          @media (prefers-reduced-motion: reduce) {
            *, *::before, *::after {
              scroll-behavior: auto !important;
              animation-duration: .001ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: .001ms !important;
            }
          }

    `}</style>
  );
}
