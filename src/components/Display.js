import React, { useContext, useState, useEffect, useCallback } from 'react';
import "./Display.css"
import { StyleContext } from '../contexts/styleContext';
import CopyToClipboard from "react-copy-to-clipboard"
import Button from '@material-ui/core/Button';
import {CSSTransition} from "react-transition-group"

const Display = props => {
    const {boxColor, borderRadius, unit, width, boxShadow, boxShadowColor} = useContext(StyleContext)
    const [style, setStyle] = useState({})
    const [styleText, setStyleText] = useState("")
    const [copied, setCopied] = useState(false)

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

    const onCopy = useCallback(() => {
        setCopied(true)
        setTimeout(() => {
            setCopied(false)
        }, 5000)
    },[])

    return (
        <div className="display">
            <div style={style} className="item">
                <div className="grid-container">
                    <div>
                        <CSSTransition in={copied} timeout={1000} unmountOnExit classNames="copy-popup">
                                <span className="copy-container">
                                    <div className="copied-popup">Copied!</div>
                                    <div className="triangle"></div>
                                </span>
                        </CSSTransition>
                    </div>

                    <CopyToClipboard text={styleText}
                        onCopy={onCopy}>
                    <Button className="copy" variant="contained" color="primary">
                        Copy Style
                    </Button>
                    </CopyToClipboard>
                </div>
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
