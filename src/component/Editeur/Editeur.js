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
            titleBox: '',
            boxButtonFooter: [
                ['Annuler', true, 'CancelBoxEdition', undefined], // label, afficher, ClassName, function(initialiser dans initFunction)
                ['Valider', true, 'SubmitBoxEdition', undefined],
                ['Supprimer', true, 'DeletBoxEdition', undefined]
            ],
            color: [],
            formSelect: [ // label, select, value, state
                // ['Position', ['0', '1', '2', '3', '4', '5'], true],
                ['Position', [], '', false], // position items
                ['test', ['Moi', 'lui', 'elle'], 'lui', false], // simple test 
            ],
            formInput: [// label, value Input, state
                ['Label', '', false], // itemsName
                ['URL', '', false], // itemsLink
                ['URL', '', false], // reseauLink
                ['label', '', false], // copyright
                ['URL', '', false], // copyrightLink
            ],
        }
        this.setItems = this.setItems.bind(this)
        this.init = this.init.bind(this)
        this.componentDidMount = this.componentDidMount.bind(this)
        this.onFormInputChange = this.onFormInputChange.bind(this)
        this.onFormSelectChange = this.onFormSelectChange.bind(this)
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
            const { formInput } = this.state
            const { formSelect } = this.state
            const { id } = this.state
            let formInputEdited = formInput
            let formSelectEdited = formSelect
            switch (this.state.pathname) {
                case '/items/':
                    formInputEdited[0][2] = true
                    formInputEdited[1][2] = true
                    formSelectEdited[0][3] = true
                    this.setState({
                        titleBox: 'Lien Footer',
                        itemsActualPosition: `${this.state.hash.slice(4)} (actuelle)`,
                        formInput: formInputEdited
                    })
                    setTimeout(() => this.setItems(), 100)
                    break;

                case '/color/':
                    this.setState({ pickerColor: this.props.color[this.state.id][1] })
                    break;

                case '/reseau/':
                    formInputEdited[2][1] = this.props.reseau[this.state.id][2]
                    formInputEdited[2][2] = true

                    this.setState({ titleBox: this.props.reseau[id][0], formInput: formInputEdited })
                    break;

                case '/copyright/':
                    formInputEdited[3][1] = this.props.copyright[0]
                    formInputEdited[4][1] = this.props.copyright[1]
                    formInputEdited[3][2] = true
                    formInputEdited[4][2] = true

                    this.setState({ form: formInputEdited, titleBox: 'Copyright' })
                    break;

                default:
                    break;
            }
        }
        else setTimeout(() => this.init(), 100)
    }

    setItems() {
        if (this.state.id) {
            const { id } = this.state
            const { formInput } = this.state
            const { formSelect } = this.state
            let formInputEdited = formInput
            let formSelectEdited = formSelect
            formSelectEdited[0][2] = id

            formInputEdited[0][1] = this.props.items[id][0]
            formInputEdited[1][1] = this.props.items[id][1]

            for (let x = 0; x < this.props.items.length; x++) {
                formSelectEdited[0][1][x] = `${x}`
            }

            this.setState({
                formInput: formInputEdited,
                formSelect: formSelectEdited,
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
        const { formInput } = this.state
        const { formSelect } = this.state
        /*=== Items ===*/
        const itemsName = formInput[0][1]
        const itemsLink = formInput[1][1]
        const itemsPosition = formSelect[0][2]
        const itemsEditer = [itemsName, itemsLink]
        /*=== Copyright ===*/
        const copyright = formInput[3][1]
        const copyrightLink = formInput[4][1]
        const copyrightEditer = [copyright, copyrightLink]
        /*=== Reseau Sociaux ===*/
        const reseauLink = this.state.formInput[2][1]
        let reseauEditer = this.props.reseau

        /* === Config le updateState === */
        if (this.state.pathname === '/items/') {
            const itemsUpdate = this.props.items.filter(result =>
                result !== this.props.items[id]
            )
            itemsUpdate.splice(itemsPosition, 0, itemsEditer)
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
        const id = target.name
        const { formInput } = this.state
        let label = formInput[id][0]
        let value = target.value
        let state = formInput[id][2]
        const Edited = [label, value, state]
        const all = formInput
        all[id] = Edited
        this.setState({
            formInput: all
        })
    }
    onFormSelectChange({ target }) {
        const { formSelect } = this.state
        const id = target.name
        let label = formSelect[id][0]
        let select = formSelect[id][1]
        let value = target.value
        let state = formSelect[id][3]
        const Edited = [label, select, value, state]
        let all = formSelect
        all[id] = Edited

        this.setState({
            formSelect: all
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

        const color = (this.state.pathname === '/color/') ?
            (
                <div>
                    <ChromePicker color={this.state.pickerColor} onChangeComplete={handleColorChange} />
                    <button onClick={() => this.updateColor()}>Validé</button>
                </div>
            ) : null

        const boxButtonFooter = this.boxButton(this.state.boxButtonFooter)

        const formInput = this.state.formInput.map((value, key) => (value[2]) ?
            <div key={key} className='boxContainerInput'>
                <label key={`label${key}`} htmlFor={key} className='boxLabelInput' > {value[0]} </label>
                <input key={`input${key}`} name={key} value={value[1]} className='boxForm' onChange={this.onFormInputChange} />
            </div>
            : null
        )

        const formSelect = this.state.formSelect.map((value, index) => (this.state.id && value[3]) ?
            <div key={index} className='boxContainerInput'>
                <label key={`label${index}`} className='boxLabelInput' > {value[0]} </label>
                <select key={index} name={index} value={value[2]} className='boxForm' id='id' onChange={this.onFormSelectChange}>
                    {
                        (index === 0) ? // pour que la position commence a 1 
                            this.state.formSelect[index][1].map((valueOption, key2) => (value[2] === valueOption) ?
                                <option key={key2} value={valueOption}>{parseInt(valueOption, 10) + 1} (actuelle)</option>
                                :
                                <option key={key2} value={valueOption}>{parseInt(valueOption, 10) + 1}</option>
                            )
                            :
                            this.state.formSelect[index][1].map((valueOption, key2) => (this.state.id === valueOption) ?
                                <option key={key2} value={valueOption}>{valueOption} (actuelle)</option>
                                :
                                <option key={key2} value={valueOption}>{valueOption}</option>
                            )
                    }
                </select>
            </div>
            : null
        )

        const boxTemplate =
            <div className='BoxEdition'>
                <div className='HeaderBoxEdition'>
                    <div className='CrossBoxEdition'><i onClick={this.state.boxButtonFooter[0][3]} className="fas fa-times" /></div>
                    <div className='TitleBoxEdition'>{this.state.titleBox}</div>
                </div>
                <div className='BodyBoxEdition'>
                    {formInput}
                    {formSelect}
                </div>
                <div className='FooterBoxEdition'>
                    {boxButtonFooter}
                </div>
            </div>

        const template =
            <div className='mainEdit'>
                {color}
                {boxTemplate}
            </div>

        return template
    }
}
