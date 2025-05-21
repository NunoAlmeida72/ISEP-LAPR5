import expressLoader from './express';
import dependencyInjectorLoader from './dependencyInjector';
import mongooseLoader from './mongoose';
import Logger from './logger';

import config from '../../config';

export default async ({ expressApp }) => {
  const mongoConnection = await mongooseLoader();
  Logger.info('✌️ DB loaded and connected!');


  const taskSchema = {
    // compare with the approach followed in repos and services
    name: 'taskSchema',
    schema: '../persistence/schemas/taskSchema',
  };

  const buildingSchema = {
    // compare with the approach followed in repos and services
    name: 'buildingSchema',
    schema: '../persistence/schemas/buildingSchema',
  };

  const floorSchema={
    // compare with the approach followed in repos and services
    name: 'floorSchema',
    schema: '../persistence/schemas/floorSchema',
  };

  const roomSchema = {
    // compare with the approach followed in repos and services
    name: 'roomSchema',
    schema: '../persistence/schemas/roomSchema',
  };

  const buildingConnectionSchema = {
    // compare with the approach followed in repos and services
    name: 'buildingConnectionSchema',
    schema: '../persistence/schemas/buildingConnectionSchema',
  };

  const robotTypeSchema={
    name: 'robotTypeSchema',
    schema: '../persistence/schemas/robotTypeSchema',
  };

  const elevatorSchema = {
    // compare with the approach followed in repos and services
    name: 'elevatorSchema',
    schema: '../persistence/schemas/elevatorSchema',
  };

  const robotSchema={
    name: 'robotSchema',
    schema: '../persistence/schemas/robotSchema',
  };





  const taskController = {
    name: config.controllers.task.name,
    path: config.controllers.task.path
  }

  const buildingController = {
    name: config.controllers.building.name,
    path: config.controllers.building.path
  }

  const floorController = {
    name: config.controllers.floor.name,
    path: config.controllers.floor.path
  }

  const roomController = {
    name: config.controllers.room.name,
    path: config.controllers.room.path
  }

  const buildingConnectionController = {
    name: config.controllers.buildingConnection.name,
    path: config.controllers.buildingConnection.path
  }

  const robotTypeController = {
    name: config.controllers.robotType.name,
    path: config.controllers.robotType.path
  }

  const elevatorController = {
    name: config.controllers.elevator.name,
    path: config.controllers.elevator.path
  };

  const robotController = {
    name: config.controllers.robot.name,
    path: config.controllers.robot.path
  }





  const taskRepo = {
    name: config.repos.task.name,
    path: config.repos.task.path
  }



  const buildingRepo = {
    name: config.repos.building.name,
    path: config.repos.building.path
  }

  const floorRepo = {
    name: config.repos.floor.name,
    path: config.repos.floor.path
  }

  const roomRepo = {
    name: config.repos.room.name,
    path: config.repos.room.path
  }

  const buildingConnectionRepo = {
    name: config.repos.buildingConnection.name,
    path: config.repos.buildingConnection.path
  }

  const robotTypeRepo = {
    name: config.repos.robotType.name,
    path: config.repos.robotType.path
  }

  const elevatorRepo = {
    name: config.repos.elevator.name,
    path: config.repos.elevator.path
  };

  const robotRepo = {
    name: config.repos.robot.name,
    path: config.repos.robot.path
  }





  const taskService = {
    name: config.services.task.name,
    path: config.services.task.path
  }

  const buildingService = {
    name: config.services.building.name,
    path: config.services.building.path
  }

  const floorService = {
    name: config.services.floor.name,
    path: config.services.floor.path
  }

  const roomService = {
    name: config.services.room.name,
    path: config.services.room.path
  }

  const buildingConnectionService = {
    name: config.services.buildingConnection.name,
    path: config.services.buildingConnection.path
  }

  const robotTypeService = {
    name: config.services.robotType.name,
    path: config.services.robotType.path
  }

  const elevatorService = {
    name: config.services.elevator.name,
    path: config.services.elevator.path
  };

  const robotService = {
    name: config.services.robot.name,
    path: config.services.robot.path
  }


  await dependencyInjectorLoader({
    mongoConnection,
    schemas: [
      taskSchema,
      buildingSchema,
      floorSchema,
      roomSchema,
      buildingConnectionSchema,
      robotTypeSchema,
      elevatorSchema,
      robotSchema
    ],
    controllers: [
      taskController,
      buildingController,
      floorController,
      roomController,
      buildingConnectionController,
      robotTypeController,
      elevatorController,
      robotController
    ],
    repos: [
      taskRepo,
      buildingRepo,
      floorRepo,
      roomRepo,
      buildingConnectionRepo,
      robotTypeRepo,
      elevatorRepo,
      robotRepo
    ],
    services: [
      taskService,
      buildingService,
      floorService,
      roomService,
      buildingConnectionService,
      robotTypeService,
      elevatorService,
      robotService
    ]
  });
  Logger.info('✌️ Schemas, Controllers, Repositories, Services, etc. loaded');

  await expressLoader({ app: expressApp });
  Logger.info('✌️ Express loaded');
};
