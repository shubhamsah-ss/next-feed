import { Schema, model, models } from "mongoose";
const emailRegEx =
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
/**
 * @typedef {Object} Message
 * @property {string} content - The content of the message
 * @property {Date} createdAt - The date the message was created
*/

  // MESSAGE SCHEMA
export const messageSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
  }, {timestamps: true}
);

/**
 * User model represents a user in the database.
 * @typedef {Object} UserModel
 * @property {string} username - Unique username of the user (required).
 * @property {string} email - Email address of the user (validated against a regular expression, required).
 * @property {string} password - Password of the user (required).
 * @property {string} verifyCode - Verification code for email verification (required).
 * @property {Date} verifyCodeExpiry - Expiry date of the verification code (required).
 * @property {boolean} isVerified - Indicates if the user's email has been verified (default: false).
 * @property {boolean} isAcceptingMessages - Indicates if the user is accepting messages (default: true).
 * @property {Array.<Message>} messages - Array of messages associated with the user, each adhering to the structure defined by the Message schema.
*/

// USER SCHEMA
const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    /* \
     * The `match: [emailRegEx,"Please use a valid email address"]` in the `userSchema` is used for
     * validation purposes. The first parameter is regEx and second parameter is the message.
     */
    match: [emailRegEx, "Please use a valid email address"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  verifyCode: {
    type: String,
    required: [true, "Verify code is required"],
  },
  verifyCodeExpiry: {
    type: Date,
    required: [true, "Verify code expiry is required"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAcceptingMessages: {
    type: Boolean,
    default: true
  },
  image: {
    type: String,
  },
  /*
   * In the `userSchema`, the field `messages: [messageSchema]` is defining a sub-document array where
   * each element in the array must adhere to the structure defined by the `messageSchema`. This
   * means that for each user, there can be multiple messages associated with them, and each message
   * must have a `content` field of type String as defined in the `messageSchema`.
   */
  messages: [messageSchema],
}, { timestamps: true });

// const MessageModel = models.message || model("message", messageSchema)
const UserModel = models.user || model("user", userSchema)

export {UserModel};