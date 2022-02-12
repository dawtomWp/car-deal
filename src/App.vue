<template>
  <div class="app-wrapper">
     <div class="app">

        <Navigation/>
        <router-view />
        <Footer/>
     </div>

  </div>

</template>

<script>
import {mapState, mapActions} from 'vuex';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import Navigation from '../src/components/molecules/Navigation.vue';
import Footer from '../src/components/organisms/Footer.vue';


export default {
  name: 'app',
  components: {
    Navigation,
    Footer,

  },

  methods: {
    ...mapActions(['GET_CURRENT_USER'])
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      this.$store.commit("UPDATE_USER", user)
      if(user) {
        this.GET_CURRENT_USER();
      }
    })
  },
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,400;0,700;1,300&display=swap');
@import "./assets/styles/_variables.scss"; //wymagne w kazdym komponencie 

* {
  margin:0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $primaryTextColor;
}

.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

a {
  font-weight: bold;
  color: $primaryTextColor;
  text-decoration: none;

  &.router-link-exact-active {
      color: $secondaryTextColor;
  }
}

.container {
  display: flex;
}

input,select,option {
  display: block;
  padding:10px 0px 10px 9px;
  border:none;
  width:217px;
  background-color: rgb(250, 250, 250);
  box-shadow: 0px 5px 10px 1px rgba(196, 196, 196, 0.295);
}
       h2 {
           color:$primaryTextColor;
    
           font-size:48px;

           span {
               color:#fff;
               background: $secondaryColor;
           }
       }

</style>
