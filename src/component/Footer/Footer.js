import React, { Component, Fragment } from 'react'
import './footer.css'
import { logoFB2, logoGithub1, logoInsta, logoLinkedin, LogoPinterest2, logoTwitter1 } from '../img'
// import { logoFB1, logoFB2, logoFB3, logoGithub1, logoGithub2, logoInsta, logoLinkedin, LogoPinterest1, LogoPinterest2, LogoPinterest3, logoTwitter1, logoTwitter2, logoTwitter3 } from '../img'

/* ===== RESEAU ====
    === STRUCTURE ===
    1) Name
    2) State
    3) Link

    === ORDER ===
    0) Facebook
    1) GitHub
    2) Instagram
    3) Linkedin
    4) Pinterest
    5) Twitter

    === EXEMPLE ===
    reseau[0][0] = Facebook
    reseau[3][1] = true/false
    reseau[5][2] = Link twitter
*/

export default class Footer extends Component {
    render() {
        const status = this.props
        const reseau = this.props.reseau
        const elementFooter = Object.values(status.elementFooter) // le footer mise en forme

        const copyright = (status.copyright) ?
            <li className="copyright">
                <i>
                    <a className='copyrightLink' target="_blank" rel="noopener noreferrer" style={{color:this.props.color[2][1]}} href={status.copyright[1]}>
                        {status.copyright[0]}
                    </a>
                </i>
            </li> : null // affiche le copyright si il est pas null

        const facebook = (reseau[0][1]) ?
            <a className='socialLink' target="_blank" rel="noopener noreferrer" href={reseau[0][2]}>
                <img className='logoSocial' src={logoFB2} alt='Logo Facebook' />
            </a> : null

        const github = (reseau[1][1]) ?
            <a className='socialLink' target="_blank" rel="noopener noreferrer" href={reseau[1][2]}>
                <img className='logoSocial' src={logoGithub1} alt='Logo GitHub' />
            </a> : null

        const instagram = (reseau[2][1]) ?
            <a className='socialLink' target="_blank" rel="noopener noreferrer" href={reseau[2][2]}>
                <img className='logoSocial' src={logoInsta} alt='Logo Instagram' />
            </a> : null

        const linkedin = (reseau[3][1]) ?
            <a className='socialLink' target="_blank" rel="noopener noreferrer" href={reseau[3][2]}>
                <img className='logoSocial' src={logoLinkedin} alt='Logo Linkedin' />
            </a> : null

        const pinterest = (reseau[4][1]) ?
            <a className='socialLink' target="_blank" rel="noopener noreferrer" href={reseau[4][2]}>
                <img className='logoSocial' src={LogoPinterest2} alt='Logo Pinterest' />
            </a> : null

        const twitter = (reseau[5][1]) ?
            <a className='socialLink' target="_blank" rel="noopener noreferrer" href={reseau[5][2]}>
                <img className='logoSocial' src={logoTwitter1} alt='Logo Twitter' />
            </a> : null

        const social = <div className='contenantSocial'>{facebook}{twitter}{instagram}{linkedin}{github}{pinterest}</div>

        const footer =
            <div className='footer' style={{backgroundColor:this.props.color[0][1]}}>
                <div className="allColonne" id='allColonne'>
                    {elementFooter}
                </div>
                <hr className='footerHR' style={{borderColor:this.props.color[3][1]}} />
                {social}
                {copyright}
            </div>


        return (
            <Fragment>
                <footer id='footer' hidden={this.props.hidden}> {footer} </footer>
            </Fragment>
        )
    }
}
