import React from "react";
import { Box, Typography, Card, CardContent, CardMedia, Grid } from "@mui/material";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import PeopleIcon from "@mui/icons-material/People";
import TimerIcon from "@mui/icons-material/Timer";
import StarIcon from "@mui/icons-material/Star";
import {useTheme} from "@mui/material/styles";

const font = "Oswald";
const features = [
    {
        title: "State-of-the-art Equipment",
        description:
            "Our gym is equipped with the latest and most advanced equipment to ensure an optimal workout experience.",
        icon: <FitnessCenterIcon fontSize="large" />,
    },
    {
        title: "Experienced Trainers",
        description:
            "Our team of professional trainers is dedicated to helping you reach your fitness goals.",
        icon: <PeopleIcon fontSize="large" />,
    },
    {
        title: "Flexible Schedules",
        description:
            "We offer a wide variety of classes and training sessions to fit your busy schedule.",
        icon: <TimerIcon fontSize="large" />,
    },
    {
        title: "Proven Results",
        description:
            "Our members have seen incredible results and transformations through our personalized training programs.",
        icon: <StarIcon fontSize="large" />,
    },
];

/* The code defines a functional component called `WhyUs`. Inside the component, it uses the `useTheme` hook from
Material-UI to access the current theme. It then returns a JSX structure that represents a section of a webpage. */

const WhyUs = () => {
    const theme = useTheme();
    return (
        <Box
            id="why us?"
            sx={{
                pt: "3rem", pb: "3rem",
                backgroundColor: theme.palette.background.default,
                minHeight: "44vh",
                textAlign: "center",
            }}
        >
            <Box mb={4}>
                <Typography
                    textAlign="center"
                    variant="h1"
                    component="h1"
                >
                    Why should you choose us?
                </Typography>
                <Typography
                    component="p"
                    variant="subtitle1"
                >
                    These are some of the reasons why you should consider it.
                </Typography>
            </Box>
            <Grid sx={{display:"flex", flexDirection:{xs:"column",md:"row"}, alignItems:{md:"space-evenly", xs:"center"}, justifyContent:{md:"space-evenly"}}}>
                {features.map((feature, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <Card
                            sx={{
                                maxWidth: 345,
                                minHeight: 240,
                                backgroundColor: "#2C2C2E",
                                borderRadius: "10px",
                                mb: "1rem"
                            }}
                        >
                            <CardMedia
                                component="div"
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    backgroundColor: theme.palette.secondary.main,

                                    height: 80,
                                }}
                            >
                                {feature.icon}
                            </CardMedia>
                            <CardContent>
                                <Typography
                                    gutterBottom
                                    variant="h5"
                                    component="div"
                                >
                                    {feature.title}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="white"
                                    fontFamily="Lora"
                                    component="p"
                                >
                                    {feature.description}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default WhyUs;