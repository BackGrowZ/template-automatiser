import React, { Component, Fragment } from 'react'
import './network.css'

/* ===== RESEAU ====
    === STRUCTURE ===
    1) Name
    2) State
    3) Link

    === ORDER ===
    0) Facebook
    1) GitHub
    2) Instagram
    3) Linkedin
    4) Pinterest
    5) Twitter

    === EXEMPLE ===
    reseau[0][0] = Facebook
    reseau[3][1] = true/false
    reseau[5][2] = Link twitter
*/

export default class Network extends Component {
    buttonUpdater(network, id) {        
        let newNetwork = this.props.reseau
        newNetwork[id] = [network[0], !network[1], network[2]]
        this.props.updateState('reseau', newNetwork)
    }
    render() {
        const switchButton = (network, id) => (
            (network[1]) ?
                <label className="switch">
                    <input type="checkbox" defaultChecked onClick={() => this.buttonUpdater(network, id)} />
                    <span className="slider round"></span>
                </label>
                :
                <label className="switch">
                    <input type="checkbox" onClick={() => this.buttonUpdater(network, id)} />
                    <span className="slider round"></span>
                </label>
        )
        /* Genere le contenu du tableau reseau */
        const reseau = this.props.reseau
        const tabReseau = reseau.map(result => (reseau.indexOf(result) % 2) ?
            <tr key={reseau.indexOf(result)} style={{ backgroundColor: '#9e9e9e' }}>
                <th key={`nom` + reseau.indexOf(result)}>{result[0]}</th>
                <td key={`status` + reseau.indexOf(result)}>{switchButton(result, reseau.indexOf(result))}</td>
                <td key={`lien` + reseau.indexOf(result)}>{result[2]}</td>
                <td key={`button` + reseau.indexOf(result)}>
                    <a href={`/reseau/#id=${reseau.indexOf(result)}`}>
                        <i style={{ color: '#0089c8', cursor: 'pointer', marginRight: '5px' }} onClick={() => setTimeout(() => this.props.updateState('editStatus', true), 200)} className="fas fa-pen" />
                    </a>
                </td>
            </tr>
            :
            <tr key={reseau.indexOf(result)}>
                <th key={`nom` + reseau.indexOf(result)}>{result[0]}</th>
                <td key={`status` + reseau.indexOf(result)}>{switchButton(result, reseau.indexOf(result))}</td>
                <td key={`lien` + reseau.indexOf(result)}>{result[2]}</td>
                <td key={`button` + reseau.indexOf(result)}>
                    <a href={`/reseau/#id=${reseau.indexOf(result)}`}>
                        <i style={{ color: '#0089c8', cursor: 'pointer', marginRight: '5px' }} onClick={() => setTimeout(() => this.props.updateState('editStatus', true), 200)} className="fas fa-pen" />
                    </a>
                </td>
            </tr>
        )

        /* tableau complet */
        const tabAllReseau =
            <Fragment>
                <h3>Element présent dans le footer</h3>
                <table className="table">
                    <thead>
                        <tr style={{ backgroundColor: '#464747', color: 'white' }}>
                            <th scope="col">Nom</th>
                            <th scope="col">Status</th>
                            <th scope="col">Lien</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tabReseau}
                    </tbody>
                </table>
            </Fragment>
        return (
            tabAllReseau
        )
    }
}
