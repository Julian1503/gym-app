import React from 'react';
import {ListItems} from "../list-item/listItems";
import {ListItemsProps} from "../../@types/Props";
import {Specialty} from "../../@types/Specialty";


export const SpecialtyList: React.FC<ListItemsProps<Specialty>> = ({  items, handleDelete , setSelected, handleEdit}) => {
    return (
        <ListItems
            items={items}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            columnNames={["name","description"]}
        />
    );
};
