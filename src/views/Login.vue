<template>
    <div class="wrapper">
        <div class="left">
            <h1>Zaloguj się</h1>
            <form >
                <input v-model="userEmail" type="text" placeholder="Email lub nazwa użytkownika">
                <input v-model="userPassword" type="password" placeholder="Hasło">
                <button @click.prevent="submitLogin" type="submit">Zaloguj się</button>
            </form>
            
            <p v-show="error">{{errorMsg}}</p>
            <p>Nie masz konta? <router-link class="link" :to="{name:'Register'}">Zarejestruj się</router-link></p>
        </div>
        <div class="right"></div>
    </div>
  
</template>

<script>
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

export default {
    data() {
        return {
            userEmail: null,
            userPassword: null,
            userType: null,
            error: null,
            errorMsg: null
        }
    },
    computed: {

    },
    methods: {
        submitLogin() {
            firebase.auth().signInWithEmailAndPassword(this.userEmail,this.userPassword) 
                .then(() => {        
                    this.$router.push({name:'Home'});
                    this.error = false;
                    this.errorMsg = "";
                })
                .catch((err)=>{
                    this.error = true;
                    this.errorMsg = "Invalide email or password";
                    console.log(err);
                })
            
        }
    
    }
}


</script>


<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,400;0,700;1,300&display=swap');
@import "../assets/styles/_variables.scss"; //wymagne w kazdym komponencie 
   .wrapper {
       display: flex;

       .left {
           flex:1;
           display: flex;
           flex-direction: column;
           align-items: center;
           justify-content: center;
           & form {
               margin: 30px 0;

               & input {
                   margin: 15px 0;
                   width:250px;
                   height: 40px;
                   border-radius: 30px;
                   background-color:#e6e3e3;
               }
               & button[type=submit] {
                   background-color: $secondaryColor;
                   color:#fff;
                   width:170px;
                   margin: 0 auto;
                   font-size: 14px;
                   height: 35px;
                   border:none;
                   border-radius: 30px;
                   font-weight: 700;
                   cursor:pointer;
               }
           }
           a {
               color: $secondaryColor;
           }

       }
       .right {
           flex:1;
           position: relative;
           height: 100vh;
           background-image: url(../assets/images/bannerImg4.jpg);
           background-repeat: no-repeat;
           background-size: cover;
           background-position: center;

           &::before {
               position: absolute;
               width:100%;
               top:0;
               left:0;
               opacity: .6;
               content:"";
               height: 100%;
               background-color:$secondaryColor;
           }
       }
   }
</style>