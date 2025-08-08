import { Injectable } from '@angular/core';
import { Client, ID, Models, Storage, UploadProgress } from 'appwrite';
import { Subject } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class AppwriteService {
  private readonly PROJECT_ID = environment.appwrite.project_id;
  private readonly BUCKET_ID = environment.appwrite.bucket_id;
  private readonly ENDPOINT = environment.appwrite.endpoint;

  private client: Client;
  private readonly storage: Storage;
  public fileCreated = new Subject<Models.File>();
  public uploadProgress = new Subject<UploadProgress>();


  constructor() {
    this.client = new Client();
    this.client
      .setEndpoint(this.ENDPOINT)
      .setProject(this.PROJECT_ID);
    this.storage = new Storage(this.client);
  }

  // creates a file [NEED TEST]
  createFile(file: File) {
    const id = ID.unique();
    this.storage
      .createFile(this.BUCKET_ID, id, file, [], (p) => {
        this.uploadProgress.next(p);
      })
      .then((file) => {
        this.fileCreated.next(file);
      })
      .catch((err) => {
        throw err;
      });
    return id;
  }

  // This only generates the url of the file for view
  getFileUrl(id: string) {
    return `${this.ENDPOINT}/storage/buckets/${this.BUCKET_ID}/files/${id}/view?project=${this.PROJECT_ID}`;
  }

}
