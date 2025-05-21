import 'reflect-metadata'

import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import { Result } from '../../../src/core/logic/Result';
import  ElevatorService  from '../../../src/services/elevatorService';
import  IElevatorDTO  from '../../../src/dto/IElevatorDTO';
import { Elevator } from '../../../src/domain/elevator';
import IBuildingRepo from '../../../src/services/IRepos/IBuildingRepo';
import { afterEach, beforeEach, describe } from 'node:test';
import { Building } from '../../../src/domain/building';
import { resolve } from 'path';
import IFloorRepo from '../../../src/services/IRepos/IFloorRepo';
import { Floor } from '../../../src/domain/floor';
import IElevatorRepo from '../../../src/services/IRepos/IElevatorRepo';

describe('Elevator Service', function () {
    const sandbox = sinon.createSandbox();

    beforeEach(function() {
        Container.reset();
        let elevatorSchemaInstance = require("../../../src/persistence/schemas/elevatorSchema").default;
        Container.set("ElevatorSchema", elevatorSchemaInstance);

        let elevatorRepoClass = require("../../../src/repos/elevatorRepo").default;
        let elevatorRepoInstance = Container.get(elevatorRepoClass);
        Container.set("ElevatorRepo", elevatorRepoInstance);

        let buildingSchemaInstance = require("../../../src/persistence/schemas/buildingSchema").default;
        Container.set("BuildingSchema", buildingSchemaInstance);

        let buildingRepoClass = require("../../../src/repos/buildingRepo").default;
        let buildingRepoInstance = Container.get(buildingRepoClass);
        Container.set("BuildingRepo", buildingRepoInstance);

        let roomSchemaInstance = require("../../../src/persistence/schemas/roomSchema").default;
        Container.set("RoomSchema", roomSchemaInstance);

        let roomRepoClass = require("../../../src/repos/roomRepo").default;
        let roomRepoInstance = Container.get(roomRepoClass);
        Container.set("RoomRepo", roomRepoInstance);

    });

    afterEach(function() {
        sandbox.restore();
    });

    it('should create a new elevator elevatorService unit test using elevatorRepo, buildingRepo, floorRepo, floor, building, elevator stubs', async function () {

        let body = {
            "code": "E1",
            "brand": "Otis",
            "model": "123",
            "serialNumber": "123",
            "buildingId": "123",
            "floorsIds": ["123"],
            "posX": 10,
            "posY": 10
        };

        let req: Partial<Request> = {};
        req.body = body;
        let res: Partial<Response> = {
            json: sinon.spy()
        };
        let next: Partial<NextFunction> = {};

        sinon.stub(Building, "create").returns(Result.ok({"id":"123", 
		"name": "BuildingName",
		"code":"B1",
		"description": "BuildingDescription",
		"width": 10,
		"depth": 10}));
    
        let buildingRepoInstance = Container.get("BuildingRepo");
		const   buildingRepo=sinon.stub(buildingRepoInstance, "save").returns(new Promise<Building>((resolve, reject) => {
			resolve(Building.create({"id":"123", 
			"name": "BuildingName",
		    "code":"B1",
		    "description": "BuildingDescription",
		    "width": 10,
		    "depth": 10}).getValue())
		}));

        sinon.stub(Floor, "create").returns(Result.ok({"id":"1234", 
		"buildingId": "123",
		"number": 2,
		"description": "FloorDescription"}));

        let floorRepoInstance = Container.get("FloorRepo");
		const   floorRepo=sinon.stub(floorRepoInstance, "save").returns(new Promise<Floor>((resolve, reject) => {
            resolve(Floor.create({"id":"1234",
            "buildingId": "123",
            "number": 2,
            "description": "FloorDescription",
            "map" : [],initialDirection:1,initialPosition:[1,1]}).getValue())
        }));

        sinon.stub(Elevator, "create").returns(Result.ok({"id":"12345",
        "code": req.body.code,
        "brand": req.body.brand,
        "model": req.body.model,
        "serialNumber": req.body.serialNumber,
        "buildingId": req.body.buildingId,
        "floorsids": req.body.floorsids,
        "posX": req.body.posX,
        "posY": req.body.posY   
    }));

        let elevatorRepoInstance = Container.get("ElevatorRepo");
        const  elevatorRepo=sinon.stub(elevatorRepoInstance, "save").returns(new Promise<Elevator>((resolve, reject) => {
            resolve(Elevator.create(body as IElevatorDTO).getValue())
        }));

        const elevatorService = new ElevatorService(elevatorRepo as IElevatorRepo,  floorRepo as IFloorRepo,buildingRepo as IBuildingRepo);

        //Act
        await elevatorService.createElevator(body as IElevatorDTO);

        //Assert
        sinon.assert.calledOnce(res.json);
        sinon.assert.calledWith(res.json, sinon.match({"id":"12345",
        "code": req.body.code,
        "brand": req.body.brand,
        "model": req.body.model,
        "serialNumber": req.body.serialNumber,
        "buildingId": req.body.buildingId,
        "floorsids": req.body.floorsids,
        "posX": req.body.posX,
        "posY": req.body.posY
    }));
    });

    it('fail createElevator elevatorService unit test using elevatorRepo, buildingRepo, floorRepo, floor, building, elevator stubs', async function () {
        // Arrange

        let body = {};
        let req: Partial<Request> = {};
        req.body = body;
        let res: Partial<Response> = {
            json: sinon.spy()
        };
        let next: Partial<NextFunction> = {};

        sinon.stub(Building, "create").returns(Result.ok({"id":"123", 
		"name": "BuildingName",
		"code":"B1",
		"description": "BuildingDescription",
		"width": 10,
		"depth": 10}));
    
        let buildingRepoInstance = Container.get("BuildingRepo");
		const   buildingRepo=sinon.stub(buildingRepoInstance, "save").returns(new Promise<Building>((resolve, reject) => {
			resolve(Building.create({"id":"123", 
			"name": "BuildingName",
		    "code":"B1",
		    "description": "BuildingDescription",
		    "width": 10,
		    "depth": 10}).getValue())
		}));

        sinon.stub(Floor, "create").returns(Result.ok({"id":"1234", 
		"buildingId": "123",
		"number": 2,
		"description": "FloorDescription"}));

        let floorRepoInstance = Container.get("FloorRepo");
		const   floorRepo=sinon.stub(floorRepoInstance, "save").returns(new Promise<Floor>((resolve, reject) => {
            resolve(Floor.create({"id":"1234",
            "buildingId": "123",
            "number": 2,
            "description": "FloorDescription",
            "map" : [],initialDirection:1,initialPosition:[1,1]}).getValue())
        }));


        sinon.stub(Elevator, "create").returns(Result.fail<Elevator>("Must provide a elevator code(max 5 characters)"));

        let elevatorRepoInstance = Container.get("ElevatorRepo");
        const elevatorRepo=sinon.stub(elevatorRepoInstance, "save").returns(new Promise<Elevator>((resolve, reject) => {
            resolve(Elevator.create(body as IElevatorDTO).getValue())
        }));

        const elevatorService = new ElevatorService(elevatorRepo as IElevatorRepo,  floorRepo as IFloorRepo,buildingRepo as IBuildingRepo);

        //Act
        await elevatorService.createElevator(body as IElevatorDTO);

        //Assert
        sinon.assert.calledOnce(res.json);
        sinon.assert.calledWith(res.json, sinon.match({"error": "Must provide a elevator code(max 5 characters)"}));

    });


    it('updateElevator elevatorService unit test using elevatorRepo, buildingRepo, floorRepo, floor, building, elevator stubs', async function () {

        let body = {
            "code": "E1",
            "brand": "Otis",
            "model": "123",
            "serialNumber": "123",
            "buildingId": "123",
            "floorsIds": ["123"],
            "posX": 10,
            "posY": 10
        };

        let req: Partial<Request> = {};
        req.body = body;
        let res: Partial<Response> = {
            json: sinon.spy()
        };
        let next: Partial<NextFunction> = {};

        sinon.stub(Building, "create").returns(Result.ok({"id":"123", 
		"name": "BuildingName",
		"code":"B1",
		"description": "BuildingDescription",
		"width": 10,
		"depth": 10}));
    
        let buildingRepoInstance = Container.get("BuildingRepo");
		const   buildingRepo=sinon.stub(buildingRepoInstance, "save").returns(new Promise<Building>((resolve, reject) => {
			resolve(Building.create({"id":"123", 
			"name": "BuildingName",
		    "code":"B1",
		    "description": "BuildingDescription",
		    "width": 10,
		    "depth": 10}).getValue())
		}));

        sinon.stub(Floor, "create").returns(Result.ok({"id":"1234", 
		"buildingId": "123",
		"number": 2,
		"description": "FloorDescription"}));

        let floorRepoInstance = Container.get("FloorRepo");
		const   floorRepo=sinon.stub(floorRepoInstance, "save").returns(new Promise<Floor>((resolve, reject) => {
            resolve(Floor.create({"id":"1234",
            "buildingId": "123",
            "number": 2,
            "description": "FloorDescription",
            "map" : [],initialDirection:1,initialPosition:[1,1]}).getValue())
        }));

        sinon.stub(Elevator, "create").returns(Result.ok({"id":"12345",
        "code": req.body.code,
        "brand": req.body.brand,
        "model": req.body.model,
        "serialNumber": req.body.serialNumber,
        "buildingId": req.body.buildingId,
        "floorsids": req.body.floorsids,
        "posX": req.body.posX,
        "posY": req.body.posY   
    }));

        let elevatorRepoInstance = Container.get("ElevatorRepo");
        const  elevatorRepo=sinon.stub(elevatorRepoInstance, "save").returns(new Promise<Elevator>((resolve, reject) => {
            resolve(Elevator.create(body as IElevatorDTO).getValue())
        }));

        const elevatorService = new ElevatorService(elevatorRepo as IElevatorRepo,  floorRepo as IFloorRepo,buildingRepo as IBuildingRepo);

        //Act
        await elevatorService.updateElevator(body as IElevatorDTO);

        //Assert
        sinon.assert.calledOnce(res.json);
        sinon.assert.calledWith(res.json, sinon.match({"id":"12345",
        "code": req.body.code,
        "brand": req.body.brand,
        "model": req.body.model,
        "serialNumber": req.body.serialNumber,
        "buildingId": req.body.buildingId,
        "floorsids": req.body.floorsids,
        "posX": req.body.posX,
        "posY": req.body.posY
    }));
    });

    it('fail updateElevator elevatorService unit test using elevatorRepo, buildingRepo, floorRepo, floor, building, elevator stubs', async function () {
       // Arrange

       let body = {};
       let req: Partial<Request> = {};
       req.body = body;
       let res: Partial<Response> = {
           json: sinon.spy()
       };
       let next: Partial<NextFunction> = {};

       sinon.stub(Building, "create").returns(Result.ok({"id":"123", 
       "name": "BuildingName",
       "code":"B1",
       "description": "BuildingDescription",
       "width": 10,
       "depth": 10}));
   
       let buildingRepoInstance = Container.get("BuildingRepo");
       const   buildingRepo=sinon.stub(buildingRepoInstance, "save").returns(new Promise<Building>((resolve, reject) => {
           resolve(Building.create({"id":"123", 
           "name": "BuildingName",
           "code":"B1",
           "description": "BuildingDescription",
           "width": 10,
           "depth": 10}).getValue())
       }));

       sinon.stub(Floor, "create").returns(Result.ok({"id":"1234", 
       "buildingId": "123",
       "number": 2,
       "description": "FloorDescription"}));

       let floorRepoInstance = Container.get("FloorRepo");
       const   floorRepo=sinon.stub(floorRepoInstance, "save").returns(new Promise<Floor>((resolve, reject) => {
           resolve(Floor.create({"id":"1234",
           "buildingId": "123",
           "number": 2,
           "description": "FloorDescription",
           "map" : [],initialDirection:1,initialPosition:[1,1]}).getValue())
       }));


       sinon.stub(Elevator, "create").returns(Result.fail<Elevator>("Must provide a elevator code(max 5 characters)"));

       let elevatorRepoInstance = Container.get("ElevatorRepo");
       const elevatorRepo=sinon.stub(elevatorRepoInstance, "save").returns(new Promise<Elevator>((resolve, reject) => {
           resolve(Elevator.create(body as IElevatorDTO).getValue())
       }));

       const elevatorService = new ElevatorService(elevatorRepo as IElevatorRepo,  floorRepo as IFloorRepo,buildingRepo as IBuildingRepo);

       //Act
       await elevatorService.updateElevator(body as IElevatorDTO);

       //Assert
       sinon.assert.calledOnce(res.json);
       sinon.assert.calledWith(res.json, sinon.match({"error": "Must provide a elevator code(max 5 characters)"}));


    });

    it('listElevators elevatorService unit test using elevatorRepo, buildingRepo, floorRepo, floor, building, elevator stubs', async function () {
    
        let body = {
            "code": "E1",
            "brand": "Otis",
            "model": "123",
            "serialNumber": "123",
            "buildingId": "123",
            "floorsIds": ["123"],
            "posX": 10,
            "posY": 10
        };

        let req: Partial<Request> = {};
        req.body = body;
        let res: Partial<Response> = {
            json: sinon.spy()
        };
        let next: Partial<NextFunction> = {};

        sinon.stub(Building, "create").returns(Result.ok({"id":"123", 
		"name": "BuildingName",
		"code":"B1",
		"description": "BuildingDescription",
		"width": 10,
		"depth": 10}));
    
        let buildingRepoInstance = Container.get("BuildingRepo");
		const   buildingRepo=sinon.stub(buildingRepoInstance, "save").returns(new Promise<Building>((resolve, reject) => {
			resolve(Building.create({"id":"123", 
			"name": "BuildingName",
		    "code":"B1",
		    "description": "BuildingDescription",
		    "width": 10,
		    "depth": 10}).getValue())
		}));

        sinon.stub(Floor, "create").returns(Result.ok({"id":"1234", 
		"buildingId": "123",
		"number": 2,
		"description": "FloorDescription"}));

        let floorRepoInstance = Container.get("FloorRepo");
		const   floorRepo=sinon.stub(floorRepoInstance, "save").returns(new Promise<Floor>((resolve, reject) => {
            resolve(Floor.create({"id":"1234",
            "buildingId": "123",
            "number": 2,
            "description": "FloorDescription",
            "map" : [],initialDirection:1,initialPosition:[1,1]}).getValue())
        }));

        sinon.stub(Elevator, "create").returns(Result.ok({"id":"12345",
        "code": req.body.code,
        "brand": req.body.brand,
        "model": req.body.model,
        "serialNumber": req.body.serialNumber,
        "buildingId": req.body.buildingId,
        "floorsids": req.body.floorsids,
        "posX": req.body.posX,
        "posY": req.body.posY   
    }));

        let elevatorRepoInstance = Container.get("ElevatorRepo");
        const  elevatorRepo=sinon.stub(elevatorRepoInstance, "save").returns(new Promise<Elevator>((resolve, reject) => {
            resolve(Elevator.create(body as IElevatorDTO).getValue())
        }));

        const elevatorService = new ElevatorService(elevatorRepo as IElevatorRepo,  floorRepo as IFloorRepo,buildingRepo as IBuildingRepo);

        //Act
        await elevatorService.listElevators("123");

        //Assert
        sinon.assert.calledOnce(res.json);
        sinon.assert.calledWith(res.json, sinon.match({"id":"12345",
        "code": req.body.code,
        "brand": req.body.brand,
        "model": req.body.model,
        "serialNumber": req.body.serialNumber,
        "buildingId": req.body.buildingId,
        "floorsids": req.body.floorsids,
        "posX": req.body.posX,
        "posY": req.body.posY
    }));
    });

    it('fail listElevators elevatorService unit test using elevatorRepo, buildingRepo, floorRepo, floor, building, elevator stubs', async function () {
    
        
       let body = {};
       let req: Partial<Request> = {};
       req.body = body;
       let res: Partial<Response> = {
           json: sinon.spy()
       };
       let next: Partial<NextFunction> = {};

       sinon.stub(Building, "create").returns(Result.ok({"id":"123", 
       "name": "BuildingName",
       "code":"B1",
       "description": "BuildingDescription",
       "width": 10,
       "depth": 10}));
   
       let buildingRepoInstance = Container.get("BuildingRepo");
       const   buildingRepo=sinon.stub(buildingRepoInstance, "save").returns(new Promise<Building>((resolve, reject) => {
           resolve(Building.create({"id":"123", 
           "name": "BuildingName",
           "code":"B1",
           "description": "BuildingDescription",
           "width": 10,
           "depth": 10}).getValue())
       }));

       sinon.stub(Floor, "create").returns(Result.ok({"id":"1234", 
       "buildingId": "123",
       "number": 2,
       "description": "FloorDescription"}));

       let floorRepoInstance = Container.get("FloorRepo");
       const   floorRepo=sinon.stub(floorRepoInstance, "save").returns(new Promise<Floor>((resolve, reject) => {
           resolve(Floor.create({"id":"1234",
           "buildingId": "123",
           "number": 2,
           "description": "FloorDescription",
           "map" : [],initialDirection:1,initialPosition:[1,1]}).getValue())
       }));


       sinon.stub(Elevator, "create").returns(Result.fail<Elevator>("Must provide a elevator code(max 5 characters)"));

       let elevatorRepoInstance = Container.get("ElevatorRepo");
       const elevatorRepo=sinon.stub(elevatorRepoInstance, "save").returns(new Promise<Elevator>((resolve, reject) => {
           resolve(Elevator.create(body as IElevatorDTO).getValue())
       }));

       const elevatorService = new ElevatorService(elevatorRepo as IElevatorRepo,  floorRepo as IFloorRepo,buildingRepo as IBuildingRepo);

       //Act
       await elevatorService.listElevators("123");

       //Assert
       sinon.assert.calledOnce(res.json);
       sinon.assert.calledWith(res.json, sinon.match({"error": "Must provide a elevator code(max 5 characters)"}));


    
    });

});