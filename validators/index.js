const login = require('./login.validator');
const signup = require('./signup.validator');
const createProject = require('./create-project.validator');
const issue = require('./issue.validator');
module.exports = {
    login,
    signup,
    createProject,
    issue
};