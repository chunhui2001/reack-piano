
import queryString from 'query-string';

function Service () {

}

Service.prototype.queryString = function(arg) {
	return queryString;
}

export default new Service();

