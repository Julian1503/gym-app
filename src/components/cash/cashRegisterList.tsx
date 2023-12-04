import React from 'react';
import { Button } from '@mui/material';
import {ListItemsProps} from "../../@types/Props";
import {ListItems} from "../list-item/listItems";
import {CashRegister} from "../../@types/CashRegister";

export const CashRegisterList : React.FC<ListItemsProps<CashRegister> & {openHistoryModal: (cashRegister: CashRegister) => void}> = ({  items, openHistoryModal}) => {
    const actions = (cashRegister: CashRegister) : JSX.Element[] => {
        return [
            <Button variant="contained" color="primary" onClick={() => openHistoryModal(cashRegister)}>History</Button>
        ];
    };

    return (
        <ListItems
            items={items}
            showDeleteButton={false}
            showEditButton={false}
            handleDelete={()=>{}}
            handleEdit={()=>{}}
            actions={actions}
            columnNames={["openDate", "initialBalance", "currentBalance", "difference"]}
        />
    );
};