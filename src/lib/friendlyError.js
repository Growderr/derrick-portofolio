/** Turns a Supabase / network error into a short Indonesian message. Never shows raw SQL. */
export function friendlyError(error) {
  if (!error) return 'Terjadi kesalahan yang tidak diketahui.'
  const message = String(error.message ?? error)
  const code = error.code

  if (code === '23505') return 'Data dengan nilai yang sama sudah ada (misalnya slug sudah dipakai). Ubah lalu coba lagi.'
  if (code === '23503') return 'Data ini masih dipakai oleh data lain sehingga tidak bisa dihapus.'
  if (code === '23514' || code === '22001' || code === '22P02') return 'Ada isian yang tidak memenuhi aturan database. Periksa panjang dan format isian.'
  if (code === '23502') return 'Ada isian wajib yang masih kosong.'
  if (code === '42501' || /row-level security|permission denied|not authorized/i.test(message)) {
    return 'Anda tidak memiliki izin untuk tindakan ini. Pastikan sudah masuk sebagai admin.'
  }
  if (code === 'P0001' && message) return message
  if (/Invalid login credentials/i.test(message)) return 'Email atau kata sandi salah.'
  if (/Email not confirmed/i.test(message)) return 'Email belum dikonfirmasi. Periksa kotak masuk Anda.'
  if (/rate limit|too many requests/i.test(message)) return 'Terlalu banyak percobaan. Tunggu sebentar lalu coba lagi.'
  if (/Failed to fetch|NetworkError|network|timeout/i.test(message)) return 'Koneksi bermasalah. Periksa internet Anda lalu coba lagi.'
  if (/payload too large|exceeded the maximum allowed size/i.test(message)) return 'Ukuran file melebihi batas yang diizinkan.'
  if (/mime type|not supported/i.test(message)) return 'Jenis file tidak diizinkan.'
  return 'Terjadi kesalahan saat memproses permintaan. Coba lagi sebentar lagi.'
}
