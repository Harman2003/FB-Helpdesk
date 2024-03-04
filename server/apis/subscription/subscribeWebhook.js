const axios = require("axios");

//POST - https://graph.facebook.com/page_id/subscribed_apps?access_token=PAGE_TOKEN&subscribed_fields=messages,messages
//Reference: https://developers.facebook.com/docs/graph-api/webhooks/getting-started/webhooks-for-pages/

const subscribeWebhook = async (
  page_id,
  page_token
) => {
  const response = await axios.post(
    `https://graph.facebook.com/${page_id}/subscribed_apps`,{},
    {
      params: {
        subscribed_fields:"messages,message_echoes",
        access_token: page_token,
      },
    }
  );
  return response;
}


module.exports = subscribeWebhook;
