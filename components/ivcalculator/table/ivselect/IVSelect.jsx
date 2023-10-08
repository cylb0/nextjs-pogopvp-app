import style from './ivselect.module.css'

export default function IVSelect({ attackIv, defenseIv, staminaIv, handleIvChange }) {

    const handleChange = (event) => {
        const { id, value } = event.target
        switch (id) {
            case 'attackIv':
                handleIvChange('attackIv', value)
                break
            case 'defenseIv':
                handleIvChange('defenseIv', value)
                break
            case 'staminaIv':
                handleIvChange('staminaIv', value)
                break
            default: 
                break
        }
    }

    return (
        <div className={style.container}>
            <span className={style.title}>Search Individual Values</span>
            <div className={style.iv}>
                <label htmlFor="attackIv">Attack</label>
                <input
                    className={style.input}
                    id="attackIv"
                    type="number"
                    min="0"
                    max="15"
                    value={attackIv} 
                    onChange={handleChange}/>
            </div>
            <div className={style.iv}>
                <label htmlFor="defenseIv">Defense</label>
                <input
                    className={style.input}
                    id="defenseIv"
                    type="number"
                    min="0"
                    max="15"
                    value={defenseIv} 
                    onChange={handleChange}/>
            </div>
            <div className={style.iv}>
                <label htmlFor="staminaIv">Stamina</label>
                <input
                    className={style.input}
                    id="staminaIv"
                    type="number"
                    min="0"
                    max="15"
                    value={staminaIv} 
                    onChange={handleChange}/>
            </div>
        </div>
    )
}