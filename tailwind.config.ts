import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#50d379",
          secondary: "#fcbeb0",
          accent: "#128d96",
          neutral: "#2d2537",
          "base-100": "#f8f5fa",
          info: "#acc0ec",
          success: "#19ccab",
          warning: "#bd7005",
          error: "#ee1753",
        },
      },
    ],
  },
};
export default config;
