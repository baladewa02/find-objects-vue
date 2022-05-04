import axios from 'axios';
// FAKE API for learning only
// eslint-disable-next-line
const API_URI = process.env.SERVICE_API || 'https://europe-west1-promiseq-production2.cloudfunctions.net';

export default {
  sendImage(form) {
    return axios.post(`${API_URI}/detectObjectsFromImg`, form);
  },

  caculateDrawItem(dimentions, imageSize) {
    return [
      Math.round(dimentions[0] * imageSize.w),
      Math.round(dimentions[1]  * imageSize.h),
      Math.round((dimentions[2] - dimentions[0]) * imageSize.w),
      Math.round((dimentions[3] - dimentions[1]) * imageSize.h)
    ]
  },

  precessResponse(response, imageSize) {
    return response.boxes.map(element => {
      return {
        bbox: this.caculateDrawItem(element.bbox, imageSize),
        label: element.label,
        score: element.score
      }
    });
  },

  getColorByScore(value) {
    var hue=((1-value)*120).toString(10);
    return ["hsl(",hue,",100%,50%)"].join("");
  }
};
