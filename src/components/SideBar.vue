<script setup>
</script>

<template>
  <div>
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
  </div>
</template>

<style scoped>
</style>