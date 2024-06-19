import { MessageModel } from "@/models/user";
/**
 * @typedef {Object} ApiResponse
 * @property {string} message - The message
 * @property {boolean} [isAcceptingMessages] - Indicates if messages are being accepted
 * @property {Array<MessageModel>} [messages] - An array of messages
 */

/**
 * Function to create an ApiResponse object
 * @param {boolean} success - The success type
 * @param {string} message - The message
 * @param {boolean} [isAcceptingMessages] - Indicates if messages are being accepted
 * @param {Array<MessageModel>} [messages] - An array of messages
 * @returns {ApiResponse}
 */

// Function to create a new ApiResponse object
const createApiResponse = ({ success, message, isAcceptingMessages = null, messages = null }) => ({
    success,
    message,
    isAcceptingMessages,
    messages,
  });

export { createApiResponse };
