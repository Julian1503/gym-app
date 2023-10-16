import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {Box, Button} from '@mui/material';

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
        flex: 1
    }))
    columns.push({
        field: "actions",
        headerName: "Actions",
        headerAlign: 'center',
        align: 'center',
        sortable: false,
        filterable: false,
        minWidth: 200,
        renderCell: (params) => (
            <Box sx={{display:"flex", width: "40%", alignItems:"center", justifyContent:"space-evenly"}}>
                {showDeleteButton && handleDelete && <Button variant="contained" color="error" onClick={() => handleDelete?.(params.row)}>Delete</Button>}
                {showEditButton && handleEdit && <Button variant="contained" color="primary" onClick={() => handleEdit?.(params.row)}>Edit</Button>}
                {actions && actions(params.row).map((component, index) => (
                    <Box key={index} sx={{marginLeft: "10px"}}>
                        {component}
                    </Box>
                ))}
            </Box>
        )
    } as GridColDef);

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
        </Box>
    );
}
