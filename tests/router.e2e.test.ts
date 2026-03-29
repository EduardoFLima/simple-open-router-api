import { it } from "node:test";
import { type ModelResponse, OpenRouterService } from "../src/OpenRouterService.ts";
import { config } from "../src/config.ts";
import { createServer } from "../src/server.ts";
import assert from "node:assert";

console.assert(process.env.OPENROUTER_API_KEY, '\n\n!! Open Router API Key (OPENROUTER_API_KEY) not provided !!\n')

it('should get the cheapest model', async () => {
    const cheapestConfig = {
        ...config,
        provider: {
            ...config.provider,
            sort: {
                ...config.provider.sort,
                by: 'price',
            }
        }
    };

    const openRouterService = new OpenRouterService(cheapestConfig)
    const app = createServer(openRouterService);

    const response = await app.inject({
        method: 'POST',
        url: '/chat',
        payload: {
            question: 'how are you?'
        }
    })

    const payload = response.json<ModelResponse>()

    console.log('\n> Response:\n');
    console.log('Model:', payload.model);
    assert.equal(payload.model, 'arcee-ai/trinity-large-preview:free')
})

it('should get the model with the highest throughput', async () => {
    const cheapestConfig = {
        ...config,
        provider: {
            ...config.provider,
            sort: {
                ...config.provider.sort,
                by: 'throughput',
            }
        }
    };

    const openRouterService = new OpenRouterService(cheapestConfig)
    const app = createServer(openRouterService);

    const response = await app.inject({
        method: 'POST',
        url: '/chat',
        payload: {
            question: 'how are you?'
        }
    })

    const payload = response.json<ModelResponse>()

    console.log('\n> Response:\n');
    console.log('Model:', payload.model);
    assert.equal(payload.model, 'arcee-ai/trinity-large-preview:free')
})