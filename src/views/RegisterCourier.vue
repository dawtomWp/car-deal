<template>
    <div class="wrapper">
        <div class="left">
            <h1>New Courier</h1>
            <RegisterType/>
            <form >
                <input v-model="userName" type="text" placeholder="Imię">
                <input v-model="userLastName" type="text" placeholder="Nazwisko">
                <input v-model="userEmail" type="text" placeholder="Email lub nazwa użytkownika">
                <input v-model="userTelephone" type="number" placeholder="Phone Number">
                <input v-model="userPassword" type="password" placeholder="Hasło">
                <label for="">Choose Voivodeship</label>
                <select v-model="voivodeship">
                              <option value="Dolnośląskie">Lower Silesia</option>
                     <option value="Kujawsko-Pomorskie">Kuyavian-Pomeranian</option>
                     <option value="Lubelskie">Lublin</option>
                     <option value="Lubuskie">Lubusz</option>
                     <option value="Łódzkie">Łódź</option>
                     <option value="Małopolskie">Lesser Poland</option>
                     <option value="Mazowieckie">Masovian</option>
                     <option value="Opolskie">Opole</option>
                     <option value="Podkarpackie">Subcarpathian</option>
                     <option value="Podlaskie">Podlaskie</option>
                     <option value="Pomorskie">Pomeranian</option>
                     <option value="Śląskie">Silesian</option>
                     <option value="Świętokrzyskie">Holy Cross</option>
                     <option value="Warmińsko-Mazurskie">Warmian Masurian</option>
                     <option value="Wielkopolskie">Greater Poland</option>
                     <option value="Zachodnio-pomorskie">West Pomeranian</option>
                    
                 </select>
                 
                <button @click.prevent="register" type="submit">Zarejestruj</button>
            </form>

            
            <p v-show="error">{{errorMsg}}</p>
            <p>Masz już konto? <router-link class="link" :to="{name:'Login'}">Zaloguj się</router-link></p>
        </div>
        <div class="right"></div>
    </div>
  
</template>

<script>
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import RegisterType from '../components/molecules/RegisterType.vue';
import db from '../firebase/firebaseInit'

export default {
    data() {
        return {
            userName: null,
            userLastName: null,
            userEmail: null,
            userPassword: null,
            userType: null,
            userTelephone: null,
            error: null,
            errorMsg: null,
            type: 'courier',
            voivodeship: null
        }
    },
    components: {
        RegisterType
    },
    computed: {

    },
    methods: {
        async register() {
            if(
                this.userName !== "" &&
                this.userLastName !== "" &&
                this.userEmail !== "" &&
                this.userPassword !== "" &&
                this.userPassword.length > 8 &&
                this.voivodeship !== null
            ) {
                this.error = false;
                this.errorMsg = "";

                const firebaseAuth = await firebase.auth();
                const createUser = await firebaseAuth.createUserWithEmailAndPassword(this.userEmail,this.userPassword);
                const result = await createUser;
                const database = db.collection("users").doc(result.user.uid);
                await database.set({
                    name: this.userName,
                    lastname: this.userLastName,
                    email: this.userEmail,
                    type: this.type,
                    phone: this.userTelephone,
                    voivodeship: this.voivodeship
                })
                this.$router.push({name:"Home"});
                return;
            }
            this.error = true;
            this.errorMsg = "Some fields are empty or password is too short"
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