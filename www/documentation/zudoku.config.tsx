import type { ZudokuConfig } from "zudoku";

const config: ZudokuConfig = {
  site: {
    showPoweredBy: false,
    logo: {
      src: { light: "/logo-dark.png", dark: "/logo-light.png" },
      alt: "Opencircle",
      width: "100px",
    },
  },
  navigation: [
    {
      type: "category",
      label: "Documentation",
      items: [
        {
          type: "category",
          label: "Getting Started",
          icon: "sparkles",
          items: [
            "/introduction",
          ],
        },
      ],
    },
  ],
  redirects: [{ from: "/", to: "/introduction" }],

};

export default config;
