import { Event } from 'react-big-calendar';

export interface CalendarEvent extends Event {
    id: number;
    order: number;
    series: number;
    repetitions: number;
    title: string;
    start: Date;
    end: Date;
    image: string | undefined
    duration: string;
    finished: boolean;
}

export interface FinishData {
    order: number;
    repetitions: number;
    weight: number;
    rest: string;
    duration: string;
    exerciseDayPlanId: number;
}

