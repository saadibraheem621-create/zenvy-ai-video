import { prisma } from "@/lib/db";
import { getUserFromCookie } from "@/lib/auth";

function getCost(duration) {
  if (duration === 10) return 35;
  return 20;
}

export async function POST(req) {
  const session = await getUserFromCookie();

  if (!session) {
    return Response.json({ success: false, error: "سجل دخول أولاً" });
  }

  const { prompt, style, duration } = await req.json();

  const cost = getCost(duration);

  const user = await prisma.user.findUnique({
    where: { id: session.id }
  });

  if (!user || user.credits < cost) {
    return Response.json({
      success: false,
      error: "رصيد Credits غير كافي"
    });
  }

  // حالياً فيديو تجريبي Mock
  // لاحقاً نربطه بـ Replicate / Runway / fal.ai
  const mockVideoUrl =
    "https://samplelib.com/lib/preview/mp4/sample-5s.mp4";

  await prisma.user.update({
    where: { id: session.id },
    data: {
      credits: {
        decrement: cost
      }
    }
  });

  const video = await prisma.video.create({
    data: {
      userId: session.id,
      prompt,
      style,
      duration,
      cost,
      videoUrl: mockVideoUrl
    }
  });

  return Response.json({
    success: true,
    video
  });
}