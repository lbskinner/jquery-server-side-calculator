# Tier Week 8 Weekend Challenge: Server Side Calculator

[Here](./INSTRUCTIONS.md) is the instruction to the project instructions.

## Description

For this challenge, I created a calculator and all of the logic and/or calculations are implemented on the server.

A user can input two values (2 input elements) and select the type of mathematical operation. When the "=" button is clicked, the inputted values are and the selected operator are stored in an object and sent to the server. The server receives this information to calculate the result, store this result in an array and send this result to the front end. The front end receives the result and display the result on the page along with all of the previous calculations performed.

On the server side I used node express and body-parser to POST (receive) and GET (send) data. On the front end, I used jQuery AJAX to POST (send) the data (values and operator selected) inputted by the user and GET (receive) the data (answer and historical operation data) and display them page.

## Screen Shot

Below is a screen shot of the application.
![](basic-mode-screenshot.png)

## Prerequisites

- [Node.js](https://nodejs.org/en/)

## Installation

You need to make sure you have node installed on your computer. then open up your terminal and run `npm install`.

## Built With

- javascript
- jQuery
- express
