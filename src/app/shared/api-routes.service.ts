import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

const getProjectsEndpoint = 'projects/';
const contactEndpoint = 'contacts/';
const visitorEndpoint = 'visitor/';

// Type definitions for API responses
export interface Project {
  id: number;
  slug: string;
  title: string;
  description: string;
  tech_skills?: Record<string, string[]>;
  [key: string]: any; // Allow for other properties
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
  [key: string]: string;
}

export interface ContactFormResponse {
  status: string;
  message?: string;
  [key: string]: any;
}

export interface VisitorResponse {
  status: string;
  [key: string]: any;
}

@Injectable({
  providedIn: 'root',
})
export class ApiRoutesService {
  constructor(private http: HttpClient) {}

  getProjects() {
    return this.http.get<Project[]>(
      `${environment.apiBaseUrl}${getProjectsEndpoint}`
    );
  }

  submitContactForm(formData: ContactFormData) {
    return this.http.post<ContactFormResponse>(
      `${environment.apiBaseUrl}${contactEndpoint}`,
      formData
    );
  }

  getProjectDetails(projectId: string) {
    return this.http.get<Project>(
      `${environment.apiBaseUrl}${getProjectsEndpoint}${projectId}/`
    );
  }

  addVisitor() {
    return this.http.post<VisitorResponse>(
      `${environment.apiBaseUrl}${visitorEndpoint}`,{}
    );
  }
}
