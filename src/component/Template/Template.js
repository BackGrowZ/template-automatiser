import React, { Component, Fragment } from 'react'
import { v4 as uuidv4 } from 'uuid'; // pour les keys
import './template.css'
import Footer from '../Footer/Footer';

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
            itemsAdd: '',
            linkAdd: '',
            items: [['Connexion', '#0'], ['Créer un compte', '#1'], ['Aperitifs', '#2'], ['Entrées', '#3'], ['Plats', '#4'], ['Desserts', '#5'], ['Ajouter une recette', '#6'], ['Chercher une recette', '#7'], ['Mon menu de la semaine', '#8'], ['Ma liste de course', '#9']], // listes des items avec les link
            color: [['Background','#A7C700'],['Element','black'],['Copyright','black'],['Separateur','black']]
        }
        this.handleInputChange = this.handleInputChange.bind(this)
        this.submitAddItems = this.submitAddItems.bind(this)
        this.removeitems = this.removeitems.bind(this)

    }

    componentDidMount() {
        this.addColonne() // lance le script de mise en page du footer
        this.paddingFooter()
    }

    handleInputChange(e) {
        const target = e.target;
        const value = target.value;
        const name = target.id;
        this.setState({ [name]: value });
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

    submitAddItems(e) {
        e.preventDefault();
        let item = this.state.itemsAdd
        let link = this.state.linkAdd
        if (link && item) {
            this.additems(item, link)
        } else console.log('nop');

    }

    removeitems(id) {
        let newListeItems = this.state.items.filter(result => result !== this.state.items[id])
        this.setState({
            items: newListeItems
        })
        setTimeout(() => this.addColonne(), 1)
    }

    additems(item, link) {
        let result = this.state.items
        let a = [item, link]
        result = [...result, a]
        this.setState({
            items: result,
            itemsAdd: '',
            linkAdd: '',
        })
        setTimeout(() => this.addColonne(), 1)
    }

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

        /* ===== Items et link ===== */

        /* Genere le contenu du tableau items */
        const tabItems = this.state.items.map(result => (this.state.items.indexOf(result) % 2) ?
            <tr key={this.state.items.indexOf(result)} style={{ backgroundColor: '#9e9e9e' }}>
                <th key={`id` + this.state.items.indexOf(result)} scope="row">{this.state.items.indexOf(result)}</th>
                <td key={`nom` + this.state.items.indexOf(result)}>{result[0]}</td>
                <td key={`lien` + this.state.items.indexOf(result)}>{result[1]}</td>
                <td key={`button` + this.state.items.indexOf(result)}><i style={{ color: 'red', cursor: 'pointer' }} className="fas fa-times" onClick={() => console.log(this.state.items.indexOf(result))} /></td>
            </tr>
            :
            <tr key={this.state.items.indexOf(result)}>
                <th key={`id` + this.state.items.indexOf(result)} scope="row">{this.state.items.indexOf(result)}</th>
                <td key={`nom` + this.state.items.indexOf(result)}>{result[0]}</td>
                <td key={`lien` + this.state.items.indexOf(result)}>{result[1]}</td>
                <td key={`button` + this.state.items.indexOf(result)}><i style={{ color: 'red', cursor: 'pointer' }} className="fas fa-times" onClick={() => console.log(this.state.items.indexOf(result))} /></td>
            </tr>
        )

        /* Derniere ligne du tableau / Ajout Items */
        const addItemsValue = (this.state.items.length % 2) ?
            <tr style={{ backgroundColor: '#9e9e9e' }}>
                <th scope="row">{this.state.items.length}</th>
                <td ><input id='itemsAdd' placeholder="nom de l'élement" onChange={this.handleInputChange} value={this.state.itemsAdd} /></td>
                <td ><input id='linkAdd' placeholder="lien de l'élement" onChange={this.handleInputChange} value={this.state.linkAdd} /></td>
                <td ><i style={{ color: 'green', cursor: 'pointer' }} className="fas fa-check" onClick={this.submitAddItems} /></td>
            </tr>
            :
            <tr>
                <th scope="row">{this.state.items.length}</th>
                <td ><input id='itemsAdd' placeholder="nom de l'élement" onChange={this.handleInputChange} value={this.state.itemsAdd} /></td>
                <td ><input id='linkAdd' placeholder="lien de l'élement" onChange={this.handleInputChange} value={this.state.linkAdd} /></td>
                <td ><i style={{ color: 'green', cursor: 'pointer' }} className="fas fa-check" onClick={this.submitAddItems} /></td>
            </tr>

        /* tableau items et link au complet */
        const tabAllItems = (this.state.itemsStatus) ?
            <Fragment>
                <h3>Element présent dans le footer</h3>
                <table className="table">
                    <thead>
                        <tr style={{ backgroundColor: '#464747', color: 'white' }}>
                            <th scope="col">ID</th>
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
            : null


        /* ===== Items et link ===== */





        const all =
            <div>
                {tabAllItems}
            </div>



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
                    <div>{all}</div>

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
