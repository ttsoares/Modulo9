'use strict';


/**
 * adds a new message for an user
 * Adds a message to the system
 *
 * searchString String Pass user ID to add the message
 * messageItem MessageItem Message to be added
 * authorization String JWT token (optional)
 * returns List
 **/
exports.addMessage = function(searchString,messageItem,authorization) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Adds a new user
 * Adds an user to the system
 *
 * userItem UserItem user to add
 * returns List
 **/
exports.adduser = function(userItem) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Authenticate an user
 * Test user credentials
 *
 * userItem AuthItem test username and passowrd
 * no response value expected for this operation
 **/
exports.authUser = function(userItem) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * remove a message
 * Delete a message
 *
 * messageItem String message to remove
 * authorization String JWT token (optional)
 * returns List
 **/
exports.deleteMessage = function(messageItem,authorization) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get one message from an user
 * By passing in a valid message ID gets back the specific message.
 *
 * searchString String Pass message ID to select a message
 * authorization String JWT token (optional)
 * returns List
 **/
exports.searchMessage = function(searchString,authorization) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get all messages from one user
 * By passing in a valid user ID one gets back all the messages of this particular user.
 *
 * searchString String Pass user ID to select messages
 * authorization String JWT token (optional)
 * returns List
 **/
exports.searchMessages = function(searchString,authorization) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get one user for edition
 * By passing in a valid user ID save modifyed user data.
 *
 * searchString String Pass user ID to select an user
 * authorization String JWT token (optional)
 * returns List
 **/
exports.searchUser = function(searchString,authorization) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Updatea message
 * Update data in a message
 *
 * searchString String pass user ID to select messages
 * messageItem MessageItem message to update
 * authorization String JWT token (optional)
 * returns List
 **/
exports.updateMessage = function(searchString,messageItem,authorization) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

