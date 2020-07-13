import React from 'react'
import { config } from '../SliderButton/Variable';

function updater(props) {
    const { name } = props
    const { etat } = props
    let value = config['menu']['switchButton'][name]
    value = !etat
    props.function(name, value)
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