import React from 'react'

const Square = props => {

    const style = {}

    style.width = props.level === 1? '33%':props.level === 2? '25%':'20%'
    style.height = props.level === 1? '33%':props.level === 2? '25%':'20%'
    if(!props.value) {
        style.background = '#a1a1a1'
        style.border = '1px solid'
    }

    return (
        <button 
            className="square"
            style={style}
            onClick={() => props.onClick()}
            >
            {props.value}
        </button>
    )
}

export default Square