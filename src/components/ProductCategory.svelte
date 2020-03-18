<script>
import { createEventDispatcher } from 'svelte';

export let title = 'Not set';
export let matchedGoods = [];
export let goods = {};

const dispatch = createEventDispatcher();

/**
 * emit event to put an item into the cart
 *
 * @param {Number} productId
 * @return Void
*/
function pickProduct(productId) {
  dispatch('pick', { productId });
}
</script>

<div class="product-category">
  <div class="product-category__title">{title}</div>
  <div class="product-category__list">
    {#if !(matchedGoods.length)}
      <div class="product-category__empty">
        Товары данной категории отсутствуют
      </div>
    {:else}
      {#each matchedGoods as id}
        <div
          data-picked={goods[id].picked}
          class="product-category__item"
          on:click={pickProduct(id)}
        >
          <div>{goods[id].name} ({goods[id].quantity})</div>
          <div data-price-change={goods[id].priceChange}>
            {goods[id].rubPrice}
          </div>
        </div>
      {/each}
    {/if}
  </div>
</div>

<style>
.product-category__title {
  padding: 0.2em;
  border: 1px solid hsl(0, 0%, 80%);
  background-color: hsl(195, 22%, 85%);

  color: hsl(0, 0%, 27%);
  font-weight: bold;
}

.product-category__list {
  display: flex;
  flex-wrap: wrap;
}

.product-category__item {
  display: flex;
  width: 50%;
  overflow: hidden;

  border-bottom: 1px solid hsl(0, 0%, 80%);
  border-right: 1px solid hsl(0, 0%, 80%);

  user-select: none;
  -moz-user-select: none;
}

.product-category__item:nth-child(2n + 1) {
  border-left: 1px solid hsl(0, 0%, 80%);
}

.product-category__item[data-picked="true"] {
  background-color: hsl(49, 64%, 79%);
}

.product-category__item:hover:not([data-picked="true"]) {
  cursor: pointer;
  background-color: hsl(0, 0%, 95%);
  opacity: 0.6;
}

.product-category__item > *:first-child {
  flex-grow: 1;
  padding: 0.4em;
}

.product-category__item > *:last-child {
  flex-shrink: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 100px;

  padding: 0.4em;
  background-color: hsl(0, 0%, 95%);
  font-weight: bold;
}

.product-category__item > *:last-child[data-price-change="increase"] {
  background-color: hsla(0, 100%, 50%, .2);
}

.product-category__item > *:last-child[data-price-change="decrease"] {
  background-color: hsla(120, 100%, 25%, .2);
}

.product-category__empty {
  width: 100%;
  padding: 0.2em;
  text-align: center;
  border: 1px solid hsl(0, 0%, 80%);
  border-top: 0;
}
</style>
