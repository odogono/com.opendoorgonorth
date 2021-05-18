import { Entity } from '@ecset';

export interface TagListProps {
    tags: Entity[];
    excludeSlugs?: string[];
}

export default function TagList({ tags, excludeSlugs }: TagListProps) {

    let props = tags !== undefined ? tags.map(e => parseEntity(e, excludeSlugs)) : [];

    let els = props.filter(Boolean).map(({ title, slug }, idx, props) =>
        <TagItem key={`ti${idx}`} title={title} slug={slug} isLast={idx < props.length-1} />
    );

    return <ul className="tags">{els}</ul>;
}

function TagItem({ title, slug, isLast }) {
    return <li key={`tag-${slug}`} data-slug={slug}>
        <span className="link">{title}</span>
        {isLast ? <span className="sep" aria-hidden="true">,</span> : null}
    </li>
}

function parseEntity(e: Entity, excludeSlugs: string[] = []) {
    if (e === undefined) {
        return undefined;
    }

    let title = e.Title?.title;
    let slug = e.Tag?.slug;
    return (excludeSlugs !== undefined && excludeSlugs.indexOf(slug) === -1) ?
        { title, slug } : undefined;
}