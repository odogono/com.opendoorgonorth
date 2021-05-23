import { useState } from 'react';
import { site, formatDate, resolveUrl, useServerEffect } from '@site';
import { Entity } from '@ecset';
import TagList from '/components/tag_list';


export interface BlogHeaderProps {
    e: Entity;
}

export default function BlogHeader({ e }: BlogHeaderProps) {
    let date = e.Date ?? e.DateRange;
    let url = resolveUrl(e.id);
    let client = e.Meta?.meta?.client;
    let company = e.Meta?.meta?.company;

    const [tags, setTags] = useState([]);

    useServerEffect(async () => {
        let ents = await site.getTagsByEntityId(e.id);
        setTags(ents);
    });

    return <header>
        <a href={url}>
            <h1>{e?.Title?.title}</h1>
        </a>
        {client && <div><strong>Client:</strong> {client}</div>}
        {company && <div><strong>Company:</strong> {company}</div>}
        <div>
            <strong>Dates:</strong> 
            <time dateTime={formatDate(date, 'Date')}>{formatDate(date)}</time>
        </div>
        <div>
            <strong>Technologies:</strong> 
            <TagList tags={tags} excludeSlugs={['odgn-project']} />
        </div>
    </header>
}