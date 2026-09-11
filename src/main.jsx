import React, { Suspense, lazy, useLayoutEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, MotionConfig } from "framer-motion";
import "./index.css";

const LandingPage = lazy(() => import("./components/LandingPage"));
const PortfolioPage = lazy(() => import("./components/PortfolioPage"));
const PricingPage = lazy(() => import("./components/PricingPage"));
const VideoEditsPage = lazy(() => import("./components/VideoEditsPage"));


function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useLayoutEffect(() => {
    if ("scrollRestoration" in window.history) window.history.scrollRestoration = "manual";

    const resetToTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    const moveToDestination = () => {
      if (hash) {
        const target = document.getElementById(decodeURIComponent(hash.slice(1)));
        if (target) {
          const top = Math.max(0, target.getBoundingClientRect().top + window.scrollY - 100);
          window.scrollTo({ top, left: 0, behavior: "instant" });
          document.documentElement.scrollTop = top;
          document.body.scrollTop = top;
          return;
        }
      }
      resetToTop();
    };

    moveToDestination();
    let secondFrame;
    const firstFrame = requestAnimationFrame(() => {
      moveToDestination();
      secondFrame = requestAnimationFrame(moveToDestination);
    });
    const settleTimer = window.setTimeout(moveToDestination, 120);
    const lazyRouteTimer = window.setTimeout(moveToDestination, 650);

    return () => {
      cancelAnimationFrame(firstFrame);
      if (secondFrame) cancelAnimationFrame(secondFrame);
      window.clearTimeout(settleTimer);
      window.clearTimeout(lazyRouteTimer);
    };
  }, [pathname, hash]);
  return null;
}

function RouteFallback() {
  return <div className="min-h-screen bg-[var(--ink)]" />;
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Suspense fallback={<RouteFallback />}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/video-edits" element={<VideoEditsPage />} />
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <ScrollToTop />
        <AnimatedRoutes />
      </BrowserRouter>
    </MotionConfig>
  </React.StrictMode>
);
