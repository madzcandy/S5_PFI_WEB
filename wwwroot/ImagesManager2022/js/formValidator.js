function ValidateAccount(registerMode, password, cpassword, email, username)
{
    let regExpmdp = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})");
    let valid = true;

    $("#errorMdp").html("");
    $("#errorEmail").html("");
    $("#errorUsername").html("");

    if(username.trim() == "")
    {
        valid = false;
        $("#errorUsername").html("Le nom d'usager est invalide.");
    }

    if(!VerifyEmail(email))
    {
        alert (valid);
        valid = false;
        $("#errorEmail").html("Le courriel est invalide.");
    }

    if(registerMode || (!registerMode && password != ""))
    {
        if (!regExpmdp.test(password))
        {
            valid = false;
            $("#errorMdp").html("Le format du mot de passe est invalide. Minimum 6 caractères, un chiffre, une minuscule et une majuscule.");
        }
        else if(password != cpassword)
        {
            valid = false;
            $("#errorMdp").html("Les mots de passes sont différents.");
        }                      
    }

    return valid;
}


function VerifyEmail(email)
{
    let regExp = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$");
    let valid = false;

    alert(regExp.test(email));

    if(regExp.test(email.trim()))
        valid = true;
    
    return valid;
}