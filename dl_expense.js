"use strict";

/*
   New Perspectives on HTML5, CSS3, and JavaScript 6th Edition
   Tutorial 13
   Case Problem 2

   Author: Maria De Jesus Rizo
   Date:   4.24.19
   
   Filename: dl_expenses.js
   
   Function List
   =============
   
   validateSummary()
      Validates the data entry in the summary field.
   
   calcClass(sumClass)
      Sums up all of the data values for elements of the sumClass class.
      
   calcExp()
      Calculates the travel expenses from all categories and dates.
      
   formatNumber(val, decimals)
      Formats the value, "val" to the number of decimals indicated 
      by "decimals", adding thousands separators.
      
   formatUSCurrency(val)
      Formats the value, "val", as U.S. currency.
      
*/
// The codeblock below states that the code within the anonymous function will run upon the page being loaded in the browser window. 
window.addEventListener("load", function () {
      // The line below creates a varaible with the name of changingCells. This variable is then given the value of all the elements affected by the selector written within. 
      var changingCells = document.querySelectorAll("table#travelExp input.sum");
      // The code bl0ck below creates a for loop which runs the code written inside as long as the value of the variable 1 is less than the value of the changingCells collection length. 
      for (var i = 0; i < changingCells.length; i++) {
            // The line below states that the when the current object in the changeCells array has been changed on the screen, the calcExp function will be run. 
            changingCells[i].onchange = calcExp;
      }
      // The line below staes that the element with the id of submitButton in the HTML document will run the validateSummary function upon being clicked on the page.
      document.getElementById("submitButton").onclick = validateSummary;
});

// The code block below creates a function with the name of validateSummary. The function is given no parameters. Its purpose is to validate the data entered into the summary field. 
function validateSummary() {
      // The line below creates a variable with the name of summary which is given the value of the element with an id of summary.
      var summary = document.getElementById("summary");
      // The line below creates an if statement that will run if the value enetered into the the variable summary is missing.
      if (summary.validity.valueMissing) {
            // If the condition above is true, then the form will provide the user with the message set below.
            summary.setCustomValidity("You must include a summary of the trip in your report.");
            // Othewise, there will be no message given to the user,
      } else {
            summary.setCustomValidity("");
      }
}

// The code block below creates a function with the name of calcClass. It is passed the parameter of sumClass. Its purpose is to find the sum of the data values of the sumClass class. 
function calcClass(sumClass) {
      // The line below creates a variable with the name of sumFields which is given the value of all elements with the class of sumClass.
      var sumFields = document.getElementsByClassName(sumClass);
      // The line below creates a variable with the name of sumTotal which is given the value of 0.
      var sumTotal = 0;

      for (var i = 0; i < sumFields.length; i++) {
            var itemValue = parseFloat(sumFields[i].value);
            // The line below creates an if statement that runs if the value of itemValue is a number.
            if (!isNaN(itemValue)) {
                  // If the condition above is true, then the value of itemValue will be added to that of sumTotal
                  sumTotal += itemValue;
            }
      }
      // The line below states that the value of the sumTotal variable will be returned by the function. 
      return sumTotal;
}

// The code block below creates a function with the name of calcExp. It is not passed any parameters. The purpose of this function is to calculate the travel expenses of all the catagories. 
function calcExp() {
      // The line below creates a varaible with the name of expTable which is given the value of all the elements affected by the selector within. 
      var expTable = document.querySelectorAll("table#travelExp tbody tr")
      // The code block below creates a for loop that will continue to run as long as the value of the variable i is less than the length of the expTable collection. 
      for (var i = 0; i < expTable.length; i++) {
            // The line below states that the value of the element with an id of subtotal concatenated with the current collection index will be reassigned to the calcClass with the parameter of date concatenated with the current collection index. The formatNumber function takes this value to the second decimal point.
            document.getElementById("subtotal" + i).value = formatNumber(calcClass("date" + i), 2);
      }
      // The lines below state that the vaue of the given element with the id specified will be assigned the value of the calcClass function with the parameter provided. The formatNumber function will take the value provided to the second decimal point.
      document.getElementById("transTotal").value = formatNumber(calcClass("trans"), 2);
      document.getElementById("lodgeTotal").value = formatNumber(calcClass("lodge"), 2);
      document.getElementById("mealTotal").value = formatNumber(calcClass("meal"), 2);
      document.getElementById("otherTotal").value = formatNumber(calcClass("other"), 2);
      // The line below states that the value of the element with an id of expTotal will be reassigned to the value of the calcCum function with the parameter of sum. The formarUSCurrency function will format the value as US Currency.
      document.getElementById("expTotal").value = formatUSCurrency(calcClass("sum"));
}





function formatNumber(val, decimals) {
      return val.toLocaleString(undefined, {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
      });
}

function formatUSCurrency(val) {
      return val.toLocaleString('en-US', {
            style: "currency",
            currency: "USD"
      });
}