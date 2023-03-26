import {Component, OnInit, Inject, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {UsersFacadeService} from "../../../facades/users-facade.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Subject} from "rxjs";
import {Users} from "../../../core/interfaces";
import {takeUntil} from "rxjs";
@Component({
  selector: 'app-users-edit',
  templateUrl: './users-edit.component.html',
  styleUrls: ['./users-edit.component.scss']
})
export class UsersEditComponent implements OnInit, OnDestroy {
  createUser: boolean = false;
  sub$ = new Subject<any>();
  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    firstName: new FormControl(null, [Validators.required]),
    lastName: new FormControl(null, [Validators.required]),
    mobileNumber: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),

  });

  constructor(
    public dialogRef: MatDialogRef<UsersEditComponent>,
    private userService: UsersFacadeService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit(): void {
    if (this.data.userId) {
      this.userService.getUserById(this.data.userId)
        .subscribe((res) => {
          this.form.patchValue(res);
        })
    }
  }
  onSubmit() {

    this.userService.updateUserById(this.form.value.id,
      this.form.value)
      .pipe(takeUntil(this.sub$))
      .subscribe((response: Users) => {
        this.dialogRef.close(response);

        console.log('updated user:');
        console.log(response);
      });


  }

  ngOnDestroy(): void {
    this.sub$.next(null);
    this.sub$.complete();
  }

}
