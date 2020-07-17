import React, { Component, Fragment } from 'react'
import { v4 as uuidv4 } from 'uuid'; // pour les keys
import './template.css'
import Footer from '../Footer/Footer';
import Editeur from '../Editeur/Editeur'
import LinkCustomer from '../LinkCustomer/LinkCustomer';
import SliderButton from '../SliderButton/SliderButton';
import MenuLateralGauche from '../../MenuLateralGauche/MenuLateralGauche';
import MenuLateralGaucheMainCategorie from '../../MenuLateralGauche/MenuLateralGaucheMainCategorie';
import MenuLateralGaucheCategorie from '../../MenuLateralGauche/MenuLateralGaucheCategorie';
import DropDown from '../DropDown/DropDown';
// import Prism from "../Prism/Prism";
// import { exemple } from "../Prism/code/exemple";


export default class Template extends Component {
    constructor(props) {
        super(props)
        this.state = {
            editStatus: false, // acces a l'editeur
            paddingfooter: null,
            heightMain: null,

            showFooter: true,
            menu: false,
            menuEdit_component: false,
            menuEdit_Social: false,
            menuEdit_Items: false,
            menuEdit_Style: false,
            /* element necessaire au fonctionnement du footer */
            itemsByColonne: 1, // nombre d'item par colonne
            elementFooter: {},
            copyright: ['Name Of Site by Anthony Carreta', 'http://linkToCreateur.com'], // message du copyright
            items: [['lien 1', '#link_1'], ['lien 2', '#link_2'], ['lien 3', '#link_3'], ['lien 4', '#link_4'], ['lien 5', '#link_5']], // listes des items avec les link
            color: [['Background', '#dadada'], ['Element', '#000000'], ['Copyright', '#000000'], ['Separateur', '#000000']],
            reseau: [['Facebook', true, 'https://www.facebook.com/anthony.carreta/'], ['GitHub', true, 'https://github.com/BackGrowZ/'], ['Instagram', false, 'https://www.instagram.com/'], ['Linkedin', true, 'https://www.linkedin.com/in/anthony-carreta/'], ['Pinterest', false, 'https://www.pinterest.fr/'], ['Twitter', false, 'https://twitter.com/?lang=fr/']],
        }
        this.updateState = this.updateState.bind(this)
        this.addColonne = this.addColonne.bind(this)
    }

    componentDidMount() {
        this.addColonne() // lance le script de mise en page du footer
        this.paddingFooter()
        window.addEventListener('resize', () => this.handleResize()) // surveille le resize pour redimentionner le main
    }

    /* ===== MISE EN PAGE (PAGE PRINCIPAL) ===== */

    handleResize() { // verrifie si le main a besoin d'etre resize
        const { heightMain } = this.state
        if (heightMain) {
            let paddingFooter = document.getElementById('footer').offsetHeight // hauteur du foooter
            let hauteurMain = window.innerHeight - paddingFooter
            if (heightMain !== hauteurMain) {
                this.setState({
                    paddingfooter: paddingFooter,
                    heightMain: hauteurMain
                })
            }
        } else setTimeout(() => this.handleResize(), 100)
    }

    paddingFooter() { // config au rendu
        if (document.getElementById('allColonne')) { // permet de savoir quand il a finit de load le footer
            let padding = document.getElementById('footer').offsetHeight // hauteur du foooter
            this.setState({
                paddingfooter: padding
            })
            this.heightOfMain(padding)
        } else {
            setTimeout(() => this.paddingFooter(), 100)
        }
    }

    heightOfMain(footer) { // config au rendu
        const hauteurTotal = window.innerHeight
        const hauteurMain = hauteurTotal - footer
        this.setState({
            heightMain: hauteurMain
        })
    }

    /* ===== FIN MISE EN PAGE (PAGE PRINCIPAL) ===== */

    updateState(name, value, id) { // pour setState a partir des component enfant
        const { items } = this.state
        if (name === 'reseau') {
            let { reseau } = this.state
            if (typeof value === "boolean") {
                reseau[id][1] = value
                this.setState({ [name]: reseau })
            } else if (id === undefined) {
                this.setState({
                    [name]: value
                })
            }
        } else if (name === 'itemsDrop') {
            const editedItems = items.filter(result => result !== items[id])
            this.setState({
                items: editedItems
            })
        } else if (name === 'itemsUp') {
            const editedItems = items.filter(result => result !== items[id])
            const itemsUp = items[id]
            editedItems.splice(id - 1, 0, itemsUp)
            this.setState({
                items: editedItems
            })
        } else if (name === 'itemsDown') {
            const editedItems = items.filter(result => result !== items[id])
            const itemsDown = items[id]
            editedItems.splice(id + 1, 0, itemsDown)
            this.setState({
                items: editedItems
            })

        } else if (name === 'itemsByColonne') {
            this.setState({
                [name]: value
            })
        } else if (name === 'color') {
            this.setState({
                [name]: value
            })
        }
        else if (typeof name === 'object') {
            if (value === 'object') {
                for (let x = 0; x < name.length; x++) {
                    this.setState({
                        [name[x]]: value[x]
                    })
                }
            } else {
                for (let x = 0; x < name.length; x++) {
                    this.setState({
                        [name[x]]: value
                    })
                }
            }
        } else {
            this.setState({ [name]: value })
        }
        setTimeout(() => this.addColonne(), 1)
    }

