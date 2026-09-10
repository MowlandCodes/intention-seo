import { Type, Schema } from "@google/genai";

export const seoPlanSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    searchIntent: {
      type: Type.STRING,
      enum: ["Informational", "Commercial", "Transactional", "Navigational"],
    },
    targetAudience: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "At least 1 search engine optimized target audiences",
    },
    seoTitles: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "5 catchy, click-worthy, and SEO-friendly article titles",
      minItems: "5",
      maxItems: "5",
    },
    metaTags: {
      type: Type.OBJECT,
      properties: {
        title: {
          type: Type.STRING,
          description: "Optimal Meta Title (under 60 chars)",
        },
        description: {
          type: Type.STRING,
          description: "Optimal Meta Description (under 160 chars)",
        },
      },
      required: ["title", "description"],
    },
    relatedKeywords: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "List of 5-8 related long-tail keywords",
      minItems: "5",
      maxItems: "8",
    },
    contentOutline: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          level: {
            type: Type.STRING,
            enum: ["H2", "H3"],
          },
          heading: {
            type: Type.STRING,
            description: "Heading text only, no level prefix",
          },
          points: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Bullet points for this section",
          },
        },
        required: ["level", "heading", "points"],
        propertyOrdering: ["level", "heading", "points"],
      },
      description: "Structured article outline",
    },
    contentGapAnalysis: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description:
        "Specific topics, subtopics, or angles the current top-ranking pages cover that this content should address to compete",
    },
  },
  required: [
    "searchIntent",
    "targetAudience",
    "seoTitles",
    "metaTags",
    "relatedKeywords",
    "contentOutline",
    "contentGapAnalysis",
  ],
};
