import React, {useEffect, useState} from 'react';
import {Calendar, ToolbarProps, View, EventProps, momentLocalizer} from 'react-big-calendar'
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
    Typography
} from "@mui/material";
import './MyCalendar.css';
import {CalendarEvent, FinishData} from "../../@types/CalendarEvent";
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
import FinishExerciseForm from "./finishExerciseForm";
import {ErrorSnackbar} from "../../pages/crud/errorSnackbar";

type CalendarProps = {
    exercises?: Exercise[];
    exerciseDayPlans: ExerciseDayPlanDto[];
    fetchEvents: () => void;
    planId?: number | undefined;
}

const MyCalendar: React.FC<CalendarProps> = ({exercises, exerciseDayPlans, planId, fetchEvents}) => {
    const apiService =  ApiService.getInstance();
    const token = useSelector<RootState, string | null>(state => state.auth.token);
    moment.utc();
    const [events, setEvents] = useState<CalendarEvent[]>([]);
    const [selectedEvent, setSelectedEvent] = useState<number>(0);
    const [open, setOpen] = useState(false);
    const [sortedEvents, setSortedEvents] = useState<CalendarEvent[]>([]);
    const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
    const [warmUp, setWarmUp] = useState(false);
    const [exerciseDate, setExerciseDate] = useState(moment.utc(new Date()).toDate());
    const calendarHeight = 1020;
    const [date, setDate] = useState(new Date());
    const [openFinishExerciseForm, setOpenFinishExerciseForm] = useState(false);
    const [view, setView] = useState<View | undefined>('week');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const minDate = new Date();
    const showNewEventButton = exercises != null && planId != null;
    const theme = useTheme();
    minDate.setHours(0, 0, 0);
    const dateLocalizer = momentLocalizer(moment);
    const handleNavigate = (newDate : Date) => {
        setDate(newDate);
    };

    const handleClose = () => {
        setOpen(false);
        setWarmUp(false);
        setExerciseDate(new Date());
        setSelectedExercise(null);
        setSelectedEvent(0);
    };

    const handleEdit = async (event: CalendarEvent) => {
        await apiService.get(`/exercise-day-plan/get/${event.id}`, token)
            .then(res => {
                const exercise : ExerciseDayPlanDto = res.response;
                setWarmUp(exercise.warmup);
                setExerciseDate(new Date(exercise.day + "T00:00:00"));
                setSelectedExercise(exercises?.find((ex) => ex.exerciseId === exercise.exerciseId) || null);
                setSelectedEvent(event.id || 0);
                setOpen(true);
            });
    }

    const handleDelete = (event: CalendarEvent) => {
        if(event.id) {
            apiService.delete(`/exercise-day-plan/delete/${event.id}`, token)
            .then(() => {
                fetchEvents();
                setSelectedEvent(0);
            });
        }
    }

    const onFinish = (eventId: number, body: FinishData[]) => {
        if(eventId) {
            apiService.put(`/exercise-day-plan/finish/${eventId}`, body, token)
                .then(() => {
                    fetchEvents();
                    setSelectedEvent(0);
                });
        }
    }

    const onRestart = (event: CalendarEvent) => {
        if(event) {
            apiService.put(`/exercise-day-plan/restart/${event.id}`, {}, token)
                .then(() => {
                    fetchEvents();
                    setSelectedEvent(0);
                });
        }
    }

    const handleSelect = () => {
        if (selectedExercise) {
            const exerciseDayPlan = {
                exerciseDayPlanId: selectedEvent || 0,
                order: 0,
                warmup: warmUp,
                finished: false,
                exerciseId: selectedExercise?.exerciseId,
                planId: planId,
                day: moment.utc(exerciseDate).format('YYYY-MM-DD'),
            } as ExerciseDayPlanDto;
            if(selectedEvent) {
                apiService.put(`/exercise-day-plan/update/${selectedEvent}`, exerciseDayPlan, token).then(() =>
                    fetchEvents()
                );
            } else {
                apiService.post('/exercise-day-plan/create', exerciseDayPlan, token).then(() =>
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
            setErrorMessage('Couldnt find the event with that id');
            return;
        }

        let newOrder = eventToMove.order + (up ? 1 : -1);
        let eventToSwap = events.find((event) => event.order === newOrder && eventToMove &&  moment(event.start).isSame(eventToMove.start, 'day'));
        if (!eventToSwap) {
            setErrorMessage('There are not events to exchange hours');
            return;
        }

        if(eventToMove.finished || eventToSwap.finished) {
            setErrorMessage('Cannot exchange hour to an event already finished');
            return;
        }

        apiService.put('/exercise-day-plan/update-order', {eventToMove: eventToMove.id, eventToSwap: eventToSwap.id}, token)
            .then(() => {
                fetchEvents();
        });
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
                finished: exerciseDayPlan.finished,
            } as CalendarEvent));
            setEvents(calendarEvents);
        };

        fetchExerciseDayPlans()
            .catch((err)=>{
            console.error(err);
        });
    }, [exerciseDayPlans]);

    useEffect(() => {
        const sorted = [...events].sort((a, b) => a.order - b.order);
        setSortedEvents(sorted);
    }, [events]);

    const handleOpenFinished = () => {
        setOpenFinishExerciseForm(true);
    }

    return (
        <Box sx={{height: calendarHeight, display: "flex", justifyContent: "center", width: "100%"}}>
            <FinishExerciseForm open={openFinishExerciseForm} eventId={selectedEvent} onFinish={onFinish} onClose={()=>setOpenFinishExerciseForm(false)}/>
            <ErrorSnackbar message={errorMessage} onClose={()=>setErrorMessage(null)}/>
            <Calendar
                style={{
                    paddingLeft: 20,
                    paddingRight:20
                }}
                selectable
                min={minDate}
                max={minDate}
                localizer={dateLocalizer}
                events={sortedEvents}
                defaultDate={new Date()}
                onSelectEvent={(event) => setSelectedEvent(event.id)}
                date={date}
                onNavigate={handleNavigate}
                popup={false}
                components={{
                    event: (props : EventProps<CalendarEvent>) => (
                        <EventComponent {...props} onRestart={onRestart} onFinish={handleOpenFinished} eventSelected={selectedEvent} moveEvent={handleMove} onEdit={handleEdit} onDelete={handleDelete} />
                    ),
                    toolbar: (props : ToolbarProps ) => (
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