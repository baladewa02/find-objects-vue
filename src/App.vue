<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <div>Find Objects</div>
      </div>

      <v-spacer></v-spacer>

      <v-btn text>
        <span class="mr-2"><v-icon>mdi-account</v-icon></span>
      </v-btn>
    </v-app-bar>

    <v-main>
      <UploadImage />
    </v-main>
  </v-app>
</template>

<script>
import UploadImage from "./components/UploadImage";

export default {
  name: "App",

  components: {
    UploadImage,
  },

  data: () => ({
    //
  }),
};
</script>
