import React from "react";
import {Card, CardContent, CardMedia, Typography, Fab, Box, IconButton} from "@mui/material";
import { motion } from "framer-motion";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import EditIcon from '@mui/icons-material/Edit';
import ReplayIcon from '@mui/icons-material/Replay';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import {CalendarEvent} from "../../@types/CalendarEvent";

interface EventProps {
    event: CalendarEvent;
    eventSelected: number;
    onEdit: (event: CalendarEvent) => void;
    onDelete: (event: CalendarEvent) => void;
    onFinish: (event: CalendarEvent) => void;
    onRestart: (event: CalendarEvent) => void;
    moveEvent: (eventId: number, up: boolean) => void;
}

const EventComponent: React.FC<EventProps> = ({ event, eventSelected, onEdit, onDelete, onRestart, onFinish, moveEvent }) => {
    const { id, title, image, finished } = event;
    const isSelected = id === eventSelected && !finished;

    return  (
        <motion.div
            data-id="pt"
            style={{ width: '100%', position: 'relative' }}
            initial={{ scale: 1, y: 0 }}
            animate={isSelected ? { scale: 1.03, y: -10 } : { scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 300 }}
        >
            <Card style={{backgroundColor: "#282828", marginTop: 60, marginBottom: 40, boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)', opacity: finished ? 0.5 : 1 }} >
                {image && (
                    <CardMedia
                        style={{ height: '150px' }}
                        image={image}
                        title={title}
                    />
                )}
                <CardContent style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <Typography variant="h5" fontWeight={700} component="div" style={{ color: '#3f51b5' }}>
                        {title}
                    </Typography>
                </CardContent>
                <Box style={{ position: 'relative', bottom: '5px', right: '5px', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    {!finished ?
                        <Box>
                            <IconButton size="small" onClick={() => onFinish(event)}>
                                <DoneIcon color="success"/>
                            </IconButton>
                            <IconButton size="small" onClick={() => onEdit(event)}>
                                <EditIcon color="success"/>
                            </IconButton>
                            <IconButton size="small" onClick={() => onDelete(event)}>
                                <DeleteIcon color="success"/>
                            </IconButton>
                        </Box> :
                        <Box style={{ }}>
                            <IconButton size="small" onClick={() => onRestart(event)}>
                                <ReplayIcon color="warning"/>
                            </IconButton>
                        </Box>
                    }
                </Box>
            </Card>
            {isSelected && (
                <Box style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'absolute', top: -55, bottom: -55, left: '50%', transform: 'translateX(-50%)' }}>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                        <Fab color="success" size="small" onClick={() => moveEvent(id, false)}>
                            <ArrowUpwardIcon />
                        </Fab>
                    </motion.div>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                        <Fab color="success" size="small"  onClick={() => moveEvent(id, true)}>
                            <ArrowDownwardIcon />
                        </Fab>
                    </motion.div>
                </Box>
            )}
        </motion.div>
    );
};

export default EventComponent;
