class Number {
    get() {
        var d = new Date();
        let t = d.getTime() + "";
        let lt = t.substring(t.length - 3, t.length);
        return lt;
    }
}

class Boundary extends Number { }

var boundary = new Boundary();

let number1 = boundary.get();
let number2 = Math.floor(Math.random() * (999 - 1) + 1);

function getRandom(a, b) {
    return Math.floor(Math.random() * (Math.abs(b - a) + 1)) + parseInt(b > a ? a : b);
}

var number, hintMessage, probability, lowerBoundary, upperBoundary, countOfNumbers, range;
var numberOfGuess = 0;
var numberOfRemaining = 3;
var usedGuess = [];

loadPage();

function loadPage() {
    do {
        number1 = boundary.get();
    } while (Math.abs(number1 - number2) < 4);

    number = getRandom(number1, number2);

    lowerBoundary = number1 > number2 ? number2 : number1;
    upperBoundary = lowerBoundary == number1 ? number2 : number1;

    while (lowerBoundary.toString().startsWith("0", 0)) {
        lowerBoundary = lowerBoundary.substring(1, lowerBoundary.length);
    }

    while (upperBoundary.toString().startsWith("0", 0)) {
        upperBoundary = upperBoundary.substring(1, upperBoundary.length);
    }

    countOfNumbers = upperBoundary - lowerBoundary + 1;
    range = countOfNumbers;
    probability = (100 / range) < 0 ? -1 * (100 / range) : (100 / range);
    document.getElementById("findingProbability").innerText = probability.toFixed(3);
    document.getElementById("numberOfGuess").innerText = numberOfGuess; document.getElementById("numberOfRemainingGuess").innerText = numberOfRemaining;
    document.getElementById("lowerBoundary").innerText = lowerBoundary;
    document.getElementById("upperBoundary").innerText = upperBoundary;
}

function checkGuess() {
    if (numberOfRemaining > 0) {
        var guess = document.getElementById("userGuess").value;

        if (guess.length != 0) {
            if (usedGuess.includes(guess)) {
                alert(
                    "You have already said this number before. Please try another one."
                );
                return;
            }

            usedGuess.push(guess);

            numberOfGuess++;
            numberOfRemaining--;

            countOfNumbers = upperBoundary - lowerBoundary + 1;
            range = countOfNumbers;
            probability = (100 / range) < 0 ? -1 * (100 / range) : (100 / range);
            var newRange;

            if (guess != number) {
                hintMessage = "";

                if (guess < number) {
                    upDownMessage = "Up";
                    newRange = upperBoundary - guess + 1;
                    probability = 100 / newRange;
                    if (guess < lowerBoundary) {
                        hintMessage = "Really, this is lower than boundary.";
                        if (guess % 2 == 0)
                            hintMessage = "C'mon! You should not go outside of boundaries.";
                        probability = 100 / range;
                    }
                } else if (number < guess) {
                    upDownMessage = "Down";
                    newRange = guess - lowerBoundary + 1;
                    probability = 100 / newRange;
                    if (guess > upperBoundary) {
                        hintMessage = "Nope. That is out of range.";
                        if (guess % 2 == 0)
                            hintMessage = "Your guess is too greater, isn't it?";
                        probability = 100 / range;
                    }
                }

                document.getElementById("findingProbability").innerText = probability.toFixed(3);
                document.getElementById("numberOfGuess").innerText = numberOfGuess; document.getElementById("numberOfRemainingGuess").innerText = numberOfRemaining;
                document.getElementById("lowerBoundary").innerText = lowerBoundary;
                document.getElementById("upperBoundary").innerText = upperBoundary;
                document.getElementById("upDownMessage").innerText = upDownMessage;
                document.getElementById("hintMessage").innerText = hintMessage;
            } else {
                (lowerBoundary + upperBoundary) % 2 == 0 ? alert("You found the number. Well done!") : alert("Congrulations! You find the number.");
                if (confirm("Would you like to try one more time?") == true) {
                    location.reload();
                }
                else {
                    setTimeout(function () {
                        close();
                        alert("Page is closing..");
                    }, 750);
                }
            }
        } else {
            alert("Please enter your guess");
        }
    } else {
        alert("Since you do not have more rights, the game is over!");
    }

    if (number != guess && !numberOfRemaining) {
        setTimeout(function () {
            if (confirm("The number was " + number + ". Would you like to try one more time?") == true) {
                location.reload();
            } else {
                setTimeout(function () {
                    close();
                    alert("Page is closing..");
                }, 750);
            }
        }, 250);
    }
}
