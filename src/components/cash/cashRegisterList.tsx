import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, List, ListItem, ListItemText } from '@mui/material';
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {AuthState} from "../../store/auth/authSlice";
import ApiService from "../../services/apiService";
import {ListItemsProps} from "../../@types/Props";
import {Equipment} from "../../@types/Equipment";
import {ListItems} from "../list-item/listItems";
import {CashRegister} from "../../@types/CashRegister";
import {Plan} from "../../@types/Plan";
import CashRegisterDetail from "./cashRegisterDetail";

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