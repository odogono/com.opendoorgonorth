import { site, formatDate, resolveUrl } from '@site';
import { Entity } from '@ecset';

import EntitySummary from '/components/entity_summary';
import EntityDependencies from '/components/entity_dependencies';

export interface OdgnFooterProps {
    e: Entity;
}

export default function OdgnFooter({ e, ...props }) {

    let mtime = site.getEntity()?.Times?.mtime;
    let buildTime = formatDate(mtime, 'DayMonthYearTime');

    return <footer className="odgn-footer">
        <div className="footer-nav">
            <nav>
                <h2>This Site</h2>
                <ul>
                    <li><a href="/index">Home</a></li>
                    <li><a href="/projects">Projects</a></li>
                    <li><a href="/writing">Writing</a></li>
                    <li><a href="/links">Links</a></li>
                    <li><a href="/about">About</a></li>
                </ul>
            </nav>
            <nav>
                <h2>External</h2>
                <ul>
                    <li><a rel="me" href="mailto:mail@opendoorgonorth.com">mail@opendoorgonorth.com</a></li>
                    <li><a rel="me" href="https://github.com/odogono">Github</a></li>
                    <li><a rel="me" href="http://twitter.com/odogono/">Twitter</a></li>
                    <li><a rel="me" href="https://www.npmjs.com/~odogono">Npm</a></li>
                    <li><a rel="me" href="https://hex.pm/users/odogono">Hex</a></li>
                </ul>
            </nav>
            <nav>
            </nav>
        </div>
        <div className="footer-nav">
            <nav>
                <h2>Entity {e.id}</h2>
                <EntitySummary e={e} />
            </nav>
            <nav>
                <h2>Dependencies</h2>
                <EntityDependencies {...props} e={e} dir=">" />
            </nav>
            <nav>
                <h2>Dependencies Of</h2>
                <EntityDependencies {...props} e={e} dir="<" />
            </nav>
        </div>
        <div className="footer-nav">
            <nav>
                <div>Copyright © 2021 Alexander Veenendaal</div>
                <div>Built at {buildTime}</div>
            </nav>
        </div>
        <script data-goatcounter="https://odgn.goatcounter.com/count" async src="//gc.zgo.at/count.js"></script>
    </footer>
}