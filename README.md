# Tier Week 8 Weekend Challenge: Server Side Calculator

[Here](./INSTRUCTIONS.md) is the instruction to the project instructions.

## Description

For this challenge, I created a calculator. All of the logic and/or calculations are implemented on the server.

It looks and acts like a regular calculator. A user presses the number keys for the first number, presses an operator key and then presses the number keys for the second number. The numbers and the operations are displayed in the calculator display in the order the keys were pressed. When the "=" button is pressed, the numbers selected and the operator selected are stored in an object and sent to the server. The server receives this information to calculates the result, stores this result in an array and sends this result to the front end. The front end receives the result and displays the result on the page along with all of the previous calculations performed below the calculator.

Just like a regular calculator, the previous answer can be used to continue the calculation. Press the "C" button to clear the calculator display and previous calculation data.

The user could also click on a calculation in the history list to re-run that calculation. The answer of that calculation is displayed on the calculator display. The user could use this answer as a starting point to perform additional calculations. Below the calculation and above the list of history calculations, there is a "Clear History" button. When the "Clear History" button is pressed, a DELETE is sent to server to clear all history data.

On the server side I used node express and body-parser to POST and GET data. On the front end, I used jQuery AJAX to POST the data (values and operator selected) inputted by the user and GET the data (answer and historical operation data) and display them on the page.

## Screen Shot

Below is a screen shot of the application.
![](stretch-screenshot.png)

## Prerequisites

- [Node.js](https://nodejs.org/en/)

## Installation

You need to make sure you have node installed on your computer, then open up your terminal and run `npm install`.

## Built With

- javascript
- jQuery
- express
