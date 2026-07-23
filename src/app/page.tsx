import FeedSection from "./FeedSection";
import { fetchFeedEntries } from "./lib/feed";

export default async function Home() {
  const entries = await fetchFeedEntries();

  return (
    <>
      <header className="bar">
        <div className="bar-in">
          <span className="logo">
            <img src="/bpc157-mark.svg" alt="BPC-157" className="chip" />
            <b>
              BPC<span className="accent">-157</span>.LAB
            </b>
          </span>
          <nav className="top" aria-label="Primary">
            <a href="#feed">FEED</a>
            <a href="#trending">TRENDING</a>
            <a href="#facts">FACTS</a>
          </nav>
          <span className="status">
            <span className="dot" aria-hidden="true" />
            <span className="txt">SYS://ONLINE</span>
          </span>
        </div>
      </header>

      <main>
        {/* HERO */}
        <div className="hero">
          <div className="wrap">
            <span className="eyebrow">▓ SPECIMEN LOGGED ▓ PEPTIDE INTEL FEED</span>
            <div className="specimen">
              <div className="left">
                <h1>BPC-157</h1>
                <div className="subtitle">
                  Synthetic <span className="b4">gastric pentadecapeptide</span> · specimen
                  readout
                </div>
                <div className="readout" role="table" aria-label="BPC-157 specimen readout">
                  <div className="row">
                    <span className="k">CLASS</span>
                    <span className="v">Synthetic peptide · 15 aa</span>
                  </div>
                  <div className="row">
                    <span className="k">DERIVED FROM</span>
                    <span className="v">Protein in gastric juice</span>
                  </div>
                  <div className="row">
                    <span className="k">STUDIED FOR</span>
                    <span className="v ok">Gut healing · tendon/ligament · angiogenesis</span>
                  </div>
                  <div className="row">
                    <span className="k">HUMAN USE</span>
                    <span className="v warn">Not FDA-approved · compounding under review</span>
                  </div>
                  <div className="row">
                    <span className="k">SPORT STATUS</span>
                    <span className="v hot">WADA prohibited · S0</span>
                  </div>
                </div>
              </div>
              <div className="right">
                <span className="scan-label">◤ UV SCAN — GEPPPGKPADDAGLV</span>
                <div className="scan-stage">
                  <div className="scan-line" aria-hidden="true" />
                  <svg
                    className="peptide"
                    viewBox="0 0 220 120"
                    role="img"
                    aria-label="Pixel-art peptide chain"
                  >
                    <g shapeRendering="crispEdges">
                      <rect x="14" y="58" width="192" height="4" fill="#2f8f66" />
                      <g fill="#66ffab">
                        <rect x="10" y="46" width="20" height="20" />
                        <rect x="46" y="30" width="20" height="20" />
                        <rect x="82" y="54" width="20" height="20" />
                        <rect x="118" y="34" width="20" height="20" />
                        <rect x="154" y="58" width="20" height="20" />
                        <rect x="188" y="40" width="20" height="20" />
                      </g>
                      <g fill="#ff5cae">
                        <rect x="52" y="16" width="8" height="8" />
                        <rect x="124" y="20" width="8" height="8" />
                      </g>
                      <g fill="#ffcf3f">
                        <rect x="16" y="70" width="8" height="8" />
                        <rect x="160" y="82" width="8" height="8" />
                      </g>
                    </g>
                  </svg>
                </div>
                <div className="caution">⚠ RESEARCH COMPOUND — NOT FOR HUMAN USE ⚠</div>
              </div>
            </div>
          </div>
        </div>

        <FeedSection entries={entries} />

        {/* FACTS */}
        <section id="facts">
          <div className="wrap">
            <div className="sec-head">
              <h2>
                <span className="n">03</span> FACT BANK
              </h2>
              <span className="line" />
            </div>
            <div className="facts">
              <div className="fact">
                <div className="q">WHAT IS IT?</div>
                <p>
                  A synthetic 15-amino-acid peptide — a &quot;pentadecapeptide&quot; — based on a
                  protective compound found in human gastric juice.
                </p>
              </div>
              <div className="fact">
                <div className="q">HOW IS IT STUDIED?</div>
                <p>
                  Mostly in animal models: stomach and gut-lining healing, tendon, ligament,
                  muscle and bone repair, and blood-vessel growth.
                </p>
              </div>
              <div className="fact">
                <div className="q">MECHANISM</div>
                <p>
                  Linked to angiogenesis, growth-factor signalling and the nitric-oxide system —
                  associated with faster tissue repair in models.
                </p>
              </div>
              <div className="fact">
                <div className="q">SEQUENCE</div>
                <p>
                  GEPPPGKPADDAGLV — fifteen residues. Marketed as a stable &quot;Body Protection
                  Compound,&quot; which is where the BPC name comes from.
                </p>
              </div>
              <div className="fact">
                <div className="q">LEGAL STATUS</div>
                <p>
                  Not FDA-approved. Sold as a research chemical; its US compounding status is
                  under active FDA review (PCAC, Jul 2026).
                </p>
              </div>
              <div className="fact">
                <div className="q">IN SPORT</div>
                <p>
                  Banned by WADA under S0 (non-approved substances) — prohibited at all times, in
                  and out of competition.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap">
          <div className="disc">
            <b>⚠ DISCLAIMER</b>
            This site aggregates research and factual information about BPC-157 for educational
            and scientific reference only. It is not medical advice and not a recommendation for
            use. BPC-157 is not an approved human therapeutic. Always consult primary literature
            and qualified professionals.
          </div>
          <div className="foot-meta">
            <span>
              BPC-157.LAB — peptide research intel<span className="cursor">▮</span>
            </span>
            <span className="pixel">LIVE FEED · EUROPE PMC</span>
          </div>
        </div>
      </footer>
    </>
  );
}
