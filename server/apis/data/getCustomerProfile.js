const axios = require("axios");
const customProfile = require("../../utils/customProfile");

const getCustomerProfile = async (customer_id, page_token) => {
  const data = {
    firstname: "Anonymous",
    lastname: "",
    img: "https://eu.ui-avatars.com/api/?name=Anonymous&size=460",
    timezone: "-",
    gender: "-",
  };

  try {
    const response = await axios.get(
      `https://graph.facebook.com/${customer_id}`,
      {
        params: {
          fields: "first_name,last_name,gender,timezone",
          access_token: page_token,
        },
      }
    );

    const { first_name, last_name, timezone, gender } = response.data;
    setValue(data, "firstname", first_name);
    setValue(data, "lastname", last_name);
    // setValue(data, "img", profile_pic);  gives issue in developement (works in verified apps)
    setValue(data, "img", customProfile(first_name + " " + last_name));
    setValue(data, "timezone", timezone);
    setValue(data, "gender", gender);
    data["gender"] = gender;
  } catch (err) {
    console.log(err.message);
  }
  return data;
};

function setValue(object, key, value) {
  if (value) object[key] = value;
}

module.exports = getCustomerProfile;
