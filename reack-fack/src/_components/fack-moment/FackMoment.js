
function FackMoment () {

}

FackMoment.prototype.moment = function(args) {
    if (!args) {
        return moment();
    }
    return moment(args);
}

export default new FackMoment();

