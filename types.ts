
export interface MemoryVideo {
  id: string;
  title: string;
  thumbnailUrl: string;
  videoUrl: string;
  timestamp: string;
  description: string;
  transcript: string;
  inferredEmotions: string[];
  keyActions: string[];
}

export interface MatchResult {
  videoId: string;
  relevanceScore: number;
  reasoning: string;
  memoryVibe: string;
}

export interface RecallResponse {
  matches: MatchResult[];
  emotionalAnalysis: string;
}
