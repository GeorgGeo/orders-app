<script setup>
const props = defineProps({
  isOpenPopup: {
    type: Boolean,
    default: false,
  },
  item: {
    type: Object,
    default: null,
  }
});

const emit = defineEmits(['close', 'confirm']);

const closePopup = () => {
  emit('close');
};

const confirmDelete = () => {
  emit('confirm');
}
</script>

<template>
  <transition name="fade" appear>
    <div v-if="props.isOpenPopup" class="">
      <!-- Попап ограничен областью main (справа от aside) -->
      <div class="popup-wrapper">
        <div class="popup-overlay" @click.self="closePopup">
          <div class="popup modal-dialog modal-dialog-centered">
            <div class="popup__content modal-content position-relative">
              <!-- <button type="button" class="popup__close btn-close" @click="closePopup"></button> -->
              <!-- Кнопка -->
              <div class="popup__header d-flex justify-content-end align-items-center p-3">
                <button type="button" class="popup__close d-flex align-items-center justify-content-center " @click="closePopup">X</button>
              </div>

              <!-- Тело -->
              <div class="popup__body p-3">
                <p class="popup__text popup__text--warning mb-3">
                  Вы уверены, что хотите удалить этот приход?
                </p>

                <!-- Карточка с данными -->
                <div class="popup__card border p-3 rounded-3 bg-light">
                  <p class="popup__card-title fw-bold mb-1">{{ props.item?.data?.title }}</p>
                </div>
              </div>

              <!-- Футер с кнопками -->
              <div class="popup__footer p-3 d-flex justify-content-end gap-2 border-top bg-gradient bg-success bg-opacity-75">
                <button type="button" class="popup__btn popup__btn--cancel btn btn-outline-secondary btn text-uppercase" @click="closePopup">
                  Отменить
                </button>
                <button type="button" class="popup__btn popup__btn--danger btn d-flex align-items-center gap-2" @click="confirmDelete">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                  </svg>
                  <p class="mb-0 text-uppercase">Удалить</p>
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
/* ОБНОВЛЕНО: попап ограничен областью .main (не перекрывает aside) */
.popup-wrapper {
  position: absolute; /* или relative, если .main имеет position: relative */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1050;
  pointer-events: none; /* чтобы клики проходили сквозь wrapper */
}

.popup-overlay {
  position: absolute; /* вместо fixed */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: auto; /* включаем клики только на overlay */
}

.popup {
  max-width: 450px;
  width: 100%;
  margin: 0 1rem;
}

.popup__content {
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  background: #ffffff;
}
.popup__close {
  width: 32px;
  height: 32px;
  position: absolute;
  top: -5%;
  right: -5%;
  border: none;
  border-radius: 50%;
  padding: 0.5rem;
  background: #e3e8e4;
}
.popup__close:hover {
  background: #6e7479;
}

.popup__title {
  font-weight: 600;
  font-size: 1rem;
}

.popup__text--warning {
  font-weight: 500;
}

.popup__card {
  background-color: #f8f9fa;
  border: 1px solid #e9ecef;
}

.popup__card-title {
  font-size: 0.95rem;
}

.popup__card-subtitle {
  font-size: 0.8rem;
}

.popup__card-item {
  font-size: 0.9rem;
}
.popup__btn--cancel {
  background: green;
}
.popup__btn--cancel:hover {
  background: #c1c8cd;
  color: rgb(198, 75, 75);
}
.popup__btn--danger {
  background: #fff;
  color: rgb(198, 75, 75);
}
.popup__btn--danger:hover {
  background: #c1c8cd;
  color: #fff;
}
</style>