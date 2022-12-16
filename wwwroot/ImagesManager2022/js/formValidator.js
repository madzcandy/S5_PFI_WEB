function ValidateAccount(registerMode, password, cpassword, email, username, ImageData)
{
    let regExpmdp = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})");
    let valid = true;

    $("#errorMdp").html("");
    $("#errorEmail").html("");
    $("#errorUsername").html("");
    $("#errorAvatar").html("");

    if(username.trim() == "")
    {
        valid = false;
        $("#errorUsername").html("Le nom d'usager est invalide.");
    }

    if(!VerifyEmail(email))
    {  
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

    if(registerMode && ImageData == ''){
        valid = false;
        $("#errorAvatar").html("Vous devez insérer une image");
    }
    return valid;
}


function VerifyEmail(email)
{
    let regExp = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$");
    let valid = false;

    if(regExp.test(email.trim()))
        valid = true;
    
    return valid;
}



function ValidateImage(title, description)
{
    let valid = true;
    $("#errorTitle").html("");
    $("#errorDescription").html("");

    if(title.trim() == "")
    {
        valid = false;
        $("#errorTitle").html("Le titre de l'image est invalide.");
    }

    if(description.trim() == "")
    {
        valid = false;
        $("#errorDescription").html("La description de l'image est invalide.");
    }

    return valid;
}