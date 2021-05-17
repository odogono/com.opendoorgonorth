
import {
    es, site, log, formatDate, useServerEffect, resolveUrl, fetchEntities, processEntities, runQuery
} from '@site';

import { useState } from 'react';

import BlogHeader from '/components/blog_header';
import TagList from '/components/tag_list';

export default function FrontSummary() {

    const [data, setData] = useState([]);

    useServerEffect(async () => {
        let eids = await site.findByTags(['odgn-blog', 'odgn-link'], { mode: 'OR' });

        const q = `
        [
            $eids
            /component/date#/date !ca desc order
            10 0 limit
            /component/title !bf
            @eid
        ] select`;

        eids = await runQuery(q, { eids });

        const dids = [
            '/component/output',
            '/component/title',
            '/component/url',
            '/component/date'
        ];
        const ents = await processEntities(eids, dids, { applyLayout: false });
        
        let result = [];

        for (const e of ents) {

            let url = e.Url?.url;
            
            let tags = await site.getTagsByEntityId(e.id);

            let props = {
                e,
                eid: e.id,
                key: `sm-${e.id}`,
                title: e.Title?.title,
                date: e.DateRange ?? e.Date,
                content: e.Output?.data,
                summary: e.Title?.summary,
                href: url,
                tags
            };

            if (e.Output) {
                result.push(<BlogArticle {...props} />);
            } else {
                result.push(<LinkArticle {...props} tags={tags} />);
            }
        }

        setData(result);
    });

    return <article className="summary">{data}</article>;
}



function BlogArticle({ e, eid, title, date, content, tags }) {
    let inner = <p dangerouslySetInnerHTML={{ __html: content }} />;
    return <article data-eid={eid} className="blog">
        <BlogHeader e={e} />
        {inner}
        <footer>
            <TagList tags={tags} excludeSlugs={['odgn-blog']} />
        </footer>
    </article>
}

function LinkArticle({ eid, title, date, summary, href, tags }) {
    return <article data-eid={eid} className="link">
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