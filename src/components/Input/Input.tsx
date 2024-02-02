//@ts-ignore
import React, { useEffect, KeyboardEvent, useRef, useState } from "react"

import InputStyles from './Input.module.css'

interface InputProps {
    value: string | number;
    setValue: (newValue: string) => void;
    runEnter?: () => void;
    runBlur?: () => void;
    label: string;
    refs?: React.RefObject<HTMLInputElement>;
    disabled?: boolean;
    type?: 'text' | 'number' | 'password' | 'date' | 'datetime-local';
    size?: 'sm' | 'md';
}

export default ({ value, setValue, label, type = 'text', refs = useRef<HTMLInputElement>(null), disabled = false, size = 'sm', runEnter = () => false, runBlur = () => false }: InputProps) => {
    const [situation, setSituation] = useState(!disabled ? InputStyles.default : InputStyles.disable)

    function keyboardEvent(e: KeyboardEvent<HTMLInputElement>) {
        if (e.nativeEvent.key === 'Enter' && runEnter) {
            runEnter()
        }
    }

    return (
        <>
            <div className={`w-full h-20 relative ${situation} ${value.toString().length > 0 || type === "date" || type === "datetime-local" ? InputStyles.used : ''}`}
                onClick={() => refs?.current?.focus()}
                onMouseEnter={() => !disabled && situation === InputStyles.default ? setSituation(InputStyles.hover) : false}
                onMouseLeave={() => !disabled && situation === InputStyles.hover ? setSituation(InputStyles.default) : false}>
                <span className={`w-full h-4 select-none ${!disabled ? 'cursor-text' : 'cursor-not-allowed'} relative transition-all text-base -bottom-9 left-4`}>{label}</span>
                <div className={`w-full ${size === "md" ? 'h-12' : 'h-10'} border-solid border-2 border-gr-01 rounded-2xl transition-all`}>
                    <label className={`w-full h-full ${!disabled ? 'cursor-text' : 'cursor-not-allowed'} outline-none`}>
                        <input type={type} className={`w-full h-full bg-transparent text-start px-2 overflow-hidden outline-none ${!disabled ? 'cursor-text' : 'cursor-not-allowed'}`}
                            value={value}
                            onKeyDown={e => keyboardEvent(e)}
                            onChange={(e) => setValue(e.target.value)}
                            onFocus={() => setSituation(InputStyles.foucus)}
                            onBlur={() => {
                                setSituation(InputStyles.default)
                                runBlur()
                            }}
                            disabled={disabled}
                            ref={refs} />
                    </label>
                </div>
            </div>
        </>
    )
}