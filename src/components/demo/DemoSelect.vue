<template>
  <div class="select-wrapper">
    <div class="border-gradient" v-if="isFocused"></div>
    <div
      class="input-wrapper"
      @click="showSelect"
    >
      <div class="icon-wrapper">
        <span class="material-icons">search</span>
      </div>
      <input @focus="isFocused = true" @blur="isFocused = false" />
    </div>
    <div class="select" v-if="isVisible">
      <div class="nodes" v-for="node in nodeList" :key="node">{{ node }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isVisible: false,
      isFocused: false,
      nodeList: [
        "flfldf",
        "fdkfkd",
        "fdkfkdfk",
        "flfldf",
        "fdkfkd",
        "fdkfkdfk",
        "flfldf",
        "fdkfkd",
        "fdkfkdfk",
        "flfldf",
        "fdkfkd",
        "fdkfkdfk",
      ],
    };
  },

  mounted() {
    window.addEventListener("click", this.onWindowClick);
  },

  beforeUnmount() {
    window.removeEventListener("click", this.onWindowClick);
  },

  methods: {
    showSelect(e) {
      if (this.isVisible === false) {
        this.isVisible = true;
      } else if (this.isVisible === true) {
        this.isVisible = false;
      }
      e.stopPropagation();
    },

    onWindowClick() {
      this.isVisible = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.select-wrapper {
  position: relative;
  z-index: 1;
}

.border-gradient {
  position: absolute;
  z-index: -1;
  background: rgb(255, 36, 255);
  width: 100%;
  height: 100%;
  padding: 3px;
  top: 50%; 
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  border-radius: 5px;
  background: linear-gradient(to right, #2657eb 20%, #de6161 100%);
}

.input-wrapper {
  display: flex;
  width: 100%;
  height: 40px;
  box-sizing: border-box;
  background: rgb(223, 223, 223);
  border-radius: 5px;
  overflow: hidden;
  z-index: 1;

  .icon-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    background: linear-gradient(to right, #815baf 0%, #516395 100%);
    user-select: none;
  }

  input {
    width: 260px;
    height: 40px;
    box-sizing: border-box;
    border: none;
    outline: none;
    background: rgb(223, 223, 223);
    font-size: 16px;
    padding: 8px;
  }
}

.select {
  position: absolute;
  width: 300px;
  max-height: 300px;
  background: rgb(223, 223, 223);
  border-radius: 0px 0px 5px 5px;
  overflow-y: auto;
  z-index: 2;

  .nodes {
    margin: 4px;
    padding: 6px;
    color: black;
    border-radius: 5px;
    border-bottom: 1px solid rgb(170, 170, 170);
    cursor: pointer;
    user-select: none;

    &:hover {
      background: rgb(199, 199, 199);
      transition: all 0.3s ease-in-out;
    }
  }
}
</style>
