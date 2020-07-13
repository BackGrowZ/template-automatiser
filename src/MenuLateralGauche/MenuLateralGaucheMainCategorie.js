import React, { Fragment } from 'react'

function click(props) {
    const { functionClic } = props
    const { nameState } = props
    const { state } = props
    functionClic(nameState, !state)
}

export default function MenuLateralGaucheCategorie(props) {
    const { title } = props
    const { state } = props
    const { children } = props

    const iconClass = (state) ? 'fas fa-angle-up' : 'fas fa-angle-down'

    const icon =
        <i
            style={{ color: '#fff', cursor: 'pointer' }}
            onClick={() => click(props)}
            className={iconClass}
        />
    const showShildren = (state) ? <div className='TitleComponent'> {children} </div> : null
    return (
        <Fragment>
            <h2> {title} {icon} </h2>
            {showShildren}
        </Fragment>
    )
}
