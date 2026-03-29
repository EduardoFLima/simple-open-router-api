import { OpenRouter } from "@openrouter/sdk";
import { type ChatGenerationParams } from "@openrouter/sdk/models";
import { type ModelConfig } from "./config.ts";

export type ModelResponse = {
    content: string;
    model: string
}

export class OpenRouterService {

    private config: ModelConfig;
    private client;

    constructor(config: ModelConfig) {
        this.config = config;
        this.client = new OpenRouter({
            apiKey: process.env.OPENROUTER_API_KEY,
            httpReferer: config.httpReferer,
            xTitle: config.xTitle
        });

    }

    async generate(prompt: string): Promise<ModelResponse> {

        console.log("\n=> Question:", prompt);

        return await this.client.chat.send({
            models: this.config.models,
            messages: [
                { role: 'system', content: this.config.systemPrompt },
                { role: 'user', content: prompt },
            ],
            stream: false,
            temperature: this.config.temperature,
            maxTokens: this.config.maxTokens,
            provider: this.config.provider as ChatGenerationParams['provider']
        })
            .then(chatResponse => {
                return {
                    content: chatResponse.choices?.at(0)?.message?.content ?? '',
                    model: chatResponse.model
                } as ModelResponse
            })
    }

}
