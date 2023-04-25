import React from 'react';
import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox';
import {PaletteTree} from './palette';
import Navbar from "../components/navbar/navbar";
import App from "../App";
import Hero from "../components/hero/hero";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/Navbar">
                <Navbar/>
            </ComponentPreview>
            <ComponentPreview path="/App">
                <App/>
            </ComponentPreview>
            <ComponentPreview path="/Hero">
                <Hero/>
            </ComponentPreview>
        </Previews>
    );
};

export default ComponentPreviews;