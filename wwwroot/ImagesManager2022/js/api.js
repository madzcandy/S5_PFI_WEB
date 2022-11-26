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
    //alert("post");
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

function storeAccessToken(token) {
    //alert("token" + token);
    localStorage.setItem('access_Token', token);
}
function getAccessToken() {
    return localStorage.getItem('access_Token');
}

function storeUserLogged(user) {
    localStorage.setItem('user', JSON.stringify(user))
}
function getUserLogged() {
    let userJson = localStorage.getItem('user')
    if (userJson != null)
        return JSON.parse(userJson);
    return null;
}

function removeAccessToken() {
    localStorage.removeItem('access_Token');
}
function removeUserLogged() {
    localStorage.removeItem('user');
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

function REGISTER(profil, successCallBack, errorCallBack) {
   // alert("API register 2");
    $.ajax({
        url: server + "/accounts/register",
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(profil),
        success: function (profil) {
            console.log(profil);
            sucessCallBack(profil);
        },
        error: function (jqXHR) { errorCallBack(jqXHR.status) }
    })
}


function LOGIN(loginInfo, sucessCallBack, errorCallBack) {
    $.ajax({
        url: server + "/token",
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(loginInfo),
        success: function (tokenInfo) {
            storeAccessToken(tokenInfo.Access_token);
            GETUSERINFO(tokenInfo.UserId, sucessCallBack, errorCallBack)
        },
        error: function (jqXHR) { errorCallBack(jqXHR.status) }
    })
}

function LOGOUT(userid, sucessCallBack, errorCallBack) {
    $.ajax({
        url: server + "/accounts/logout/" + userid,
        type: 'GET',
        data: {},
        success: function () {
           // alert("sucess Logout22");
            removeAccessToken();
            removeUserLogged();
            sucessCallBack()
        },
        error: function (jqXHR) { errorCallBack(jqXHR.status) }
    })
}


function GETUSERINFO(userid, sucessCallBack, errorCallBack) {
    $.ajax({
        url: server + "/accounts/index/" + userid,
        type: 'GET',
        contentType: 'text/plain',
        data: {},
        success: function (profil) {
            storeUserLogged(profil);
            sucessCallBack(profil);
        },
        error: function (jqXHR) { errorCallBack(jqXHR.status) }
    })
}




function VERIFY_EMAIL(userId, verifyCode, sucessCallBack, errorCallBack) {
    $.ajax({
        url: server + `/Accounts/verify^id=${userId}&code=${verifyCode}`,
        type: 'GET',
        contentType: 'text/plain',
        date: {},
        success: function () {
            GETUSERINFO(userId, sucessCallBack, error);
            sucessCallBack();
        },
        error: function (jqXHR) { errorCallBack(jqXHR.status) }
    })
}


function MODIFY_USER_INFO(userId, sucessCallBack, errorCallBack) {
    $.ajax({
        url: server + "/Accounts/verify" + "/" + userInfo.Id,
        type: 'PUT',
        contentType: 'application/json',
        headers: getBearerAuthorizationToken(),
        date: JSON.stringify(userInfo),
        success: function () {
            GETUSERINFO(userId, sucessCallBack, error);
        },
        error: function (jqXHR) { errorCallBack(jqXHR.status) }
    })
}

