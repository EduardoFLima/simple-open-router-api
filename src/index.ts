import { createServer } from "./server.ts";
import { OpenRouterService, type ModelResponse } from "./OpenRouterService.ts";
import { config } from "./config.ts";

const openRouterService = new OpenRouterService(config)
const app = createServer(openRouterService);

app.listen({ port: 3000, host: '0.0.0.0' });

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
console.log('Content:', payload.content);