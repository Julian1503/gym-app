import {ExerciseDayPlan} from "./ExerciseDayPlan";

export interface DayPlan {
    dayPlanId: number;
    dayName: string;
    finished: boolean;
    planId: number;
    day: Date;
    ExerciseDayPlan: ExerciseDayPlan[];
}

// export interface DayPlanDto {
//     dayPlanId: number;
//     dayName: string;
//     finished: boolean;
//     planId: number;
//     day: Date;
//     ExerciseDayPlan: ExerciseDayPlanDto[];
// }