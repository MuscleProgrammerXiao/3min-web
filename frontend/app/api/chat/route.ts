import { NextResponse } from "next/server";
import { getMessages, searchKB } from "@/lib/prompts/chatbot";

const CORS_HEADERS: HeadersInit = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Invalid message" },
        { status: 400, headers: CORS_HEADERS }
      );
    }

    // const apiKey = process.env.SILICONFLOW_API_KEY;sk-pghebkdpcrtqgaqvypiucowwtoqejbavumlnqgfzdvkvxutp
    const apiKey = "sk-pghebkdpcrtqgaqvypiucowwtoqejbavumlnqgfzdvkvxutp";
    if (!apiKey) {
      return NextResponse.json(
        { error: "Missing API key" },
        { status: 500, headers: CORS_HEADERS }
      );
    }

    // 基于用户消息做轻量知识库检索（来自 tishici 拆分文档），仅用于聚焦上下文
    const kbHits = searchKB(message, 5);
    const useful = kbHits.filter(h => h.score > 0.12);
    const matchedKeys = useful.map(h => h.key);
    const shouldAddExpansion = matchedKeys.some(k =>
      ["职业技能", "其他技能"].includes(k)
    );
    const expansionGuide = shouldAddExpansion
      ? [
          "拓展指引（通用方法，非个人事实）：",
          "- 需求澄清与用户研究：目标、角色、关键任务与场景",
          "- 信息架构与任务流程：导航层级、路径与可发现性",
          "- 线框与交互细节：状态、反馈、可见性与一致性",
          "- 视觉设计与设计系统：排版、色彩、组件库与规范",
          "- 可用性测试与迭代：度量、问题定位、改进闭环",
          "注意：仅提供行业通用方法，不得编造新的个人经历或数字。",
        ].join("\n")
      : "";
    const kbContext = useful.length
      ? [
          useful.map(h => `- ${h.key}：${h.content}`).join("\n"),
          expansionGuide ? "" : "",
          expansionGuide,
        ].join("\n")
      : undefined;

    const url = "https://api.siliconflow.cn/v1/chat/completions";
    const body = {
      model: "Qwen/QwQ-32B",
      messages: getMessages(message, kbContext),
      stream: true, // 开启流式输出
    };

    const upstream = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!upstream.ok) {
      const errText = await upstream.text();
      return NextResponse.json(
        { error: "Upstream error", detail: errText },
        { status: upstream.status || 500, headers: CORS_HEADERS }
      );
    }

    // 将上游的 SSE JSON 事件解析为纯文本流
    const decoder = new TextDecoder();
    const readable = new ReadableStream<Uint8Array>({
      async start(controller) {
        const reader = upstream.body?.getReader();
        if (!reader) {
          controller.close();
          return;
        }
        let buffer = "";
        const encoder = new TextEncoder();
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const events = buffer.split("\n\n");
          buffer = events.pop() || "";
          for (const evt of events) {
            const lines = evt.split("\n");
            for (const line of lines) {
              if (!line.startsWith("data:")) continue;
              const payload = line.slice(5).trim();
              if (!payload) continue;
              if (payload === "[DONE]") {
                controller.close();
                return;
              }
              try {
                const json = JSON.parse(payload);
                const chunk =
                  json?.choices?.[0]?.delta?.content ??
                  json?.choices?.[0]?.message?.content ??
                  "";
                if (chunk) {
                  controller.enqueue(encoder.encode(chunk));
                }
              } catch {
                // 忽略解析错误
              }
            }
          }
        }
        controller.close();
      },
    });

    return new Response(readable, {
      headers: { "Content-Type": "text/plain; charset=utf-8", ...CORS_HEADERS },
    });
  } catch (e) {
    return NextResponse.json(
      { error: "Request failed" },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}
