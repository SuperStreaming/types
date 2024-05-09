import { Timestamp } from "firebase/firestore";

export type Notification = {
  title: string;
  message: string;
  urls: string[];
  until: Timestamp;
};
