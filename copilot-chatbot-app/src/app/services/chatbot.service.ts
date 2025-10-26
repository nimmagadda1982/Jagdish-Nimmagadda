import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DirectLine } from 'botframework-directlinejs';

export interface ChatMessage {
  id: string;
  text: string;
  timestamp: Date;
  isUser: boolean;
  attachments?: any[];
  adaptiveCard?: any;
}

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private directLine: DirectLine | null = null;
  private messagesSubject = new BehaviorSubject<ChatMessage[]>([]);
  public messages$ = this.messagesSubject.asObservable();
  private isConnectedSubject = new BehaviorSubject<boolean>(false);
  public isConnected$ = this.isConnectedSubject.asObservable();

  constructor() {}

  async initializeBot(directLineSecret: string): Promise<void> {
    try {
      this.directLine = new DirectLine({
        secret: directLineSecret
      });

      // Listen for activities from the bot
      this.directLine.activity$.subscribe({
        next: (activity) => {
          if (activity.type === 'message' && activity.from.id !== 'user') {
            this.addMessage({
              id: activity.id || Date.now().toString(),
              text: activity.text || '',
              timestamp: new Date(),
              isUser: false,
              attachments: activity.attachments,
              adaptiveCard: activity.attachments?.find(att => att.contentType === 'application/vnd.microsoft.card.adaptive')
            });
          }
        },
        error: (error) => {
          console.error('DirectLine error:', error);
        }
      });

      // Listen for connection status
      this.directLine.connectionStatus$.subscribe({
        next: (status) => {
          this.isConnectedSubject.next(status === 2); // 2 = Connected
        },
        error: (error) => {
          console.error('Connection status error:', error);
          this.isConnectedSubject.next(false);
        }
      });

      // Start the conversation
      await this.directLine.start();
    } catch (error) {
      console.error('Failed to initialize bot:', error);
      throw error;
    }
  }

  async sendMessage(text: string): Promise<void> {
    if (!this.directLine) {
      throw new Error('Bot not initialized');
    }

    try {
      // Add user message to the list
      this.addMessage({
        id: Date.now().toString(),
        text,
        timestamp: new Date(),
        isUser: true
      });

      // Send message to bot
      await this.directLine.postActivity({
        type: 'message',
        from: { id: 'user' },
        text: text
      });
    } catch (error) {
      console.error('Failed to send message:', error);
      throw error;
    }
  }

  private addMessage(message: ChatMessage): void {
    const currentMessages = this.messagesSubject.value;
    this.messagesSubject.next([...currentMessages, message]);
  }

  disconnect(): void {
    if (this.directLine) {
      this.directLine.end();
      this.directLine = null;
      this.isConnectedSubject.next(false);
    }
  }

  clearMessages(): void {
    this.messagesSubject.next([]);
  }
}
