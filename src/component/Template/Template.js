import React, { Component, Fragment } from 'react'
import { v4 as uuidv4 } from 'uuid'; // pour les keys
import './template.css'
import Footer from '../Footer/Footer';
import Editeur from '../Editeur/Editeur'
import Items from '../Items/Items';
import Couleur from '../Couleur/Couleur';
import LinkCustomer from '../LinkCustomer/LinkCustomer';
import Network from '../Network/Network';
import SliderButton from '../SliderButton/SliderButton';
import MenuLateralGauche from '../../MenuLateralGauche/MenuLateralGauche';
import MenuLateralGaucheMainCategorie from '../../MenuLateralGauche/MenuLateralGaucheMainCategorie';
import MenuLateralGaucheCategorie from '../../MenuLateralGauche/MenuLateralGaucheCategorie';


export default class Template extends Component {
    constructor(props) {
        super(props)
        this.state = {
            editStatus: false, // acces a l'editeur
            itemsStatus: false, // tableau Items footer
            colorsStatus: false, // tableau couleurs footer
            socialStatus: false, // tableau Reseau sociaux footer
            copyrightStatus: false, // tableau copyright footer
            paddingfooter: null,
            heightMain: null,

            showFooter: false,
            // menu: [false, '-340px',],
            menu: false,
            menuEdit_component: false,
            menuEdit_Social: false,
            hiddencomponent: true,
            /* element necessaire au fonctionnement du footer */
            itemsByColonne: 2, // nombre d'item par colonne
            elementFooter: {},
            copyright: ['Name Of Site by Anthony Carreta', 'http://linkToCreateur.com'], // message du copyright
            items: [['lien 1', '#link_1'], ['lien 2', '#link_2'], ['lien 3', '#link_3'], ['lien 4', '#link_4'], ['lien 5', '#link_5'], ['lien 6', '#link_6'], ['lien 7', '#link_7'], ['lien 8', '#link_8'], ['lien 9', '#link_9'], ['lien 10', '#link_10']], // listes des items avec les link
            color: [['Background', '#A7C700'], ['Element', '#000000'], ['Copyright', '#000000'], ['Separateur', '#000000']],
            reseau: [['Facebook', true, 'https://www.facebook.com/anthony.carreta/'], ['GitHub', true, 'https://github.com/BackGrowZ/'], ['Instagram', false, 'https://www.instagram.com/'], ['Linkedin', true, 'https://www.linkedin.com/in/anthony-carreta/'], ['Pinterest', false, 'https://www.pinterest.fr/'], ['twitter', false, 'https://twitter.com/?lang=fr/']],
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
        if (name === 'reseau') {
            let { reseau } = this.state
            if (typeof value === "boolean") {
                reseau[id][1] = value
                this.setState({ [name]: reseau })
            } else {
                console.log(typeof value);
            }
        } else if (typeof name === 'object') {
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
        const { socialStatus, heightMain, colorsStatus, itemsStatus, hiddenFooter, paddingfooter, editStatus, elementFooter, itemsByColonne, copyright, items, color, menu, menuEdit_component, showFooter, reseau, menuEdit_Social } = this.state

        const ShowSocial = (id) => <SliderButton etat={reseau[id][1]} id={id} name='reseau' function={this.updateState} />

        const menuEdit =
            <MenuLateralGauche show={menu} nameState='menu' functionClic={this.updateState}>
                <MenuLateralGaucheMainCategorie title='Component' nameState='menuEdit_component' state={menuEdit_component} functionClic={this.updateState}>
                    <Fragment>
                        <span>Footer</span> <SliderButton etat={showFooter} name={['showFooter', 'menuEdit_Social']} function={this.updateState} />
                    </Fragment>
                </MenuLateralGaucheMainCategorie>
                <MenuLateralGaucheCategorie title='Reseau Sociaux' parentState={showFooter} nameState='menuEdit_Social' state={menuEdit_Social} functionClic={this.updateState} >
                    <Fragment>
                        <span>Facebook</span> {ShowSocial(0)}<br />
                        <span>GitHub</span> {ShowSocial(1)}<br />
                        <span>Instagram</span> {ShowSocial(2)}<br />
                        <span>Linkedin</span> {ShowSocial(3)}<br />
                        <span>Pinterest</span> {ShowSocial(4)}<br />
                        <span>Twitter</span> {ShowSocial(5)}<br />
                    </Fragment>
                </MenuLateralGaucheCategorie>
            </MenuLateralGauche>

        const Medit = (editStatus) ? <Editeur addColonne={this.addColonne} updateState={this.updateState} items={items} color={color} reseau={reseau} copyright={copyright} /> : null
        const Mitems = (itemsStatus) ? <Items items={items} itemsByColonne={itemsByColonne} elementFooter={elementFooter} updateState={this.updateState} addColonne={this.addColonne} /> : null
        const Mcolor = (colorsStatus) ? <Couleur color={color} updateState={this.updateState} /> : null
        const Mreseau = (socialStatus) ? <Network reseau={reseau} updateState={this.updateState} /> : null
        return (
            <Fragment>
                {Medit}
                <div className='main' style={{ minHeight: heightMain - 15, paddingBottom: paddingfooter + 15 }}>
                    {menuEdit}

                    <div>
                        <h1>Footer</h1>
                        <h2>Structure du footer</h2>
                        <ul>
                            <li onClick={() => this.setState({ itemsStatus: !itemsStatus })}><LinkCustomer link='/items/'>Element et lien</LinkCustomer></li>
                            <li onClick={() => this.setState({ colorsStatus: !colorsStatus })}><LinkCustomer link='/color/'>Couleur</LinkCustomer></li>
                            <li onClick={() => this.setState({ socialStatus: !socialStatus })}><LinkCustomer link='/reseau/'>Réseau sociaux</LinkCustomer></li>
                            <li onClick={() => this.setState({ editStatus: !editStatus })}><LinkCustomer link='/copyright/#id=0'>Copyright</LinkCustomer> </li>
                            <li onClick={() => this.setState({ hiddenFooter: !hiddenFooter })}>Footer</li>
                        </ul>
                        <div>
                            {Mitems}
                            {Mcolor}
                            {Mreseau}
                        </div>

                    </div>

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
