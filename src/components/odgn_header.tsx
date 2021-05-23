import { resolveUrl } from '@site';

export default function OdgnHeader() {

    let href = resolveUrl('/index');

    return <div className="odgn-header">
        <svg viewBox="0 0 128 128" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
            <path fill="#999" d="M63.667 0c35.162 0 63.666 28.505 63.666 63.667 0 35.162-28.504 63.666-63.666 63.666C28.505 127.333 0 98.829 0 63.667 0 28.505 28.505 0 63.667 0zm34.208 85.522H80.771v17.105h17.104V85.522zM72.219 68.418H55.114v34.209h17.105V68.418zm-25.657 0H29.458v34.209h17.104V68.418zm47.037-17.105c-7.084 0-12.828 5.744-12.828 12.829 0 7.085 5.744 12.828 12.828 12.828 7.085 0 12.829-5.743 12.829-12.828 0-7.085-5.744-12.829-12.829-12.829z"/>
        </svg>
        <svg viewBox="0 0 128 128" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
            <path fill="#222" d="M44.691 0L128 74.438v15.217H86.276L37.372 46.014V128H0v-20.816h26.319V91.967L0 68.451V0h44.691z"/>
        </svg>
        
        <div className="title">Open Door Go North</div>
        <a href={href}><span className="article-link"></span></a>
    </div>
}