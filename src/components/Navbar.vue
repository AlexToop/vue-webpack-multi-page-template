<template lang="html">
  <div id="navbar">
    <nav
      class="navbar has-shadow is-spaced"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="container">
        <div class="navbar-brand">
          <a class="navbar-item" href="/">
            <p><b>Example App</b></p>
          </a>

          <a
            role="button"
            class="navbar-burger burger custom-hamburger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" class="navbar-menu">
          <div class="navbar-start">
            <a
              v-for="link in navbarContents.links"
              class="navbar-item"
              v-bind:href="link.href || '#'"
              v-bind:class="link.class"
            >
              {{ link.name }}
            </a>
          </div>

          <div class="navbar-end">
            <div class="navbar-item">
              <div class="buttons">
                <a
                  v-for="button in navbarContents.buttons"
                  class="button"
                  v-bind:class="button.class"
                  v-bind:href="button.href"
                  v-on:click="toggleLogoutModal(button)"
                  ><strong>{{ button.text }}</strong></a
                >

                <figure class="image is-48x48">
                  <img class="is-rounded" :src="imgUrl" />
                </figure>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <modal
      v-bind:uniqueModalName="'logoutModal'"
      v-bind:title="'Logout?'"
      v-bind:htmlInnerContent="logoutInnerHtml"
    ></modal>
  </div>
</template>

<script>
let $ = require("jquery/dist/jquery.slim");
require("bulma/css/bulma.min.css");
import modal from "./Modal.vue";

export default {
  name: "navbar",
  components: {
    modal: modal
  },
  methods: {},
  data: function() {
    return {
      logoutInnerHtml:
        '<article class="message is-danger"><div class="message-body">Are you sure?</div></article>'
    };
  },
  mounted: function() {
    this.$nextTick(function() {
      document.addEventListener("logoutModalPositive", this.logout);
    });
  },
  props: ["navbarContents", "imgUrl"]
};

$(document).ready(function() {
  $(".navbar-burger").click(function() {
    $(".navbar-burger").toggleClass("is-active");
    $(".navbar-menu").toggleClass("is-active");
  });
});
</script>

<style scoped>
a.navbar-item > .icon {
  margin-left: -0.25em;
  margin-right: 0.25em;
}

.custom-hamburger {
  height: auto;
  width: 4.25rem;
}

.is-rounded {
  max-width: 48px;
  max-height: 48px;
}

.button {
  margin: auto 0;
}
</style>
