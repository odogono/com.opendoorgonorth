import {
    site, log, formatDate, useServerEffect, resolveUrl, processEntities, runQuery
} from '@site';
import { useState } from 'react';
import TagList from '/components/tag_list';

export default () => {

    const [data, setData] = useState([]);

    

    useServerEffect( async () => {
        // select eids which are tagged project
        let eids = await site.findByTags([ 'odgn-project'] );
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

            let tags = await site.getTagsByEntityId(e.id);
            
            result.push( <ProjectSummary
                key={`ps${e.id}`}
                title={e.Title?.title} 
                date={e.DateRange} 
                summary={e.Title?.summary}
                href={resolveUrl(e.id)}
                tags={tags} /> );
        }
        
        setData( result );
    });

    return <section className="projects">{data}</section>;
}


function ProjectSummary({title, date, summary, href, tags}){
    return <article className="project-summary">
        <h2>{title}</h2>
        <div>{formatDate(date)}</div>
        <p>{summary}</p>
        <footer>
            <TagList tags={tags} excludeSlugs={['odgn-project']} />
        </footer>
        <a href={href}><span className="article-link"></span></a>
    </article>
}
