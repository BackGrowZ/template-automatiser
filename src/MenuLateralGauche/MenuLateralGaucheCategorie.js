import React, { Fragment } from 'react'

function click(props) {
    const { functionClic, nameState, state } = props
    functionClic(nameState, !state)
}

export default function MenuLateralGaucheCategorie(props) {
    const { title, children, state, parentState } = props

    const iconClass = (state) ? 'fas fa-angle-up' : 'fas fa-angle-down'

    const icon =
        <i
            style={{ color: '#fff', cursor: 'pointer' }}
            onClick={() => click(props)}
            className={iconClass}
        />
    const menu = (state) ? <div className='TitleComponent'>{children}</div> : null

    const categorie =
        (parentState) ?
            <Fragment> <h2> {title} {icon} </h2> {menu} </Fragment>
            :
            null
    return categorie
}
