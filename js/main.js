const BASE_URL =
  "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";
const GOODS = `${BASE_URL}/catalogData.json`;

function service(url, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  const loadHandler = () => {
    callback(JSON.parse(xhr.response));
  };
  xhr.onload = loadHandler;
  xhr.send();
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

  fetchGoods(callback) {
    service(GOODS, (data) => {
      this.items = data;
      callback();
    });
  }
  getCount() {
    return this.items.reduce((acc = 0, { price }) => acc + price, 0);
  }

  render() {
    const goods = this.items
      .map((item) => {
        const goodsItem = new GoodsItem(item);
        return goodsItem.render();
      })
      .join("");
    document.querySelector(".goods-list").innerHTML = goods;
  }
}

const goodsList = new GoodsList();
goodsList.fetchGoods(() => {
  goodsList.render();
});
