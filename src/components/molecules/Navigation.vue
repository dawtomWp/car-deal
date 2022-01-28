<template>
  <header>
    <div class="container">
      <!-- Logo -->
      <div class="branding">
        <router-link class="header" :to="{ name: 'Home' }">
          <img src="@/assets/logo2.jpg" alt="CarDeals" />
        </router-link>
      </div>
      <!-- Menu -->
      <nav class="nav-links">
        <ul v-show="!this.mobile">
          <router-link class="link" :to="{ name: 'Home' }"
            >Homepage</router-link
          >
          <router-link class="link" :to="{ name: 'About' }">O nas</router-link>
          <router-link class="link" :to="{ name: 'Contact' }"
            >Kontakt</router-link
          >
          <router-link
            v-if="PROFILE_TYPE === 'merchant'"
            class="link"
            :to="{ name: 'Merchant Dashboard' }"
            >Panel sprzedawcy</router-link
          >
          <router-link
            v-if="PROFILE_TYPE === 'courier'"
            class="link"
            :to="{ name: 'Courier Dashboard' }"
            >Panel kuriera</router-link
          >
          <router-link v-if="!USER_LOGGED" class="link" :to="{ name: 'Login' }"
            >Zaloguj</router-link
          >
          <div v-else @click="toggleProfileMenu" class="initials">
            <p>{{ PROFILE_INITIALS }}</p>
          </div>
          <div v-show="profileMenu" class="user-profile">
            <div class="info">
              <div class="initials">
                <p>{{ PROFILE_INITIALS }}</p>
              </div>
              <div class="right">
                <p>{{ PROFILE_NAME }} {{ PROFILE_LASTNAME }}</p>
                <p>{{ PROFILE_EMAIL }}</p>
              </div>
            </div>
            <div class="user-panel">
              <div class="option">
                <Icon
                  class="profile-icon"
                  @click="toggleMobileNav"
                  v-show="mobile"
                  :link="require('../../assets/icons/user-crown-light.svg')"
                  altMsg="Co jest"
                />
                <router-link
                  v-if="PROFILE_TYPE === 'merchant'"
                  class="link"
                  :to="{ name: 'Merchant Dashboard' }"
                  style="color: white; font-weight: 400"
                  >Panel</router-link
                >
                <router-link
                  v-if="PROFILE_TYPE === 'courier'"
                  class="link"
                  :to="{ name: 'Courier Dashboard' }"
                  >Panel</router-link
                >
              </div>
              <div class="option" @click="logOut">
                <Icon
                  class="profile-icon"
                  v-show="mobile"
                  :link="require('../../assets/icons/sign-out-alt-regular.svg')"
                  altMsg="Co jest"
                />
                <p>Wyloguj</p>
              </div>
            </div>
          </div>
        </ul>
      </nav>

      <Icon
        @click="toggleMobileNav"
        v-show="mobile"
        :link="require('../../assets/icons/bars-regular.svg')"
        altMsg="Co jest"
      />
      <!-- MOBILE NAV -->
      <transition name="mobile-nav-animation">
        <ul class="mobile-nav" v-show="mobileNav">
          <router-link class="link" :to="{ name: 'Home' }">Strona główna</router-link>
          <router-link class="link" :to="{ name: 'About' }">O nas</router-link>
          <router-link class="link" :to="{ name: 'Contact' }"
            >Kontakt</router-link
          >
          <router-link
            v-if="PROFILE_TYPE === 'merchant'"
            class="link"
            :to="{ name: 'Merchant Dashboard' }"
            >Panel sprzedawcy</router-link
          >
          <router-link
            v-if="PROFILE_TYPE === 'courier'"
            class="link"
            :to="{ name: 'Courier Dashboard' }"
            >Panel kuriera</router-link
          >
          <router-link v-if="!user" class="link" :to="{ name: 'Login' }"
            >Zaloguj</router-link
          >
          <div v-else class="user-profile mobile-user-profile">
            <div class="info">
              <div class="initials">
                <p>{{ PROFILE_INITIALS }}</p>
              </div>
              <div class="right">
                <p>{{ PROFILE_NAME }} {{ PROFILE_LASTNAME }}</p>
                <p>{{ PROFILE_EMAIL }}</p>
              </div>
            </div>
            <div class="user-panel">
              <div class="option">
                <Icon
                  class="profile-icon"
                  @click="toggleMobileNav"
                  v-show="mobile"
                  :link="require('../../assets/icons/user-crown-light.svg')"
                  altMsg="Co jest"
                />
                <router-link
                  v-if="PROFILE_TYPE === 'merchant'"
                  class="link"
                  :to="{ name: 'Merchant Dashboard' }"
                  style="color: white; font-weight: 400"
                  >Panel</router-link
                >
                <router-link
                  v-if="PROFILE_TYPE === 'courier'"
                  class="link"
                  :to="{ name: 'Courier Dashboard' }"
                  >Panel</router-link
                >
              </div>
              <div class="option" @click="logOut">
                <Icon
                  class="profile-icon"
                  v-show="mobile"
                  :link="require('../../assets/icons/sign-out-alt-regular.svg')"
                  altMsg="Co jest"
                />
                <p>Wyloguj</p>
              </div>
            </div>
          </div>
        </ul>
      </transition>
    </div>
  </header>
