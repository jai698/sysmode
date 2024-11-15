/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          primary: '#0F172A',    
          secondary: '#1E293B',  
          accent: '#3B82F6',     
          surface: '#1F2937',    
          text: '#F3F4F6'        
        }
      }
    }
  },
  plugins: [],
}