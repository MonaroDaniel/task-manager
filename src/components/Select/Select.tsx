//@ts-ignore
import React, { useEffect, useRef, useState } from "react"
import { ChevronDown } from "lucide-react";
import If from "../../tools/If";
import SelectStyles from './Select.module.css';
import useClickOutside from '../../hooks/useClickOutside'

export type option = {
    id: number;
    label: string
}

interface SelectProps {
    label: string;
    value: option;
    setValue: (newValue: option) => void;
    listOptions: Array<option>;
    placeholder?: string;
    disabled?: boolean;
}

export default ({ label, value, setValue, listOptions, placeholder, disabled = false }: SelectProps) => {
    const [situation, setSituation] = useState(SelectStyles.default)

    const [active, setActive] = useState(false)

    const ref = useRef<HTMLDivElement>(null)

    useClickOutside(ref, () => {
        setActive(false)
    })

    useEffect(() => {
        if(value.id !== undefined) {
            setActive(false)
        }
    }, [value])

    useEffect(() => {
        if (!active) {
            setSituation(SelectStyles.default)
        }
    }, [active])


    function renderOptions(list: Array<option>) {
        return list.map((element, index) => {
            let activeOption = value.id === element.id
            return (
                <div key={index} className={`w-full h-8 py-1 cursor-pointer hover:bg-bl-01 bg-opacity-75 transition-all duration-200 flex justify-center items-center text-center text-sm
                    ${activeOption && 'bg-bl-01'}`}
                    onClick={() => {
                        setOptionSelect(element)
                    }}>
                    <span>{element.label}</span>
                </div>
            )
        })
    }

    function setOptionSelect(option: option) {
        if (value.id === option.id) {
            setValue({} as option)
        } else {
            setValue(option)
            setSituation(SelectStyles.default)
        }
    }

    return (
        <div ref={ref} className={`${situation} h-20 z-20 relative`}
            onMouseEnter={() => {
                setSituation(SelectStyles.hover)
                if (active) {
                    setSituation(SelectStyles.focus)
                }
            }}
            onMouseLeave={() => {
                setSituation(SelectStyles.default)
            }}
            onClick={() => {
                if (!disabled) {
                    setSituation(SelectStyles.focus)
                    setActive(true)
                }
            }}>
            <span className="h-4 w-full text-base overflow-hidden text-bk-00">{label}</span>
            <div className={`w-full h-12 border-2 border-gr-01 relative z-10 rounded-2xl transition-all duration-200 grid grid-cols-[1fr_2rem] bg-transparent
                            ${SelectStyles.selectBody}`}>
                <label className={`w-full h-full ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
                    <input className={`w-full h-full text-sm bg-transparent text-start px-2 overflow-hidden outline-none ${disabled ? 'cursor-not-allowed' : 'cursor-pointer text-bk-00'}`}
                        type="text"
                        disabled={disabled}
                        value={value.label || ''}
                        placeholder={placeholder}
                        readOnly />
                </label>
                <div className={`flex justify-center items-center transition-all duration-200
                    ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
                    ${SelectStyles.iconBody}`}
                    onClick={() => !disabled && setActive(true)}>
                    <ChevronDown className={`transition-all duration-200 ${disabled ? 'stroke-gr-00' : SelectStyles.icon}`} />
                </div>
            </div>
            <If test={active && listOptions.length > 0}>
                <div className={`absolute w-full min-h-[3rem] max-h-[8rem] z-0 overflow-y-auto rounded-b-md bg-wh-02 shadow-xl top-[4.25rem] flex flex-col gap-1 py-2 ${SelectStyles.options}`}>
                    {renderOptions(listOptions)}
                </div>
            </If>
        </div >
    )
}