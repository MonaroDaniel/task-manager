//@ts-ignore
import React from "react";
import TransitionRoutes from "./TransitionRoutes";
import { BrowserRouter } from "react-router-dom";
import MenuBar from "../components/MenuBar/MenuBar";

export default () => {
    return (
        <BrowserRouter>
            <div className="w-full h-full overflow-x-hidden relative grid grid-cols-[8rem_1fr]">
                <MenuBar />
                <TransitionRoutes></TransitionRoutes>
            </div>
        </BrowserRouter>
    )
}