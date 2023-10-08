import style from './tablerow.module.css'

export default function TableRow({ data }) {
    return (
        <tr className={`${style.tr} ${data.selected ? style.selected : ''}`}>
            <td>{ data.rank }</td>
            <td>{ data.ivs }</td>
            <td>{ data.level }</td>
            <td>{ data.cp }</td>
            <td>{ data.atk }</td>
            <td>{ data.def }</td>
            <td>{ data.sta }</td>
            <td>{ data.prod }</td>
        </tr>
    )
}