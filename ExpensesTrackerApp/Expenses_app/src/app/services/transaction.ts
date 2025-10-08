import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaction } from '../models/transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  
  private apiUrl = 'https://localhost:7274/api/Transactions';

  constructor(private http: HttpClient) 
  { 

  }

    getTransactions() : Observable<Transaction[]> {
      return this.http.get<Transaction[]>(this.apiUrl + '/all');
    }

getTransactionById(id: number) : Observable<Transaction> {
  // ensure there's a slash between base url and id, e.g. /api/Transactions/123
  return this.http.get<Transaction>(`${this.apiUrl}/${id}`);
}

addTransaction(transaction: Transaction) : Observable<Transaction> {
  return this.http.post<Transaction>(this.apiUrl + '/Create', transaction);
}

updateTransaction(id: number, transaction: Transaction) : Observable<void> {
  return this.http.put<void>(this.apiUrl + '/update/' + id, transaction);
}

deleteTransaction(id: number) : Observable<void> {
  return this.http.delete<void>(this.apiUrl + '/Delete/' + id);
}

}
