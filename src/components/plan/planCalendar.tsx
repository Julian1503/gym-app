import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import ApiService from "../../services/apiService";
import {ExerciseDayPlanDto} from "../../@types/ExerciseDayPlan";
import {Exercise} from "../../@types/Exercise";
import Calendar from "../user-menu/calendar";


export const PlanCalendar = () => {
    const { id } = useParams<string>();
    const token = useSelector((state: RootState) => state.auth.token);
    const [exercisesDayPlan, setExercisesDayPlan] = useState<ExerciseDayPlanDto[]>([]);
    const apiService = ApiService.getInstance();
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const fetchEvents = () => {
        apiService
            .get(`/exercise-day-plan/get-by-plan/${id}`, token)
            .then((res) => setExercisesDayPlan(res.response));
    }

    useEffect(() => {
        apiService
            .get(`/exercise/get-all`, token)
            .then((res) => setExercises(res.response))
        fetchEvents();
    }, []);

    const idNumber = parseInt(id || "", 10);

    return (
        <div>
            <Calendar exercises={exercises} fetchEvents={fetchEvents} exerciseDayPlans={exercisesDayPlan} planId={idNumber}/>
        </div>
    );
}