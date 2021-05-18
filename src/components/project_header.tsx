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

    const [tags, setTags] = useState([]);

    useServerEffect(async () => {
        let ents = await site.getTagsByEntityId(e.id);
        setTags(ents);
    });

    return <header>
        <a href={url}>
            <h1>{e?.Title?.title}</h1>
        </a>
        <time dateTime={formatDate(date, 'Date')}>{formatDate(date)}</time>
        <TagList tags={tags} excludeSlugs={['odgn-project']} />
    </header>
}