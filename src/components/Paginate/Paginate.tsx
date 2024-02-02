//@ts-ignore
import React, { useState } from "react";
import RenderIcon from "../../tools/RenderIcon";
import Input from "../Input/Input";

interface PaginateProps {
    totalPages: number;
    currentPage: number;
    setCurrentPage: (page: number) => void
}

export default ({ totalPages, currentPage, setCurrentPage }: PaginateProps) => {

    const [localPage, setLocalPage] = useState('')

    function arrowHandles(direction: 'left' | 'right') {
        let nextPage = direction === 'left' ? currentPage - 1 : currentPage + 1
        setCurrentPage(nextPage <= 0 ? 1 : nextPage > totalPages ? totalPages : nextPage)
    }

    function renderPaginateButtom(totalPages: number) {
        let renderButtons = []
        let returnRenderButtons = []
        for (let i = 1; i < totalPages + 1; i++) {
            renderButtons.push(
                <div key={i} className={`w-12 h-12 rounded-full cursor-pointer transition-all duration-300 flex justify-center items-center font-bold text-xl ${currentPage === i ? 'bg-bl-01 text-wh-00 border-4 border-wh-02' : 'text-gr-01'}`}
                    onClick={() => setCurrentPage(i)}>
                    {i}
                </div>
            )
        }
        if (totalPages > 5) {
            returnRenderButtons.push(...[renderButtons[0], renderButtons[1]])
            returnRenderButtons.push(
                <div key={'...'} className="w-12 h-12 rounded-full cursor-pointer transition-all duration-300 flex justify-center items-center font-bold text-xl">
                    ...
                </div>
            )
            returnRenderButtons.push(...[renderButtons[totalPages - 2], renderButtons[totalPages - 1]])
        } else {
            returnRenderButtons = renderButtons
        }
        return returnRenderButtons
    }

    function changeCurrentPage(value: string) {
        setCurrentPage(isNaN(parseInt(value)) ? 1 : parseInt(value) <= 0 ? 1 : parseInt(value) > totalPages ? totalPages : parseInt(value))
    }

    return (
        <div className="w-full h-14 pr-2 relative flex justify-end items-center gap-2 select-none">
            <div className={`h-12 w-max min-w-[3rem] rounded-full  flex justify-center items-center
                ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                onClick={() => arrowHandles('left')}>
                <RenderIcon iconName="ChevronLeft" size={25} className="stroke-gr-01" />
            </div>
            <div className="h-12 w-max min-w-[3rem] rounded-full bg-wh-02 border-2 stroke-gr-01 flex justify-center items-center">
                {renderPaginateButtom(totalPages)}
            </div>
            <div className={`h-12 w-max min-w-[3rem] rounded-full bg-bg-01 flex justify-center items-center
                ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                onClick={() => arrowHandles('right')}>
                <RenderIcon iconName="ChevronRight" size={25} className="stroke-gr-01" />
            </div>
            <div className="h-12 w-16 rounded-lg bg-wh-01 mt-2">
                <Input label="" value={localPage} setValue={setLocalPage} size="sm" type="number" runEnter={() => changeCurrentPage(localPage)} />
            </div>
        </div>
    )
}