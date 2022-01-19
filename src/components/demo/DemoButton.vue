<template>
  <div class="button-wrapper">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.button-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 40px;
  background: linear-gradient(to right, #de6161 20%, #2657eb 100%);
  border-radius: 5px;
  user-select: none;
  cursor: pointer;

  &::after {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    opacity: 0;
    background: rgba($color: #ffffff, $alpha: 0.1);
    content: "";
    transition: all 0.3s ease-in-out;
    pointer-events: none;
  }

  &:hover {
    overflow: hidden;
    &::after {
    opacity: 1;
  }
  }
}
</style>