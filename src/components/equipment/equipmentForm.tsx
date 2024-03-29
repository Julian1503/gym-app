import {TextField, Typography, Grid, FormControl, InputLabel, Select, MenuItem} from '@mui/material';
import ApiService from "../../services/apiService";
import { Equipment } from "../../@types/Equipment";
import React, { useState } from "react";
import { FormContainer } from "../form/form-container";
import { SubmitButton } from "../form/submit-button";
import { FormProps } from "../../@types/Props";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {AuthState} from "../../store/auth/authSlice";

export const EquipmentForm: React.FC<FormProps<Equipment>> = ({ onSubmit, selectedItem, onCancel, handleUpdate }) => {
    const token = useSelector<RootState, AuthState>(state => state.auth);
    const [name, setName] = useState(selectedItem?.name || '');
    const equipmentId = selectedItem?.equipmentId;
    const [type, setType] = useState(selectedItem?.type || '');
    const [quantity, setQuantity] = useState(selectedItem?.quantity || 0);
    const [fieldErrors, setFieldErrors] = useState<{ [field: string]: string }>({});

    const handleSubmit = () => {
        const apiService = ApiService.getInstance();
        if(equipmentId) {
            handleUpdate?.({
                equipmentId, name, type, quantity
            } as Equipment).then(res => {
                onSubmit(res.response);
                setFieldErrors({});
            });
        } else {
            apiService.post('/equipment/create', {
                name, type, quantity
            }, token.token)
                .then(res => {
                    onSubmit(res.response);
                })
                .catch(err => {
                    if (err.message) {
                        const errorResponse = JSON.parse(err.message);
                        const errorMessage = errorResponse.errorResponse[0];
                        const field = errorMessage.split("'")[1];
                        setFieldErrors({ ...fieldErrors, [field]: errorMessage });
                    }
                });
        }
    };

    return (
        <form>
            <FormContainer>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant="h5" gutterBottom>Equipment Information</Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Name"
                            color="primary"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControl sx={{width:"100%"}}>
                            <InputLabel>Type</InputLabel>
                            <Select
                                value={type}
                                onChange={(e) =>
                                    setType( e.target.value )
                                }
                            >
                                <MenuItem value="Barbell">Barbell</MenuItem>
                                <MenuItem value="Dumbbell">Dumbbell</MenuItem>
                                <MenuItem value="Machine">Machine</MenuItem>
                                <MenuItem value="Cable">Cable</MenuItem>
                                <MenuItem value="Bodyweight">Body Weight</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Quantity"
                            color="primary"
                            type="number"
                            value={quantity}
                            onChange={e => setQuantity(parseInt(e.target.value))}
                        />
                    </Grid>
                    <Grid item xs={5} md={2}>
                        <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
                    </Grid>
                    <Grid item xs={5} md={2}>
                        <SubmitButton onClick={onCancel}>Cancel</SubmitButton>
                    </Grid>
                </Grid>
            </FormContainer>
        </form>
    );
};