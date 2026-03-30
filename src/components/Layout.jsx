import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Header } from "./Header";
import { Preloader } from "./Preloader";
import { useSiteMotion } from "../hooks/useSiteMotion";

export function Layout({ children }) {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollDirection, setScrollDirection] = useState("up");
  const [showPreloader, setShowPreloader] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const lastScrollY = useRef(0);
  const prevPathname = useRef(location.pathname);

  useSiteMotion();

  const handleScroll = useCallback(() => {
    const y = window.scrollY;
    setIsScrolled(y > 50);

    if (Math.abs(y - lastScrollY.current) > 5) {
      setScrollDirection(y > lastScrollY.current ? "down" : "up");
    }
    lastScrollY.current = y;
  }, []);

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    const timeout = window.setTimeout(() => setShowPreloader(false), 1250);
    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    document.body.style.overflow = showPreloader ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [showPreloader]);

  useEffect(() => {
    if (prevPathname.current !== location.pathname) {
      setIsTransitioning(true);
      const timeout = window.setTimeout(() => setIsTransitioning(false), 600);
      prevPathname.current = location.pathname;
      return () => window.clearTimeout(timeout);
    }

    const frameId = window.requestAnimationFrame(() => {
      if (location.hash) {
        const target = document.querySelector(location.hash);
        target?.scrollIntoView({ behavior: "auto", block: "start" });
        return;
      }
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [location.hash, location.pathname]);

  const pageContext = location.pathname === "/about" ? "about" : "home";
  const headerHidden = scrollDirection === "down" && isScrolled;

  return (
    <div
      className={[
        "page-frame",
        `page-frame--${pageContext}`,
        showPreloader ? "page-frame--covered" : "page-frame--revealed",
        isTransitioning ? "page-frame--transitioning" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <Preloader visible={showPreloader} />
      <Header isScrolled={isScrolled} hidden={headerHidden} />
      <main className="site-main">{children}</main>
    </div>
  );
}
