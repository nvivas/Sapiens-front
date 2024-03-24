import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { PurchaseService } from 'src/app/services/purchase.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  itemCount: number = 0;
  itemCountSubscription: Subscription | undefined;

  constructor(private purchaseService: PurchaseService) {}
  ngOnInit() {
    this.updateItemCount();
    this.itemCountSubscription = this.purchaseService
      .getItemCountObservable()
      .subscribe((count) => {
        this.itemCount = count;
      });

    this.itemCount = this.purchaseService.getItemCount();
    this.itemCountSubscription = this.purchaseService
      .getItemCountObservable()
      .subscribe((count) => {
        this.itemCount = count;
      });

    this.purchaseService.getClearCartObservable().subscribe(() => {
      this.itemCount = 0; // Reiniciar el contador
    });
  }

  ngOnDestroy() {
    if (this.itemCountSubscription) {
      this.itemCountSubscription.unsubscribe();
    }
  }

  updateItemCount() {
    this.itemCount = this.purchaseService.getItemCount();
  }
}
