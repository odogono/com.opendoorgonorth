import React from 'react'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import Helmet from "react-helmet"
import { config } from 'config'

export default class Index extends React.Component {
  render () {
    return (
      <div>
        <Helmet
          title={config.siteTitle}
          meta={[
            {"name": "description", "content": "Sample"},
            {"name": "keywords", "content": "sample, something"},
          ]}
        />
        <h1>
          > What Now?
        </h1>
        <p>You see nothing of interest</p>

        <Link style={{ boxShadow: 'none' }} to={prefixLink('/blog/')}>Blog</Link>
      </div>
    )
  }
}