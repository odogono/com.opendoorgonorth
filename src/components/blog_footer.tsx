import { useState } from 'react';
import {
    es, 
    site, log, 
    formatDate, useServerEffect, resolveUrl, 
    fetchEntities, processEntities, runQuery,
} from '@site';
import { Entity } from '@ecset';
import TagList from '/components/tag_list';

export interface BlogFooterProps {
    e: Entity;
}


export default function BlogFooter({e}:BlogFooterProps){
    const [tags, setTags] = useState([]);
    
    useServerEffect( async () => {
        let ents = await site.getTagsByEntityId(e.id);
        setTags(ents);
    });

    return <footer>
        <TagList tags={tags} excludeSlugs={['odgn-blog']} />
    </footer>
}