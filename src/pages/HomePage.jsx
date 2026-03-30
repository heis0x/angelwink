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

function LetterSplit({ text, className }) {
  return (
    <span className={className} aria-label={text}>
      {text.split("").map((char, i) => (
        <span className="letter-ct" key={i} aria-hidden="true">
          <span>{char === " " ? "\u00A0" : char}</span>
        </span>
      ))}
    </span>
  );
}

function useHomeMotion() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      return undefined;
    }

    const media = gsap.matchMedia();
    const ctx = gsap.context(() => {
      const letters = gsap.utils.toArray(".home-hero__title .letter-ct span");
      if (letters.length) {
        gsap.fromTo(
          letters,
          { y: "5.21rem", autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 1.5,
            ease: "cubic-bezier(0, 0, 0.08, 0.97)",
            stagger: 0.05,
          },
        );
      }

      gsap.fromTo(
        [".hero-stage__foliage", ".hero-stage__portrait"],
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
        const dir = element.dataset.reveal || "up";
        const from = { autoAlpha: 0 };
        if (dir === "left") {
          from.x = "-5.21rem";
        } else if (dir === "right") {
          from.x = "5.21rem";
        } else {
          from.y = 44;
        }

        gsap.fromTo(element, from, {
          x: 0,
          y: 0,
          autoAlpha: 1,
          duration: 0.95,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            once: true,
          },
        });
      });

      media.add("(min-width: 960px)", () => {
        const heroLetters = gsap.utils.toArray(".home-hero__title .letter-ct span");
        if (heroLetters.length) {
          gsap.fromTo(
            heroLetters,
            {
              rotationY: 70,
              transformOrigin: "left center",
              z: 32,
              x: 80,
            },
            {
              rotationY: 0.01,
              z: 0,
              x: 0,
              duration: 1.5,
              ease: "cubic-bezier(0, 0, 0.08, 0.97)",
              stagger: 0.05,
            },
          );
        }

        gsap.timeline({
          scrollTrigger: {
            trigger: ".home-hero",
            start: "top top",
            end: "bottom top",
            scrub: 1.1,
          },
        })
          .to(".hero-stage__portrait", { y: "15vh", scale: 1.2, ease: "none" }, 0)
          .to(".hero-stage__foliage--left", { y: "13vh", scale: 1.1, ease: "none" }, 0)
          .to(".hero-stage__foliage--right", { y: "16vh", scale: 1.1, ease: "none" }, 0)
          .to(".hero-stage__bg", { y: "30vh", ease: "none" }, 0);

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
            { clipPath: "inset(100% 0 0 0 round 2rem)", scale: 1.5 },
            { clipPath: "inset(0% 0 0 0 round 2rem)", scale: 1, ease: "none" },
            0,
          )
          .to(
            ".precision__image--base",
            { clipPath: "inset(0 0 100% 0 round 2rem)", scale: 1.5, ease: "none" },
            0,
          );

        const galleryLetters = gsap.utils.toArray(".worlds__overlay-text .letter-ct span");
        const worldsTl = gsap.timeline({
          scrollTrigger: {
            trigger: ".worlds__track",
            start: "top top",
            end: "bottom bottom",
            scrub: 1.2,
          },
        });

        worldsTl
          .to(".worlds__tile--one", { autoAlpha: 0, xPercent: -27, yPercent: -27, ease: "none" }, 0)
          .to(".worlds__tile--two", { autoAlpha: 0, xPercent: 27, yPercent: -27, ease: "none" }, 0)
          .to(".worlds__tile--four", { autoAlpha: 0, xPercent: -27, yPercent: 27, ease: "none" }, 0)
          .to(".worlds__tile--five", { autoAlpha: 0, xPercent: 27, yPercent: 27, ease: "none" }, 0)
          .to(".worlds__tile--three", { yPercent: 8, scale: 3.35, ease: "none" }, 0)
          .to(".worlds__veil", { opacity: 0.72, ease: "none" }, 0);

        if (galleryLetters.length) {
          galleryLetters.forEach((letter, i) => {
            worldsTl.fromTo(
              letter,
              { rotationY: 90, autoAlpha: 0, x: 80 },
              { rotationY: 0, autoAlpha: 1, x: 0, ease: "none", duration: 0.12 },
              0.35 + i * 0.02,
            );
          });
        }

        worldsTl.fromTo(
          ".worlds__headline",
          { autoAlpha: 0, y: 32 },
          { autoAlpha: 1, y: 0, ease: "none" },
          0.42,
        );

        gsap.fromTo(
          ".voices__image--2",
          { clipPath: "inset(100% 0 0 0 round 2rem)", scale: 1.2 },
          {
            clipPath: "inset(0% 0 0 0 round 2rem)",
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: ".voice-card--2",
              start: "top bottom",
              end: "50% 50%",
              scrub: true,
            },
          },
        );

        gsap.fromTo(
          ".voices__image--3",
          { clipPath: "inset(100% 0 0 0 round 2rem)", scale: 1.2 },
          {
            clipPath: "inset(0% 0 0 0 round 2rem)",
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: ".voice-card--3",
              start: "top bottom",
              end: "50% 50%",
              scrub: true,
            },
          },
        );

        gsap.to(".voices__halfcircle--spin", {
          rotation: 360,
          ease: "none",
          scrollTrigger: {
            trigger: ".voices__reviews",
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
          },
        });
      });

      media.add("(max-width: 959px)", () => {
        gsap.timeline({
          scrollTrigger: {
            trigger: ".home-hero",
            start: "top top",
            end: "70% top",
            scrub: 0.9,
          },
        })
          .to(".hero-stage__portrait", { y: "5vh", scale: 1.05, ease: "none" }, 0)
          .to(".hero-stage__foliage--left", { x: "-4vw", y: "7vh", scale: 1.03, ease: "none" }, 0)
          .to(".hero-stage__foliage--right", { x: "4vw", y: "7vh", scale: 1.03, ease: "none" }, 0);

        gsap.fromTo(
          ".precision__image",
          { y: 30, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.12,
            scrollTrigger: {
              trigger: ".precision__visual",
              start: "top 82%",
              once: true,
            },
          },
        );

        gsap.fromTo(
          ".worlds__tile",
          { y: 26, scale: 0.97, autoAlpha: 0 },
          {
            y: 0,
            scale: 1,
            autoAlpha: 1,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.08,
            scrollTrigger: {
              trigger: ".worlds__collage",
              start: "top 82%",
              once: true,
            },
          },
        );

        gsap.fromTo(
          ".worlds__headline",
          { y: 26, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".worlds__headline",
              start: "top 84%",
              once: true,
            },
          },
        );

        gsap.utils.toArray(".voices__image").forEach((image, index) => {
          gsap.fromTo(
            image,
            { y: 24, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.82,
              ease: "power3.out",
              delay: index * 0.06,
              scrollTrigger: {
                trigger: image,
                start: "top 86%",
                once: true,
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
            <div className="hero-stage__bg" aria-hidden="true" />

            <h1 className="home-hero__title">
              <LetterSplit text="ANGEL'S" className="home-hero__title-line" />
              <LetterSplit text="WINK" className="home-hero__title-line" />
            </h1>

            <div className="hero-stage__visuals" aria-hidden="true">
              <div className="hero-stage__foliage hero-stage__foliage--left" />
              <div className="hero-stage__foliage hero-stage__foliage--right" />

              <figure className="hero-stage__portrait">
                <img src={imageLibrary.heroPortrait.src} alt={imageLibrary.heroPortrait.alt} />
              </figure>
            </div>

            <p className="home-hero__lead" data-intro>
              Private tattoo appointments in Abuja, shaped with a softer hand and a sharper eye.
            </p>

            <div className="scroll-arrow" aria-hidden="true">
              <span className="scroll-arrow__line" />
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

              <h2 className="section-title section-title--light precision__heading" id="precision-title">
                <span data-reveal="right">Private tattoo work</span>
                <span data-reveal="left">with a softer edge and an exacting finish.</span>
              </h2>

              <p className="precision__lead" data-reveal>
                Tattoo artistry leads the house. The first impression should feel calm, precise, and quietly elevated,
                with the Abuja studio experience setting the tone for everything else that follows.
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
              <svg className="precision__circle" viewBox="0 0 1080 1080" fill="none">
                <circle cx="540" cy="540" r="538" stroke="#606060" strokeWidth="1" />
              </svg>

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

              <div className="worlds__overlay-text" aria-hidden="true">
                <LetterSplit text="Beyond" className="worlds__overlay-line" />
                <LetterSplit text="the" className="worlds__overlay-line" />
                <LetterSplit text="chair" className="worlds__overlay-line" />
              </div>
            </div>

            <div className="worlds__headline">
              <p className="eyebrow eyebrow--soft">Further inside</p>
              <h2 className="section-title section-title--light">Beyond the chair.</h2>
              <p className="worlds__body">
                Lashes, education, digital strategy, and wellness sit under the same founder-led standard.
              </p>
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
          <h2 className="section-title section-title--light voices__heading">
            <span data-reveal="left">Words</span>
            <span data-reveal="right">from the chair.</span>
          </h2>
        </div>

        <div className="site-shell voices__reviews">
          <div className="voices__img-col" aria-hidden="true">
            <span className="voices__orb" />

            <div className="voices__halfcircles">
              <svg className="voices__halfcircle" viewBox="0 0 630 630" fill="none">
                <circle cx="315" cy="315" r="314" stroke="#606060" strokeWidth="1" />
              </svg>
              <svg className="voices__halfcircle voices__halfcircle--spin" viewBox="0 0 630 630" fill="none">
                <circle cx="315" cy="315" r="314" stroke="#606060" strokeWidth="1" />
              </svg>
            </div>

            <div className="voices__frame">
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
          </div>

          <div className="voices__text-col">
            {testimonials.map((testimonial, index) => (
              <article key={testimonial.name} className={`voice-card voice-card--${index + 1}`}>
                <p className="voice-card__label">{testimonial.title}</p>
                <blockquote className="voice-card__quote">&ldquo;{testimonial.quote}&rdquo;</blockquote>
                <div className="voice-card__meta">
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
