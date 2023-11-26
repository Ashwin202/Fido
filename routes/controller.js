const {
	getDomainByID,
	updateDomain,
	deleteDomain,
	addDomain,
	addForm,
	getFormByID,
	updateForm,
	deleteForm,
	addGroup,
	allMentors,
	getDomainList,
	addTeam,
	getTeamByID,
	updateTeam,
	deleteTeam,
	updateGroup,
	deleteGroup,
	allGroups,
	getEventListByGroupID,
	addReview,
	getGroupByID,
   getAllEventList,
   getEventByEventID,
   getEventByID,
   getUserByID,
} = require("../database/query");
const runQuery = require("../database/runQuery");
const moment = require('moment')
const sendHTTPResponse = require("../lib/sendHTTPResponse");

// Domain Controller
const getDomainController = async (request, response) => {
	const domainID = request.query.id;
	const domainValue = (await runQuery(getDomainByID(), domainID))[0];
	return sendHTTPResponse.success(response, "Fetched domain corresponding to the id", domainValue);
};

const updateDomainController = async (request, response) => {
	const domain = request.body.domain;
	const domainID = request.params.id;
	await runQuery(updateDomain(), [domain, domainID]);
	return sendHTTPResponse.success(response, "Update Domain Successfully");
};

const deleteDomainController = async (request, response) => {
	const domainID = request.params.id;
	await runQuery(deleteDomain(), [domainID]);
	return sendHTTPResponse.success(response, "Deleted Domain Successfully");
};

const addDomainController = async (request, response) => {
	const domain = request.body.domain;
	const userID = request.userID;
	await runQuery(addDomain(), [domain, userID]);
	return sendHTTPResponse.success(response, "Added Domain Successfully");
};

// Form Controller
const getFormController = async (request, response) => {
	const formID = request.params.id;
	const formDetails = (await runQuery(getFormByID(), [formID]))[0];
	return sendHTTPResponse.success(response, "Fetched domain corresponding to the id", formDetails);
};

const addFormController = async (request, response) => {
	const formData = request.body.formData;
	const userID = request.userID;
	await runQuery(addForm(), [formData.name, formData.value, userID]);
	return sendHTTPResponse.success(response, "Added Domain Successfully");
};

const updateFormController = async (request, response) => {
	const formID = request.params.id;
	const formDetails = request.body;
	await runQuery(updateForm(), [formDetails.name, formDetails.value, request.userID, formID]);
	return sendHTTPResponse.success(response, "Update Domain Successfully");
};

const deleteFormController = async (request, response) => {
	const domainID = request.params.id;
	await runQuery(deleteForm(), [domainID]);
	return sendHTTPResponse.success(response, "Deleted Form Successfully");
};

// Groups
const addGroupController = async (request, response) => {
	const isDomainSpecificGropuing = request.query?.hasDomainGroup;
	if (isDomainSpecificGropuing != "false") {
		const allMentorsList = await runQuery(allMentors());
		const allDomains = await runQuery(getDomainList());
		const groupArray = allDomains?.map((domain) => {
			const groupName = `${domain.value} Group`;
			const mentorList = allMentorsList.filter((mentor) => mentor.domain === domain.id).map((mentor) => mentor.id);
			return { groupName, mentorList };
		});
		groupArray.map(async (group) => {
			const { groupName, mentorList } = group;
			await runQuery(addGroup(), [groupName, JSON.stringify(mentorList), request.userID]);
		});
		return sendHTTPResponse.success(response, "Added Group Successfully");
	}
	const checkedAgentIDList = request.body.checkedAgentIDList;
	const groupName = request.body.groupName;
	await runQuery(addGroup(), [groupName, JSON.stringify(checkedAgentIDList), request.userID]);
	return sendHTTPResponse.success(response, "Added Group Successfully");
};
const getGroupController = async (request, response) => {
	const groupID = request.query.id;
	const groupValue = (await runQuery(getGroupByID(), groupID))[0];
	return sendHTTPResponse.success(response, "Fetched group corresponding to the id", groupValue);
};
const updateGroupController = async (request, response) => {
	const groupID = request.params.id;
	const groupName = request.body.groupName;
	const groupList = request.body.checkedUserIDListOnEdit;
	await runQuery(updateGroup(), [groupName, JSON.stringify(groupList), request.userID, groupID]);
	return sendHTTPResponse.success(response, "Update Team Successfully");
};
const deleteGroupController = async (request, response) => {
	const groupID = request.params.id;
	await runQuery(deleteGroup(), [groupID]);
	return sendHTTPResponse.success(response, "Deleted Group Successfully");
};
// Team
const addTeamController = async (request, response) => {
	const checkedTeamIDList = request.body.checkedUserIDList;
	const teamName = request.body.teamName;
	await runQuery(addTeam(), [teamName, JSON.stringify(checkedTeamIDList), request.userID]);
	return sendHTTPResponse.success(response, "Added Team Successfully");
};
const getTeamController = async (request, response) => {
	const teamID = request.query.id;
	const teamValue = (await runQuery(getTeamByID(), teamID))[0];
	return sendHTTPResponse.success(response, "Fetched team corresponding to the id", teamValue);
};
const updateTeamController = async (request, response) => {
	const teamID = request.params.id;
	const teamName = request.body.teamName;
	const teamList = request.body.checkedUserIDListOnEdit;
	await runQuery(updateTeam(), [teamName, JSON.stringify(teamList), request.userID, teamID]);
	return sendHTTPResponse.success(response, "Update Team Successfully");
};
const deleteTeamController = async (request, response) => {
	const teamID = request.params.id;
	await runQuery(deleteTeam(), [teamID]);
	return sendHTTPResponse.success(response, "Deleted Team Successfully");
};

