import React from 'react'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import Login from '../screens/Login'
import Register from '../screens/Register'
import Home from '../screens/Home'
import Project from '../screens/Project'
import UserAuth from '../auth/UserAuth'
import FileUpload from '../screens/FileUpload'
import Chat from '../screens/Chat'
import AssignedTasks from '../components/AssignedTasks'
import ProfilePage from '../screens/ProfilePage'


const AppRoutes = () => {
    return (
        <BrowserRouter>

            <Routes>
                <Route path="/" element={<UserAuth><Home /></UserAuth>} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/project" element={<UserAuth><Project /></UserAuth>} />
                <Route path="/file" element={<FileUpload />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/tasks/:userId" element={<AssignedTasks />} />
                <Route path="/profile/:userId" element={<ProfilePage />} />
            </Routes>

        </BrowserRouter>
    )
}

export default AppRoutes