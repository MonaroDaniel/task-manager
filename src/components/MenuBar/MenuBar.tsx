//@ts-ignore
import React from "react"

import { menuRoutes, menuRoutesItems } from "../../routes/menuManagerRoutes"
import MenuItem from "./MenuItem"
import logo from '../../assets/logo_min.svg'
import RenderIcon from "../../tools/RenderIcon"

export default () => {

    function renderIcons(icons:Array<menuRoutesItems>) {
        return icons.map((element, index:number) => (
            <MenuItem key={index} iconName={element.iconName} path={element.path} label={element.label} />
        ))
        
    }

    return (
        <div className="relative grid grid-rows-[5rem_1fr_6rem] w-32 h-full justify-items-center bg-wh-00 drop-shadow-sm z-[9999] select-none rounded-tr-lg rounded-br-lg">
            <div className="pl-5 flex justify-center">
                <img src={logo} alt="Logo_min"/>
            </div>
            <div className="flex flex-col gap-3 py-2">
                {renderIcons(menuRoutes)}
            </div>
            <div className="w-20 h-20 bg-wh-01 flex items-center justify-center drop-shadow-lg rounded-lg cursor-pointer">
                <RenderIcon iconName="User" size={55} className="stroke-gr-01" />
            </div>
        </div>
    )
}