# mgnl-tools

Opinionated set of tools for developing Magnolia SPAs

## Getting Started

### Installing

```
npm i mgnl-tools
```

### Prerequisites

#### `magnolia.config.js`

Make sure the configuration file is located `PROJECT_ROOT/src` folder.

Extend `magnolia.config.js` with `mgnlTools` configuration e.g.

```javascript
import Basic from './pages/Basic';
import Banner from './components/Banner';

const config = {
  componentMappings: {
    'headless-ecommerce:pages/Basic': Basic,
    'headless-ecommerce:components/Banner': Banner,
  },
  mgnlTools: {
    nodeName: process.env.REACT_APP_MGNL_NODE_NAME,
    pageUrl: process.env.REACT_APP_MGNL_API_PAGES,
    templateDefinitionsUrl: process.env.REACT_APP_MGNL_API_TEMPLATE_DEFINITION,
    languages: process.env.REACT_APP_MGNL_LANGUAGES,
  },
};

export default config;
```

- nodeName - node name of your site e.g. **/home**
- pageUrl - rest endpoint for fetching pages e.g. **http://mgnl.io/.rest/pages**
- templateDefinitionsUrl - rest endpoint for fetching template definitions e.g. **http://mgnl.io/.rest/templateDefinition/v1**
- languages - space separated list of available language codes, first will be used as default e.g. **en de es**

## Available tools

### `getRouterBasename`

Returns basename you can use in your SPA router. Adds language prefix.

```javascript
import mgnlTools from 'mgnl-tools';

<Router basename={mgnlTools.getRouterBasename()} />;
```

### `getPage`

Fetches the page and template definitions. Returns everything that is needed for editable pages components in Magnolia.

```javascript
import mgnlTools from 'mgnl-tools';

const page = await mgnlTools.getPage();

<EditablePage templateDefinitions={page.templateDefinitions} content={page.content} config={page.config} />;
```

### `refresh`

Calls Magnolia to render edit green bars.

```javascript
import mgnlTools from 'mgnl-tools';

mgnlTools.refresh();
```

### `getLanguages`

Returns array of available language codes.

```javascript
import mgnlTools from 'mgnl-tools';

mgnlTools.getLanguages(); // ['en', 'de', 'es']
```

### `getCurrentLanguage`

Reads from url and returns current language code.

```javascript
import mgnlTools from 'mgnl-tools';

mgnlTools.getCurrentLanguage();

// for http://mgnl.io => en
// for http://mgnl.io/de => de
```

### `changeLanguage(languageCode)`

Change url to new language.

```javascript
import mgnlTools from 'mgnl-tools';

mgnlTools.changeLanguage('en');
// change href to http://mgnl.io

mgnlTools.changeLanguage('de');
// change href to http://mgnl.io/de
```
