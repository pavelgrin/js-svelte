<script>
import { onMount } from 'svelte';
import { getLocalJSON } from './api';

import ProductCategory from './components/ProductCategory.svelte';
import Cart from './components/Cart.svelte';
import CartItem from './components/CartItem.svelte';

/*
 * declare main variables
 */
let appError = null;
// init random usd rate between 20 and 80
let exchangeRate = Math.floor(Math.random() * (81 - 20) + 20);

const data = {
  goods: null,
  categories: null,
};

/**
 * validate and update exchangeRate value
 *
 * @param {Object} Event.detail - payload
 * @return Void
*/
function handleExchangeRateInputValue(e) {
  let newRate = Number(e.target.value);

  if (Number.isNaN(newRate) || newRate < 20) {
    newRate = 20;
  } else if (newRate > 80) {
    newRate = 80;
  } else {
    newRate = e.target.value;
  }

  e.target.value = newRate;
  exchangeRate = newRate;
}


/**
 * delay event processing until typing stops
 *
 * @param {Function} func
 * @param {Number} ms - milliseconds
 * @return Function
 */
function debounce(func, ms) {
  let timer = null;

  return (...args) => {
    const onComplete = () => {
      func.apply(this, args);
      timer = null;
    };

    if (timer) clearTimeout(timer);
    timer = setTimeout(onComplete, ms);
  };
}

/**
 * get good list
 *
 * @param {Void}
 * @return Array [error, data]
 */
async function getGoods() {
  const res = await getLocalJSON('/public/data/data.json');
  return res;
}

/**
 * get categories and good names
 *
 * @param {Void}
 * @return Array [error, data]
 */
async function getNames() {
  const res = await getLocalJSON('/public/data/names.json');
  return res;
}

/**
 * change prices according to USD rate
 * 300ms delayed recalculation
 *
 * @param {Number|String} rate
 * @return Void
*/
const recalcPrices = debounce((rate) => {
  Object.keys(data.goods).forEach((key) => {
    const usdPrice = Number(data.goods[key].usdPrice);

    const oldRubPrice = Number(data.goods[key].rubPrice);
    const newRubPrice = Number((usdPrice * Number(rate)).toFixed(2));

    const priceChange = (newRubPrice > oldRubPrice && 'increase')
                     || (newRubPrice < oldRubPrice && 'decrease')
                     || 'flat';

    data.goods[key].rubPrice = newRubPrice.toFixed(2);
    data.goods[key].priceChange = priceChange; // flat, increase or decrease
  });
}, 300);

/**
 * handle JSON data and set a convenient format
 *
 * @param {Array} goods
 * @param {Object} names - categories with matched goods
 * @return Void
*/
function prepareData(goods, names) {
  if (!(goods && names)) return;

  data.goods = { ...data.goods };
  data.categories = {};

  // get id->name object to fill goods array
  const productNames = {};
  Object.values(names).forEach((item) => {
    Object.assign(productNames, { ...item.B });
  });

  // make the product list as an object, where keys are product ids
  goods.forEach((item) => {
    data.goods[item.T] = {
      // get the price in rubles, round to two decimal places
      rubPrice: (Number(item.C) * Number(exchangeRate)).toFixed(2),
      usdPrice: item.C,
      priceChange: 'flat', // flat, increase or decrease

      picked: false, // the product are in the cart or not
      pickedQuantity: 0,

      id: item.T,
      name: productNames[item.T] && productNames[item.T].N,
      quantity: item.P,

      ...data.goods[item.T],
    };
  });

  // make the categories with filtered goods
  Object.keys(names).forEach((key) => {
    data.categories[key] = {
      title: names[key].G,
      matchedGoods: Object.keys(names[key].B)
        .map((pId) => data.goods[pId] && pId)
        .filter((p) => p),
    };
  });
}

/**
 * add product to the cart
 *
 * @param {Object} Event.detail - payload
 * @return Void
*/
function addProductToCart({ detail }) {
  const { productId } = detail;

  data.goods[productId].picked = true;
  data.goods[productId].pickedQuantity = 1;
}

/**
 * update picked quantity
 *
 * @param {Object} Event.detail - payload
 * @return Void
*/
function updatePickedQuantity({ detail }) {
  const { productId, pickedQuantity } = detail;
  data.goods[productId].pickedQuantity = Number(pickedQuantity);
}

/**
 * remove product from cart
 *
 * @param {Object} Event.detail - payload
 * @return Void
*/
function removeProductFromCart({ detail }) {
  data.goods[detail.productId].picked = false;
  data.goods[detail.productId].pickedQuantity = 0;
}

// recalculate prices with every change of usd rate
$: recalcPrices(exchangeRate);

/**
 * init app, get basic data or show any error
 */
onMount(async () => {
  let goodsErr = null;
  let namesErr = null;

  let goods = null;
  let names = null;

  [goodsErr, goods] = await getGoods();
  [namesErr, names] = await getNames();

  appError = goodsErr || namesErr || (goods && !goods.Success && goods.Error);
  if (appError) return;

  goods = goods && goods.Value && goods.Value.Goods;
  prepareData(goods, names);

  setInterval(async () => {
    appError = null;
    [appError, goods] = await getGoods();
    if (appError) return;

    goods = goods && goods.Value && goods.Value.Goods;
    prepareData(goods, names);
  }, 15000);
});
</script>


{#if appError}
  <div class="app__error">{ appError.message }</div>
{:else}
  <div class="app__content">
    <div>
      <label for="rate">Курс USD</label>
      <input
        id="rate"
        value={exchangeRate}
        type="number"
        min="20"
        max="80"
        on:input={handleExchangeRateInputValue}>
    </div>

    {#if !data.categories}
      <div class="app__empty-categories">
        <strong>Список категорий пуст</strong>
      </div>
    {:else}
      {#each Object.values(data.categories) as category}
        <div>
          <ProductCategory
            {...category}
            goods={data.goods || {}}
            on:pick={addProductToCart} />
        </div>
      {/each}
    {/if}

    <div>
      <Cart
        items={data.goods && Object.values(data.goods).filter((p) => p.picked)}
        let:prop={item}
      >
        <CartItem
          {...item}
          on:update={updatePickedQuantity}
          on:remove={removeProductFromCart} />
      </Cart>
    </div>
  </div>
{/if}

<style type="text/scss">
.app__error {
  max-width: 1360px;
  margin: 0 auto;
  padding: 0.4em;
  background-color: hsla(0, 100%, 50%, .2);
  color: red;
}

.app__content {
  max-width: 1360px;
  margin: 0 auto;
}

.app__content > div + div {
  margin-top: 1em;
}

.app__empty-categories {
  width: 100%;
  text-align: center;
}
</style>

