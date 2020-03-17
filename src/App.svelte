<div>Hello world!</div>

<script>
import { getLocalJSON } from './api';

setInterval(async () => {
    const data = await getData();
    // const names = await getNames();
    console.log(data);
    // console.log(names);
}, 15000);


async function getData() {
  const data = await getLocalJSON('/public/data/data.json');
  return data;
}

async function getNames() {
  const data = await getLocalJSON('/public/data/names.json');
  return data;
}
</script>

<style>

</style>
