import { type Timestamp } from "firebase/firestore";

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


export type Answers = Record<string, string>
export type RapidTimers = Record<string, Timestamp>

export type Player = {
  id: string
  username: string
  pictureUrl: string
  currentStep: number
  answers: Answers
  rapid?: RapidTimers
  isCaught: boolean
  isChaser: boolean
  ticket?: {
    purchasedAt: Timestamp
    type: "virtual" | "real"
    price: {
      currency: string
      amount: number
    }
  }
  earnings: {
    virtual: number
    estimated?: {
      currency: string
      amount: number
    }
    offer: {
      currency: string
      amount: number
    }
    real: {
      currency: string
      amount: number
    }
  }
}

export type LeaderboardState = "open" | "closed"

export type LeaderboardPlayerScore = {
  userId: string
  username: string
  pictureUrl: string
  coinsEarned: number
  gamesPlayed: number
}

export type LeaderboardBracket = {
  name: string
  prizes: Array<{
    name: string
    pictureUrl: string
  }>
  position: number
}

export type Leaderboard = {
  id: string
  state: "open" | "closed"
  eventIds: Array<string>
  definition: {
    name: string
    breakdown: Array<LeaderboardBracket>
  }
  lastUpdated: Timestamp
  entries: Array<LeaderboardPlayerScore>
}