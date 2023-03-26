import { Component, OnDestroy, OnInit } from '@angular/core';
import { EpicService } from '../../../core/services/epic.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StepperService } from '../stepper.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs';
import { EpicResponse } from '../../../core/interfaces/epic.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-epics',
  templateUrl: './epics.component.html',
  styleUrls: ['./epics.component.scss'],
})
export class EpicsComponent implements OnInit, OnDestroy {
  epicGroup: FormGroup;
  sub$ = new Subject();
  goNextStep: boolean;
  createEpics: boolean = false;
  epicType: EpicResponse;
  active: boolean = false;
  constructor(
    private epicService: EpicService,
    public stepperService: StepperService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.epicGroup = new FormGroup({
      id: new FormControl(null),
      name: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
    });
    this.goNextStep = false;
  }

  toggleUserForm() {
    this.createEpics = !this.createEpics;
    this.goNextStep = false;
  }
  saveEpics() {
    if (this.epicGroup.valid) {
      this.active = true;
      this.epicService
        .createEpic(this.epicGroup.value)
        .pipe(takeUntil(this.sub$))
        .subscribe((res) => {
          this.epicType = res;
          setTimeout(() => {
            this.goNextStep = true;
            this.active = false;
          }, 1000);
          this._snackBar.open('Epic Created', 'Close', { duration: 1000 });
          console.log(res);
        });
    }
  }
  submit() {
    if (this.goNextStep) {
      this.stepperService.goToStep(5);
    }
  }

  ngOnDestroy() {
    this.sub$.next(null);
    this.sub$.complete();
  }
}
