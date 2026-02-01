const MASTER = new Set([11, 22, 33]);

function reduceNum(n) {
  while (n > 9 && !MASTER.has(n)) {
    n = String(n).split("").reduce((a, d) => a + Number(d), 0);
  }
  return n;
}

function sumDigits(str) {
  return str.replace(/\D/g, "").split("").reduce((a, d) => a + Number(d), 0);
}

// 1) Жизненный путь (по дате)
function lifePath(dateStr) {
  return reduceNum(sumDigits(dateStr));
}

// --- Имя: Pythagorean (через латиницу + транслит кириллицы) ---
function ruToLat(s) {
  const map = {
    а:"a",б:"b",в:"v",г:"g",д:"d",е:"e",ё:"e",ж:"zh",з:"z",и:"i",й:"y",
    к:"k",л:"l",м:"m",н:"n",о:"o",п:"p",р:"r",с:"s",т:"t",у:"u",ф:"f",
    х:"h",ц:"c",ч:"ch",ш:"sh",щ:"sh",ъ:"",ы:"y",ь:"",э:"e",ю:"yu",я:"ya"
  };
  return s.toLowerCase().split("").map(ch => map[ch] ?? ch).join("");
}

function letterVal(ch) {
  const groups = {
    1:"ajs", 2:"bkt", 3:"clu", 4:"dmv", 5:"enw",
    6:"fox", 7:"gpy", 8:"hqz", 9:"ir"
  };
  const c = ch.toLowerCase();
  for (const k in groups) if (groups[k].includes(c)) return Number(k);
  return 0;
}

function normName(name) {
  return ruToLat(name).replace(/[^a-z\s]/g, " ").replace(/\s+/g, " ").trim();
}

// 2) Число судьбы / выражения (все буквы)
function expression(fullName) {
  const n = normName(fullName);
  if (!n) return null;
  let sum = 0;
  for (const ch of n.replace(/\s/g, "")) sum += letterVal(ch);
  return reduceNum(sum);
}

// 3) Число души (гласные)
function soul(fullName) {
  const n = normName(fullName);
  if (!n) return null;
  const vowels = new Set(["a","e","i","o","u","y"]);
  let sum = 0;
  for (const ch of n.replace(/\s/g, "")) {
    if (vowels.has(ch.toLowerCase())) sum += letterVal(ch);
  }
  return reduceNum(sum);
}

// экспорт для страницы
window.numerology = { lifePath, expression, soul };
