import { Timestamp } from "firebase/firestore";
import { type MoneyType } from "./money";

export type Event = {
  id: string;
  gameName: string;
  subtitle: string;
  type: "free" | "paid";
  state: EventState;
  startsAt: Timestamp;
  streams: QuizEventStream[];
  team1: QuizEventTeam;
  team2: QuizEventTeam;
  segments: Segment[];

  pool: {
    cash: Pool;
    coins: Pool;
  };

  chaser: string;
  isOver?: boolean;

  managementFee: number;
};
export type Platform = "twitch" | "youtube" | null;


export type Segment = {
  type: "question" | "shopping";
  name: string;
  state: SegmentState;
  activeUntil?: Timestamp;
  questions?: Question[];
};

export interface QuizEventStream {
  platform: Platform;
  url: string;
}

export interface Pool {
  remaining: MoneyType;
  total: MoneyType;
}

export interface QuizEventTeam {
  name: string;
  logoUrl: string;
}

export enum EventState {
  Pending = "pending",
  Live = "live",
  Ended = "ended",
}

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

  isRapid: boolean;
  state: string;
  stepMultiplier: number;
  coinMultiplier: number;
};
