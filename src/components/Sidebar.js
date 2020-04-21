import React, { useState, useContext } from 'react';
import "./Sidebar.css"
import { withStyles, makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';
// import VolumeUp from '@material-ui/icons/VolumeUp';
import {StyleContext} from "../contexts/styleContext"
import { ChromePicker} from "react-color"
import reactCSS from 'reactcss'

const useStyles = makeStyles({
    root: {
        width: 250,
        marginLeft: 15
    },
    input: {
        width: 42,
    },
    select: {
        color: "white"
    },
});

const PrettoSlider = withStyles({
    root: {
        color: '#52af77',
        height: 8,
    },
    thumb: {
        height: 24,
        width: 24,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        marginTop: -8,
        marginLeft: -12,
        '&:focus, &:hover, &$active': {
            boxShadow: 'inherit',
        },
    },
    active: {},
    valueLabel: {
        left: 'calc(-50% + 4px)',
    },
    track: {
        height: 8,
        borderRadius: 4,
    },
    rail: {
        height: 8,
        borderRadius: 4,
    },
})(Slider);


const InputSlider = props => {
    const classes = useStyles();
    const [value, setValue] = useState(props.value || 0);
    

    const handleSliderChange = (event, newValue) => {
        setValue(newValue);
        props.onChange(newValue)
    };

    const handleInputChange = (event) => {
        setValue(event.target.value === '' ? '' : Number(event.target.value));
        props.onChange(Number(event.target.value))
    };

    const handleBlur = () => {
        const {min,max} = props
        if (value < min) {
            setValue(max);
        } else if (value > max) {
            setValue(max);
        }
    };

    return (
        <div className={classes.root}>
            <Typography id="input-slider" gutterBottom>
                {props.title} 
            </Typography>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs>
                    <PrettoSlider
                        className="slider"
                        valueLabelDisplay="auto"
                        value={typeof value === 'number' ? value : 0}
                        onChange={handleSliderChange}
                        aria-labelledby="input-slider"
                        min={props.min}
                        max={props.max}
                    />
                </Grid>
                <Grid item>
                    <Input
                        className={classes.input}
                        value={value}
                        margin="dense"
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        inputProps={{
                            step: props.step,
                            min: props.min,
                            max: props.max,
                            type: 'number',
                            'aria-labelledby': 'input-slider',
                        }}
                    />
                </Grid>
            </Grid>
        </div>
    );
}


const BorderRadiusSection = props => {
    const [allCorners, setAllCorners] = useState(false)

    const {setBorderRadius, borderRadius, unit, setUnit} = useContext(StyleContext)

    const modifyRaddi = (i,value) => {
        const copy = [...borderRadius]
        copy[i] = value
        setBorderRadius(copy)
    }


    return (
        <div className="section" id={props.id}>
            <div className="section__header">Border Radius</div>
            <label htmlFor="use-all-corners">Set Individual values for each corner</label>
            <Switch
                checked={allCorners}
                onChange={e => setAllCorners(e.target.checked)}
                // color="primary"
                name="checkedB"
                id="use-all-corners"
                inputProps={{ 'aria-label': 'primary checkbox' }}
            />
            <InputLabel shrink htmlFor="age-native-label-placeholder">
                Border Radius Units
            </InputLabel>
            <NativeSelect
                value={unit}
                onChange={e => setUnit(e.target.value)}
                inputProps={{
                    name: 'age',
                    id: 'age-native-label-placeholder',
                }}
            >
                <option className="option" key={"px"} value="px">Pixels</option>
                <option className="option" key={"%"} value="%">Percent</option>
                <option className="option" key={"rem"} value="rem">REM</option>
                <option className="option" key={"em"} value="em">EM</option>
            </NativeSelect>
            {/* <FormHelperText>Label + placeholder</FormHelperText> */}


            {allCorners ?
                <>
                    {["top left", "top right", "bottom right", "bottom left"].map((title, i) => (
                        <InputSlider key={title} min={0} title={title} max={400} value={borderRadius[i]} onChange={value => modifyRaddi(i, value)}/>
                    ))}
                </> :
                <InputSlider className="slider" title="Radius" onChange={v => setBorderRadius([v,v,v,v])} min={0} max={400}/>
            }
        </div>
    )
}

const ColorPicker = props => {
    const [open, setOpen] = useState(false);
    
    const styles = reactCSS({
        'default': {
            color: {
                width: '36px',
                height: '14px',
                borderRadius: '2px',
                background: props.color,
            },
            swatch: {
                padding: '5px',
                background: '#fff',
                borderRadius: '1px',
                boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
                display: 'inline-block',
                cursor: 'pointer',
            },
            popover: {
                position: 'absolute',
                zIndex: '2',
            },
            cover: {
                position: 'fixed',
                top: '0px',
                right: '0px',
                bottom: '0px',
                left: '0px',
            },
        },
    });

    const handleClick = () => {
        setOpen(o => !o)
    };

    const handleClose = () => {
        setOpen(false)
    };

    return (
        <div>
            <div style={styles.swatch} onClick={handleClick}>
                <div style={styles.color} />
            </div>
            {open ? <div style={styles.popover}>
                <div style={styles.cover} onClick={handleClose} />
                <ChromePicker color={props.color} onChange={props.handleChange} />
            </div> : null}

        </div>
    )
}


const BoxShadowSection = props => {

    const {boxColor, setBoxColor, boxShadow, setBoxShadow, boxShadowColor, setBoxShadowColor} = useContext(StyleContext)

    const modifyShadow = (i, value) => {
        const copy = [...boxShadow]
        copy[i] = value
        setBoxShadow(copy)
    }

    const handleColorChange = (color, func) => {
        let colorStr = color.hex
        if (color.rgb.a !== 1) {
            colorStr = `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`
        }

        // do something with colorStr...
        func(colorStr)
    } 

    return (
        <div className="section">
            <div className="section__header">Box Shadow</div>
            {["Horizontal Position", "Vertical Position", "Blur", "Spread"].map((title, i) => (
                <>
                    <InputSlider className="slider" title={title} onChange={v => modifyShadow(i, v)} min={title === "Blur"?0:-200} max={200} />
                </>
            ))}
            <span className="color-box">
                <span className="section__header section__header--inline">Box Shadow Color:</span>
                <ColorPicker 
                    color={boxShadowColor}
                    handleChange={color => handleColorChange(color, setBoxShadowColor)}
                 />
            </span>
            <span className="color-box">
                <span className="section__header section__header--inline">Box Shadow Color:</span>
                <ColorPicker
                    color={boxColor}
                    handleChange={color => handleColorChange(color, setBoxColor)}
                />
            </span>
        </div>
    )
}


const Sidebar = () => {

    const {width, setWidth} = useContext(StyleContext)

   

    return (
        <div className="Editor">
            <div className="section">

                <InputSlider title="Width" value={width} onChange={v => setWidth(v)} min={400} max={900} />
            </div>
            <BorderRadiusSection id="section1"/>
            <BoxShadowSection/>
        </div>
    );
}

export default Sidebar;
