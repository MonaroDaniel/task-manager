//@ts-ignore
import React from "react"

interface ButtonProps {
    label: string;
    onClick: () => void;
    color?: 'blue' | 'dashed';
}

export default ({ label, onClick, color }: ButtonProps) => {

    function setColor(color: ButtonProps['color']) {
        switch (color) {
            case 'blue':
                return 'bg-bl-01 active:bg-bl-00 hover:bg-bl-02 text-wh-00'
            case 'dashed':
                return 'border-dashed border-gr-00 border-2 bg-wh-02 text-gr-01 cursor-pointer hover:bg-gr-00 hover:border-gr-01 active:bg-wh-02'
            default:
                return
        }
    }

    return (
        <div className="flex items-center justify-center">
            <div className={`uppercase text-base
             cursor-pointer font-semibold p-6 w-full h-14 flex items-center justify-center rounded-2xl transition-all ${setColor(color)}`}
                onClick={onClick}>{label}</div>
        </div>
    )
}