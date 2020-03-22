<template lang="html">
  <div :id="uniqueModalName" class="modal">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ title }}</p>
        <button
          v-on:click="toggleModal()"
          class="delete"
          aria-label="close"
        ></button>
      </header>
      <section class="modal-card-body" v-html="htmlInnerContent"></section>
      <footer class="modal-card-foot">
        <button v-on:click="postitiveFunctionCall()" class="button is-primary">
          Confirm
        </button>
        <button v-on:click="toggleModal()" class="button">Cancel</button>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: "modal",
  methods: {
    toggleModal: function() {
      console.log("@: modal toggle");
      document
        .getElementById(this.uniqueModalName)
        .classList.toggle("is-active");
    },
    postitiveFunctionCall: function() {
      document.dispatchEvent(
        new CustomEvent(this.uniqueModalName + "Positive", {})
      );
    }
  },
  props: ["title", "htmlInnerContent", "uniqueModalName"],
  mounted: function() {
    this.$nextTick(function() {
      document.addEventListener(this.uniqueModalName, this.toggleModal);
    });
  }
};
</script>

<style scoped></style>
