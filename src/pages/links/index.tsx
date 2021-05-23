
import {
    site, formatDate, useServerEffect, fetchEntities
} from '@site';
import { useState } from 'react';
import TagList from '/components/tag_list';

export const title = 'links';
export const dst = '/links';
export const summary = 'various things that have caught my eye';


export default () => {

    const [data, setData] = useState([]);

    useServerEffect( async () => {
        let eids = await site.findByTags([ 'odgn-link' ] );

        const q = `
        [
            $eids
            /component/date#/date !ca desc order
            30 0 limit
            /component/title !bf
            @e
        ] select`;

        // run a query to select a max of 4 eids in date descending order
        let ents = await fetchEntities(q, {eids});

        let result = [];
        for( const e of ents ){
            let tags = await site.getTagsByEntityId(e.id);
            
            result.push( <LinkSummary
                key={`ln${e.id}`}
                title={e.Title?.title} 
                date={e.Date} 
                summary={e.Title?.summary}
                tags={tags}
                href={e.Url.url} /> );
        }
        
        setData( result );
    });

    return <article className="links">{data}</article>;
}


function LinkSummary({title, date, summary, href, tags}){
    return <article className="link-summary">
        <div>{formatDate(date, 'DayMonthYear')}</div>
        <a href={href}><h2>{title}</h2></a>
        <p>{summary}</p>
        <footer>
            <TagList tags={tags} excludeSlugs={['odgn-link']} />
        </footer>
    </article>
}

