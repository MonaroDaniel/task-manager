//@ts-ignore
import React from "react";
import { Routes, Route, useLocation } from 'react-router-dom'
import TaskList from "../pages/TaskList";
import Home from "../pages/Home";
import PageNotFound from "../pages/PageNotFound";
import Desenvolvimento from "../pages/Desenvolvimento";

export default () => {
    const currentLocation = useLocation()

    return (
        <div className="w-full h-full overflow-x-auto flex items-center justify-center relative pt-5">
            <Routes location={currentLocation}>
                <Route path="/home" element={<Home />} />
                <Route path="/tasks" element={<TaskList />}></Route>
                <Route path="/dev" element={<Desenvolvimento />}></Route>
                <Route path="*" element={<PageNotFound />}></Route>
            </Routes>
        </div>
    )
}