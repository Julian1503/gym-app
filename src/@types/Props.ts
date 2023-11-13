export interface ListItemsProps<T> {
    items: T[];
    handleDelete?: (item: T) => void;
    setSelected: (item : T) => void
    handleEdit?: (data: T) => void;
}

export interface FormProps<T> {
    onSubmit: (data: T) => void;
    selectedItem: T | null;
    onCancel: () => void;
    handleUpdate?: (data: T) => Promise<any> ;
}