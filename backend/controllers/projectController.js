const mongoose = require("mongoose");
const { Project, Mission } = require("../models/projectModel.js");
const User = require("../models/userModel.js");

 const createProject = async (req, res) => {
  const { title, description, userId } = req.body;
  // const userId = req.user.id;

  if (!title || !description) {
    return res
      .status(400)
      .json({ success: false, message: "Please fill in all fields" });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const existingProject = await Project.findOne({
      title,
      "members.user": user._id,
      "members.role": "owner",
    });

    if (existingProject) {
      return res.status(409).json({
        message: "A project with this title already exists for this user",
      });
    }

    const newProject = await Project.create({
      title,
      description,
      members: [{ user: user._id, role: "owner" }],
    });

    res
      .status(201)
      .json({ message: "Project created successfully", project: newProject });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

 const assignRole = async (req, res) => {
  const { projectId, userEmail, role, userId } = req.body;

  if (!projectId || !userEmail || !role) {
    return res
      .status(400)
      .json({ success: false, message: "Please fill in all fields" });
  }

  const normalizedRole = role.toLowerCase();
  const validRoles = ["manager", "contributor", "viewer"];

  if (!validRoles.includes(normalizedRole)) {
    return res.status(400).json({ message: "Invalid role" });
  }

  try {
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const requester = project.members.find(
      (member) => member.user.toString() === userId,
    );
    if (!requester || !["owner", "manager"].includes(requester.role)) {
      return res.status(403).json({ message: "Unauthorized to assign roles" });
    }

    const existingMember = project.members.find(
      (member) => member.user.toString() === user._id.toString(),
    );

    if (existingMember) {
      if (existingMember.role === normalizedRole) {
        return res
          .status(400)
          .json({ message: "User is already a member with the same role" });
      }
      existingMember.role = normalizedRole;
    } else {
      project.members.push({ user: user._id, role: normalizedRole });
    }

    await project.save();

    res.status(200).json({ message: "Role assigned successfully", project });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

 const updateRole = async (req, res) => {
  const { projectId, userEmail, userId, newRole } = req.body;

  if (!projectId || !userEmail || !newRole) {
    return res
      .status(400)
      .json({ success: false, message: "Please fill all fields" });
  }

  if (typeof newRole !== "string") {
    return res
      .status(400)
      .json({ success: false, message: "Role must be a string" });
  }

  const normalizedRole = newRole.toLowerCase();
  const validRoles = ["manager", "contributor", "viewer"];

  if (!validRoles.includes(normalizedRole)) {
    return res.status(400).json({ message: "Invalid role" });
  }

  try {
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const requester = project.members.find(
      (member) => member.user.toString() === userId,
    );
    if (!requester || !["owner", "manager"].includes(requester.role)) {
      return res.status(403).json({ message: "Unauthorized to update roles" });
    }

    const memberIndex = project.members.findIndex(
      (member) => member.user.toString() === user._id.toString(),
    );

    if (memberIndex === -1) {
      return res
        .status(404)
        .json({ message: "User is not a member of the project" });
    }

    if (project.members[memberIndex].role === normalizedRole) {
      return res.status(400).json({ message: "User already has this role" });
    }

    project.members[memberIndex].role = normalizedRole;

    await project.save();

    res.status(200).json({ message: "Role updated successfully", project });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

 const removeMember = async (req, res) => {
  const { projectId, userEmail, userId } = req.body;

  if (!projectId || !userEmail) {
    return res
      .status(400)
      .json({ success: false, message: "Please fill in all fields" });
  }

  try {
    const project = await Project.findById(projectId);
    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
    }

    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const requester = project.members.find(
      (member) => member.user.toString() === userId,
    );
    if (!requester || !["owner", "manager"].includes(requester.role)) {
      return res
        .status(403)
        .json({ message: "Unauthorized to remove members" });
    }

    const memberIndex = project.members.findIndex(
      (member) => member.user.toString() === user._id.toString(),
    );

    if (memberIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "User is not a member of the project",
      });
    }

    if (project.members[memberIndex].role === "owner") {
      return res
        .status(403)
        .json({ success: false, message: "Cannot remove the project owner" });
    }

    project.members.splice(memberIndex, 1);
    await project.save();

    res
      .status(200)
      .json({ success: true, message: "Member removed successfully", project });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

 const getProjectMembers = async (req, res) => {
  const { projectId, userId } = req.params;

  if (
    !mongoose.Types.ObjectId.isValid(projectId) ||
    !mongoose.Types.ObjectId.isValid(userId)
  ) {
    return res.status(400).json({
      success: false,
      message: "Invalid project ID or user ID format",
    });
  }

  try {
    const project = await Project.findById(projectId).populate(
      "members.user",
      "name email",
    );

    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
    }

    const user = project.members.find(
      (member) => member.user._id.toString() === userId,
    );
    if (!user) {
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized access1" });
    }
    // if ( !["owner", "manager"].includes(user.role)) {
    //   return res.status(403).json({ success: false, message: "Unauthorized access2" });
    // }

    res.status(200).json({ success: true, members: project.members });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

 const deleteProject = async (req, res) => {
  const { projectId, userId } = req.params;

  if (
    !mongoose.Types.ObjectId.isValid(projectId) ||
    !mongoose.Types.ObjectId.isValid(userId)
  ) {
    return res.status(400).json({
      success: false,
      message: "Invalid project ID or user ID format",
    });
  }

  try {
    const project = await Project.findById(projectId);

    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
    }

    const member = project.members.find(
      (member) => member.user.toString() === userId,
    );
    if (!member || member.role !== "owner") {
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized access" });
    }

    await Project.findByIdAndDelete(projectId);
    res
      .status(200)
      .json({ success: true, message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

 const getUserProjects = async (req, res) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid user ID format" });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const projects = await Project.find({ "members.user": userId }).populate(
      "members.user",
      "name email",
    );

    res.status(200).json({ projects });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

 const getProjectById = async (req, res) => {
  const { projectId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid project ID format" });
  }

  try {
    const project = await Project.findById(projectId).populate(
      "members.user",
      "name email",
    );

    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
    }

    res.status(200).json({ success: true, project });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

 const addMissionToProject = async (req, res) => {
  const { projectId, title, description, userEmail, creatorId } = req.body;

  if (!projectId || !title || !description || !userEmail || !creatorId) {
    return res
      .status(400)
      .json({ success: false, message: "Please fill in all fields" });
  }

  if (
    !mongoose.Types.ObjectId.isValid(projectId) ||
    !mongoose.Types.ObjectId.isValid(creatorId)
  ) {
    return res.status(400).json({
      success: false,
      message: "Invalid project ID or creator ID format",
    });
  }

  try {
    const project = await Project.findById(projectId);
    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
    }

    // Find the user by their email
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const userId = user._id; 

    const titleExists = project.missions.some(
      (mission) => mission.title === title,
    );
    if (titleExists) {
      return res.status(400).json({
        success: false,
        message: "A mission with this title already exists in the project",
      });
    }

    const userMember = project.members.find(
      (member) => member.user.toString() === userId.toString(),
    );
    if (!userMember) {
      return res.status(403).json({
        success: false,
        message: "User is not a member of this project",
      });
    }

    const creatorMember = project.members.find(
      (member) => member.user.toString() === creatorId,
    );
    if (!creatorMember) {
      return res.status(403).json({
        success: false,
        message: "Creator is not a member of this project",
      });
    }

    if (!["owner", "manager"].includes(creatorMember.role)) {
      return res.status(403).json({
        success: false,
        message: "Creator does not have permission to add a mission",
      });
    }

    if (!["owner", "manager", "contributor"].includes(userMember.role)) {
      return res.status(403).json({
        success: false,
        message: "User does not have permission to add a mission",
      });
    }

    const newMission = new Mission({
      title,
      description,
      completedBy: userId,
      createdBy: creatorId,
    });

    project.missions.push(newMission);

    await project.save();
    await newMission.save();

    user.notification = true;
    await user.save();

    res
      .status(201)
      .json({ success: true, message: "Mission added successfully", project });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

 const updateMissionState = async (req, res) => {
  const { projectId, missionId, newState, userId } = req.body;

  if (!projectId || !missionId || !newState || !userId) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all required fields" });
  }

  if (
    !mongoose.Types.ObjectId.isValid(projectId) ||
    !mongoose.Types.ObjectId.isValid(missionId) ||
    !mongoose.Types.ObjectId.isValid(userId)
  ) {
    return res.status(400).json({
      success: false,
      message: "Invalid project ID, mission ID, or user ID format",
    });
  }

  try {
    const project = await Project.findById(projectId);
    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
    }

    const mission = project.missions.id(missionId);
    if (!mission) {
      return res
        .status(404)
        .json({ success: false, message: "Mission not found" });
    }

    const userMember = project.members.find(
      (member) => member.user.toString() === userId,
    );
    if (
      !userMember ||
      !["owner", "manager", "contributor"].includes(userMember.role)
    ) {
      return res.status(403).json({
        success: false,
        message: "User does not have permission to update this mission",
      });
    }

    mission.status = newState;

    const user = await User.findById(userId); 
    if (user) {
      user.notification = true;
      await user.save(); 
    }

    await project.save();

    res.status(200).json({
      success: true,
      message: "Mission state updated successfully",
      mission,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

 const updateMyMissionState = async (req, res) => {
  const { missionId, userId } = req.params;
  const { newState } = req.body;

  if (!newState) {
    return res
      .status(400)
      .json({ success: false, message: "New state is required" });
  }

  if (
    !mongoose.Types.ObjectId.isValid(missionId) ||
    !mongoose.Types.ObjectId.isValid(userId)
  ) {
    return res
      .status(400)
      .json({
        success: false,
        message: "Invalid mission ID or user ID format",
      });
  }

  try {
    const project = await Project.findOneAndUpdate(
      { "missions._id": missionId, "members.user": userId },
      { $set: { "missions.$.status": newState } },
      { new: true },
    );

    if (!project) {
      return res
        .status(404)
        .json({
          success: false,
          message:
            "Project not found for the mission or user does not have permission",
        });
    }

    const updatedMission = project.missions.find(
      (m) => m._id.toString() === missionId,
    );
    res
      .status(200)
      .json({
        success: true,
        message: "Mission state updated successfully",
        mission: updatedMission,
      });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

 const getAllMissions = async (req, res) => {
  const { projectId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid project ID format" });
  }

  try {
    const project = await Project.findById(projectId).populate("missions");
    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
    }

    res.status(200).json({ success: true, missions: project.missions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

 const getUserMissions = async (req, res) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid user ID format" });
  }

  try {
    const projects = await Project.find({});

    const userMissions = projects.flatMap((project) =>
      project.missions.filter(
        (mission) => mission.completedBy.toString() === userId,
      ),
    );

    if (userMissions.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No missions found for this user" });
    }

    res.status(200).json({ success: true, missions: userMissions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

 const deleteMissionFromProject = async (req, res) => {
  const { projectId, missionId, userId } = req.body;

  if (!projectId || !missionId || !userId) {
    return res.status(400).json({
      success: false,
      message: "Please provide project ID, mission ID, and user ID",
    });
  }

  if (
    !mongoose.Types.ObjectId.isValid(projectId) ||
    !mongoose.Types.ObjectId.isValid(missionId) ||
    !mongoose.Types.ObjectId.isValid(userId)
  ) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid ID format" });
  }

  try {
    const project = await Project.findById(projectId);
    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
    }

    const missionIndex = project.missions.findIndex(
      (mission) => mission._id.toString() === missionId,
    );
    if (missionIndex === -1) {
      return res
        .status(404)
        .json({ success: false, message: "Mission not found" });
    }

    const member = project.members.find(
      (member) => member.user.toString() === userId,
    );
    if (!member || !["owner", "manager"].includes(member.role)) {
      return res.status(403).json({
        success: false,
        message: "User does not have permission to delete a mission",
      });
    }

    project.missions.splice(missionIndex, 1);
    await project.save();

    await Mission.findByIdAndDelete(missionId);

    res.status(200).json({
      success: true,
      message: "Mission deleted successfully",
      project,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const clearNotification = async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res
      .status(400)
      .json({ success: false, message: "User ID is required" });
  }

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({
      success: false,
      message: "Invalid user ID format",
    });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    user.notification = false;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Notification cleared successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
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
};