//@ts-ignore
import React, { useEffect, useRef, useState } from "react"
import Button from "../components/Button"
import Table from "../components/Table"
import axios from "../axios"
import PopUp from "../components/PopUp"
import If from "../tools/If"
import Input from "../components/Input/Input"
import Select, { option } from "../components/Select/Select"
import IconButton from "../components/IconButton"
import moment from "moment"
import { toast } from "react-toastify"
import Paginate from "../components/Paginate/Paginate"

export default () => {

    const colmns = [
        'Nome',
        'Prioridade',
        'Status',
        'Data Criação',
        ''
    ]
    const sizeSpace = [
        '0.7fr',
        '0.3fr',
        '0.5fr',
        '0.5fr',
        '0.4fr',
        '0.4fr'
    ]

    const initialOptionValue = { id: 0, label: 'TODAS' }

    const inputRef = useRef<HTMLInputElement>(null)

    //@ts-ignore
    const [perPage, setPerPage] = useState(8)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalRows, setTotalRows] = useState(0)

    const [taskData, setTaskData] = useState([] as Array<Array<any>>)
    const [openPopUp, setOpenPopUp] = useState(false)

    const [popUpTitle, setPopUpTitle] = useState('')
    const [inputName, setInputName] = useState('')
    const [inputData, setInputData] = useState('')


    const [priorityOption, setPriorityOption] = useState(initialOptionValue as option)
    const [priorityListOptions, setPriorityListOptions] = useState([initialOptionValue] as Array<option>)
    const [statusOption, setStatusOption] = useState(initialOptionValue as option)
    const [statusListOptions, setStatusListOptions] = useState([initialOptionValue] as Array<option>)

    const [inputNamePopUp, setInputNamePopUp] = useState('')

    const [priorityPopUpOption, setPriorityPopUpOption] = useState({} as option)
    const [priorityPopUpListOptions, setPriorityPopUpListOptions] = useState([] as Array<option>)

    const [statusPopUpOption, setStatusPopUpOption] = useState({} as option)
    const [statusPopUpListOptions, setStatusPopUpListOptions] = useState([] as Array<option>)

    useEffect(() => {
        getTaskData()
        getParams()
    }, [])

    useEffect(() => {
        getTaskData()
    }, [currentPage])

    function getParams() {
        axios.get('/params').then(response => {
            let currentPriorityData: Array<option> = [...priorityListOptions]
            let currentStatusData: Array<option> = [...priorityListOptions]
            let currentPopUpPriorityData: Array<option> = []
            response.data.forEach((row: any) => {
                if (row.type === 'priority') {
                    currentPriorityData.push({
                        id: row.id,
                        label: row.name
                    })
                    currentPopUpPriorityData.push({
                        id: row.id,
                        label: row.name
                    })
                }
                if (row.type === 'status') {
                    currentStatusData.push({
                        id: row.id,
                        label: row.name
                    })
                }
            });
            setPriorityListOptions(currentPriorityData)
            setStatusListOptions(currentStatusData)
            setPriorityPopUpListOptions(currentPopUpPriorityData)
        }).catch(error => {
            toast.error(error.response.data.status_code !== 'ERR000' ? error.response.data.message : 'Erro ao comunicar com o servidor, tente novamente!')
        })
    }

    function getTaskData() {
        axios.get('/tasks', {
            params: {
                name: inputName.trim().length > 0 ? inputName : '*',
                priority: priorityOption.id > 0 ? priorityOption.id : '*',
                status: statusOption.id > 0 ? statusOption.id : '*',
                date: inputData ? moment(inputData).format('DD/MM/YYYY') : '*',
                page: currentPage,
                total_page: perPage
            }
        }).then(response => {
            let totalRows = response.data[0].total_rows
            let currentTaskData: Array<Array<any>> = []
            response.data.forEach((row: any) => {
                currentTaskData.push([
                    row.name,
                    row.priority,
                    row.status,
                    moment(row.date).format('DD/MM/YYYY HH:MM'),
                    <IconButton label="Editar" iconName="Pencil" onClick={() => openedPopUp(`Editar Tarefa ${row.id}`)} />,
                    <IconButton label="Excluir" iconName="X" onClick={() => openedPopUp(`Tem certeza que deseja excluir a Tarefa ${row.id}?`)} />
                ])
            });
            setTotalRows(totalRows)
            setTaskData(currentTaskData)
        }).catch(error => {
            console.log(error);
            setInputName('')
            setPriorityOption({
                id: 0,
                label: 'TODAS'
            })
            setStatusOption({
                id: 0,
                label: 'TODAS'
            })
            setInputData('')
            setTaskData([])
            toast.error(error.response.data.status_code !== 'ERR000' ? error.response.data.message : 'Erro ao comunicar com o servidor, tente novamente!')
        })
    }

    function createTask() {
        if (inputNamePopUp.trim().length <= 0) {
            //aviso de Insira um nome
        } else if (priorityPopUpOption) {
            //aviso de Insira uma prioridade
        }
    }

    function openedPopUp(title: string) {
        setOpenPopUp(true)
        setPopUpTitle(title)
    }

    return (
        <div className="flex flex-col w-full h-full items-center gap-2">
            <div className="w-full text-left pl-8">
                <span className="font-bold uppercase text-gr-01 text-base">Lista de tarefas</span>
            </div>
            <div className="flex-col flex sm:flex-row justify-between gap-4 items-center w-11/12 h-max bg-wh-01 p-4 rounded-xl">
                <div className="sm:w-3/12 w-full">
                    <Input label="Nome" value={inputName} setValue={setInputName} size="md" runEnter={(() => getTaskData())} />
                </div>
                <div className="sm:w-3/12 w-full">
                    <Select label="Prioridade" value={priorityOption} listOptions={priorityListOptions} setValue={setPriorityOption} />
                </div>
                <div className="sm:w-3/12 w-full">
                    <Select label="Status" value={statusOption} listOptions={statusListOptions} setValue={setStatusOption} />
                </div>
                <div className="sm:w-3/12 w-full">
                    <Input label="Data" type="date" value={inputData} setValue={setInputData} size="md" />
                </div>
                <div className="sm:w-2/12 w-full">
                    <Button label="Buscar" onClick={() => getTaskData()} color="blue" />
                </div>
            </div>
            <div className="bg-wh-01 w-11/12 flex items-center flex-col rounded-xl">
                <div className="h-16 w-[95%] mt-5 mb-5">
                    <Button label="+Nova Tarefa" onClick={() => openedPopUp('Criar Tarefa')} color="dashed" />
                </div>
                <div className="w-[97%] h-full flex flex-col">
                    <If test={taskData.length > 0}>
                        <Paginate currentPage={currentPage} totalPages={Math.ceil(totalRows / perPage)} setCurrentPage={setCurrentPage} />
                    </If>
                    <Table columns={colmns} contents={taskData} size={sizeSpace} />
                </div>
            </div>
            <If test={openPopUp}>
                <PopUp open={openPopUp} setOpen={setOpenPopUp} title={popUpTitle}>
                    <div className="grid grid-cols-[1fr_1fr_0.7fr] gap-2 items-center w-full h-[20vh]">
                        <Input label="Nome" value={inputNamePopUp} setValue={setInputNamePopUp} size="md" />
                        <Select label="Prioridade" value={priorityPopUpOption} listOptions={priorityPopUpListOptions} setValue={setPriorityPopUpOption} />
                        <div className="min-h-max">
                            <Button label={popUpTitle} onClick={() => openedPopUp('Criar Tarefa')} color="blue" />
                        </div>
                    </div>
                </PopUp>
            </If>
        </div>
    )
}