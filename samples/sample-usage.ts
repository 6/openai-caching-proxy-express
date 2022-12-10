// Basic demo usage for a node.js client.
// Run with:
// yarn ts-node samples/sample-usage.ts
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  console.error('Error: OPENAI_API_KEY must be set');
  process.exit(1);
}

const configuration = new Configuration({
  apiKey,
  basePath: 'http://localhost:3001/proxy',
});
const openai = new OpenAIApi(configuration);

const makeSampleRequests = async () => {
  const models = await openai.listModels();
  console.log('models:', models.data);

  const completionOpts = {
    model: 'text-ada-001',
    prompt: 'write me a poem about computers',
    max_tokens: 120,
    top_p: 1,
    stream: false,
    echo: false,
    logprobs: 0,
    presence_penalty: 1,
    frequency_penalty: 0,
    best_of: 1,
  };
  const completion1 = await openai.createCompletion(completionOpts);
  console.log('completion 1:', completion1.data);

  // Ensure that another completion with the same prompt but
  // slightly different options returns a different response:
  const completion2 = await openai.createCompletion({
    ...completionOpts,
    max_tokens: 50,
    best_of: 2,
  });
  console.log('completion 2:', completion2.data);
};

const main = async () => {
  // The first time these requests are made, they should
  // be proxied as-is to OpenAI API:
  await makeSampleRequests();

  // Make the same requests a second time to confirm that
  // they are returning a cached result rather than
  // hitting OpenAI:
  await makeSampleRequests();
};

main();