import { BrowserRouter, Route, Routes } from "react-router-dom";

import Splash from "./pages/Splash"
import Home from "./pages/Home"
import Profile from "./pages/Profile"
import Post from "./pages/Post"

import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={<Splash />} 
        />

        <Route 
          path="/home"
          element={<Home />}
        />

        <Route 
          path="/profile"
          element={<Profile />}
        />

        <Route 
          path="/post/:id"
          element={<Post />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
