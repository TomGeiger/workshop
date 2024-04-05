

import { Component, OnInit } from '@angular/core';
import { QuizService } from './quiz.service';

@Component({
  selector: 'app-life-quiz',
  templateUrl: './life-quiz.component.html',
  styleUrls: ['./life-quiz.component.scss']
})
export class LifeQuizComponent implements OnInit {
  questions: any[] = [];
  filteredQuestions: any[] = [];
  answeredQuestions: any[] = [];
  currentQuestion: any;
  userAnswer: string = ''; // user answer

  constructor(private quizService: QuizService) { }

  ngOnInit(): void {
    // this.getQuestions();
    this.loadQuestions();
  }

  setCurrentQuestion(question: any): void {
    this.currentQuestion = question;
    this.userAnswer = question.answer || '';
  }

  showResults(): void {
    // grab all the questions from local storage
    const questionsFromLocalStorage = this.quizService.getQuizQuestions();
    // filter out the questions that have answers
    const answeredQuestions = questionsFromLocalStorage.filter((question: any) => question.answer);
    // sort them by category
    const sortedQuestions = answeredQuestions.sort((a, b) => a.category.localeCompare(b.category));
    this.answeredQuestions = sortedQuestions;
    console.log(sortedQuestions);
  }

  printAnswers(): void {
    window.print();
  }

  copyAnswers(): void {
    let answersText = '';
    this.answeredQuestions.forEach((question, index) => {
      answersText += `Question ${index + 1}:\n\n`;
      answersText += `• ${question.question}\n`;
      answersText += `   - ${question.subquestions[0]}\n\n`;
      answersText += `Answer:\n ${question.answer}\n\n`;
      if (index !== this.answeredQuestions.length - 1) {
        answersText += '--------------------------------------\n';
      }
    });
  
    navigator.clipboard.writeText(answersText)
      .then(() => {
        console.log('Answers copied to clipboard');
      })
      .catch(error => {
        console.error('Failed to copy answers to clipboard:', error);
      });
  }
  
  copyAnswers_(): void {
    let answersText = '';
    this.answeredQuestions.forEach((question, index) => {
      answersText += `Question ${index + 1}:\n\n`;
      answersText += `• ${question.question}\n`;
      answersText += `   - ${question.subquestions[0]}\n\n`;
      // Apply bold styling to the "Answer" section
      answersText += `<b>Answer:</b>\n ${question.answer}\n\n`;
      if (index !== this.answeredQuestions.length - 1) {
        answersText += '--------------------------------------\n';
      }
    });
  
    navigator.clipboard.writeText(answersText)
      .then(() => {
        console.log('Answers copied to clipboard');
      })
      .catch(error => {
        console.error('Failed to copy answers to clipboard:', error);
      });
  }
  

  copyAnswersxx(): void {
    const answersText = this.answeredQuestions.map(question => `${question.question}\n\n${question.subquestions[0]}\nAnswer: ${question.answer}`).join('\n\n');
    navigator.clipboard.writeText(answersText)
      .then(() => {
        console.log('Answers copied to clipboard');
        // bootstrap alert popup
      })
      .catch(error => {
        console.error('Failed to copy answers to clipboard:', error);
      });
  }

  loadQuestions(): void {
    // Fetch questions from JSON file
    this.quizService.getQuestions().subscribe(
      (questionsFromJson: any[]) => {
        // Retrieve questions with answers from local storage
        const questionsFromLocalStorage = this.quizService.getQuizQuestions();

        // Merge questions from JSON file and local storage
        this.questions = this.mergeQuestions(questionsFromJson, questionsFromLocalStorage);
        this.filteredQuestions = this.questions;
        console.log(this.filteredQuestions)
      },
      (error) => {
        console.error('Error loading questions:', error);
      }
    );
  }

  mergeQuestions(questionsFromJson: any[], questionsFromLocalStorage: any[]): any[] {
    const mergedQuestions: any[] = [];

    // Add questions from JSON file
    mergedQuestions.push(...questionsFromJson);

    // Merge questions from local storage
    questionsFromLocalStorage.forEach((question: any) => {
      const existingQuestionIndex = mergedQuestions.findIndex((q: any) => q.question_number === question.question_number);
      if (existingQuestionIndex !== -1) {
        // Update question with answer from local storage
        mergedQuestions[existingQuestionIndex].answer = question.answer;
      } else {
        // Add question from local storage if not already present
        mergedQuestions.push(question);
      }
    });

    return mergedQuestions;
  }

  categoryFilter(category: string): void {
    if (category === 'all') {
      this.filteredQuestions = this.questions;
      console.log(this.filteredQuestions, category)
      return;
    }
    this.filteredQuestions = this.questions.filter(question => question.category === category);
    console.log(this.filteredQuestions, category)
  }

  updateAnswer(): void {
    // Check if currentQuestion is defined and if userAnswer is not empty
    if (this.currentQuestion && this.userAnswer.trim() !== '') {
      // Assuming question has an 'answer' property where we'll store user's answer
      this.currentQuestion.answer = this.userAnswer;
      // Update the answer in localStorage
      this.quizService.updateAnswer(this.currentQuestion, this.userAnswer);
      // Clear userAnswer
      this.userAnswer = '';
    }
    console.log(this.currentQuestion)
  }

  clear(): void {
    this.quizService.clearLocalStorage();
    this.loadQuestions();
  }
}
