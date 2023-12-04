import {Box, Button, IconButton, Typography} from "@mui/material";
import {Add, NavigateBefore, NavigateNext, Today} from "@mui/icons-material";
import React from "react";
import {ToolbarProps, Event} from "react-big-calendar";
import {DatePicker} from "@mui/x-date-pickers";
type CalendarToolbarProps = ToolbarProps & {
    onChangeDate: (value: Date | null) => void;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    showAddNew: boolean;
};

const CalendarToolbar = (props : CalendarToolbarProps) => {
    const { setOpen, showAddNew, view, onNavigate, label, date} = props;
    return (
        view === 'week' ?
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: 2,
                    gap: 3

                }}
            >
                <DatePicker value={date} onChange={props.onChangeDate}/>
                {showAddNew && <Button
                    startIcon={<Add />}
                    onClick={() => setOpen(true)}
                >
                    Add a new exercise
                </Button>}
                <Button
                    onClick={() => onNavigate('TODAY')}
                >
                    Today
                </Button>
            </Box>
            :
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", p: 1}}>
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <IconButton color="secondary" onClick={() => onNavigate('PREV')}>
                        <NavigateBefore />
                    </IconButton>
                    <Typography variant="h5" fontWeight={700} component="div" style={{ color: "#007F5F" }}>
                        {label}
                    </Typography>
                    <IconButton color="secondary" onClick={() => onNavigate('NEXT')}>
                        <NavigateNext />
                    </IconButton>
                </Box>
                <Button
                    startIcon={<Today />}
                    onClick={() => onNavigate('TODAY')}
                    variant="contained"
                    color="primary"
                    style={{ marginTop: '10px' }}
                >
                    Today
                </Button>
                {showAddNew && <Button
                    variant="contained"
                    color="primary"
                    startIcon={<Add />}
                    style={{ position: "fixed", bottom: "20px", right: "20px", zIndex: 1 }}
                    onClick={() => setOpen(true)}
                    >
                    Add a new exercise
                    </Button>}
            </Box>

    )
}
export default CalendarToolbar;