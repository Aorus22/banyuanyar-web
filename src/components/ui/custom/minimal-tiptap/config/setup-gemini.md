# 🚀 Setup Gemini AI untuk Minimal-Tiptap

## Langkah 1: Dapatkan Gemini API Key

1. Kunjungi [Google AI Studio](https://aistudio.google.com/)
2. Login dengan Google account Anda
3. Buat project baru
4. Copy API key yang diberikan
5. **PENTING**: Pastikan menggunakan model yang tersedia (gemini-2.0-flash, gemini-1.5-pro, gemini-1.5-flash, dll)

## Langkah 2: Buat Environment File

Buat file `.env.local` di root project Anda:

```bash
# .env.local
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
```

**PENTING**: Gunakan `NEXT_PUBLIC_` prefix agar bisa diakses di client-side.

## Langkah 3: Restart Development Server

```bash
npm run dev
# atau
yarn dev
# atau
bun dev
```

## Langkah 4: Verifikasi Setup

1. Buka editor minimal-tiptap
2. Lihat toolbar - seharusnya ada badge "🤖 Gemini" 
3. Test fitur AI dengan memilih teks dan klik tombol AI

## Troubleshooting

### ❌ Masih muncul "Mock AI"
- Pastikan file `.env.local` ada di root project
- Pastikan nama variable `NEXT_PUBLIC_GEMINI_API_KEY` benar
- Restart development server
- Check console browser untuk error

### ❌ Gemini API Error
- Pastikan API key valid
- Check quota Gemini (free tier: 15 requests/min)
- Pastikan internet connection stabil

### ❌ Environment Variable tidak terbaca
- Pastikan menggunakan `NEXT_PUBLIC_` prefix
- Restart development server
- Check file `.env.local` tidak ada typo

## Alternative Setup

### Menggunakan OpenAI
```bash
# .env.local
NEXT_PUBLIC_OPENAI_API_KEY=your_openai_api_key
NEXT_PUBLIC_OPENAI_BASE_URL=https://api.openai.com/v1
```

### Menggunakan Mock AI (Default)
Tidak perlu setup apa-apa, akan otomatis menggunakan Mock AI.

## Test Fitur AI

1. **Generate Text**: Pilih teks, klik ✨
2. **Improve Content**: Pilih teks, klik 🪄  
3. **Get Suggestions**: Pilih teks, klik 💡
4. **Expand Content**: Pilih teks, klik ⚡
5. **Translate**: Pilih teks, klik 🌐
6. **Summarize**: Pilih teks, klik 📝
7. **Smart Content**: Pilih teks, klik 🧠

## Keuntungan Gemini

- ✅ **Free Tier**: 15 requests per menit
- ✅ **High Quality**: AI canggih dari Google
- ✅ **Indonesian Support**: Optimized untuk Bahasa Indonesia
- ✅ **Fast Response**: Latency rendah
- ✅ **Easy Setup**: Konfigurasi sederhana
- 🚀 **Gemini 2.0 Flash**: Model terbaru dan tercepat dari Google

## Support

Jika masih ada masalah:
1. Check console browser untuk error
2. Pastikan semua langkah setup sudah benar
3. Restart development server
4. Check Gemini API key masih valid 