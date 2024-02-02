//@ts-ignore
import React from "react"
import RenderIcon, { RenderIconsProps } from '../../tools/RenderIcon'
import { useNavigate } from "react-router-dom";
import { menuRoutesItems } from "../../routes/menuManagerRoutes";

export default ({ iconName, path, label }: menuRoutesItems) => {
    const navigate = useNavigate()

    return (
        <div onClick={() => navigate(path)} title={label} className="w-20 h-20 flex items-center justify-center rounded-lg drop-shadow-lg hover:text-wh-00 text-gr-01 bg-wh-01 cursor-pointer hover:bg-bl-02 transition-all ease-in duration-200">
            <RenderIcon iconName={iconName} size={55} />
        </div>
    )
}