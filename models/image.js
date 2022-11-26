const Model = require('./model');
module.exports = 
class Image extends Model{
    constructor()
    {
        super();
        this.Title = "";
        this.Description = "";
        this.Date = 0;
        this.UserId = 0;
        this.Shared = 0;
        this.GUID = "";

        this.addValidator('Title','string');
        this.addValidator('Description', 'string');
        this.addValidator('Shared', 'integer');
    }
}