const dbQuery = require("../database/query");
const runQuery = require("../database/runQuery");

const getFormInfoFormatted = async (reviewID) => {
    const formObject = {}
    const reviewDetails = (await runQuery(dbQuery.getReviewByID(), [reviewID]))[0]
    const formInfo = (await runQuery(dbQuery.getFormByID(), [reviewDetails.form_id]))[0]
    if (formInfo && reviewDetails.form_response) {
        formObject.name = formInfo?.name
        formObject.labels = JSON.parse(formInfo?.value).map(field => field.label)
        formObject.keys = reviewDetails.form_response && JSON.parse(reviewDetails.form_response)?.map(obj => Object.keys(obj)[0])
        formObject.values = reviewDetails.form_response && JSON.parse(reviewDetails.form_response)?.map(obj => Object.values(obj)[0])
        formObject.tempFormat = `Form - ${(formInfo?.name)} \n${JSON.parse(formInfo?.value).map(field => field.label)} = ${reviewDetails.form_response && JSON.parse(reviewDetails.form_response)?.map(obj => Object.values(obj)[0]).join(', ')}`;
        return formObject
    }
}
module.exports = {
    getFormInfoFormatted
}