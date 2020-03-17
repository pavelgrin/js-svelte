<div class="product-category">
  <div class="product-category__title">Category name</div>
  <div class="product-category__list">
    <div class="product-category__item">
      <div>product product product product product product product product</div>
      <div data-increase>999.99</div>
    </div>

    <div class="product-category__item">
      <div>product product product product product product product product</div>
      <div data-decrease>999.99</div>
    </div>

    <div
      data-picked
      class="product-category__item"
    >
      <div>product product product product product product product product</div>
      <div >999.99</div>
    </div>
  </div>
</div>

<style>
.product-category {
  border: 1px solid hsl(0, 0%, 80%);
}

.product-category__title {
  padding: 0.2em;
  border-bottom: 1px solid hsl(0, 0%, 80%);
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
}

.product-category__item[data-picked] {
  background-color: hsl(49, 64%, 79%);
}

.product-category__item > *:first-child {
  padding: 0.4em;
}
.product-category__item > *:last-child {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 200px;

  padding: 0.4em;
  border-left: 1px solid hsl(0, 0%, 80%);
  border-right: 1px solid hsl(0, 0%, 80%);
  background-color: hsl(0, 0%, 95%);
  font-weight: bold;
}

.product-category__item > *:last-child[data-increase] {
  background-color: hsla(0, 100%, 50%, .2);
}

.product-category__item > *:last-child[data-decrease] {
  background-color: hsla(120, 100%, 25%, .2);
}
</style>