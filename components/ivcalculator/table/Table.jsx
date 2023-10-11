import { useEffect, useState } from 'react'
import style from './table.module.css'
import TableRow from './tablerow/TableRow'
import * as PokemonStats from '../../../services/pokemonStats'
import NumRowsSelect from './numrowsselect/NumRowsSelect'
import LevelFloor from './levelfloor/LevelFloor'
import IVSelect from './ivselect/IVSelect'

export default function Table({ attack, defense, stamina, maxCp }) {

    const [numRows, setNumRows] = useState(10)
    const [levelFloor, setLevelFloor] = useState(1)
    const [attackIv, setAttackIv] = useState('')
    const [defenseIv, setDefenseIv] = useState(15)
    const [staminaIv, setStaminaIv] = useState(15)

    const handleNumRowsChange = (value) => {
        setNumRows(value)
    }

    const handleLevelChange = (value) => {
        setLevelFloor(value)
    }

    const handleIvChange = (prop, value) => {
        switch (prop) {
            case 'attackIv':
                setAttackIv(value)
                break
            case 'defenseIv':
                setDefenseIv(value)
                break
            case 'staminaIv':
                setStaminaIv(value)
                break
            default:
                break
        }
    }

    const tableRows = []

    for (let attack_iv = 0; attack_iv <= 15; attack_iv ++) {
        for (let defense_iv = 0; defense_iv <= 15; defense_iv ++) {
            for (let stamina_iv = 0; stamina_iv <= 15; stamina_iv ++) {

                const attack_stat = attack + attack_iv
                const defense_stat = defense + defense_iv
                const stamina_stat = stamina + stamina_iv

                const key = `${attack_iv}/${defense_iv}/${stamina_iv}`
                const level = PokemonStats.calculateMaxLevel(attack_stat, defense_stat, stamina_stat, maxCp)
                if (level >= levelFloor) {
                    const cp = PokemonStats.calculateCP(attack_stat, defense_stat, stamina_stat, level)
                    const atk = PokemonStats.calculateAtk(attack_stat, level)
                    const def = PokemonStats.calculateDef(defense_stat, level)
                    const sta = Math.floor(PokemonStats.calculateSta(stamina_stat, level))
                    const prod = PokemonStats.calculateStatsProduct(atk, def, sta)

                    const data = {
                        key: key,
                        rank: '',
                        ivs: key,
                        level: level,
                        cp: cp,
                        atk: atk.toFixed(2),
                        def: def.toFixed(2),
                        sta: sta.toFixed(0),
                        prod: Math.round(prod)
                    }
                    tableRows.push(data)
                } else {
                    break
                }
            }
        }
    }

    tableRows.sort((a, b) => b.prod - a.prod)
    tableRows.forEach((row, index) => {
        row.rank = index + 1
    })

    return (
        <>
            <NumRowsSelect 
                numRows={numRows} 
                maxRows={tableRows.length} 
                handleNumRowsChange={handleNumRowsChange} />
            <LevelFloor 
                levelFloor={levelFloor} 
                handleLevelChange={handleLevelChange} />
            <IVSelect 
                attackIv={attackIv}
                defenseIv={defenseIv}
                staminaIv={staminaIv}
                handleIvChange={handleIvChange} />
            <table className={style.table}>
                <thead className={style.thead}>
                    <tr>
                        <th>Rank</th>
                        <th>IVS</th>
                        <th>Level</th>
                        <th>CP</th>
                        <th>ATK</th>
                        <th>DEF</th>
                        <th>STA</th>
                        <th className={style.desktopOnly}>Prod</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        attackIv && defenseIv && staminaIv ? (
                            tableRows.map((row) => {
                                const [aIv, dIv, sIv] = row.ivs.split('/')
                                if (attackIv == aIv && defenseIv == dIv && staminaIv == sIv) {
                                    return (
                                        <TableRow key={'selected'} data={{...row, selected: true}} />
                                    )
                                }
                                return null
                            })
                         ) : null
                    }
                    { 
                        tableRows.length ? 
                        tableRows.slice(0, numRows).map((row) => (
                            <TableRow key={row.ivs} data={row} />
                        )) : 
                        <tr>
                            <td colSpan={8} style={{ textAlign:'center' }}>No results</td>
                        </tr>
                    }
                </tbody>
            </table>
        </>
    )
}