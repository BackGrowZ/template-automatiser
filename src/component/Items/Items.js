import React, { Component, Fragment } from 'react'

export default class Items extends Component {
    constructor(props) {
        super(props)
        this.state = {
            itemsAdd: '',
            linkAdd: '',
        }

        this.handleInputChange = this.handleInputChange.bind(this)
        this.submitAddItems = this.submitAddItems.bind(this)
        this.removeitems = this.removeitems.bind(this)
    }

    submitAddItems(e) {
        e.preventDefault();
        let item = this.state.itemsAdd
        let link = this.state.linkAdd
        if (link && item) {
            this.additems(item, link)
        } else console.log('nop');

    }

    additems(item, link) {
        const { updateState, addColonne, items } = this.props
        let result = items
        let a = [item, link]
        result = [...result, a]
        this.setState({
            // items: result,
            itemsAdd: '',
            linkAdd: '',
        })
        updateState('items', result)
        setTimeout(() => addColonne(), 1)
    }

    removeitems(id) {
        const { updateState, addColonne, items } = this.props
        let newListeItems = items.filter(result => result !== items[id])
        updateState('items', newListeItems)
        setTimeout(() => addColonne(), 1)
    }

    handleInputChange(e) {
        const target = e.target;
        const value = target.value;
        const name = target.id;
        this.setState({ [name]: value });
    }

    render() {

        /* Genere le contenu du tableau items */
        const { items, updateState } = this.props
        const { itemsAdd, linkAdd } = this.state
        const tabItems = items.map(result =>
            <tr key={items.indexOf(result)} style={{ backgroundColor: (items.indexOf(result) % 2) ? '#9e9e9e' : null }}>
                <th key={`id` + items.indexOf(result)} scope="row">{items.indexOf(result) + 1}</th>
                <td key={`nom` + items.indexOf(result)}>{result[0]}</td>
                <td key={`lien` + items.indexOf(result)}>{result[1]}</td>
                <td key={`button` + items.indexOf(result)}>
                    <a href={`#id=${items.indexOf(result)}`}>
                        <i style={{ color: '#0089c8', cursor: 'pointer', marginRight: '5px' }} onClick={() => setTimeout(() => updateState('editStatus', true), 200)} className="fas fa-pen" />
                    </a>
                    <i style={{ color: 'red', cursor: 'pointer' }} className="fas fa-times" onClick={() => this.removeitems(items.indexOf(result))} />
                </td>
            </tr>
        )

        /* Derniere ligne du tableau / Ajout Items */
        const addItemsValue = 
        <tr style={{ backgroundColor: (items.length % 2) ? '#9e9e9e' : null }}>
            <th scope="row">{items.length + 1}</th>
            <td ><input id='itemsAdd' placeholder="nom de l'élement" onChange={this.handleInputChange} value={itemsAdd} /></td>
            <td ><input id='linkAdd' placeholder="lien de l'élement" onChange={this.handleInputChange} value={linkAdd} /></td>
            <td ><i style={{ color: 'green', cursor: 'pointer' }} className="fas fa-check" onClick={this.submitAddItems} /></td>
        </tr>

        /* tableau items et link au complet */
        const tabAllItems =
            <Fragment>
                <h3>Element présent dans le footer</h3>
                <table className="table">
                    <thead>
                        <tr style={{ backgroundColor: '#464747', color: 'white' }}>
                            <th scope="col">Position</th>
                            <th scope="col">Nom</th>
                            <th scope="col">Lien</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tabItems}
                        {addItemsValue}
                    </tbody>
                </table>
            </Fragment>


        return tabAllItems
    }
}
