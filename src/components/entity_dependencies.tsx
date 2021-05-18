import {
    es, 
    site, log, 
    formatDate, useServerEffect, resolveUrl, 
    fetchEntities, processEntities, runQuery,
    getDependencyOfEntities,
    getDependencyEntities
} from '@site';
import { exportEntity, Entity, EntitySet, toComponentId } from '@ecset';


export interface EntityDependenciesProps {
    serverEffects: { [key:string]: any };
    e: Entity;
    dir?: string;
}


export default function EntityDependencies({e, dir, serverEffects, ...props}:EntityDependenciesProps){
    let isDeps = (dir === "→" || dir === '>') ? true : false;
    const depFn = isDeps ? getDependencyEntities : getDependencyOfEntities;

    // let json = exportEntity( es, e, {comUrl: true, comName: true});

    let seid = useServerEffect(async (key) => {
        let deps = await depFn(es, e.id);
        deps = await Promise.all(deps.map(async dep => buildDepData(site, dep, isDeps ? 'dst' : 'src') ));
        return deps;
    });

    let deps = serverEffects ? serverEffects[seid] : [];

    // let coms = [];
    // for (const com of json.components) {
    //     const { '@d': did, '@du': name, ...attrs } = com;
    //     coms.push({ name, did, attrs });
    // }

    return <article className="entity-deps">
        <table>
        {deps && deps.map( dep => depToElement(dep, isDeps))}
        </table>
    </article>
}

function depToElement( dep:Entity, isDeps:boolean = true ){
    const com = dep.Dep;
    const { '@d': did, '@e': eid, src, dst, type } = com;

    let label = dep.Meta?.meta.label ?? '';

    return <tr key={dep.id} className="dep">
        <td className="type">{type}</td>
        <td>{ isDeps ? `←` : `→` }</td>
        {/* <td className="e"><a href={`/_e/${src}`}>{src}</a></td> */}
        <td className="e">{isDeps ? dst : src}</td>
        <td className="url">{label}</td>
    </tr>

}

async function buildDepData( site, e:Entity, field:string = 'dst' ){
    const {es} = site;
    const type = e.Dep.type;
    let linkEid = e.Dep[field] ?? 0;
    if (linkEid === 0) {
        return e;
    }

    // console.log('[buildDepData]', {e:e.id, to:linkEid})

    let props:any = {};
    if( type === 'tag' ){
        const did = es.resolveComponentDefId('/component/title');
        let com = await es.getComponent( toComponentId(linkEid, did) );
        props.label = com?.title ?? '';
    }
    else if( type === 'link' || type === 'import' ){
        let did = es.resolveComponentDefId('/component/url');
        let com = await es.getComponent( toComponentId(linkEid, did) );
        if( com !== undefined ){
            props.label = com?.url;
        }
        else {
            did = es.resolveComponentDefId('/component/src');
            com = await es.getComponent( toComponentId(linkEid, did) );
            props.label = com?.url;
        }
    }
    else {
        props.label = await site.getEntitySrcUrl(linkEid);
    }

    let meta = e.Meta?.meta ?? {};
    meta = {...meta, ...props};
    e.Meta = { meta };

    return e;
}