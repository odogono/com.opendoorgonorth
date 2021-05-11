import { formatDate } from '@site';


export default function Heading({ e }) {

    return <div className="heading">
        <h1>{e?.Title?.title}</h1>
        <div className="date">{formatDate(e.Date ?? e.DateRange)}</div>
    </div>
}