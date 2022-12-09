import { FormControl } from '@angular/forms';

export interface User extends UserData {
  id: number;
}

export interface UserForm {
  name: FormControl<string | null>;
  username: FormControl<string | null>;
  email: FormControl<string | null>;
  phone: FormControl<string | null>;
}

export interface ResponseNewUser {
  id: number;
  user: User;
}

export interface UserData {
  name: string | null;
  username: string | null;
  email: string | null;
  phone: string | null;
}
