import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Subject, switchMap, takeUntil } from 'rxjs';
import { IssueTypeEnum } from 'src/app/core/enums/issue-type.enum';
import { IssueTypeResponse } from 'src/app/core/interfaces/issuetype.interface';
import { IssueTypeFacadeService } from 'src/app/facades/issue-type.facade.service';
import { UsersFacadeService } from 'src/app/facades/users-facade.service';
import { DialogComponent } from '../dialog/dialog';

import { StepperService } from '../stepper.service';

@Component({
  selector: 'app-issue-type',
  templateUrl: './issue-type.component.html',
  styleUrls: ['./issue-type.component.scss'],
})
export class IssueTypeComponent implements OnInit, OnDestroy {
  stepperService: StepperService = inject(StepperService);

  issues = IssueTypeEnum;
  issueEnum = [];
  sub$ = new Subject<any>();
  active: boolean = false;
  issueTypes: IssueTypeResponse[] = [];

  issueTypeFormGroup: FormGroup;
  columnGroup: FormGroup;
  icons: string[] = [
    'assets/images/Bug.png',
    'assets/images/Task.png',
    'assets/images/Sub-Task.png',
    'assets/images/Spike.png',
    'assets/images/Research.png',
    'assets/images/Test.png',
  ];
  goNextStep: boolean;
  createIssueType: boolean = false;
  //--
  additionalIssue: boolean;
  issueTypeId: number;
  update: boolean = false;
  //--

  constructor(
    private issueTypeFacadeService: IssueTypeFacadeService,
    private usersFacadeService: UsersFacadeService,
    private route: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar,
    public matDialog: MatDialog
  ) {
    this.issueEnum = Object.keys(this.issues);
  }

  ngOnInit(): void {
    //--
    this.issueTypeFacadeService.additionalIssue$.subscribe((res) => {
      this.additionalIssue = res;
      console.log('additional issue boolean');
      console.log(this.additionalIssue);
    });
    //--
    console.log(this.issueEnum);
    this.issueTypeFormGroup = new FormGroup({
      id: new FormControl(null),
      name: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      icon: new FormControl(null, Validators.required),
      color: new FormControl(null, Validators.required),
      // isActive: new FormControl(null, Validators.required),
      type: new FormControl(null, Validators.required),
      issueTypeColumns: new FormArray([]),
    });

    //--
    this.route.params
      .pipe(
        switchMap((params: any) => {
          if (params['id']) {
            this.update = true;
            this.issueTypeId = params['id'];
            return this.issueTypeFacadeService.getIssueTypeById(params['id']);
          }
          return of(null);
        })
      )
      .subscribe((response) => {
        if (response) {
          const issueColumns = response.issueTypeColumns;
          const columnsArray = this.issueTypeFormGroup.get(
            'issueTypeColumns'
          ) as FormArray;
          this.issueTypeFormGroup.patchValue(response);
          // columnsArray.removeAt(0);
          issueColumns.forEach((column, index) => {
            columnsArray.push(
              new FormGroup({
                id: new FormControl(column.id),
                name: new FormControl(column.name, Validators.required),
                filedName: new FormControl(
                  column.filedName,
                  Validators.required
                ),
              })
            );
          });
        }
      });
    //--
  }

  get issueTypeColumnArray() {
    return <FormArray>this.issueTypeFormGroup.get('issueTypeColumns');
  }

  addIssueTypeColumn() {
    this.columnGroup = new FormGroup({
      name: new FormControl(null, Validators.required),
      filedName: new FormControl(null, Validators.required),
      // isRequired: new FormControl(null, Validators.required),
      // issueTypeId: new FormControl(null, Validators.required),
    });
    this.issueTypeColumnArray.push(this.columnGroup);
  }

  deleteInputsRow(index: number) {
    this.issueTypeColumnArray.removeAt(index);
  }

  toggleIssueForm() {
    this.createIssueType = !this.createIssueType;
    this.goNextStep = false;
  }

  saveIssueType() {
    this.issueTypeFormGroup.markAllAsTouched();
    if (this.issueTypeFormGroup.invalid) return;
    this.active = true;
    if (!this.issueTypeFormGroup.value.id) {
      this.issueTypeFacadeService
        .createIssueType(this.issueTypeFormGroup.value)
        .pipe(
          takeUntil(this.sub$),
          switchMap(() => this.issueTypeFacadeService.getMyIssueTypes$())
        )
        .subscribe((res) => {
          this.issueTypeColumnArray.clear();

          this.issueTypes = res;
          this._snackBar.open('Issue Created', 'Close', { duration: 1000 });
          if (this.additionalIssue) {
            this.openDialog();
            this.goNextStep = false;
          }
          setTimeout(() => {
            this.active = false;
            this.goNextStep = true;
          }, 3000);

          this.createIssueType = false;
          this.issueTypeFormGroup.reset();
        });
    } else {
      this.issueTypeFacadeService
        .updateIssueType(
          this.issueTypeFormGroup.value.id,
          this.issueTypeFormGroup.value
        )
        .pipe(takeUntil(this.sub$))
        .subscribe((response: IssueTypeResponse) => {
          this.issueTypeColumnArray.clear();
          this.goNextStep = false;
          this.router.navigate([`/task`]);

          console.log(response);
        });
    }
  }
  submit() {
    this.stepperService.goToStep(3);
    this.usersFacadeService.additionalUser.next(false);
  }
  openDialog() {
    let dialogRef = this.matDialog.open(DialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.router.navigate(['/task']);
      }
    });
  }

  goTo() {
    this.stepperService.goToStep(3);
  }
  ngOnDestroy(): void {
    this.sub$.next(null);
    this.sub$.complete();
  }
}
