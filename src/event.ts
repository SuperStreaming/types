import { Timestamp } from "firebase/firestore";

export type Event = {
    id: string;
    gameName: string;
    subtitle: string;
    state: EventState;
    startsAt: Timestamp;
    streams: [
      {
        url: string;
      }
    ];
    team1: {
      name: string;
      logoUrl: string;
    };
    team2: {
      name: string;
      logoUrl: string;
    };
    segments?: QuestionSegment[];
    pool: {
      virtual: number;
      remaining: {
        currency: string;
        amount: number;
      };
      total: {
        currency: string;
        amount: number;
      };
    };
  };
  
  export type Platform = "twitch" | "youtube" | null
  
  export enum EventState {
    Pending = "pending",
    Live = "live",
    Ended = "ended",
  }
  
  export type QuestionSegment = {
    name: string;
    state: SegmentState;
    activeUntil?: Timestamp;
    questions?: Question[];
  };
  
  export enum SegmentState {
    Incomplete = "incomplete",
    Active = "active",
    Closed = "closed",
    Settled = "settled",
  }
  
  export type Question = {
    id: string;
    text: string;
    type: "trivia" | "predict" | "recall";
    rapid?: {
      seconds: number;
    };
    rewards: {
      steps: number;
      coins: number;
    };
    options: string[];
    answers: string[];
  };
  