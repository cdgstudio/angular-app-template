import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'environments';

@Injectable({
  providedIn: 'root',
})
export class YtChannelStatisticsService {
  constructor(private httpClient: HttpClient) {}

  getChannelStatistics(channel: string): Observable<any> {
    const params = new HttpParams({ fromObject: { channel } });

    return this.httpClient.get(`${environment.apiUrl}/youtube`, { params });
  }
}
