import {Fragment} from "react";
import Navbar from "../../components/navbar/navbar";
import Hero from "../../components/hero/hero";
import ShowSpecialty from "../../components/specialty/showSpecialty";
import WhyUs from "../../components/why-us/whyUs";
import ContactLocation from "../../components/contact/contactLocation";
import Footer from "../../components/footer/footer";

const specialties = [
    {
        "specialtyId": 1,
        "name": "Zumba",
        "description": "A high-energy dance workout that helps to improve cardiovascular fitness and overall body strength.",
        "photo": "https://images.unsplash.com/photo-1527933053326-89d1746b76b9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
    },
    {
        "specialtyId": 2,
        "name": "Swimming",
        "description": "A low-impact workout that helps to improve cardiovascular fitness and overall body strength.",
        "photo": "https://images.unsplash.com/photo-1530549387789-4c1017266635?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
    },
    {
        "specialtyId": 3,
        "name": "Weightlifting",
        "description": "A strength-training workout that helps to improve overall body strength and muscle definition.",
        "photo": "https://images.unsplash.com/photo-1532029837206-abbe2b7620e3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
    }
];

/**
 * The MainPage component renders a webpage with a navbar, hero section, a list of specialties, a section explaining why to
 * choose the service, a contact and location section, and a footer.
 * @returns The MainPage component is returning a JSX fragment. Inside the fragment, it includes several components such as
 * Navbar, Hero, ShowSpecialty, WhyUs, ContactLocation, and Footer.
 */
const MainPage = () => {
    return (
        <Fragment>
            <Navbar/>
            <Hero/>
            <ShowSpecialty specialties={specialties}/>
            <WhyUs/>
            <ContactLocation/>
            <Footer/>
        </Fragment>
    )
}

export default MainPage;