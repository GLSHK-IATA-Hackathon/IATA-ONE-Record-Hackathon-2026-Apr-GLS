<script lang="ts" setup>
import crossIcon from '@/libs/svg/cross.svg';

const props = withDefaults(defineProps<{
  visible: boolean;
  enableBackdropClose?: boolean;
  hideTitle?: boolean;
  title?: string | null;
}>(), {
  enableBackdropClose: false,
  hideTitle: false,
  title: null,
});

const emit = defineEmits(['close']);

const backdropDidClick = () : void => {
  if (props.enableBackdropClose) {
    emit('close');
  }
}

const closeBtnDidClick = (): void => {
  emit('close');
}

</script>

<template>
  <div v-if="props.visible" @click.self="backdropDidClick" class="dialog-wrapper">
    <div class="dialog-wrapper__content dialog-content-wrapper">
      <div class="dialog-content-wrapper__header dialog-content-header">
        <span v-if="!props.hideTitle || props.title == null" class="dialog-content-header__title">{{ props.title }}</span>
        <span v-else></span>
        <div class="icon-button dialog-content-header__close-button" @click="closeBtnDidClick">
          <img :src="crossIcon" alt="" class="dialog-content-header__close-button-img">
        </div>
      </div>
      <div class="dialog-content-wrapper__body">
        <slot/>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.dialog-wrapper {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;

  &__content {
    min-width: 320px;
    //min-height: 240px;
    max-width: 80vw;
    max-height: 80vh;
    background-color: #FFF;
  }
}

.dialog-content-wrapper {
  display: flex;
  flex-direction: column;

  &__header {
    background-color: #1A8242;
    color: #fff;
    padding: 15px 12.5px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  &__body {
    overflow-y: auto;
    padding: 10px;
    margin: 0 0 10px;
  }
}

.dialog-content-header {
  left: 0;
  top: 0;
  position: relative;

  &__title {
    font-size: $medium-body-font-size;
    font-weight: $medium-body-font-weight;
    line-height: $medium-body-line-height;
    font-weight: bold;
  }

  &__close-button {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__close-button-img {
    width: 16px;
    height: 16px;
  }
}

</style>