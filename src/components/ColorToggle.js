import React, { useContext } from 'react';
import { StyleContext } from "../contexts/styleContext"

import Brightness5Icon from '@material-ui/icons/Brightness5';
import Brightness2Icon from '@material-ui/icons/Brightness2';

import "./ColorToggle.css"

const ColorToggle = () => {

    const {colorMode, setColorMode} = useContext(StyleContext)

    return (
        <button className="toggle" onClick={() => setColorMode(s => !s)}>
            {colorMode ? <Brightness5Icon/> : <Brightness2Icon/>}
        </button>
    );
}

export default ColorToggle;
