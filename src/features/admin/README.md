# Admin Feature

Admin panel tek tasarim yuzeyidir: `/admin` route'u panel, uye listesi,
pasif uyeler ve fiyat sekmelerini ayni component icinde hash ile acar.

## Sinirlar

- Tasarim `AdminPanel.jsx` icinde korunur.
- Backend verisi `data/adminDashboard.js` uzerinden server page'e hazirlanir.
- Paket sozlesmesi 1, 3, 6 ve 12 ay olarak tek yerde tutulur.
- Form/API route'lari bu sozlesmeyi kullanir; yeni rota eklenmedikce
  `/admin/members/new` gibi ayri admin sayfalari olusturulmaz.
- Admin kodu marketing component'lerine import edilmez.
