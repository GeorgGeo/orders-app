<script setup>
import { computed } from 'vue';

const props = defineProps({
  order: Object,
  orderProducts: Array,
  // products: Array
});

const emit = defineEmits(['delete']);
const productCount = computed(() => props.orderProducts.length);

const totalUSD = computed(() => {
  return props.orderProducts.reduce((sum, product) => {
    console.log(product);
    const usd = product.price.find(price => price.symbol === 'USD');
    console.log(usd);

    // return sum + (usd ? usd.value : 0);
    return sum + Number(usd ? usd.value : 0);
  }, 0);
});

const totalUAH = computed(() => {
    return props.orderProducts.reduce((sum, product) => {
        const uah = product.price.find(
            price => price.symbol === "UAH"
        );
      // return sum + (uah ? uah.value : 0);
      return sum + Number(uah ? uah.value : 0);
    }, 0);
});

// const formattedUSD = computed(() => `${totalUSD.value.toFixed(2)} $`);
// const formattedUAH = computed(() => `${totalUAH.value.toFixed(2)} UAH`);

const formattedUSD = computed(() => {
  return `${Number(totalUSD.value || 0).toFixed(2)} $`;
});
const formattedUAH = computed(() => {
  return `${Number(totalUAH.value || 0).toFixed(2)} UAH`;
});

</script>

<template>
  <div class="order-item">
    <!--  -->
    <div class="card mb-3" style="width: 100%;">
      <div class="card-body d-flex align-items-center justify-content-between gap-2">
        <h5 class="card-title my-0">{{ order.title }}</h5>
        <h6 class="card-subtitle text-body-secondary my-0"> Количество {{ productCount }} продукта</h6>
        <p class="card-text my-0">{{ order.date }}</p>
        <div class="order-item__price-block">
          <p class="card-text my-0">{{ formattedUSD }}</p>
          <p class="card-text my-0">{{ formattedUAH }}</p>
        </div>
        <!-- <a href="#" class="card-link">Card link</a>
        <a href="#" class="card-link">Another link</a> -->
        <div class="order-item__action">
          <button type="button" class="btn btn-light order-item__btn-delete" title="Удалить" @click = "emit('delete', {
            type: 'order',
            data: order,
          })">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
    <!--  -->
  </div>
</template>

<style scoped>
.order-item__btn-delete:hover svg {
  color: #8bc34a;
}
</style>