
function PMSchemaObject (inputGroupText, selectRequestMethod, bodyRadioSelected, bodyReqData) {
    this.inputGroupText = inputGroupText;
    this.selectRequestMethod = selectRequestMethod;
    this.bodyRadioSelected = bodyRadioSelected;
    this.bodyReqData = bodyReqData
}

const PMSchema = (inputGroupText, selectRequestMethod, bodyRadioSelected, bodyReqData) => {
    return new PMSchemaObject(inputGroupText, selectRequestMethod, bodyRadioSelected, bodyReqData);
}

export default PMSchema;