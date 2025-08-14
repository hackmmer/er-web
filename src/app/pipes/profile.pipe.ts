import { inject, Pipe, PipeTransform } from '@angular/core';
import { IUser } from '@models/user';
import { AppwriteService } from '@services/appwrite.service';

@Pipe({
  name: 'profile'
})
export class ProfilePipe implements PipeTransform {
  appwrite = inject(AppwriteService);

  transform(value: IUser): string {
    if (value.profileImage)
      return value.profileImage;
    return this.appwrite.getInitials(value.fullName);
  }

}
