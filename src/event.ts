import { Timestamp } from "firebase/firestore";
import { type MoneyType } from "./money";

export type Event = {
  id: string;
  gameName: string;
  subtitle: string;
  type: "free" | "paid";
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
    cash: {
      remaining: MoneyType;
      total: MoneyType;
    };
    coins: {
      remaining: MoneyType;
      total: MoneyType;
    };
  };
};

export type Platform = "twitch" | "youtube" | null;

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
