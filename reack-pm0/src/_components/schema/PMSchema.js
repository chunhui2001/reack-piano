
const PMSchema = (
	inputGroupText, 
	selectRequestMethod, 
	bodyRadioSelected, 
	bodyRequestData
) =>{
    return {
        inputGroupText: inputGroupText,
        selectRequestMethod: selectRequestMethod,
        bodyRadioSelected: bodyRadioSelected,
        bodyRequestData: bodyRequestData
    };
}

export default PMSchema;