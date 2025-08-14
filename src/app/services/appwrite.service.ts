import { Injectable } from '@angular/core';
import {
  Account,
  Avatars,
  Client,
  ID,
  Models,
  Storage,
  UploadProgress,
} from 'appwrite';
import { Subject } from 'rxjs';
import { environment } from '@env/environment';
import { Buffer } from 'buffer';

@Injectable({
  providedIn: 'root',
})
export class AppwriteService {
  private readonly PROJECT_ID = environment.appwrite.project_id;
  private readonly BUCKET_ID = environment.appwrite.bucket_id;
  private readonly ENDPOINT = environment.appwrite.endpoint;
  private readonly APIKEY = environment.appwrite.api_key;

  private readonly client: Client;
  private readonly storage: Storage;
  private readonly avatars: Avatars;

  public fileCreated = new Subject<Models.File>();
  public uploadProgress = new Subject<UploadProgress>();

  constructor() {
    this.client = new Client();
    this.client
      .setEndpoint(this.ENDPOINT)
      .setProject(this.PROJECT_ID)
      .setDevKey(this.APIKEY);

    // Init Services
    this.storage = new Storage(this.client);
    this.avatars = new Avatars(this.client);
  }

  // Avatar Methods
  // Get image of name initials encoded in base64
  getInitials(name: string) {
    return this.avatars.getInitials(name, 512, 512);
  }

  // Storage Methods
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

  async deleteFile(fileId: string) {
    return await this.storage.deleteFile(this.BUCKET_ID, fileId);
  }

  // This only generates the url of the file for view
  getFileViewUrl(id: string) {
    return this.storage.getFileView(this.BUCKET_ID, id);
  }
}
