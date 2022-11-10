import { Component, OnInit } from '@angular/core';
import {Question} from "../../models/question";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {User} from "../../models/user";
import QuestionsJson from "../../../assets/data/questions.json";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.sass']
})
export class QuestionComponent implements OnInit {
  questions: Question[] = [];
  questionSelected!: Question;
  user!: User;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.user = {
        nom: params['nom'],
        points: params['points'],
        questionRepondues: params['questionRepondues'],
      };
    });

    this.GetDataQuestions();

    this.questionSelected = this.questions[this.user.questionRepondues];
  }

  SendResponse(responseSelected: String) {
    this.user.questionRepondues++;
    if (this.questionSelected.reponse == responseSelected) {
      this.user.points++;
    }

    this.NextQuestion();
  }

  NextQuestion() {
    if (this.user.questionRepondues < 5) {
      this.questionSelected = this.questions[this.user.questionRepondues];
      return;
    }

    this.EndQuizz();
  }

  EndQuizz() {
    this.router.navigate(['/home'], {
      queryParams: { nom: this.user.nom, points: this.user.points, questionRepondues: this.user.questionRepondues}
    });
  }

  GetDataQuestions() {
    for (const questionJson of QuestionsJson)
    {
      const question: Question = {
        "id": questionJson.id,
        "question": questionJson.question,
        "solution1": questionJson.solution1,
        "solution2": questionJson.solution2,
        "solution3": questionJson.solution3,
        "solution4": questionJson.solution4,
        "reponse": questionJson.reponse,
      }

      this.questions.push(question);
    }
  }
}
