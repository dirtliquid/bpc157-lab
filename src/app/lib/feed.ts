export type FeedTag = "gut" | "repair" | "doping" | "safety";

export type FeedEntry = {
  date: string;
  tag: FeedTag;
  title: string;
  body: string;
  src: string;
  link: string;
};

export const TAG_INFO: Record<FeedTag, { label: string; heat: number }> = {
  gut: { label: "GI / GUT-REPAIR", heat: 0.95 },
  repair: { label: "TENDON / TISSUE", heat: 0.82 },
  doping: { label: "ANTI-DOPING", heat: 0.6 },
  safety: { label: "SAFETY / LEGAL", heat: 0.55 },
};

const EUROPE_PMC_URL =
  "https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=%22BPC-157%22%20OR%20%22BPC%20157%22%20OR%20%22body%20protection%20compound%22&format=json&resultType=core&pageSize=24&sort=P_PDATE_D%20desc";

function decodeEntities(text: string): string {
  return text
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&");
}

function stripTags(text: string): string {
  return text.replace(/<[^>]*>/g, "");
}

function cleanText(text: string | undefined): string {
  if (!text) return "";
  return stripTags(decodeEntities(text)).replace(/\s+/g, " ").trim();
}

function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : max)}…`;
}

function scanTag(text: string): FeedTag {
  const t = text.toLowerCase();
  if (/gut|gastric|ulcer|intestin|colitis/.test(t)) return "gut";
  if (/dop|wada|anti-doping/.test(t)) return "doping";
  if (/safety|adverse|toxic|purity/.test(t)) return "safety";
  return "repair";
}

function formatDate(raw: string | undefined, fallbackYear: string | undefined): string {
  if (raw) return raw.replace(/-/g, ".");
  if (fallbackYear) return fallbackYear;
  return "";
}

type EuropePmcResult = {
  id: string;
  source: string;
  title: string;
  abstractText?: string;
  firstPublicationDate?: string;
  pubYear?: string;
  journalInfo?: { journal?: { title?: string } };
};

export const SEED_ENTRIES: FeedEntry[] = [
  {
    date: "2026.07.19",
    tag: "gut",
    title: "Gut-lining repair remains BPC-157's most-studied effect",
    body: "The peptide was first isolated from gastric juice; stomach-ulcer and GI-tract healing dominate its preclinical literature.",
    src: "topic: gut-healing",
    link: "https://europepmc.org/search?query=BPC-157",
  },
  {
    date: "2026.07.14",
    tag: "repair",
    title: "Tendon and ligament healing lead injury-recovery research",
    body: "Rodent studies of tendon-to-bone, ligament and muscle healing drive much of the athlete interest in BPC-157.",
    src: "topic: tendon-repair",
    link: "https://europepmc.org/search?query=BPC-157",
  },
  {
    date: "2026.07.10",
    tag: "safety",
    title: "US compounding status under active FDA review",
    body: "BPC-157 is being weighed for the 503A compounding bulks list at an FDA advisory committee, after years in a restricted category.",
    src: "topic: fda-compounding",
    link: "https://europepmc.org/search?query=BPC-157",
  },
  {
    date: "2026.07.05",
    tag: "doping",
    title: "WADA keeps BPC-157 prohibited under S0 for 2026",
    body: "The 2026 Prohibited List, effective January, keeps BPC-157 banned at all times as a non-approved substance.",
    src: "topic: anti-doping",
    link: "https://europepmc.org/search?query=BPC-157",
  },
  {
    date: "2026.06.27",
    tag: "gut",
    title: "Gut-brain axis and inflammation draw fresh attention",
    body: "Research continues to explore signalling links between the gut, nervous system and inflammatory pathways.",
    src: "topic: gut-brain",
    link: "https://europepmc.org/search?query=BPC-157",
  },
  {
    date: "2026.06.18",
    tag: "repair",
    title: "Angiogenesis and nitric-oxide system framed as repair engine",
    body: "Mechanistic work centres on new blood-vessel growth and NO signalling as the basis for tissue-repair effects.",
    src: "topic: angiogenesis",
    link: "https://europepmc.org/search?query=BPC-157",
  },
  {
    date: "2026.06.09",
    tag: "safety",
    title: "Long-term human safety data still absent",
    body: "No controlled human trials establish BPC-157's safety or efficacy; nearly all evidence remains preclinical.",
    src: "topic: clinical-gap",
    link: "https://europepmc.org/search?query=BPC-157",
  },
  {
    date: "2026.05.30",
    tag: "safety",
    title: "Grey-market purity and identity stay unverified",
    body: "With no approved label or standard, whether 'research' BPC-157 matches the studied peptide is frequently unconfirmed.",
    src: "topic: quality-control",
    link: "https://europepmc.org/search?query=BPC-157",
  },
];

export async function fetchFeedEntries(): Promise<FeedEntry[]> {
  try {
    const res = await fetch(EUROPE_PMC_URL, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error(`Europe PMC responded ${res.status}`);

    const data = await res.json();
    const results: EuropePmcResult[] = data?.resultList?.result ?? [];

    if (results.length === 0) return SEED_ENTRIES;

    return results.map((r) => {
      const title = cleanText(r.title);
      const abstract = cleanText(r.abstractText);
      const journal = r.journalInfo?.journal?.title;

      return {
        date: formatDate(r.firstPublicationDate, r.pubYear),
        tag: scanTag(`${title} ${abstract}`),
        title,
        body: truncate(abstract, 220),
        src: journal ? `${journal} · ${r.pubYear ?? ""}`.trim() : `Europe PMC · ${r.pubYear ?? ""}`,
        link: `https://europepmc.org/article/${r.source}/${r.id}`,
      };
    });
  } catch {
    return SEED_ENTRIES;
  }
}
