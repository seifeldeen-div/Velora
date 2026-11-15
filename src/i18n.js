import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const translations = {
  en: {
    translation: {
      app: {
        error: 'An unexpected application error occurred.',
        placeholder: 'This screen is a route placeholder for a later phase.',
      },
      language: {
        arabic: 'العربية',
        english: 'English',
        toggle: 'Change language',
      },
      pages: {
        about: 'About',
        accessDenied: 'Access denied',
        account: 'Account overview',
        addresses: 'Addresses',
        adminCategories: 'Categories',
        adminContent: 'Content pages',
        adminDashboard: 'Admin dashboard',
        adminOrderDetails: 'Order details',
        adminOrders: 'Orders',
        adminProductCreate: 'Create product',
        adminProductEdit: 'Edit product',
        adminProducts: 'Products',
        adminReviews: 'Reviews moderation',
        cart: 'Cart',
        checkout: 'Checkout',
        contact: 'Contact',
        forgotPassword: 'Forgot password',
        home: 'Home',
        login: 'Login',
        notFound: 'Page not found',
        orderConfirmation: 'Order confirmation',
        orderDetails: 'Order details',
        orders: 'Orders',
        policies: 'Policies',
        productDetails: 'Product details',
        products: 'Products',
        profile: 'Profile',
        register: 'Register',
        resetPassword: 'Reset password',
        search: 'Search results',
      },
    },
  },
  ar: {
    translation: {
      app: {
        error: 'حدث خطأ غير متوقع في التطبيق.',
        placeholder: 'هذه الشاشة عنصر نائب للمسار لمرحلة لاحقة.',
      },
      language: {
        arabic: 'العربية',
        english: 'English',
        toggle: 'تغيير اللغة',
      },
      pages: {
        about: 'من نحن',
        accessDenied: 'الوصول مرفوض',
        account: 'نظرة عامة على الحساب',
        addresses: 'العناوين',
        adminCategories: 'الفئات',
        adminContent: 'صفحات المحتوى',
        adminDashboard: 'لوحة تحكم الإدارة',
        adminOrderDetails: 'تفاصيل الطلب',
        adminOrders: 'الطلبات',
        adminProductCreate: 'إنشاء منتج',
        adminProductEdit: 'تعديل المنتج',
        adminProducts: 'المنتجات',
        adminReviews: 'إدارة المراجعات',
        cart: 'سلة التسوق',
        checkout: 'إتمام الطلب',
        contact: 'اتصل بنا',
        forgotPassword: 'نسيت كلمة المرور',
        home: 'الرئيسية',
        login: 'تسجيل الدخول',
        notFound: 'الصفحة غير موجودة',
        orderConfirmation: 'تأكيد الطلب',
        orderDetails: 'تفاصيل الطلب',
        orders: 'الطلبات',
        policies: 'السياسات',
        productDetails: 'تفاصيل المنتج',
        products: 'المنتجات',
        profile: 'الملف الشخصي',
        register: 'إنشاء حساب',
        resetPassword: 'إعادة تعيين كلمة المرور',
        search: 'نتائج البحث',
      },
    },
  },
}

const storedLanguage = window.localStorage.getItem('language')
const initialLanguage = ['ar', 'en'].includes(storedLanguage)
  ? storedLanguage
  : 'en'

await i18n.use(initReactI18next).init({
  resources: translations,
  lng: initialLanguage,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
})

function updateDocumentLanguage(language) {
  document.documentElement.lang = language
  document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr'
}

updateDocumentLanguage(i18n.resolvedLanguage || 'en')

i18n.on('languageChanged', (language) => {
  updateDocumentLanguage(language)
  window.localStorage.setItem('language', language)
})

export default i18n
