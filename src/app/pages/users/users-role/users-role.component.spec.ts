import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersRoleComponent } from './users-role.component';

describe('UsersRoleComponent', () => {
  let component: UsersRoleComponent;
  let fixture: ComponentFixture<UsersRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersRoleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
