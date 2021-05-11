import './styles';

import { exportEntity } from 'odgn-entity/src/util/export/json';
import { Entity } from 'odgn-entity/src/entity';
import { EntitySet } from 'odgn-entity/src/entity_set';
import { stringify, truncate } from '@odgn/utils';


export default ({ InlineCSS, e, deps, es, site, ...args }) => {

    return <>
        <InlineCSS />
        {processDeps(es, e, deps)}
    </>;
}


function processDeps(es: EntitySet, e: Entity, deps:Entity[]) {
    
    return <details className="deps" open={true}>
        <summary>Dependencies for {e.id}</summary>
        { deps !== undefined ?
            deps.map( dep => depToElement(es, e, dep))
            : null
        }
    </details>
}

function depToElement( es:EntitySet, src:Entity, dep:Entity ){
    const com = dep.Dep;
    const { '@d': did, '@e': eid, dst, type } = com;

    let label = dep.Meta?.meta.label ?? '';

    return <div key={dep.id} className="dep">
        <div className="type">{type}</div>
        <div>→</div>
        <div className="e"><a href={`/_e/${dst}`}>{dst}</a></div>
        <div className="url">{label}</div>
    </div>

}