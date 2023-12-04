import {Box, Typography} from "@mui/material";
import React, {useEffect} from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const font = "Oswald"
/* The code defines a functional component called `Hero` in TypeScript React. */
const Hero = () => {

    useEffect(() => {
        AOS.init({
            duration: 1000,
        });
    }, []);
    return (
        <Box sx={{
            pt: { md: 2 },
            display: "flex",
            flexDirection: { md: "row", xs: "column" },
            position: "relative",
            justifyContent: { md: "space-around" },
            alignItems: { xs: "center", md: "space-evenly" },
            height: { md: "100vh" },
            width: "100vw",
            background: "linear-gradient(135deg, #1F1F21 0%, #2A2A2E 100%)",
        }}>
            <Box sx={{
                display: "flex",
                background: {xs: "#1F1F21", md: "none"},
                zIndex: 5,
                boxShadow: {xs: "2px 4px 8px rgba(0, 0, 0, 1)", md: "none"},
                flexDirection: "column",
                borderRadius: {xs: "2rem", md: "0"},
                justifyContent: {xs: "space-evenly", md: "center"},
                gap: {md: 6, xs: 0},
                alignItems: "center",
                height: {xs: "16rem", md: "100%"},
                width: {xs: "22rem", md: "50%"},
                position: {xs: "absolute", md: "relative"},
                bottom: {xs: "-2rem", md: "0"}
            }}>
                <Typography
                    data-aos="fade-right"
                    fontFamily={font}
                    textAlign="center"
                    align="center"
                    color="#f6e962"
                    fontWeight="700"
                    fontSize="3rem"
                    variant="h1"
                    component="h1"
                >
                    DO YOU WANT A CHANGE?
                </Typography>
                <Typography
                    data-aos="fade-right"
                    data-aos-delay="250"
                    color="white"
                    fontSize="1.2rem"
                    fontFamily={font}
                    component="p"
                >
                    TRAIN WITH US!
                </Typography>
                <Typography
                    data-aos="fade-right"
                    data-aos-delay="350"
                    display={{xs: "none", md: "block"}}
                    color="white"
                    sx={{fontSize: {md: "1.2rem", xs: "1rem"}}}
                    align="center"
                    fontFamily={font}
                    component="p"
                >
                    A tool made for you to help you train and achieve your goals.
                </Typography>
            </Box>
            <Box data-aos="fade-up" sx={{
                display: "flex",
                overflow: "hidden",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: {xs: "60%", md: "100%"},
                width: {xs: "100%", md: "50%"}
            }}>
                <Box
                    component="img"
                    src="images/hero.jpg"
                    sx={{
                        display: { xs: "none", md: "block" },
                        borderRadius: "10px",
                        height: "80%",
                        width: "60%",
                        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2), 0px 1px 3px rgba(0, 0, 0, 0.14), 0px 2px 1px rgba(0, 0, 0, 0.12)",
                    }}
                />
                <Box
                    component="img"
                    src="images/hero3.jpg"
                    sx={{
                        display: { md: "none", xs: "block" },
                        height: "25rem",
                        width: "100%",
                        transform: "scale(1.5)",
                        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2), 0px 1px 3px rgba(0, 0, 0, 0.14), 0px 2px 1px rgba(0, 0, 0, 0.12)",
                    }}
                />
            </Box>

        </Box>
    );
}

export default Hero;