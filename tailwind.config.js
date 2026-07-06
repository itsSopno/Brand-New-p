/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: '#0a0a0c',
                primary: {
                    light: '#e0e7ff',
                    DEFAULT: '#6366f1', // sleek violet-blue
                    dark: '#4f46e5',
                },
                accent: {
                    light: '#f472b6',
                    DEFAULT: '#ec4899', // bright pink
                    dark: '#db2777',
                },
                slateCustom: {
                    800: '#1e1e24',
                    900: '#121216',
                }
            },
            fontFamily: {
                sans: ['Outfit', 'sans-serif'],
            },
            animation: {
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            }
        },
    },
    plugins: [],
}
