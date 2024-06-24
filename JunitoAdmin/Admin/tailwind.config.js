/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        gradientBot:"linear-gradient(88.9deg, rgba(255, 255, 255, 0.77) 26.63%, rgba(228, 228, 228, 0.4235) 98.84%)",
        gradienthover:"linear-gradient(88.9deg, rgba(130, 127, 160, 0.77) 26.63%, rgba(172, 172, 204, 0.4235) 98.84%)",
        gradientBTN:"background: linear-gradient(90deg, #827FA0 0%, #D9D7EC 100%)"
      },
      backgroundColor:{
        gray:"#777598",
      },
      colors:{
        gray:"#777598",
        lightgray:"#313131"
      },
      fontFamily:{
        play:"Playfair Display",
        head:"Akshar",
        subhead:"Alata",
        Para:"Poppins",
        mont:"Montserrat"
      },
      boxShadow:{
        shadow:"1px 0px 9.9px 0px #00000040",
        shadow2:"1px 0px 11.2px 0px #00000040",
        shadow3: "0px 4px 4px 0px #00000040"
      },
    }    
  },
  plugins: [],
}

