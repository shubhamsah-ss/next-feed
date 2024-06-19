// import { openai } from "@ai-sdk/openai";
// import { streamText } from "ai";
// import { NextResponse } from "next/server";

// // Allow streaming responses up to 30 seconds
// export const maxDuration = 30;

// // Set the runtime to edge for the best performance
// export const runtime = "edge";

// export async function POST(req) {
//   try {
//     const prompt =
//       "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What's a hobby you've recently started?||If you could have dinner with any historical figure, who would it be?|| What's a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";

//     const result = await streamText({
//       model: openai("gpt-3.5-turbo", {
//         apiKey: process.env.OPENAI_API_KEY,
//       }),
//       prompt,
//       temperature: 1,
//       maxTokens: 256,
//       topP: 1,
//       frequencyPenalty: 0,
//       presencePenalty: 0,
//     });

//     return new NextResponse(result.toAIStreamResponse(), {
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (error) {
//     console.error("Error in POST /api/chatgpt:", error);
//     return NextResponse.json(
//       { success: false, message: "Error processing request" },
//       { status: 500, headers: { "Content-Type": "application/json" } }
//     );
//   }
// }

import { google } from "@ai-sdk/google";
import { generateText } from "ai";

const apiKey = process.env.GEMINI_API_KEY;
const prompt =
"Create a list of three open-ended and engaging questions formatted in a single line suitable for a diverse audience on an anonymous social messaging platform. Each question should be separated by '||' and focus on universal themes that encourage friendly interaction or create a funny environment. Avoid personal or sensitive topics and select random topics for example can use general topics, funny topics, world topics, games topics, movies and entertainment topics, science and fictions topics, food and cooking topics. The questions should foster curiosity, and contribute to a positive and welcoming conversational environment. Try to not repeat responses. For example: 'What's a book that has had a significant impact on your life?||If you could travel anywhere in the world right now, where would you go?||What's a skill you've always wanted to learn but haven't had the chance to yet?"

export async function POST(request) {
  try {
    const { text } = await generateText({
      model: google("models/gemini-1.5-pro-latest", { apiKey }),
      stream: true,
      prompt,
    });

    return Response.json({ success: true, message: text }, { status: 200 });
  } catch (error) {
    // Handle errors from streamText here (e.g., network issues)
    console.error("Error generating text from streamText:", error);
    return Response.json(
      { error: "An error occurred while generating text." },
      { status: 500 }
    );
  }
}
