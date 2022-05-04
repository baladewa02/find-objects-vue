<template>
  <v-form v-model="valid">
    <v-container>
      <v-row class="text-center">
        <v-col cols="12">
          <div class="text-left">
            <h3>
              Select and upload the image to highlight the objects (vehcles,
              people)
            </h3>
          </div>
          <v-alert dense type="error" v-if="serviceError">
            Service is down, Please try again later!
          </v-alert>
          <v-file-input
            show-size
            truncate-length="18"
            label="Select Image"
            accept="image/png, image/jpeg"
            @change="displayFile"
            v-model="form.file"
          ></v-file-input>
          <div
            class="grey darken-4"
            v-bind:width="canvasDimention.w"
            v-bind:height="canvasDimention.h"
          >
            <canvas id="mycanvas"></canvas>
            <v-progress-linear
              indeterminate
              color="primary"
              v-if="loading"
            ></v-progress-linear>
          </div>
          <br />
          <v-btn color="success" @click="validate" :disabled="form.file == ''"
            >Upload</v-btn
          >
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
<style scoped>
.v-progress-circular {
  position: absolute;
}
</style>
<script>
import commonService from "../services";

export default {
  name: "UploadImage",
  data: () => ({
    valid: true,
    serviceError: false,
    processedData: null,
    imageSize: { w: 0, h: 0 },
    canvasDimention: {
      w: window.innerWidth - 160, //TODO need to move to constants file
      h: window.innerHeight - 260,
    },
    imgUrl: null, //TODO need to move to constants file
    form: {
      file: [],
    },
    loading: false,
  }),
  mounted() {
    this.displayFile();
  },
  methods: {
    validate() {
      this.loading = true;
      this.serviceError = false;
      const formData = new FormData();
      formData.append("file", this.form.file);
      commonService
        .sendImage(formData)
        .catch(() => {
          this.serviceError = true;
          this.loading = false;
        })
        .then((response) => response.data)
        .then((response) => {
          this.processedData = commonService.precessResponse(
            response,
            this.imageSize
          );
          this.loading = false;
          const canvas = document.getElementById("mycanvas");
          const ctx = canvas.getContext("2d");
          for (let i = 0; i < this.processedData.length; i++) {
            let element = this.processedData[i];
            ctx.strokeStyle = commonService.getColorByScore(element.score);
            ctx.strokeRect(
              element.bbox[0],
              element.bbox[1],
              element.bbox[2],
              element.bbox[3]
            );
          }
        });
    },
    displayFile(fileObj) {
      this.createImage(fileObj);
    },
    createImage(file) {
      const image = new Image();
      const reader = new FileReader();
      this.serviceError = false;
      image.onload = () => {
        const canvas = document.getElementById("mycanvas");
        const context = canvas.getContext("2d");
        this.imageSize.w = canvas.width = image.width;
        this.imageSize.h = canvas.height = image.height;
        context.drawImage(image, 0, 0);
      };
      reader.onload = (e) => {
        this.imgUrl = image.src = e.target.result;
      };
      if (!!file && file.type && file.type.indexOf("image") > -1) {
        reader.readAsDataURL(file);
      } else {
        image.src = require("../assets/dummy-image-square.jpg");
        this.form.file = [];
        this.processedData = null;
      }
    },
  },
};
</script>