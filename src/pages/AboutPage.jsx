import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Footer } from "../components/Footer";
import { InquiryForm } from "../components/InquiryForm";
import {
  aboutPlaceholder,
  contactLinks,
  founderProfile,
  imageLibrary,
  serviceLanes,
} from "../data/siteContent";

gsap.registerPlugin(ScrollTrigger);

function useAboutMotion() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      return undefined;
    }

    const media = gsap.matchMedia();
    const ctx = gsap.context(() => {
      const introItems = gsap.utils.toArray("[data-about-intro]");
      if (introItems.length) {
        gsap.fromTo(
          introItems,
          { y: 34, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 1.05,
            ease: "power3.out",
            stagger: 0.12,
          },
        );
      }

      gsap.utils.toArray("[data-about-reveal]").forEach((element) => {
        gsap.fromTo(
          element,
          { y: 44, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.95,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 84%",
              once: true,
            },
          },
        );
      });

      gsap.to(".about-hero__portrait", {
        y: "12vh",
        scale: 1.08,
        ease: "none",
        scrollTrigger: {
          trigger: ".about-hero",
          start: "top top",
          end: "bottom top",
          scrub: 1.1,
        },
      });

      media.add("(min-width: 960px)", () => {
        gsap.to(".about-story__headline", {
          yPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: ".about-story",
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });

        gsap.fromTo(
          ".about-gallery__feature",
          {
            scale: 0.9,
            clipPath: "inset(14% 10% 14% 10% round 2rem)",
          },
          {
            scale: 1,
            clipPath: "inset(0% 0% 0% 0% round 2rem)",
            ease: "none",
            scrollTrigger: {
              trigger: ".about-gallery",
              start: "top 70%",
              end: "bottom 30%",
              scrub: 1,
            },
          },
        );
      });
    });

    const refreshId = window.requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      window.cancelAnimationFrame(refreshId);
      media.revert();
      ctx.revert();
    };
  }, []);
}

export function AboutPage() {
  useAboutMotion();

  return (
    <>
      <section className="about-hero">
        <div className="site-shell about-hero__frame">
          <div className="about-hero__copy">
            <p className="eyebrow" data-about-intro>
              About Me
            </p>

            <h1 className="about-hero__title" data-about-intro>
              Angel Zino
            </h1>

            <p className="about-hero__lead" data-about-intro>
              {aboutPlaceholder.lead}
            </p>

            <div className="about-hero__roles" data-about-intro>
              {founderProfile.roles.map((role) => (
                <span key={role}>{role}</span>
              ))}
            </div>
          </div>

          <figure className="about-hero__portrait" data-about-intro>
            <img src={imageLibrary.aboutPortrait.src} alt={imageLibrary.aboutPortrait.alt} />
          </figure>
        </div>
      </section>

      <section className="about-story" id="story">
        <div className="site-shell about-story__grid">
          <div className="about-story__headline" data-about-reveal>
            <p className="eyebrow">Placeholder story</p>
            <h2 className="section-title">Built with softness, precision, and range.</h2>
          </div>

          <div className="about-story__body" data-about-reveal>
            {aboutPlaceholder.intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="about-pillars" id="approach">
        <div className="site-shell">
          <div className="about-pillars__heading" data-about-reveal>
            <p className="eyebrow">Current placeholders</p>
            <h2 className="section-title section-title--light">
              These blocks are here to hold the founder story until the real details arrive.
            </h2>
          </div>

          <div className="about-pillars__grid">
            {aboutPlaceholder.pillars.map((pillar) => (
              <article key={pillar.title} className="about-pillar" data-about-reveal>
                <p className="eyebrow eyebrow--soft">{pillar.eyebrow}</p>
                <h3>{pillar.title}</h3>
                <p>{pillar.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-gallery">
        <div className="site-shell about-gallery__grid">
          <figure className="about-gallery__feature" data-about-reveal>
            <img src={imageLibrary.aboutStudio.src} alt={imageLibrary.aboutStudio.alt} />
          </figure>

          <div className="about-gallery__aside">
            {aboutPlaceholder.chapters.map((chapter, index) => (
              <article key={chapter.title} className="about-chapter" data-about-reveal>
                <span className="about-chapter__index">{chapter.index}</span>
                <div>
                  <p className="eyebrow">{chapter.title}</p>
                  <h3>{index === 0 ? "Where the hands-on side begins." : chapter.title}</h3>
                  <p>{chapter.body}</p>
                </div>
              </article>
            ))}

            <div className="about-gallery__details" data-about-reveal>
              <figure className="about-gallery__detail">
                <img src={imageLibrary.aboutDesk.src} alt={imageLibrary.aboutDesk.alt} />
              </figure>

              <figure className="about-gallery__detail">
                <img src={imageLibrary.aboutDetail.src} alt={imageLibrary.aboutDetail.alt} />
              </figure>
            </div>
          </div>
        </div>
      </section>

      <section className="about-lanes">
        <div className="site-shell">
          <div className="about-lanes__heading" data-about-reveal>
            <p className="eyebrow">What the founder brand covers</p>
            <h2 className="section-title section-title--light">
              The copy is still placeholder, but the service language is already accurate.
            </h2>
          </div>

          <div className="about-lanes__list">
            {serviceLanes.map((lane) => (
              <article key={lane.id} className="about-lane" data-about-reveal>
                <div>
                  <p className="eyebrow">{lane.eyebrow}</p>
                  <h3>{lane.title}</h3>
                </div>
                <span className="about-lane__format">{lane.format}</span>
                <p>{lane.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-contact" id="contact">
        <div className="site-shell about-contact__grid">
          <div className="about-contact__copy" data-about-reveal>
            <p className="eyebrow eyebrow--soft">Contact</p>
            <h2 className="section-title section-title--light">
              Book the work, ask about training, or start with a strategy conversation.
            </h2>
            <p>
              This section can stay functional while the story stays in placeholder mode. People can still book,
              enquire, and move into WhatsApp without waiting for the final copy pass.
            </p>

            <div className="about-contact__actions">
              <a className="button" href={contactLinks.booking} target="_blank" rel="noreferrer">
                WhatsApp
              </a>
              <a className="button button--ghost" href={contactLinks.instagram} target="_blank" rel="noreferrer">
                Instagram
              </a>
            </div>
          </div>

          <div className="about-contact__form" data-about-reveal>
            <InquiryForm />
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
