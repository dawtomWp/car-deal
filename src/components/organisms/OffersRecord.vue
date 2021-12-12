<template>
    <div class="wrapper">
         <h2 v-if="!SEARCH_MODE"><span>L</span>atest offers</h2>
         <h2 v-else><span>S</span>earch Result</h2>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    data() {
        return {
            
        }
    },
    computed: {
        ...mapState(['SEARCH_MODE'])
    }
}
</script>


<style lang="scss" scoped>

    @import "@/assets/styles/_variables.scss";

    .wrapper {     
       position: relative;
       max-width:1152px;
       padding: 100px 50px;
       margin: 60px auto;

       h2 {
           color:$primaryTextColor;
           text-align:left;
           font-size:48px;

           span {
               color:#fff;
               background: $secondaryColor;
           }
       }
    }
</style>