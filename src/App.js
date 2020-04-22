import React, {useState, useEffect, useMemo} from 'react';
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
    setBoxColor(c => !c ? "#61747e" : "#102027")
  }, [])

  useEffect(() => {
    const mode = localStorage.getItem("ColorMode")
    setColorMode(mode==="true")
  },[])

  const providerValues = useMemo(() => ({
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
  }), [borderRadius,unit,colorMode,width,boxShadow,boxShadowColor,boxColor])


  return (
    <StyleContext.Provider
      value={providerValues}
    >
      <main className={`App ${colorMode && "light"}`}>
        <ColorToggle/>
        <Sidebar/>
        <Display/>
      </main>
    </StyleContext.Provider>
  );
}

export default App;
