function sumDigits(str) {
  return str.replace(/\D/g, '').split('').reduce((a, d) => a + Number(d), 0);
}

function reduceToNumerology(n) {
  while (n > 9 && n !== 11 && n !== 22) {
    n = String(n).split('').reduce((a, d) => a + Number(d), 0);
  }
  return n;
}

function calcDestinyNumber(dateStr) {
  return reduceToNumerology(sumDigits(dateStr));
}

window.calcDestinyNumber = calcDestinyNumber;
