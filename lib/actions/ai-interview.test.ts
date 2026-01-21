import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getGeminiInterviewReport } from './ai-interview';

describe('AI Interview Logic', () => {
    const mockFetch = vi.fn();
    global.fetch = mockFetch;

    beforeEach(() => {
        mockFetch.mockClear();
        mockFetch.mockClear();
        process.env.GROQ_API_KEY = 'test-key';
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('should parse a clean JSON response correctly', async () => {
        const mockResponse = {
            choices: [{
                message: {
                    content: '{"score": 8.5, "gaps": ["None"], "advice": "Good job"}'
                }
            }]
        };

        mockFetch.mockResolvedValue({
            ok: true,
            json: async () => mockResponse
        });

        const messages = [{ role: 'user', content: 'test' }];
        const result = await getGeminiInterviewReport(messages);

        expect(result.score).toBe(8.5);
        expect(result.gaps).toContain('None');
    });

    it('should extract JSON from markdown code blocks', async () => {
        const markdownContent = `
        Here is the report:
        \`\`\`json
        {
            "score": 7.0,
            "gaps": ["Architecture"],
            "advice": "Study system design"
        }
        \`\`\`
        Hope this helps!
        `;

        const mockResponse = {
            choices: [{
                message: {
                    content: markdownContent
                }
            }]
        };

        mockFetch.mockResolvedValue({
            ok: true,
            json: async () => mockResponse
        });

        const messages = [{ role: 'user', content: 'test transcript' }];
        const result = await getGeminiInterviewReport(messages);

        expect(result.score).toBe(7.0);
        expect(result.gaps[0]).toBe('Architecture');
    });

    it('should return fallback 0.0 on API failure', async () => {
        mockFetch.mockResolvedValue({
            ok: false,
            status: 500,
            json: async () => ({ error: 'Server Error' })
        });

        const messages = [{ role: 'user', content: 'test' }];
        const result = await getGeminiInterviewReport(messages);

        expect(result.score).toBe(0.0);
        expect(result.advice).toContain('Ensure a stable connection');
    });

    it('should return fallback 0.0 on Quota Exceeded (429)', async () => {
        mockFetch.mockResolvedValue({
            ok: false,
            status: 429,
            json: async () => ({ error: 'Rate Limit' })
        });

        const messages = [{ role: 'user', content: 'test' }];
        const result = await getGeminiInterviewReport(messages);

        expect(result.score).toBe(0.0);
    });
});
