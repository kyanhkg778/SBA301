// scripts/parse-json-demo.js - Demonstrates JSON parsing and serialization
const productJson = `
{
  "id": 1,
  "name": "iPhone 15 Pro",
  "category": "Phone",
  "price": 29000000,
  "quantity": 10,
  "active": true
}
`;

console.log("--- Step 1: Raw JSON text (String) ---");
console.log(typeof productJson, productJson);

console.log("\n--- Step 2: Parsing JSON to JavaScript Object ---");
const productObject = JSON.parse(productJson);
console.log(typeof productObject, productObject);
console.log("Product Name:", productObject.name);
console.log("Product Price:", productObject.price);

console.log("\n--- Step 3: Serializing JS Object back to JSON String ---");
const jsonString = JSON.stringify(productObject, null, 2);
console.log(typeof jsonString, jsonString);
