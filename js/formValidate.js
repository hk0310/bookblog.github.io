/******w*************
    
    Project 3 Javascript
    Name: Khai Nguyen
    Date: 22/04/2022
    Description: Project 3

********************/

document.addEventListener("DOMContentLoaded", load);

function load()
{
    document.getElementById("contact").addEventListener("submit", validate);
    document.getElementById("reset").addEventListener("click", resetForm);
}

function resetForm()
{
    hideErrors();
    let inputs = document.getElementsByTagName("input");

    for(let i = 0; i < inputs.length; i++)
    {
        inputs[i].textContent = "";
    }
}

function hideErrors()
{
    let errors = document.getElementsByClassName("error");
    for(let i = 0; i < errors.length; i++)
    {
        errors[i].style.display = "none";
    }
}

function validate(e)
{
    hideErrors();

    if(formHasErrors())
    {
        e.preventDefault();
        return false;
    }

    return true;
}

function trim(value)
{
    return value.replace(/^\s+|\s+$/g,"");
}

function formHasErrors()
{
    let errorFlag = false;

    let requiredInputs = ["name", "phone", "email"];
    let emailHasInput = true;
    let phoneHasInput = true;
    for(let i = 0; i < requiredInputs.length; i++)
    {
        if(trim(document.getElementById(requiredInputs[i]).value) == "" || document.getElementById(requiredInputs[i]).value == null)
        {
            document.getElementById(requiredInputs[i] + "_error").style.display = "block";

            if(!errorFlag)
            {
                document.getElementById(requiredInputs[i]).select();
                document.getElementById(requiredInputs[i]).focus();
            }
    
            if(requiredInputs[i] == "email")
            {
                emailHasInput = false;
            }
            else if(requiredInputs[i] == "phone")
            {
                phoneHasInput = false;
            }
            errorFlag = true;
        }
        
    }

    let phoneRegex = new RegExp(/^\d{10}$/);
    let emailRegex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
    let regexes = [phoneRegex, emailRegex];
    let regexInputs = ["phone", "email"];
    for(let i = 0; i < regexInputs.length; i++)
    {
        let input = document.getElementById(regexInputs[i]);
        if(!regexes[i].test(input.value))
        {
            if(regexInputs[i] == "email")
            {
                if(emailHasInput)
                {
                    document.getElementById("emailInvalid_error").style.display = "block";
                }
            }
            else
            {
                if(phoneHasInput)
                {
                    document.getElementById(regexInputs[i] + "Invalid_error").style.display = "block";
                }
            }
            
            if(!errorFlag)
            {
                input.select();
                input.focus();
            }

            errorFlag = true;
        }
    }

    return errorFlag;
}