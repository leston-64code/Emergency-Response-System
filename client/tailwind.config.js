/** @type {import('tailwindcss').Config} */

import daisyui from "daisyui"
import  flowbite from "flowbite-react/tailwind"

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {},
  },
  plugins: [
    daisyui,
    flowbite.plugin(),
  ],
}


