const { App, AwsLambdaReceiver } = require("@slack/bolt");

const axios = require('axios');

// Initializes your app with your bot token and signing secret
const awsLambdaReceiver = new AwsLambdaReceiver({
    signingSecret: process.env.SLACK_SIGNING_SECRET,
});

const app = new App({
  receiver: awsLambdaReceiver,
  token: process.env.SLACK_BOT_TOKEN,
  processBeforeResponse: true,
  //socketMode:true,
  appToken: process.env.APP_TOKEN,
 
});


const createUrl = (symbol) => {
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${symbol}&vs_currencies=usd`
  return url
}
const getPrices = async () => {
  const ethUrl = createUrl('ethereum')
  const btcUrl = createUrl('bitcoin')
  try {
    const ethRes = await axios.get(ethUrl)
    const btcRes = await axios.get(btcUrl)

    const eth = ethRes.data
    const btc = btcRes.data
    return { eth, btc }
  } catch (error) {
    console.error(error);
  }
}
async function getUsd() {
  const response = await axios.get(createUrl('bitcoin'));
  return response.data.usd;
}

module.exports = getUsd;


//lambda handler

module.exports.testSub = async (event, context) => {
    
    const test = await getPrices()
    const url = process.env.SLACK_URL
    const payload = {
      "blocks": [
        {
          "type": "divider"
        },
        {
          "type": "header",
          "text": {
            "type": "plain_text",
            "text": "Crypto Insight",
            "emoji": true
          }
        },
        {
          "type": "section",
          "fields": [
            {
              "type": "mrkdwn",
              "text": ":btc: *BTC*"
            },
            {
              "type": "plain_text",
              "text": JSON.stringify(test.btc.bitcoin.usd),
              "emoji": true
            }
          ]
        },
        {
          "type": "section",
          "fields": [
            {
              "type": "mrkdwn",
              "text": ":eth: *ETH*"
            },
            {
              "type": "plain_text",
              "text": JSON.stringify(test.eth.ethereum.usd),
              "emoji": true
            }
          ]
        }
        
      ]
    }
    try {
      await axios.post(url, payload ,{
        headers: {
          'Content-Type': 'application/json',
        }
      })
    } catch (err) {
      console.error(err)
    }
  
    return {
        statusCode: 200,
        body: JSON.stringify(
          {
            input: event,
          }, null, 2),
      };
}
//RELEASE TEST
//