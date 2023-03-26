import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { BoardResponse } from 'src/app/core/interfaces';
import { BoardFacadeService } from 'src/app/facades/board-facade.service';

@Component({
  selector: 'app-board-tables',
  templateUrl: './board-tables.component.html',
  styleUrls: ['./board-tables.component.scss'],
})
export class BoardTablesComponent implements OnInit {
  boardsArr: BoardResponse[] = [];
  displayedColumns: string[] = ['name', 'description', 'actions'];

  sub$ = new Subject();
  constructor(
    private boardFacadeService: BoardFacadeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.boardFacadeService
      .getBoards()
      .pipe(takeUntil(this.sub$))
      .subscribe((boards) => {
        this.boardsArr = boards;
        console.log('here are boardsArr');
        console.log(this.boardsArr);
      });
  }

  updateBoard(id: number) {
    this.router.navigate([`stepper/boards/edit/${id}`]);
  }

  deleteBoard(id: number) {
    this.boardFacadeService.deleteBoardById(id).subscribe((res) => {
      console.log(res);
      this.boardFacadeService
        .getBoards()
        .pipe(takeUntil(this.sub$))
        .subscribe((res) => {
          this.boardsArr = res;
        });
    });
  }

  ngOnDestroy() {
    this.sub$.next(null);
    this.sub$.complete();
  }
}
