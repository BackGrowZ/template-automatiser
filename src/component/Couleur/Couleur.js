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
    render() {
        const color = this.props.color
        const tabItems =
            color.map(result => (color.indexOf(result) % 2) ?
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
        return <div>{tabAllItems}</div>
    }
}
