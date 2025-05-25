export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  modules: [
    "@nuxt/ui",
    "@nuxtjs/i18n",
    "nuxt-nodemailer",
    'nuxt-auth-utils',
  ],
  i18n: {
    baseUrl: process.env.NUXT_BASE_URL || 'http://localhost:3000',
    defaultLocale: "en",
    locales: [
      { code: "en", language: 'en-US', name: "English", file: "en.json" },
      { code: "ru", language: 'ru-RU', name: "Русский", file: "ru.json" },
    ],
  },
  runtimeConfig: {
    public: {
      appUrl: process.env.NUXT_BASE_URL || 'http://localhost:3000'
    }
  },
  nodemailer: {
    from: process.env.EMAIL_SMTP_FROM,
    host: process.env.EMAIL_SMTP_HOST,
    port: process.env.EMAIL_SMTP_PORT,
    secure: true,
    auth: {
      user: process.env.GMAIL_SMTP_USER,
      pass: process.env.GMAIL_SMTP_PASS,
    },
  },
  css: ["~/assets/css/main.css"],
});
