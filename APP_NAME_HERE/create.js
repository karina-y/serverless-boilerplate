import uuid from "uuid";
import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
  const data = JSON.parse(event.body);

  const params = {
	TableName: "TABLE_NAME_HERE",
	Item: {
	  emailId: uuid.v1(),
	  userId: event.requestContext.identity.cognitoIdentityId,
	  // content: data.content,
	  // attachment: data.attachment,
	  createdAt: Date.now(),
	  fname: data.contact.fname,
	  lname: data.contact.lname,
	  email: data.contact.email,
	  phone: data.contact.phone,
	  occupation: data.contact.occupation,
	  referredFrom: data.referredFrom,
	  whatToGain: data.whatToGain,
	  outcomes: data.outcomes,
	  obstacles: data.obstacles,
	  ableToCommit: data.ableToCommit,
	  commitmentToResults: data.commitmentToResults,
	  availability: data.availability
	}
  };



  try {
	await dynamoDbLib.call("put", params);
	return success(params.Item);

  } catch (e) {
	return failure({ "*****CREATE FAIL*****": e });
  }
}
