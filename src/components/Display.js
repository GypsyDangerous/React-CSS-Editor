import React, { useContext, useState, useEffect } from 'react';
import "./Display.css"
import { StyleContext } from '../contexts/styleContext';
import CopyToClipboard from "react-copy-to-clipboard"
import Button from '@material-ui/core/Button';


const Display = props => {

    const {boxColor, borderRadius, unit, width, boxShadow, boxShadowColor} = useContext(StyleContext)
    const [style, setStyle] = useState({})
    const [styleText, setStyleText] = useState("")

    useEffect(() => {
        setStyle(s => ({...s, 
            "border-radius": borderRadius.map(v => v + unit).join(" "),
            "box-shadow": boxShadow.map(v => v + "px").join(" ")+` ${boxShadowColor}`,
            "width": width+"px",
            "background-color": boxColor
        }))
    }, [borderRadius, unit, width, boxShadow, boxShadowColor, boxColor])

    useEffect(() => {
        let temp = ""
        for(const [key, value] of Object.entries(style)){
            temp += `${key}: ${value};\n`
        }
        temp += "width: 400px;"
        setStyleText(temp)
    }, [style])


    return (
        <div className="display">
            <div style={style} className="item">
                    <CopyToClipboard text={styleText}
                        onCopy={() => {}}>
                    <Button className="copy" variant="contained" color="primary">
                        Copy Style
                    </Button>
                    </CopyToClipboard>
                <div className="style-display">
                    {Object.entries(style).map(([key, value]) => (
                        <pre>{key}: {value};</pre>
                    ))}
                    <pre>height: 400px</pre>
                </div>
            </div>
        </div>
    );
}

export default Display;
