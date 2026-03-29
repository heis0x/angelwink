import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Header } from "./Header";
import { Preloader } from "./Preloader";
import { useSiteMotion } from "../hooks/useSiteMotion";

export function Layout({ children }) {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showPreloader, setShowPreloader] = useState(true);

  useSiteMotion();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  return (
    <div
      className={`page-frame page-frame--${location.pathname === "/about" ? "about" : "home"} ${
        showPreloader ? "page-frame--covered" : "page-frame--revealed"
      }`}
    >
      <Preloader visible={showPreloader} />
      <Header isScrolled={isScrolled} />
      <main className="site-main">{children}</main>
    </div>
  );
}
