const axios = require("axios");

const getPageProfile = async (page_name, page_id, user_token) => {
  const generatePageToken = async () => {
  
    const {data:long_live_data} = await axios.get(
      "https://graph.facebook.com/v19.0/oauth/access_token",
      {
        params: {
          grant_type: "fb_exchange_token",
          client_id: process.env.APP_ID,
          client_secret: process.env.APP_SECRET,
          fb_exchange_token: user_token,
        },
      }
    );
    
    const { data: pages_ } = await axios.get(
      "https://graph.facebook.com/me/accounts",
      {
        params: {
          access_token: long_live_data.access_token,
        },
      }
    );
    const pagesList = pages_.data;
    let access_token;
    if (pagesList) {
      pagesList.forEach((page) => {
        if (page.id === page_id) {
          access_token = page.access_token;
        }
      });
    }

    if (access_token) {
      return access_token;
    } else {
      throw new Error("unable to access the page");
    }
  };

  const page_token = await generatePageToken();
  const { data: picture_ } = await axios.get(
    `https://graph.facebook.com/v19.0/${page_id}`,
    {
      params: {
        fields: "picture",
        access_token: page_token,
      },
    }
  );
  const picture = picture_.picture?.data?.url;

  return {
    page_name,
    page_token,
    picture,
  };
};

module.exports = getPageProfile;

//--pages response structure--

// {
//   "data": [
//     {
//       "access_token": "ACCESS_TOKEN",
//       "category": "Software",
//       "category_list": [
//         {
//           "id": "2211",
//           "name": "Software"
//         }
//       ],
//       "name": "Testing Page",
//       "id": "227646873772475",
//       "tasks": [
//         "ADVERTISE",
//         "ANALYZE",
//         "CREATE_CONTENT",
//         "MESSAGING",
//         "MODERATE",
//         "MANAGE"
//       ]
//     },
//   ],
// }
