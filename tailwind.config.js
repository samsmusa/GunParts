module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    backgroundImage: {
      login: "url('./public/assets/image/image-1.jpg')",
    },
    fontFamily: {
      sans: ["ui-sans-serif", "system-ui"],
      serif: ["ui-serif", "Georgia"],
      mono: ["ui-monospace", "SFMono-Regular"],
      display: ["Oswald"],
      body: ['"Open Sans"'],
      cursive: ["Audiowide"],
      roboto: ["Roboto"],
      code: ["Fira Code"],
    },
    colors: {
      blue: "#1fb6ff",
      purple: "#7e5bef",
      pink: "#ff49db",
      orange: "#ff7849",
      green: "#13ce66",
      yellow: "#ffc82c",
      "gray-dark": "#273444",
      gray: "#8492a6",
      "gray-light": "#d3dce6",
    },
    extend: {},
  },
  daisyui: {
    themes: [
      {
        guntheme: {
          primary: "#0FCFEC",
          secondary: "#878244",
          accent: "#3A4256",
          neutral: "#3d4451",
          "base-100": "#ffffff",
        },
      },
      "dark",
      "cupcake",
    ],
  },
  plugins: [require("daisyui")],
};