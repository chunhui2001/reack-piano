
function Helper() {

}

Helper.prototype.toBodyData = function (currentJsonString) {
	if (currentJsonString.trim().length === 0) {
      return;
    }
    let currentJsonObject = null;
    try {
      currentJsonObject = JSON.parse(currentJsonString);
    } catch (e) {
      return;
    }
    let result =[];
	for (const [key, value] of Object.entries(currentJsonObject)) {
		result.push({
			key: key,
			val: value
		});
	}
    return result;
}

Helper.prototype.appendReqDataDesc = function(pmSchema, reqData) {
	if (reqData) {
		for (let i in reqData) {
			for (let j in pmSchema.bodyReqData) {
				if (reqData[i].key === pmSchema.bodyReqData[j].key) {
					let tmp = reqData[i];
					reqData[i] = {
						...pmSchema.bodyReqData[j],
						...tmp
					}
					reqData[i].disable =false;
					break;
				}
			}
		}
	}
	if (pmSchema.bodyReqData) {
		for (let j in pmSchema.bodyReqData) {
			if (!reqData) {
				continue;
			}
			let notFound = true;
			for (let i in reqData) {
				if (pmSchema.bodyReqData[j].key === reqData[i].key) {
					notFound = false;
					break;
				}
			}
			pmSchema.bodyReqData[j].disable = notFound;
			if (notFound) {
				reqData.push(pmSchema.bodyReqData[j]);
			}
		}
	}
	return reqData;
}

Helper.prototype.formData = function (pmSchema) {
    return pmSchema.bodyReqData;
}

Helper.prototype.jsonData = function (pmSchema) {
    if (!pmSchema.bodyReqData) {
        return {};
    }
    let  json = {};
    for (let l of pmSchema.bodyReqData) {
    	if (l.disable && (l.disable === 'true' || l.disable === true)) {
    		continue;
    	}
    	if (!l.key || !l.key.trim() || l.key.trim() === '--') {
    		continue;
    	}
    	json[l.key.trim()] = !l.val || l.val.toString().trim() === '--' || l.val.toString().trim() === '' ? null : l.val;
    }
    return json;
}

Helper.prototype.jsonDataString = function (pmSchema) {
    return JSON.stringify(this.jsonData(pmSchema), null, 2);
}

Helper.prototype.queryStringObject = function(urlSearch) {
	let urlSearchArr = null;
	let queryParamsObject = null;
	if (urlSearch) {
		queryParamsObject = {};
		urlSearchArr = urlSearch.substr(1).split('&');
		for (let qKey of urlSearchArr) {
			if (!qKey || qKey === '') {
				continue;
			}
			queryParamsObject[qKey.split('=')[0]] = qKey.split('=')[1];
		}
	}
	let queryStringObject = [];
	if (!this.blank(queryParamsObject)) {
		// convert query string to array object
		for (const [key, value] of Object.entries(queryParamsObject)) {
			queryStringObject.push({
				key: key,
				val: value
			});
		}
	} 
	while (queryStringObject.length < 10) {
		queryStringObject.push({});
	}
	return queryStringObject;
}

Helper.prototype.blank = function(obj) {
  if (!obj) {
    return true;
  }
  let l = Object.entries(obj);
  return !l || l.length === 0;
}

export default new Helper();

