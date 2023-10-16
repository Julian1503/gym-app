import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {Calendar, ToolbarProps, View, dateFnsLocalizer, Event, EventProps, momentLocalizer} from 'react-big-calendar'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardMedia, Checkbox,
    Dialog, DialogActions,
    DialogContent,
    DialogTitle, FormControlLabel,
    Grid,
    TextField,
    Typography
} from "@mui/material";
import './MyCalendar.css';
import {Add} from "@mui/icons-material";
import {CalendarEvent} from "../../@types/CalendarEvent";
import EventComponent from "./eventComponent";
import CalendarToolbar from "./calendarToolbar";
import {Exercise} from "../../@types/Exercise";
import ApiService from "../../services/apiService";
import {ExerciseDayPlanDto} from "../../@types/ExerciseDayPlan";
import {DateField} from "@mui/x-date-pickers";
import FormGrid from "../form/form-grid";
import {useTheme} from "@mui/material/styles";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";

type CalendarProps = {
    exercises?: Exercise[];
    exerciseDayPlans: ExerciseDayPlanDto[];
    fetchEvents: () => void;
    planId?: number | undefined;
}

const MyCalendar: React.FC<CalendarProps> = ({exercises, exerciseDayPlans, planId, fetchEvents}) => {
    const apiService =  ApiService.getInstance();
    moment.utc();
    const token = useSelector<RootState, string | null>(state => state.auth.token);
    const [events, setEvents] = useState<CalendarEvent[]>([]);
    const [selectedEvent, setSelectedEvent] = useState<number>(0);
    const [open, setOpen] = useState(false);
    const [sortedEvents, setSortedEvents] = useState<CalendarEvent[]>([]);
    const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
    const [duration, setDuration] = useState('00:00');
    const [warmUp, setWarmUp] = useState(false);
    const [repetitions, setRepetitions] = useState(0);
    const [exerciseDate, setExerciseDate] = useState(moment.utc(new Date()).toDate());
    const [weight, setWeight] = useState(0.0);
    const [series, setSeries] = useState(0);
    const [calendarHeight, setCalendarHeight] = useState(1020);
    const [date, setDate] = useState(new Date());
    const [view, setView] = useState<View | undefined>('week');
    const minDate = new Date();
    const showNewEventButton = exercises != null && planId != null;
    const theme = useTheme();
    minDate.setHours(0, 0, 0);
    const localizer = momentLocalizer(moment);
    const handleNavigate = (newDate : Date) => {
        setDate(newDate);
    };

    const handleClose = () => {
        setOpen(false);
        setRepetitions(0);
        setWarmUp(false);
        setDuration('00:00');
        setWeight(0.0);
        setSeries(0);
        setExerciseDate(new Date());
        setSelectedExercise(null);
        setSelectedEvent(0);
    };

    const handleEdit = async (event: CalendarEvent) => {
        const response = await apiService.get(`/exercise-day-plan/get/${event.id}`, token)
            .then(res => {
                const exercise : ExerciseDayPlanDto = res.response;
                setRepetitions(exercise.repetitions);
                setWarmUp(exercise.warmup);
                setDuration(exercise.duration);
                setWeight(exercise.weight);
                setSeries(exercise.series);
                setExerciseDate(new Date(exercise.day + "T00:00:00"));
                setSelectedExercise(exercises?.find((exercise) => exercise.exerciseId === exercise.exerciseId) || null);
                setSelectedEvent(event.id || 0);
                setOpen(true);
            });
    }

    const handleDelete = (event: CalendarEvent) => {
        if(event.id) {
            apiService.delete(`/exercise-day-plan/delete/${event.id}`, token)
            .then(res => {
                fetchEvents();
                setSelectedEvent(0);
            });
        }
    }

    const onFinish = (event: CalendarEvent) => {
        if(event.id) {
            apiService.put(`/exercise-day-plan/finish/${event.id}`, null, token)
                .then(res => {
                    fetchEvents();
                    setSelectedEvent(0);
                });
        }
    }

    const handleSelect = () => {
        if (selectedExercise && duration) {
            exerciseDate.setMinutes(exerciseDate.getMinutes() - exerciseDate.getTimezoneOffset());
            const exerciseDayPlan = {
                exerciseDayPlanId: selectedEvent || 0,
                order: 0,
                duration: duration,
                repetitions: repetitions,
                series: series,
                warmup: warmUp,
                weight: weight,
                finished: false,
                exerciseId: selectedExercise.exerciseId,
                planId: planId,
                day: moment.utc(exerciseDate).format('YYYY-MM-DD'),
            } as ExerciseDayPlanDto;
            if(selectedEvent) {
                apiService.put(`/exercise-day-plan/update/${selectedEvent}`, exerciseDayPlan, token).then(x =>
                    fetchEvents()
                );
            } else {
                apiService.post('/exercise-day-plan/create', exerciseDayPlan, token).then(x =>
                    fetchEvents()
                );
            }
            setOpen(false);
            handleClose();
        }
    };

    const handleMove = (eventId: number, up: boolean) => {
        let eventToMove = events.find((event) => event.id === eventId);
        if (!eventToMove) {
            console.error('No se encontró el evento con el id proporcionado');
            return;
        }

        let newOrder = eventToMove.order + (up ? 1 : -1);
        let eventToSwap = events.find((event) => event.order === newOrder && eventToMove &&  moment(event.start).isSame(eventToMove.start, 'day'));
        if (!eventToSwap) {
            console.error('No hay evento para intercambiar con el evento proporcionado');
            return;
        }

        if(eventToMove.finished || eventToSwap.finished) {
            console.error('No se pueden intercambiar eventos terminados');
            return;
        }

        apiService.put('/exercise-day-plan/update-order', {eventToMove: eventToMove.id, eventToSwap: eventToSwap.id}, token)
            .then(res => {
                fetchEvents();
        });
    };

    const setNumberValues = (value : string, setValue: Dispatch<SetStateAction<number>>) => {
      if(value.indexOf("0") === 0 && value.length > 1) {
          const newValue = value.substring(1, value.length);
          setValue(parseInt(newValue, 10));
      }  else {
          setValue(parseInt(value, 10))
      }
    };

    const onChangeDate = (value: Date | null) => {
        setDate(value || new Date());
    }

    useEffect(() => {
        const setResponsiveness = () => {
            return window.innerWidth < 640
                ? setView('day')
                : setView('week');
        };
        setResponsiveness();
        const handleResize = () => setResponsiveness();
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        }
    }, []);

    useEffect(() => {
        const fetchExerciseDayPlans = async () => {
            const calendarEvents = exerciseDayPlans.map((exerciseDayPlan: ExerciseDayPlanDto) => ({
                id: exerciseDayPlan.exercisesDayPlanId,
                order: exerciseDayPlan.order,
                start: new Date(exerciseDayPlan.day + "T00:00:00"),
                end: new Date(exerciseDayPlan.day + "T00:01:00"),
                title: exerciseDayPlan.exerciseName,
                image: undefined,
                duration: exerciseDayPlan.duration.toString(),
                finished: exerciseDayPlan.finished,
                series: exerciseDayPlan.series,
                repetitions: exerciseDayPlan.repetitions,
            } as CalendarEvent));
            setEvents(calendarEvents);
        };

        fetchExerciseDayPlans();
    }, [exerciseDayPlans]);

    useEffect(() => {
        const sorted = [...events].sort((a, b) => a.order - b.order);
        setSortedEvents(sorted);
        const numEventsSameDay = events.filter((e) =>
            moment(e.start).isSame(date, 'day')).length + 1;
        // if (numEventsSameDay * 268 >= calendarHeight) {
        //     setCalendarHeight((prevHeight) => prevHeight + 268);
        // }
    }, [events]);

    const handleTimeChange = (newTime : string) => {
        let time = newTime.split(':');
        if (newTime) {
            const hours = String(time[0]).padStart(2, '0');
            const minutes = String(time[1]).padStart(2, '0');
            const seconds = "00"
            const newDuration = `${hours}:${minutes}:${seconds}`;
            setDuration(newDuration);
        } else {
            setDuration('00:00:00');
        }
    };

    return (
        <Box sx={{height: calendarHeight, display: "flex", justifyContent: "center", width: "100%" }}>
            <Calendar
                selectable
                min={minDate}
                max={minDate}
                localizer={localizer}
                events={sortedEvents}
                defaultDate={new Date()}
                onSelectEvent={(event) => setSelectedEvent(event.id)}
                date={date}
                onNavigate={handleNavigate}
                popup={false}
                components={{
                    event: (props : EventProps<CalendarEvent>) => (
                        <EventComponent {...props} onFinish={onFinish} eventSelected={selectedEvent} moveEvent={handleMove} onEdit={handleEdit} onDelete={handleDelete} />
                    ),
                    toolbar: (props : ToolbarProps<Event, object> ) => (
                            <CalendarToolbar {...props} showAddNew={showNewEventButton} setOpen={setOpen} onChangeDate={onChangeDate}/>)
                }}
                views={['week', 'day']}
                view={view}
            />

            <Dialog fullWidth open={open} onClose={handleClose}>
                <DialogTitle>Select Exercise</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        {exercises?.map((exercise) => (
                            <Grid item xs={12} sm={6} md={4} key={exercise.exerciseId}>
                                <Card
                                    sx={{
                                        maxWidth: 345,
                                        borderRadius: 2,
                                        cursor: "pointer",
                                        backgroundColor:
                                            selectedExercise?.exerciseId === exercise.exerciseId
                                                ? theme.palette.primary.main
                                                : theme.palette.background.default,
                                    }}
                                    onClick={() => setSelectedExercise(exercise)}
                                >
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={exercise.photo || "https://via.placeholder.com/150"}
                                        alt={exercise.name}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {exercise.name}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                    <FormGrid>
                        <DateField
                            label="Exercise Date"
                            defaultValue={moment.utc(exerciseDate).toDate()}
                            value={exerciseDate}
                            onChange={(date : Date | null) => setExerciseDate(moment.utc(date).toDate() || new Date())}
                            format="yyyy-MM-dd"
                        />
                    </FormGrid>
                    <FormGrid>
                        <TextField
                            label="Duration"
                            type="time"
                            value={duration}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{
                                step: 300,
                            }}
                            onChange={(event) => handleTimeChange(event.target.value)}
                        />
                        <TextField
                            label="Repetitions"
                            type="number"
                            placeholder={"0"}
                            value={repetitions}
                            onChange={(event) => setNumberValues(event.target.value, setRepetitions)}
                        />
                    </FormGrid>
                    <FormGrid>
                        <TextField
                            label="Series"
                            type="number"
                            value={series}
                            onChange={(event) => setNumberValues(event.target.value, setSeries)}
                        />
                        <TextField
                            label="Weight"
                            type="number"
                            value={weight}
                            onChange={(event) => setWeight(parseFloat(event.target.value))}
                        />
                    </FormGrid>
                    <FormGrid>
                        <FormControlLabel
                            control={<Checkbox checked={warmUp} onChange={(event) => setWarmUp(event.target.checked)}/>}
                            label="Warm Up"
                            title="Warm Up"
                            value={warmUp}
                        />
                    </FormGrid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSelect}>OK</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default MyCalendar;