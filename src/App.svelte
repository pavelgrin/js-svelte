<script>
import { onMount } from 'svelte';
import { getLocalJSON } from './api';

import ProductCategory from './components/ProductCategory.svelte';
import Cart from './components/Cart.svelte';

async function getData() {
  const data = await getLocalJSON('/public/data/data.json');
  return data;
}

async function getNames() {
  const data = await getLocalJSON('/public/data/names.json');
  return data;
}

let error = null;

let exchangeRate = Math.floor(Math.random() * (81 - 20) + 20);

let data = null;
let names = null;

/**
 * init app, get basic data or show any error
 */
onMount(async () => {
  let dataErr = null;
  let namesErr = null;

  [dataErr, data] = await getData();
  [namesErr, names] = await getNames();

  error = dataErr || namesErr;

  setInterval(async () => {
    [error, data] = await getData();
  }, 15000);

  console.log(data);
  console.log(names);
});
</script>


{#if error}
  <div class="app__error">{ error.message }</div>
{:else}
  <div class="app__content">
    <div>
      <label for="rate">exchange rate</label>
      <input id="rate" type="text" bind:value="{exchangeRate}">
    </div>

    <div class="app__categories"><ProductCategory /></div>
    <div class="app__categories"><ProductCategory /></div>
    <div class="app__categories"><ProductCategory /></div>

    <div><Cart /></div>
  </div>
{/if}

<style type="text/scss">
.app__error {
  padding: 0.4em;
  background-color: hsla(0, 100%, 50%, .2);
  color: red;
}

.app__content > div + div {
  margin-top: 1em;
}
</style>
