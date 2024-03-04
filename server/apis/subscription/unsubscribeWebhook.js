const axios = require("axios");

//DELETE - https://graph.facebook.com/page_id/subscribed_apps?access_token=PAGE_TOKEN
//Reference: https://developers.facebook.com/docs/graph-api/reference/page/subscribed_apps/#Deleting

const unsubscribeWebhook = async (page_id, page_token) => {
  const response = await axios.delete(
    `https://graph.facebook.com/${page_id}/subscribed_apps`,
    {
      params: {
        access_token: page_token,
      },
    }
  );
  return response;
};

module.exports = unsubscribeWebhook;
