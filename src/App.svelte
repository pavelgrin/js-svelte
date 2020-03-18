<script>
import { onMount } from 'svelte';
import { getLocalJSON } from './api';

import ProductCategory from './components/ProductCategory.svelte';
import Cart from './components/Cart.svelte';

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
 * @param {Avoid}
 * @return Array [error, data]
 */
async function getGoods() {
  const res = await getLocalJSON('/public/data/data.json');
  return res;
}

/**
 * get categories and good names
 *
 * @param {Avoid}
 * @return Array [error, data]
 */
async function getNames() {
  const res = await getLocalJSON('/public/data/names.json');
  return res;
}

/**
 * change prices according to USD rate
 * delayed recalculation
*/
const recalcPrices = debounce(() => {
  //
}, 300);

/**
 * handle JSON data and set a convenient format
*/
function prepareData() {
  //
}

/*
 * declare main variables
 */
const data = {
  error: null,

  // init random usd rate between 20 and 80
  exchangeRate: Math.floor(Math.random() * (81 - 20) + 20),

  goods: null,
  names: null,

  cartItemList: null,
};


/**
 * init app, get basic data or show any error
 */
onMount(async () => {
  let dataErr = null;
  let namesErr = null;

  [dataErr, data.goods] = await getGoods();
  [namesErr, data.names] = await getNames();

  data.error = dataErr || namesErr;

  setInterval(async () => {
    [data.error, data.goods] = await getGoods();
  }, 15000);

  console.log(data.goods);
  console.log(data.names);
});
</script>


{#if data.error}
  <div class="app__error">{ data.error.message }</div>
{:else}
  <div class="app__content">
    <div>
      <label for="rate">Курс USD</label>
      <input id="rate" type="text" bind:value="{data.exchangeRate}">
    </div>

    {#if true}
      <div class="app__empty-categories">
        <strong>Список категорий пуст</strong>
      </div>
    {:else}
      <div><ProductCategory /></div>
      <div><ProductCategory /></div>
      <div><ProductCategory /></div>
    {/if}

    <div><Cart /></div>
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

