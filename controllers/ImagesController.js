const ImagesRepository = require('../models/imagesRepository');
module.exports =
    class ImagesController extends require('./Controller') {
        constructor(HttpContext) {
            super(HttpContext, new ImagesRepository(), false, false); // todo pas d'acces anonyme
        }
        // GET: images/deleteUserImages/userId
        // deleteUserImages(imageIds){
        //     if (this.writeAuthorization()) {
        //         if (this.repository != null) {
                    
        //         } else
        //             this.HttpContext.response.notImplemented();
        //     } else
        //         this.HttpContext.response.unAuthorized();
        // }
    }