    addColonne() { // mise en page du footer
        const { items, itemsByColonne, color } = this.state
        let all = {} // contenant de toute la mise en page 
        let result // contenant de la mise en page pour chaque passage de la boucle
        let count = 0 // reference pour le slice
        let max = Math.ceil(items.length / itemsByColonne) // calcule le nombre total de colonne
        for (let x = 0; x < max; x++) { // boucle pour créer organiser les div ul et li du footer 
            result =

                <div className='boxFooter' key={uuidv4()}>
                    <ul key={uuidv4()}>
                        {
                            items.slice(count, count + itemsByColonne) // extrait les element a placer dans le footer
                                .map(result =>
                                    <a className='itemLink' href={result[1]} key={uuidv4()}>
                                        <li className='footerItems' key={uuidv4()} style={{ color: color[1][1] }}>{result[0]}</li>
                                    </a>
                                ) // creer le(s) li par rapport au élément avec le lien
                        }
                    </ul>
                </div>
            all[x] = result // ajoute le resulta de la boucle dans l'objet 
            count = count + itemsByColonne

            if (x === (max - 1)) {
                this.setState({
                    elementFooter: all // place dans le state le footer mise en forme
                })
            }
        }
    }

    render() {
        const { heightMain, paddingfooter, editStatus, elementFooter, itemsByColonne, copyright, items, color, menu, menuEdit_component, showFooter, reseau, menuEdit_Social, menuEdit_Items, menuEdit_Style } = this.state
        const dropDownElements = [['Monter', 'itemsUp'], ['Descendre', 'itemsDown'], ['Modifier', 'editStatus'], ['Supprimer', 'itemsDrop']]
        const copyrightMenu = <LinkCustomer link={`/copyright/#id=0`}><span style={{ cursor: 'pointer', display: 'inline-block', width: '60%' }} onClick={() => this.setState({ editStatus: !editStatus })}>Copyright</span></LinkCustomer>
        const itemsMenu = items.map((value, key) => <LinkCustomer key={key} link={`/items/#id=${key}`}><span key={key} style={{ cursor: 'pointer' }} onClick={() => this.setState({ editStatus: !editStatus })}>{value[0]}</span><DropDown id={key} max={items.length - 1} element={dropDownElements} updateState={this.updateState} /> {(key === items.length - 1) ? null : <br />} </LinkCustomer>)
        const socialMenu = reseau.map((value, key) => <LinkCustomer key={key} link={`/reseau/#id=${key}`}><span key={key} style={{ display: 'inline-block', width: '100%', cursor: 'pointer' }} onClick={() => this.setState({ editStatus: !editStatus })}>{value[0]}</span></LinkCustomer>)
        const menuEdit =
            <MenuLateralGauche show={menu} nameState='menu' functionClic={this.updateState}>
                <MenuLateralGaucheMainCategorie title='Component' nameState='menuEdit_component' state={menuEdit_component} functionClic={this.updateState}>
                    <span>Footer</span> <SliderButton etat={showFooter} name='showFooter' function={this.updateState} />
                </MenuLateralGaucheMainCategorie>
                <MenuLateralGaucheCategorie title='Reseau Sociaux' parentState={showFooter} nameState='menuEdit_Social' state={menuEdit_Social} functionClic={this.updateState} >
                    {socialMenu}
                </MenuLateralGaucheCategorie>
                <MenuLateralGaucheCategorie title='Items footer' parentState={showFooter} nameState='menuEdit_Items' state={menuEdit_Items} functionClic={this.updateState} >
                    {itemsMenu}
                    <br /><LinkCustomer link={`/addItems/`}><span style={{ cursor: 'pointer' }} onClick={() => this.setState({ editStatus: !editStatus })}>Ajouter Items</span></LinkCustomer>
                    {copyrightMenu}
                </MenuLateralGaucheCategorie>
                <MenuLateralGaucheCategorie title='Paramètres footer' parentState={showFooter} nameState='menuEdit_Style' state={menuEdit_Style} functionClic={this.updateState} >
                    <LinkCustomer link='/styleFooter/#id=0'><p style={{ margin: 0, cursor: 'pointer' }} onClick={() => this.setState({ editStatus: !editStatus })}>Style footer</p></LinkCustomer>
                </MenuLateralGaucheCategorie>
            </MenuLateralGauche>

        const Medit = (editStatus) ? <Editeur itemsByColonne={itemsByColonne} addColonne={this.addColonne} updateState={this.updateState} items={items} color={color} reseau={reseau} copyright={copyright} /> : null
        return (
            <Fragment>
                {Medit}
                <div className='main' style={{ minHeight: heightMain - 15, paddingBottom: paddingfooter + 15 }}>
                    {menuEdit}
                    {/* <Prism code={exemple} /> */}
                    <Footer
                        show={showFooter}
                        color={color}
                        items={items}
                        copyright={copyright}
                        itemsByColonne={itemsByColonne}
                        elementFooter={elementFooter}
                        reseau={reseau}
                    />
                </div>
            </Fragment>
        )
    }
}
