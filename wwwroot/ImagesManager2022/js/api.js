const apiBaseURL = "http://localhost:5000/api/images";
const server = "http://localhost:5000";
const service = "/api/images";

function HEAD(successCallBack, errorCallBack) {
    $.ajax({
        url: apiBaseURL,
        type: 'HEAD',
        contentType: 'text/plain',
        complete: request => { successCallBack(request.getResponseHeader('ETag')) },
        error: function (jqXHR) { errorCallBack(jqXHR.status) }
    });
}
function GET_ID(id, successCallBack, errorCallBack) {
    $.ajax({
        url: apiBaseURL + "/" + id,
        type: 'GET',
        success: data => { successCallBack(data); },
        error: function (jqXHR) { errorCallBack(jqXHR.status) }
    });
}
function GET_ALL(successCallBack, errorCallBack, queryString = null) {
    let url = apiBaseURL + (queryString ? queryString : "");
    $.ajax({
        url: url,
        type: 'GET',
        success: (data, status, xhr) => { successCallBack(data, xhr.getResponseHeader("ETag")) },
        error: function (jqXHR) { errorCallBack(jqXHR.status) }
    });
}
function POST(data, successCallBack, errorCallBack) {
    alert("post");
    $.ajax({
        url: apiBaseURL,
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: (data) => { successCallBack(data) },
        error: function (jqXHR) { errorCallBack(jqXHR.status) }
    });
}
function PUT(bookmark, successCallBack, errorCallBack) {
    $.ajax({
        url: apiBaseURL + "/" + bookmark.Id,
        type: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(bookmark),
        success: () => { successCallBack() },
        error: function (jqXHR) { errorCallBack(jqXHR.status) }
    });
}
function DELETE(id, successCallBack, errorCallBack) {
    $.ajax({
        url: apiBaseURL + "/" + id,
        type: 'DELETE',
        success: () => { successCallBack() },
        error: function (jqXHR) { errorCallBack(jqXHR.status) }
    });
}




/*Local storage utilities fonctions*/
/*
function tokenRequestURL() {
    return server + '/token'
}
*/

function storeAccessToken(token){
    //alert("token" + token);
    localStorage.setItem('access_Token', token);
}
function getAccessToken(){
    return localStorage.getItem('access_Token');
}

function storeUserLogged(userid){
    localStorage.setItem('userid', userid)
}
function getUserLogged(){
    return localStorage.getItem('userid')
}

function removeAccessToken(){
    localStorage.removeItem('access_Token');
}
function removeUserLogged(){
    localStorage.removeItem('userid');
}


/*
function eraseAccessToken(){
    localStorage.removeItem('access_Token');
}

function retriveAccessToken(){
    return localStorage.getItem('access_Token');
}

function getBearerAuthorizationToken(){
    return {'Authorization': 'Bearer '+ retriveAccessToken()};
}

function registerRequestURL(){
    return server + 'Accounts/register';
}

function storeLoggedUser(user){
    localStorage.setItem('user', JSON.str)
}
*/


/* AJAX functions utilites */

function REGISTER(profil, successCallBack, errorCallBack){
    alert("API register 2");
    $.ajax({
        url: server + "/accounts/register",
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(profil),
        success: function(profil){
            console.log(profil);
            sucessCallBack(profil);
        },
        error : function(jqXHR) {errorCallBack(jqXHR.status)}
    })
}


function LOGIN(loginInfo, sucessCallBack, errorCallBack) {
alert(loginInfo);
    $.ajax({
        url: server + "/token",
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(loginInfo),
        success: function(profil){
            alert("sucess");
            //console.log("sucess");
            //console.log(profil);
            //alert(profil);
            
            //alert("token111:"+profil.Access_token);
            alert("userid4444:"+profil.UserId);

            storeAccessToken(profil.Access_token);
            storeUserLogged(profil.UserId);
            //getUserInfo(profil.UserId, sucessCallBack, errorCallBack);
            //sucessCallBack(profil);
            //alert(profil.Access_token);
            //getUserInfo(profil.UserId, sucessCallBack, errorCallBack);
        },
        error : function(jqXHR) {errorCallBack(jqXHR.status)}
    })
}

function LOGOUT(userid, sucessCallBack, errorCallBack) {
    //alert(loginInfo);
        $.ajax({
            url: server + "/accounts/logout/"+userid,
            type: 'GET',            
            data: {},
            success: function(){
                alert("sucess Logout22");
                removeAccessToken();
                removeUserLogged();
            },
            error : function(jqXHR) {errorCallBack(jqXHR.status)}
        })
    }

    
function GETUSERINFO(userid, sucessCallBack, errorCallBack) {
    //alert(loginInfo);
        $.ajax({
            url: server + "/accounts/index/"+userid,
            type: 'GET',            
            contentType: 'text/plain',
            data: {},
            success: function(profil){
                alert("sucess GETUSERINFO");
                console.log(profil);
                alert("sucess GETUSERINFO name:"+profil.Name);
                sucessCallBack(profil);
            },
            error : function(jqXHR) {errorCallBack(jqXHR.status)}
        })
    }




function VERIFY_EMAIL(userId, verifyCode, sucessCallBack, errorCallBack) {

}