<script>
export let items = [];
</script>

<table>
  <thead>
    <tr>
      <th>Наименование товара и описание</th>
      <th>Количество</th>
      <th>Цена</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    {#if !items.length}
      <tr><td colspan="4" class="cart__empty">Корзина пуста</td></tr>
    {:else}
      <tr>
        <td>Product Product ProductProduct</td>
        <td class="cart__quantity-cell">
          <div class="cart__quantity">
            <input type="text" value="1">
            <span>шт.</span>
          </div>

          <div class="cart__limited-item">
            Количество ограничено
          </div>
        </td>
              <td class="cart__price-cell">
          <strong>999.99 руб.</strong>
          <span>/шт</span>
        </td>
        <td class="cart__action-cell">Удалить</td>
      </tr>
      <tr>
        <td>Product Product ProductProduct</td>
        <td class="cart__quantity-cell">
          <div class="cart__quantity">
            <input type="text" value="1">
            <span>шт.</span>
          </div>

          <div class="cart__limited-item">
            Количество ограничено
          </div>
        </td>
        <td class="cart__price-cell">
          <strong>999.99 руб.</strong>
          <span>/шт</span>
        </td>
        <td class="cart__action-cell">Удалить</td>
      </tr>
      <tr>
        <td>Product Product ProductProduct</td>
        <td class="cart__quantity-cell">
          <div class="cart__quantity">
            <input type="text" value="1">
            <span>шт.</span>
          </div>

          <div class="cart__limited-item">
            Количество ограничено
          </div>
        </td>
              <td class="cart__price-cell">
          <strong>999.99 руб.</strong>
          <span>/шт</span>
        </td>
        <td class="cart__action-cell">Удалить</td>
      </tr>
      <tr>
        <td
          colspan="4"
          class="cart__total"
        >
          <span>Общая стоимость</span>
          <strong>3 890,76</strong>
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

.cart__quantity-cell,
.cart__action-cell {
  width: 100px;
  min-width: 100px;
}

.cart__price-cell {
  width: 200px;
  min-width: 200px;
}

.cart__price-cell > *:first-child {
  font-size: 1.1em;
}

.cart__action-cell {
  text-align: right;
}

.cart__quantity-cell > * + * {
  margin-top: 0.4em;
}

.cart__quantity > *:first-child {
  width: 50px;
}

.cart__limited-item {
  padding: 0.5em 1em;

  border: 1px dotted hsl(24, 100%, 50%);
  background-color: hsl(37, 100%, 97%);
  color: hsl(24, 100%, 50%);
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
}
</style>
