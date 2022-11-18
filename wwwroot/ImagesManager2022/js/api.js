const apiBaseURL = "http://localhost:5000/api/images";
const server = "http://localhost:5000";

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







/*
function login(Email, Password, sucessCallBack, errorCallBack) {
    $.ajax({
        url: tokenRequestURL(),
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({Email, Password}),
        success: function(profil){
            storeAccessToken(profil.Access_token);
            getUserInfo(profil.UserId, sucessCallBack, errorCallBack);
        },
        error : function(jqXHR) {errorCallBack(jqXHR.status)}
    })
}
*/