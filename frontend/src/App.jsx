import { BrowserRouter, Route, Routes } from "react-router-dom";

import Splash from "./pages/Splash"
import HomePage from "./pages/HomePage"
import ProfilePage from "./pages/ProfilePage"
import PostPage from "./pages/PostPage"
import AlbumnPage from "./pages/AlbumnPage"

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
          path="/profile/:id"
          element={<ProfilePage />}
        />

        <Route 
          path="/post/:id"
          element={<PostPage />}
        />

        <Route
          path="/albumn/:id"
          element={<AlbumnPage />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
