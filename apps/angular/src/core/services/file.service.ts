import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, switchMap } from 'rxjs';
import { S3DirectParamsBody, S3DirectUploadInfo } from '@js-camp/core/dtos/s3.dto';

import { AppUrlConfigService } from './app-url-config.service';

const S3_DESTINATION = 'anime_images';

/** Service for files upload. */
@Injectable({
  providedIn: 'root',
})
export class FileService {

  public constructor(
    private readonly http: HttpClient,
    private readonly appUrls: AppUrlConfigService,
  ) {
  }

  /**
   * Upload image to s3.
   * @param file File.
   * @returns URL to file.
   */
  public uploadFile(file: File): Observable<string> {
    const s3DirectParamsBody: S3DirectParamsBody = {
      dest: S3_DESTINATION,
      filename: file.name,
      content_type: file.type,
    };
    return this.http.post<S3DirectUploadInfo>(
      this.appUrls.s3directUrls.getParams,
      s3DirectParamsBody,
    ).pipe(
      switchMap(uploadInfo => {
        const formData = new FormData();

        for (const option of Object.keys(uploadInfo)) {
          // Skip `form_action` because it's url for upload
          if (option === 'form_action') {
            continue;
          }
          formData.append(option, uploadInfo[option]);
        }
        formData.append('file', file);

        // Set response type 'text' because s3 returns XML.
        // Using Object type because `responseType` can't be set directly
        const options: Object = { observe: 'body', responseType: 'text' };
        return this.http.post<string>(
          uploadInfo.form_action,
          formData,
          options,
        );
      }),
      map((resultXml: string) => {
        const parser = new DOMParser();
        const xmlDocument = parser.parseFromString(resultXml, 'application/xml').documentElement;
        return xmlDocument.querySelector('Location')?.textContent ?? '';
      }),
    );
  }
}
