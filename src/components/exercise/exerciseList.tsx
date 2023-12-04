import React from 'react';
import {Exercise} from "../../@types/Exercise";
import {ListItems} from "../list-item/listItems";
import {ListItemsProps} from "../../@types/Props";


export const ExerciseList: React.FC<ListItemsProps<Exercise>> = ({  items, handleDelete , handleEdit}) => {
    return (
        <ListItems
            items={items}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            columnNames={["name"]}
        />
    );
};
