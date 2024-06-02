/** @type {import('tailwindcss').Config} */

module.exports = {
    content: [
        './src/**/*.{js,jsx,ts,tsx}',
        './src/*.{js,jsx,ts,tsx}',
    ],
    darkMode: 'class',
    theme: {
        fontFamily: {
            sans:['Inter','sans'],
            display: ['Open Sans', 'sans-serif'],
            body: ['Open Sans', 'sans-serif'],
        },
        extend: {
            fontSize: {
                14: '14px',
            },
            backgroundColor: {
                'main-bg': '#202281',
                'main-dark-bg': '#20232A',
                'secondary-dark-bg': '#33373E',
                'light-gray': '#F7F7F7',
                'half-transparent': 'rgba(0, 0, 0, 0.5)',
            },
            borderWidth: {
                1: '1px',
            },
            borderColor: {
                color: 'rgba(0, 0, 0, 0.1)',
            },
            colors: {
                primary: {
                    1: '#2970FF',
                    2: '#0040C1'
                },
            },
            width: {
                400: '400px',
                760: '760px',
                780: '780px',
                800: '800px',
                1000: '1000px',
                1200: '1200px',
                1400: '1400px',
            },
            spacing: {
                15: '1.5em',
            },
            height: {
                80: '80px',
            },
            minHeight: {
                590: '590px',
            },
            backgroundImage: {
            },
            dropShadow: {
                'login': [
                    '15px 15px 15px #0730ADFF',
                    '-15px -15px 20px #030B23FF'
                ],
                'login-button': [
                    '6px 6px 2px #0C2983',
                    '-6px -6px 7px #081B53'
                ],
                'login-blob': [
                    '6px 4px 4px #1f48bf',
                    '2px -6px 4px #081B53'
                ]
            }
        },
    },
    plugins: [
    ],
}