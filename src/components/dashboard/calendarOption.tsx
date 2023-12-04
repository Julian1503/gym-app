import React, { useEffect, useState } from "react";
import ApiService from "../../services/apiService";
import { TokenService } from "../../store/auth/token";
import { ExerciseDayPlanDto } from "../../@types/ExerciseDayPlan";
import { Exercise } from "../../@types/Exercise";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Calendar from "../user-menu/calendar";
import {Box, Button, Dialog, Typography} from "@mui/material";
import {PlanForm} from "../plan/planForm";
import {Plan} from "../../@types/Plan";

export const CalendarOption = () => {
    const apiService = ApiService.getInstance();
    const token = useSelector<RootState, string | null>(state => state.auth.token);
    const userInfo = new TokenService().getTokenPayload();
    const [exerciseDayPlans, setExerciseDayPlans] = useState<ExerciseDayPlanDto[]>([]);
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [isCreating, setIsCreating] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<Plan | null>(null);
    const [planId, setPlanId] = useState<number | undefined>(undefined);
    const fetchEvents = () => {
        apiService
            .get(`/exercise-day-plan/get-by-plan/${planId}`, token)
            .then((res) => setExerciseDayPlans(res.response));
    }
    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        apiService
            .get(`/plan/get-active-plan/${userInfo?.scid}`, token)
            .then((res) => setPlanId(res.response.planId))
    }, [apiService, token, userInfo?.scid]);

    useEffect(() => {
        if (planId) {
            fetchEvents();
            apiService
                .get(`/exercise/get-all`, token)
                .then((res) => setExercises(res.response))
        }
    }, [planId, apiService, token, fetchEvents]);


    const handleSubmit = (plan: Plan) => {
        setIsCreating(false);
        setPlanId(plan.planId);
    };

    const handleOnCancel = () => {
        setIsCreating(false);
        setSelectedItem(null);
    }


    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%"
        }}>
            {planId ? (
                    <Calendar
                        exercises={exercises}
                        fetchEvents={fetchEvents}
                        exerciseDayPlans={exerciseDayPlans}
                        planId={planId}
                    />
            ) : (
                <div>
                    <Typography variant="h5" component="h2">
                        You dont have active plans
                    </Typography>
                    <Button onClick={()=>setIsCreating(true)} variant="contained" color="primary">
                        Add a plan
                    </Button>
                </div>
            )}
            <Dialog open={isCreating} onClose={handleOnCancel}>
                <PlanForm onSubmit={handleSubmit} selectedItem={selectedItem} onCancel={handleOnCancel} selectedMemberId={userInfo?.scid} />
            </Dialog>
        </Box>
    )
}
