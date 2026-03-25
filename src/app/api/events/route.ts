import { NextRequest, NextResponse } from "next/server";
import { getRedisClient } from "@/lib/redis";

export async function GET(req: NextRequest) {
  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      const client = await getRedisClient();
      const subscriber = client.duplicate();
      await subscriber.connect();

      const channels = ["Channel.Business", "Channel.BotWorker"];

      for (const ch of channels) {
        await subscriber.subscribe(ch, (message) => {
          controller.enqueue(encoder.encode(`data: ${message}\n\n`));
        });
      }

      req.signal.addEventListener("abort", async () => {
        await subscriber.unsubscribe();
        await subscriber.quit();
        controller.close();
      });
    },
  });

  return new NextResponse(readable, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
