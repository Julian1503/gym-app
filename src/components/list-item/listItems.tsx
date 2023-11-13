import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material';
import {useState} from "react";

interface ListItemsProps<T> {
    items: T[];
    handleDelete?: (item: T) => void;
    handleEdit?: (item: T) => void;
    columnNames: string[];
    actions?: (item: T) => JSX.Element[];
    showEditButton?: boolean;
    showDeleteButton?: boolean;
}

export function ListItems<T>({
                                 items,
                                 handleDelete,
                                 handleEdit,
                                 columnNames,
                                 actions,
                                 showEditButton = true,
                                 showDeleteButton = true
                             }: ListItemsProps<T>) {
    const columns : GridColDef[] = columnNames.map((column: string) => ({
        field: column,
        headerName: column.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),
        flex: 1,
        minWidth: 150,
    }))
    columns.push({
        field: "actions",
        headerName: "Actions",
        headerAlign: 'center',
        align: 'center',
        sortable: false,
        filterable: false,
        minWidth: 300,
        renderCell: (params) => (
            <Box sx={{display:"flex", alignItems:"center", justifyContent:"space-evenly", gap: 3}}>
                {showEditButton && handleEdit && <Button variant="contained" color="primary" onClick={() => handleEdit?.(params.row)}>Edit</Button>}
                {showDeleteButton && handleDelete && <Button variant="contained" color="error" onClick={() => handleOpenDeleteDialog(params.row)}>Delete</Button>}
                {actions && actions(params.row).map((component, index) => (
                    <Box key={index} sx={{marginLeft: "10px"}}>
                        {component}
                    </Box>
                ))}
            </Box>
        )
    } as GridColDef);

    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [rowToDelete, setRowToDelete] = useState<T | null>(null);

    const handleOpenDeleteDialog = (row : any) => {
        setOpenDeleteDialog(true);
        setRowToDelete(row);
    };

    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
    };

    const handleDeleteButton = () => {
        if (handleDelete && rowToDelete) {
            handleDelete(rowToDelete);
            setOpenDeleteDialog(false);
            setRowToDelete(null);
        }
    }
    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={items}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { pageSize: 5, page: 0 },
                    },
                }}
                getRowId={(row) => {
                    const idKey = Object.keys(row).find(key => key.toLowerCase().endsWith('id'));
                    return row[idKey as string];
                }}
                pageSizeOptions={[5, 10, 25]}
            />
            <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this item?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteButton} color="secondary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
