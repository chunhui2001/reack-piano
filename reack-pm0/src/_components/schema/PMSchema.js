
function PMSchemaObject (_url, selectRequestMethod, bodyRadioSelected, bodyReqData, headers, queryParams, textBody, apiDoc) {
    this.selectRequestMethod = selectRequestMethod;
    this.bodyRadioSelected = bodyRadioSelected;
    this.bodyReqData = bodyReqData;
    this.headers = headers;
    this.inputGroupText = this.parseUri(_url).uri;
    this.queryParams = queryParams;
    this.textBody = textBody;
    this.apiDoc = apiDoc;
    this.putQueryString(_url, queryParams);
}

PMSchemaObject.prototype.putQueryString = function(_url, queryParams) {
  let queryItems = queryParams;
  let _queryString = !queryItems ? '' : queryItems.filter(f => (f.disable == null || !f.disable) && f.key).map(m => m.key + '=' + (m.val ? m.val : '')).join('&');
  let _urlObject = this.parseUri(_url);
  this.inputGroupText = _urlObject.uri + _urlObject.pathname + (_queryString ? '?' : '') + _queryString;
}

// 解析url
PMSchemaObject.prototype.parseUri = function (url) {
    if (url == null || url.trim() === '') {
      return {};
    }
    var match = url.match(/^(https?:)\/\/(([^:/?#]*)(?::([0-9]+))?)([/]{0,1}[^?#]*)(\?[^#]*|)(#.*|)$/);
    if (!match) {
      return null;
    }
    return {
        href: url,
        uri: match[1] + '//' + match[2],
        protocol: match[1], // http:
        host: match[2], // example.com:3000
        hostname: match[3], // example.com
        port: match[4], // 3000
        pathname: match[5], // /pathname/
        search: match[6], // ?search=test
        hash: match[7] // #hash
    };
}


PMSchemaObject.prototype.getQueryNewItems = function() {
  let _a = this.parseUri(this.inputGroupText).search;
  let _q = this.queryParams;
  if (!_a) {
    return _q;
  } else {
    _a = _a.substr(1).split('&');
  }
  let result = [];
  if (_q) {
    for (let q of _q) {
      for (let a of _a) {
        if (q.key === a.split('=')[0]) {
          q.val = a.split('=')[1];
          result.push(q);
        }
      }
    }
  }
  for (let a of _a) {
    let found = false;
    if (_q) {
      for (let q of _q) {
        if (q.key === a.split('=')[0]) {
          found = true;
          break;
        }
      }
    }
    if (!found) {
      if (!a.split('=')[0]) {
        continue;
      }
      result.push({key:[a.split('=')[0]], val:a.split('=')[1]});
    }
  }
  if (_q) {
    for (let q of _q) {
      if (q.disable) {
        result.push(q);
      }
    }
  }
  return result;
}

PMSchemaObject.prototype.getBodyReqData = function() {
    return this.bodyReqData;
}

PMSchemaObject.prototype.getTextPlainBody = function() {
  if (!this.textBody || this.textBody === 0) {
      return null;
    }
    return this.textBody[0].text;
}

const PMSchema = (url, selectRequestMethod, bodyRadioSelected, bodyReqData, headers, queryParams, textBody, apiDoc) => {
    return new PMSchemaObject(url, selectRequestMethod, bodyRadioSelected, bodyReqData, headers, queryParams, textBody, apiDoc);
}

export default PMSchema;