import { BrowserRouter, Route, Routes } from "react-router-dom";

import Splash from "./pages/Splash"
import HomePage from "./pages/HomePage"
import ProfilePage from "./pages/ProfilePage"
import PostPage from "./pages/PostPage"

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
          element={<HomePage />}
        />

        <Route 
          path="/profile"
          element={<ProfilePage />}
        />

        <Route 
          path="/post"
          element={<PostPage />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
