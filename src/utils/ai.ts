const SERPER_API_KEY = process.env.SERPER_API_KEY!;
const SERPER_URL = "https://google.serper.dev/search";

if (!SERPER_API_KEY) {
  throw new Error("SERPER_API_KEY is not set");
}

interface OrganicResult {
  title: string;
  url: string;
  snippet: string;
}

export interface SerpResult {
  organicResults: OrganicResult[];
  peopleAlsoAsk: string[];
  relatedSearches: string[];
}

export async function fetchSerp(keyword: string): Promise<SerpResult> {
  try {
    const res = await fetch(SERPER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": SERPER_API_KEY,
      },
      body: JSON.stringify({ q: keyword }),
      signal: AbortSignal.timeout(1000 * 10), // 10 seconds timeout
    });

    const data = await res.json();

    return {
      organicResults: (data.organic ?? [])
        .slice(0, 8)
        .map((r: { title: string; link: string; snippet: string }) => ({
          title: r.title,
          url: r.link,
          snippet: r.snippet,
        })),
      peopleAlsoAsk: (data.peopleAlsoAsk ?? []).map(
        (p: { question: string }) => p.question,
      ),
      relatedSearches: (data.relatedSearches ?? []).map(
        (r: { query: string }) => r.query,
      ),
    };
  } catch (err) {
    if (err instanceof Error) {
      const error =
        err.name === "TimeoutError"
          ? new Error("Request Timed Out")
          : new Error(err.message);

      throw error;
    }
    throw new Error("An unknown error occurred", { cause: err });
  }
}
