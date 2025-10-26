import { Injectable } from '@angular/core';
import * as AdaptiveCards from 'adaptivecards';

@Injectable({
  providedIn: 'root'
})
export class AdaptiveCardsService {

  constructor() {
    // Configure Adaptive Cards host config
    AdaptiveCards.AdaptiveCard.onProcessMarkdown = (text: string, result: any) => {
      result.outputHtml = this.processMarkdown(text);
      result.didProcess = true;
    };
  }

  renderCard(cardPayload: any, targetElement: HTMLElement): void {
    try {
      // Create a new Adaptive Card instance
      const adaptiveCard = new AdaptiveCards.AdaptiveCard();
      
      // Set the host config for styling
      adaptiveCard.hostConfig = new AdaptiveCards.HostConfig({
        fontFamily: 'Inter, sans-serif',
        supportsInteractivity: true,
        spacing: {
          small: 8,
          default: 12,
          medium: 16,
          large: 20,
          extraLarge: 24,
          padding: 16
        },
        separator: {
          lineThickness: 1,
          lineColor: '#e2e8f0'
        },
        imageSizes: {
          small: 40,
          medium: 80,
          large: 120
        },
        containerStyles: {
          default: {
            backgroundColor: '#ffffff',
            foregroundColors: {
              default: {
                default: '#1e293b',
                subtle: '#64748b'
              }
            }
          },
          emphasis: {
            backgroundColor: '#f8fafc',
            foregroundColors: {
              default: {
                default: '#1e293b',
                subtle: '#64748b'
              }
            }
          }
        },
        actions: {
          maxActions: 5,
          spacing: 'default',
          buttonSpacing: 8,
          showCard: {
            actionMode: 'inline',
            inlineTopMargin: 16
          },
          actionsOrientation: 'horizontal',
          actionAlignment: 'stretch'
        },
        adaptiveCard: {
          allowCustomStyle: true
        }
      });

      // Parse the card payload
      adaptiveCard.parse(cardPayload);

      // Render the card
      const renderedCard = adaptiveCard.render();
      
      // Clear the target element and append the rendered card
      targetElement.innerHTML = '';
      targetElement.appendChild(renderedCard);

      // Handle card actions
      adaptiveCard.onExecuteAction = (action: any) => {
        this.handleCardAction(action);
      };

    } catch (error) {
      console.error('Error rendering Adaptive Card:', error);
      targetElement.innerHTML = '<div class="card-error">Error rendering card</div>';
    }
  }

  private handleCardAction(action: any): void {
    console.log('Card action triggered:', action);
    
    // Handle different action types
    switch (action.type) {
      case 'Action.Submit':
        this.handleSubmitAction(action);
        break;
      case 'Action.OpenUrl':
        this.handleOpenUrlAction(action);
        break;
      case 'Action.ShowCard':
        this.handleShowCardAction(action);
        break;
      default:
        console.log('Unhandled action type:', action.type);
    }
  }

  private handleSubmitAction(action: any): void {
    // Emit a custom event that can be listened to by the chat component
    const event = new CustomEvent('adaptiveCardSubmit', {
      detail: {
        action: action,
        data: action.data
      }
    });
    document.dispatchEvent(event);
  }

  private handleOpenUrlAction(action: any): void {
    if (action.url) {
      window.open(action.url, '_blank');
    }
  }

  private handleShowCardAction(action: any): void {
    // This is handled automatically by Adaptive Cards
    console.log('Show card action:', action);
  }

  private processMarkdown(text: string): string {
    // Simple markdown processing - you can enhance this
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code>$1</code>')
      .replace(/\n/g, '<br>');
  }

  // Method to create a sample Adaptive Card for testing
  createSampleCard(): any {
    return {
      type: 'AdaptiveCard',
      version: '1.4',
      body: [
        {
          type: 'TextBlock',
          text: 'Welcome to Copilot Chatbot!',
          weight: 'bolder',
          size: 'medium',
          color: 'accent'
        },
        {
          type: 'TextBlock',
          text: 'This is a sample Adaptive Card. You can interact with the buttons below.',
          wrap: true,
          spacing: 'medium'
        },
        {
          type: 'Input.Text',
          id: 'userName',
          placeholder: 'Enter your name',
          label: 'Name'
        }
      ],
      actions: [
        {
          type: 'Action.Submit',
          title: 'Submit',
          data: {
            action: 'submitName'
          }
        },
        {
          type: 'Action.OpenUrl',
          title: 'Learn More',
          url: 'https://docs.microsoft.com/en-us/adaptive-cards/'
        }
      ]
    };
  }
}
