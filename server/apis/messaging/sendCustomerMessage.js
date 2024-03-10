const axios = require("axios");

const sendCustomerMesssage = async (
  message,
  page_id,
  customer_id,
  page_token
) => {
  const {data} = await axios.post(
    `https://graph.facebook.com/v19.0/${page_id}/messages`,
    {},
    {
      params: {
        recipient: { id: customer_id },
        messaging_type: "RESPONSE",
        message: { text: message },
        access_token: page_token,
      },
    }
  );
  return data;
};

module.exports = sendCustomerMesssage;
