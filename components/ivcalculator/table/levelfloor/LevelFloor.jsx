import style from './levelfloor.module.css'

export default function LevelFloor({ levelFloor, handleLevelChange }) {

    const floors = {
        "1": "Wild caught",
        "15": "Research reward",
        "20": "Raid / Hatch",
        "25": "Purified"

    }

    const handleChange = (event) => {
        const value = event.target.value
        handleLevelChange(value)
    }

    return (
        <div className={style.container}>
            <span className={style.floor}>Level floor {levelFloor}</span>
            {
                <select 
                    className={style.select} 
                    onChange={handleChange}>
                    {
                        Object.keys(floors).map((floor) => (
                            <option 
                                key={floor}
                                value={floor}>
                                {`${floor} - ${floors[floor]}`}
                            </option>
                        ))
                    }
                </select>   
            }
        </div>
    )
}