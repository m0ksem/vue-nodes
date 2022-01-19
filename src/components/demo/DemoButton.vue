<template>
    <div class="button-wrapper">
        <slot></slot>
    </div>
</template>

<style lang="scss" scoped>
.button-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 300px;
    height: 40px;
    background: red;
    border-radius: 5px;
}
</style>