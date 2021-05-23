import React from 'react';
import { resolveUrl } from '@site';

export default function ImgOpen({src, ...props}){

    if( src === undefined ){
        return null;
    }
    
    let url = resolveUrl(src);

    return <a href={url}><img {...props} src={url} /></a>;
}