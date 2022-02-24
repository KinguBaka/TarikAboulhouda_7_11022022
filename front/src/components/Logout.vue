<template>
    <div id="logout">
        <a class="nav-link" @click.prevent="logout" href=""><i class="fas fa-sign-out-alt"></i>   Deconnexion</a>
    </div>
</template>

<script>

    export default {
        name: 'Logout',
        methods: {
            logout() {
                localStorage.removeItem('token');
                sessionStorage.clear();
                this.$store.dispatch('user', null);
                this.$store.dispatch('posts', null);
                this.$store.dispatch('comments', null);
                this.$router.push('/').catch(err => {
                // Ignore the vuex err regarding  navigating to the page they are already on.
                if (
                    err.name !== 'NavigationDuplicated' &&
                    !err.message.includes('Avoided redundant navigation to current location')
                ) {
                    // But print any other errors to the console
                    console.log(err);
                }
                });
            }
        }
    }
</script>

<style lang="scss">

</style>