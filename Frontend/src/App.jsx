import { useState } from 'react'

import './App.css'
import ContactBook from './components/ContactBook'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <ContactBook/>
    </>
  )
}

export default App

