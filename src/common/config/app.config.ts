export const APP_CONFIG = () => {
    return {
        PORT: process.env["PORT"],
        NODE_ENV: process.env["NODE_ENV"],
        DEFAULT_PROFILE_PIC: process.env["DEFAULT_PROFILE_PIC"],
        PAYMENT_SERVICE_URL: process.env["PAYMENT_SERVICE_URL"],
        EMAIL_SERVICE_URL: process.env["EMAIL_SERVICE_URL"],
        VITE_FRONTEND_URL: process.env["VITE_FRONTEND_URL"],
    }
}
