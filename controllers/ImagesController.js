const ImagesRepository = require('../models/imagesRepository');
module.exports =
    class ImagesController extends require('./Controller') {
        constructor(HttpContext) {
            super(HttpContext, new ImagesRepository(), false, false); // todo pas d'acces anonyme
        }
        // GET: images/deleteUserImages/userId
        deleteUserImages(userId){
            if (this.writeAuthorization()) {
                if (this.repository != null) {

                } else
                    this.HttpContext.response.notImplemented();
            } else
                this.HttpContext.response.unAuthorized();
        }

        //http://localhost:5000/images/listuserimg?id=33

        listuserimg(){
            let data = this.repository.getListUser(this.HttpContext.path.params);
            if (data != null)
                this.HttpContext.response.JSON(data);
            else
                this.HttpContext.response.notFound();


        }
        /*
        getListUser() {

            if (this.readAuthorization()) {
                if (this.repository != null) {
                    let data = this.repository.getListUser();
                    if (data != null)
                        this.HttpContext.response.JSON(data);
                    else
                        this.HttpContext.response.notFound();

                  //  this.HttpContext.response.badRequest();
                  //  this.HttpContext.response.JSON(this.repository.getAll(this.HttpContext.path.params), this.repository.ETag);
                }
                else
                    this.HttpContext.response.notImplemented();
            }
            else
                this.HttpContext.response.unAuthorized();
        }*/


    }
