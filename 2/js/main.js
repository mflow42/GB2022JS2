this.goods = [
  { id: 1, title: "Shirt", price: 150 },
  { id: 2, title: "Socks", price: 50 },
  { id: 3, title: "Jacket", price: 350 },
  { id: 4, title: "Shoes", price: 250 },
];

class GoodsItem {
  constructor(
    { id = 0, title = "", price = 0 },
    img = "https://via.placeholder.com/200x150"
  ) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.img = img;
  }
  render() {
    return `
    <div class="goods-item">
      <img src="${this.img}">
      <h3>${this.title}</h3>
      <p>${this.price}</p>
      <button class="buy-btn">Купить</button>
    </div>
    `;
  }
}

class GoodsList {
  fetchData() {
    this.list = goods;
  }
  getCount() {
    return this.list.reduce((acc = 0, cur) => acc + cur.price, 0);
  }

  render() {
    const goodsList = this.list
      .map((item) => {
        const goodsItem = new GoodsItem(item);
        return goodsItem.render();
      })
      .join("");
    document.querySelector(".goods-list").innerHTML = goodsList;
  }
}

const goodsList = new GoodsList(goods);
goodsList.fetchData();
goodsList.render();
