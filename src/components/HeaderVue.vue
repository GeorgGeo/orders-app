<script setup>
import TopMenuVue from '@/components/TopMenu.vue';
</script>

<template>
  <div>
    <header class="header sticky-top bg-light py-2 border-bottom shadow-sm">
      <div class="container-fluid">
        <div class="row align-items-center justify-content-between">
          <div class="col-auto my-2">
            <div class="header__logo d-flex align-items-center gap-2">
              <div class="header__logo-icon">
                <svg viewBox="0 0 24 24" width="24" height="24">
                  <path d="M12 2L2.5 5v6.09c0 5.05 4.07 9.76 9.5 10.91 5.43-1.15 9.5-5.86 9.5-10.91V5l-9.5-3z" fill="#4CAF50" />
                  <circle cx="12" cy="9.5" r="3" fill="#174a19" />
                  <path d="M12 14c-2 0-6 1.34-6 4v1h12v-1c0-2.66-4-4-6-4z" fill="#174a19" />
                </svg>
              </div>
              <span class="header__logo-text">INVENTORY</span>
            </div>
            <!-- header__logo -->
          </div>
          <!-- col-auto -->
          <div class="col-12 col-lg-6 order-3 order-lg-2 my-2 my-lg-0">
            <div class="base-search mx-0 mx-lg-5">
              <input type="text" class="base-search__input rounded p-2 w-100" placeholder="Поиск" />
            </div>
          </div>
          <!-- col -->
          <div class="col-auto ms-auto order-2 order-lg-3">
            <TopMenuVue />
          </div>
          <!-- col-auto -->
        </div>
        <!-- row align-items-center -->
      </div>
    </header>
  </div>
</template>

<style scoped>
/* header */
.header__logo-icon {
  transition: transform 0.3s ease;
  cursor: pointer;
}
.header__logo:hover .header__logo-icon {
  transform: scale(1.2);
}
/* BaseSearch */
.base-search__input {
  border: 1px solid #ced4da;
  outline: none;
  background-color: #e1d9d9;
  transition: border-color 0.3s, box-shadow 0.3s, background-color 0.3s;
}
.base-search__input:focus {
  border-color: #8bc34a;
  box-shadow: 0 0 5px rgba(139, 195, 74, 0.5);
  background-color: #fff;
}
.base-search__input::placeholder {
  font-weight: 600;
  color: #000;
  opacity: 1;
}
.base-search__input:focus::placeholder {
  color: #8bc34a;
}
/* header end */
</style>