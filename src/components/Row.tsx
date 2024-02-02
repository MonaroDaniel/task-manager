import React, { useEffect, useState } from "react"
interface RowProps {
    contents: Array<any>,
    children?: any,
    color: string,
    width: string,
    rowIndex: number
}
export default ({ color, width, contents, children, rowIndex }: RowProps) => {

    const [open, setOpen] = useState(false)
    const [index, setIndex] = useState<number>()

    return (
        <div className="flex flex-col gap-1 items-center">
            <div className={`${color} h-12 items-center justify-items-center grid grid-cols-1 rounded-lg`}
                onClick={() => {
                    setOpen(vl => !vl)
                    setIndex(index)
                }}
                style={{
                    width
                }}>
                {contents.map((content, index) => (
                    <span key={index}>{content}</span>
                ))}
            </div>
            <div className="transition-all duration-300 overflow-auto" style={{
                width: '100%',
                maxHeight: open && index === rowIndex ? '10rem' : '0'
            }}>
                {children}
            </div>
        </div>
    )
}
{/* <div className="flex flex-col gap-1 items-center">
            {contents.map((row: Array<any>, rowIndex:number) => (
                <>
                    <div className={`grid grid-cols-3 items-center justify-items-center h-12 ${color} rounded-lg`}
                        onClick={() => {
                            setOpen(vl => !vl)
                            setIndex(rowIndex)
                            console.log(rowIndex)
                        }}
                        style={{
                            width: width
                        }}>
                        {row.map((content: any) => (
                            <span>{content}</span>
                        ))}
                    </div>
                    <div className="transition-all duration-300 overflow-auto" style={{
                        width: '100%',
                        maxHeight: open && rowIndex === index ? '10rem' : '0',
                    }}>{children}</div>
                </>
            ))}
        </div> */}