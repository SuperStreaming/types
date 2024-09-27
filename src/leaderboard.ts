import { Timestamp } from "firebase/firestore"
import { type LeaderboardPrizeDef } from "./prizes"

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
  orderBy: number
}

export type LeaderboardGamesCoinsScore = LeaderboardPlayerScore & {
  coinsEarned: number
}

export type LeaderboardAnswersReactionScore = LeaderboardPlayerScore & {
  correctAnswers: number
  reactionTime: number
}

export type Leaderboard = {
  id: string
  state: LeaderboardState
  eventIds?: Array<string>
  definition: LeaderboardPrizeDef & {
    name: string
    type: LeaderboardType
    forSingleEvent: boolean
  }
  lastUpdated: Timestamp
  entries: Array<LeaderboardPlayerScore>
}
