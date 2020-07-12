export const PointerHelpers = {
  methods: {
    rgbStringToArray(string) {
      return string
        .slice(0, -1)
        .split("(")[1]
        .split(",");
    },
    invertCompression(num, algorithm) {
      switch (algorithm) {
        case "squared":
          return Math.pow(num, 2);
        case "gamma":
          if (num > 0.04045) {
            return Math.pow((num + 0.055) / 1.055, 2.4);
          } else {
            return num / 12.92;
          }
        default:
          return num;
      }
    },
    reapplyCompression(num, algorithm) {
      switch (algorithm) {
        case "squared":
          return Math.pow(num, 0.5);
        case "gamma":
          if (num > 0.0031308) {
            return 1.055 * Math.pow(num, 1 / 2.4) - 0.055;
          } else {
            return num * 12.92;
          }
        default:
          return num;
      }
    },
  },
};
