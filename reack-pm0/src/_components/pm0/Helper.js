
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
			//debugger;
				if (reqData[i].key === pmSchema.bodyReqData[j].key) {
					reqData[i].desc = pmSchema.bodyReqData[j].desc;
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
			reqData.push(pmSchema.bodyReqData[j]);
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
    	if (l.disable) {
    		continue;
    	}
        json[l.key] = l.val;
    }
    return json;
}

Helper.prototype.jsonDataString = function (pmSchema) {
    return JSON.stringify(this.jsonData(pmSchema), null, 2);
}


export default new Helper();