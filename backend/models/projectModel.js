const mongoose = require("mongoose");

const missionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Mission title is required"],
  },
  description: {
    type: String,
    required: [true, "Mission description is required"],
  },
  status: {
    type: String,
    enum: ["not started", "in progress", "completed"],
    default: "not started",
  },
  completedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Completed By is required"],
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Created By is required"],
  },
  completedAt: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Project title is required"],
    },
    description: {
      type: String,
      required: [true, "Project description is required"],
    },
    members: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        role: {
          type: String,
          enum: ["owner", "manager", "contributor", "viewer"],
          required: true,
        },
      },
    ],
    missions: [missionSchema], 
  },
  { timestamps: true }
);

const Mission = mongoose.model("Mission", missionSchema);
const Project = mongoose.model("Project", projectSchema);

module.exports =  { Project, Mission };

