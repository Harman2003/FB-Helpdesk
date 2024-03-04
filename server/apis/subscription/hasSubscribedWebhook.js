const axios = require("axios");

//GET - https://graph.facebook.com/page_id/subscribed_apps?access_token=PAGE_TOKEN
//Reference: https://developers.facebook.com/docs/graph-api/reference/page/subscribed_apps/#Deleting

const hasSubscribedWebhook = async (page_id, page_token) => {
  const { data: subscriptions } = await axios.get(
    `https://graph.facebook.com/${page_id}/subscribed_apps`,
    {
      params: {
        access_token: page_token,
      },
    }
  );

  const app_list = subscriptions.data;
  let status = false;
  app_list?.forEach((app) => {
    if (
      app.id === process.env.APP_ID &&
      app.subscribed_fields?.includes("messages") &&
      app.subscribed_fields?.includes("message_echoes")
    ) {
      status = true;
    }
  });
  return status;
};


module.exports = hasSubscribedWebhook;
