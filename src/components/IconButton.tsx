//@ts-ignore
import React from "react"
import * as Lucide from 'lucide-react';
import RenderIcon from "../tools/RenderIcon"

interface IconButtonProps {
    iconName: keyof typeof Lucide;
    label: string;
    onClick: () => void;
}

export default ({ iconName, label, onClick }: IconButtonProps) => {
    return (
        <div className="w-36 h-11 flex items-center justify-center bg-bl-01 hover:bg-bl-02 active:bg-bl-00 rounded-2xl cursor-pointer gap-1"
            onClick={() => onClick()}>
            <RenderIcon iconName={iconName} size={30} className="stroke-wh-00" />
            <span className="font-bold text-xl text-wh-00">{label}</span>
        </div>
    )
}