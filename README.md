# openai-caching-proxy

Basic caching proxy for OpenAI API.

This can help reduce costs by caching OpenAI responses and returning the cached response for repeated requests.

**Usage**

Start the proxy server (will start at http://localhost:3001 by default):

```
yarn start
```

Then, in your `openai` configuration, pass in the new base URL:

```diff
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
+ basePath: 'http://localhost:3001/proxy',
});
const openai = new OpenAIApi(configuration);
```

You can try a sample request. The first will be proxied to OpenAI but the second repeated/duplicate request will return the cached result instead.

```ts
// Sample request, try it twice and the second one
// will return cached result:
const models1 = await openai.listModels();
console.log('models 1:', models1);

const models2 = await openai.listModels();
console.log('models 2:', models2);
```
