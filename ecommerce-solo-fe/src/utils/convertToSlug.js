export function slugify(text) {
  return text
    .toLowerCase() // Ubah ke huruf kecil
    .trim() // Hapus spasi di awal & akhir
    .replace(/\s+/g, '-') // Ganti spasi dengan "-"
    .replace(/[^\w\-]+/g, '') // Hapus karakter non-alphanumeric kecuali "-"
    .replace(/\-\-+/g, '-'); // Ganti "--" ganda dengan "-"
}
