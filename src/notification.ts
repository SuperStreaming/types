import { Timestamp } from "firebase/firestore/lite"

export type Notification = {
  title: string;
  message: string;
  urls: string[];
  until: Timestamp;
};
