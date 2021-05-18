import { resolveUrl } from '@site';

export default function OdgnHeader() {

    let href = resolveUrl('/index');

    return <div className="odgn-header">
        <svg viewBox="0 0 128 128" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
            <rect width="128" height="128" fill="#999" />
        </svg>
        <svg viewBox="0 0 128 128" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
            <rect width="128" height="128" fill="#222" />
        </svg>
        
        <div className="title">Open Door Go North</div>
        <a href={href}><span className="article-link"></span></a>
    </div>
}