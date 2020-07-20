
function PMSchemaObject (inputGroupText, selectRequestMethod, bodyRadioSelected, bodyReqData, headers) {
    this.inputGroupText = inputGroupText;
    this.selectRequestMethod = selectRequestMethod;
    this.bodyRadioSelected = bodyRadioSelected;
    this.bodyReqData = bodyReqData;
    this.headers = headers;
}

const PMSchema = (inputGroupText, selectRequestMethod, bodyRadioSelected, bodyReqData, headers) => {
    return new PMSchemaObject(inputGroupText, selectRequestMethod, bodyRadioSelected, bodyReqData, headers);
}

export default PMSchema;