const eventListsForIDController = async (request, response) => {
	const eventID = request.params.id;
	const eventDetails =( await runQuery(getEventByID(),[eventID]))[0]
	const teamDetails = (await runQuery(getTeamByID(),[eventDetails.team_id]))[0]
	const eventTeamDetails = await runQuery(getUserByID(), [JSON.parse(teamDetails.user_list)])
	const reviewDetails = await runQuery(getEventByEventID(), [eventID])
	let totalMatchingReviews = 0;
	eventTeamDetails?.forEach((team) => {
	   const matchingReview = reviewDetails?.find((review) => team.id === review.reviewee_id);
	   if (matchingReview) {
		  team.isReviewed = true;
		  totalMatchingReviews++;
	   }
	})
	console.log(eventTeamDetails)
	return sendHTTPResponse.success(response, "Fetched Events List", eventTeamDetails);
};

const eventListsController = async (request, response) => {
	const username = request.username;
	const userID = request.userID;
	const filter = request.query.filter;
	const details = !! request.query.details;
	if (filter == "user") {
		const allGroupsList = await runQuery(allGroups());
		eligibleGroupIDList = [];
		allGroupsList?.map((group) => {
			const userList = JSON.parse(group.user_list)?.map(Number);
			if (userList?.includes(userID)) eligibleGroupIDList.push(group.id);
		});
		const eventList = await runQuery(getEventListByGroupID(), [eligibleGroupIDList]);
		return sendHTTPResponse.success(response, "Fetched Events List by group ID", eventList);
	}
   if (details) {
      const allEventListData = (await runQuery(getAllEventList()));
    
      for (const eventDetails of allEventListData) {
        const teamDetails = (await runQuery(getTeamByID(), [eventDetails.team_id]))[0];
        const eventTeamDetails = await runQuery(getUserByID(), [JSON.parse(teamDetails.user_list)]);
        const reviewDetails = await runQuery(getEventByEventID(), [eventDetails.id]);
    
        let totalMatchingReviews = 0;
    
        eventTeamDetails?.forEach((team) => {
          const matchingReview = reviewDetails?.find((review) => team.id === review.reviewee_id);
          if (matchingReview) {
            team.isReviewed = true;
            totalMatchingReviews++;
          }
         });    
         eventDetails.status = `${totalMatchingReviews}/${eventTeamDetails.length}`
         eventDetails.created_at = moment(eventDetails.created_at)?.format("YYYY-MM-DD HH:mm:ss")

      }
      return sendHTTPResponse.success(response, "Fetched Events List", allEventListData);
    }
    
	const eventList = await runQuery(getAllEventList())
	return sendHTTPResponse.success(response, "Fetched Events List", eventList);
};

const addReviewController = async (request, response) => {
	const formID = request.body.formID;
	const revieweeID = request.body.revieweeID;
	const formResponse = request.body.formResponse;
	const eventID = request.body.eventID;
	await runQuery(addReview(), [request.userID, revieweeID, eventID, formID, JSON.stringify(formResponse)]);
	return sendHTTPResponse.success(response, "Added Review Successfully");
};
module.exports = {
	getDomainController,
	updateDomainController,
	deleteDomainController,
	addDomainController,
	getFormController,
	addFormController,
	updateFormController,
	deleteFormController,
	addGroupController,
	addTeamController,
	getTeamController,
	updateTeamController,
	deleteTeamController,
	getGroupController,
	updateGroupController,
	deleteGroupController,
	eventListsController,
	addReviewController,
	eventListsForIDController
};
