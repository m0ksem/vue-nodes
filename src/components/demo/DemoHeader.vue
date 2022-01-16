<template>
  <div class="nodes-demo-header">
    <div class="nodes-demo-header__top">
      <slot />
    </div>
    <div class="nodes-demo-header__bottom">
    </div>
  </div>
</template>

<style lang="scss">
.nodes-demo-header {
  background: black;
  color: white;
  text-align: left;
  padding: 24px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 350px;

  h1 {
    margin: 0;
    background-image: linear-gradient(
        40deg,
        #00fffc 0%,
        #fc00ff 45%,
        #fffc00 100%
      );
    text-align: center;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}
</style>
