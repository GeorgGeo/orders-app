<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="top-menu">
    <h1>Top menu</h1>
    <nav>
    <RouterLink to="/orders">Orders</RouterLink>
    <RouterLink to="/products">Products</RouterLink>
  </nav>
  </div>
</template>

<style scoped>
.top-menu {
  background-color: #f8f9fa;
  padding: 1rem;
  border-bottom: 1px solid #dee2e6;
}
</style>