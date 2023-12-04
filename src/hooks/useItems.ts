import { useState, useEffect } from 'react';
import ApiService from "../services/apiService";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const useItems = <T extends {}>(
    endpoint: string,
    url: string = '',
    defaultItem: T,
) => {
    const token = useSelector<RootState, string | null>(state => state.auth.token);
    const [items, setItems] = useState<T[]>([]);
    const [selectedItem, setSelectedItem] = useState<T | null>(defaultItem);
    const [isCreating, setIsCreating] = useState(false);

    function fetchItems() {
        const apiService = ApiService.getInstance();
        apiService.get(`/${endpoint}/get-all`, token)
            .then(res => setItems(res.response))
            .catch(err => console.error(err));
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        fetchItems();
    }, []);

    const getById = (item: T) : Promise<any> => {
        const apiService = ApiService.getInstance();
        return apiService.get(`/${endpoint}/get/${getItemKey(item)}`, token);
    };

    const handleDelete = (item: T) => {
        const apiService = ApiService.getInstance();
        apiService.delete(`/${endpoint}/delete/${getItemKey(item)}`, token)
            .then(() => setItems(items.filter(i => getItemKey(i) !== getItemKey(item))))
            .catch(err => console.error(err));
    };

    const handleUpdate = (item: T) : Promise<any> => {
        const apiService = ApiService.getInstance();
        return apiService.put(`/${endpoint}/update/${getItemKey(item)}`, item, token)
            .catch(err => console.error(err));
    };

    const getItemKey = (item: T) => {
        const idPropertyName = `${endpoint}Id`;
        return (item as any)[idPropertyName];
    };

    const handleCreate = () => {
        setIsCreating(false);
        fetchItems();
    };

    return {
        items,
        selectedItem,
        isCreating,
        setIsCreating,
        setSelectedItem,
        handleCreate,
        handleDelete,
        handleUpdate,
        getById
    };
};

export default useItems;
