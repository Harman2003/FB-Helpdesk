const parseBodyRequest = (payload) => {
  if (!payload) {
    throw new Error("invalid-payload");
  }
  const payload_data = payload[0];
  const page_id = payload_data.id;
  const msg_data = payload_data.messaging[0];
  const sender_id = msg_data.sender.id;
  const receiver_id = msg_data.recipient.id;
  const timestamp = msg_data.timestamp;

  const message = { type: "text", text: "", image: "" };
  const msg_obj = msg_data.message;
  if (msg_obj.attachments) {
    const attachments = msg_obj.attachments[0];
    message.type = attachments.type;
    message.image = attachments.payload.url;
  } else {
    message.text = msg_obj.text;
  }
  return { page_id, sender_id, receiver_id, timestamp, message };
};
module.exports = parseBodyRequest;
