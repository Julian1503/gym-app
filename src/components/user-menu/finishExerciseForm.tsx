import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
} from '@mui/material';
import ApiService from "../../services/apiService";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {CalendarEvent, FinishData} from "../../@types/CalendarEvent";


interface FinishExerciseFormProps {
    open: boolean;
    onFinish: (eventId: number, data: Array<FinishData>) => void;
    eventId: number;
    onClose: () => void;
}

const FinishExerciseForm: React.FC<FinishExerciseFormProps> = ({ open, onClose, onFinish, eventId }) => {
    const getDefaultData = () => ({
        order: 1,
        repetitions: 0,
        weight: 0,
        rest: '00:00',
        duration: '00:00',
        exerciseDayPlanId: eventId,
    });
    const [series, setSeries] = useState(1);
    const [data, setData] = useState<Array<FinishData>>([getDefaultData()]);
    const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});

    const handleSaveButton = () => {
        const newFieldErrors: { [key: string]: string } = {};

        data.forEach((row, index) => {
            if (row.repetitions === 0) {
                newFieldErrors[`repetitions-${index}`] = 'Repetitions field is required';
            }
            if (row.weight === 0) {
                newFieldErrors[`weight-${index}`] = 'Weight field is required';
            }
            if (row.rest === '00:00') {
                newFieldErrors[`rest-${index}`] = 'Rest field is required';
            }
            if (row.duration === '00:00') {
                newFieldErrors[`duration-${index}`] = 'Duration field is required';
            }
        });

        setFieldErrors(newFieldErrors);

        if (Object.keys(newFieldErrors).length > 0) {
            setFieldErrors(newFieldErrors);
        } else {
            setFieldErrors({});
            onFinish(eventId, data);
            onClose();
            setSeries(1);
            setData([getDefaultData()]);
        }
    };

    const handleSeriesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newSeries = parseInt(event.target.value, 10) || 1;
        setSeries(newSeries);

        if (newSeries > data.length) {
            const additionalData = new Array(newSeries - data.length).fill(undefined).map((_, index) => ({
                ...getDefaultData(),
                order: data.length + index + 1,
            }));
            setData([...data, ...additionalData]);
        } else if (newSeries < data.length) {
            setData(data.slice(0, newSeries));
        }
    };

    const handleDataChange = (index: number, property: keyof FinishData, value: string) => {
        const newValue = parseFloat(value);

        if (!isNaN(newValue) && newValue > 0) {
            const newData = [...data];
            if (property === 'rest' || property === 'duration') {
                newData[index] = { ...newData[index], [property]: value };
            } else {
                newData[index] = { ...newData[index], [property]: newValue };
            }
            setData(newData);
        }
    };

    return (
        <Dialog open={open} onClose={()=>{
            onClose();
            setData([getDefaultData()]);
            setSeries(1);
        }}>
            <DialogTitle>Finishing Exercise</DialogTitle>
            <DialogContent>
                <TextField
                    label="Series"
                    type="number"
                    value={series}
                    onChange={handleSeriesChange}
                    fullWidth
                    margin="normal"
                />
                <Paper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Serie N</TableCell>
                                <TableCell>Repetitions</TableCell>
                                <TableCell>Weight (kgs)</TableCell>
                                <TableCell>Rest (s)</TableCell>
                                <TableCell>Duration (s)</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>
                                        <TextField
                                            type="number"
                                            value={row.repetitions}
                                            onChange={(e) => handleDataChange(index, 'repetitions', e.target.value)}
                                        />
                                        {fieldErrors[`repetitions-${index}`] && (
                                            <div style={{ color: 'red' }}>{fieldErrors[`repetitions-${index}`]}</div>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            type="number"
                                            value={row.weight}
                                            onChange={(e) => handleDataChange(index, 'weight', e.target.value)}
                                        />
                                        {fieldErrors[`weight-${index}`] && (
                                            <div style={{ color: 'red' }}>{fieldErrors[`weight-${index}`]}</div>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            type="time"
                                            value={row.rest}
                                            onChange={(e) => handleDataChange(index, 'rest', e.target.value)}
                                        />
                                        {fieldErrors[`rest-${index}`] && (
                                            <div style={{ color: 'red' }}>{fieldErrors[`rest-${index}`]}</div>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            type="time"
                                            value={row.duration}
                                            onChange={(e) => handleDataChange(index, 'duration', e.target.value)}
                                        />
                                        {fieldErrors[`duration-${index}`] && (
                                            <div style={{ color: 'red' }}>{fieldErrors[`duration-${index}`]}</div>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSaveButton} color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default FinishExerciseForm;
