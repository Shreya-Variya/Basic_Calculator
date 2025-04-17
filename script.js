let input = document.getElementById('inputBox');
let buttons = document.querySelectorAll('button');

let string = "";
let arr = Array.from(buttons);

arr.forEach(button => 
{
    button.addEventListener('click', (e) => 
    {
        let buttonText = e.target.innerHTML;
        calculate(buttonText);
    });
});

function calculate(key) 
{
    const operators = ['+', '-', '*', '/', '%' ,'^'];
    if (key == '=') 
    {
        try
        {
            string = eval(string); 
            input.value = string;
        } 
        catch (error) 
        {
            input.value = "Error";
        }
    } 
    else if (key == 'AC') 
    {
        string = "";
        input.value = string;
    } 
    else if (key == 'C') 
    {
        string = string.substring(0, string.length - 1);
        input.value = string;
    } 
    else if (key == 'sqrt') 
    {
        string = Math.sqrt(eval(string)).toString(); 
        input.value = string;
    } 
    else if (key == '^') 
    {
        string += "**"; 
        input.value = string;
    } 
    else if (operators.includes(key)) 
    {
        if (string.length > 0 && operators.includes(string[string.length - 1])) 
        {
            // Replace the last operator with the new one
            string = string.slice(0, -1) + key;
        } 
        else 
        {
            string += key;
        }
        input.value = string;
    } 
    else 
    {
        // Prevent leading zeroes like '00', '000' etc.
        if (string === "0" && (key === "0" || key === "00")) 
        {
            return;
        }
        // Prevent multiple decimals in one number
        if (key === '.') 
        {
            let lastNumber = string.split(/[\+\-\*\/\^]/).pop();
            if (lastNumber.includes('.')) 
            {
                return; // Already has a decimal
            }
        }
        // Replace initial zero with the new key if not an operator
        if (string === "0" && !isNaN(key)) 
        {
            string = key;
        } 
        else 
        {
            string += key;
        }
        input.value = string;
    }
}

document.addEventListener('keydown', (e) => 
{
    let key = e.key;

    if (!isNaN(key) || ['+', '-', '*', '/', '.', '%', 'Enter', 'Backspace', 'Escape', '^'].includes(key)) 
    {
        // Check for operator or numeric input
        if (key === 'Enter') 
        {
            key = '=';
        } 
        else if (key === 'Backspace') 
        {
            key = 'C';
        } 
        else if (key === 'Escape') 
        {
            key = 'AC';
        }
        calculate(key);
    }
});
    
