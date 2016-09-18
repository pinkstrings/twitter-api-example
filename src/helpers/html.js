import Helmet from 'react-helmet'
import React, {PropTypes} from 'react'
import ReactDOM from 'react-dom/server'
import serialize from 'serialize-javascript'

import config from '../../config'

/**
 * Wrapper component containing HTML metadata and boilerplate tags.
 * Used in server-side code only to wrap the string output of the
 * rendered route component.
 *
 * The only thing this component doesn't (and can't) include is the
 * HTML doctype declaration, which is added to the rendered output
 * by the server.js file.
 */
export default function Html(props) {
  const {component, store} = props
  const content = component ? ReactDOM.renderToString(component) : ''
  const head = Helmet.rewind()

  return (
    <html lang='en-US'>
      <head>
        {head.base.toComponent()}
        <title>{config.app.title}</title>
        {head.meta.toComponent()}
        {head.link.toComponent()}
        {head.script.toComponent()}

        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link id='css-bundle' rel='stylesheet' href='/style.css' />
      </head>
      <body>
        <div id='app-root' dangerouslySetInnerHTML={{__html: content}} />
        <script dangerouslySetInnerHTML={{__html: `window.__data=${serialize(store.getState())}`}} charSet='UTF-8' />
        <script src='/main.js' charSet='UTF-8' />
      </body>
    </html>
  )
}

Html.propTypes = {
  component: PropTypes.node,
  store: PropTypes.object
}
