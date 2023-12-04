import {
    TextField,
    Grid,
    Typography,
} from '@mui/material';
import {Trainer} from "../../@types/Trainer";
import ApiService from "../../services/apiService";
import {FC, useState} from "react";
import {useTheme} from "@mui/material/styles";
import {FormContainer} from "../form/form-container";
import {SubmitButton} from "../form/submit-button";
import {FormProps} from "../../@types/Props";
import {DateField} from "@mui/x-date-pickers";
import SelectField from "../form/select-field";
import {documentTypes, SelectType} from "../../@types/DocumentTypes";
import {genders} from "../../@types/Genders";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import moment from "moment";

export const TrainerForm: FC<FormProps<Trainer>> = ({onSubmit, selectedItem, onCancel, handleUpdate}) => {
    const token = useSelector<RootState, string | null>(state => state.auth.token);
    const [name, setName] = useState(selectedItem?.name || '');
    const [lastName, setLastName] = useState(selectedItem?.lastName || '');
    const [identifier, setIdentifier] = useState(selectedItem?.identifier || '');
    const personId = selectedItem?.personId || null;
    const specialties =selectedItem?.specialties || [];
    const [birthDate, setBirthDate] = useState<Date | null>(moment.utc(selectedItem?.birthDate).toDate());
    const [documentType, setDocumentType] = useState<SelectType>(documentTypes.filter((d)=> d.value === selectedItem?.identifierType)[0] || {id: 0, name: '', value: ''});
    const [phoneNumber, setPhoneNumber] = useState(selectedItem?.phoneNumber || '');
    const fingerPrintData = selectedItem?.fingerPrintData || null;
    const photo = selectedItem?.photo || null;
    const [street, setStreet] = useState(selectedItem?.street || '');
    const [houseNumber, setHouseNumber] = useState(selectedItem?.houseNumber || '');
    const [floor, setFloor] = useState(selectedItem?.floor || null);
    const [door, setDoor] = useState(selectedItem?.door || null);
    const [gender, setGender] = useState<SelectType>(genders.filter((g)=> g.value === selectedItem?.gender)[0] || {id: 0, name: '', value: ''});
    const user = selectedItem?.user || null;
    const [trainerNumber, setTrainerNumber] = useState(selectedItem?.trainerNumber || '');
    const [hireDate, setHireDate] = useState<Date>(moment.utc(selectedItem?.hireDate).toDate());
    const [fieldErrors, setFieldErrors] = useState<{ [field: string]: string }>({});

    const theme = useTheme();

    const handleSubmit = () => {
        const apiService = ApiService.getInstance();
        if(personId) {
            handleUpdate?.
            ({ name,
                lastName,
                identifier,
                identifierType: documentType?.value,
                phoneNumber,
                fingerPrintData,
                photo,
                street,
                houseNumber,
                floor,
                door,
                gender: gender?.value,
                birthDate,
                user,
                trainerNumber,
                trainerId: personId,
                personId,
                specialties,
                hireDate} as Trainer)
                .then(res => {
                    if(res.status === 200) {
                        onSubmit(res.response);
                    }
                });
        }
        apiService.post('/trainer/create', {
            name,
            lastName,
            identifier,
            identifierType: documentType?.value,
            phoneNumber,
            fingerPrintData,
            photo,
            street,
            houseNumber,
            floor,
            door,
            gender: gender?.value,
            birthDate,
            user,
            trainerNumber,
            hireDate,
        }, token)
            .then(res => {
                if(res.status === 200) {
                    onSubmit(res.response);
                    setFieldErrors({});
                }
            })
            .catch(err => {
                if (err.message) {
                    const errorResponse = JSON.parse(err.message);
                    const errorMessage = errorResponse.errorResponse[0];
                    const field = errorMessage.split(" ")[0];
                    setFieldErrors({...fieldErrors, [field]: errorMessage});
                }
            });
    };

    return (
        <form>
            <FormContainer>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant="h5" gutterBottom>Trainer Information</Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Name"
                            helperText={fieldErrors.name}
                            error={Boolean(fieldErrors.name)}
                            color="primary"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            InputLabelProps={{
                                style: {color: theme.palette.text.primary},
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Last Name"
                            value={lastName}
                            helperText={fieldErrors.lastName}
                            error={Boolean(fieldErrors.lastName)}
                            onChange={e => setLastName(e.target.value)}
                            InputLabelProps={{
                                style: {color: theme.palette.text.primary},
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Identifier"
                            value={identifier}
                            helperText={fieldErrors.identifier}
                            error={Boolean(fieldErrors.identifier)}
                            onChange={e => setIdentifier(e.target.value)}
                            InputLabelProps={{
                                style: {color: theme.palette.text.primary},
                            }}
                        />
                    </Grid>
                    <SelectField
                        id="document-type"
                        label="Document Type"
                        values={documentTypes}
                        selectedValue={documentType.id}
                        multiple={false}
                        onSelectionChange={(d) => setDocumentType(documentTypes.filter((dt) => dt.id === d)[0])}
                    />
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Phone Number"
                            value={phoneNumber}
                            helperText={fieldErrors.phoneNumber}
                            error={Boolean(fieldErrors.phoneNumber)}
                            onChange={e => setPhoneNumber(e.target.value)}
                            InputLabelProps={{
                                style: {color: theme.palette.text.primary},
                            }}
                        />
                    </Grid>
                    <SelectField
                        id="gender"
                        label="Gender"
                        values={genders}
                        selectedValue={gender.id}
                        multiple={false}
                        onSelectionChange={(g1) => setGender(genders.filter((g2) => g2.id === g1)[0])}
                    />
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Street"
                            value={street}
                            helperText={fieldErrors.street}
                            error={Boolean(fieldErrors.street)}
                            onChange={e => setStreet(e.target.value)}
                            InputLabelProps={{
                                style: {color: theme.palette.text.primary},
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="House Number"
                            value={houseNumber}
                            helperText={fieldErrors.houseNumber}
                            error={Boolean(fieldErrors.houseNumber)}
                            onChange={e => setHouseNumber(e.target.value)}
                            InputLabelProps={{
                                style: {color: theme.palette.text.primary},
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Floor"
                            value={floor}
                            helperText={fieldErrors.floor}
                            error={Boolean(fieldErrors.floor)}
                            onChange={e => setFloor(e.target.value)}
                            InputLabelProps={{
                                style: {color: theme.palette.text.primary},
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Door"
                            value={door}
                            helperText={fieldErrors.door}
                            error={Boolean(fieldErrors.door)}
                            onChange={e => setDoor(e.target.value)}
                            InputLabelProps={{
                                style: {color: theme.palette.text.primary},
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <DateField
                            label="Birth Date"
                            sx={{width: "100%"}}
                            value={birthDate || null}
                            onChange={(date : Date | null) => setBirthDate(date || null)}
                            format="dd/MM/yyyy"
                            disableFuture
                            InputLabelProps={{
                                style: {color: theme.palette.text.primary},
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Trainer Number"
                            value={trainerNumber}
                            helperText={fieldErrors.trainerNumber}
                            error={Boolean(fieldErrors.trainerNumber)}
                            onChange={e => setTrainerNumber(e.target.value)}
                            InputLabelProps={{
                                style: {color: theme.palette.text.primary},
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <DateField
                            label="Hire Date"
                            value={hireDate}
                            sx={{width: "100%"}}
                            onChange={(date : Date | null) => setHireDate(date || new Date())}
                            format="dd/MM/yyyy"
                            disableFuture
                            InputLabelProps={{
                                style: {color: theme.palette.text.primary},
                            }}
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

export default TrainerForm;
