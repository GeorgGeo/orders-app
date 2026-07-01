<script setup>
// import { RouterView } from 'vue-router'
// import Sidebar from '@/components/SideBar.vue'
// import TopMenu from '@/components/TopMenu.vue'
import { ref, onMounted } from 'vue'
import axios from 'axios';

import HeaderVue from '@/components/HeaderVue.vue';
import OrderList from './components/OrderList.vue';
// import orders from '@/data/orders'; // массив из 3 заказов
// import products from './data/products'; // массив из 2 продуктов
// Делаем копии
// import ordersData from '@/data/orders';
// import productsData from './data/products';

import PopupView from './components/PopupView.vue';
import ProductList from './components/ProductList.vue';
import NavigationMenu from './components/NavigationMenu.vue';

// const MOCK_API_URL = "https://mockapi.io/projects/6a43dfef6dba791499ab86d6";
const MOCK_API_URL_ORDER = "https://6a43dfef6dba791499ab86d5.mockapi.io/orders";
const MOCK_API_URL_PRODUCT = "https://6a43dfef6dba791499ab86d5.mockapi.io/products";

// const orders = ref([...ordersData]);
// const products = ref([...productsData]);
const orders = ref([]);
const products = ref([]);

const selectedItem = ref(null); // Храним выбранный объект при удалении

// const menuItems = ref([
//   { id: 1, title: 'ПРИХОД', path: '/orders', active: true },
//   { id: 2, title: 'ГРУППЫ', path: '/groups', active: false },
//   { id: 3, title: 'ПРОДУКТЫ', path: '/products', active: false },
//   { id: 4, title: 'ПОЛЬЗОВАТЕЛИ', path: '/users', active: false },
//   { id: 5, title: 'НАСТРОЙКИ', path: '/settings', active: false }
// ])

const activeTab = ref(1); // Default active tab
const isOpenModalPopup = ref(false);
// Методы для управления попапом
const openPopup = (item) => {
  selectedItem.value = item;
  isOpenModalPopup.value = true;
}
const closePopup = () => {
  isOpenModalPopup.value = false;
}
const confirmDelete = async () => {
  console.log("ConfirmDelete");
  console.log('SelectedItem.value:', selectedItem.value);
  console.log('SelectedItem.value.data.id', selectedItem.value.data.id);
  console.log('typeof selectedItem.value.data.id', typeof selectedItem.value.data.id);
  if (!selectedItem.value) return;
  // console.log('Удаление подтверждено');
  // isOpenModalPopup.value = false;
  if (selectedItem.value.type === 'order') {
    // удаляем заказ
    // orders.value = orders.value.filter(
    //   order => order.id !== selectedItem.value.data.id
    // );
    
    // удаляем все продукты этого заказа
    // products.value = products.value.filter(
    //   product => product.order !== selectedItem.value.data.id
    // );
    const orderProducts = products.value.filter(
      product => product.order === selectedItem.value.data.id
    );

    for (const product of orderProducts) {
      // await axios.delete(`${MOCK_API_URL_PRODUCT}/${product.id}`)
      //   .then(response => {
      //     console.log('Продукт успешно удален:', response.data);
      //   })
      //   .catch(error => {
      //     console.error('Ошибка при удалении продукта:', error);
      // });
      try {
        const response = await axios.delete(`${MOCK_API_URL_PRODUCT}/${product.id}`);
        console.log('Продукт успешно удален:', response.data);
      } catch (error) {
        console.error('Ошибка при удалении продукта:', error);
      }
    };
    console.log('Axios Delete Order', `${MOCK_API_URL_ORDER}/${selectedItem.value.data.id}`);
    // await axios.delete(`${MOCK_API_URL_ORDER}/${selectedItem.value.data.id}`)
      // .then(response => {
      //   console.log('Заказ успешно удален:', response.data);
      //   // Обновляем список заказов после удаления
      //   fetchOrders();
      // })
      // .catch(error => {
      //   console.error('Ошибка при удалении заказа:', error);
    // });
      try {
        const response = await axios.delete(`${MOCK_API_URL_ORDER}/${selectedItem.value.data.id}`);
        console.log('Заказ успешно удален:', response.data);
      } catch (error) {
        console.error('Ошибка при удалении заказа:', error);
      }

    await fetchOrders();
    await fetchProducts();

  } else if (selectedItem.value.type === 'product') {
    // удаляем только выбранный продукт
    // products.value = products.value.filter(
    //   product => product.id !== selectedItem.value.data.id
    // );
    console.log('Axios Delete Product', `${MOCK_API_URL_PRODUCT}/${selectedItem.value.data.id}`);
    try {
      const response = await axios.delete(`${MOCK_API_URL_PRODUCT}/${selectedItem.value.data.id}`);
      console.log('Продукт успешно удален:', response.data);
      // Обновляем список продуктов после удаления
      fetchProducts();
    } catch (error) {
      console.error('Ошибка при удалении продукта:', error);
    }
  }

  selectedItem.value = null;
  isOpenModalPopup.value = false;
}

