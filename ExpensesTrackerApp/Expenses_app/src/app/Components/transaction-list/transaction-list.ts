import { Component, OnInit } from '@angular/core';
import { Transaction } from '../../models/transaction';
import { CommonModule } from '@angular/common';
import { TransactionService } from '../../services/transaction';
import { Router } from '@angular/router';



@Component({
  selector: 'app-transaction-list',
  imports: [CommonModule],
  templateUrl: './transaction-list.html',
  styleUrl: './transaction-list.css'
})
export class TransactionList implements OnInit {
  transactions : Transaction[] = [];

    constructor(private transactionService : TransactionService,private router:Router) { }
    
    ngOnInit(): void {
     this.transactionService.getTransactions().subscribe((data: Transaction[]) => {
      this.transactions = data;
     });
    }

  getTotalIncome(): number {
    return this.transactions
      .filter(t => t.type === 'Income')
      .reduce((sum, t) => sum + t.amount, 0);
  }

  getTotalExpense(): number {
    return this.transactions
      .filter(t => t.type === 'Expense')
      .reduce((sum, t) => sum + t.amount, 0);
  }
  getBalance(): number {
    return this.getTotalIncome() - this.getTotalExpense();
  }

  onEdit(transaction: Transaction): void {  
    if(transaction.id !== undefined){
      this.router.navigate(['/edit/', transaction.id]);
    }

    // Implement your edit logic here, e.g., navigate to an edit form
  }

  loadTransactions(): void {
    this.transactionService.getTransactions().subscribe((data: Transaction[]) => {
      this.transactions = data;
     }
    );
  }

onDelete(transaction: Transaction): void {
  if(transaction.id !== undefined){
    if(confirm(`Are you sure you want to delete transaction with id ${transaction.id}?`)){
      this.transactionService.deleteTransaction(transaction.id).subscribe({
        next: () => {
           console.log("Data for delete transaction",transaction); 
          // On successful deletion, remove the transaction from the local array to update the UI
          this.loadTransactions();
        },
        error: (error) => {
          console.error('Error deleting transaction:', error);
        }
      });
    }
  }
}


}
