import {
    es, site, log, formatDate, useServerEffect, resolveUrl, fetchEntities, processEntities, runQuery
} from '@site';
import { EntityId } from '@ecset';

import TagList from '/components/tag_list';


export interface LinkArticleProps {
    eid: EntityId;
    title?: string;
    date?: string;
    summary?: string;
    href?: string;
    tags?: any[];
}

export default function LinkArticle({ eid, title, date, summary, href, tags }:LinkArticleProps) {
    return <article data-eid={eid} className="link-summary">
        <header>
            <div>{formatDate(date, 'DayMonthYear')}</div>
            <a href={href}><h2>{title}</h2></a>
        </header>
        <p>{summary}</p>
        <footer>
            <TagList tags={tags} excludeSlugs={['odgn-link']} />
        </footer>
    </article>
}