import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private quizUrl = 'assets/questions.json'; // Assuming questions.json is in the assets folder
  private localStorageKey = 'quizQuestions';

  constructor(private http: HttpClient) { }

  getQuestions(): Observable<any[]> {
    return this.http.get<any[]>(this.quizUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateAnswer(question: any, userAnswer: string): void {
    // Get existing questions from localStorage
    const storedQuestionsString = localStorage.getItem(this.localStorageKey);
    const storedQuestions = storedQuestionsString ? JSON.parse(storedQuestionsString) : [];
    
    // Check if the question already exists in the stored questions
    const existingQuestion = storedQuestions.find((storedQuestion: any) => storedQuestion.question_number === question.question_number);
    
    // If the question exists, update its answer
    if (existingQuestion) {
      existingQuestion.answer = userAnswer;
    } else {
      // Otherwise, add the question with its answer to the stored questions
      const questionWithAnswer = { ...question, answer: userAnswer };
      storedQuestions.push(questionWithAnswer);
    }
    
    // Save updated questions back to localStorage
    localStorage.setItem(this.localStorageKey, JSON.stringify(storedQuestions));
  }
    
  clearLocalStorage(): void {
    // Clear the localStorage item
    localStorage.removeItem(this.localStorageKey);
  }

  getQuizQuestions(): any[] {
    // Retrieve questions from localStorage
    const storedQuestionsString = localStorage.getItem(this.localStorageKey);
    return storedQuestionsString ? JSON.parse(storedQuestionsString) : [];
  }
  
  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError('An error occurred while fetching questions. Please try again later.');
  }
  
}
