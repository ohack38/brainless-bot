const { App, AwsLambdaReceiver } = require("@slack/bolt");

// Initializes your app with your bot token and signing secret
const awsLambdaReceiver = new AwsLambdaReceiver({
    signingSecret: process.env.SLACK_SIGNING_SECRET,
});

const app = new App({
  receiver: awsLambdaReceiver,
  token: process.env.SLACK_BOT_TOKEN,
  processBeforeResponse: true,
  //socketMode:true,
  appToken: process.env.APP_TOKEN
});


// Listens to incoming messages that contain "hello"
app.message('hello', async ({ message, say }) => {
    // say() sends a message to the channel where the event was triggered
    await say({
      blocks: [
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": `Hey there <@${message.user}>!`
          },
          "accessory": {
            "type": "button",
            "text": {
              "type": "plain_text",
              "text": "Click Me"
            },
            "action_id": "button_click"
          }
        }
      ],
      text: `Hey there <@${message.user}>!`
    });
  });
  
// Listens for an action from a button click
app.action('button_click', async ({ body, ack, say }) => {
  await say(`<@${body.user.id}> clicked the button`);
  
  // Acknowledge the action after say() to exit the Lambda process
  await ack();
});
 
  
  // Handle the Lambda function event
module.exports.handler = async (event, context, callback) => {
    const handler = await awsLambdaReceiver.start();
    return handler(event, context, callback);
}

module.exports.testSub = async (event, context, callback) => {
    console.log('consuming testSub');
    console.log('event received:', JSON.stringify(event));
    console.log('context received:', context);
    return {
        statusCode: 200,
        body: JSON.stringify(
          {
            input: event,
          }, null, 2),
      };
}
//RELEASE TEST
//https://hooks.slack.com/services/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