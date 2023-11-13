import React, { useState } from 'react';
import { Box, List, ListItem, ListItemText, Modal, TextField, Button, Grid } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

type Exercise = {
    name: string;
    date: Date;
};

const UserMenu: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    const [open, setOpen] = useState(false);
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [newExercise, setNewExercise] = useState('');

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAddExercise = () => {
        setExercises([...exercises, { name: newExercise, date: selectedDate as Date }]);
        setNewExercise('');
        handleClose();
    };

    return (
        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    label="Week Planner"
                    value={selectedDate}
                    onChange={handleDateChange}
                    renderInput={() => <TextField  />}
                />
            </LocalizationProvider>
            <List>
                {exercises
                    .filter((exercise) => exercise.date.toISOString().slice(0, 10) === selectedDate?.toISOString().slice(0, 10))
                    .map((exercise, index) => (
                        <ListItem key={index}>
                            <ListItemText primary={exercise.name} />
                        </ListItem>
                    ))}
            </List>
            <Button onClick={handleOpen}>
                Add Exercise
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4
                }}>
                    <Grid container direction="column" spacing={2}>
                        <Grid item>
                            <TextField
                                label="Exercise"
                                value={newExercise}
                                onChange={(e) => setNewExercise(e.target.value)}
                            />
                        </Grid>
                        <Grid item>
                            <Button onClick={handleAddExercise}>
                                Add
                        </Button>
                    </Grid>
                </Grid>
        </Box>
</Modal>
</Box>
);
};

export default UserMenu;