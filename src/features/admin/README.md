# Admin Feature Groundwork

Bu klasör admin panel issue'ları için route, navigation ve session kontratı zeminidir. Şu an login, session veya database işlemi gerçekleştirmez.

## Ayrılmış Issue'lar

1. Admin panel frontend tasarımı
   - `navigation.js` içindeki route bilgileri kullanılmalı.
   - İlk aşamada mock member data ile arayüz hazırlanabilir.

2. Admin panel backend, authentication ve database bağlantıları
   - `auth/adminSession.contract.js` içindeki session sözleşmesi genişletilmeli.
   - Gerçek auth, cookie/session ve protected route logic bu issue kapsamında eklenmeli.

## Sınır

Bu klasör marketing sayfasından bağımsız tutulmalı. Admin panel kodu reklam sayfası bileşenlerine import edilmemeli.
