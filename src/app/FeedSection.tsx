"use client";

import { useMemo, useState } from "react";
import { FeedEntry, FeedTag, TAG_INFO } from "./lib/feed";

export default function FeedSection({ entries }: { entries: FeedEntry[] }) {
  const [active, setActive] = useState<FeedTag | null>(null);

  const counts = useMemo(() => {
    const c: Partial<Record<FeedTag, number>> = {};
    entries.forEach((e) => {
      c[e.tag] = (c[e.tag] ?? 0) + 1;
    });
    return c;
  }, [entries]);

  const rows = active ? entries.filter((e) => e.tag === active) : entries;

  return (
    <>
      {/* TRENDING */}
      <section id="trending">
        <div className="wrap">
          <div className="sec-head">
            <h2>
              <span className="n">01</span> TRENDING TOPICS
            </h2>
            <span className="line" />
          </div>
          <div className="vials" role="group" aria-label="Filter feed by topic">
            {(Object.keys(TAG_INFO) as FeedTag[]).map((tag) => {
              const info = TAG_INFO[tag];
              const isActive = active === tag;
              return (
                <button
                  key={tag}
                  className={`vial${isActive ? " active" : ""}`}
                  aria-pressed={isActive}
                  onClick={() => setActive(isActive ? null : tag)}
                >
                  <div className="tag">{info.label}</div>
                  <div className="cnt">{counts[tag] ?? 0} entries</div>
                  <div className="heat">
                    <i style={{ width: `${Math.round(info.heat * 100)}%` }} />
                  </div>
                </button>
              );
            })}
          </div>
          <div className="filter-note">
            {active ? (
              <>
                Showing {rows.length} entries in {TAG_INFO[active].label} ·{" "}
                <button onClick={() => setActive(null)}>clear filter</button>
              </>
            ) : (
              "Tap a topic above to filter the feed."
            )}
          </div>
        </div>
      </section>

      {/* FEED */}
      <section id="feed">
        <div className="wrap">
          <div className="sec-head">
            <h2>
              <span className="n">02</span> RESEARCH FEED
            </h2>
            <span className="line" />
          </div>
          <div className="feed">
            {rows.map((e, i) => (
              <a
                key={`${e.link}-${i}`}
                className={`entry t-${e.tag}`}
                href={e.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="meta">
                  <span className="ts">{e.date}</span>
                  <span className="chip">{TAG_INFO[e.tag].label}</span>
                </div>
                <h3>{e.title}</h3>
                <p>{e.body}</p>
                <span className="src">{e.src}</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
