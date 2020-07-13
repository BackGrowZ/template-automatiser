import React from 'react'

function click(props) {
    const { functionClic, show, nameState } = props
    functionClic(nameState, !show)
}

export default function MenuLateralGauche(props) {
    const { show } = props
    const position = (show) ? "0" : "-340px"
    const icon = (show) ? 'fas fa-angle-left' : 'fas fa-angle-right'

    return (
        <div className='MenuElement' style={{ left: position }}>
            <div className='buttonShowMenu' onClick={() => click(props)}>
                <i style={{ color: '#fff', zoom: '2', paddingTop: '40%' }} className={icon} />
            </div>
            {props.children}
        </div>
    )
}
