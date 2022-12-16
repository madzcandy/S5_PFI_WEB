const ImagesRepository = require('../models/imagesRepository');
const utilities = require("../utilities");
module.exports =
    class ImagesController extends require('./Controller') {
        constructor(HttpContext) {
            super(HttpContext, new ImagesRepository(), false, false); // todo pas d'acces anonyme
        }
        // GET: /images/deleteUserImages/userId
        deleteuserimages(userId){
            if (this.writeAuthorization()) {
                if (this.repository != null) {
                    if(!isNaN(userId)){
                        var userImageList = this.repository.getAll({"UserId": userId.toString()});
                        userImageList.forEach(image => {
                            if (!this.repository.remove(image.Id))
                                return this.HttpContext.response.notFound();
                        });
                        this.HttpContext.response.accepted();
                    }
                    else
                        this.HttpContext.response.unprocessable();
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
        
        
        // PUT: /images/edit body payload[{"Id": 0, "Title": "...", "Description": "...", "Shared": "...", "ImageData": "..."}]
        edit(image) {
            if (this.writeAuthorization()) {
                if (this.repository != null) {
                    let foundImage = this.repository.findByField("Id", image.Id);
                    if(foundImage.UserId == image.UserId)
                    {
                        if(image.ImageData = "")
                            image.ImageData = foundImage.ImageData;
                        let updateResult = this.repository.update(image);
                        if (updateResult == this.repository.updateResult.ok) {
                            this.HttpContext.response.ok();
                        }
                        else
                            if (updateResult == this.repository.updateResult.conflict)
                                this.HttpContext.response.conflict();
                            else
                                if (updateResult == this.repository.updateResult.notfound)
                                    this.HttpContext.response.notFound();
                                else 
                                    this.HttpContext.response.unprocessable();
                    }else
                        this.HttpContext.response.unAuthorized();
                } else
                    this.HttpContext.response.notImplemented();
            } else
                this.HttpContext.response.unAuthorized();
        }

    }
