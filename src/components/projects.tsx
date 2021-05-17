import {
    site, log, formatDate, useServerEffect, resolveUrl, processEntities, runQuery
} from '@site';
import { useState } from 'react';


export default () => {

    const [data, setData] = useState([]);

    

    useServerEffect( async () => {
        // select eids which are tagged project
        let eids = await site.findByTags([ 'project'] );
        const q = `
        [
            $eids
            /component/date_range#/date_end !ca desc order
            20 0 limit
            [/component/mdx] !bf
            @eid
        ] select`;

        // run a query to select a max of 4 eids in date descending order
        eids = await runQuery(q, {eids});

        // process the eids and capture their output
        const dids = ['/component/output', '/component/title', '/component/date_range' ];
        const ents = await processEntities( eids, dids, {applyLayout:false} );

        let result = [];
        for( const e of ents ){
            
            result.push( <ProjectSummary
                key={`ps${e.id}`}
                title={e.Title?.title} 
                date={e.DateRange} 
                summary={e.Title?.summary}
                href={resolveUrl(e.id)} /> );
        }
        
        setData( result );
    });

    return <div className="projects">{data}</div>;
}


function ProjectSummary({title, date, summary, href}){
    return <div className="project">
        <h2>{title}</h2>
        <p>{summary}</p>
        <div>{formatDate(date)}</div>
        <a href={href}><span className="link"></span></a>
    </div>
}
