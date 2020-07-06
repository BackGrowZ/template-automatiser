import React, { Component, Fragment } from 'react'
import './couleur.css'

export default class Couleur extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pickerState: true,
            element: [] // [name, color]
        }
    }
    // updateColor() {
    //     let name = this.state.itemsName
    //     let link = this.state.itemsLink
    //     let id = parseInt(this.state.itemsId, 10)
    //     let editedItems = [name, link]
    //     const newItems = this.props.items.filter(result =>
    //         result !== this.props.items[window.location.hash.slice(4)]
    //     )
    //     newItems.splice(id, 0, editedItems)
    //     this.props.updateState('items', newItems)
    //     setTimeout(() => this.props.addColonne(), 100)
    //     this.noScroll(false)

    // }
    render() {
        const color = this.props.color
        const tabItems = color.map(result => (color.indexOf(result) % 2) ?
            <tr key={color.indexOf(result)} style={{ backgroundColor: '#9e9e9e' }}>
                <td key={`nom` + color.indexOf(result)}>{result[0]}</td>
                <td key={`color` + color.indexOf(result)}>{result[1]}</td>
                <td key={`button` + color.indexOf(result)}>
                    <a href={`/color/#id=${color.indexOf(result)}`}>
                        <i style={{ color: 'red', cursor: 'pointer' }} className="fas fa-eye-dropper" onClick={() => setTimeout(() => this.props.updateState('editStatus', true), 200)} />
                    </a>
                </td>
            </tr>
            :
            <tr key={color.indexOf(result)}>
                <td key={`nom` + color.indexOf(result)}>{result[0]}</td>
                <td key={`color` + color.indexOf(result)}>{result[1]}</td>
                <td key={`button` + color.indexOf(result)}>
                    <a href={`/color/#id=${color.indexOf(result)}`}>
                        <i style={{ color: 'red', cursor: 'pointer' }} className="fas fa-eye-dropper" onClick={() => setTimeout(() => this.props.updateState('editStatus', true), 200)} />
                    </a>
                </td>
            </tr>
        )

        const tabAllItems =
            <Fragment>
                <h3>Couleur du footer</h3>
                <table className="table">
                    <thead>
                        <tr style={{ backgroundColor: '#464747', color: 'white' }}>
                            <th scope="col">Nom</th>
                            <th scope="col">Couleur</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tabItems}
                    </tbody>
                </table>
            </Fragment>
        return (
            <div>
                <div>{tabAllItems}</div>
                {/* <div>{picker} <button onClick={() => this.updateColor()}>OK</button></div> */}
            </div>
        )
    }
}
