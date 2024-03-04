const axios = require('axios');

const getCustomerProfile = async (customer_id, page_token) => {
    const data = {
        firstname: "Anonymous",
        lastname: "",
        img: "https://eu.ui-avatars.com/api/?name=Anonymous&size=460",
        timezone: "5.5",
        gender:"-"
    }

    try {  
        const response = await axios.get(`https://graph.facebook.com/${customer_id}`, {
            params: {
                fields: "first_name,last_name,profile_pic,gender,gender,timezone",
                access_token: page_token
            }
        });
        const { first_name, last_name, profile_pic, timezone, gender } = response.data;
        data["firstname"] = first_name;
        data["lastname"] = last_name;
        data["img"] = profile_pic;
        data["timezone"] = timezone;
        data["gender"] = gender;
        
    } catch (err) {
        console.log(err);
    }

    return data;
}

module.exports = getCustomerProfile;
