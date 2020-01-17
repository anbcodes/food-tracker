<template>
  <v-app>
    <router-view />
    <v-bottom-navigation
      app
      :value="activeBtn"
      color="deep-purple accent-4"
      fixed
      grow
      height="60px"
      class="pa-3"
    >
      <v-btn
        min-height="45"
        class="noActiveState"
        @click="$router.push({name: 'edit'})"
      >
        <span>Goals</span>
        <v-icon>mdi-pencil</v-icon>
      </v-btn>

      <v-btn
        min-height="45"
        class="noActiveState"
        @click="$router.push({name:'home'})"
      >
        <span>Home</span>
        <v-icon>mdi-home</v-icon>
      </v-btn>

      <v-btn
        min-height="45"
        class="noActiveState"
        @click="$router.push({name:'account'})"
      >
        <span>Account</span>
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    activeBtn: 1,
  }),

  created() {
    const map = {
      edit: 0,
      home: 1,
      account: 2,
    };
    this.activeBtn = map[this.$route.name];
  },
};
</script>
<style>
.noActiveState:focus::before {
  opacity: 0 !important;
}
</style>
