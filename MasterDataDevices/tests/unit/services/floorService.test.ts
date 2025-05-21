import 'reflect-metadata';

import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import { Result } from '../../../src/core/logic/Result';
import FloorService from "../../../src/services/floorService";
import IFloorDTO from '../../../src/dto/IFloorDTO';
import { Floor } from '../../../src/domain/floor';
import { Building } from '../../../src/domain/building';
import IFloorRepo from '../../../src/services/IRepos/IFloorRepo';
import IBuildingRepo from '../../../src/services/IRepos/IBuildingRepo';

describe('building service', function () {
	const sandbox = sinon.createSandbox();

	beforeEach(function() {
		Container.reset();
		let floorSchemaInstance = require("../../../src/persistence/schemas/floorSchema").default;
		Container.set("floorSchema", floorSchemaInstance);

		let floorRepoClass = require("../../../src/repos/floorRepo").default;
		let floorRepoInstance = Container.get(floorRepoClass);
		Container.set("FloorRepo", floorRepoInstance);

    let buildingSchemaInstance = require("../../../src/persistence/schemas/buildingSchema").default;
		Container.set("buildingSchema", buildingSchemaInstance);

		let buildingRepoClass = require("../../../src/repos/buildingRepo").default;
		let buildingRepoInstance = Container.get(buildingRepoClass);
		Container.set("BuildingRepo", buildingRepoInstance);


    let buildingCSchemaInstance = require("../../../src/persistence/schemas/buildingConnectionSchema").default;
		Container.set("buildingConnectionSchema", buildingCSchemaInstance);

		let buildingCRepoClass = require("../../../src/repos/buildingConnectionRepo").default;
		let buildingCRepoInstance = Container.get(buildingCRepoClass);
		Container.set("BuildingConnectionRepo", buildingCRepoInstance);

    let elevatorSchemaInstance = require("../../../src/persistence/schemas/elevatorSchema").default;
		Container.set("elevatorSchema", elevatorSchemaInstance);

		let elevatorRepoClass = require("../../../src/repos/elevatorRepo").default;
		let elevatorRepoInstance = Container.get(elevatorRepoClass);
		Container.set("ElevatorRepo", elevatorRepoInstance);

    let roomSchemaInstance = require("../../../src/persistence/schemas/roomSchema").default;
		Container.set("roomSchema", roomSchemaInstance);

		let roomRepoClass = require("../../../src/repos/roomRepo").default;
		let roomRepoInstance = Container.get(roomRepoClass);
		Container.set("RoomRepo", roomRepoInstance);

  });

	afterEach(function() {
		sandbox.restore();
	});

	//UNIT TESTS

    it('createFloor  floorService unit test using floorRepo,buildingRepo,floor,building stubs', async function () {
		// Arrange
        let body = { 
          "buildingId":'123',
          "number":1,
          "description": "Departamento engenharia eletro"};
        let req: Partial<Request> = {};
		req.body = body;
        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};
    
    sinon.stub(Floor, "create").returns(Result.ok({"id":"123", 
		"buildingId": req.body.buildingId,
		"number":req.body.number,
		"description": req.body.description}));

		let floorRepoInstance = Container.get("FloorRepo");
		const   repo=sinon.stub(floorRepoInstance, "save").returns(new Promise<Floor>((resolve, reject) => {
			resolve(Floor.create(body as IFloorDTO).getValue())
		}));

    sinon.stub(Building, "create").returns(Result.ok({"id":"123", 
		"name": "asas",
		"code":"aa",
		"description": req.body.description}));

    let buildingRepoInstance = Container.get("BuildingRepo");
		const   buildingRepo=sinon.stub(buildingRepoInstance, "findByDomainId").returns(new Promise<Building>((resolve, reject) => {
			resolve(Building.create({"id":"123", 
      "name": "asas",
      "code":"aa",
      "description": req.body.description,width:8,depth:0}).getValue())
		}));

		const service = new FloorService(repo as IFloorRepo,buildingRepo as IBuildingRepo,Container.get("BuildingConnectionRepo"),Container.get("ElevatorRepo"),Container.get("RoomRepo"));

		// Act
		await service.createFloor(body as IFloorDTO);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({"id":"123", 
		"buildingId": req.body.buildingId,
		"number":req.body.number,
		"description": req.body.description}));
	});

  it('fail createFloor  floorService unit test using floorRepo,buildingRepo,floor,building stubs', async function () {
		// Arrange
        let body = {};
        let req: Partial<Request> = {};
		req.body = body;
        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};
    
    sinon.stub(Floor, "create").returns(Result.fail({"error":"aaaaaaaaaaa"}));

		let floorRepoInstance = Container.get("FloorRepo");
		const   repo=sinon.stub(floorRepoInstance, "save").returns(new Promise<Floor>((resolve, reject) => {
			resolve(Floor.create(body as IFloorDTO).errorValue())
		}));

    sinon.stub(Building, "create").returns(Result.ok({"id":"123", 
		"name": "asas",
		"code":"aa",
		"description": req.body.description}));

    let buildingRepoInstance = Container.get("BuildingRepo");
		const   buildingRepo=sinon.stub(buildingRepoInstance, "findByDomainId").returns(new Promise<Building>((resolve, reject) => {
			resolve(Building.create({"id":"123", 
      "name": "asas",
      "code":"aa",
      "description": req.body.description,width:8,depth:0}).getValue())
		}));

		const service = new FloorService(repo as IFloorRepo,buildingRepo as IBuildingRepo,Container.get("BuildingConnectionRepo"),Container.get("ElevatorRepo"),Container.get("RoomRepo"));

		// Act
		await service.createFloor(body as IFloorDTO);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({"error":"aaaaaaaaaaa"}));
	});

  it('fail loadMap floorService unit test using floorRepo,buildingRepo,floor,building,buildingConnection,buildingConnectionRepo,elevator,elevatorRepo,roomRepo,room stubs', async function () {
		// Arrange
        let body = {map:[[1,1]]};
        let req: Partial<Request> = {};
		req.body = body;
        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};
    
    sinon.stub(Floor, "create").returns(Result.ok({"id":"123", 
		"buildingId": "aaaa",
		"number":1,
		"description": "aaaaaaaaaaaaaaaa"}));

		let floorRepoInstance = Container.get("FloorRepo");
		const   repo=sinon.stub(floorRepoInstance, "save").returns(new Promise<Floor>((resolve, reject) => {
			resolve(Floor.create(body as IFloorDTO).getValue())
		}));

    sinon.stub(Building, "create").returns(Result.ok({"id":"123", 
		"name": "asas",
		"code":"aa",
		"description": "aaaaaaaaaaaaaaaaaaaaaaa"}));

    let buildingRepoInstance = Container.get("BuildingRepo");
		const   buildingRepo=sinon.stub(buildingRepoInstance, "findByDomainId").returns(new Promise<Building>((resolve, reject) => {
			resolve(Building.create({"id":"123", 
      "name": "asas",
      "code":"aa",
      "description": req.body.description,width:5,depth:1}).getValue())
		}));

		const service = new FloorService(repo as IFloorRepo,buildingRepo as IBuildingRepo,Container.get("BuildingConnectionRepo"),Container.get("ElevatorRepo"),Container.get("RoomRepo"));

		// Act
		await service.createFloor(body as IFloorDTO);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({"error":"Map size does not match with building dimensions!"}));
	});

	it('updateFloor floorService unit test using floorRepo,buildingRepo,floor,building stubs', async function () {
		// Arrange
        let body = { 
			"id": '123',
			"buildingId":'123',
			"number":1,
			"description": "Departamento engenharia info",
			"map": [[]],initialDirection:1,initialPosition:[1,1]
		};
        let req: Partial<Request> = {};
		req.body = body;
        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};
    
    	sinon.stub(Floor, "create").returns(Result.ok({
			"id":"123", 
			"buildingId": req.body.buildingId,
			"number":req.body.number,
			"description": req.body.description,
			"map": req.body.map
		}));


		let floorRepoInstance = Container.get("FloorRepo");
		const   floorRepo=sinon.stub(floorRepoInstance, "findByDomainId").returns(new Promise<Floor>((resolve, reject) => {
			resolve(Floor.create({
				"id":"123", 
				"buildingId": req.body.buildingId,
				"number":req.body.number,
				"description": req.body.description,
				"map": req.body.map,initialDirection:req.body.initialDirection,initialPosition:req.body.initialPosition
			}).getValue())
		}));

			
		const repo=sinon.stub(floorRepoInstance, "save").returns(new Promise<Floor>((resolve, reject) => {
			resolve(Floor.create(body as IFloorDTO).getValue())
		}));

		const service = new FloorService(repo as IFloorRepo,Container.get("BuildingRepo"),Container.get("BuildingConnectionRepo"),Container.get("ElevatorRepo"),Container.get("RoomRepo"));

		// Act
		await service.updateFloor(body as IFloorDTO);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({
			"id":"123", 
			"buildingId": req.body.buildingId,
			"number":req.body.number,
			"description": req.body.description,
			"map": req.body.map
		}));
	});

  it('fail updateFloor floorService unit test using floorRepo,buildingRepo,floor,building stubs', async function () {
		// Arrange
        let body = { 
			"id": '123',
			"buildingId":'123',
			"number":1,
			"description": "Departamento engenharia info",
			"map": [[]],
			initialDirection:1,initialPosition:[1,1]
		};
        let req: Partial<Request> = {};
		req.body = body;
        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};
    
    	sinon.stub(Floor, "create").returns(Result.fail({"error":"test_error"}));


		let floorRepoInstance = Container.get("FloorRepo");
		const   floorRepo=sinon.stub(floorRepoInstance, "findByDomainId").returns(new Promise<Floor>((resolve, reject) => {
			resolve(Floor.create({
				"id":"123", 
				"buildingId": req.body.buildingId,
				"number":req.body.number,
				"description": req.body.description,
				"map": req.body.map,
				initialDirection:req.body.initialDirection,
				initialPosition:req.body.initialPosition
			}).getValue())
		}));

			
		const repo=sinon.stub(floorRepoInstance, "save").returns(new Promise<Floor>((resolve, reject) => {
			resolve(Floor.create(body as IFloorDTO).errorValue())
		}));
		

		
		const service = new FloorService(repo as IFloorRepo,Container.get("BuildingRepo"),Container.get("BuildingConnectionRepo"),Container.get("ElevatorRepo"),Container.get("RoomRepo"));

		// Act
		await service.updateFloor(body as IFloorDTO);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({"error":"test_error"}));
	});

	it('listFloors floorService unit test using floorRepo and Floor stub', async function () {
		// Arrange
      
        let req: Partial<Request> = {};
        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};
    
        sinon.stub(Floor, "create").returns(Result.ok({
            "id":"123", 
			"buildingId": req.body.buildingId,
  			"number": req.body.number,
  			"description": req.body.description,
  			"map": req.body.map,initialDirection:req.body.initialDirection,initialPosition:req.body.initialPosition
        }));

		let floorRepoInstance = Container.get("FloorRepo");
		const   repo=sinon.stub(floorRepoInstance, "findAll").returns(new Promise<Floor>((resolve, reject) => {
			resolve(Floor.create({
                "id":"123", 
				"buildingId": req.body.buildingId,
  				"number": req.body.number,
  				"description": req.body.description,
  				"map": req.body.map,initialDirection:req.body.initialDirection,initialPosition:req.body.initialPosition
            }).getValue())
		}));

		const service = new FloorService(repo as IFloorRepo,Container.get("BuildingRepo"),Container.get("BuildingConnectionRepo"),Container.get("ElevatorRepo"),Container.get("RoomRepo"));

		// Act
		await service.listFloors(req.body.buildingId);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({ 
            "id":"123", 
			"buildingId": req.body.buildingId,
  			"number": req.body.number,
  			"description": req.body.description,
  			"map": req.body.map,initialDirection:req.body.initialDirection,initialPosition:req.body.initialPosition
        }));
	});

  it('fail listFloors floorService unit test using floorRepo and Floor stub', async function () {
		// Arrange
      
        let req: Partial<Request> = {};
        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};
    
        sinon.stub(Floor, "create").returns(Result.fail({"error":"test_error"}));

		let floorRepoInstance = Container.get("FloorRepo");
		const   repo=sinon.stub(floorRepoInstance, "findAll").returns(new Promise<Floor>((resolve, reject) => {
			resolve(Floor.create({
                "id":"123", 
			    "buildingId": req.body.buildingId,
  				"number": req.body.number,
  				"description": req.body.description,
  				"map": req.body.map,initialDirection:req.body.initialDirection,initialPosition:req.body.initialPosition
            }).errorValue())
		}));

		const service = new FloorService(repo as IFloorRepo,Container.get("BuildingRepo"),Container.get("BuildingConnectionRepo"),Container.get("ElevatorRepo"),Container.get("RoomRepo"));

		// Act
		await service.listFloors(req.body.buildingId);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({"error":"test_error"}));
	});

	it('listFloorsWithBuildingConnections floorService unit test using floorRepo and Floor stub', async function () {
		// Arrange
      
        let req: Partial<Request> = {};
        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};
    
        sinon.stub(Floor, "create").returns(Result.ok({
            "id":"123", 
			"buildingId": req.body.buildingId,
  			"number": req.body.number,
  			"description": req.body.description,
  			"map": req.body.map,initialDirection:req.body.initialDirection,initialPosition:req.body.initialPosition
        }));

		let floorRepoInstance = Container.get("FloorRepo");
		const   repo=sinon.stub(floorRepoInstance, "findAll").returns(new Promise<Floor>((resolve, reject) => {
			resolve(Floor.create({
                "id":"123", 
				"buildingId": req.body.buildingId,
  				"number": req.body.number,
  				"description": req.body.description,
  				"map": req.body.map,initialDirection:req.body.initialDirection,initialPosition:req.body.initialPosition
            }).getValue())
		}));

		const service = new FloorService(repo as IFloorRepo,Container.get("BuildingRepo"),Container.get("BuildingConnectionRepo"),Container.get("ElevatorRepo"),Container.get("RoomRepo"));

		// Act
		await service.listFloorsWithBuildingConnections("123");

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({ 
            "id":"123", 
			"buildingId": req.body.buildingId,
  			"number": req.body.number,
  			"description": req.body.description,
  			"map": req.body.map,initialDirection:req.body.initialDirection,initialPosition:req.body.initialPosition
        }));
	});

  it('fail listFloorsWithBuildingConnections floorService unit test using floorRepo and Floor stub', async function () {
		// Arrange
      
        let req: Partial<Request> = {};
        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};
    
        sinon.stub(Floor, "create").returns(Result.fail({"error":"assasss"}));

		let floorRepoInstance = Container.get("FloorRepo");
		const   repo=sinon.stub(floorRepoInstance, "findAll").returns(new Promise<Floor>((resolve, reject) => {
			resolve(Floor.create({
                "id":"123", 
			    "buildingId": req.body.buildingId,
  				"number": req.body.number,
  				"description": req.body.description,
  				"map": req.body.map,initialDirection:req.body.initialDirection,initialPosition:req.body.initialPosition
            }).errorValue())
		}));

		const service = new FloorService(repo as IFloorRepo,Container.get("BuildingRepo"),Container.get("BuildingConnectionRepo"),Container.get("ElevatorRepo"),Container.get("RoomRepo"));

		// Act
		await service.listFloorsWithBuildingConnections("123");

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({"error":"assasss"}));
	});

  //INTEGRATION  TESTS


  it('createFloor floorService + floor unit test using floorRepo,buildingRepo,building stubs', async function () {
		// Arrange
        let body = { 
          "buildingId":'123',
          "number":1,
          "description": "Departamento engenharia eletro"};
        let req: Partial<Request> = {};
		req.body = body;
        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		let floorRepoInstance = Container.get("FloorRepo");
		const   repo=sinon.stub(floorRepoInstance, "save").returns(new Promise<Floor>((resolve, reject) => {
			resolve(Floor.create(body as IFloorDTO).getValue())
		}));

    sinon.stub(Building, "create").returns(Result.ok({"id":"123", 
		"name": "asas",
		"code":"aa",
		"description": req.body.description}));

    let buildingRepoInstance = Container.get("BuildingRepo");
		const   buildingRepo=sinon.stub(buildingRepoInstance, "findByDomainId").returns(new Promise<Building>((resolve, reject) => {
			resolve(Building.create({"id":"123", 
      "name": "asas",
      "code":"aa",
      "description": req.body.description,width:8,depth:0}).getValue())
		}));

		const service = new FloorService(repo as IFloorRepo,buildingRepo as IBuildingRepo,Container.get("BuildingConnectionRepo"),Container.get("ElevatorRepo"),Container.get("RoomRepo"));

		// Act
		await service.createFloor(body as IFloorDTO);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({"id":"123", 
		"buildingId": req.body.buildingId,
		"number":req.body.number,
		"description": req.body.description}));
	});

  it('fail createFloor  floorService + floor unit test using floorRepo,buildingRepo,building stubs', async function () {
		// Arrange
        let body = {};
        let req: Partial<Request> = {};
		req.body = body;
        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		let floorRepoInstance = Container.get("FloorRepo");
		const   repo=sinon.stub(floorRepoInstance, "save").returns(new Promise<Floor>((resolve, reject) => {
			resolve(Floor.create(body as IFloorDTO).errorValue())
		}));

    sinon.stub(Building, "create").returns(Result.ok({"id":"123", 
		"name": "asas",
		"code":"aa",
		"description": req.body.description}));

    let buildingRepoInstance = Container.get("BuildingRepo");
		const   buildingRepo=sinon.stub(buildingRepoInstance, "findByDomainId").returns(new Promise<Building>((resolve, reject) => {
			resolve(Building.create({"id":"123", 
      "name": "asas",
      "code":"aa",
      "description": req.body.description,width:8,depth:0}).getValue())
		}));

		const service = new FloorService(repo as IFloorRepo,buildingRepo as IBuildingRepo,Container.get("BuildingConnectionRepo"),Container.get("ElevatorRepo"),Container.get("RoomRepo"));

		// Act
		await service.createFloor(body as IFloorDTO);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({"error":"Must provide a floor number"}));
	});

});


