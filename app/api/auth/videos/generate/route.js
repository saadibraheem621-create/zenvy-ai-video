import { NextResponse } from "next/server";
import Replicate from "replicate";

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({
        success: false,
        error: "اكتب وصف الفيديو",
      });
    }

    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN,
    });

    const output = await replicate.run(
      "kwaivgi/kling-v1.6-standard",
      {
        input: {
          prompt,
          duration: 5,
          aspect_ratio: "16:9",
        },
      }
    );

    return NextResponse.json({
      success: true,
      videoUrl: Array.isArray(output) ? output[0] : output,
    });
  } catch (error) {
    console.error("VIDEO GENERATION ERROR:", error);

    return NextResponse.json({
      success: false,
      error: "فشل توليد الفيديو الحقيقي",
      details: error.message,
    });
  }
}