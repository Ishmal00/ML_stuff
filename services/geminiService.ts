
import { GoogleGenAI, Type } from "@google/genai";
import { MemoryVideo, RecallResponse } from "../types";

export const recallMemories = async (prompt: string, library: MemoryVideo[]): Promise<RecallResponse> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  const model = 'gemini-3-flash-preview';
  
  const systemInstruction = `
    You are RecallAI, a high-performance semantic retrieval engine for video memories.
    Your objective is to bridge the gap between human "fuzzy" recall and digital video archives.
    
    CRITICAL INSTRUCTIONS:
    1. ANALYZE intent: Determine if the user is searching for an emotion (e.g., "sadness"), a visual (e.g., "the blue shirt"), an action (e.g., "when I fell"), or context (e.g., "late night").
    2. SEMANTIC RANKING: Don't just match keywords. If a user asks for "failure", look for transcripts describing mistakes or frustration.
    3. REASONING: Explain exactly WHY the user's vague prompt connects to the specific video. Use psychological terms like "emotional resonance" or "contextual cues".
    4. VIBE CHECK: Provide a "memoryVibe" that summarizes the core feeling of the memory.
  `;

  const videoContext = library.map(v => ({
    id: v.id,
    title: v.title,
    description: v.description,
    transcript: v.transcript,
    emotions: v.inferredEmotions,
    actions: v.keyActions
  }));

  const response = await ai.models.generateContent({
    model,
    contents: `User Vague Prompt: "${prompt}"\n\nVideo Library Metadata: ${JSON.stringify(videoContext)}`,
    config: {
      systemInstruction,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          emotionalAnalysis: {
            type: Type.STRING,
            description: "Deep dive into what the user is actually trying to remember based on their vague language."
          },
          matches: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                videoId: { type: Type.STRING },
                relevanceScore: { type: Type.NUMBER, description: "0.0 to 1.0 confidence of semantic match" },
                reasoning: { type: Type.STRING, description: "How the brain connects the prompt to this memory." },
                memoryVibe: { type: Type.STRING, description: "Poetic 2-3 word vibe description." }
              },
              required: ["videoId", "relevanceScore", "reasoning", "memoryVibe"]
            }
          }
        },
        required: ["emotionalAnalysis", "matches"]
      }
    }
  });

  try {
    return JSON.parse(response.text || '{}') as RecallResponse;
  } catch (err) {
    console.error("RecallAI: Parsing error", err);
    return { matches: [], emotionalAnalysis: "Memory retrieval engine offline." };
  }
};
