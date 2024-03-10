const parseFBMessage = (message) => {
    const type = message.type; //text or image or sticker
    if (type === "image" || type==="sticker") return type;
    else return message[type];
}
module.exports = parseFBMessage;


