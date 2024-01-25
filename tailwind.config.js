/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,js,ts,jsx,tsx}', './public/index.html'],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#6FCFEB'
                }
            }
        }
    },
    plugins: []
}
