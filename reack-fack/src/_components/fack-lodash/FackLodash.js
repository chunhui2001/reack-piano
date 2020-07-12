
function FackLodash () {

}

FackLodash.prototype.zipWith = function(a1, a2, done) {
    return _.zipWith(a1, a2, done);
}

export default new FackLodash();

