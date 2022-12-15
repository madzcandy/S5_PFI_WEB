const ImagesRepository = require('../models/imagesRepository');
module.exports =
    class ImagesController extends require('./Controller') {
        constructor(HttpContext) {
            super(HttpContext, new ImagesRepository(), false, false); // todo pas d'acces anonyme
        }
        // GET: images/deleteUserImages/userId
        deleteuserimages(userId){
            if (this.writeAuthorization()) {
                if (this.repository != null) {
                        var userImageList = this.repository.getAll({"UserId": userId});
                        userImageList.forEach(image => {
                            // this.repository.remove(image.Id);
                        });
                } else
                    this.HttpContext.response.notImplemented();
            } else
                this.HttpContext.response.unAuthorized();
        }
    }