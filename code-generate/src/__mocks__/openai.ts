export default class OpenAI {
    chat = {
      completions: {
        create: jest.fn().mockResolvedValue({
          choices: [
            {
              message: {
                content: "```python\nprint('Hello, world!')\n```",
              },
            },
          ],
        }),
      },
    };
  }
  