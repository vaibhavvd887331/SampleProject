import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './Components/header/header';
import { Footer } from './Components/footer/footer';
import { TransactionList } from './Components/transaction-list/transaction-list';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Header,Footer,TransactionList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Expenses_app');
}
