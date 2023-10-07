import style from './levelfloor.module.css'

export default function LevelFloor({ levelFloor, handleLevelChange }) {

    const handleChange = (event) => {
        const value = event.target.value
        handleLevelChange(value)
    }

    return (
        <div className={style.container}>
            <h5 className={style.floor}>Level floor: {levelFloor}</h5>
            <input
                className={style.input} 
                type="range" 
                min="1" 
                max="51" 
                value={levelFloor} 
                onChange={handleChange} />
        </div>
    )
}