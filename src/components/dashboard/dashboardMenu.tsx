import {Avatar, Box, Grid, Typography} from "@mui/material";
import DashboardOption from "./dashboardOption";
import {BarChart, CalendarToday, FitnessCenter, Newspaper, Person} from "@mui/icons-material";
import React from "react";

type DashboardMenuProps = {
    changeMenu: (option:string) => void;
    user?: string;
}

export const DashboardMenu = ({user, changeMenu} : DashboardMenuProps) => {
    return (
        <Box sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4" component="h4" sx={{ flexGrow: 1 }}>
                    Welcome{user && " "+ user}!
                </Typography>
                <Avatar sx={{ ml: 2 }}>JD</Avatar>
            </Box>

            <Grid container spacing={3}>
                <DashboardOption
                    title="Calendario de Ejercicios"
                    description="Planifica tus entrenamientos y realiza un seguimiento de tu progreso en el calendario."
                    changeMenu={changeMenu}
                    option="CALENDAR"
                    icon={<CalendarToday />}
                />

                <DashboardOption
                    title="Noticias del Gimnasio"
                    description="Mantente actualizado con las últimas noticias y anuncios del gimnasio."
                    changeMenu={changeMenu}
                    option="NEWS"
                    icon={<Newspaper />}
                />

                {/*<DashboardOption*/}
                {/*    title="Rutinas de Ejercicio"*/}
                {/*    description="Accede a tus rutinas de ejercicio personalizadas y realiza un seguimiento de tu progreso."*/}
                {/*    changeMenu={changeMenu}*/}
                {/*    option="MENU"*/}
                {/*    icon={<FitnessCenter />}*/}
                {/*/>*/}

                <DashboardOption
                    title="Perfil de Usuario"
                    description="Actualiza tu información personal, foto de perfil y preferencias."
                    changeMenu={changeMenu}
                    option="MENU"
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