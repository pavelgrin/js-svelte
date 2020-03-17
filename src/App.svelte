<script>
import { onMount } from 'svelte';
import { getLocalJSON } from './api';

async function getData() {
  const data = await getLocalJSON('/public/data/data.json');
  return data;
}

async function getNames() {
  const data = await getLocalJSON('/public/data/names.json');
  return data;
}

let data = null;
let names = null;

onMount(async () => {
  data = await getData();
  names = await getNames();

  setInterval(async () => {
    data = await getData();
  }, 15000);

  console.log(data);
  console.log(names);
});
</script>

<div>Hello world!</div>

<style>

</style>
