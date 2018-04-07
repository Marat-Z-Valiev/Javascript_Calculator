const buttons = $('.button');
const answer = $('#answer');
const cancelButton = $('#cancelButton');
let entries = [];
let temp = '';

//Clear entry when cancel button clicked
function cancelEntry() {
    cancelButton.on('click', function () {
        entries = [];
        temp = '';
        answer.val('');
    });
}
//Get the entered values
buttons.click(function (e) {
    e.preventDefault();
    const value = $(this).attr('data-key');
    answer.val(value);
    //Verify if value is a number
    //Set a limit for up to 10 digits
    if (!isNaN(value) || value === '.') {
        temp += value;
        answer.val(temp.substring(0, 10));
    }
    //Start calculation when equal button is clicked
    else if (value === '=') {
        entries.push(temp);
        //Convert value into number and calculate the result based on values
        let result = Number(entries[0]);
        for (let i = 1; i < entries.length; i++) {
            let nextNum = Number(entries[i + 1]);
            let symbol = entries[i];

            if (symbol === '+') {
                result += nextNum;
            } else if (symbol === '-') {
                result -= nextNum;
            } else if (symbol === '*') {
                result *= nextNum;
            } else if (symbol === '/') {
                result /= nextNum;
            }
            i++;
            result = String(result).substring(0, 10);
        }
        //Add minus symbol if value is negative
        if (result < 0) {
            result = '-' + Math.abs(result);
        }
        //Store the result in array to continue calculations 
        if (!cancelEntry()) {
            entries.push(result);
            answer.val(result);
        }
        else {
            cancelEntry();
        }
    }
    // Push result
    else {
        entries.push(temp);
        entries.push(value);
        temp = '';
    }
});