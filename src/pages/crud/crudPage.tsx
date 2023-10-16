import React, {Dispatch, SetStateAction} from 'react';
import { Container, Button, Dialog, DialogTitle, DialogContent } from '@mui/material';
import { useTheme } from "@mui/material/styles";
import useItems from "../../hooks/useItems";
import {ListItemsProps} from "../../@types/Props";

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

    const handleOnCancel = () => {
        setIsCreating(false);
        setSelectedItem(null);
    }

    const handleEdit = (item: T) => {
        const response = getById(item);
        response.then((data) => {
            setSelected(data.response);
            setSelectedItem(data.response);
            setIsCreating(true);
        });
    }

    return (
        <Container sx={{backgroundColor: theme.palette.background.paper, p: 5}}>
            <Button variant="contained" color="primary" onClick={handleOnClick}>{ isCreating ? "Close form" : "Create New"}</Button>
            <Dialog open={isCreating} onClose={handleOnCancel}>
                    {formComponent({ onSubmit: handleCreate, handleUpdate, selectedItem: selected, onCancel: handleOnCancel})}
            </Dialog>
            {listComponent({ handleDelete,  items, setSelected, handleEdit})}
        </Container>
    );
};
