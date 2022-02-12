<template>
  <h2>Gratulujemy <span>zakupu</span></h2>
  <p>
    Wkrótce skontaktuje się z tobą przedstawiciel salonu z którego zakupiłeś
    samochód
  </p>
  <p>
    Następnie zgłoszą się potencjalni kurierzy gotowi dostarczyć twój samochód
    pod dom
  </p>
  <span class="back"
    @click="backToHome">Strona główna</span
  >
</template>

<script>
export default {
    methods: {
        backToHome() {
        this.$router.push({name:'Home'});
       
        }
    },
    unmounted() {
         window.location.reload();
    }
}
</script>

<style lang="scss" scoped>
     h2 {
         margin: 30px 0 20px;
     }
     p {
         margin-bottom: 15px;
     }
     .back {
         color:rgb(177, 13, 13);
         margin-bottom: 350px;
         font-size: 24px;
         cursor: pointer;
     }
</style>