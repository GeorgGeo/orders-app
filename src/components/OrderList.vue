
<script setup>
import OrderItem from './OrderItem.vue';
import { computed, ref } from 'vue';

const showForm = ref(false);
const selectedType = ref('');
const selectedSpec = ref('');

const props = defineProps({
  orders: Array,
  products: Array
});

// Уникальные типы и спецификации из products
const types = computed(() => [...new Set(props.products.map(p => p.type))]);
const specifications = computed(() => [...new Set(props.products.map(p => p.specification))]);

const totalUSD = computed(() => {
  return props.products.reduce((sum, product) => {
    console.log(product);
    const usd = product.price.find(price => price.symbol === 'USD');
    console.log(usd);

    return sum + (usd ? usd.value : 0);
  }, 0);
});

const totalUAH = computed(() => {
    return props.products.reduce((sum, product) => {
        const uah = product.price.find(
            price => price.symbol === "UAH"
        );
        return sum + (uah ? uah.value : 0);
    }, 0);
});

const formattedUSD = computed(() => `${totalUSD.value.toFixed(2)} $`);
const formattedUAH = computed(() => `${totalUAH.value.toFixed(2)} UAH`);

const productCount = computed(() => props.products.length);

const getProducts = (orderId) => {
  const result = props.products.filter(p => p.order === orderId);
  console.log('orderId:', orderId, '=> products:', result);
  return result;
} 
</script>

<template>
  <div class="order-list mt-md-3">
    <div class="order-list__header d-flex align-items-center mb-3">
      <button type="button" class="order-list__search-btn btn btn-success rounded-circle shadow" title="Добавить" @click="showForm = !showForm">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus-icon lucide-plus">
          <path d="M5 12h14"/>
          <path d="M12 5v14"/>
        </svg>
      </button>
      <!--  -->
      <div class="order-list__title ms-2">
        <!-- <h3 class="h-6 h3-md">TotalCountOrders / {{ orders.length }}</h3> -->
        <h3 class="h-6 h3-md">
          <template v-if="!showForm">
            TotalCountOrders / {{ orders.length }}
          </template>
          <template v-else>
            TotalCountProducts / {{ productCount }}
          </template>
        </h3>
      </div>
    </div>
    <!-- Форма фильтрации / добавления -->
    <div v-if="showForm" class="order-list__form card p-3 mb-3">
      <div class="d-flex gap-3 justify-content-around flex-wrap">
        <div class="form-group d-flex align-items-center gap-3">
          <label class="form-label text-muted small mb-0">Тип</label>
          <select v-model="selectedType" class="form-select form-select-sm">
            <option value="">Все типы</option>
            <option v-for="type in types" :key="type" :value="type">{{ type }}</option>
          </select>
        </div>
        <!-- /.form-group -->
        <div class="form-group d-flex align-items-center gap-3">
          <label class="form-label text-muted small mb-0">Спецификация</label>
          <select v-model="selectedSpec" class="form-select form-select-sm">
            <option value="">Все спецификации</option>
            <option v-for="spec in specifications" :key="spec" :value="spec">{{ spec }}</option>
          </select>
        </div>
        <!-- /.form-group -->
      </div>
      <!-- d-flex -->
      <!-- Таблица продуктов -->
      <div class="mt-3">
        <div class="card mb-3" style="width: 100%;" v-for="product in products.filter(p => (!selectedType || p.type === selectedType) && (!selectedSpec || p.specification === selectedSpec))" :key="product.id">
          <div class="card-body d-flex align-items-center justify-content-between gap-2">
            <h5 class="card-title my-0">{{ product.title }}</h5>
            <h6 class="card-subtitle text-body-secondary my-0"> {{ product.specification }} </h6>
            <h6 class="card-subtitle text-body-secondary my-0"> {{ product.type }} </h6>
            <div class="order-item__price-block">
              <p class="card-text my-0">{{ product.guarantee.start }}</p>
              <p class="card-text my-0">{{ product.guarantee.start }}</p>
            </div>
            <div class="order-item__price-block">
              <p class="card-text my-0">{{ formattedUSD }}</p>
              <p class="card-text my-0">{{ formattedUAH }}</p>
            </div>
            <p class="card-text my-0">{{ product.date }}</p>
            <!-- <a href="#" class="card-link">Card link</a>
            <a href="#" class="card-link">Another link</a> -->
            <div class="order-item__action">
              <button type="button" class="btn btn-light order-item__btn-delete" title="Удалить" @click = "emit('delete')">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- /.mt-3 -->
    </div>
    <!--  -->
    <template v-if="!showForm">
      <OrderItem v-for="order in orders" :key="order.id" :order="order" :order-products="getProducts(order.id)" />
    </template>
    <!-- <div v-for="order in orders" :key="order.id">
      {{ JSON.stringify(getProducts(order.id)) }}
    </div> -->
  </div>
</template>

<style scoped>
.order-list__search-btn {
  width: 48px;
  height: 48px;
}
</style>