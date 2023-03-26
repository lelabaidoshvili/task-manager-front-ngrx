import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import {AuthService} from "../../core/services/auth.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.scss"]
})
export class AuthComponent implements OnInit {


  constructor() {

  }

  ngOnInit(): void {


  }



}
