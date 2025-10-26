# Copilot Chatbot App

An Angular application that integrates with Microsoft Copilot Studio (Power Virtual Agents) chatbot and renders Adaptive Cards using Direct Line API.

## Features

- 🤖 **Direct Line Integration**: Connect to your Copilot Studio bot using Direct Line API
- 🎨 **Adaptive Cards Support**: Render interactive Adaptive Cards in chat messages
- 💬 **Modern Chat Interface**: Beautiful, responsive chat UI with typing indicators
- 📱 **Mobile Responsive**: Works seamlessly on desktop and mobile devices
- ⚡ **Real-time Communication**: Live chat with your bot
- 🎯 **Action Handling**: Support for Adaptive Card actions (Submit, OpenUrl, ShowCard)

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 16 or higher)
- [Angular CLI](https://angular.io/cli) (version 17 or higher)
- A Microsoft Copilot Studio bot with Direct Line channel enabled

## Installation

1. **Clone or download this project**
   ```bash
   cd copilot-chatbot-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure your Direct Line secret**
   
   Open `src/app/services/config.service.ts` and replace the placeholder:
   ```typescript
   directLineSecret: 'YOUR_DIRECT_LINE_SECRET_HERE'
   ```
   
   With your actual Direct Line secret from Copilot Studio.

## Getting Your Direct Line Secret

1. Go to [Power Virtual Agents](https://powervirtualagents.microsoft.com/)
2. Select your bot
3. Go to **Settings** → **Channels**
4. Find **Direct Line** and click **Configure**
5. Copy the **Secret Key** from the Direct Line configuration
6. Paste it in the `config.service.ts` file

## Running the Application

1. **Start the development server**
   ```bash
   npm start
   ```

2. **Open your browser**
   Navigate to `http://localhost:4200`

3. **Start chatting!**
   The app will automatically connect to your bot and you can start sending messages.

## Project Structure

```
src/
├── app/
│   ├── chat/
│   │   ├── chat.component.ts          # Main chat component
│   │   └── chat.component.scss         # Chat styling
│   ├── services/
│   │   ├── chatbot.service.ts          # Direct Line integration
│   │   ├── adaptive-cards.service.ts  # Adaptive Cards rendering
│   │   └── config.service.ts           # Configuration management
│   ├── app.component.ts                # Root component
│   └── app.routes.ts                   # Routing configuration
├── styles.scss                         # Global styles
└── index.html                          # Main HTML file
```

## Key Components

### ChatbotService
Handles the Direct Line connection and message exchange with your Copilot Studio bot.

### AdaptiveCardsService
Renders Adaptive Cards and handles user interactions with card actions.

### ChatComponent
The main UI component that displays the chat interface, messages, and handles user input.

## Adaptive Cards Support

The application supports various Adaptive Card features:

- **Text Blocks**: Rich text formatting
- **Input Fields**: Text inputs, number inputs, etc.
- **Actions**: Submit, OpenUrl, ShowCard actions
- **Images**: Image display and handling
- **Custom Styling**: Modern, responsive card design

## Customization

### Styling
- Modify `src/styles.scss` for global styles
- Update `src/app/chat/chat.component.scss` for chat-specific styling
- Customize Adaptive Cards appearance in `adaptive-cards.service.ts`

### Configuration
- Update `config.service.ts` to modify bot settings
- Change connection parameters, UI preferences, and feature flags

### Bot Integration
- Modify `chatbot.service.ts` to add custom message handling
- Extend the service to support additional Direct Line features

## Troubleshooting

### Connection Issues
- Verify your Direct Line secret is correct
- Check that your Copilot Studio bot is published
- Ensure the Direct Line channel is enabled

### Adaptive Cards Not Rendering
- Check browser console for JavaScript errors
- Verify the Adaptive Cards payload format
- Ensure the card version is supported

### Build Issues
- Run `npm install` to ensure all dependencies are installed
- Check Node.js and Angular CLI versions
- Clear npm cache: `npm cache clean --force`

## Development

### Building for Production
```bash
npm run build
```

### Running Tests
```bash
npm test
```

### Code Linting
```bash
ng lint
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For issues and questions:
- Check the [Microsoft Bot Framework documentation](https://docs.microsoft.com/en-us/azure/bot-service/)
- Review [Adaptive Cards documentation](https://adaptivecards.io/)
- Open an issue in this repository

## Additional Resources

- [Microsoft Copilot Studio Documentation](https://docs.microsoft.com/en-us/power-virtual-agents/)
- [Direct Line API Reference](https://docs.microsoft.com/en-us/azure/bot-service/rest-api/bot-framework-rest-direct-line-3-0-concepts)
- [Adaptive Cards Designer](https://adaptivecards.io/designer/)
- [Angular Documentation](https://angular.io/docs)
