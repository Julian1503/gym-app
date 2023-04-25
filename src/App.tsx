import React, {Fragment} from 'react';
import Navbar from './components/navbar/navbar';
import ShowSpecialty from "./components/specialty/showSpecialty";
import Hero from "./components/hero/hero";
import Footer from "./components/footer/footer";

const specialties = [
    {
        "specialtyId": 1,
        "name": "Zumba",
        "description": "A high-energy dance workout that helps to improve cardiovascular fitness and overall body strength.",
        "photoUrl": "https://images.unsplash.com/photo-1527933053326-89d1746b76b9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
    },
    {
        "specialtyId": 2,
        "name": "Swimming",
        "description": "A low-impact workout that helps to improve cardiovascular fitness and overall body strength.",
        "photoUrl": "https://images.unsplash.com/photo-1530549387789-4c1017266635?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
    },
    {
        "specialtyId": 3,
        "name": "Weightlifting",
        "description": "A strength-training workout that helps to improve overall body strength and muscle definition.",
        "photoUrl": "https://images.unsplash.com/photo-1532029837206-abbe2b7620e3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
    }
];

function App() {
  return (
    <Fragment >
      <Navbar/>
        <Hero/>
        <ShowSpecialty specialties={specialties}/>
        <Footer/>
    </Fragment>
  );
}

export default App;
