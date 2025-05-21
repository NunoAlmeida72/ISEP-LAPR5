
import 'reflect-metadata';

import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import { Result } from '../../../src/core/logic/Result';
import IFloorService from "../../../src/services/IServices/IFloorService";
import FloorController from "../../../src/controllers/floorController";
import IFloorDTO from '../../../src/dto/IFloorDTO';
import { Floor } from '../../../src/domain/floor';

describe('Floor controller', function () {
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


		let floorServiceClass = require("../../../src/services/floorService").default;
		let floorServiceInstance = Container.get(floorServiceClass);
		Container.set("FloorService", floorServiceInstance);
    });

	afterEach(function() {
		sandbox.restore();
	});

	//UNIT TESTS

    it('createFloor FloorController unit test using FloorService stub', async function () {
		// Arrange
        let body = { "buildingId":'123',
        "number":1,
        "description": "Departamento engenharia eletro",
        "map":[[]],
				"initialPosition":1,
				"initialDirection":[1,1],};
        let req: Partial<Request> = {};
		req.body = body;
        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		let FloorServiceInstance = Container.get("FloorService");
		const service=sinon.stub(FloorServiceInstance, "createFloor").returns( Result.ok<IFloorDTO>( {
      "id":"123", 
			"buildingId": req.body.buildingId,
			"number":req.body.number,
			"description": req.body.description,
			"map":req.body.map,"initialPosition":req.body.initialPosition,
			"initialDirection":req.body.initialDirection,
		} ));

		const ctrl = new FloorController(service as IFloorService);

		// Act
		await ctrl.createFloor(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({ 
      "id":"123", 
			"buildingId": req.body.buildingId,
			"number":req.body.number,
			"description": req.body.description,
			"map": req.body.map,"initialPosition":req.body.initialPosition,
			"initialDirection":req.body.initialDirection,}));
	});

	it('fail createFloor FloorController unit test using FloorService stub', async function () {
		// Arrange
        let body = { "buildingId":'123',
        "number":1,
        "description": "Departamento engenharia eletro",
        "map":[[]]};
        let req: Partial<Request> = {};
		req.body = body;
        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		let FloorServiceInstance = Container.get("FloorService");
		const service=sinon.stub(FloorServiceInstance, "createFloor").returns( Result.fail<IFloorDTO>( {
      "error":"aaaaaaaaaaaaaa"
		} ));

		const ctrl = new FloorController(service as IFloorService);

		// Act
		await ctrl.createFloor(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({"error":"aaaaaaaaaaaaaa"}));
	});

	it('loadMap FloorController unit test using FloorService stub', async function () {
		// Arrange
        let body = { "id":'123',
        "map":[[]],"initialPosition":1,
				"initialDirection":[1,1]};
        let req: Partial<Request> = {};
		req.body = body;
        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		let FloorServiceInstance = Container.get("FloorService");
		const service=sinon.stub(FloorServiceInstance, "createFloor").returns( Result.ok<IFloorDTO>( {
      "id":req.body.id, 
			"buildingId": "122",
			"number":1,
			"description": "desc",
			"map":req.body.map,
			"initialPosition":req.body.initialPosition,
			"initialDirection":req.body.initialDirection,
		} ));

		const ctrl = new FloorController(service as IFloorService);

		// Act
		await ctrl.loadMap(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({ 
      "id":req.body.id, 
			"buildingId": "122",
			"number":1,
			"description": "desc",
			"map":req.body.map,"initialPosition":req.body.initialPosition,
			"initialDirection":req.body.initialDirection,}));
	});

	it('fail loadMap FloorController unit test using FloorService stub', async function () {
		// Arrange
        let body = {};
        let req: Partial<Request> = {};
		req.body = body;
        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		let FloorServiceInstance = Container.get("FloorService");
		const service=sinon.stub(FloorServiceInstance, "createFloor").returns( Result.fail<IFloorDTO>( {"error":"aaaaaaaaaaa"
		} ));

		const ctrl = new FloorController(service as IFloorService);

		// Act
		await ctrl.loadMap(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({ "error":"aaaaaaaaaaa"}));
	});

	it('updateFloor floorController unit test using floorService stub', async function () {
		// Arrange
        let body = {
			"id":'123', 
			"buildingId":'123',
        	"number":1,
        	"description": "Departamento engenharia info",
        	"map":[[]],
					"initialPosition":0,
			"initialDirection":[1,1],
		};
        let req: Partial<Request> = {};
		req.body = body;
        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		let FloorServiceInstance = Container.get("FloorService");
		const service=sinon.stub(FloorServiceInstance, "updateFloor").returns( Result.ok<IFloorDTO>( {
      		"id":"123", 
			"buildingId": req.body.buildingId,
			"number":req.body.number,
			"description": req.body.description,
			"map":req.body.map,"initialPosition":req.body.initialPosition,
			"initialDirection":req.body.initialDirection,
		} ));

		const ctrl = new FloorController(service as IFloorService);

		// Act
		await ctrl.updateFloor(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({ 
      		"id":"123", 
			"buildingId": req.body.buildingId,
			"number":req.body.number,
			"description": req.body.description,
			"map": req.body.map,"initialPosition":req.body.initialPosition,
			"initialDirection":req.body.initialDirection,
		}));
	});

	it('fail updateFloor floorController unit test using floorService stub', async function () {
		// Arrange
        let body = { 
			"id":'123',
			"buildingId":'123',
			"number":1,
			"description": "Departamento engenharia info",
			"map":[[]],"initialPosition":1,
			"initialDirection":[1,1],
		};
        let req: Partial<Request> = {};
		req.body = body;
        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		let FloorServiceInstance = Container.get("FloorService");
		const service=sinon.stub(FloorServiceInstance, "updateFloor").returns( Result.fail<IFloorDTO>( {
      "error":"test_error"
		} ));

		const ctrl = new FloorController(service as IFloorService);

		// Act
		await ctrl.updateFloor(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({"error":"test_error"}));
	});

	it('listFloor floorController unit test using floorService stub', async function () {
		// Arrange
        let req: Partial<Request> = {};
        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		let FloorServiceInstance = Container.get("FloorService");
		const service=sinon.stub(FloorServiceInstance, "listFloors").returns( Result.ok<IFloorDTO>( {
      		"id":"123", 
			"buildingId": req.body.buildingId,
			"number":req.body.number,
			"description": req.body.description,
			"map":req.body.map,"initialPosition":req.body.initialPosition,
			"initialDirection":req.body.initialDirection,
		} ));

		const ctrl = new FloorController(service as IFloorService);

		// Act
		await ctrl.listFloors(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({ 
      		"id":"123", 
			"buildingId": req.body.buildingId,
			"number":req.body.number,
			"description": req.body.description,
			"map": req.body.map,"initialPosition":req.body.initialPosition,
			"initialDirection":req.body.initialDirection,
		}));
	});

	it('fail listFloor floorController unit test using floorService stub', async function () {
		// Arrange
        let req: Partial<Request> = {};
        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		let FloorServiceInstance = Container.get("FloorService");
		const service=sinon.stub(FloorServiceInstance, "listFloors").returns( Result.fail<IFloorDTO>( {
      	"error":"test_error"} ));

		const ctrl = new FloorController(service as IFloorService);

		// Act
		await ctrl.listFloors(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({"error":"test_error"}));
	});


	it('listFloorsWithBuildingConnections floorController unit test using floorService stub', async function () {
		// Arrange
        let req: Partial<Request> = {};
        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		let floorServiceInstance = Container.get("FloorService");
		const service=sinon.stub(floorServiceInstance, "listFloorsWithBuildingConnections").returns( Result.ok<IFloorDTO>( {
			"id":"123", 
			"buildingId": "123",
  			"number": 1,
  			"description": "abcd",
  			"map": [[1, 2, 3]],"initialPosition":[1 ,1],
				"initialDirection":1,
		} ));

		const ctrl = new FloorController(service as IFloorService);

		// Act
		await ctrl.listFloorsWithBuildingConnections(<Request>req, <Response>res, <NextFunction>next);
		
		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({ 
			"id":"123", 
			"buildingId": req.body.buildingId,
  			"number": req.body.number,
  			"description": req.body.description,
  			"map": req.body.map,"initialPosition":req.body.initialPosition,
				"initialDirection":req.body.initialDirection,
		}));
	});

	it('fail  listFloorsWithBuildingConnections floorController unit test using floorService stub', async function () {
		// Arrange
        let req: Partial<Request> = {};
        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		let floorServiceInstance = Container.get("FloorService");
		const service=sinon.stub(floorServiceInstance, "listFloorsWithBuildingConnections").returns( Result.fail<IFloorDTO>( {
      		"error":"aaaaaaaaaaaaaaaaaa"
		} ));

		const ctrl = new FloorController(service as IFloorService);

		// Act
		await ctrl.listFloorsWithBuildingConnections(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({"error":"aaaaaaaaaaaaaaaaaa"}));
	});


	//INTEGRATION TESTS


	it('createFloor FloorController + FloorService integration test using FloorRepoistory and Floor stubs', async function () {	
		// Arrange	
        let body = { "buildingId":'123',
        "number":1,
        "description": "Departamento engenharia eletro",
        "map":[[]],"initialPosition":[1,1],
				"initialDirection":12};
        let req: Partial<Request> = {};
		req.body = body;

        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		sinon.stub(Floor, "create").returns(Result.ok({"id":"123", 
    "buildingId": req.body.buildingId,
    "number":req.body.number,
    "description": req.body.description,
    "map": req.body.map}));

		let FloorRepoInstance = Container.get("FloorRepo");
		sinon.stub(FloorRepoInstance, "save").returns(new Promise<Floor>((resolve, reject) => {
			resolve(Floor.create({"id":"123", 
			"buildingId": req.body.buildingId,
			"number":req.body.number,
			"description": req.body.description,
			"map": req.body.map,"initialPosition":req.body.initialPosition,
			"initialDirection":req.body.initialDirection,}).getValue())
		}));

		let FloorServiceInstance = Container.get("FloorService");

		const ctrl = new FloorController(FloorServiceInstance as IFloorService);

		// Act
		await ctrl.createFloor(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({ "id":"123", 
    "buildingId": req.body.buildingId,
    "number":req.body.number,
    "description": req.body.description,
    "map": req.body.map,"initialPosition":req.body.initialPosition,
		"initialDirection":req.body.initialDirection,}));
	});

	it('fail createFloor FloorController + FloorService integration test using FloorRepoistory and Floor stubs', async function () {	
		// Arrange	
        let body = {};
        let req: Partial<Request> = {};
		req.body = body;

        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		sinon.stub(Floor, "create").returns(Result.fail({"error":"aaaaaaaaaaaaaaaaaaaaa"}));

		let FloorRepoInstance = Container.get("FloorRepo");
		sinon.stub(FloorRepoInstance, "save").returns(new Promise<Floor>((resolve, reject) => {
			resolve(Floor.create(body  as IFloorDTO).errorValue())
		}));

		let FloorServiceInstance = Container.get("FloorService");

		const ctrl = new FloorController(FloorServiceInstance as IFloorService);

		// Act
		await ctrl.createFloor(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({"error":"aaaaaaaaaaaaaaaaaaaaa"}));
	});

	it('updateFloor FloorController + FloorService integration test using FloorRepository and Floor stubs', async function () {	
		// Arrange	
        let body = { 
			"id":'123',
			"buildingId":'123',
			"number":1,
			"description": "Departamento engenharia info",
			"map":[[]],"initialPosition":[1,1],
			"initialDirection":1,
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
			"map": req.body.map,"initialPosition":req.body.initialPosition,
			"initialDirection":req.body.initialDirection,
		}));

		
		let floorRepoInstance = Container.get("FloorRepo");
		sinon.stub(floorRepoInstance, "findByDomainId").returns(new Promise<Floor>((resolve, reject) => {
			resolve(Floor.create({
                "id": "123",
                "buildingId": req.body.buildingId,
                "number":req.body.number,
				"description": req.body.description,
				"map": req.body.map,"initialPosition":req.body.initialPosition,
				"initialDirection":req.body.initialDirection,
            }).getValue())
		}));

		
		sinon.stub(floorRepoInstance, "save").returns(new Promise<Floor>((resolve, reject) => {
			resolve(Floor.create({
				"id":"123", 
				"buildingId": req.body.buildingId,
				"number":req.body.number,
				"description": req.body.description,
				"map": req.body.map,"initialPosition":req.body.initialPosition,
				"initialDirection":req.body.initialDirection,
			}).getValue())
		}));

		let FloorServiceInstance = Container.get("FloorService");

		const ctrl = new FloorController(FloorServiceInstance as IFloorService);

		// Act
		await ctrl.updateFloor(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({ 
			"id":"123", 
			"buildingId": req.body.buildingId,
			"number":req.body.number,
			"description": req.body.description,
			"map": req.body.map,"initialPosition":req.body.initialPosition,
			"initialDirection":req.body.initialDirection,
		}));
	});

	it('fail updateFloor FloorController + FloorService integration test using FloorRepository and Floor stubs', async function () {	
		// Arrange	
        let body = {};
        let req: Partial<Request> = {};
		req.body = body;

        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		sinon.stub(Floor, "create").returns(Result.fail({"error":"test_error"}));
		
		
		let floorRepoInstance = Container.get("FloorRepo");
		sinon.stub(floorRepoInstance, "findByDomainId").returns(new Promise<Floor>((resolve, reject) => {
			resolve(Floor.create(body as IFloorDTO).errorValue())
		}));

		
		sinon.stub(floorRepoInstance, "save").returns(new Promise<Floor>((resolve, reject) => {
			resolve(Floor.create(body  as IFloorDTO).errorValue())
		}));

		let FloorServiceInstance = Container.get("FloorService");

		const ctrl = new FloorController(FloorServiceInstance as IFloorService);

		// Act
		await ctrl.updateFloor(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({"error":"test_error"}));
	});

	it('listFloor FloorController + FloorService integration test using FloorRepository and Floor stubs', async function () {	
		// Arrange	
        let req: Partial<Request> = {};
        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		sinon.stub(Floor, "create").returns(Result.ok({
			"id":"123", 
			"buildingId": req.body.buildingId,
			"number":req.body.number,
			"description": req.body.description,
			"map": req.body.map,
			"initialPosition":req.body.initialPosition,
			"initialDirection":req.body.initialDirection,
		}));

		let FloorRepoInstance = Container.get("FloorRepo");
		
		sinon.stub(FloorRepoInstance, "findAll").returns(new Promise<Floor>((resolve, reject) => {
			resolve(Floor.create({
                "id":"123", 
				"buildingId": req.body.buildingId,
				"number":req.body.number,
				"description": req.body.description,
				"map": req.body.map,
				"initialPosition":req.body.initialPosition,
				"initialDirection":req.body.initialDirection,
			}).getValue())
		}));
		

		let FloorServiceInstance = Container.get("FloorService");

		const ctrl = new FloorController(FloorServiceInstance as IFloorService);

		// Act
		await ctrl.createFloor(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({ 
			"id":"123", 
			"buildingId": req.body.buildingId,
			"number":req.body.number,
			"description": req.body.description,
			"map": req.body.map,"initialPosition":req.body.initialPosition,
			"initialDirection":req.body.initialDirection,
		}));
	});

	it('listFloorsWithBuildingConnections floorController + floorService integration test using floorRepository and floor stubs', async function () {
		// Arrange	
		let req: Partial<Request> = {};
		let res: Partial<Response> = {
			json: sinon.spy()
		};
		let next: Partial<NextFunction> = () => {};

		sinon.stub(Floor, "create").returns(Result.ok({
			"id":"123", 	
			"buildingId": "123",
  			"number": 1,
  			"description": "abcd",
  			"map": [[1, 2, 3]],"initialPosition":[10,10],
				"initialDirection":10,
		}));

		let floorRepoInstance = Container.get("FloorRepo");
		sinon.stub(floorRepoInstance, "findAll").returns(new Promise<Floor>((resolve, reject) => {
			resolve(Floor.create({
				"id":"123", 
				"buildingId": "123",
  				"number": 1,
  				"description": "abcd",
  				"map": [[1, 2, 3]],"initialPosition":[10,10],
				"initialDirection":10,
			}).getValue())
		}));

		let floorServiceInstance = Container.get("FloorService");

		const ctrl = new FloorController(floorServiceInstance as IFloorService);

		// Act
		await ctrl.listFloorsWithBuildingConnections(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({
			"id":"123", 
			"buildingId": "123",
  			"number": 1,
  			"description": "abcd",
  			"map": [[1, 2, 3]],
				"initialPosition":[10,10],
				"initialDirection":10,
		}));
	});

});


