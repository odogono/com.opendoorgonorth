
import {
    site, log, formatDate, useServerEffect, resolveUrl, fetchEntities, runQuery
} from '@site';
import { useState } from 'react';


export const title = 'links';
export const dst = '/links';
export const summary = 'various things that have caught my eye';


export default () => {

    const [data, setData] = useState([]);

    useServerEffect( async () => {
        let eids = await site.findByTags([ 'odgn-links' ] );

        const q = `
        [
            $eids
            /component/date#/date !ca desc order
            10 0 limit
            /component/title !bf
            @e
        ] select`;

        // run a query to select a max of 4 eids in date descending order
        let ents = await fetchEntities(q, {eids});

        // log('links', eids, ents );

        let result = [];
        for( const e of ents ){
            if( e === undefined || e.Title === undefined ){
                log('e no title', e );
            }
            
            result.push( <LinkSummary
                key={`ln${e.id}`}
                title={e.Title?.title} 
                date={e.Date} 
                summary={e.Title?.summary}
                href={e.Url.url} /> );
        }
        
        setData( result );
    });

    return <article className="links">{data}</article>;
}


function LinkSummary({title, date, summary, href}){
    return <article className="link-article">
        <a href={href}><h2>{title}</h2></a>
        <p>{summary}</p>
        <div>{formatDate(date, 1)}</div>
        <a href={href}><span className="link"></span></a>
    </article>
}

