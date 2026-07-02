<script setup>
import OrderList from '@/components/OrderList.vue'

defineProps({
    orders: Array,
    products: Array
})

const emit = defineEmits([
    'delete'
])
</script>

<template>
  <div>
    <OrderList
    :orders="orders"
    :products="products"
    @delete="emit('delete',$event)"
    />
  </div>
</template>

<style scoped>

</style>