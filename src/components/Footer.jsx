import { Link } from "react-router-dom";
import { contactLinks, founderProfile } from "../data/siteContent";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-shell site-footer__inner">
        <div>
          <p className="eyebrow">Angel's Wink</p>
          <p className="site-footer__statement">
            Tattoo-led beauty, training, growth, and wellness by {founderProfile.name}.
          </p>
        </div>

        <div className="site-footer__links">
          <Link to="/">Home</Link>
          <Link to="/about">About Me</Link>
          <a href={contactLinks.instagram} target="_blank" rel="noreferrer">
            {contactLinks.instagramLabel}
          </a>
          <a href={contactLinks.booking} target="_blank" rel="noreferrer">
            WhatsApp
          </a>
        </div>
      </div>
    </footer>
  );
}
