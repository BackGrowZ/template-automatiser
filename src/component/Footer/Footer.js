import React, { Component, Fragment } from 'react'
import './footer.css'
import { logoFB2, logoGithub1, logoInsta, logoLinkedin, LogoPinterest2, logoTwitter1 } from '../img'
// import { logoFB1, logoFB2, logoFB3, logoGithub1, logoGithub2, logoInsta, logoLinkedin, LogoPinterest1, LogoPinterest2, LogoPinterest3, logoTwitter1, logoTwitter2, logoTwitter3 } from '../img'

export default class Footer extends Component {

    render() {
        const status = this.props
        const elementFooter = Object.values(status.elementFooter) // le footer mise en forme
        const copyright = (status.copyright) ? <li className="copyright"><i>{status.copyright}</i></li> : null // affiche le copyright si il est pas null

        const facebook = (status.facebook[0]) ? <a href={status.facebook[1]}><img className='logoSocial' src={logoFB2} alt='Logo Facebook' /></a> : null
        const twitter = (status.twitter[0]) ? <a href={status.twitter[1]}><img className='logoSocial' src={logoTwitter1} alt='Logo Twitter' /></a> : null
        const instagram = (status.instagram[0]) ? <a href={status.instagram[1]}><img className='logoSocial' src={logoInsta} alt='Logo Instagram' /></a> : null
        const linkedin = (status.linkedin[0]) ? <a href={status.linkedin[1]}><img className='logoSocial' src={logoLinkedin} alt='Logo Linkedin' /></a> : null
        const github = (status.github[0]) ? <a href={status.github[1]}><img className='logoSocial' src={logoGithub1} alt='Logo GitHub' /></a> : null
        const pinterest = (status.pinterest[0]) ? <a href={status.pinterest[1]}><img className='logoSocial' src={LogoPinterest2} alt='Logo Pinterest' /></a> : null

        const social = <div className='contenantSocial'>{facebook}{twitter}{instagram}{linkedin}{github}{pinterest}</div>

        const footer =
            <div className='footer'>
                <div className="allColonne" id='allColonne'>
                    {elementFooter}
                </div>
                <hr className='footerHR' />
                {social}
                {copyright}
            </div>


        return (
            <Fragment>
                <footer id='footer'>{footer}</footer>
            </Fragment>)
    }
}
