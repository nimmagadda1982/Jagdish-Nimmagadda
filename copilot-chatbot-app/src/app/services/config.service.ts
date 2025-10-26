import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private config = {
    // Replace with your actual Direct Line secret from Copilot Studio
    directLineSecret: 'YOUR_DIRECT_LINE_SECRET_HERE',
    
    // Bot configuration
    botName: 'Copilot Assistant',
    
    // UI configuration
    maxMessages: 100,
    autoScroll: true,
    
    // Adaptive Cards configuration
    enableAdaptiveCards: true,
    cardAnimation: true
  };

  constructor() {}

  getConfig(): any {
    return this.config;
  }

  getDirectLineSecret(): string {
    return this.config.directLineSecret;
  }

  setDirectLineSecret(secret: string): void {
    this.config.directLineSecret = secret;
  }

  getBotName(): string {
    return this.config.botName;
  }

  setBotName(name: string): void {
    this.config.botName = name;
  }

  isAdaptiveCardsEnabled(): boolean {
    return this.config.enableAdaptiveCards;
  }

  getMaxMessages(): number {
    return this.config.maxMessages;
  }

  isAutoScrollEnabled(): boolean {
    return this.config.autoScroll;
  }
}
