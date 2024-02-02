import { useEffect, useState } from "react"
import If from "../tools/If";
import RenderIcon from "../tools/RenderIcon";

interface TableProps {
    columns: Array<string>;
    size?: Array<string>;
    contents: Array<Array<any>>
}

type Columns = TableProps['columns']
type Contents = TableProps['contents']

export default ({ columns, size, contents }: TableProps) => {
    const [gridTemplateColumns, setGridTemplateColumns] = useState({
        gridTemplateColumns: `repeat(${columns.length}, 1fr)`
    })

    useEffect(() => {
        if (size && size.length > 0) {
            setGridTemplateColumns({
                gridTemplateColumns: size.join(' ')
            })
        }
    }, [])

    function renderColumns(columns: Columns) {
        return columns.map((columns, index) => (
            <div key={index}>{columns}</div>
        ))
    }

    function renderRows(rows: Contents) {
        return rows.map((contents, index) => (
            <div key={index} className={`justify-items-center w-full h-14 ${index % 2 === 0 ? 'bg-wh-02' : 'bg-wh-01'} rounded-lg grid items-center`} style={gridTemplateColumns}>
                {contents.map((rowContents: any, indexRow: number) => (
                    <div key={indexRow} className="font-medium text-gr-01 text-base">{rowContents}</div>
                ))}
            </div>
        ))
    }

    return (
        <div className="bg-wh-01 w-full h-full rounded-xl flex flex-col items-center justify-center">
            <div className="w-full h-14 grid justify-items-center items-center font-semibold rounded-lg bg-gr-00 m-3 text-base text-bk-00" style={gridTemplateColumns}>
                {renderColumns(columns)}
            </div>
            <If test={contents.length > 0}>
                {renderRows(contents)}
            </If>
            <If test={contents.length <= 0}>
            <div className='pt-2 flex justify-center items-center text-gr-01 text-2xl gap-2'>
                    <RenderIcon size={70} className="stroke-gr-01" iconName="ListX"/>
                    <span>Nenhum valor encontrado</span>
                </div>
            </If>
        </div>
    )
}