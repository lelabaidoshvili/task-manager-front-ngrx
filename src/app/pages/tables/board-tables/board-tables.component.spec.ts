import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardTablesComponent } from './board-tables.component';

describe('BoardTablesComponent', () => {
  let component: BoardTablesComponent;
  let fixture: ComponentFixture<BoardTablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardTablesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
