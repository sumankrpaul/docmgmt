
const config= {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
          'footer_bg_image': "url('/images/Footer-BG.webp')",
          'menu_bg_image': "url('/images/nav-bg.webp')",
      },
      fontFamily: {
        'nunito': ['Nunito', 'sans-serif']
      },
    },
  }
}
export default config
