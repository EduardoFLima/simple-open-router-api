import Fastify from 'fastify'

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
        
        console.log('Question: ', question)

        return reply.send('hi there !');
    });

    return app;
}