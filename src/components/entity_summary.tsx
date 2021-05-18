import {
    es, 
} from '@site';
import { exportEntity, Entity } from '@ecset';

export interface EntitySummaryProps {
    e: Entity;
}


export default function EntitySummary({e}:EntitySummaryProps){

    let json = exportEntity( es, e, {comUrl: true, comName: true});

    let coms = [];
    for (const com of json.components) {
        const { '@d': did, '@du': name, ...attrs } = com;
        coms.push({ name, did, attrs });
    }

    return <article className="entity-summary">
        <ul>
        {coms.map( ({did,name}) => 
            <li key={did}>{name}</li>
        )}
        </ul>
    </article>
}