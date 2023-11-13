import React from 'react';
import { ExerciseForm } from '../../components/exercise/exerciseForm';
import { ExerciseList } from '../../components/exercise/exerciseList';
import {Exercise} from "../../@types/Exercise";
import {GenericPage} from "./crudPage";

export const ExercisePage: React.FC = () => {
    return (
         <GenericPage
             endpoint='exercise'
             defaultItem={{
                 exerciseId: 0,
                 difficultyLevel: 0,
                 equipments: [],
                 muscleGroup: "",
                 name: "",
                 photo: "",
                 steps: [],
                 specialties: [],
                 description: ""
             } as Exercise}
             formComponent={(props)=><ExerciseForm onCancel={props.onCancel} handleUpdate={props.handleUpdate}  onSubmit={props.onSubmit} selectedItem={props.selectedItem}/>}
             listComponent={(props)=><ExerciseList handleDelete={props.handleDelete} handleEdit={props.handleEdit}  setSelected={props.setSelected} items={props.items}/>}
         />
    );
};
