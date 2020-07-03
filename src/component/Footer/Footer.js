import React, { Component, Fragment } from 'react'
import './footer.css'
import { logoFB2, logoGithub1, logoInsta, logoLinkedin, LogoPinterest2, logoTwitter1 } from '../img'
// import { logoFB1, logoFB2, logoFB3, logoGithub1, logoGithub2, logoInsta, logoLinkedin, LogoPinterest1, LogoPinterest2, LogoPinterest3, logoTwitter1, logoTwitter2, logoTwitter3 } from '../img'

export default class Footer extends Component {

    render() {
        const elementFooter = Object.values(this.props.elementFooter) // le footer mise en forme
        const copyright = (this.props.copyright) ? <li className="copyright"><i>{this.props.copyright}</i></li> : null // affiche le copyright si il est pas null

        const facebook = (this.props.facebook) ? <a href={this.props.facebookLink}><img className='logoSocial' src={logoFB2} alt='Logo Facebook' /></a> : null
        const twitter = (this.props.twitter) ? <a href={this.props.twitterLink}><img className='logoSocial' src={logoTwitter1} alt='Logo Twitter' /></a> : null
        const instagram = (this.props.instagram) ? <a href={this.props.instagramLink}><img className='logoSocial' src={logoInsta} alt='Logo Instagram' /></a> : null
        const linkedin = (this.props.linkedin) ? <a href={this.props.linkedinLink}><img className='logoSocial' src={logoLinkedin} alt='Logo Linkedin' /></a> : null
        const github = (this.props.github) ? <a href={this.props.githubLink}><img className='logoSocial' src={logoGithub1} alt='Logo GitHub' /></a> : null
        const pinterest = (this.props.pinterest) ? <a href={this.props.pinterestLink}><img className='logoSocial' src={LogoPinterest2} alt='Logo Pinterest' /></a> : null

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