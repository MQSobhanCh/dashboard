# Store Management (React + TypeScript + MUI)

پروژه‌ی پایان دوره‌ی React — یک پنل مدیریت فروشگاه ساده، دقیقاً با همون استک و الگوهایی که تو ریپوی کلاس (`react-ts`) استفاده شده.

## استک

- React 19 + TypeScript + Vite
- MUI (`@mui/material`) + Tailwind CSS 4
- Zustand برای state (auth, theme)
- TanStack React Query برای دیتا فچینگ (لایه‌ی `services`)
- React Hook Form برای فرم‌ها
- React Router (v8) با `lazy` + `Suspense`
- React Hot Toast برای نوتیفیکیشن
- API: [DummyJSON](https://dummyjson.com) (products, carts, auth)

## نصب و اجرا

```bash
npm install
npm run dev
```

## لاگین

برای لاگین از یوزرهای تستی DummyJSON استفاده کن، مثلاً:

- username: `emilys`
- password: `emilyspass`

(لیست کامل یوزرها: https://dummyjson.com/users)

## ساختار پروژه

```
src/
  components/
    design-system/   # DsButton, DsTypography (رپ‌شده روی MUI)
    global/           # Header, Sidebar, AppLayout, Loading, ...
  constants/          # BASE URL ها
  pages/
    login/
    dashboard/
    products/         # لیست، ایجاد، ویرایش، جزئیات محصول
    categories/
    orders/           # لیست و جزئیات سفارش (بر پایه‌ی carts)
    profile/
    not-found/
  providers/          # MuiThemeProvider
  routing/            # Routes.tsx
  services/           # لایه‌ی fetch برای هر دامنه (products, orders, login)
  stores/             # auth.store, global.store (zustand)
  types/              # تایپ‌های هر دامنه
```

## چیزهایی که می‌تونی به عنوان قدم بعدی اضافه کنی

- صفحه‌ی فیلتر محصولات بر اساس دسته‌بندی
- صفحه‌ی ثبت‌نام / بازیابی رمز عبور
- سبد خرید واقعی (فعلاً Orders فقط نمایش carts موجود در DummyJSON هست)
- پجینیشن واقعی برای لیست محصولات
