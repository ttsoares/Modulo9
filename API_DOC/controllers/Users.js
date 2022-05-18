'use strict';

var utils = require('../utils/writer.js');
var Users = require('../service/UsersService');

module.exports.addMessage = function addMessage (req, res, next) {
  var searchString = req.swagger.params['searchString'].value;
  var messageItem = req.swagger.params['messageItem'].value;
  var authorization = req.swagger.params['Authorization'].value;
  Users.addMessage(searchString,messageItem,authorization)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.adduser = function adduser (req, res, next) {
  var userItem = req.swagger.params['userItem'].value;
  Users.adduser(userItem)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.authUser = function authUser (req, res, next) {
  var userItem = req.swagger.params['userItem'].value;
  Users.authUser(userItem)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteMessage = function deleteMessage (req, res, next) {
  var messageItem = req.swagger.params['messageItem'].value;
  var authorization = req.swagger.params['Authorization'].value;
  Users.deleteMessage(messageItem,authorization)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.searchMessage = function searchMessage (req, res, next) {
  var searchString = req.swagger.params['searchString'].value;
  var authorization = req.swagger.params['Authorization'].value;
  Users.searchMessage(searchString,authorization)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.searchMessages = function searchMessages (req, res, next) {
  var searchString = req.swagger.params['searchString'].value;
  var authorization = req.swagger.params['Authorization'].value;
  Users.searchMessages(searchString,authorization)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.searchUser = function searchUser (req, res, next) {
  var searchString = req.swagger.params['searchString'].value;
  var authorization = req.swagger.params['Authorization'].value;
  Users.searchUser(searchString,authorization)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.updateMessage = function updateMessage (req, res, next) {
  var searchString = req.swagger.params['searchString'].value;
  var messageItem = req.swagger.params['messageItem'].value;
  var authorization = req.swagger.params['Authorization'].value;
  Users.updateMessage(searchString,messageItem,authorization)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
