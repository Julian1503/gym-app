import React, {useState} from 'react';
import {Container, Button, Dialog} from '@mui/material';
import { useTheme } from "@mui/material/styles";
import useItems from "../../hooks/useItems";
import {ListItemsProps} from "../../@types/Props";
import Typography from "@mui/material/Typography";
import {SuccessSnackbar} from "./successSnackbar";

export interface GenericPageProps<T> {
    endpoint: string;
    defaultItem: T;
    url?: string;
    formComponent: (props: FormProps<T>) => JSX.Element;
    listComponent: (props: ListItemsProps<T>) => JSX.Element;
}

interface FormProps<T> {
    onSubmit: (data: T) => void;
    selectedItem: T | null;
    onCancel: () => void;
    handleUpdate: (data: T) => Promise<any>;
}

export const GenericPage = <T extends {}>({endpoint, url, defaultItem, formComponent, listComponent}: GenericPageProps<T>) => {
    const {
        items,
        isCreating,
        setIsCreating,
        setSelectedItem,
        handleCreate,
        handleDelete,
        getById,
        handleUpdate,
    } = useItems<T>(endpoint, url, defaultItem);
    const [selected, setSelected] = React.useState<T | null>(null);
    const theme = useTheme();
    const handleOnClick = () => {
        setIsCreating((oldValue : boolean) => !oldValue);
        setSelectedItem(defaultItem);
    };
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleShowSuccessSnackbar = () => {
        setOpenSnackbar(true);
        setTimeout(() => {
            setOpenSnackbar(false);
        }, 3000);
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };


    const handleOnCancel = () => {
        setIsCreating(false);
        setSelectedItem(defaultItem);
        setSelected(defaultItem);
    }

    const handleEdit = (item: T) => {
        const response = getById(item);
        response.then((data) => {
            setSelected(data.response);
            setSelectedItem(data.response);
            setIsCreating(true);
        });
    }

    const onSubmit = (data: T) => {
        if(data) {
            handleCreate();
            setIsCreating(false);
            setSelectedItem(defaultItem);
            setSelected(defaultItem);
            handleShowSuccessSnackbar();
        }
    }

    return (
        <Container sx={{backgroundColor: theme.palette.background.paper, p: 5}}>
            <Typography variant="h5" component="h5" sx={{flexGrow: 1, textAlign: 'center'}}
                        color={theme.palette.text.primary}>{endpoint.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}</Typography>
            <Button sx={{marginBottom: 3}} variant="contained" color="primary"
                    onClick={handleOnClick}>{isCreating ? "Close form" : "Create New"}</Button>
            <Dialog open={isCreating} onClose={handleOnCancel}>
                {formComponent({onSubmit: onSubmit, handleUpdate, selectedItem: selected, onCancel: handleOnCancel})}
            </Dialog>
            {listComponent({handleDelete, items, setSelected, handleEdit})}
            <SuccessSnackbar open={openSnackbar} onClose={handleCloseSnackbar}/>
        </Container>
    );
};
