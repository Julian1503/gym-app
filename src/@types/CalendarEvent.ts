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

