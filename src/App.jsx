import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import CodeSnippetHome from './components/CodeSnippetHome'
import AboutPage from './components/AboutPage'
import NavBar from './components/NavBar'
import AnimatedBackground from './components/AnimatedBackground'

function App() {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', margin: 0, padding: 0 }}>
        <AnimatedBackground />
        <NavBar />
        <Routes>
          <Route path="/" element={<CodeSnippetHome />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
