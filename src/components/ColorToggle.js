import React, { useContext, useCallback } from 'react';
import { StyleContext } from "../contexts/styleContext"

import Brightness5Icon from '@material-ui/icons/Brightness5';
import Brightness2Icon from '@material-ui/icons/Brightness2';

import "./ColorToggle.css"

const ColorToggle = () => {

    const {colorMode, setColorMode} = useContext(StyleContext)

    const toggleColorMode = useCallback(() => {
        setColorMode(s => !s)
        localStorage.setItem("ColorMode", !colorMode)
    }, [setColorMode, colorMode])

    return (
        <button className="toggle" onClick={toggleColorMode}>
            {colorMode ? <Brightness5Icon/> : <Brightness2Icon/>}
        </button>
    );
}

export default ColorToggle;
