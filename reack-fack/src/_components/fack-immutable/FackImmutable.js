
function FackImmutable () {

}

FackImmutable.prototype.fromJS = function(args) {
    return Immutable.fromJS(args);
}

export default new FackImmutable();

