<template>
  <div class="app-sidebar">
    <div class="app-sidebar__top">
      <router-link to="/">
        <h1>Vue nodes demo</h1>
      </router-link>

      <div class="app-sidebar__links">
        <p>
          <router-link 
            :to="{ name: 'CalculatorDemo' }"
            active-class="app-sidebar__link--active"
          >
            Calculator demo
          </router-link>
        </p>

        <p>
          <router-link 
            :to="{ name: 'ShaderDemo' }"
            active-class="app-sidebar__link--active"
          >
            Shader demo
          </router-link>
        </p>      
      </div>
      <slot />
    </div>
    <div class="app-sidebar__bottom">
      <a href="https://github.com/m0ksem/vue-nodes">Github</a>
    </div>
  </div>
</template>

<style lang="scss">
.app-sidebar {
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
    background-image: linear-gradient(40deg, #00fffc 0%, #fc00ff 45%, #fffc00 100%);
    text-align: center;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  &__bottom {
    a {
      color: #00fffc;
      background-image: linear-gradient(40deg, #00fffc 0%, #fffc00 100%);
      background-clip: text;
      -webkit-text-fill-color: transparent;
      text-decoration: none;
    }
  }

  &__links {
    padding: 16px 0;

    a {
      color: #00fffc;

      background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    p:nth-child(1) {
      a {
        background-image: linear-gradient(144deg,  #00c6ff, #0072ff);
      }
    }

    p:nth-child(2) {
      a {
        background-image: linear-gradient(232deg, #fe8c00, #f83600);
      }
    }
  }

  &__link {
    &--active {
      &::before {
        content: '>';
      }
    }
  }

  a {
    text-decoration: none;
  }
}
</style>
