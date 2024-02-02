import { useEffect, useState } from "react"
import Row from "../components/Row"

export default () => {

    /* const component2 = <Row color="bg-purple-600" width="96%" contents={['3']} />
    const component1 = <Row color="bg-purple-900" width="98%" contents={['4']} children={component2} /> */

    const arrayCategories = [{
        id: 1,
        name: 'LANCHONETE'
    }, {
        id: 2,
        name: 'BAZAR'
    }, {
        id: 3,
        name: 'LAVANDERIA'
    }]

    const arrayMerchandise1 = [{
        id: 1,
        name: 'MERCHANDISE1'
    }, {
        id: 2,
        name: 'MERCHANDISE1'
    }]
    const arrayMerchandise2 = [{
        id: 1,
        name: 'MERCHANDISE2'
    }, {
        id: 2,
        name: 'MERCHANDISE2'
    }]

    const [categories, setCategories] = useState([] as Array<Array<any>>)
    const [merchandises, setMerchandises] = useState([] as Array<Array<any>>)
    const [materials, setMaterials] = useState([] as Array<Array<any>>)

    useEffect(() => {
        getCategories()
    }, [])

    function getCategories() {
        let currentCategories:Array<Array<any>> = []
        arrayCategories.map(categorie => {
            currentCategories.push([
                categorie.name
            ])
        })
        setCategories(currentCategories)
        getMerchandises()
    }
    function getMerchandises() {
        let currentMerchandises:Array<Array<any>> = []
        arrayMerchandise1.map((merchandise, index) => {
            currentMerchandises.push([
                <Row color="bg-yellow-300" rowIndex={index} contents={[merchandise.name]} width="98%"></Row>
            ])
        })
        setMerchandises([[currentMerchandises]])
    }

    function renderData() {
        return categories.map((row, index) => (
            <Row key={index} color="bg-purple-300" rowIndex={index} contents={row} width="100%" children={merchandises}></Row>
        ))
    }


    return (
        <div className="h-full w-full flex flex-col p-5">
            {renderData()}
        </div>
    )
}