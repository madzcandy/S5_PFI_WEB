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
    $.ajax({
        url: apiBaseURL,
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: (data) => { successCallBack(data) },
        error: function (jqXHR) { errorCallBack(jqXHR.status) }
    });
}
function PUT(image, successCallBack, errorCallBack) {
    console.log(image);
    $.ajax({
        url: apiBaseURL + "/" + image.Id,
        type: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(image),
        success: (image) => { successCallBack(true) },
        error: function (jqXHR) { errorCallBack(jqXHR.status) }
    });
}
function EDIT_IMAGE(image, successCallBack, errorCallBack) {
    $.ajax({
        // url: apiBaseURL + "/" + image.Id,
        url: server + "/images/edit/",
        type: 'PUT',
        contentType: 'application/json',
        headers: { authorization: 'Bearer '+ retrieveAccessToken() },
        // data: image,
        data: JSON.stringify(image),
        success: () => { successCallBack(true) },
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

function storeAccessToken(token) {
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


// function eraseAccessToken(){
//     localStorage.removeItem('access_Token');
// }

function retrieveAccessToken(){
    return localStorage.getItem('access_Token');
}

function getBearerAuthorizationToken(){
    return {'authorization': 'Bearer '+ retrieveAccessToken()};
}

// function registerRequestURL(){
//     return server + 'Accounts/register';
// }

// function storeLoggedUser(user){
//     localStorage.setItem('user', JSON.str)
// }




function REGISTER(profil, successCallBack, errorCallBack) {
    $.ajax({
        url: server + "/accounts/register",
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(profil),
        success: function (profil) {
            successCallBack(profil);
        },
        error: function (jqXHR) { errorCallBack(jqXHR.status) }
    })
}


function LOGIN(loginInfo, successCallBack, errorCallBack) {
    $.ajax({
        url: server + "/token",
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(loginInfo),
        success: function (tokenInfo) {
            storeAccessToken(tokenInfo.Access_token);
            GETUSERINFO(tokenInfo.UserId, successCallBack, errorCallBack)
            // successCallBack()
        },
        error: function (jqXHR) { errorCallBack(jqXHR.status) }
    })
}

function LOGOUT(userid, successCallBack, errorCallBack) {
    $.ajax({
        url: server + "/accounts/logout/" + userid,
        type: 'GET',
        data: {},
        success: function () {
            removeAccessToken();
            removeUserLogged();
            successCallBack()
        },
        error: function (jqXHR) { errorCallBack(jqXHR.status) }
    })
}


function GETUSERINFO(userid, successCallBack, errorCallBack) {
    $.ajax({
        url: server + "/accounts/index/" + userid,
        type: 'GET',
        contentType: 'text/plain',
        data: {},
        success: function (profil) {
            storeUserLogged(profil);
            successCallBack(profil);
        },
        error: function (jqXHR) { errorCallBack(jqXHR.status) }
    })
}

function GET_LIST_USER(successCallBack, errorCallBack) {
    let url = server + "/images/listuserimg?id=33";
    $.ajax({
        url: url,
        type: 'GET',
        contentType: 'text/plain',
        date: {},
        success: (data, status, xhr) => { successCallBack(data, xhr.getResponseHeader("ETag")) },
        error: function (jqXHR) { errorCallBack(jqXHR.status) }
    });
}




function VERIFY_EMAIL(userId, verifyCode, successCallBack, errorCallBack) {
    $.ajax({
        url: server + `/Accounts/verify?id=${userId}&code=${verifyCode}`,
        type: 'GET',
        contentType: 'text/plain',
        date: {},
        success: function () {
            GETUSERINFO(userId, successCallBack, errorCallBack);
            successCallBack();
        },
        error: function (jqXHR) { errorCallBack(jqXHR.status) }
    })
}


// function MODIFY_USER_INFO(userInfo, successCallBack, errorCallBack) {
//     $.ajax({
//         url: server + "/Accounts/verify" + "/" + userInfo.Id,
//         type: 'PUT',
//         contentType: 'application/json',
//         headers: getBearerAuthorizationToken(),
//         date: JSON.stringify(userInfo),
//         success: function () {

//             GETUSERINFO(userId, successCallBack, error);
//         },
//         error: function (jqXHR) { errorCallBack(jqXHR.status) }
//     })
// }
function MODIFY_USER_INFO(userInfo, successCallBack, errorCallBack) {
    $.ajax({
        url: server + "/accounts/modify/" + userInfo.Id,
        type: 'PUT',
        contentType: 'application/json',
        headers: {
            authorization: 'Bearer '+ retrieveAccessToken()
        },
        data: JSON.stringify(userInfo),
        success: function () {
            GETUSERINFO(userInfo.Id, successCallBack, errorCallBack);
        },
        error: function (jqXHR) { errorCallBack(jqXHR.status) }
    })
}
function DELETE_USER(userId, successCallBack, errorCallBack){
    console.log("allo")

    DELETEUSERIMAGES(userId, imageDeleteSuccessCallback, imageDeleteErrorCallback)
    function imageDeleteSuccessCallback(){
        console.log("imagedeletesuccess")
        $.ajax({
            url: server + "/accounts/remove/" + userId,
            type: 'GET',
            headers: {
                authorization: 'Bearer '+ retrieveAccessToken()
            },
            success: function (data, status, xhr) { successCallBack(xhr.getResponseHeader("ETag")) },
            error: function (jqXHR) { errorCallBack(jqXHR.status); }
        })
    }
    function imageDeleteErrorCallback(status){
        console.log("imagedeleteerror")
        errorCallBack(status);
    }
}
function DELETEUSERIMAGES(userId, successCallBack, errorCallBack){
    $.ajax({
        url: server + "/images/deleteUserImages/" + userId,
        type: 'GET',
        headers: {
            authorization: 'Bearer '+ retrieveAccessToken()
        },
        success: function () { console.log("allo2"); successCallBack() },
        error: function (jqXHR) { console.log("allo3"); errorCallBack(jqXHR.status) }
    })
}
function ABOUT(){
    $.ajax({
        url: server + "/accounts/about",
        type: 'GET',
        success: function (htmlPage) { 
            document.open();
            document.write(htmlPage);
            document.close(); 
        },
        error: function (jqXHR) { console.log("Error while transfering to the about page"); }
    })
}