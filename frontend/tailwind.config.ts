import type { Config } from "tailwindcss";

export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#D44822",
                background: "#F8F8F6",
                surface: "#FFFFFF",
                border: "#E8E8E8",
                text: {
                    DEFAULT: "#111111",
                    secondary: "#6B6B6B",
                    tertiary: "#9E9E9E",
                },
                success: "#2E8B57",
                warning: "#E6A100",
                danger: "#D32F2F",
            },
            fontFamily: {
                sans: [
                    "ALS Granate",
                    "sans-serif",
                ],
                display: [
                    "ALS Granate",
                    "sans-serif",
                ],
                accent: [
                    "ALS Tolstoy",
                    "serif",
                ],
            },
            borderRadius: {
                sm: "8px",
                md: "12px",
                lg: "18px",
                xl: "24px",
            },
            boxShadow: {
                sm: "0 2px 6px rgba(0,0,0,.04)",
                md: "0 8px 20px rgba(0,0,0,.08)",
                lg: "0 18px 45px rgba(0,0,0,.12)",
            },
        },
    },
    plugins: [],
} satisfies Config;