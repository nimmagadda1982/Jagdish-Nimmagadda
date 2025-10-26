import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="app-container">
      <header class="app-header">
        <div class="container">
          <h1>Copilot Chatbot</h1>
          <p>Powered by Microsoft Copilot Studio & Adaptive Cards</p>
        </div>
      </header>
      <main class="app-main">
        <div class="container">
          <router-outlet></router-outlet>
        </div>
      </main>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    .app-header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 2rem 0;
      text-align: center;
    }

    .app-header h1 {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
    }

    .app-header p {
      font-size: 1.1rem;
      opacity: 0.9;
    }

    .app-main {
      flex: 1;
      padding: 2rem 0;
    }
  `]
})
export class AppComponent {
  title = 'copilot-chatbot-app';
}
