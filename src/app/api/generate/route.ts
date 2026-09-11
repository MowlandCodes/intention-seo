import { seoPlanSchema } from "@/schemas/ai";
import { fetchSerp, SerpResult } from "@/utils/ai";
import { GoogleGenAI, ThinkingLevel } from "@google/genai";
import { NextResponse } from "next/server";

if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(request: Request) {
  let serp: SerpResult = {
    organicResults: [],
    peopleAlsoAsk: [],
    relatedSearches: [],
  };

  try {
    const { keyword: rawKeyword } = (await request.json()) as {
      keyword: string;
    };

    if (!rawKeyword || typeof rawKeyword !== "string") {
      return NextResponse.json(
        { status: "failure", message: "Invalid keyword", data: null },
        { status: 400 },
      );
    }

    const keyword = rawKeyword.trim();

    const SYSTEM_PROMPT = `You are Intention-AI, a professional & elite SEO Strategist and Content Intelligence Engine. Your task is to analyze a given keyword rigorously and produce a high-quality and high-value ACTIONABLE SEO Content Strategy & Insights. ALWAYS adhere STRICTLY to the requested JSON Structure and NEVER deviate from it.`;

    // Fetch Real-time SERP (Search Engine Results Page / Google Search) Data
    serp = await fetchSerp(keyword);
    const enrichedPrompt = `Analyze this keyword: "${keyword}".
      Current live Google SERP data (treat this as ground truth for what's actually ranking today, don't rely only on prior knowledge):

      Top Ranking Pages:
      ${serp.organicResults.map((res, i) => `${i + 1}. "${res.title}" -> (${res.url})\n\tSnippet: ${res.snippet}`).join("\n")}

      People Also Ask:
      ${serp.peopleAlsoAsk.map((q, i) => `${i + 1}. ${q}`).join("\n")}

      Related Searches:
      ${serp.relatedSearches.join(", ")}

      Produce a full SEO Content Strategy & Insights that accounts for what's currently ranking, calls out content gaps versus these competitors, and reflects genuinely current search intent.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: enrichedPrompt,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        responseMimeType: "application/json",
        responseSchema: seoPlanSchema,
        thinkingConfig: { thinkingLevel: ThinkingLevel.MEDIUM },
      },
    });

    if (!response.text) {
      return NextResponse.json(
        { status: "failure", message: "No response from AI", data: null },
        { status: 500 },
      );
    }

    const parsedResponse = JSON.parse(response.text);
    return NextResponse.json(
      {
        status: "success",
        message: "AI response received",
        data: parsedResponse,
      },
      { status: 200 },
    );
  } catch (err) {
    console.error(`[INTENTION_API_ERROR]: ${err}`);
    return NextResponse.json(
      { status: "failure", message: "Internal server error", data: null },
      { status: 500 },
    );
  }
}
