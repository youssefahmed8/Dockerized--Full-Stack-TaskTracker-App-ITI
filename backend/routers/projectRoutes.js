const express = require('express');
const {
  assignRole,
  updateRole,
  removeMember,
  getProjectMembers,
  createProject,
  deleteProject,
  getUserProjects,
  addMissionToProject,
  getProjectById,
  updateMissionState,
  getAllMissions,
  getUserMissions,
  deleteMissionFromProject,
  updateMyMissionState,
  clearNotification
} = require('../controllers/projectController.js');

const router = express.Router();

router.post('/create', createProject);                                      // ✅

router.get('/user/:userId/projects', getUserProjects);                      // ✅

router.delete('/:projectId/:userId', deleteProject);                        // ✅

router.get('/:projectId', getProjectById);                                  // ✅

router.get('/:projectId/members/:userId', getProjectMembers);               // ✅

router.post('/assign-role', assignRole);                                    // ✅   add member to project

router.put('/update-role', updateRole);                                     // ✅

router.delete('/remove-member', removeMember);                              // ✅

router.post('/addMission', addMissionToProject);                            // ✅

router.put('/updateMissionState', updateMissionState);                      // ✅

router.put('/updateMyMission/:missionId/:userId', updateMyMissionState);    // ✅

router.get('/userMissions/:userId', getUserMissions);                       // ✅

router.delete('/del-mission', deleteMissionFromProject);                    // ✅ 

router.post('/clear-notification', clearNotification);                      // ✅ 

module.exports = router;
