<script>
import { onMount, createEventDispatcher } from 'svelte';

export let id;
export let name;
export let quantity;
export let pickedQuantity;
export let rubPrice;

const dispatch = createEventDispatcher();
const quantityWarningLevel = 5;

let mutablePickedQuantity = 0;

$: dispatch('update', { productId: id, pickedQuantity: mutablePickedQuantity });

onMount(() => {
  mutablePickedQuantity = pickedQuantity;
});
</script>

<tr>
  <td>{name}</td>
  <td>
    <div class="cart-item__quantity">
      <input
        bind:value={mutablePickedQuantity}
        type="number"
        min="1"
        max={quantity}>
      <span>шт.</span>
    </div>
    {#if quantity < quantityWarningLevel}
      <div class="cart-item__limited-item">
        Количество ограничено
      </div>
    {/if}
  </td>
  <td>
    <div class="cart-item__price">
      <strong>{rubPrice} руб.</strong>
      <span>/шт</span>
    </div>
  </td>
  <td>
    <div class="cart-item__remove">
      <button
        on:click={dispatch('remove', { productId: id })}
      >Удалить</button>
    </div>
  </td>
</tr>


<style>
td {
  padding: 0.4em;
  border-top: 1px solid hsl(0, 0%, 80%);

  text-align: left;
  vertical-align: top;
}

.cart-item__quantity > *:first-child {
  width: 50px;
}

.cart-item__limited-item {
  margin-top: 0.4em;
  padding: 0.5em 1em;

  border: 1px dotted hsl(24, 100%, 50%);
  background-color: hsl(37, 100%, 97%);
  color: hsl(24, 100%, 50%);
}

.cart-item__price > *:first-child {
  font-size: 1.1em;
}

.cart-item__remove {
  text-align: right;
}
</style>
