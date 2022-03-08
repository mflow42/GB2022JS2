const products = [
  { id: 1, title: "Notebook", price: 2000, imageUrl: "https://picsum.photos/seed/25/200"},
  { id: 2, title: "Mouse", price: 20, imageUrl: "https://picsum.photos/seed/26/200" },
  { id: 3, title: "Keyboard", price: 200, imageUrl: "https://picsum.photos/seed/27/200" },
  { id: 4, title: "Gamepad", price: 50, imageUrl: "https://picsum.photos/seed/28/200" },
];
//Функция для формирования верстки каждого товара
//Добавить в выводе изображение
const renderProduct = (item) => {
  return `<div class="product-item">
                <img src="${item.imageUrl}" alt="">
                <h3>${item.title}</h3>
                <p>Цена: ${item.price}</p>
                <button class="buy-btn">Купить</button>
            </div>`;
};
// const renderProduct = (title, price) => {
//   return `<div class="product-item">
//                 <img src="https://picsum.photos/seed/25/200">
//                 <img src="${this.imageUrl}" alt="">
//                 <h3>${title}</h3>
//                 <p>Цена: ${price}</p>
//                 <button class="buy-btn">Купить</button>
//             </div>`;
// };
const renderPage = (list) => {
  const productsList = list.map((item) =>
    renderProduct(item)
  );
  console.log(productsList);
  document.querySelector(".products").innerHTML = productsList.join("");
};

renderPage(products);

