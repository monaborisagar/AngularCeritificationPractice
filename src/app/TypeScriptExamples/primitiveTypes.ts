/**
 * TypeScript Primitive Types Example
 */

// String
let personName: string = "Alice";
console.log("Hello, " + personName + "!");
// Number
let age: number = 30;
console.log("You are " + age + " years old.");

// Boolean
let isActive: boolean = true;
console.log("Active status: " + isActive);
// Null
let emptyValue: null = null;

// Undefined
let notAssigned: undefined = undefined;

// Symbol (ES6+)
let uniqueId: symbol = Symbol("id");

// BigInt (ES2020+)
//let bigNumber: bigint = 9007199254740991n;

// Example usage
//console.log(`Name: ${personName}, Age: ${age}, Active: ${isActive}`);


// Array type
let scores: number[] = [85, 92, 78];
console.log("Scores:", scores);

// Object type
let person: { name: string; age: number; isActive: boolean } = {
    name: "Bob",
    age: 25,
    isActive: false
};
console.log("Person:", person);