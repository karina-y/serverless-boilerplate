import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
  const params = {
	TableName: "TABLE_NAME_HERE",
	// 'KeyConditionExpression' defines the condition for the query
	// - 'userId = :userId': only return items with matching 'userId'
	//   partition key
	// 'ExpressionAttributeValues' defines the value in the condition
	// - ':userId': defines 'userId' to be Identity Pool identity id
	//   of the authenticated user
	KeyConditionExpression: "emailId = :emailId",
	ExpressionAttributeValues: {
	  // ":userId": event.requestContext.identity.cognitoIdentityId,
	  ":emailId": "84d44640-2b46-11e9-8718-d3dbbc1651fa",
	}
  };

  try {
	const result = await dynamoDbLib.call("query", params);
	// Return the matching list of items in response body
	return success(result.Items);
  } catch (e) {
	return failure({ "*****LIST FAIL*****": e });
  }
}
