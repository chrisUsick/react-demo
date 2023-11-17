// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import Counter from './Counter'
import Hello from './Hello'
import PersistentCounter from './PersistentCounter'
import { AuthProvider } from './AuthContext'
import Header from './Header'
import NameTag from './NameTag'



function App() {

  return (
    <>
    <AuthProvider>
      <Header />
      <div>Hi</div> 
      <Hello name="TypeScript" />
      <Counter initialCount={-1}/>
      <Counter initialCount={10}/>
      <PersistentCounter />
      <NameTag />
    </AuthProvider>
    </>
  )
}

export default App
