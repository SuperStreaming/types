import { Timestamp } from "@firebase/firestore/lite";
import { Datestamp } from "./v2/auction";
type Dateish = Date | Timestamp | undefined;
export declare function datestampToDate(dateish: Dateish): Date | undefined;
export declare const timestampToDate: typeof datestampToDate;
export declare function ensureDate(date: Dateish): Date;
export declare function remainingTime(endTime?: Datestamp, currTime?: Date): {
    weeks: number;
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    remaining: number;
};
export declare function remainingTimeString(endTime?: Datestamp, currTime?: Date): string;
export {};
