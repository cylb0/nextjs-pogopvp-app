import { useState } from 'react'
import style from './table.module.css'
import TableRow from './tablerow/TableRow'
import * as PokemonStats from '../../../services/pokemonStats'
import NumRowsSelect from './numrowsselect/NumRowsSelect'

export default function Table({ attack, defense, stamina, maxCp }) {

    const [numRows, setNumRows] = useState(10)

    const handleNumRowsChange = (value) => {
        setNumRows(value)
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
            }
        }
    }

    tableRows.sort((a, b) => b.prod - a.prod)
    tableRows.forEach((row, index) => {
        row.rank = index + 1
    })

    return (
        <>
            <NumRowsSelect numRows={numRows} handleNumRowsChange={handleNumRowsChange} />
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
                        <th>Prod</th>
                    </tr>
                </thead>
                <tbody>
                    { tableRows.slice(0, numRows).map((row) => (
                        <TableRow key={row.ivs} data={row} />
                    )) }
                </tbody>
            </table>
        </>
    )
}