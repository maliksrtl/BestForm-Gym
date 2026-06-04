# Server Groundwork

Backend issue'ları başladığında API, server action, repository ve database bağlantı kodları bu klasör altında organize edilecek.

Önerilen yapı:

- `src/server/db`: database client ve migration bağlantı notları
- `src/server/repositories`: member repository
- `src/server/services`: üyelik iş kuralları ve transaction servisleri

Şu an bilinçli olarak gerçek backend bağlantısı eklenmemiştir.
