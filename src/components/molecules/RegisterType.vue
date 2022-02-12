<template>
    <div>
        <router-link class="link" :to="{name:'RegisterUser'}">Klient</router-link>
        <router-link class="link" :to="{name:'RegisterMerchant'}">Sprzedawca</router-link>
        <router-link class="link" :to="{name:'RegisterCourier'}">Kurier</router-link>
    </div>
</template>


<style lang="scss" scoped>

div a {
    margin-left: 7px;
}
</style>