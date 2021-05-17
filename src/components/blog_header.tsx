import { formatDate, resolveUrl } from '@site';
import { Entity } from '@ecset';

export interface BlogHeadingProps {
    e: Entity;
}

export default function Heading({ e }: BlogHeadingProps) {
    let date = e.Date ?? e.DateRange;
    let url = resolveUrl( e.id );

    return <header>
        <a href={url}><time dateTime={formatDate(date, 'Date')}>{formatDate(date,'DayMonthYear')}</time></a>
        <a href={url}><h1>{e?.Title?.title}</h1></a>
    </header>
}