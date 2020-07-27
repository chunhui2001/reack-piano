
function PMSchemaObject (_url, selectRequestMethod, bodyRadioSelected, bodyReqData, headers, queryParams) {
    this.selectRequestMethod = selectRequestMethod;
    this.bodyRadioSelected = bodyRadioSelected;
    this.bodyReqData = bodyReqData;
    this.headers = headers;
    this.inputGroupText = this.parseUri(_url);
    this.queryParams = this.mergeQueryItems(_url, queryParams);
}

PMSchemaObject.prototype.mergeQueryItems = function(_url, queryParams) {
	let queryItems = queryParams;
    if (!queryItems) {
      return [];
    }
    let _queryString = queryItems.filter(f => f.disable == null || !f.disable).map(m => m.key + '=' + m.val).join('&');
    this.inputGroupText = this.parseUri(_url) + '?' + _queryString;
    return queryItems;
}

// 解析url
PMSchemaObject.prototype.parseUri = function (url) {
    if (url == null || url.trim() === '') {
      return {};
    }
    var match = url.match(/^(https?\:)\/\/(([^:\/?#]*)(?:\:([0-9]+))?)([\/]{0,1}[^?#]*)(\?[^#]*|)(#.*|)$/);
    if (!match) {
      return null;
    }
    var u = {
        href: url,
        protocol: match[1],  // http:
        host: match[2], // example.com:3000
        hostname: match[3], // example.com
        port: match[4], // 3000
        pathname: match[5], // /pathname/
        search: match[6], // ?search=test
        hash: match[7] // #hash
    }
    return u.protocol + '//' + u.host;
}

const PMSchema = (url, selectRequestMethod, bodyRadioSelected, bodyReqData, headers, queryParams) => {
    return new PMSchemaObject(url, selectRequestMethod, bodyRadioSelected, bodyReqData, headers, queryParams);
}

export default PMSchema;