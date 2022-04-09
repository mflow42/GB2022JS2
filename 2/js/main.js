class ProductList {
  constructor(container = ".products") {
    this.container = container;
    this.goods = [];
    this._fetchProducts(); //рекомендация, чтобы метод был вызван в текущем классе
    this.render(); //вывод товаров на страницу
    this.total = 0;
    this._getTotal(); //получение суммы цен всех товаров
  }
  _fetchProducts() {
    this.goods = [
      { id: 1, title: "Notebook", price: 2000 },
      { id: 2, title: "Mouse", price: 20 },
      { id: 3, title: "Keyboard", price: 200 },
      { id: 4, title: "Gamepad", price: 50 },
    ];
  }

  render() {
    const block = document.querySelector(this.container);
    for (let product of this.goods) {
      const item = new ProductItem(product);
      block.insertAdjacentHTML("beforeend", item.render());
      //           block.innerHTML += item.render();
    }
  }

  _getTotal() {
    this.goods.map((i) => (this.total += i.price));
  }
}

class ProductItem {
  constructor(product, img = "https://via.placeholder.com/200x150") {
    this.title = product.title;
    this.id = product.id;
    this.price = product.price;
    this.img = img;
  }
  render() {
    return `<div class="product-item">
                <img src="${this.img}">
                <h3>${this.title}</h3>
                <p>${this.price}</p>
                <button class="buy-btn">Купить</button>
            </div>`;
  }
}

let list = new ProductList();
console.dir(list);

class Cart {
  constructor() {
    this.goods = [];
  }

  addItem(good) {
    const foundGood = this.goods.find((i) => i.id === good.id);
    if (foundGood) {
      foundGood.qty++;
    } else {
      this.goods.push(good);
    }
  }

  removeItem(good) {
    const foundGood = this.goods.find((i) => i.id === good.id);
    if (foundGood.qty >= 2) {
      foundGood.qty--;
    } else {
      this.goods.splice(this.goods.indexOf(foundGood), 1);
    }
  }

  showItems() {
    return this.goods
      .map((item) => {
        totalCount += item.qty;
        totalSum += item.price * item.qty;
        cartRows += `<div class="cartRows cartRow">
<div>${item.title}</div>
<div>${item.qty}</div>
<div>${item.price}</div>
<div>${item.price * item.count}</div>
</div>`;
      })
      .join("");
  }
}

class CartItem {
  constructor(item) {
    this.title = item.title;
    this.id = item.id;
    this.price = item.price;
    this.img = item.img;
    this.qty = 1;
  }
}
const cart = new Cart();
const cartItem1 = new CartItem(new ProductItem(list.goods[0]));

console.dir(cartItem1);
console.dir(cart);

cart.addItem(new CartItem(new ProductItem(list.goods[0])));
cart.addItem(new CartItem(new ProductItem(list.goods[1])));
cart.addItem(new CartItem(new ProductItem(list.goods[0])));
cart.removeItem(new CartItem(new ProductItem(list.goods[0])));
cart.removeItem(new CartItem(new ProductItem(list.goods[0])));

//const products = [
//    {id: 1, title: 'Notebook', price: 2000},
//    {id: 2, title: 'Mouse', price: 20},
//    {id: 3, title: 'Keyboard', price: 200},
//    {id: 4, title: 'Gamepad', price: 50},
//];
//
//const renderProduct = (product,img='https://placehold.it/200x150') => {
//    return `<div class="product-item">
//                <img src="${img}">
//                <h3>${product.title}</h3>
//                <p>${product.price}</p>
//                <button class="buy-btn">Купить</button>
//            </div>`
//};
//const renderPage = list => document.querySelector('.products').innerHTML = list.map(item => renderProduct(item)).join('');
//
//renderPage(products);
