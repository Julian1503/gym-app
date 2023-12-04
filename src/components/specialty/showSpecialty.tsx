import {Box} from "@mui/material";
import Typography from "@mui/material/Typography";
import React from "react";
import {Specialty} from "../../@types/Specialty";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/bundle';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide} from 'swiper/react';
import { Pagination, FreeMode, A11y } from 'swiper';
import {useTheme} from "@mui/material/styles";

type ShowSpecialtyProps = {
    specialties: Specialty[]
}

/* The code you provided is a functional component called `ShowSpecialty`. It takes in a prop called `specialties` of type
`Specialty[]`. Inside the component, it uses the `useTheme` hook from Material-UI to access the current theme. */
const ShowSpecialty = ({specialties} : ShowSpecialtyProps) => {
    const theme = useTheme();
    return (
        <Box id="services" sx={{pt:"3rem", pb: "10rem", height: {xs:"64vh", md:"60vh"}, backgroundColor: theme.palette.background.paper, textAlign: "center"}}>
            <Box mb={4}>
                <Typography textAlign="center" variant="h1" component="h1" >
                    Our services
                </Typography>
                <Typography variant="subtitle2" component="p">
                    We offer a variety of services for you.
                </Typography>
            </Box>
            <Box sx={{display: "flex", flexDirection: {md:"row", xs:"column"}, justifyContent: "center", alignItems: "center", height: "100%", width: "100vw"}}>
                <Swiper
                    effect={"coverflow"}
                    modules={[FreeMode, Pagination, A11y]}
                    slidesPerView={"auto"}
                    centeredSlides={true}
                    freeMode={true}
                    spaceBetween={16}
                    pagination={{
                        dynamicBullets: true,
                        clickable: true,
                        enabled: false
                    }}
                    breakpoints = {{
                        1024: {
                            slidesPerView: 3,
                            initialSlide: 1.5
                        }
                    }}
                    style={{height:"100%", width: "100%"}}>
                {specialties.map((specialty) => (
                    <SwiperSlide key={specialty.specialtyId} style={{position: "relative"}}>
                        <Box
                            sx={{
                                position: 'relative',
                                display: 'flex',
                                pb: 2,
                                boxShadow: {
                                    xs: '2px 4px 8px rgba(0, 0, 0, 1)',
                                },
                                margin: '2rem auto',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                height: { xs: '60%', sm: "80%", md: '70%' },
                                width: { xs: '70%', sm: "75%", md: '85%'},
                                background: `linear-gradient(145deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                                borderRadius: '2rem',
                                gap: 2,
                                '&:hover': {
                                    transform: 'scale(1.03)',
                                    boxShadow: '4px 8px 16px rgba(0, 0, 0, 0.4)',
                                    transition: 'all 0.3s ease-in-out',
                                },
                            }}
                        >
                            <Box
                                component="img"
                                src={specialty.photo}
                                sx={{
                                    height: '80%',
                                    width: '100%',
                                    borderRadius: '2rem 2rem 0.5rem 0.5rem',
                                }}
                            />
                            <Typography
                                mb={2}
                                color="#fff"
                                fontWeight="700"
                                fontSize="1.5rem"
                            >
                                {specialty.name}
                            </Typography>
                        </Box>
                    </SwiperSlide>
                ))}
            </Swiper>
            </Box>
        </Box>
    );
}

export default ShowSpecialty;