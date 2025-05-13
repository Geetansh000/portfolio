import { provideHttpClient, withFetch } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes'; // Adjust path if needed
import { provideAnimations } from '@angular/platform-browser/animations';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(), // ✅ Enables Fetch API for HttpClient
    provideRouter(routes), // ✅ This fixes ActivatedRoute error
    provideAnimations(),
  ],
});
