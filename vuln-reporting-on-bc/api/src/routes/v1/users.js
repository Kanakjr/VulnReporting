'use strict';

const express = require('express');
const router = express.Router();
const fs = require('fs');
const {enrollAdmin, registerAndEnrollUser} = require('../../controllers/fabric2.2/enrollment/user-enrollment.js');
const {getOrgConnectionProfile} = require('../../controllers/utils/common.js');

// register admin user route
router.post('/register-admin', function (req, res) {
  let regUser = req.body.regUser;
  if(!regUser) {
    res.status(500).json({error: "missing user registration data"})
    return
  }
  let orgParams = getOrgParams(regUser.org)
  enrollAdmin(regUser.userName, orgParams.orgMspId, orgParams.caDomain, orgParams.ccpPath)
  .then((results) => {
    console.log('enrollment results: ', results);
    let resObject = {
      results: results
    }
    res.status(200).json(resObject);
  })
  .catch((err) => {
    console.log('error: ', err);
    let resObject = {
      results: null,
      error: err
    }
    res.status(500).json(resObject);
  })
})

// register regular user route
router.post('/register-user', function (req, res) {
  let regUser = req.body.regUser;
  if(!regUser) {
    res.status(500).json({error: "missing user registration data"})
    return
  }
  let orgParams = getOrgParams(regUser.org)
  // res.status(200).json(orgParams);
  registerAndEnrollUser(regUser.adminUser, regUser.userName, orgParams.orgMspId, regUser.affiliation,orgParams.caDomain,orgParams.ccpPath)
  .then((results) => {
    let resObject = {
      results: results
    }
    res.status(200).json(resObject);
  })
  .catch((err) => {
    console.log('error: ', err);
    let resObject = {
      results: null,
      error: err
    }
    res.status(500).json(resObject);
  })

})
function getOrgParams(orgId) {
  let orgProfile = getOrgConnectionProfile(orgId);
  const connectionProfile = JSON.parse(fs.readFileSync(orgProfile.path, 'utf8'));
  let org = connectionProfile.organizations[orgId];
  let params = {
    ccpPath: orgProfile.path,
    orgMspId: org.mspid,
    caDomain: org.certificateAuthorities[0]
  }
  return params;
}
module.exports = router;