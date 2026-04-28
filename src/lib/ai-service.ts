/**
 * AI Service — modular adapter for LLM providers.
 *
 * Swap OPENAI_API_KEY in .env.local and adjust the `callLLM` function
 * to switch between OpenAI, Anthropic, Mistral, or any provider.
 */

const OPENAI_API_KEY = process.env.OPENAI_API_KEY ?? "sk-placeholder-key";
const OPENAI_MODEL = process.env.OPENAI_MODEL ?? "gpt-4o-mini";
const OPENAI_BASE_URL =
  process.env.OPENAI_BASE_URL ?? "https://api.openai.com/v1";

export interface OptimizeRequest {
  topic: string;
  city: string;
}

export interface OptimizeResult {
  blogPost: string;
  gbpUpdate: string;
  socialCaptions: string[];
}

export async function callLLM(prompt: string): Promise<string> {
  // ---- If no real key, return a rich mock so the UI still works ----
  if (
    OPENAI_API_KEY === "sk-placeholder-key" ||
    OPENAI_API_KEY.startsWith("sk-placeholder")
  ) {
    return mockLLMResponse(prompt);
  }

  const res = await fetch(`${OPENAI_BASE_URL}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: OPENAI_MODEL,
      temperature: 0.7,
      max_tokens: 2048,
      messages: [
        {
          role: "system",
          content:
            "You are a local-SEO expert copywriter. Always return valid JSON when asked.",
        },
        { role: "user", content: prompt },
      ],
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`LLM API error ${res.status}: ${err}`);
  }

  const data = await res.json();
  return data.choices[0].message.content;
}

function mockLLMResponse(prompt: string): string {
  // Extract the city from the prompt for realistic mock data
  const cityMatch = prompt.match(/city:\s*(.+?)(?:\n|$)/i);
  const city = cityMatch ? cityMatch[1].trim() : "Charlotte, NC";

  const topicMatch = prompt.match(/topic:\s*(.+?)(?:\n|$)/i);
  const topic = topicMatch ? topicMatch[1].trim() : "home improvement";

  return JSON.stringify({
    blogPost: `# The Ultimate ${topic} Guide for ${city} Residents\n\n${city} is known for its vibrant community and growing neighborhoods. Whether you're in the heart of the city or settling into the surrounding suburbs, understanding local trends in **${topic}** can give you a major advantage.\n\n## Why ${city} Is the Perfect Place for ${topic}\n\nWith a population that continues to grow year over year, ${city} has become a hub for innovation and opportunity. Local businesses and residents alike are embracing **${topic}** to stay ahead of the curve.\n\n### Key Takeaways for ${city} Locals\n\n- **Local partnerships matter** — connect with ${city}-based experts who understand the area's unique needs.\n- **Seasonal timing** — ${city}'s climate and event calendar create perfect windows for ${topic} initiatives.\n- **Community engagement** — tap into ${city}'s active social scene and neighborhood groups for organic reach.\n\n## Getting Started in ${city}\n\nReady to dive into **${topic}**? Start by exploring local resources right here in ${city}. From community workshops to neighborhood meetups, there's no shortage of ways to get involved.\n\n> *"${city} has everything you need to succeed — you just have to know where to look."*\n\n**Need help with ${topic} in ${city}?** Contact a local expert today and see what's possible for your business or home.\n\n---\n*Published for the ${city} community by CityPulse AI.*`,

    gbpUpdate: `🏙️ Exciting news for ${city}! We just published our latest guide on ${topic} tailored specifically for our local community. Whether you're a long-time resident or new to the area, this resource is packed with actionable tips. Check the link in our profile to read the full article! #${city.replace(/[, \s]+/g, "")} #LocalBusiness #${topic.replace(/\s+/g, "")}`,

    socialCaptions: [
      `🌟 Attention ${city} residents! Our new guide on ${topic} is LIVE. We break down exactly what works for local businesses & homeowners in our area. Link in bio 👆 #${city.replace(/[, \s]+/g, "")} #LocalSEO #${topic.replace(/\s+/g, "")}`,
      `Did you know? ${city} is one of the fastest-growing markets for ${topic}. 📈 We put together a comprehensive guide with local insights you won't find anywhere else. Tap the link to level up! #${city.replace(/[, \s]+/g, "")}Life #CommunityFirst`,
      `💡 Pro tip for ${city} businesses: ${topic} isn't one-size-fits-all. What works in other cities might not work here. That's why we created a hyper-local guide just for our community. Read it now → link in bio #Support${city.replace(/[, \s]+/g, "")} #LocalExpert`,
    ],
  });
}

export function buildPrompt(req: OptimizeRequest): string {
  return `You are a local-SEO content expert. Given the following topic and target city, produce a JSON object with these exact keys:

1. "blogPost" — a 400-600 word SEO-optimized blog post in Markdown. Naturally include the city name, local landmarks, and geo-specific long-tail keywords. Use H1, H2, and H3 headings.
2. "gbpUpdate" — a Google Business Profile post (max 300 chars) with emojis and 2-3 relevant local hashtags.
3. "socialCaptions" — an array of exactly 3 social media captions (each ≤280 chars) optimized for engagement, with local hashtags.

Topic: ${req.topic}
City: ${req.city}

Return ONLY valid JSON — no markdown fences, no extra text.`;
}
