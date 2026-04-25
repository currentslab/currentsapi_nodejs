# currentsapi

The official Node.js SDK for the [Currents API](https://currentsapi.services/en/docs/).

## Installation

```bash
npm install currentsapi
```

## Usage

```js
const CurrentsAPI = require('currentsapi');
const api = new CurrentsAPI('YOUR_API_KEY');
```

## Endpoints

### Latest News

```js
api.latestNews({ language: 'en' })
  .then(response => console.log(response));
```

### Search

```js
api.search({ keywords: 'OpenAI', language: 'en' })
  .then(response => console.log(response));
```

Supported parameters:

- `keywords`
- `language`
- `country`
- `category`
- `start_date`
- `end_date`

### Available Resources

```js
api.availableLanguages();
api.availableRegions();
api.availableCategory();
```

## Authentication

All requests are authenticated using an `Authorization` header. Pass your API key when instantiating the client:

```js
const api = new CurrentsAPI('YOUR_API_KEY');
```

Get your API key at [https://currentsapi.services/en/register](https://currentsapi.services/en/register).

## License

MIT
