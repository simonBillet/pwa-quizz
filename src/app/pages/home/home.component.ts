import { Component, OnInit } from '@angular/core';
import {User} from "../../models/user";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  public lastUser!: User;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.lastUser = {
        nom: params['nom']?? "",
        points: params['points']?? 0,
        questionRepondues: params['questionRepondues']?? "",
      };
    });
  }

  startGame(nameUser: string) {
    if (nameUser == "")
    {
      return;
    }

    let user: User = {
      nom: nameUser,
      points: 0,
      questionRepondues: 0
    }

    this.router.navigate(['/question'], {
      queryParams: { nom: user.nom, points: user.points, questionRepondues: user.questionRepondues}
    });
  }
}
