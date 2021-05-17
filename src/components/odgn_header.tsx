import { formatDate } from '@site';


export default function OdgnHeader({ e }) {

    return <div className="odgn-header">
        <svg viewBox="0 0 128 128" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
            <rect width="128" height="128" fill="#999" />
        </svg>
        <svg viewBox="0 0 128 128" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
            <rect width="128" height="128" fill="#222" />
        </svg>
        
        <h1>Open Door Go North</h1>
    </div>
}