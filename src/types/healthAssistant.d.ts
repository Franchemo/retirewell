
export interface ChatMessage {
  message: string;
}

export interface ChatResponse {
  response: string;
  timestamp: string;
}

export interface SuggestedQuestionsResponse {
  questions: string[];
}
