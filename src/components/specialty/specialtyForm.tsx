import {TextField, Typography, Grid} from '@mui/material';
import ApiService from "../../services/apiService";
import {Specialty} from "../../@types/Specialty";
import {FC, useState} from "react";
import {useTheme} from "@mui/material/styles";
import { FormContainer } from "../form/form-container";
import {SubmitButton} from "../form/submit-button";
import {FormProps} from "../../@types/Props";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";

export const SpecialtyForm: FC<FormProps<Specialty>> = ({  onSubmit, selectedItem, onCancel, handleUpdate}) => {
    const token = useSelector<RootState, string | null>(state => state.auth.token);
    const [name, setName] = useState(selectedItem?.name || '');
    const [specialtyId, setSpecialtyId] = useState(selectedItem?.specialtyId);
    const [description, setDescription] = useState(selectedItem?.description || '');
    const [photoUrl, setPhotoUrl] = useState(selectedItem?.photo || '');
    const [fieldErrors, setFieldErrors] = useState<{ [field: string]: string }>({});

    const handleSubmit = () => {
        const apiService = ApiService.getInstance();
        if(specialtyId) {
            handleUpdate?.({
                specialtyId, name, description, photo: photoUrl
            } as Specialty).then(res => {
                onSubmit(res.response);
                setFieldErrors({});
            });
        } else {
            apiService.post('/specialty/create', {
                name, description, photoUrl
            }, token)
                .then(res => {
                    onSubmit(res.response);
                    setFieldErrors({});
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
                        <Typography variant="h5" gutterBottom>Specialty Information</Typography>
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
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Description"
                            multiline
                            rows={4}
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Photo URL"
                            value={photoUrl}
                            onChange={e => setPhotoUrl(e.target.value)}
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