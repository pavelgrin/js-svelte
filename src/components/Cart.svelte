<script>
import { beforeUpdate } from 'svelte';

export let items = null;

let total = 0;

beforeUpdate(() => {
  total = (items || [])
    .reduce((s, p) => s + Number(p.rubPrice) * Number(p.pickedQuantity), 0)
    .toFixed(2);
});
</script>

<table>
  <thead>
    <tr>
      <th>Наименование товара и описание</th>
      <th class="cart__quantity-col">Количество</th>
      <th class="cart__price-col">Цена</th>
      <th class="cart__action-col"></th>
    </tr>
  </thead>
  <tbody>
    {#if !(items && items.length)}
      <tr><td colspan="4" class="cart__empty">Корзина пуста</td></tr>
    {:else}
      {#each items as item}
        <slot prop={item}></slot>
      {/each}

      <tr>
        <td
          colspan="4"
          class="cart__total"
        >
          <span>Общая стоимость</span>
          <strong>{total}</strong>
        </td>
      </tr>
    {/if}
  </tbody>
</table>

<style>
table {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0px;
}

th, td {
  padding: 0.4em;
  border-top: 1px solid hsl(0, 0%, 80%);

  text-align: left;
  vertical-align: top;
}

.cart__quantity-col,
.cart__action-col {
  width: 135px;
  min-width: 135px;
}

.cart__price-col {
  width: 200px;
  min-width: 200px;
}

.cart__empty {
  text-align: center;
  border-bottom: 1px solid hsl(0, 0%, 80%);
}

.cart__total {
  text-align: right;
}

.cart__total > *:last-child {
  color: hsl(24, 100%, 50%);
  font-size: 1.1em;
}
</style>
