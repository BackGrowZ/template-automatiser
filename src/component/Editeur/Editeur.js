import React, { Component } from 'react'
import { ChromePicker } from 'react-color'
import { v4 as uuidv4 } from 'uuid'; // pour les keys
import './edit.css'

export default class Editeur extends Component {
    constructor(props) {
        super(props)
        this.state = {
            /* Config */
            noscroll: false,
            pathname: null,
            hash: null,
            id: null,
            initInput: true,

            /* Items */
            itemsActualPosition: null,
            itemsName: '',
            itemsLink: '',
            itemsPosition: [],

            /* Couleur */
            pickerColor: '',

            /* Reseau */
            reseauLink: '',

            /* Copyright */
            copyright: '',
            copyrightLink: '',

            /* BoxSetting */
            boxButtonFooter: [
                ['Annuler', true, 'CancelBoxEdition', undefined], // label, afficher, ClassName, function(initialiser dans initFunction)
                ['Valider', true, 'SubmitBoxEdition', undefined],
                ['Supprimer', true, 'DeletBoxEdition', undefined]
            ],
            formState: {
                itemsName: false,
                itemsLink: false,
                reseauLink: false,
                copyright: false,
                copyrightLink: false
            },
            form: {
                itemsName: '',
                itemsLink: '',
                reseauLink: '',
                copyright: '',
                copyrightLink: '',
            },
            label: {
                itemsName: 'Label',
                itemsLink: 'URL',
                reseauLink: 'URL',
                copyright: 'Label',
                copyrightLink: 'URL',
            },
            boxInput: [
                [true, null, 'boxForm', '', 'itemsName', 'Nom'], // afficher, placeholder, ClassName, value, name, label
                [true, null, 'boxForm', '', 'itemsLink', 'Lien'],
                [true, null, 'boxForm', '', 'reseauLink', 'Lien'],
                [true, null, 'boxForm', '', 'copyright', 'Nom'],
                [true, null, 'boxForm', '', 'copyrightLink', 'Lien'],
            ]

        }
        this.setItems = this.setItems.bind(this)
        this.init = this.init.bind(this)
        this.componentDidMount = this.componentDidMount.bind(this)
        this.onFormInputChange = this.onFormInputChange.bind(this)
    }
    componentDidMount() {
        window.addEventListener('scroll', this.noScroll(!this.state.noscroll));
        this.setState({
            pathname: window.location.pathname,
            hash: window.location.hash,
            id: window.location.hash.slice(4)
        })

        setTimeout(() => this.init(), 100)
        setTimeout(() => this.initFunction(), 500)
    }

    init() {
        if (this.state.hash !== null) {
            const { form } = this.state
            const { formState } = this.state
            switch (this.state.pathname) {
                case '/items/':
                    this.setState({
                        itemsActualPosition: `${this.state.hash.slice(4)} (actuelle)`,
                        formState: {
                            ...formState,
                            itemsName: true,
                            itemsLink: true
                        },
                    })
                    setTimeout(() => this.setItems(), 100)
                    break;

                case '/color/':
                    let color = this.props.color[this.state.id][1]
                    this.setState({
                        pickerColor: color,
                        // formState: [false, false, false, false, false], // itemsName, itemsLink,reseauLink,copyright,copyrightLink
                    })
                    break;

                case '/reseau/':
                    let reseau = this.props.reseau[this.state.id][2]
                    this.setState({
                        form: {
                            ...form,
                            reseauLink: reseau
                        },
                        formState: {
                            ...formState,
                            reseauLink: true,
                        },
                        reseauLink: reseau,
                        // formState: [false, false, true, false, false], // itemsName, itemsLink,reseauLink,copyright,copyrightLink
                    })
                    break;

                case '/copyright/':
                    let copyright = this.props.copyright[0]
                    let copyrightLink = this.props.copyright[1]

                    this.setState({
                        form: {
                            ...form,
                            copyright: copyright,
                            copyrightLink: copyrightLink
                        },
                        formState: {
                            ...formState,
                            copyright: true,
                            copyrightLink: true
                        },
                        // formState: [false, false, false, true, true], // itemsName, itemsLink,reseauLink,copyright,copyrightLink
                        copyrightLink: copyrightLink,
                        copyright: copyright
                    })
                    break;

                default:
                    break;
            }
        }
        else setTimeout(() => this.init(), 100)
    }

