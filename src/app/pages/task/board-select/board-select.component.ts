import { Component, Input, OnInit } from '@angular/core';
import { BoardFacadeService } from '../../../facades/board-facade.service';
import { BoardResponse } from '../../../core/interfaces';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TasksFacadeService } from 'src/app/facades/tasks-facade.sevice';

@Component({
  selector: 'app-board-select',
  templateUrl: './board-select.component.html',
  styleUrls: ['./board-select.component.scss'],
})
export class BoardSelectComponent implements OnInit {
  @Input() dialogRef: MatDialogRef<BoardSelectComponent>;
  myBoard: BoardResponse[] = [];

  constructor(
    private boardFacadeService: BoardFacadeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.boardFacadeService.getBoards().subscribe(
      (boards) => {
        console.log(boards);
        this.myBoard = boards;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  clickOnCard(boardId) {
    console.log(boardId);

    this.router.navigate([`/task/project-board/${boardId}`]);

    this.dialogRef.close();
  }
}
