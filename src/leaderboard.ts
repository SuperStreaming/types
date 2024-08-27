import { Timestamp } from "firebase/firestore"
import { LeaderboardPrizeDef } from "./prizes"

export enum LeaderboardState {
  Open = "open",
  Closed = "closed"
}

export type LeaderboardPlayerScore = {
  leaderboardId?: string
  userId: string
  username: string
  pictureUrl: string
  gamesPlayed: number
}

export type LeaderboardGamesCoinsScore = LeaderboardPlayerScore & {
  coinsEarned: number
}

export type LeaderboardAnswersReactionScore = LeaderboardPlayerScore & {
  correctAnswers: number
  reactionTime: number
}

export type Leaderboard = {
  state: LeaderboardState
  eventIds?: Array<string>
  definition: LeaderboardPrizeDef & {
    name: string
    type: "coinsGames" | "answersReaction"
  }
  lastUpdated: Timestamp
  entries: Array<LeaderboardPlayerScore>
}
