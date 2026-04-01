import { useState } from "react";

const messages = [
  "This pairing has main-character energy and a suspiciously high sparkle factor.",
  "The chemistry report says things are looking sweet, flirty, and just dramatic enough.",
  "Romantic signals are strong. Someone should probably queue a playlist immediately.",
  "There is serious cute-couple potential here, with a side of chaotic charm.",
  "The stars are amused, the hearts are aligned, and the vibes are working overtime.",
  "This match is serving soft-launch energy with a very convincing happy ending."
];

const navItems = [
  {
    label: "Home",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-4.5v-6h-5v6H5a1 1 0 0 1-1-1z" />
      </svg>
    )
  },
  {
    label: "Puzzles",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7 4h10a2 2 0 0 1 2 2v12.5a1.5 1.5 0 0 1-2.38 1.22L12 16.5l-4.62 3.22A1.5 1.5 0 0 1 5 18.5V6a2 2 0 0 1 2-2z" />
      </svg>
    )
  },
  {
    label: "Fun Tools",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3a2.5 2.5 0 0 1 2.45 3h1.3a2.75 2.75 0 0 1 2.75 2.75V10h.5A2.5 2.5 0 0 1 21.5 12.5v.1A2.4 2.4 0 0 1 19.1 15H18v1.25A2.75 2.75 0 0 1 15.25 19H14v.5a2.5 2.5 0 0 1-5 0V19H7.75A2.75 2.75 0 0 1 5 16.25V15H4.9a2.4 2.4 0 0 1-2.4-2.4v-.1A2.5 2.5 0 0 1 5 10h.5V8.75A2.75 2.75 0 0 1 8.25 6h1.3A2.5 2.5 0 0 1 12 3z" />
      </svg>
    )
  },
  {
    label: "About",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18zm0 4a1.25 1.25 0 1 0 0 2.5A1.25 1.25 0 0 0 12 7zm-2 5v1.5h1v3h2v-4.5z" />
      </svg>
    )
  }
];

function sleep(ms) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

function randomPercentage() {
  return Math.floor(Math.random() * 51) + 50;
}

function randomMessage() {
  return messages[Math.floor(Math.random() * messages.length)];
}

export default function App() {
  const [yourName, setYourName] = useState("");
  const [partnerName, setPartnerName] = useState("");
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();

    const cleanYourName = yourName.trim();
    const cleanPartnerName = partnerName.trim();

    if (!cleanYourName || !cleanPartnerName || isLoading) {
      return;
    }

    setIsLoading(true);
    setProgress(0);
    setResult(null);

    void fetch("/api/love-log", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        yourName: cleanYourName,
        partnerName: cleanPartnerName,
        consentedAt: new Date().toISOString(),
        source: "HeartSpark Studio"
      })
    }).catch(() => {});

    for (let step = 0; step <= 100; step += 5) {
      setProgress(step);
      await sleep(step < 65 ? 65 : 110);
    }

    setResult({
      score: randomPercentage(),
      pairing: `${cleanYourName} + ${cleanPartnerName}`,
      message: randomMessage()
    });
    setIsLoading(false);
  }

  return (
    <div className="site-shell">
      <header className="topbar">
        <a className="brand" href="/">
          <span className="brand-mark">HS</span>
          <span className="brand-copy">
            <strong>HeartSpark Studio</strong>
            <small>Playful chemistry tools</small>
          </span>
        </a>

        <nav className="main-nav" aria-label="Primary">
          {navItems.map((item) => (
            <a key={item.label} href="/" className="nav-link">
              <span className="nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </a>
          ))}
        </nav>
      </header>

      <main>
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">Romance Lab</p>
            <h1>The internet&apos;s prettiest little love prank.</h1>
            <p className="lede">
              HeartSpark Studio wraps playful compatibility scores in a polished
              magazine-style experience, complete with suspense, charm, and just
              enough drama to make the result feel magical.
            </p>

            <div className="hero-stats" aria-label="Site highlights">
              <article>
                <strong>2.4M+</strong>
                <span>matches explored</span>
              </article>
              <article>
                <strong>18 sec</strong>
                <span>average session thrill</span>
              </article>
              <article>
                <strong>100%</strong>
                <span>for-fun energy</span>
              </article>
            </div>
          </div>

          <section className="calculator-card" aria-labelledby="calculator-title">
            <div className="card-glow" aria-hidden="true"></div>
            <p className="card-kicker">Featured tool</p>
            <h2 id="calculator-title">Love Percentage Meter</h2>
            <p className="card-note">
              Enter two names, tap calculate, and watch the chemistry meter build
              anticipation before it reveals the final score.
            </p>

            <form className="love-form" onSubmit={handleSubmit}>
              <label>
                <span>Your name</span>
                <input
                  type="text"
                  maxLength="40"
                  placeholder="Aarav"
                  value={yourName}
                  onChange={(event) => setYourName(event.target.value)}
                  required
                />
              </label>

              <label>
                <span>Their name</span>
                <input
                  type="text"
                  maxLength="40"
                  placeholder="Maya"
                  value={partnerName}
                  onChange={(event) => setPartnerName(event.target.value)}
                  required
                />
              </label>

              <p className="consent-note">
                By using this prank tool, you agree that entered names may be stored for fun stats.
              </p>

              <button type="submit" className="primary-button" disabled={isLoading}>
                {isLoading ? "Calculating..." : "Calculate Love"}
              </button>
            </form>

            <div className="result-panel" aria-live="polite">
              {(isLoading || result) && (
                <div className="progress-shell">
                  <div className="progress-label">
                    <span>Scanning romantic signals...</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="progress-track" aria-hidden="true">
                    <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                  </div>
                </div>
              )}

              {result && !isLoading && (
                <div className="result-display">
                  <p className="result-tag">Compatibility Result</p>
                  <div className="score-row">
                    <strong>{result.score}%</strong>
                    <span>{result.pairing}</span>
                  </div>
                  <p className="result-message">{result.message}</p>
                </div>
              )}
            </div>
          </section>
        </section>

        <section className="feature-strip">
          <article className="feature-card">
            <h3>Puzzles</h3>
            <p>Mini brain teasers and social games staged like a glossy relationship portal.</p>
          </article>
          <article className="feature-card">
            <h3>Fun Tools</h3>
            <p>Playful score generators, mystery meters, and party-ready interaction hooks.</p>
          </article>
          <article className="feature-card">
            <h3>About</h3>
            <p>A lighthearted entertainment project designed to feel polished, charming, and believable.</p>
          </article>
        </section>

        <section className="info-section">
          <div>
            <p className="eyebrow">How it works</p>
            <h2>Built to feel real, designed to stay playful.</h2>
          </div>
          <div className="info-copy">
            <p>
              The result uses a randomized score, a timed reveal, and tone-matched
              messages so every check feels suspenseful and different. It is
              intentionally theatrical rather than scientifically meaningful.
            </p>
            <p>
              The page is lightweight, mobile-friendly, and ready for Vercel
              hosting with a serverless endpoint that can forward entries to a
              webhook if you choose to configure one.
            </p>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div>
          <strong>HeartSpark Studio</strong>
          <p>Romantic entertainment, prank tools, and harmless internet fun.</p>
        </div>
        <div className="footer-links">
          <a href="/">Home</a>
          <a href="/">Privacy</a>
          <a href="/">Terms</a>
        </div>
      </footer>
    </div>
  );
}
