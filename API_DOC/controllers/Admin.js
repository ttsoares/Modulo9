'use strict';

var utils = require('../utils/writer.js');
var Admin = require('../service/AdminService');

module.exports.deleteUser = function deleteUser (req, res, next) {
  var userItem = req.swagger.params['userItem'].value;
  var authorization = req.swagger.params['Authorization'].value;
  Admin.deleteUser(userItem,authorization)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.searchUsers = function searchUsers (req, res, next) {
  var authorization = req.swagger.params['Authorization'].value;
  Admin.searchUsers(authorization)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.useruseridPUT = function useruseridPUT (req, res, next) {
  var searchString = req.swagger.params['searchString'].value;
  var userItem = req.swagger.params['UserItem'].value;
  var authorization = req.swagger.params['Authorization'].value;
  Admin.useruseridPUT(searchString,userItem,authorization)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
