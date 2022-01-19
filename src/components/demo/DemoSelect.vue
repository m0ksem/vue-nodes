<template>
    <div class="select-wrapper">
        <input @click="showSelect">
        <div class="select" v-if="isVisible">

        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isVisible: false,
        } 
    },

    methods: {
        showSelect() {
            if (this.isVisible === false ) {
                this.isVisible = true
            } else if (this.isVisible === true) {
                this.isVisible = false
            }
        }
    },
}
</script>

<style lang="scss" scoped>
input {
    width: 300px;
    height: 40px;   
    box-sizing: border-box;
}

.select {
    position: absolute;
    width: 300px;
    height: 300px;
    background: cadetblue;
    border-radius: 0px 0px  5px 5px;
}
</style>