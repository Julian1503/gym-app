// MembershipForm.tsx
import { TextField, Typography, Grid } from '@mui/material';
import ApiService from "../../services/apiService";
import { Membership } from "../../@types/Membership";
import {FC, useState} from "react";
import { useTheme } from "@mui/material/styles";
import { FormContainer } from "../form/form-container";
import { SubmitButton } from "../form/submit-button";
import { FormProps } from "../../@types/Props";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";

export const MembershipForm: FC<FormProps<Membership>> = ({ onSubmit, selectedItem, onCancel, handleUpdate}) => {
    const token = useSelector<RootState, string | null>(state => state.auth.token);
    const [name, setName] = useState(selectedItem?.name || '');
    const [description, setDescription] = useState(selectedItem?.description || '');
    const [days, setDays] = useState(selectedItem?.days || 0);
    const [price, setPrice] = useState(selectedItem?.price || 0);
    const membershipId = selectedItem?.membershipId;
    const [fieldErrors, setFieldErrors] = useState<{ [field: string]: string }>({});

    const handleSubmit = () => {
        const apiService = ApiService.getInstance();
        if(membershipId) {
            handleUpdate?.({
                membershipId, name, description, price, days
            } as Membership).then(res => {
                onSubmit(res.response);
                setFieldErrors({});
            });
        } else {
            apiService.post('/membership/create', {
                name, description, days, price
            }, token)
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
                        <Typography variant="h5" gutterBottom>Membership Information</Typography>
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
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Description"
                            color="primary"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Days"
                            color="primary"
                            type="number"
                            value={days}
                            onChange={e => setDays(Number(e.target.value))}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Price"
                            color="primary"
                            type="number"
                            value={price}
                            onChange={e => setPrice(Number(e.target.value))}
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
