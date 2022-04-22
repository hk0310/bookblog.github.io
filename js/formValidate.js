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

function formHasErrors()
{
    let errorFlag = false;

    let requiredInputs = ["name", "email"];
    let emailHasInput = true;
    for(let i = 0; i < requiredInputs.length; i++)
    {
        if(document.getElementById(requiredInputs[i]).value == "" || document.getElementById(requiredInputs[i]).value == null)
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
                document.getElementById(regexInputs[i] + "Invalid_error").style.display = "block";
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