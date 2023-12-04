import React from 'react';
import {ListItems} from "../list-item/listItems";
import {ListItemsProps} from "../../@types/Props";
import {News} from "../../@types/News";


export const NewsList: React.FC<ListItemsProps<News>> = ({  items, handleDelete , setSelected, handleEdit}) => {

    return (
        <ListItems
            items={items}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            columnNames={["title", "description", "subtitle"]}
        />
    );
};
