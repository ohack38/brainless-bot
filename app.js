const { App, AwsLambdaReceiver } = require("@slack/bolt");
require("dotenv").config();
// Initializes your app with your bot token and signing secret
const awsLambdaReceiver = new AwsLambdaReceiver({
    signingSecret: process.env.SLACK_SIGNING_SECRET,
});

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  receiver: awsLambdaReceiver,
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
  
// Listens to incoming messages that contain "goodbye"
app.message('goodbye', async ({ message, say }) => {
    await say(`See ya later, <@${message.user}> :wave:`);
});
  
  // Handle the Lambda function event
module.exports.handler = async (event, context, callback) => {
    const handler = await awsLambdaReceiver.start();
    return handler(event, context, callback);
}

/* app.command("/test", async ({ command, ack, say }) => {
    try {
      await ack();
      say("Yaaay! that command works!");
    } catch (error) {
        console.log("err")
      console.error(error);
    }
});

(async () => {
    const port = 3000
    // Start your app
    await app.start(process.env.PORT || port);
    console.log(`⚡️ Slack Bolt app is running on port ${port}!`);
  })(); */