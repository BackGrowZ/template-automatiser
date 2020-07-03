import React, { Component } from 'react'
import './edit.css'

export default class Editeur extends Component {
    constructor(props) {
        super(props)
        this.state = {
            itemsId: null,
            itemsActualPosition: null,
            itemsName: '',
            itemsLink: '',
            itemsPosition: []
        }
        this.setItems = this.setItems.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
    }
    componentDidMount() {
        window.addEventListener('scroll', this.noScroll(true));
        setTimeout(() => this.setItems(), 100)
    }

    updateItems() {
        let name = this.state.itemsName
        let link = this.state.itemsLink
        let id = parseInt(this.state.itemsId, 10)
        let editedItems = [name, link]
        const newItems = this.props.items.filter(result =>
            result !== this.props.items[window.location.hash.slice(4)]
        )
        newItems.splice(id, 0, editedItems)
        this.props.updateState('items', newItems)
        setTimeout(() => this.props.addColonne(), 100)
        this.noScroll(false)

    }

    setItems() {
        const id = window.location.hash.slice(4)
        const name = this.props.items[id][0]
        const link = this.props.items[id][1]
        let position = []
        for (let x = 0; x < this.props.items.length; x++) {
            if (x + 1 === parseInt(id, 10)) {
                position[x] = `${x + 1} (actuelle)`
            } else {
                position[x] = `${x + 1}`
            }
        }
        this.setState({
            itemsId: id,
            itemsName: name,
            itemsLink: link,
            itemsPosition: position,
            itemsActualPosition: `${id} (actuelle)`
        })
    }

    noScroll(state) {
        if (state) {
            setTimeout(() => document.getElementsByTagName('body')[0].style.overflow = 'hidden', 1)
        } else {
            this.props.updateState('editStatus', false)
            document.getElementsByTagName('body')[0].style.overflow = ''
        }
    }
    handleInputChange(e) {
        const target = e.target;
        const value = target.value;
        const name = target.id;
        this.setState({ [name]: value });
    }

    render() {
        let positionSelect = this.state.itemsPosition.map(position =>
            (position === `${this.state.itemsId} (actuelle)`) ?
                <option key={position} selected="selected" value={position-1}>{position}</option>
                :
                <option key={position} value={position-1}>{position}</option>
        )
        const template =
            <div className='mainEdit'>
                <button onClick={() => this.noScroll(false)}><i style={{ color: 'red', cursor: 'pointer' }} className="fas fa-times" /></button>
                <div>
                    <select defaultValue={this.state.itemsActualPosition} id='itemsId' onChange={this.handleInputChange}>
                        {positionSelect}
                    </select>
                    <input id='itemsName' onChange={this.handleInputChange} value={this.state.itemsName} />
                    <input id='itemsLink' onChange={this.handleInputChange} value={this.state.itemsLink} />
                    <button onClick={() => this.updateItems()}>Validé</button>

                </div>
            </div>
        return template
    }
}
