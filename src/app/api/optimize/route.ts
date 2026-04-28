import { NextRequest, NextResponse } from "next/server";
import { callLLM, buildPrompt, type OptimizeResult } from "@/lib/ai-service";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { topic, city } = body as { topic: string; city: string };

    if (!topic?.trim()) {
      return NextResponse.json(
        { error: "Topic is required." },
        { status: 400 }
      );
    }
    if (!city?.trim()) {
      return NextResponse.json(
        { error: "City is required." },
        { status: 400 }
      );
    }

    const prompt = buildPrompt({ topic: topic.trim(), city: city.trim() });
    const raw = await callLLM(prompt);

    let result: OptimizeResult;
    try {
      result = JSON.parse(raw);
    } catch {
      return NextResponse.json(
        { error: "Failed to parse AI response." },
        { status: 502 }
      );
    }

    if (!result.blogPost || !result.gbpUpdate || !result.socialCaptions) {
      return NextResponse.json(
        { error: "Incomplete AI response." },
        { status: 502 }
      );
    }

    return NextResponse.json(result);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Optimize API error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
