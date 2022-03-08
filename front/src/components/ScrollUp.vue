<template>
    <scroll-to-top-wc id="scrollUp" activatewhen="400">
            <div slot="text"><i class="fas fa-arrow-up"></i></div>
    </scroll-to-top-wc>
</template>

<script>
    import "scroll-to-top-wc"

    export default {
        name: 'ScrollUp'
    }
</script>

<style lang="scss">

    body {
        scroll-behavior: smooth;
    }

    scroll-to-top-wc {
        right: 3%;
    }

    scroll-to-top-wc::part(container) {
        color: #1b5ad4;
        border-radius: 50px;
        border: 1px solid grey;
    }

</style>