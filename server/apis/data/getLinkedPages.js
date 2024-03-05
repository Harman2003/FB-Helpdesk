const axios = require("axios");

const getLinkedPages = async (user_token) => {
    const { data: pageRecord } = await axios.get(
      "https://graph.facebook.com/me/accounts",
      {
        params: {
          access_token: user_token,
        },
      }
    );

    return pageRecord.data?.map((page) => ({ name: page.name, id: page.id }));
};

module.exports = getLinkedPages;

