import { Link, useLocation } from "react-router-dom";
import { aboutNavigation, contactLinks, homeNavigation } from "../data/siteContent";

function NavigationItem({ item, pathname }) {
  if (!item.anchor) {
    return (
      <Link className="site-nav__link" to={item.page}>
        {item.label}
      </Link>
    );
  }

  if (pathname === item.page) {
    return (
      <a className="site-nav__link" href={item.anchor}>
        {item.label}
      </a>
    );
  }

  return (
    <Link className="site-nav__link" to={`${item.page}${item.anchor}`}>
      {item.label}
    </Link>
  );
}

export function Header({ isScrolled }) {
  const { pathname } = useLocation();
  const navigation = pathname === "/about" ? aboutNavigation : homeNavigation;

  return (
    <header className={`site-header ${isScrolled ? "site-header--scrolled" : ""}`}>
      <div className="site-shell site-header__inner">
        <Link className="brand" to="/" aria-label="Angel's Wink start">
          <span className="brand__mark" aria-hidden="true">AW</span>
        </Link>

        <nav className="site-nav" aria-label="Primary navigation">
          {navigation.map((item) => (
            <NavigationItem key={`${item.page}${item.anchor ?? ""}${item.label}`} item={item} pathname={pathname} />
          ))}
        </nav>

        <a className="button button--small site-header__cta" href={contactLinks.booking} target="_blank" rel="noreferrer">
          Contact
        </a>
      </div>
    </header>
  );
}
