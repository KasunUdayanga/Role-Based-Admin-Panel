import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1 className="text-3xl font-bold">Welcome to the Admin Panel</h1>
      <p className="mt-4 text-gray-600">Manage your application with ease</p>
    </>
  )
}

export default App
