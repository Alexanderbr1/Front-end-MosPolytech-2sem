<template>
    <button class="btn">
        <slot></slot>
    </button>
</template>
<script>
export default {
    name: 'my-button'
    
}
</script>
<style scoped>
    .btn {
        background-color: black;
        color: white;
        font-weight: 700;
        font-size: 12px;
        border-radius: 20px;
        padding: 10px 20px;
        display: block;
    }

    .btn:focus {
        outline: 2px solid red;
    }

    .btn:hover {
        transform: scale(1.2);
        transition: 1s;
    }
</style>