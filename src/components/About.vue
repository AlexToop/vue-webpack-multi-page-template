<template lang="html">
  <div id="app">
    <nav-bar :navbar-contents="navbarContents" />

    <section class="section">
      <div class="container">
        <div class="columns">
          <div class="column" />
          <div class="column is-three-quarters">
            <p class="title">
              Example About page.
            </p>
            <p class="subtitle">
              Example text.
            </p>
            <p><b>More </b>example text body.</p>
          </div>
          <div class="column" />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import navbar from './Navbar.vue'
import 'bulma/css/bulma.min.css'

export default {
  name: 'App',
  components: {
    'nav-bar': navbar
  },
  data: function () {
    return {
      navbarContents: {
        links: [
          {
            name: 'Home',
            class: '',
            href: '/',
            icon: 'fa-home',
            iconColor: 'has-text-primary'
          },
          {
            name: 'About',
            class: 'is-active',
            href: '/about/',
            icon: 'fa-info-circle',
            iconColor: 'has-text-dark'
          }
        ],
        buttons: [
          {
            text: 'alextoop.com',
            class: 'is-info',
            href: 'https://www.alextoop.com',
            isLogout: 'false'
          }
        ]
      }
    }
  }
}
</script>

<style scoped>
.has-padding-top {
  padding-top: 3rem;
}
</style>
