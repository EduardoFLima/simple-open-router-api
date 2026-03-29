import { createServer } from "./server.ts";

const app = createServer();

app.listen({port: 3000}, (err) => {
    if (err) throw err
});

const response = await app.inject({
    method: 'POST',
    url: '/chat',
    payload: {
        question: 'how are you?'
    }
})

console.log('response:', response.payload)