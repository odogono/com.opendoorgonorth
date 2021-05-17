import { resolveUrl } from '@site';


export default function SiteNav({ e }) {

    let pageUrl = resolveUrl(e.id);

    function Item({ href, title }) {
        href = resolveUrl(href);
        let attrs = href == pageUrl ? { 'aria-current': 'page' } : {};

        return <li {...attrs}><a href={href} data-href={href}>{title}</a></li>;
    }

    return <nav className="site-nav">
        <ul className="menu">
            <Item title="Home" href="/index" />
            <Item title="Projects" href="/projects" />
            <Item title="Writing" href="/writing" />
            <Item title="Links" href="/links" />
            <Item title="About" href="/about" />
        </ul>
    </nav>
}
