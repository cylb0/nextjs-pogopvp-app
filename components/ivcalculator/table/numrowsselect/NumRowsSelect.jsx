import { useState } from 'react'
import style from './numrowsselect.module.css'

export default function NumRowsSelect({ numRows, handleNumRowsChange }) {

    const buttonValues = [10, 25, 50, 100]

    const handleChange = (value) => {
        handleNumRowsChange(value)
    }

    return (
        <div className={style.container}>
            <span className={style.top}>Top</span>
            <div className={style.buttons}>
                {
                    buttonValues.map((value) => (
                        <button 
                            className={`${style.button} ${numRows === value ? style.selected : ''}`}
                            onClick={() => handleChange(value)}>
                            {value}
                        </button>
                    ))
                }
            </div>
        </div>
    )
}