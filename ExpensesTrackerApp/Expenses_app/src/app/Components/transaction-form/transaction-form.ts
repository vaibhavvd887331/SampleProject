import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionService } from '../../services/transaction';

@Component({
  selector: 'app-transaction-form',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './transaction-form.html',
  styleUrl: './transaction-form.css'
})
export class TransactionForm {

transactionForm : FormGroup;
incomeCategories = ['Salary', 'Business', 'Investment', 'Freelance','Other'];
expenseCategories = ['Food', 'Rent', 'Utilities', 'Entertainment', 'Travel', 'Health', 'Shopping', 'Other'];

availableCategories : string[] = [];

editMode : boolean = false;
transactionId? : number;


constructor(private fb : FormBuilder,private router : Router,private transactionService : TransactionService,
  private activatedRoute : ActivatedRoute ) {
  this.transactionForm = this.fb.group({
   type: ['Expense', Validators.required],
   category: ['', Validators.required],
   amount: [0, [Validators.required, Validators.min(0)]],
   createdAt : [new Date(), Validators.required]
  });
}
  
ngOnInit(): void {
  const initialType = this.transactionForm.get('type')?.value;
this.updateAvailableCategories(initialType);
  this.transactionForm.patchValue({ category: '' });

  // Check if we are in edit mode by looking for the 'id' parameter in the route
  this.activatedRoute.paramMap.subscribe(params => {
    const idParam = params.get('id'); 
    if (idParam) {
      this.editMode = true;
      this.transactionId = +idParam;
      // Fetch the transaction details using the ID and populate the form
      this.loadTransactionDetails(this.transactionId);
    }

  });
}

onTypeChange(): void {
  const selectedType = this.transactionForm.get('type')?.value;
  this.updateAvailableCategories(selectedType);
  this.transactionForm.patchValue({ category: '' });    
}

updateAvailableCategories(type : string): void {

  this.availableCategories = type === 'Expense' ? this.expenseCategories:  this.incomeCategories;

}

onSubmit(): void {
      if(this.transactionForm.valid){
        const formData = this.transactionForm.value;
        console.log('Form Submitted:', formData);
        // You can now send formData to your backend or service
        console.log('Form Data:', formData);

    if (this.editMode && this.transactionId) {
      this.transactionService.updateTransaction(this.transactionId, formData).subscribe({
        next: (response) => {
          console.log('Transaction updated successfully:', response);
          // navigate to the transaction list route (defined as 'transaction' in app.routes.ts)
          this.router.navigate(['/transaction']);
        },
        error: (error) => {
          console.error('Error updating transaction:', error);
        }
      })  
    }else {

        this.transactionService.addTransaction(formData).subscribe({
          next: (response) => {
            console.log('Transaction added successfully:', response);
            // navigate to the transaction list route (defined as 'transaction' in app.routes.ts)
            this.router.navigate(['/transaction']);
          },
          error: (error) => {
            console.error('Error adding transaction:', error);
          }   
        }); 
      } 
    }

}

loadTransactionDetails(transactionId: number) {
    this.transactionService.getTransactionById(transactionId).subscribe({
      next: (transaction) => {
     console.log("Data for transaction",transaction); 
        this.updateAvailableCategories(transaction.type);

          this.transactionForm.patchValue({
            type: transaction.type,
            category: transaction.category, 
            amount: transaction.amount,
   
          })
      },
      error: (error) => {
        console.error('Error fetching transaction details:', error);
      } 
    });
  }

onReset(): void {
 this.router.navigate(['/transaction']);
}

}