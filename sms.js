/**
 * This is a sample Lambda function that sends an SMS on click of a
 * button. It needs one permission sns:Publish. The following policy
 * allows SNS publish to SMS but not topics or endpoints.
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "sns:Publish"
            ],
            "Resource": [
                "*"
            ]
        },
        {
            "Effect": "Deny",
            "Action": [
                "sns:Publish"
            ],
            "Resource": [
                "arn:aws:sns:*:*:*"
            ]
        }
    ]
}
 *
 * The following JSON template shows what is sent as the payload:
{
    "serialNumber": "GXXXXXXXXXXXXXXXXX",
    "batteryVoltage": "xxmV",
    "clickType": "SINGLE" | "DOUBLE" | "LONG"
}
 *
 * A "LONG" clickType is sent if the first press lasts longer than 1.5 seconds.
 * "SINGLE" and "DOUBLE" clickType payloads are sent for short clicks.
 *
 * For more documentation, follow the link below.
 * http://docs.aws.amazon.com/iot/latest/developerguide/iot-lambda-rule.html
 */

'use strict';

const AWS = require('aws-sdk');

const SNS = new AWS.SNS({ apiVersion: '2010-03-31' });
const ADULTCHILD = '918113953537'; // Replace with your number

exports.handler = (event, context, callback) => {
    console.log('Received event:', event);


if (event.clickType == "LONG")
{
    const payload = JSON.stringify(event);
    const params = {
        PhoneNumber: ADULTCHILD,
        Message: "HELP! I need Medical Attention immediately",
    };
    SNS.publish(params, callback);
        var aws = require('aws-sdk');
    var lambda = new aws.Lambda({
    region: 'us-east-1' //change to your region
    });
//invokes a lambda 
        lambda.invoke({
          FunctionName: 'iotbutton_G030JF059346NHUH_iot-button-ifttt-maker-nodejs',
          Payload: JSON.stringify(event, null, 2) // pass params
        }, function(error, data) {
          if (error) {
            context.done('error', error);
          }
          if(data.Payload){
           context.succeed(data.Payload)
          }
        });
  }

  if (event.clickType == "SINGLE")
  {
    const payload = JSON.stringify(event);
    const params = {
      PhoneNumber: ADULTCHILD,
      Message: "Can you please come to my room.I need Help.",
  };
    SNS.publish(params, callback);
  }

  if (event.clickType == "DOUBLE")
  {
    const payload = JSON.stringify(event);
    const params = {
      PhoneNumber: ADULTCHILD,
      Message: "I am not feeling very well",
  };
    SNS.publish(params, callback);
  }

    // result will go to function callback
    


};


