import React from 'react';
import {Equipment} from "../../@types/Equipment";
import {GenericPage} from "./crudPage";
import {EquipmentList} from "../../components/equipment/equipmentList";
import {EquipmentForm} from "../../components/equipment/equipmentForm";

export const EquipmentPage: React.FC = () => {
    return (
        <GenericPage
            endpoint='equipment'
            defaultItem={{
                equipmentId: 0,
                name: "",
                description: "",
                quantity: 0,
                type: ""
            } as Equipment}
            formComponent={(props)=><EquipmentForm onCancel={props.onCancel} handleUpdate={props.handleUpdate}  onSubmit={props.onSubmit} selectedItem={props.selectedItem}/>}
            listComponent={(props)=><EquipmentList handleDelete={props.handleDelete} handleEdit={props.handleEdit}  setSelected={props.setSelected} items={props.items}/>}
        />
    );
};
