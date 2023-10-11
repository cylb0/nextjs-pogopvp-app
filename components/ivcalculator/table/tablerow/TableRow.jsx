import style from './tablerow.module.css'

export default function TableRow({ data, backgroundColorClass }) {
    return (
        <tr className={`${style.tr} ${data.selected ? style.selected : ''} ${style[backgroundColorClass]}`}>
            <td>{ data.rank }</td>
            <td>{ data.ivs }</td>
            <td>{ data.level }</td>
            <td>{ data.cp }</td>
            <td>{ data.atk }</td>
            <td>{ data.def }</td>
            <td>{ data.sta }</td>
            <td className={style.desktopOnly}>{ data.prod }</td>
        </tr>
    )
}