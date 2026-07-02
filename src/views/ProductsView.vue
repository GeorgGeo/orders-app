<script setup>
import ProductList from '@/components/ProductList.vue'

defineProps({
    orders: Array,
    products: Array
})

const emit = defineEmits([
    'delete',
    'add-order'
])
</script>

<template>
  <div>
    <ProductList
    :orders="orders"
    :products="products"
    @delete="emit('delete',$event)"
    @add-order="emit('add-order')"
    />
  </div>
</template>

<style scoped>

</style>