export interface ExerciseDayPlan {
    exerciseDayPlanId: number;
    order: number;
    warmup: boolean;
    isFinished: boolean;
    exerciseId: number;
    planId: number;
}

export interface ExerciseDayPlanDto {
    exercisesDayPlanId?: number;
    order: number;
    warmup: boolean;
    day: string;
    finished: boolean;
    exerciseId: number;
    exerciseName?: string;
    exerciseDescription?: string;
    planId: string | number;
}
