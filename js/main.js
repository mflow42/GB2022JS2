const BASE_URL =
  "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";
const GET_GOODS_ITEMS = `${BASE_URL}/catalogData.json`;
const GET_BASKET_GOODS_ITEMS = `${BASE_URL}/getBasket.json`;

function service(url, callback) {
  fetch(url, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      callback(data);
    });
}

class GoodsItem {
  constructor(
    { id_product = 0, product_name = "", price = 0 },
    img = "https://via.placeholder.com/200x150"
  ) {
    this.id_product = id_product;
    this.product_name = product_name;
    this.price = price;
    this.img = img;
  }
  render() {
    return `
    <div class="goods-item">
      <img src="${this.img}">
      <h3>${this.product_name}</h3>
      <p>${this.price}</p>
      <button class="buy-btn">Купить</button>
    </div>
    `;
  }
}

class GoodsList {
  items = [];
  filteredItems = [];

  fetchGoods() {
    const prom = new Promise((resolve, reject) => {
      service(GET_GOODS_ITEMS, (data) => {
        this.items = data;
        this.filteredItems = data;
        data === undefined ? reject(new Error("Ошибка")) : resolve();
      });
    });
    prom.then(() => {
      this.render();
    });
    prom.catch((err) => {
      console.error(err);
    });
  }

  filter(str) {
    this.filteredItems = this.items.filter(({ product_name }) => {
      return new RegExp(str, "i").test(product_name);
    });
  }

  getCount() {
    return this.items.reduce((acc = 0, { price }) => acc + price, 0);
  }

  render() {
    const goods = this.filteredItems
      .map((item) => {
        const goodsItem = new GoodsItem(item);
        return goodsItem.render();
      })
      .join("");
    document.querySelector(".goods-list").innerHTML = goods;
  }
}

class BasketGoods {
  items = [];
  fetchData() {
    service(GET_BASKET_GOODS_ITEMS, (data) => {
      this.items = data;
    });
  }
}

const goodsList = new GoodsList();
goodsList.fetchGoods(() => {
  goodsList.render();
});

const basketGoods = new BasketGoods();
basketGoods.fetchData();

document
  .getElementsByClassName("goods-search")[0]
  .addEventListener("input", (event) => {
    goodsList.filter(event.target.value);
    goodsList.render();
  });
