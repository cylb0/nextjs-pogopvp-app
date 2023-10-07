import style from './table.module.css'

export default function Table() {
    return (
        <>
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

                </tbody>
            </table>
        </>
    )
}