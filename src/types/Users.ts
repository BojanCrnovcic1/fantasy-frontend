import type { Predictions } from "./Predictions";
import type { Scores } from "./Scores";

export interface Users {
    userId?: number;
    teamName: string;
    firstName: string;
    lastName: string;
    email: string;  
    password: string;
    role: "USER" | "ADMIN" | null;
    isVerified?: boolean;
    createdAt: Date;
    predictions: Predictions[];
    scores: Scores[];
}