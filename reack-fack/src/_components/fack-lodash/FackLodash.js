
function FackLodash () {

}

FackLodash.prototype.zipWith = function(a1, a2, done) {
    return _.zipWith(a1, a2, done);
}

FackLodash.prototype.orderBy = function(a1, a2, a3) {
    return _.orderBy(a1, a2, a3);
}

FackLodash.prototype.findIndex = function(a1, a2) {
    return _.findIndex(a1, a2);
}

FackLodash.prototype.map = function(a1, done) {
    return _.map(a1, done);
}

FackLodash.prototype.each = function(a1, done) {
    return _.each(a1, done);
}

export default new FackLodash();

