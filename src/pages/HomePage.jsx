import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import {
  contactLinks,
  imageLibrary,
  serviceLanes,
  testimonials,
} from "../data/siteContent";

gsap.registerPlugin(ScrollTrigger);

function useHomeMotion() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      return undefined;
    }

    const media = gsap.matchMedia();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".home-hero__title",
        { y: 24, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 1.05,
          ease: "power3.out",
        },
      );

      gsap.fromTo(
        [".hero-stage__backdrop", ".hero-stage__portrait", ".hero-stage__detail"],
        { y: 36, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 1.15,
          ease: "power3.out",
          stagger: 0.1,
          delay: 0.12,
        },
      );

      const introItems = gsap.utils.toArray("[data-intro]");
      if (introItems.length) {
        gsap.fromTo(
          introItems,
          { y: 40, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 1.15,
            ease: "power3.out",
            stagger: 0.12,
          },
        );
      }

      gsap.utils.toArray("[data-reveal]").forEach((element) => {
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
              start: "top 85%",
              once: true,
            },
          },
        );
      });

      gsap.timeline({
        scrollTrigger: {
          trigger: ".home-hero",
          start: "top top",
          end: "bottom top",
          scrub: 1.1,
        },
      })
        .to(".hero-stage__portrait", { y: "15vh", scale: 1.18, ease: "none" }, 0)
        .to(".hero-stage__backdrop", { y: "12vh", scale: 1.08, ease: "none" }, 0)
        .to(".hero-stage__detail", { y: "20vh", scale: 1.1, ease: "none" }, 0)
        .to(".hero-stage__halo--left", { x: "-10vw", y: "18vh", rotate: -8, ease: "none" }, 0)
        .to(".hero-stage__halo--right", { x: "10vw", y: "22vh", rotate: 12, ease: "none" }, 0);

      media.add("(min-width: 960px)", () => {
        gsap.timeline({
          scrollTrigger: {
            trigger: ".precision__track",
            start: "top top",
            end: "bottom bottom",
            scrub: 1.05,
          },
        })
          .fromTo(
            ".precision__image--reveal",
            {
              clipPath: "inset(100% 0 0 0 round 2rem)",
              scale: 1.16,
            },
            {
              clipPath: "inset(0% 0 0 0 round 2rem)",
              scale: 1,
              ease: "none",
            },
            0,
          )
          .to(
            ".precision__image--base",
            {
              clipPath: "inset(0 0 100% 0 round 2rem)",
              scale: 1.12,
              ease: "none",
            },
            0,
          );

        gsap.timeline({
          scrollTrigger: {
            trigger: ".worlds__track",
            start: "top top",
            end: "bottom bottom",
            scrub: 1.05,
          },
        })
          .to(".worlds__collage", { scale: 2.8, ease: "none" }, 0)
          .to(".worlds__tile--one", { xPercent: -26, yPercent: -20, ease: "none" }, 0)
          .to(".worlds__tile--two", { xPercent: 24, yPercent: -24, ease: "none" }, 0)
          .to(".worlds__tile--three", { yPercent: -30, scale: 1.08, ease: "none" }, 0)
          .to(".worlds__tile--four", { xPercent: -28, yPercent: 26, ease: "none" }, 0)
          .to(".worlds__tile--five", { xPercent: 26, yPercent: 28, ease: "none" }, 0)
          .to(".worlds__veil", { opacity: 0.6, ease: "none" }, 0)
          .fromTo(".worlds__headline", { autoAlpha: 0, y: 48 }, { autoAlpha: 1, y: 0, ease: "none" }, 0.18);

        gsap.to(".voices__orb", {
          rotate: 360,
          ease: "none",
          scrollTrigger: {
            trigger: ".voices",
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
          },
        });

        [2, 3].forEach((index) => {
          gsap.fromTo(
            `.voices__image--${index}`,
            {
              clipPath: "inset(100% 0 0 0 round 2rem)",
              scale: 1.14,
            },
            {
              clipPath: "inset(0% 0 0 0 round 2rem)",
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: `.voice--${index}`,
                start: "top 72%",
                end: "top 16%",
                scrub: 1,
              },
            },
          );
        });
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

export function HomePage() {
  useHomeMotion();

  const [tattooLane] = serviceLanes;

  return (
    <>
      <section className="home-hero" id="start">
        <div className="site-shell home-hero__frame">
          <div className="hero-stage">
            <h1 className="home-hero__title">
              Angel&apos;s Wink
            </h1>

            <div className="hero-stage__visuals" aria-hidden="true">
              <span className="hero-stage__halo hero-stage__halo--left" />
              <span className="hero-stage__halo hero-stage__halo--right" />

              <figure className="hero-stage__backdrop">
                <img src={imageLibrary.heroBackdrop.src} alt={imageLibrary.heroBackdrop.alt} />
              </figure>

              <figure className="hero-stage__portrait">
                <img src={imageLibrary.heroPortrait.src} alt={imageLibrary.heroPortrait.alt} />
              </figure>

              <figure className="hero-stage__detail">
                <img src={imageLibrary.heroDetail.src} alt={imageLibrary.heroDetail.alt} />
              </figure>
            </div>
          </div>

          <div className="home-hero__copy">
            <p className="home-hero__lead" data-intro>
              Fine tattoo work in Abuja, with lash appointments, beauty education, and selected online programs
              by Angel Zino.
            </p>

            <div className="home-hero__actions" data-intro>
              <a className="button" href={contactLinks.booking} target="_blank" rel="noreferrer">
                Book Appointment
              </a>
              <Link className="button button--ghost" to="/about">
                Meet Angel
              </Link>
            </div>
          </div>

        </div>
      </section>

      <section className="precision" aria-labelledby="precision-title">
        <div className="precision__track">
          <div className="site-shell precision__stage">
            <div className="precision__copy">
              <p className="eyebrow" data-reveal>
                {tattooLane.eyebrow}
              </p>

              <h2 className="section-title section-title--light" id="precision-title" data-reveal>
                Quiet drama, careful hands, and tattoo work that sets the whole tone.
              </h2>

              <p className="precision__lead" data-reveal>
                Angel&apos;s Wink should feel personal before it feels promotional. This opening chapter keeps the
                tattoo side of the brand in full focus: soft authority, clean detail, and a premium Abuja studio
                presence.
              </p>

              <div className="precision__facts" data-reveal>
                <span>{tattooLane.format}</span>

                <ul>
                  {tattooLane.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="precision__visual" aria-hidden="true">
              <figure className="precision__image precision__image--base">
                <img src={imageLibrary.precisionStill.src} alt={imageLibrary.precisionStill.alt} />
              </figure>

              <figure className="precision__image precision__image--reveal">
                <img src={imageLibrary.precisionReveal.src} alt={imageLibrary.precisionReveal.alt} />
              </figure>
            </div>
          </div>
        </div>
      </section>

      <section className="worlds" id="worlds">
        <div className="worlds__track">
          <div className="site-shell worlds__stage">
            <div className="worlds__collage" aria-hidden="true">
              <figure className="worlds__tile worlds__tile--one">
                <img src={imageLibrary.collageOne.src} alt={imageLibrary.collageOne.alt} />
              </figure>
              <figure className="worlds__tile worlds__tile--two">
                <img src={imageLibrary.collageTwo.src} alt={imageLibrary.collageTwo.alt} />
              </figure>
              <figure className="worlds__tile worlds__tile--three">
                <img src={imageLibrary.collageThree.src} alt={imageLibrary.collageThree.alt} />
              </figure>
              <figure className="worlds__tile worlds__tile--four">
                <img src={imageLibrary.collageFour.src} alt={imageLibrary.collageFour.alt} />
              </figure>
              <figure className="worlds__tile worlds__tile--five">
                <img src={imageLibrary.collageFive.src} alt={imageLibrary.collageFive.alt} />
              </figure>
              <div className="worlds__veil" />
            </div>

            <div className="worlds__headline">
              <p className="eyebrow eyebrow--soft">The rest of the brand</p>
              <h2 className="section-title section-title--light">
                Lashes, education, digital growth, and wellness should arrive like connected worlds, not scattered
                side hustles.
              </h2>
            </div>
          </div>
        </div>

        <div className="site-shell worlds__lanes">
          {serviceLanes.map((lane, index) => (
            <article
              key={lane.id}
              className={`lane ${index === 0 ? "lane--featured" : ""}`}
              data-reveal
            >
              <div className="lane__index">0{index + 1}</div>

              <div className="lane__body">
                <p className="eyebrow">{lane.eyebrow}</p>
                <h3>{lane.title}</h3>
                <span className="lane__format">{lane.format}</span>
                <p>{lane.copy}</p>

                <ul className="lane__items">
                  {lane.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="voices" id="voices">
        <div className="site-shell voices__intro" data-reveal>
          <p className="eyebrow">Client voices</p>
          <h2 className="section-title section-title--light">
            The page still has to convert. Motion means nothing if trust is missing.
          </h2>
        </div>

        <div className="site-shell voices__grid">
          <div className="voices__visual" aria-hidden="true">
            <span className="voices__orb" />

            <figure className="voices__image voices__image--1">
              <img src={imageLibrary.voiceOne.src} alt={imageLibrary.voiceOne.alt} />
            </figure>

            <figure className="voices__image voices__image--2">
              <img src={imageLibrary.voiceTwo.src} alt={imageLibrary.voiceTwo.alt} />
            </figure>

            <figure className="voices__image voices__image--3">
              <img src={imageLibrary.voiceThree.src} alt={imageLibrary.voiceThree.alt} />
            </figure>
          </div>

          <div className="voices__stack">
            {testimonials.map((testimonial, index) => (
              <article key={testimonial.name} className={`voice voice--${index + 1}`}>
                <p className="voice__label">{testimonial.title}</p>
                <blockquote className="voice__quote">&ldquo;{testimonial.quote}&rdquo;</blockquote>
                <div className="voice__meta">
                  <strong>{testimonial.name}</strong>
                  <span>{testimonial.title}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="next-chapter">
        <div className="site-shell next-chapter__panel" data-reveal>
          <p className="eyebrow">Next page</p>

          <Link className="next-chapter__title" to="/about">
            About Me
          </Link>

          <p className="next-chapter__body">
            Step into Angel Zino&apos;s placeholder story, working philosophy, and the founder point of view behind
            Angel&apos;s Wink.
          </p>

          <div className="next-chapter__footer">
            <a className="button button--ghost" href={contactLinks.booking} target="_blank" rel="noreferrer">
              Book the brand directly
            </a>
            <span className="next-chapter__direction">Enter</span>
          </div>
        </div>
      </section>
    </>
  );
}
