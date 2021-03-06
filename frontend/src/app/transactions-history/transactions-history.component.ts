import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Transaction } from '../models/user.transaction';
import { TransactionService } from '../services/transaction/transaction.service';
import { UserService } from '../services/user/user.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-transactions-history',
  templateUrl: './transactions-history.component.html',
  styleUrls: ['./transactions-history.component.css'],
})
export class TransactionsHistoryComponent implements OnInit, OnDestroy {
  transactions: Transaction[] = [];
  transactionsSub: Subscription;
  isAuth: boolean = false;
  authSub!: Subscription;

  constructor(
    public transactionService: TransactionService,
    public userService: UserService,
    public dialog: MatDialog
  ) {
    this.transactionsSub = this.transactionService
      .getTransactionsUpdatedListener()
      .subscribe((transactions: Transaction[]) => {
        this.transactions = transactions;
      });
  }

  ngOnInit(): void {
    this.isAuth = this.userService.getIsAuthenticated();
    this.onLogin(this.isAuth);
    this.authSub = this.userService
      .getAuthStatusListener()
      .subscribe((authStatus: boolean) => {
        this.isAuth = authStatus;
        this.onLogin(authStatus);
      });
  }

  onLogin(authStatus: boolean) {
    if (authStatus === true) {
      this.transactionService.getTransactions();
      this.transactionsSub = this.transactionService
        .getTransactionsUpdatedListener()
        .subscribe((transactions: Transaction[]) => {
          this.transactions = transactions;
        });
    }
  }

  ngOnDestroy(): void {
    this.transactionsSub.unsubscribe();
  }

  onDelete(id: string){
    console.log(id);
    this.transactionService.deleteTransaction(id);
  }
}
