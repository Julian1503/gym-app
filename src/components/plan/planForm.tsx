import React, { useState, useEffect } from "react";
import {
    TextField,
    Typography,
    Grid,
    Card,
    CardMedia,
    CardContent,
    Checkbox,
    FormControlLabel,
} from "@mui/material";
import ApiService from "../../services/apiService";
import { Plan } from "../../@types/Plan";
import { useTheme } from "@mui/material/styles";
import { FormContainer } from "../form/form-container";
import { SubmitButton } from "../form/submit-button";
import { FormProps } from "../../@types/Props";
import { Trainer } from "../../@types/Trainer";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/bundle";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination, A11y } from "swiper";

export const PlanForm: React.FC<
    FormProps<Plan> & { selectedMemberId: number | null | undefined }
    > = ({ onSubmit, selectedItem, onCancel, selectedMemberId , handleUpdate}) => {
    const token = useSelector<RootState, string | null>(
        (state) => state.auth.token
    );
    const [name, setName] = useState(selectedItem?.name || "");
    const planId = selectedItem?.planId;
    const dayPlans = selectedItem?.dayPlans || [];
    const [trainers, setTrainers] = useState<Trainer[]>([]);
    const [selectedTrainers, setSelectedTrainers] = useState<Trainer[]>(
        selectedItem?.trainers || []
    );
    const memberId = selectedMemberId || "";

    useEffect(() => {
        const apiService = ApiService.getInstance();
        apiService
            .get("/trainer/get-all", token)
            .then((res) => setTrainers(res.response))
            .catch((err) => console.error(err));
    }, [selectedMemberId]);

    const handleSubmit = () => {
        const apiService = ApiService.getInstance();
        if(planId) {
            handleUpdate?.({
                planId, name, trainers: selectedTrainers, memberId: selectedMemberId, dayPlans: dayPlans
            } as Plan).then(res => {
                onSubmit(res.response);
            });
        } else {
            apiService
                .post("/plan/create", {
                    name,
                    memberId,
                    trainers: selectedTrainers,
                }, token)
                .then((res) => {
                    onSubmit(res.response);
                })
                .catch((err) => console.error(err));
        }
    };

    const handleTrainerSelection = (trainer: Trainer) => {
        const updatedTrainers = selectedTrainers.includes(trainer)
            ? selectedTrainers.filter((t) => t !== trainer)
            : [...selectedTrainers, trainer];

        setSelectedTrainers(updatedTrainers);
    };

    console.log(selectedTrainers)

    return (
        <form>
            <FormContainer>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant="h5" gutterBottom>
                            Plan Information
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Plan Name"
                            color="primary"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom>
                            Trainers
                        </Typography>
                        <Swiper
                            modules={[FreeMode, Pagination, A11y]}
                            slidesPerView={"auto"}
                            centeredSlides={true}
                            freeMode={true}
                            spaceBetween={16}
                            pagination={{
                                dynamicBullets: true,
                                clickable: true,
                            }}
                            breakpoints={{
                                1024: {
                                    slidesPerView: 3,
                                    initialSlide: 1.5,
                                },
                            }}
                            style={{ height: "100%", width: "100%" }}
                        >
                            {trainers.map((trainer) => (
                                <SwiperSlide
                                    key={trainer.trainerId}
                                    style={{ position: "relative" }}
                                >
                                    <Card style={{ minWidth: "200px" }}>
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            image={trainer.photo}
                                        />
                                        <CardContent>
                                            <Typography
                                                textAlign="center"
                                                variant="h6"
                                                color="secondary"
                                                component="div"
                                            >
                                                {trainer.name} {trainer.lastName}
                                            </Typography>
                                            <Typography variant="body2" color="secondary">
                                                {trainer.specialties
                                                    ?.map((specialty) => specialty.name)
                                                    .join(", ")}
                                            </Typography>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={selectedTrainers.includes(trainer)}
                                                        onChange={(e) => {
                                                            e.stopPropagation();
                                                            handleTrainerSelection(trainer);
                                                        }}
                                                    />
                                                }
                                                label="Select"
                                            />
                                        </CardContent>
                                    </Card>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </Grid>
                    <Grid item xs={6}>
                        <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
                    </Grid>
                    <Grid item xs={6}>
                        <SubmitButton onClick={onCancel}>Cancel</SubmitButton>
                    </Grid>
                </Grid>
            </FormContainer>
        </form>
    );
};
