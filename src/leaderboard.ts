import { Timestamp } from "firebase/firestore"
import { LeaderboardPrizeDef } from "./prizes"

export enum LeaderboardState {
  Open = "open",
  Closed = "closed"
}

export enum LeaderboardType {
  coinsGames = "Coins and Games",
  answersReaction = "Answers and Reaction Time"
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
    type: LeaderboardType
  }
  lastUpdated: Timestamp
  entries: Array<LeaderboardPlayerScore>
}
