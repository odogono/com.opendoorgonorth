
import {
    site,
    formatDate, useServerEffect, resolveUrl, 
    fetchEntities, processEntities, runQuery,
} from '@site';
import TagList from '/components/tag_list';

import { useState } from 'react';


export const title = 'Writing';
export const dst = '/writing';
export const summary = 'blog entries';


export default () => {

    const [data, setData] = useState([]);

    useServerEffect( async () => {
        let eids = await site.findByTags([ 'odgn-blog' ], {mode:'OR'} );

        const q = `
        [
            $eids
            /component/date#/date !ca desc order
            20 0 limit
            [ /component/title /component/date ] !bf
            @e
        ] select`;

        let ents = await fetchEntities(q, {eids});
        
        let result = [];
        for( const e of ents ){
            let url = resolveUrl(e);
            
            // printEntity(es, e);
            let tags = await site.getTagsByEntityId( e.id );
            // let tagDetails = tags.map( tag => ({title:tag.Title?.title}) );

            result.push( <BlogSummary
                key={`blog-${e.id}`}
                title={e.Title?.title} 
                date={e.Date} 
                summary={e.Title?.summary}
                tags={tags}
                href={url} /> );
        }
        
        setData( result );
    });

    return <article className="writing">{data}</article>;
}


function BlogSummary({title, date, summary, tags, href}){

    return <article className="blog-summary">
        <header>
        <a href={href}><h2>{title}</h2></a>
        <div>{formatDate(date, 1)}</div>
        </header>
        <main>{summary}</main>
        <TagList tags={tags} excludeSlugs={['odgn-blog']} />
    </article>
}


