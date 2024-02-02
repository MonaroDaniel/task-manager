//@ts-ignore
import React from "react"
import RenderIcon from "../tools/RenderIcon"
export default () => {
    return (
        <div className="flex items-center gap-2">
            <RenderIcon iconName="SearchX" size={70} className="stroke-gr-01 " />
            <span className="text-gr-01 text-6xl">PÁGINA NÃO ENCONTRADA</span>
        </div>
    )
}