import Fastify from 'fastify'
import { OpenRouterService } from './OpenRouterService.ts';
import { config } from './config.ts'

export const createServer = () => {

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

        const openRouterService = new OpenRouterService(config)
        
        return openRouterService.generate(question)
    });

    return app;
}