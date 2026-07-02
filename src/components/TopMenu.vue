<script setup>
//start Header => TopMenu => date and time logic
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { socket } from '@/services/socket.js';

const activeUsers = ref(0);

const currentDateTime = ref(new Date());

const formattedDay = computed(() => {
  const day = new Intl.DateTimeFormat('ru-RU', { weekday: 'long' }).format(currentDateTime.value);
  return day.charAt(0).toUpperCase() + day.slice(1);
})

const formattedDate = computed(() => {
  const options = { day: '2-digit', month: 'short', year: 'numeric' };
  let dateString = new Intl.DateTimeFormat('ru-RU', options).format(currentDateTime.value);
  dateString = dateString.replace(/\s*г\.?$/, '');
  return dateString.replace(/(\s)([а-яё])/i, (match, space, char) => space + char.toUpperCase());
})

const formattedTime = computed(() => {
  return currentDateTime.value.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
})

let intervalId = null;

const handleActiveUsers = (count) => {
  activeUsers.value = count;
};

onMounted(() => {
  intervalId = setInterval(() => {
    currentDateTime.value = new Date();
  }, 1000);

  // socket.on('activeUsers', (count) => {
  //   activeUsers.value = count;
  // });
  socket.on('activeUsers', handleActiveUsers);
})

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId);
  }

  // socket.off('activeUsers');
  socket.off('activeUsers', handleActiveUsers);
})
// end Header => TopMenu => date and time logic
</script>

<template>
  <div>
    <div class="col-auto ms-auto order-2 order-lg-3">
      <div class="header_datetime">
        <div class="header__date-block d-flex align-items-end gap-3">
          <div class="active-users">
            👥 {{ activeUsers }}
          </div>
          <div class="header__day-date">
            <div class="header__day">{{ formattedDay }}</div>
            <div class="header__date">{{ formattedDate }}</div>
          </div>

          <div class="header__time-block d-flex align-items-center gap-2">
            <svg class="header__clock-icon" viewBox="0 0 24 24" width="16" height="16">
              <circle cx="12" cy="12" r="10" fill="none" stroke="#8bc34a" stroke-width="2" />
              <path d="M12 6v6l4 2" fill="none" stroke="#8bc34a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <div class="header__time">{{ formattedTime }}</div>
          </div>
        </div>
        <!-- header__date-block -->
      </div>
    </div>
    <!-- col-auto -->
  </div>
</template>

<style scoped>
</style>