console.assert(process.env.OPENROUTER_API_KEY, '\n\n!! Open Router API Key (OPENROUTER_API_KEY) not provided !!\n')

export type ModelConfig = {
    apiKey: string;
    httpReferer: string;
    xTitle: string;
    models: string[];
    systemPrompt: string;
    temperature: number,
    maxTokens: number,
    provider: {
        sort: {
            by: string;
            partition: string
        }
    }
}

export const config: ModelConfig = {
    apiKey: process.env.OPENROUTER_API_KEY as string,
    httpReferer: 'open-router-api.ai',
    xTitle: 'Some open router api',
    models: ['arcee-ai/trinity-large-preview:free'],
    systemPrompt: 'You are a helpful assistant.',
    temperature: 0.2,
    maxTokens: 100,
    provider: {
        sort: {
            by: 'price',
            partition: 'none'
        }
    }
}