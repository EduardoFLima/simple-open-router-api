import { createServer } from "./server.ts";
import { type ModelResponse } from "./OpenRouterService.ts";

const app = createServer();

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