    setItems() {
        const { form } = this.state
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
                form: {
                    ...form,
                    itemsName: name,
                    itemsLink: link,
                },

                itemsName: name,
                itemsLink: link,
                itemsPosition: position,
                itemsActualPosition: `${id} (actuelle)`
            })
        } else {
            setTimeout(() => this.setItems(), 100)
        }
    }

    update() {
        const { id } = this.state
        let nameUpdate
        let valueUpdate
        const { form } = this.state
        /*=== Items ===*/
        const itemsName = form['itemsName']
        const itemsLink = form['itemsLink']
        const itemsEditer = [itemsName, itemsLink]
        /*=== Copyright ===*/
        const copyright = form['copyright']
        const copyrightLink = form['copyrightLink']
        const copyrightEditer = [copyright, copyrightLink]
        /*=== Reseau Sociaux ===*/
        const reseauLink = this.state.form['reseauLink']
        let reseauEditer = this.props.reseau

        /* === Config le updateState === */
        if (this.state.pathname === '/items/') {
            const itemsUpdate = this.props.items.filter(result =>
                result !== this.props.items[id]
            )
            itemsUpdate.splice(id, 0, itemsEditer)
            nameUpdate = 'items'
            valueUpdate = itemsUpdate
        } else if (this.state.pathname === '/copyright/') {
            nameUpdate = 'copyright'
            valueUpdate = copyrightEditer
        } else if (this.state.pathname === '/reseau/') {
            reseauEditer[id] = [reseauEditer[id][0], reseauEditer[id][1], reseauLink]
            nameUpdate = 'reseau'
            valueUpdate = reseauEditer
        }

        this.props.updateState(nameUpdate, valueUpdate)
        setTimeout(() => this.props.addColonne(), 100)
        this.noScroll(false)
    }

    updateColor() {
        let id = this.state.id
        let newColor = this.props.color
        newColor[id][1] = this.state.pickerColor
        this.props.updateState('color', newColor)
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
    onFormInputChange({ target }) {
        let { form } = this.state
        this.setState({
            form: {
                ...form,
                [target.name]: target.value
            }
        })
    }
    initFunction() { // place les fonctions dans le state
        const state = this.state
        /* state */
        const noScrollState = state.noscroll
        let boxButtonFooterState = state.boxButtonFooter
        /* Function */
        const noScroll = () => this.noScroll(noScrollState)
        const update = () => this.update()

        boxButtonFooterState[0][3] = noScroll // button annuler
        boxButtonFooterState[1][3] = update // button Valider
        this.setState({
            boxButtonFooter: boxButtonFooterState,
        })
    }

    boxButton(array) { // generateur de button
        let button = array.map(result => // result[0] = label | result[1] = state | result[2] = ClassName | result[3] = function OnClick 
            (result[1]) ?
                <button key={uuidv4()} className={result[2]} onClick={result[3]} > {result[0]} </button>
                :
                null
        )
        return button
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

        const items = (this.state.pathname === '/items/' && this.state.itemsActualPosition && this.state.boxInput[0][4]) ?
            (
                <div>
                    <select value={this.state.itemsActualPosition} id='id' onChange={this.handleInputChange}>
                        {positionSelect}
                    </select>
                    {/* <button onClick={() => this.updateItems()}>Validé</button> */}
                </div>
            ) : null

        const reseau = (this.state.pathname === '/reseau/') ?
            (
                <div>
                    <h3 style={{ color: 'white' }}>{this.props.reseau[this.state.id][0]}</h3>
                    <input id='reseauLink' onChange={this.handleInputChange} value={this.state.reseauLink} />
                    <button onClick={() => this.updateNetwork()}>Validé</button>
                </div>
            ) : null

        const copyright = (this.state.pathname === '/copyright/') ?
            (
                <div>
                    <input id='copyright' onChange={this.handleInputChange} value={this.state.copyright} />
                    <input id='copyrightLink' onChange={this.handleInputChange} value={this.state.copyrightLink} />
                    <button onClick={() => this.updateCopyright()}>Validé</button>
                </div>
            ) : null
        const boxButtonFooter = this.boxButton(this.state.boxButtonFooter)

        let input = Object.entries(this.state.form).map(([key, value]) => {
            return (
                <input
                    key={`input${key}`}
                    name={key}
                    placeholder={key}
                    value={value}
                    className='boxForm'
                    onChange={this.onFormInputChange}
                />
            );
        })
        let label = Object.entries(this.state.label).map(([key, value]) => {
            return (
                <label
                    key={`label${key}`}
                    htmlFor={key}
                    className='boxLabelInput'
                >
                    {value}
                </label>
            );
        })
        const formStateArray = Object.entries(this.state.formState)
        const boxTemplate =
            <div className='BoxEdition'>
                <div className='HeaderBoxEdition'>
                    <div className='CrossBoxEdition'><i onClick={this.state.boxButtonFooter[0][3]} className="fas fa-times" /></div>
                    <div className='TitleBoxEdition'>TITlE OF BOX</div>
                </div>
                <div className='BodyBoxEdition'>
                    {input.map((reslut, key) => (formStateArray[key][1]) ?
                        <div key={key} className='boxContainerInput'>
                            {label[key]}
                            {reslut}
                        </div>
                        : null
                    )}
                </div>
                <div className='FooterBoxEdition'>
                    {boxButtonFooter}
                </div>

            </div>

        const template =
            <div className='mainEdit'>
                {items}
                {color}
                {reseau}
                {copyright}
                {boxTemplate}
            </div>

        return template
    }
}