const addProduct = async () => {
  const newProduct = {
    id: Date.now(),
    title: 'Product 3',
    specification: 'Specification 1',
    type: 'Monitors',
    order: 1, // или к какому заказу привязать
    date: new Date().toISOString(),
    guarantee: {
      start: new Date().toISOString(),
      end: new Date().toISOString()
    },
    price: [
      { symbol: 'USD', value: 100 },
      { symbol: 'UAH', value: 4000 }
    ]
  }

  // products.value.push(newProduct);
  await axios.post(MOCK_API_URL_PRODUCT, newProduct)
    .then(response => {
      console.log('Продукт успешно добавлен:', response.data);
      // Обновляем список продуктов после добавления
      fetchProducts();
    })
    .catch(error => {
      console.error('Ошибка при добавлении продукта:', error);
    });

}

const fetchOrders = async () => {
  try {
    const response = await axios.get(MOCK_API_URL_ORDER);
    orders.value = response.data;
    console.log('Заказы успешно загружены:', orders.value);
  } catch (error) {
    console.error('Ошибка при загрузке заказов:', error);
  }
};

const fetchProducts = async () => {
  try {
    const response = await axios.get(MOCK_API_URL_PRODUCT);
    products.value = response.data;
    console.log('Продукты успешно загружены:', products.value);
  } catch (error) {
    console.error('Ошибка при загрузке продуктов:', error);
  }
};

onMounted(() => {
  fetchOrders();
  fetchProducts();
});

  // axios.get('https://6a43dfef6dba791499ab86d5.mockapi.io/orders')
  // .then(response => {
  //   orders.value = response.data;
  //   console.log('Заказы успешно загружены:', orders.value);
  //   console.log(response);
  // })
  // .catch(error => {
  //   console.error('Ошибка при загрузке заказов:', error);
  // });
//!!! Например после удаления можно просто вызвать await fetchProducts(); и список обновится.
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
        <NavigationMenu v-model="activeTab" />
        
        <!-- sidebar -->
        <div class="main col-12 col-md-9 col-lg-10 p-3 position-relative">
          <!-- <div class="tab-content">
            <div v-if="activeTab === 1">Контент ПРИХОД — список заказов</div>
            <div v-if="activeTab === 2">Контент ГРУППЫ</div>
            <div v-if="activeTab === 3">Контент ПРОДУКТЫ</div>
            <div v-if="activeTab === 4">Контент ПОЛЬЗОВАТЕЛИ</div>
            <div v-if="activeTab === 5">Контент НАСТРОЙКИ</div>
          </div> -->
          <OrderList v-if="activeTab === 1" :orders="orders" :products="products" @delete="openPopup" />
          <ProductList v-if="activeTab === 2 || activeTab === 3" :orders="orders" :products="products" @delete="openPopup" @add-order="addProduct" />
          <!--  -->
          <PopupView :is-open-popup="isOpenModalPopup" @close="closePopup" @confirm="confirmDelete" :item="selectedItem" />
        </div>
        <!-- /main -->
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
