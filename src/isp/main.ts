import { Messaging } from './services/messaging';
import { Order } from './classes/order';
import { Persistency } from './persistency';
import { ShoppingCart } from './classes/shopping-cart';
import { Product } from './classes/product';
import { NoDiscount } from './classes/discount';
import { EnterpriseCustomer, IndividualCustomer } from './classes/customer';

// = == =========INJEÇÃO DEPENDÊNCIA===================== == =

// const fiftyPercentDiscount = new FiftyPercentDiscount();
// const tenPercentDiscount = new TenPercentDiscount();
const noDiscount = new NoDiscount();
const shoppingCart = new ShoppingCart(noDiscount);
const messaging = new Messaging();
const persistency = new Persistency();
//const individualCustomer = new IndividualCustomer('Ivano ', 'Gonçalves', '111.111.111-1');
const enterpriseCustomer = new EnterpriseCustomer('EMPRESA ', '111.111.111-1');
const order = new Order(shoppingCart, messaging, persistency, enterpriseCustomer);

// = == =================================================== == =

shoppingCart.addItem(new Product('Camiseta', 49.9));
shoppingCart.addItem(new Product('Caderno', 9.9));
shoppingCart.addItem(new Product('Lápis', 1.59));

console.log(shoppingCart.items);
console.log(shoppingCart.total());
console.log(shoppingCart.totalWithDiscount());
console.log(order.orderStatus);
order.checkOut();
console.log(order.orderStatus);
