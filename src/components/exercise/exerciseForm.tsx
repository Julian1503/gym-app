import {
    Button,
    FormControl,
    InputLabel,
    Select,
    TextField,
    MenuItem,
    Slider,
    Typography,
    Box,
    Grid,
} from '@mui/material';
import {Exercise} from "../../@types/Exercise";
import ApiService from "../../services/apiService";
import {Specialty} from "../../@types/Specialty";
import {Step} from "../../@types/Step";
import {Equipment} from "../../@types/Equipment";
import {StepComponent} from "./stepComponent";
import React, {useEffect, useState} from "react";
import {useTheme} from "@mui/material/styles";
import {FormContainer} from "../form/form-container";
import {SubmitButton} from "../form/submit-button";
import {SpecialtyForm} from "../specialty/specialtyForm";
import {FormProps} from "../../@types/Props";
import DialogForm from "../form/dialog";
import SelectField from "../form/select-field";
import {EquipmentForm} from "../equipment/equipmentForm";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";

export const ExerciseForm: React.FC<FormProps<Exercise>> = ({onSubmit, selectedItem, onCancel, handleUpdate}) => {
    const token = useSelector<RootState, string | null>(state => state.auth.token);
    const [name, setName] = useState(selectedItem?.name || '');
    const [description, setDescription] = useState(selectedItem?.description || '');
    const [exerciseId, setExerciseId] = useState(selectedItem?.exerciseId);
    const [muscleGroup, setMuscleGroup] = useState(selectedItem?.muscleGroup || '');
    const [difficultyLevel, setDifficultyLevel] = useState(selectedItem?.difficultyLevel || 1);
    const [steps, setSteps] = useState<Step[]>(selectedItem?.steps || []);
    const [formSpecialties, setFormSpecialties] = useState<Specialty[]>(selectedItem?.specialties || []);
    const [formEquipments, setFormEquipments] = useState<Equipment[]>(selectedItem?.equipments || []);
    const [availableSpecialties, setAvailableSpecialties] = useState<Specialty[]>([]);
    const [availableEquipments, setAvailableEquipments] = useState<Equipment[]>([]);
    const [openSpecialtyDialog, setOpenSpecialtyDialog] = useState(false);
    const [openEquipmentDialog, setOpenEquipmentDialog] = useState(false);
    const [fieldErrors, setFieldErrors] = useState<{ [field: string]: string }>({});
    const theme = useTheme();

    function fetchFormDependencies() {
        const apiService = ApiService.getInstance();
        apiService.get('/equipment/get-all', token)
            .then(res => setAvailableEquipments(res.response))
            .catch(err => console.error(err));
        apiService.get('/specialty/get-all', token)
            .then(res => setAvailableSpecialties(res.response))
            .catch(err => {
                console.error(err);
            });
    }

    useEffect(() => {
        fetchFormDependencies();
    }, []);


    const handleSpecialtyCreation = (newSpecialty: Specialty) => {
        setAvailableSpecialties([...availableSpecialties, newSpecialty]);
        setOpenSpecialtyDialog(false);
    };

    const handleEquipmentCreation = (newEquipment: Equipment) => {
        setAvailableEquipments([...availableEquipments, newEquipment]);
        setOpenEquipmentDialog(false);
    };

    const handleSubmit = () => {
        const apiService = ApiService.getInstance();
        if(exerciseId) {
            handleUpdate?.({
                name,
                description,
                muscleGroup,
                difficultyLevel,
                steps,
                specialties: formSpecialties,
                equipments: formEquipments,
                exerciseId,
                photo: ''
            } as Exercise).then(res => {
                onSubmit(res.response);
                setFieldErrors({});
            });
        } else {
            apiService.post('/exercise/create', {
                name,
                description,
                muscleGroup,
                difficultyLevel,
                steps,
                specialties: formSpecialties,
                equipments: formEquipments
            }, token)
                .then(res => {
                    onSubmit(res.response);
                    setFieldErrors({});
                })
                .catch(err => {
                    if (err.message) {
                        const errorResponse = JSON.parse(err.message);
                        const errorMessage = errorResponse.errorResponse[0];
                        const field = errorMessage.split(" ")[0];
                        setFieldErrors({...fieldErrors, [field]: errorMessage});
                    }
                });
        }
    };

    return (
        <form>
            <FormContainer>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant="h5" gutterBottom>Exercise Information</Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Name"
                            helperText={fieldErrors.Name}
                            error={Boolean(fieldErrors.Name)}
                            color="primary"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            InputLabelProps={{
                                style: {color: theme.palette.text.primary},
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControl sx={{width:"100%"}}>
                            <InputLabel>Muscle Group</InputLabel>
                            <Select
                                value={muscleGroup}
                                onChange={(e) =>
                                    setMuscleGroup( e.target.value )
                                }
                            >
                                <MenuItem value="Chest">Chest</MenuItem>
                                <MenuItem value="Back">Back</MenuItem>
                                <MenuItem value="Shoulders">Shoulders</MenuItem>
                                <MenuItem value="Arms">Arms</MenuItem>
                                <MenuItem value="Legs">Legs</MenuItem>
                                <MenuItem value="Core">Core</MenuItem>
                                <MenuItem value="Other">Other</MenuItem>
                            </Select>
                        </FormControl>
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
                            InputLabelProps={{
                                style: {color: theme.palette.text.primary},
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography id="difficulty-label" variant="subtitle1" gutterBottom>Difficulty Level</Typography>
                        <Slider
                            value={difficultyLevel}
                            min={0}
                            max={10}
                            step={1}
                            onChange={(_, newValue) => setDifficultyLevel(newValue as number)}
                            valueLabelDisplay="auto"
                            aria-labelledby="difficulty-label"
                        />
                    </Grid>
                    <SelectField
                        id="specialties"
                        label="Specialties"
                        values={availableSpecialties.map(specialty => ({ id: specialty.specialtyId, name: specialty.name }))}
                        selectedValue={formSpecialties.map(specialty => specialty.specialtyId)}
                        onSelectionChange={values => {
                            // We ensure that 'values' is always an array here using Array.isArray() check
                            const ids = Array.isArray(values) ? values : [values];
                            const selectedSpecialties = availableSpecialties.filter(specialty => ids.includes(specialty.specialtyId));
                            setFormSpecialties(selectedSpecialties);
                        }}
                        onAddButtonClick={() => setOpenSpecialtyDialog(true)}
                    />
                    <SelectField
                        id="equipment"
                        label="Equipment"
                        values={availableEquipments.map(equipment => ({ id: equipment.equipmentId, name: equipment.name }))}
                        selectedValue={formEquipments.map(formEquipment => formEquipment.equipmentId)}
                        onSelectionChange={values => {
                            const ids = Array.isArray(values) ? values : [values];
                            const selectedEquipment = availableEquipments.filter(equipment => ids.includes(equipment.equipmentId));
                            setFormEquipments(selectedEquipment);
                        }}
                        onAddButtonClick={() => setOpenEquipmentDialog(true)}
                    />
                    <Grid item xs={12}>
                        <Typography variant="h5" color="primary" gutterBottom>Exercise Steps</Typography>
                        <Box sx={{mb: 2}}>
                            {steps.map((step, index) => (
                                <StepComponent
                                    key={index}
                                    step={step}
                                    onDescriptionChange={(newDescription) => {
                                        const newSteps = steps.map((s, i) => i === index ? {
                                            ...s,
                                            description: newDescription
                                        } : s);
                                        setSteps(newSteps);
                                    }}
                                    onDelete={() => {
                                        const newSteps = steps.filter((_, i) => i !== index);
                                        setSteps(newSteps);
                                    }}
                                />
                            ))}
                        </Box>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                const newSteps = [...steps, {description: '', order: steps.length + 1}];
                                setSteps(newSteps);
                            }}
                        >
                            Add Step
                        </Button>
                        {fieldErrors.Steps && <Typography color="error">{fieldErrors.Steps}</Typography>}
                    </Grid>
                    <Grid item xs={5} md={2}>
                        <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
                    </Grid>
                    <Grid item xs={5} md={2}>
                        <SubmitButton onClick={onCancel}>Cancel</SubmitButton>
                    </Grid>
                </Grid>
            </FormContainer>
            <DialogForm
                open={openSpecialtyDialog}
                onClose={() => setOpenSpecialtyDialog(false)}
                title="Add Specialty"
            >
                <SpecialtyForm onSubmit={handleSpecialtyCreation} onCancel={() => setOpenSpecialtyDialog(false)}
                               selectedItem={null}/>
            </DialogForm>
            <DialogForm
                open={openEquipmentDialog}
                onClose={() => setOpenEquipmentDialog(false)}
                title="Add Equipment"
            >
                <EquipmentForm onSubmit={handleEquipmentCreation} onCancel={() => setOpenEquipmentDialog(false)}
                               selectedItem={null}/>
            </DialogForm>
        </form>
    );
};