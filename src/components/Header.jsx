import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { aboutNavigation, contactLinks, homeNavigation } from "../data/siteContent";

function LetterWrap({ text }) {
  return text.split("").map((char, i) => (
    <span
      className="letter-ct"
      key={i}
      style={{ "--char-index": i }}
      aria-hidden="true"
    >
      <span>{char === " " ? "\u00A0" : char}</span>
    </span>
  ));
}

function NavigationItem({ item, pathname, onClick }) {
  const content = <LetterWrap text={item.label} />;

  if (!item.anchor) {
    return (
      <Link className="site-nav__link" to={item.page} onClick={onClick}>
        {content}
        <span className="site-nav__line" />
      </Link>
    );
  }

  if (pathname === item.page) {
    return (
      <a className="site-nav__link" href={item.anchor} onClick={onClick}>
        {content}
        <span className="site-nav__line" />
      </a>
    );
  }

  return (
    <Link className="site-nav__link" to={`${item.page}${item.anchor}`} onClick={onClick}>
      {content}
      <span className="site-nav__line" />
    </Link>
  );
}

function StrokeCTA({ href, label }) {
  return (
    <a className="stroke-cta" href={href} target="_blank" rel="noreferrer">
      <svg className="stroke-cta__border" viewBox="0 0 200 48" preserveAspectRatio="none">
        <rect
          className="stroke-cta__rect stroke-cta__rect--ghost"
          x="1" y="1" width="198" height="46" rx="23"
          fill="none" stroke="currentColor" strokeWidth="1"
        />
        <rect
          className="stroke-cta__rect stroke-cta__rect--draw"
          x="1" y="1" width="198" height="46" rx="23"
          fill="none" stroke="currentColor" strokeWidth="1"
        />
      </svg>
      <span className="stroke-cta__label">{label}</span>
    </a>
  );
}

export function Header({ isScrolled, hidden }) {
  const { pathname } = useLocation();
  const navigation = pathname === "/about" ? aboutNavigation : homeNavigation;
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const headerClasses = [
    "site-header",
    isScrolled ? "site-header--scrolled" : "",
    hidden ? "site-header--hidden" : "",
    mobileOpen ? "site-header--nav-open" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <header className={headerClasses}>
        <div className="site-shell site-header__inner">
          <Link className="brand" to="/" aria-label="Angel's Wink start">
            <span className="brand__mark" aria-hidden="true">AW</span>
          </Link>

          <nav className="site-nav site-nav--desktop" aria-label="Primary navigation">
            {navigation.map((item) => (
              <NavigationItem
                key={`${item.page}${item.anchor ?? ""}${item.label}`}
                item={item}
                pathname={pathname}
              />
            ))}
          </nav>

          <StrokeCTA href={contactLinks.booking} label="Contact" />

          <button
            className="hamburger"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            <span className="hamburger__line" />
            <span className="hamburger__line" />
          </button>
        </div>
      </header>

      <div className={`mobile-nav ${mobileOpen ? "mobile-nav--open" : ""}`} aria-hidden={!mobileOpen}>
        <nav className="mobile-nav__list">
          {navigation.map((item) => (
            <NavigationItem
              key={`m-${item.page}${item.anchor ?? ""}${item.label}`}
              item={item}
              pathname={pathname}
              onClick={() => setMobileOpen(false)}
            />
          ))}
        </nav>
        <a
          className="mobile-nav__instagram"
          href={contactLinks.instagram}
          target="_blank"
          rel="noreferrer"
        >
          Instagram
        </a>
      </div>
    </>
  );
}
