import { OrderStatus } from './interfaces/ordem-status';
import { Messaging } from '../services/messaging';
import { Persistency } from '../persistency';
import { ShoppingCart } from './shopping-cart';

export class Order {
  private _orderStatus: OrderStatus = 'open';

  // injeção de dependência
  constructor(
    private readonly cart: ShoppingCart,
    private readonly messaging: Messaging,
    private readonly persistency: Persistency,
  ) {}

  get orderStatus(): OrderStatus {
    return this._orderStatus;
  }

  checkOut(): void {
    if (this.cart.isEmpty()) {
      console.log('Seu carrinho está vazio 🛒.');
      return;
    }
    this._orderStatus = 'closed';
    this.messaging.sendMessage(`Seu pedido com total de ${this.cart.total()} foi recebido.`);
    this.persistency.saveOrder();
    this.cart.clear();
  }
}
