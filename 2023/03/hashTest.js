const hashes = new Set();

const hash1 = { a: 1, b: 0 };
const hash2 = { a: 1, b: 0 };

hashes.add(hash1);
hashes.add(hash2);

console.log(hashes.size); // 1
