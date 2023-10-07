import Link from 'next/link'
import Image from 'next/image'
import style from './leagueSelect.module.css'

export default function LeagueSelect({ handleLeagueSelect, maxCp }) {

    const leagues = {
        "Great league": {
            "max_cp": 1500,
            "icon_url": "/images/great.png"
        },
        "Ultra league": {
            "max_cp": 2500,
            "icon_url": "/images/ultra.png"
        },
        "Master league": {
            "max_cp": 9999,
            "icon_url": "/images/master.png"
        }
    }
    return (
        <div className={style.container}>
            {
                Object.keys(leagues).map((league) => (
                    <button
                        className={`${style.button} ${leagues[league].max_cp === maxCp ? style.selected : ''}`}
                        key={league}
                        onClick={() => {
                            handleLeagueSelect(leagues[league].max_cp)}}>
                        <Image
                            src={leagues[league].icon_url}
                            width={25}
                            height={25}
                            alt={`${league} icon`}
                            />
                        <span>{league}</span>
                    </button>
                ))
            }
        </div>
    )
}