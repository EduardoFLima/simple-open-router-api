import Fastify from 'fastify'
import { OpenRouterService } from './OpenRouterService.ts';

export const createServer = (openRouterService: OpenRouterService) => {

    const app = Fastify({ logger: false });

    const schema = {
        body: {
            type: 'object',
            properties: {
                question: { type: 'string' }
            },
            required: ['question']
        },
    }

    app.post('/chat', { schema }, async (request, reply) => {
        const { question } = request.body as { question: string }

        return openRouterService.generate(question)
    });

    return app;
}