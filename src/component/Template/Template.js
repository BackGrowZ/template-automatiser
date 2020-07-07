import React, { Component, Fragment } from 'react'
import { v4 as uuidv4 } from 'uuid'; // pour les keys
import './template.css'
import Footer from '../Footer/Footer';
import Editeur from '../Editeur/Editeur'
import Items from '../Items/Items';
import Couleur from '../Couleur/Couleur';
import LinkCustomer from '../LinkCustomer/LinkCustomer';

export default class Template extends Component {
    constructor(props) {
        super(props)
        this.state = {
            editStatus: false, // acces a l'editeur
            itemsStatus: false, // tableau Items footer
            colorsStatus: false, // tableau couleurs footer
            paddingfooter: null,
            heightMain: null,

            /* element necessaire au fonctionnement du footer */
            itemsByColonne: 2, // nombre d'item par colonne
            elementFooter: {},
            facebook: [true, 'https://www.facebook.com/anthony.carreta/'],
            github: [true, 'https://github.com/BackGrowZ/'],
            instagram: [false, 'https://www.instagram.com/'],
            linkedin: [true, 'https://www.linkedin.com/in/anthony-carreta/'],
            pinterest: [false, 'https://www.pinterest.fr/'],
            twitter: [false, 'https://twitter.com/?lang=fr/'],
            copyright: 'Name Of Site by Anthony Carreta', // message du copyright
            items: [['lien 1', '#link_1'], ['lien 2', '#link_2'], ['lien 3', '#link_3'], ['lien 4', '#link_4'], ['lien 5', '#link_5'], ['lien 6', '#link_6'], ['lien 7', '#link_7'], ['lien 8', '#link_8'], ['lien 9', '#link_9'], ['lien 10', '#link_10']], // listes des items avec les link
            color: [['Background', '#A7C700'], ['Element', '#000000'], ['Copyright', '#000000'], ['Separateur', '#000000']]
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
        if (this.state.heightMain) {
            let paddingFooter = document.getElementById('footer').offsetHeight // hauteur du foooter
            let hauteurMain = window.innerHeight - paddingFooter
            console.log('resized to: ', window.innerWidth, 'x', window.innerHeight)
            if (this.state.heightMain !== hauteurMain) {
                this.setState({
                    paddingfooter: paddingFooter,
                    heightMain: hauteurMain
                })
            } else console.log('=> resized to: ', window.innerWidth, 'x', window.innerHeight)
        } else setTimeout(() => this.handleResize(), 100)
    }

    paddingFooter() { // config au rendu
        if (document.getElementById('allColonne').offsetHeight) { // permet de savoir quand il a finit de load le footer
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

    updateState(name, value) { // pour setState a partir des component enfant 
        if (name === 'color') {
            document.getElementsByClassName('footer')[0].style["background-color"] = value[0][1]
            document.getElementsByClassName('copyright')[0].style["color"] = value[2][1]
            document.getElementsByClassName('footerHR')[0].style["border-color"] = value[3][1]
            for (let x = 0; x < this.state.items.length; x++) {
                document.getElementsByClassName('footerItems')[x].style["color"] = value[1][1]
            }
        }
        this.setState({ [name]: value })
    }

    addColonne() { // mise en page du footer
        let all = {} // contenant de toute la mise en page 
        let result // contenant de la mise en page pour chaque passage de la boucle
        let count = 0 // reference pour le slice
        let max = Math.ceil(this.state.items.length / this.state.itemsByColonne) // calcule le nombre total de colonne
        for (let x = 0; x < max; x++) { // boucle pour créer organiser les div ul et li du footer 
            result =

                <div className='boxFooter' key={uuidv4()}>
                    <ul key={uuidv4()}>
                        {
                            this.state.items.slice(count, count + this.state.itemsByColonne) // extrait les element a placer dans le footer
                                .map(result =>
                                    <a className='itemLink' href={result[1]} key={uuidv4()}>
                                        <li className='footerItems' key={uuidv4()}>{result[0]}</li>
                                    </a>
                                ) // creer le(s) li par rapport au élément avec le lien
                        }
                    </ul>
                </div>
            all[x] = result // ajoute le resulta de la boucle dans l'objet 
            count = count + this.state.itemsByColonne

            if (x === (max - 1)) {
                this.setState({
                    elementFooter: all // place dans le state le footer mise en forme
                })
            }
        }
    }

    render() {
        const edit = (this.state.editStatus) ? <Editeur addColonne={this.addColonne} updateState={this.updateState} items={this.state.items} color={this.state.color} /> : null
        const items = (this.state.itemsStatus) ? <Items items={this.state.items} itemsByColonne={this.state.itemsByColonne} elementFooter={this.state.elementFooter} updateState={this.updateState} addColonne={this.addColonne} /> : null
        const color = (this.state.colorsStatus) ? <Couleur color={this.state.color} updateState={this.updateState} /> : null
        return (
            <Fragment>
                {edit}
                <div className='main' style={{ minHeight: this.state.heightMain - 15, paddingBottom: this.state.paddingfooter + 15 }}>

                    <div>
                        <h1>Footer</h1>
                        <h2>Structure du footer</h2>
                        <ul>
                            <li onClick={() => this.setState({ itemsStatus: !this.state.itemsStatus })}><LinkCustomer link='/items/'>Element et lien</LinkCustomer></li>
                            <li onClick={() => this.setState({ colorsStatus: !this.state.colorsStatus })}><LinkCustomer link='/color/'>Couleur</LinkCustomer></li>
                            <li>Réseau sociaux</li>
                            <li> <LinkCustomer link='/color/'>Copyright</LinkCustomer> </li>
                        </ul>
                        <div>
                            {items}
                            {color}
                        </div>

                    </div>
                    <Footer
                        items={this.state.items}
                        copyright={this.state.copyright}
                        itemsByColonne={this.state.itemsByColonne}
                        elementFooter={this.state.elementFooter}
                        facebook={this.state.facebook}
                        github={this.state.github}
                        instagram={this.state.instagram}
                        linkedin={this.state.linkedin}
                        pinterest={this.state.pinterest}
                        twitter={this.state.twitter}
                        facebookLink={this.state.facebookLink}
                        githubLink={this.state.githubLink}
                        instagramLink={this.state.instagramLink}
                        linkedinLink={this.state.linkedinLink}
                        pinterestLink={this.state.pinterestLink}
                        twitterLink={this.state.twitterLink}
                    />
                </div>
            </Fragment>
        )
    }
}
