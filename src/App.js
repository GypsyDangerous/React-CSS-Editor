import React, {useState, useEffect} from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Display from './components/Display';
import {StyleContext} from "./contexts/styleContext"
import ColorToggle from './components/ColorToggle';

function App() {

  const [borderRadius, setBorderRadius] = useState([0,0,0,0])
  const [unit, setUnit] = useState("px")
  const [colorMode, setColorMode] = useState(false)
  const [width, setWidth] = useState(600)
  const [boxShadow, setBoxShadow] = useState([10, 10, 25, 0])
  const [boxShadowColor, setBoxShadowColor] = useState("#000000")
  const [boxColor, setBoxColor] = useState()

  useEffect(() => {
    setBoxColor(!colorMode ? "#61747e" : "#102027")
  }, [])

  return (
    <StyleContext.Provider
      value={{
        borderRadius,
        setBorderRadius,
        unit,
        setUnit,
        colorMode,
        setColorMode,
        width,
        setWidth,
        boxShadow,
        setBoxShadow,
        boxShadowColor,
        setBoxShadowColor,
        setBoxColor,
        boxColor
      }}
    >
      <div className={`App ${colorMode && "light"}`}>
        <ColorToggle/>
        <Sidebar/>
        <Display/>
      </div>
    </StyleContext.Provider>
  );
}

export default App;
