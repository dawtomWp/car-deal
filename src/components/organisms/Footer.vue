<template>
    <footer>
        <div class="wrapper">
         <div class="left">
             
             <h3>Found Us: </h3>
             <p>Facebook</p>
             <p>Instagram</p>
             <p>Youtube</p>
         </div>

         <div class="middle">
             <h3>Contact:</h3>
             <p>574-843-9220</p>
             <p>431-673-2424</p>
             <p>contact@cardeals.com</p>
         </div>

         <div class="right">
             <h3>CarDeals</h3>
                   <router-link class="link" :to="{name:'Home'}">Homepage</router-link>
                   <router-link class="link" :to="{name:'About'}">About</router-link>
                   <router-link class="link" :to="{name:'Contact'}">Contact</router-link>
                   <router-link v-if="!user" class="link" :to="{name:'Login'}">Login</router-link>
         </div>
         </div>

         <div class="copyright">
             2021 All rights reserved. Created by CarDeals
         </div>
    </footer>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

    footer {
       background: $primaryColor;
       color:white;
       padding: 35px 15px;
       .wrapper {
           display: flex;
           max-width: 1152px;
           margin: 0 auto;
           align-items: flex-start;
           justify-content: space-between;

           div {
               text-align:left;

               h3 {
                   color: $secondaryTextColor;
               }
               p {
                   margin-top: 9px;
               }
           }
           .right a {
               color:#fff;
               display: block;
               margin-top: 9px;
               font-weight: 500;
           }
       }

       .copyright {
           max-width: 1152px;
           margin: 20px auto;
           border-top: 1px solid $secondaryTextColor;
           padding:20px 0;
           text-align: left;
       }


    }
    @media (max-width:768px) {
        .wrapper {
            flex-direction: column;
            align-items: center !important;
            div {
                text-align:center !important;
                margin-top: 30px;
            }
        }
    }


</style>