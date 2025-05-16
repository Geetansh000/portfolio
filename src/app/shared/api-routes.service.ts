import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

const getProjectsEndpoint = '/projects/'; // ✅ Declare this outside the class/decorator
const contactEndpoint = '/contacts/';

@Injectable({
  providedIn: 'root',
})
export class ApiRoutesService {
  constructor(private http: HttpClient) {}

  getProjects() {
    return this.http.get<any[]>(
      `${environment.apiBaseUrl}${getProjectsEndpoint}`
    );
  }

  submitContactForm(formData: any) {
    return this.http.post<any>(
      `${environment.apiBaseUrl}${contactEndpoint}create/`,
      formData
    );
  }

  getProjectDetails(projectId: string) {
    return this.http.get<any>(
      `${environment.apiBaseUrl}${getProjectsEndpoint}${projectId}`
    );
  }
}
