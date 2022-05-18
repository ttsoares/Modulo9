'use strict';


/**
 * remove an user
 * Delete an user
 *
 * userItem String user to remove
 * authorization String JWT token (optional)
 * returns List
 **/
exports.deleteUser = function(userItem,authorization) {
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
 * get all users
 * Retrieve a list of all users - names and passwords.
 *
 * authorization String JWT token (optional)
 * returns List
 **/
exports.searchUsers = function(authorization) {
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
 * Record edited user data
 * Update data in an user record
 *
 * searchString String Update user data
 * userItem UserItem User to update
 * authorization String JWT token (optional)
 * returns List
 **/
exports.useruseridPUT = function(searchString,userItem,authorization) {
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

