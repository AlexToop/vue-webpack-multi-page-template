<template lang="html">
  <div id="app">
    <nav-bar
      :navbar-contents="navbarContents"
      :img-url="imgUrl"
    />

    <beta-banner />
  </div>
</template>

<script>
import navbar from './Navbar.vue'
import betaBanner from './BetaBanner.vue'

export default {
  name: 'App',
  components: {
    'nav-bar': navbar,
    'beta-banner': betaBanner
  },
  data: function () {
    return {
      navbarContents: {
        links: [
          {
            name: 'Home',
            class: 'is-active',
            href: '/',
            icon: 'fa-home',
            iconColor: 'has-text-primary'
          },
          {
            name: 'About',
            class: '',
            href: '/about/',
            icon: 'fa-info-circle',
            iconColor: 'has-text-dark'
          }
        ],
        buttons: [
          {
            text: 'alextoop.com',
            class: 'is-info',
            href: 'https://alextoop.com',
            isLogout: 'false'
          }
        ]
      }
    }
  },
  beforeMount: function () {},
  mounted: function () {
    this.$nextTick(function () {})
  },
  methods: {}
}
</script>

<style>
.has-padding-top {
  padding-top: 1.5rem;
}

.section {
  padding: 1.5rem 1.5rem;
}

.column {
  padding: 1vw 0.75rem;
}
</style>
