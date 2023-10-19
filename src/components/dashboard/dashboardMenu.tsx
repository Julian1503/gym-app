import {Avatar, Box, Button, Grid, Typography} from "@mui/material";
import DashboardOption from "./dashboardOption";
import {BarChart, CalendarToday, FitnessCenter, Newspaper, Person} from "@mui/icons-material";
import React from "react";
import {logout} from "../../store/auth/authSlice";
import {useDispatch} from "react-redux";

type DashboardMenuProps = {
    changeMenu: (option:string) => void;
    user?: string;
}

export const DashboardMenu = ({user, changeMenu} : DashboardMenuProps) => {
    const dispatch = useDispatch();

    return (
        <Box sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4" component="h4" sx={{ flexGrow: 1 }}>
                    Welcome{user && " "+ user}!
                </Typography>
                <Button sx={{ ml: 2 }} color="secondary" onClick={()=> dispatch(logout())}>Logout</Button>
            </Box>

            <Grid container spacing={3}>
                <DashboardOption
                    title="Exercise Calendar"
                    description="Plan your workouts and track your progress on the calendar."
                    changeMenu={changeMenu}
                    option="CALENDAR"
                    icon={<CalendarToday />}
                />

                <DashboardOption
                    title="Gym News"
                    description="Stay up to date with the latest gym news and announcements."
                    changeMenu={changeMenu}
                    option="NEWS"
                    icon={<Newspaper />}
                />

                {/*<DashboardOption
                  title="Exercise Routines"
                  description="Access your personalized exercise routines and track your progress."
                  changeMenu={changeMenu}
                  option="MENU"
                  icon={<FitnessCenter />}
                />*/}

                <DashboardOption
                    title="User Profile"
                    description="Update your personal information and change your pass."
                    changeMenu={changeMenu}
                    option="PROFILE"
                    icon={<Person />}
                />

                {/*<DashboardOption*/}
                {/*    title="Estadísticas y Progreso"*/}
                {/*    description="Visualiza tus estadísticas de progreso y gráficos de seguimiento."*/}
                {/*    changeMenu={changeMenu}*/}
                {/*    option="MENU"*/}
                {/*    icon={<BarChart />}*/}
                {/*/>*/}
            </Grid>
        </Box>
    );
}