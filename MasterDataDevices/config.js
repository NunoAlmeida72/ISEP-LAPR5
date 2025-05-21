import dotenv from 'dotenv';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (!envFound) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  /**
   * Your favorite port : optional change to 4000 by JRT
   */
  port: parseInt(process.env.PORT, 10) || 4000, 

  /**
   * That long string from mlab
   */
  databaseURL: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/test",

  /**
   * Your secret sauce
   */
  jwtSecret: process.env.JWT_SECRET || "my sakdfho2390asjod$%jl)!sdjas0i secret",

  /**
   * Used by winston logger
   */
  logs: {
    level: process.env.LOG_LEVEL || 'info',
  },

  /**
   * API configs
   */
  api: {
    prefix: '/api',
  },

  controllers: {
    task: {
      name: "TaskController",
      path: "../controllers/taskController"
    },
    building:{
      name: "BuildingController",
      path:"../controllers/buildingController"
    },
    floor:{
      name:"FloorController",
      path:"../controllers/floorController"
    },
    room:{
      name:"RoomController",
      path:"../controllers/roomController"
    },
    buildingConnection: {
      name:"BuildingConnectionController",
      path:"../controllers/buildingConnectionController"
    },
    robotType:{
      name:"RobotTypeController",
      path:"../controllers/robotTypeController"
    },
    elevator:{
      name:"ElevatorController",
      path:"../controllers/elevatorController"
    },
    robot:{
      name:"RobotController",
      path:"../controllers/robotController"
    }
  },

  repos: {
    task: {
      name: "TaskRepo",
      path: "../repos/taskRepo"
    },
    building: {
      name: "BuildingRepo",
      path: "../repos/buildingRepo"
    },
    floor: {
      name: "FloorRepo",
      path: "../repos/floorRepo"
    },
    room: {
      name: "RoomRepo",
      path: "../repos/roomRepo"
    },
    buildingConnection: {
      name: "BuildingConnectionRepo",
      path: "../repos/buildingConnectionRepo"
    },
    user: {
      name: "UserRepo",
      path: "../repos/userRepo"
    },
    robotType:{
      name:"RobotTypeRepo",
      path:"../repos/robotTypeRepo"
    },
    elevator:{
      name:"ElevatorRepo",
      path:"../repos/elevatorRepo"
    },
    robot:{
      name:"RobotRepo",
      path:"../repos/robotRepo"
    }
  },

  services: {
    task: {
      name: "TaskService",
      path: "../services/taskService"
    },
    building: {
      name: "BuildingService",
      path: "../services/buildingService"
    },
    floor: {
      name: "FloorService",
      path: "../services/floorService"
    },
    room: {
      name: "RoomService",
      path: "../services/roomService"
    },
    buildingConnection: {
      name: "BuildingConnectionService",
      path: "../services/buildingConnectionService"
    },
    robotType: {
      name: "RobotTypeService",
      path: "../services/robotTypeService"
    },
    elevator:{
      name:"ElevatorService",
      path:"../services/elevatorService"
    },
    robot: {
      name: "RobotService",
      path: "../services/robotService"
    }
  },
};
