import { BrowserRouter, Route, Routes } from "react-router-dom";

import Splash from "./pages/Splash"
import HomePage from "./pages/HomePage"
import ProfilePage from "./pages/ProfilePage"
import PostPage from "./pages/PostPage"
import AlbumnPage from "./pages/AlbumnPage"

import ProtectedRoute from "./pages/ProtectedRoute";

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
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />

        <Route 
          path="/profile/:id"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        <Route 
          path="/post/:id"
          element={
            <ProtectedRoute>
              <PostPage />
            </ProtectedRoute>
          }
        />

        <Route 
          path="/albumn/:id"
          element={
            <ProtectedRoute>
              <AlbumnPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
