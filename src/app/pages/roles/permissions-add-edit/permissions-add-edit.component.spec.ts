import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionsAddEditComponent } from './permissions-add-edit.component';

describe('PermissionsAddEditComponent', () => {
  let component: PermissionsAddEditComponent;
  let fixture: ComponentFixture<PermissionsAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PermissionsAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PermissionsAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
