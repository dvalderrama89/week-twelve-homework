const inquirer = require("inquirer");
const connection = require("mysql");
const cTable = require('console.table');

console.table([
  {
    name: 'foo',
    age: 10
  }, {
    name: 'bar',
    age: 20
  }
]);