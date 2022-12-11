import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User, UserData, UserForm } from '../../models/user';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormUserComponent implements OnInit {
  public form!: FormGroup<UserForm>;
  public user!: User;

  constructor(
    public dialogRef: MatDialogRef<FormUserComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private data: { user: User }
  ) {}

  public ngOnInit(): void {
    this.form = this.createForm();
    this.user = this.data?.user;

    if (this.user) {
      this.form.patchValue(this.user);
    }
  }

  public onClose(): void {
    this.dialogRef.close(false);
  }

  public onSubmit(): void {
    const val: Partial<UserData> = this.form.value;
    const res: User | Partial<UserData> = this.user?.id
      ? { id: this.user.id, ...val }
      : val;
    this.dialogRef.close(res);
  }

  private createForm(): FormGroup<UserForm> {
    return new FormGroup<UserForm>({
      name: this.fb.control('', [Validators.required]),
      username: this.fb.control('', [Validators.required]),
      phone: this.fb.control('', [Validators.required]),
      email: this.fb.control('', [Validators.required, Validators.email]),
    });
  }
}
