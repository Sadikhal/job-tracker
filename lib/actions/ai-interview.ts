"use server";


const SYSTEM_PROMPT = `
You are an Experienced Technical Lead conducting a technical interview. 
Your goal is to conduct a 5-question technical drill that is DIRECT, CRITICAL, but LEVEL-APPROPRIATE.

STRICT OPERATIONAL PROTOCOLS:
1. EXPERIENCE-LEVEL SYNC: 
   - If user is a "fresher": Ask fundamental, core syntax, and basic logic questions (e.g., "State vs Props", "Map/Filter", "Simple Grid Layout"). DO NOT ask about complex architecture, event-loop internals, or advanced optimization unless they prove mastery.
   - If user is "senior": Focus on design patterns, production scaling, and failure recovery.
2. HUMAN MENTOR TONE: Be professional and direct. Acknowledge the user's level at the start.
3. NO PRACTICAL TASKS: Only ask THEORETICAL and CONCEPTUAL questions. NEVER ask the candidate to write code, debug snippets, or perform live coding tasks.
4. ONE QUESTION: Ask exactly ONE question per turn.
5. BREVITY: Keep your total response under 40 words.
6. MANDATORY PUNCTUATION: Every question turn MUST end with a clear question mark (?).

FLOW:
- Turn 1: Handshake + Initial technical question based on their level.
- Turns 2-5: Conceptual technical question based on their previous answer.
- FINAL: Conclude simulation.
`;


async function callGroqAPI(messages: any[]) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) throw new Error("API_KEY_MISSING");

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: messages,
      temperature: 0.7,
      max_tokens: 500,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("[GROQ-API-ERROR]", errorData);
    if (response.status === 429) throw new Error("QUOTA_EXCEEDED");
    throw new Error("AI_GENERATION_FAILED");
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

export async function getGeminiInterviewResponse(messages: { role: string, content: string }[], jobContext: any) {
  const experienceLevel = jobContext.description?.toLowerCase().includes("fresher") ? "FRESHER/ENTRY LEVEL" : "PROFESSIONAL/SENIOR";
  
  const promptMessages = [
    { role: "system", content: `${SYSTEM_PROMPT}\n\nContextual Requirements:\n- User Experience Level: ${experienceLevel}\n- Target Role: ${jobContext.jobTitle}\n- Stage: ${jobContext.stage}` },
    ...messages.map(m => ({
      role: m.role === "ai" ? "assistant" : "user",
      content: m.content
    }))
  ];

  try {
    return await callGroqAPI(promptMessages);
  } catch (error: any) {
    console.error(`[AI-ERROR-LOG] ${error.message}`);
    throw error;
  }
}


export async function getGeminiInterviewReport(messages: { role: string, content: string }[]) {
  const REPORT_PROMPT = `
    Analyze the technical interview transcript. Act as a Senior Mentor providing a professional debrief.
    
    EXTREME EVALUATION PROTOCOL (STRICT):
    - DETECT LOW-EFFORT PATTERNS: If the user provides one-word answers (e.g., "no", "yes", "i"), gibberish ("h", "n"), or repeated evasion, you MUST FAIL THEM. 
    - SCORE MANDATE: For low-effort/bad-faith transcripts, the score MUST NOT exceed 1.5/10.
    - BE BRUTAL: High-stakes technical environments do not tolerate "fake" answers. Reflect this in the score.

    SCORING BRACKETS:
    - 0.0 to 1.5: Low-effort, non-answers, or critical technical hallucination.
    - 2.0 to 4.5: Significant technical gaps, missing core concepts, or vague intuition.
    - 5.0 to 7.0: Competent foundational knowledge, but lacks architectural depth.
    - 8.0 to 10.0: Mastery, precise technical terminology, and architectural foresight.

    CRITERIA:
    - Experience Level Awareness: Consider if the candidate is a fresher or senior.
    - Technical Accuracy: Penalize incorrect facts heavily.
    - Professional Tone: Be the critical mentor they need to hear.

    JSON STRUCTURE (STRICT):
    {
      "score": number (0-10 based on the PROTOCOL above),
      "gaps": string[] (2-3 very specific technical areas for improvement),
      "advice": string (1-2 sentences of high-value professional advice for their specific level)
    }

    GENERATE JSON ONLY. DO NOT INCLUDE MARKDOWN CODE BLOCKS.
  `;

  const promptMessages = [
    { role: "system", content: REPORT_PROMPT },
    { role: "user", content: `Transcript:\n${messages.map(m => `${m.role.toUpperCase()}: ${m.content}`).join("\n")}` }
  ];

  try {
    const text = await callGroqAPI(promptMessages);
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    throw new Error("REPORT_PARSING_FAILED");
  } catch (error: any) {
    console.error("[AI-ERROR] Report Generation Failed:", error.message || error);
    return {
       score: 0.0,
       gaps: ["Incomplete drill logic due to system error or timeout.", "Vague technical justification detected."],
       advice: "Ensure a stable connection and attempt the drill again for a proper evaluation."
    };
  }
}
