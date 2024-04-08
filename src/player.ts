import { Timestamp } from "firebase/firestore";
import { MoneyType } from "./money";

export type Answers = Record<string, string>;
export type RapidTimers = Record<string, Timestamp>;

export type Player = {
  id: string;
  username: string;
  pictureUrl: string;
  currentStep: number;
  answers: Answers;
  rapid?: RapidTimers;
  isCaught: boolean;
  isChaser: boolean;
  ticket?: {
    purchasedAt: Timestamp;
    type: "virtual" | "real";
    price: {
      currency: string;
      amount: number;
    };
  };
  earnings: {
    cash: {
      estimated?: MoneyType;
      offer: MoneyType;
      real: MoneyType;
    };
    coins: {
      estimated?: MoneyType;
      offer: MoneyType;
      real: MoneyType;
    };
  };
};
