export function Preloader({ visible }) {
  return (
    <div className={`preloader ${visible ? "preloader--visible" : "preloader--hidden"}`} aria-hidden={!visible}>
      <span className="preloader__panel preloader__panel--top" />
      <span className="preloader__panel preloader__panel--bottom" />
      <div className="preloader__inner">
        <p className="preloader__eyebrow">Angel Zino • Abuja</p>
        <div className="preloader__name" aria-label="Angel's Wink">
          <span className="preloader__line">ANGEL'S</span>
          <span className="preloader__line preloader__line--accent">WINK</span>
        </div>
        <p className="preloader__caption">Tattoo-led beauty, training, growth, and wellness.</p>
      </div>
    </div>
  );
}
