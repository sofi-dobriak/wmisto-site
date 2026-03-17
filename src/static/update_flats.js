import fs from "fs";

const fileName = "src/static/flats.json";

try {
  const rawData = fs.readFileSync(fileName, "utf8");
  let flats = JSON.parse(rawData);

  // Масив доступних назв картинок
  const images = ["KV-96-3AS2_1", "KV-96-3AS2_2", "KV-96-3AS2_3", "KV-96-3AS2_4"];

  const newFields = ["section", "terrace", "penthouse", "fountain", "smart"];

  const updatedFlats = flats.map((flat) => {
    // 1. Оновлюємо фільтри (якщо треба перегенерувати)
    newFields.forEach((field) => {
      flat[field] = Math.floor(Math.random() * 2).toString();
    });

    // 2. Рандомно вибираємо картинку зі списку
    const randomImage = images[Math.floor(Math.random() * images.length)];

    // 3. Перезаписуємо поле img_big новим шляхом
    // Додаємо розширення .png (або яке там у тебе, наприклад .jpg)
    flat.img_big = `/images/plannings/${randomImage}.png`;

    return flat;
  });

  fs.writeFileSync(fileName, JSON.stringify(updatedFlats, null, 2), "utf-8");
  console.log("Успіх! Картинки та фільтри оновлено.");
} catch (err) {
  console.error("Помилка:", err.message);
}
