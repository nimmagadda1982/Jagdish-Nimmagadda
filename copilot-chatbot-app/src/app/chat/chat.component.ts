import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatbotService, ChatMessage } from '../services/chatbot.service';
import { AdaptiveCardsService } from '../services/adaptive-cards.service';
import { ConfigService } from '../services/config.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="chat-container">
      <!-- Connection Status -->
      <div class="connection-status" [class.connected]="isConnected" [class.disconnected]="!isConnected">
        <div class="status-indicator"></div>
        <span>{{ isConnected ? 'Connected' : 'Disconnected' }}</span>
      </div>

      <!-- Chat Messages -->
      <div class="chat-messages" #messagesContainer>
        <div *ngIf="messages.length === 0" class="welcome-message">
          <div class="welcome-card">
            <h3>Welcome to {{ botName }}!</h3>
            <p>Start a conversation by typing a message below.</p>
            <div class="sample-actions">
              <button class="btn btn-secondary" (click)="sendSampleMessage('Hello')">
                Say Hello
              </button>
              <button class="btn btn-secondary" (click)="sendSampleMessage('Help')">
                Get Help
              </button>
            </div>
          </div>
        </div>

        <div *ngFor="let message of messages" class="message" [class.user-message]="message.isUser" [class.bot-message]="!message.isUser">
          <div class="message-content">
            <div class="message-text" *ngIf="message.text">{{ message.text }}</div>
            
            <!-- Adaptive Card Rendering -->
            <div *ngIf="message.adaptiveCard" class="adaptive-card-container" #cardContainer>
              <!-- Card will be rendered here -->
            </div>
            
            <!-- Regular Attachments -->
            <div *ngIf="message.attachments && message.attachments.length > 0 && !message.adaptiveCard" class="attachments">
              <div *ngFor="let attachment of message.attachments" class="attachment">
                <div *ngIf="attachment.contentType === 'text/plain'" class="text-attachment">
                  {{ attachment.content }}
                </div>
                <div *ngIf="attachment.contentType.startsWith('image/')" class="image-attachment">
                  <img [src]="attachment.contentUrl" [alt]="attachment.name || 'Image'">
                </div>
              </div>
            </div>
            
            <div class="message-time">{{ formatTime(message.timestamp) }}</div>
          </div>
        </div>
      </div>

      <!-- Typing Indicator -->
      <div *ngIf="isTyping" class="typing-indicator">
        <div class="typing-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <span>{{ botName }} is typing...</span>
      </div>

      <!-- Message Input -->
      <div class="message-input-container">
        <form (ngSubmit)="sendMessage()" class="message-form">
          <input 
            type="text" 
            [(ngModel)]="currentMessage" 
            placeholder="Type your message..." 
            class="message-input"
            [disabled]="!isConnected"
            #messageInput
            name="message">
          <button 
            type="submit" 
            class="send-button"
            [disabled]="!currentMessage.trim() || !isConnected"
            [class.sending]="isSending">
            <svg *ngIf="!isSending" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22,2 15,22 11,13 2,9"></polygon>
            </svg>
            <div *ngIf="isSending" class="spinner"></div>
          </button>
        </form>
      </div>
    </div>
  `,
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy, AfterViewChecked {
  @ViewChild('messagesContainer') messagesContainer!: ElementRef;
  @ViewChild('messageInput') messageInput!: ElementRef;

  messages: ChatMessage[] = [];
  currentMessage = '';
  isConnected = false;
  isTyping = false;
  isSending = false;
  botName = 'Copilot Assistant';

  private typingTimeout: any;

  constructor(
    private chatbotService: ChatbotService,
    private adaptiveCardsService: AdaptiveCardsService,
    private configService: ConfigService
  ) {}

  ngOnInit(): void {
    this.botName = this.configService.getBotName();
    
    // Subscribe to messages
    this.chatbotService.messages$.subscribe(messages => {
      this.messages = messages;
      this.isTyping = false;
      this.isSending = false;
    });

    // Subscribe to connection status
    this.chatbotService.isConnected$.subscribe(connected => {
      this.isConnected = connected;
    });

    // Listen for Adaptive Card submit events
    document.addEventListener('adaptiveCardSubmit', (event: any) => {
      this.handleAdaptiveCardSubmit(event.detail);
    });

    // Initialize bot connection
    this.initializeBot();
  }

  ngAfterViewChecked(): void {
    if (this.configService.isAutoScrollEnabled()) {
      this.scrollToBottom();
    }
  }

  ngOnDestroy(): void {
    this.chatbotService.disconnect();
    document.removeEventListener('adaptiveCardSubmit', this.handleAdaptiveCardSubmit);
    if (this.typingTimeout) {
      clearTimeout(this.typingTimeout);
    }
  }

  private async initializeBot(): Promise<void> {
    try {
      const directLineSecret = this.configService.getDirectLineSecret();
      if (directLineSecret && directLineSecret !== 'YOUR_DIRECT_LINE_SECRET_HERE') {
        await this.chatbotService.initializeBot(directLineSecret);
      } else {
        console.warn('Please configure your Direct Line secret in the config service');
      }
    } catch (error) {
      console.error('Failed to initialize bot:', error);
    }
  }

  async sendMessage(): Promise<void> {
    if (!this.currentMessage.trim() || !this.isConnected) {
      return;
    }

    const messageText = this.currentMessage.trim();
    this.currentMessage = '';
    this.isSending = true;

    // Show typing indicator
    this.showTypingIndicator();

    try {
      await this.chatbotService.sendMessage(messageText);
    } catch (error) {
      console.error('Failed to send message:', error);
      this.isSending = false;
      this.isTyping = false;
    }
  }

  sendSampleMessage(message: string): void {
    this.currentMessage = message;
    this.sendMessage();
  }

  private showTypingIndicator(): void {
    this.isTyping = true;
    
    if (this.typingTimeout) {
      clearTimeout(this.typingTimeout);
    }
    
    this.typingTimeout = setTimeout(() => {
      this.isTyping = false;
    }, 5000); // Hide after 5 seconds
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      if (this.messagesContainer) {
        this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
      }
    }, 100);
  }

  private handleAdaptiveCardSubmit(eventDetail: any): void {
    console.log('Adaptive Card submitted:', eventDetail);
    
    // You can handle the submitted data here
    // For example, send it back to the bot or process it locally
    if (eventDetail.data && eventDetail.data.action) {
      this.chatbotService.sendMessage(`Card action: ${eventDetail.data.action}`);
    }
  }

  formatTime(timestamp: Date): string {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  }

  clearChat(): void {
    this.chatbotService.clearMessages();
  }
}
