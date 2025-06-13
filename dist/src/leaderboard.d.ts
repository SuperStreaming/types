import { Timestamp } from "@firebase/firestore/lite";
import { type LeaderboardPrizeDef } from "./prizes";
export declare enum LeaderboardState {
    Open = "open",
    Closed = "closed"
}
export declare enum LeaderboardType {
    coinsGames = "Coins and Games",
    answersReaction = "Answers and Reaction Time"
}
export type LeaderboardPlayerScore = {
    leaderboardId?: string;
    userId: string;
    username: string;
    pictureUrl: string;
    gamesPlayed: number;
    orderBy: number;
};
export type LeaderboardGamesCoinsScore = LeaderboardPlayerScore & {
    coinsEarned: number;
};
export type LeaderboardAnswersReactionScore = LeaderboardPlayerScore & {
    correctAnswers: number;
    reactionTime: number;
};
export type Leaderboard = {
    id: string;
    state: LeaderboardState;
    eventIds?: Array<string>;
    definition: LeaderboardPrizeDef & {
        name: string;
        category: string;
        type: LeaderboardType;
        endDate?: Timestamp;
        forSingleEvent: boolean;
    };
    numPlayers: number;
    lastUpdated: Timestamp;
    entries: Array<LeaderboardPlayerScore>;
};
