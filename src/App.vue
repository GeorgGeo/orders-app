<script setup>
// import { RouterView } from 'vue-router'
// import Sidebar from '@/components/SideBar.vue'
// import TopMenu from '@/components/TopMenu.vue'
import HeaderVue from '@/components/HeaderVue.vue';
import OrderList from './components/OrderList.vue';
import orders from '@/data/orders'; // массив из 3 заказов
import products from './data/products'; // массив из 2 продуктов

import { ref } from 'vue'
import PopupView from './components/PopupView.vue';

const menuItems = ref([
  { id: 1, title: 'ПРИХОД', path: '/orders', active: true },
  { id: 2, title: 'ГРУППЫ', path: '/groups', active: false },
  { id: 3, title: 'ПРОДУКТЫ', path: '/products', active: false },
  { id: 4, title: 'ПОЛЬЗОВАТЕЛИ', path: '/users', active: false },
  { id: 5, title: 'НАСТРОЙКИ', path: '/settings', active: false }
])

const activeTab = ref(1); // Default active tab
const isOpenModalPopup = ref(true);
</script>

<template>
  <div>
    <!-- <div class="app-layout">
      <SideBarVue />

      <div class="content">
        <TopMenuVue />

        <RouterView />
      </div>
    </div> -->
    <HeaderVue />
    <main class="app">
      <div class="app__body d-flex flex-column flex-md-row">
        <aside class="sidebar d-flex flex-column col-12 col-md-3 col-lg-2 p-0">
          <div class="sidebar__profile mb-2 text-center p-2">
            <div class="sidebar__avatar-wrapper position-relative d-inline-block">
              <img src="./assets/images/avatar.png" alt="Profile" class="sidebar__avatar"/>
              <button class="sidebar__settings-btn d-flex justify-content-center align-items-center position-absolute bottom-0 end-0 rounded-circle bg-white border border-2 border-light" title="Настройки">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.14 12.94c.04-.31.06-.63.06-.94 0-.31-.02-.63-.06-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>
                </svg>
              </button>
            </div>
          </div>
          <!-- sidebar__profile -->
          <nav class="sidebar__nav">
            <ul class="nav-underline">
              <li v-for="item in menuItems" :key="item.id" class="tab" :class="{ 'tab--active' : activeTab === item.id}" @click="activeTab = item.id">
                <!-- <router-link :to="item.path" class="sidebar__link" :class="{ 'sidebar__link--active': item.active }">{{ item.title }}</router-link> -->
                <span class="sidebar__link" :class="{ 'sidebar__link--active': activeTab === item.id }">{{ item.title }}</span>
              </li>
            </ul>
            <!--  -->
          </nav>
          <!-- sidebar__nav -->
        </aside>
        <!-- sidebar -->
        <div class="main col-12 col-md-9 col-lg-10 p-3 position-relative">
          <!-- <div class="tab-content">
            <div v-if="activeTab === 1">Контент ПРИХОД — список заказов</div>
            <div v-if="activeTab === 2">Контент ГРУППЫ</div>
            <div v-if="activeTab === 3">Контент ПРОДУКТЫ</div>
            <div v-if="activeTab === 4">Контент ПОЛЬЗОВАТЕЛИ</div>
            <div v-if="activeTab === 5">Контент НАСТРОЙКИ</div>
          </div> -->
          <OrderList v-if="activeTab === 1" :orders="orders" :products="products" />
          <!--  -->
          <PopupView :is-open-popup="isOpenModalPopup" />
        </div>
        <!-- main -->
      </div>
    </main>
    <!-- main -->
  </div>
</template>

<style scoped>
.sidebar {
  background-color: #f8f9fa;
  box-shadow: 7px 0 7px rgba(0, 0, 0, 0.1);
}
.sidebar__avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
}
.sidebar__settings-btn {
  transform: translateY(-5%);
  width: 28px;
  height: 28px;
  padding: 0;
  flex-shrink: 0;
}
/* start aside => nav */
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.sidebar__link {
  display: inline-block;
  padding: 0.75rem 1rem;
  color: #495057;
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0.5px;
  border-radius: 0.25rem;
  transition: all 0.3s ease;
  position: relative;
}
.sidebar__link::after {
  content: '';
  position: absolute;
  bottom: 6px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 2px;
  background-color: #8bc34a;
  transition: width 0.3s ease;
}
.sidebar__link--active::after {
  width: calc(100% - 2rem);
}
.sidebar__link:hover {
  background-color: #f8f9fa;
  color: #7cb432;
}
.sidebar__link--active {
  color:#8bc34a;
}
.sidebar__link--active:hover {
  color: #84a15f;
}
/* end aside => nav */
</style>
