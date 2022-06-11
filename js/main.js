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
  Vue.component("search-input", {
    inheritAttrs: false,
    props: ['value'],
    computed: {
      inputListeners: function () {
        var vm = this
        return Object.assign({},
          this.$listeners,
          {
            input: function (event) {
              vm.$emit('input', event.target.value)
            }
          }
        )
      }
    },
    template: `
        <input
          type="text"
          placeholder="Введите поисковый текст"
          class="goods-search"
          v-bind:searchValue="value"
          v-bind="$attrs"
          v-on="inputListeners"
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
          <div class="cart-rows" v-for="item in cart.contents">
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
      <div class="goods-item">
        <img :src="item.img" />
        <h3>{{item.product_name}}</h3>
        <p>{{item.price}}</p>
        <button class="buy-btn">Купить</button>
      </div>
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
