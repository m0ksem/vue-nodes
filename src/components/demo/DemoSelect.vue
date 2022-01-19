<template>
  <div class="select-wrapper">
    <div class="input-wrapper" @click="showSelect">
      <div class="icon-wrapper">
        <span class="material-icons">search</span>
      </div>
      <input />
    </div>
    <div class="select" v-if="isVisible"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isVisible: false,
    };
  },

  methods: {
    showSelect() {
      if (this.isVisible === false) {
        this.isVisible = true;
      } else if (this.isVisible === true) {
        this.isVisible = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.input-wrapper {
  display: flex;
  width: 300px;
  height: 40px;
  box-sizing: border-box;
  background: rgb(223, 223, 223);
  border-radius: 5px;
  overflow: hidden;

  .icon-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    background: rgb(170, 170, 170);
    user-select: none;
  }

  input {
    width: 260px;
    height: 40px;
    box-sizing: border-box;
    border: none;
    outline: none;
    background: rgb(223, 223, 223);
  }
}

.select {
  position: absolute;
  width: 300px;
  height: 300px;
  background: cadetblue;
  border-radius: 0px 0px 5px 5px;
}
</style>
