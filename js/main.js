const BASE_URL =
  "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";
const GET_GOODS_ITEMS = `${BASE_URL}/catalogData.json`;
const GET_BASKET_GOODS_ITEMS = `${BASE_URL}/getBasket.json`;

function service(url) {
  return fetch(url, {
    method: "GET",
  }).then((res) => res.json());
}

window.onload = () => {
  const app = new Vue({
    el: "#root",
    data: {
      items: [],
      searchValue: "",
      isVisibleCart: false,
      cart: {},
    },

    methods: {
      toggleCartVisibility() {
        this.isVisibleCart = !this.isVisibleCart;
      },
    },

    computed: {
      getCount() {
        return this.items.reduce((acc = 0, { price }) => acc + price, 0);
      },
      filteredItems() {
        return this.items.filter(({ product_name }) => {
          return new RegExp(this.searchValue, "i").test(product_name);
        });
      },
    },

    mounted() {
      service(GET_GOODS_ITEMS).then((data) => {
        data.map((item) => {
          item.img = "https://via.placeholder.com/200x150";
        });
        this.items = data;
        return data;
      });

      service(GET_BASKET_GOODS_ITEMS).then((data) => {
        this.cart = data;
        return data;
      });
    },
  });
};
