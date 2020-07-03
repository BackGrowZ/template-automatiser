import React, { Component } from 'react'
import { v4 as uuidv4 } from 'uuid'; // pour les keys
import './template.css'
import Footer from '../Footer/Footer';
import Items from '../Items/Items';

export default class Template extends Component {
    constructor(props) {
        super(props)
        this.state = {
            status: false,
            itemsStatus: true, // tableau Items footer
            colorsStatus: false, // tableau couleurs footer
            paddingfooter: null,

            /* element necessaire au fonctionnement du footer */
            itemsByColonne: 2, // nombre d'item par colonne
            elementFooter: {},
            facebook: true,
            github: true,
            instagram: false,
            linkedin: true,
            pinterest: false,
            twitter: false,
            facebookLink: 'https://www.facebook.com/anthony.carreta/',
            githubLink: 'https://github.com/BackGrowZ/',
            instagramLink: 'https://www.instagram.com/',
            linkedinLink: 'https://www.linkedin.com/in/anthony-carreta/',
            pinterestLink: 'https://www.pinterest.fr/',
            twitterLink: 'https://twitter.com/?lang=fr/',
            copyright: 'Green Food by Anthony Carreta', // message du copyright
            items: [['Connexion', '#0'], ['Créer un compte', '#1'], ['Aperitifs', '#2'], ['Entrées', '#3'], ['Plats', '#4'], ['Desserts', '#5'], ['Ajouter une recette', '#6'], ['Chercher une recette', '#7'], ['Mon menu de la semaine', '#8'], ['Ma liste de course', '#9']], // listes des items avec les link
            color: [['Background', '#A7C700'], ['Element', 'black'], ['Copyright', 'black'], ['Separateur', 'black']]
        }
        this.updateState = this.updateState.bind(this)
        this.addColonne = this.addColonne.bind(this)

    }

    componentDidMount() {
        this.addColonne() // lance le script de mise en page du footer
        this.paddingFooter()
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

    updateState(name, value) { this.setState({ [name]: value }) }

    paddingFooter() {
        if (document.getElementById('allColonne').offsetHeight) { // permet de savoir quand il a finit de load le footer
            let padding = document.getElementById('footer').offsetHeight // hauteur du foooter
            this.setState({
                paddingfooter: padding + 50
            })
        } else {
            setTimeout(() => this.paddingFooter(), 100)
        }
    }

    render() {

        return (
            <div className='main' style={{ paddingBottom: this.state.paddingfooter }}>

                <div style={{ backgroundColor: 'white' }}>
                    <h1>Footer</h1>
                    <h2>Structure du footer</h2>
                    <ul>
                        <li>Element et lien</li>
                        <li>Couleur</li>
                        <li>Réseau sociaux</li>
                        <li>Copyright</li>
                    </ul><br />
                    <div>
                        <Items
                            items={this.state.items}
                            itemsByColonne={this.state.itemsByColonne}
                            elementFooter={this.state.elementFooter}
                            updateState={this.updateState}
                            addColonne={this.addColonne}
                        />
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
        )
    }
}
