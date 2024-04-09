import React, { useState } from 'react'
import './App.css'
import InputShortener from './components/InputShortener'

function App() {

  const [inputValue,setInpudValue] = useState('');

  return (
    <div className='container'>
      <InputShortener setInpudValue={setInpudValue}/>
    </div>
  )
}

export default App
