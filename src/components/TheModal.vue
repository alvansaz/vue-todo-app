<template>
  <teleport to="body">
    <transition name="modal">
      
        <slot></slot>

    </transition>
  </teleport>
</template>

<style scoped>
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal,
.modal-leave-to .modal {
  opacity: 1;
  /* -webkit-transform: scale(1.1);
  transform: scale(1.1); */
}
</style>
