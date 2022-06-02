module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
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
    extend: {},
  },

  daisyui: {
    themes: ["dark"],
  },


  plugins: [require("daisyui")],
};