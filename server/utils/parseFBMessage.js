const parseFBMessage = (message) => {
    const type = message.type; //text or image
    if (type == "image") return type;
    else return message[type];
}
module.exports = parseFBMessage;


