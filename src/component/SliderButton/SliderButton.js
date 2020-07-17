import React from 'react'
import './sliderbutton.css'
/* 
Exemple de fonction pour props.function :
    const switchHandle = (name, value) => (  this.setState({ [name]: value }) )
*/

function updater(props) {
    const { name, etat, id } = props
    props.function(name, !etat, id)
}

export default function SliderButton(props) {
    const { etat } = props

    const switchButton =
        (etat) ?
            < label className="switch" >
                <input type="checkbox" defaultChecked onClick={() => updater(props)} />
                <span className="slider round"></span>
            </label >
            :
            <label className="switch">
                <input type="checkbox" onClick={() => updater(props)} />
                <span className="slider round"></span>
            </label>


    return switchButton
}