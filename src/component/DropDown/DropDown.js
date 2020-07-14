import React, { Fragment } from 'react'
import './dropdown.css'

function myFunction(props) {
    const { id } = props
    document.getElementsByClassName(`myDropdown-${id}`)[0].classList.toggle("show");
}

window.onclick = function (event) {
    if (!event.target.matches('.dropbtn')) {
        const dropdowns = document.getElementsByClassName("dropdown-content");
        for (let i = 0; i < dropdowns.length; i++) {
            let openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

function updater(props, key) {
    const { updateState, element, id } = props
    if (element[key][1] !== 'editStatus') {
        updateState(element[key][1], null, id)
    } else {
        updateState(element[key][1], true)
    }
}

export default function DropDown(props) {
    const { id, max, element } = props

    const dropDownItemStructure = (value, key) => <p key={key} onClick={() => updater(props, key)} className='ElementDropdown'>{value[0]}</p>

    const dropDownItem = element.map((value, key) =>
        (value[1] === 'editStatus') ? dropDownItemStructure(value, key) :
            (value[1] !== 'itemsUp' && value[1] !== 'itemsDown') ? dropDownItemStructure(value, key) :
                (id !== 0 && id !== max) ? dropDownItemStructure(value, key) :
                    (value[1] === 'itemsUp' && id !== 0) ? dropDownItemStructure(value, key) :
                        (value[1] === 'itemsDown' && id !== max) ? dropDownItemStructure(value, key) : null
    )

    const button =
        <Fragment>
            <i onClick={() => myFunction(props)} className="fas fa-caret-down dropdown dropbtn" />
            <div id='myDropdown' className={`dropdown-content myDropdown-${id}`}>
                {dropDownItem}
            </div>
        </Fragment>
    return button
}
