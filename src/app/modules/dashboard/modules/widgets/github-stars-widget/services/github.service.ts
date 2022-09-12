import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  constructor(private http: HttpClient) {}

  getProjectStars(organization: string, repo: string): Observable<number> {
    return this.http
      .get<any>(`https://api.github.com/repos/${organization}/${repo}`)
      .pipe(map((response) => response.stargazers_count));
  }
}
