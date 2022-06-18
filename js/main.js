const BASE_URL =
  "http://localhost:8000";
const GET_GOODS_ITEMS = `${BASE_URL}/goods.json`;
const GET_BASKET_GOODS_ITEMS = `${BASE_URL}/basket`;
const ADD_BASKET_ITEM = `${BASE_URL}/basket-add`;

function service(url) {
  return fetch(url, {
    method: "GET",
  }).then((res) => res.json());
}

window.onload = () => {
  Vue.component("search-input", {
    template: `
        <input
          type="text"
          placeholder="Введите поисковый текст"
          class="goods-search"
          @input="$emit('input', $event.target.value)"
        />
    `
  });

  Vue.component("basket", {
    props: ["cart"],
    template: `
      <div class="cart" >
        <div class="cart-list">
          <div class="first-row">
            <div class="col-id">id</div>
            <div class="col-product">product</div>
            <div class="col-price">price</div>
            <div class="col-qty">qty</div>
            <div class="col-total">total</div>
          </div>
          <div class="cart-rows" v-for="item in cart">
            <div class="col-id">{{item.id_product}}</div>
            <div class="col-product">{{item.product_name}}</div>
            <div class="col-price">{{item.price}}</div>
            <div class="col-qty">{{item.quantity}}</div>
            <div class="col-total">{{item.price*item.quantity}}</div>
          </div>
          <div class="btn-wrapper">
            <slot @click="$emit('close')"></slot>
          </div>
        </div>
      </div>
    `,

    mounted() {
      service(GET_BASKET_GOODS_ITEMS).then((data) => {
        this.cart = data;
        return data;
      })
    }
  });

  Vue.component("custom-button", {
    template: `
    <button
    @click="$emit('click')"
    type="button"
  >
    <slot></slot>
  </button>
    `,
  });

  Vue.component("good", {
    props: ["item"],
    template: `
      <div :data-id='item.id_product'>
        <img :src="item.img" />
        <h3>{{item.product_name}}</h3>
        <p>{{item.price}}</p>
        <slot @click="$emit('click')"></slot>
      </div>
    `,
  });

  Vue.component("buy-button", {
    props: ["cart"],
    template: `
        <button @click="$emit('click', $event.target)">Купить</button>
    `,
  });

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
      addBasketItem(event) {
        console.log(event.parentNode.dataset.id);
        service(ADD_BASKET_ITEM).then((data) => {
          // TODO
        })
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
    },
  });
};
