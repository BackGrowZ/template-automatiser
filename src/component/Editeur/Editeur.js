import React, { Component } from 'react'
import { ChromePicker } from 'react-color'
import './edit.css'

export default class Editeur extends Component {
    constructor(props) {
        super(props)
        this.state = {
            /* Config */
            pathname: null,
            hash: null,
            id: null,
            /* Items */
            itemsActualPosition: null,
            itemsName: '',
            itemsLink: '',
            itemsPosition: [],
            /* Couleur */
            pickerColor: '',


        }
        this.setItems = this.setItems.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.init = this.init.bind(this)
        this.componentDidMount = this.componentDidMount.bind(this)
    }
    componentDidMount() {
        window.addEventListener('scroll', this.noScroll(true));
        this.setState({
            pathname: window.location.pathname,
            hash: window.location.hash,
            id: window.location.hash.slice(4)
        })
        setTimeout(() => this.init(), 100)
    }

    init() {
        if (this.state.hash !== null) {
            switch (this.state.pathname) {
                case '/items/':
                    this.setState({
                        id: this.state.hash.slice(4),
                        itemsActualPosition: `${this.state.hash.slice(4)} (actuelle)`
                    })
                    setTimeout(() => this.setItems(), 100)
                    break;

                case '/color/':
                    let color = this.props.color[this.state.id][1]
                    this.setState({
                        pickerColor: color
                    })
                    break;

                default:
                    break;
            }
        } 
        else setTimeout(() => this.init(), 100)
    }

    setItems() {
        if (this.state.id) {
            let id = this.state.id
            const name = this.props.items[id][0]
            const link = this.props.items[id][1]
            let position = []
            for (let x = 0; x < this.props.items.length; x++) {
                if (x === parseInt(id, 10)) {
                    position[x] = `${x} (actuelle)`
                } else {
                    position[x] = `${x}`
                }
            }
            this.setState({
                itemsName: name,
                itemsLink: link,
                itemsPosition: position,
                itemsActualPosition: `${id} (actuelle)`
            })
        } else {
            setTimeout(() => this.setItems(), 100)
        }
    }

    updateColor() {
        let id = this.state.id
        let newColor = this.props.color
        newColor[id][1] = this.state.pickerColor
        this.props.updateState('color', newColor)
        this.noScroll(false)
    }

    updateItems() {
        let name = this.state.itemsName
        let link = this.state.itemsLink
        let id = parseInt(this.state.id, 10)
        let editedItems = [name, link]
        const newItems = this.props.items.filter(result =>
            result !== this.props.items[this.state.hash.slice(4)]
        )
        newItems.splice(id, 0, editedItems)
        this.props.updateState('items', newItems)
        setTimeout(() => this.props.addColonne(), 100)
        this.noScroll(false)

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
        const handleColorChange = ({ hex }) => this.setState({ pickerColor: hex })
        let positionSelect = this.state.itemsPosition.map(position =>
            (position === `${this.state.id} (actuelle)`) ?

                <option key={position} value={position}>{position}</option>
                :
                <option key={position} value={position}>{position}</option>
        )

        const color = (this.state.pathname === '/color/') ?
            (
                <div>
                    <ChromePicker color={this.state.pickerColor} onChangeComplete={handleColorChange} />
                    <button onClick={() => this.updateColor()}>Validé</button>
                </div>
            ) : null

        const items = (this.state.pathname === '/items/') ?
            (
                <div>
                    <select value={this.state.itemsActualPosition} id='id' onChange={this.handleInputChange}>
                        {positionSelect}
                    </select>
                    <input id='itemsName' onChange={this.handleInputChange} value={this.state.itemsName} />
                    <input id='itemsLink' onChange={this.handleInputChange} value={this.state.itemsLink} />
                    <button onClick={() => this.updateItems()}>Validé</button>
                </div>
            ) : null

        const template =
            <div className='mainEdit'>
                <button onClick={() => this.noScroll(false)} style={{ position: 'absolute', top: '0', right: '0', zoom: '1.5' }}><i style={{ color: 'red', cursor: 'pointer' }} onClick={() => this.noScroll(false)} className="fas fa-times" /></button>
                {items}
                {color}
            </div>

        return template
    }
}