</template>

<script>
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { mapState, mapMutations } from "vuex";
import Icon from "../atoms/Icon.vue";

export default {
  name: "navigation",
  components: {
    Icon,
  },
  data() {
    return {
      mobile: null,
      mobileNav: null,
      windowWidth: null,
      profileMenu: null,
      initialsLetters: null,
    };
  },
  created() {
    window.addEventListener("resize", this.checkScreenSize);
    this.checkScreenSize();
  },
  computed: {
    ...mapState([
      "USER_LOGGED",
      "PROFILE_EMAIL",
      "PROFILE_NAME",
      "PROFILE_LASTNAME",
      "PROFILE_INITIALS",
      "PROFILE_TYPE",
    ]),
    ...mapMutations(["SET_INITIALS"]),
    user() {
      // wykonuj za każdym razem kiedy zwracana wartość się zmieni
      return this.USER_LOGGED;
    },
  },
  methods: {
    toggleProfileMenu() {
      return (this.profileMenu = !this.profileMenu);
    },
    checkScreenSize() {
      this.windowWidth = window.innerWidth;
      if (this.windowWidth <= 768) {
        this.mobile = true;
        return;
      }
      this.mobile = false;
      this.mobileNav = false;
      return;
    },
    toggleMobileNav() {
      return (this.mobileNav = !this.mobileNav);
    },
    async logOut() {
      try {
        await firebase.auth().signOut();
        location.reload();
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/variables.scss";

header {
  position: relative;
  background-color: #fff;
  padding: 0 25px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  z-index: 99;

  .profile-icon {
    display: block !important;
    color: #fff;
    margin-right: 5px;
    width: 16px;
  }

  .branding {
    display: flex;
    align-items: center;

    img {
      width: 65px;
      padding: 5px 0;
    }
  }
  .nav-links {
    display: flex;
    flex: 1;
    padding: 25px 0;
    align-items: center;
    justify-content: flex-end;

    ul {
      display: flex;
      align-items: center;
      margin-right: 32px;
    }
    ul .link {
      margin-right: 32px;
    }
    ul .link:hover {
      color: $secondaryTextColor;
    }
  }

  .user-profile {
    display: flex;
    flex-direction: column;
    position: absolute;
    bottom: -136px;
    right: 0;
    min-width: 180px;
    background: #303030;
    color: #fff;
    padding: 15px;
    text-align: left;
    .info {
      display: flex;
      margin-bottom: 10px;

      .right {
        margin-left: 10px;
        font-weight: 100;
        font-size: 13px;
      }
      .right p:last-child {
        margin-top: 6px;
      }
    }
    .option {
      border-bottom: 1px solid #202020;
      display: flex;
      padding: 5px 0;
      width: 100%;
      cursor: pointer;
      transition: 0.4s background-color;

      &:hover {
        background-color: #4d4d4db0;
      }
    }
  }
}
.initials {
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 1px;
  font-weight: 600;
  color: $primaryTextColor;
  background-color: rgb(230, 104, 104);
  width: 35px;
  height: 35px;
  border-radius: 50%;
  cursor: pointer;
  margin-right: 0px;
  transition: 0.4s box-shadow;
  &:hover {
    box-shadow: 0px 12px 15px 1px rgba(250, 163, 163, 0.822);
  }
}
.mobile-nav {
  padding: 20px;
  width: 70%;
  max-width: 250px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: fixed;
  height: 100%;
  background-color: #303030;
  top: 0;
  left: 0;
}
.mobile-nav .link {
  padding: 15px 0;
  color: rgb(238, 238, 238);
}

/* MOBILE NAVBAR ANIMATION */

.mobile-nav-animation-enter-to {
  transform: translateX(0px);
}
.mobile-nav-animation-leave-to {
  transform: translateX(-350px);
}
.mobile-nav-animation-enter-active,
.mobile-nav-animation-leave-active {
  transition: 0.5s all ease-in;
}

@media (max-width: 768px) {
  header .user-profile {
    position: relative;
    bottom: 0;
    padding-left: 0;
  }
  .mobile-nav .link {
    color: #eeeeee;
    width: 100%;
    text-align: left;
    border-bottom: 1px solid #202020;
    transition: 0.4s background-color;
  }
  .mobile-nav .link:hover {
    background-color: #4d4d4db0;
  }
}
</style>