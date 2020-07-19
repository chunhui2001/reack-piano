
function PMSchemaObject (inputGroupText, selectRequestMethod, bodyRadioSelected, bodyRequestData, bodyReqData) {
    this.inputGroupText = inputGroupText;
    this.selectRequestMethod = selectRequestMethod;
    this.bodyRadioSelected = bodyRadioSelected;
    this.bodyRequestData = bodyRequestData;
    this.bodyReqData = bodyReqData
}

const PMSchema = (inputGroupText, selectRequestMethod, bodyRadioSelected, bodyRequestData, bodyReqData) => {
    return new PMSchemaObject(inputGroupText, selectRequestMethod, bodyRadioSelected, bodyRequestData, bodyReqData);
}

export default PMSchema;