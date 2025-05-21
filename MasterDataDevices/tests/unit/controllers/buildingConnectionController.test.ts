import 'reflect-metadata';

import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import { Result } from '../../../src/core/logic/Result';
import IBuildingConnectionService from "../../../src/services/IServices/IBuildingConnectionService";
import BuildingConnectionController from "../../../src/controllers/buildingConnectionController";
import IBuildingConnectionDTO from '../../../src/dto/IBuildingConnectionDTO';
import { BuildingConnection } from '../../../src/domain/buildingConnection';

describe('buildingConnection controller', function () {
	const sandbox = sinon.createSandbox();

	beforeEach(function() {
		Container.reset();
		let buildingConnectionSchemaInstance = require("../../../src/persistence/schemas/buildingConnectionSchema").default;
		Container.set("buildingConnectionSchema", buildingConnectionSchemaInstance);

		let buildingConnectionRepoClass = require("../../../src/repos/buildingConnectionRepo").default;
		let buildingConnectionRepoInstance = Container.get(buildingConnectionRepoClass);
		Container.set("BuildingConnectionRepo", buildingConnectionRepoInstance);

		let floorSchemaInstance = require("../../../src/persistence/schemas/floorSchema").default;
		Container.set("floorSchema", floorSchemaInstance);

		let floorRepoClass = require("../../../src/repos/floorRepo").default;
		let floorRepoInstance = Container.get(floorRepoClass);
		Container.set("FloorRepo", floorRepoInstance);

		let buildingConnectionServiceClass = require("../../../src/services/buildingConnectionService").default;
		let buildingConnectionServiceInstance = Container.get(buildingConnectionServiceClass);
		Container.set("BuildingConnectionService", buildingConnectionServiceInstance);
    });

	afterEach(function() {
		sandbox.restore();
	});

	//UNIT TESTS

    it('createBuildingConnection  buildingConnectionController unit test using buildingConnectionService stub', async function () {
		// Arrange
        let body = { 
			"floor1Id":'4321',
        	"floor2Id":"1234",
        	"posX": 8,
        	"posY": 7
		};
        let req: Partial<Request> = {};
		req.body = body;
        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		let buildingConnectionServiceInstance = Container.get("BuildingConnectionService");
		const service=sinon.stub(buildingConnectionServiceInstance, "createBuildingConnection").returns( Result.ok<IBuildingConnectionDTO>( {
      		"id":"123", 
			"floor1Id": req.body.floor1Id,
			"floor2Id": req.body.floor2Id,
			"posX": req.body.posX,
			"posY": req.body.posY
		} ));

		const ctrl = new BuildingConnectionController(service as IBuildingConnectionService);

		// Act
		await ctrl.createBuildingConnection(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({ 
			"id":"123", 
			"floor1Id": req.body.floor1Id,
			"floor2Id": req.body.floor2Id,
			"posX": req.body.posX,
			"posY": req.body.posY
		}));
	});

	it('createBuildingConnection buildingConnectionController unit test using buildingConnectionService stub fail', async function () {
		// Arrange
        let body = { 
			"floor1Id":'4321',
        	"floor2Id":"1234",
        	"posX": 8,
        	"posY": 7
		};
        let req: Partial<Request> = {};
		req.body = body;
        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		let buildingConnectionServiceInstance = Container.get("BuildingConnectionService");
		const service=sinon.stub(buildingConnectionServiceInstance, "createBuildingConnection").returns( Result.fail<IBuildingConnectionDTO>({
			"error":"aaaaaaaaaaaaaaaaaa"
		}));

		const ctrl = new BuildingConnectionController(service as IBuildingConnectionService);

		// Act
		await ctrl.createBuildingConnection(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({"error":"aaaaaaaaaaaaaaaaaa"}));
	});

	it('updateBuildingConnection  buildingConnectionController unit test using buildingConnectionService stub', async function () {
		// Arrange
        let body = { 
			"floor1Id":'4321',
			"floor2Id":"1234",
			"posX": 8,
			"posY": 7
		};
        let req: Partial<Request> = {};
		req.body = body;
        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		let buildingConnectionServiceInstance = Container.get("BuildingConnectionService");
		const service=sinon.stub(buildingConnectionServiceInstance, "updateBuildingConnection").returns( Result.ok<IBuildingConnectionDTO>( {
			"id":"123", 
			"floor1Id": req.body.floor1Id,
			"floor2Id": req.body.floor2Id,
			"posX": req.body.posX,
			"posY": req.body.posY
		} ));

		const ctrl = new BuildingConnectionController(service as IBuildingConnectionService);

		// Act
		await ctrl.updateBuildingConnection(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({ 
			"id":"123", 
			"floor1Id": req.body.floor1Id,
			"floor2Id": req.body.floor2Id,
			"posX": req.body.posX,
			"posY": req.body.posY
		}));
	});

	it('fail updateBuildingConnection  buildingConnectionController unit test using buildingConnectionService stub', async function () {
		// Arrange
        let body = { 
			"floor1Id":'4321',
			"floor2Id":"1234",
			"posX": 8,
			"posY": 7
		};
        let req: Partial<Request> = {};
		req.body = body;
        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		let buildingConnectionServiceInstance = Container.get("BuildingConnectionService");
		const service=sinon.stub(buildingConnectionServiceInstance, "updateBuildingConnection").returns( Result.fail<IBuildingConnectionDTO>( {
      		"error":"aaaaaaaaaaaaaaaaaa"
		} ));

		const ctrl = new BuildingConnectionController(service as IBuildingConnectionService);

		// Act
		await ctrl.updateBuildingConnection(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({"error":"aaaaaaaaaaaaaaaaaa"}));
	});



	it('listBuildingConnections buildingConnectionController unit test using buildingConnectionService stub', async function () {
		// Arrange
        let req: Partial<Request> = {};
        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		let buildingConnectionServiceInstance = Container.get("BuildingConnectionService");
		const service=sinon.stub(buildingConnectionServiceInstance, "listBuildingConnections").returns( Result.ok<IBuildingConnectionDTO>( {
			"id":"123", 
			"floor1Id": req.body.floor1Id,
			"floor2Id": req.body.floor2Id,
			"posX": req.body.posX,
			"posY": req.body.posY
		} ));

		const ctrl = new BuildingConnectionController(service as IBuildingConnectionService);

		// Act
		await ctrl.listBuildingConnections(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({
			"id":"123", 
			"floor1Id": req.body.floor1Id,
			"floor2Id": req.body.floor2Id,
			"posX": req.body.posX,
			"posY": req.body.posY
		}));
	});

	it('fail  listBuildingConnections buildingConnectionController unit test using buildingConnectionService stub', async function () {
		// Arrange
        let req: Partial<Request> = {};
        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		let buildingConnectionServiceInstance = Container.get("BuildingConnectionService");
		const service=sinon.stub(buildingConnectionServiceInstance, "listBuildingConnections").returns( Result.fail<IBuildingConnectionDTO>( {
      		"error":"aaaaaaaaaaaaaaaaaa"
		} ));

		const ctrl = new BuildingConnectionController(service as IBuildingConnectionService);

		// Act
		await ctrl.listBuildingConnections(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({"error":"aaaaaaaaaaaaaaaaaa"}));
	});







	//INTEGRATION  TESTS

    it('createBuildingConnection buildingConnectionController + buildingConnectionService integration test using buildingConnectionRepository and buildingConnection stubs', async function () {	
		// Arrange	
        let body = {
			"floor1Id":'4321',
			"floor2Id":"1234",
			"posX": 8,
			"posY": 7
		};
        let req: Partial<Request> = {};
		req.body = body;

        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		sinon.stub(BuildingConnection, "create").returns(Result.ok({
			"id":"123", 
			"floor1Id": req.body.floor1Id,
			"floor2Id": req.body.floor2Id,
			"posX": req.body.posX,
			"posY": req.body.posY
		}));

		let buildingConnectionRepoInstance = Container.get("BuildingConnectionRepo");
		sinon.stub(buildingConnectionRepoInstance, "save").returns(new Promise<BuildingConnection>((resolve, reject) => {
			resolve(BuildingConnection.create({
				"id":"123", 
				"floor1Id": req.body.floor1Id,
				"floor2Id": req.body.floor2Id,
				"posX": req.body.posX,
				"posY": req.body.posY
			}).getValue())
		}));

		let buildingConnectionServiceInstance = Container.get("BuildingConnectionService");

		const ctrl = new BuildingConnectionController(buildingConnectionServiceInstance as IBuildingConnectionService);

		// Act
		await ctrl.createBuildingConnection(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({
			"id":"123", 
			"floor1Id": req.body.floor1Id,
			"floor2Id": req.body.floor2Id,
			"posX": req.body.posX,
			"posY": req.body.posY
		}));
	});

	it('fail createBuildingConnection buildingConnectionController + buildingConnectionService integration test using buildingConnectionRepository and buildingConnection stubs', async function () {	
		// Arrange	
        let body = {
			"floor1Id":'4321',
			"floor2Id":"1234",
			"posX": 8,
			"posY": 7
		};
        let req: Partial<Request> = {};
		req.body = body;

        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		sinon.stub(BuildingConnection, "create").returns(Result.fail({"error":"aaaaaaaaaaaaaaaaaa"}));

		let buildingConnectionRepoInstance = Container.get("BuildingConnectionRepo");
		sinon.stub(buildingConnectionRepoInstance, "save").returns(new Promise<BuildingConnection>((resolve, reject) => {
			resolve(BuildingConnection.create(body as IBuildingConnectionDTO).errorValue())
		}));

		let buildingConnectionServiceInstance = Container.get("BuildingConnectionService");

		const ctrl = new BuildingConnectionController(buildingConnectionServiceInstance as IBuildingConnectionService);

		// Act
		await ctrl.createBuildingConnection(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({"error":"aaaaaaaaaaaaaaaaaa"}));
	});

	it('listBuildingConnections buildingConnectionController + buildingConnectionService integration test using buildingConnectionRepository and buildingConnection stubs', async function () {	
		// Arrange	
        let req: Partial<Request> = {};
        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		sinon.stub(BuildingConnection, "create").returns(Result.ok({
			"id":"123",
			"floor1Id":'4321',
			"floor2Id":"1234",
			"posX": 8,
			"posY": 7
		}));

		let buildingConnectionRepoInstance = Container.get("BuildingConnectionRepo");
		sinon.stub(buildingConnectionRepoInstance, "findAll").returns(new Promise<BuildingConnection>((resolve, reject) => {
			resolve(BuildingConnection.create({
				"id":"123", 
				"floor1Id":'4321',
				"floor2Id":"1234",
				"posX": 8,
				"posY": 7
			}).getValue())
		}));

		let buildingConnectionServiceInstance = Container.get("BuildingConnectionService");

		const ctrl = new BuildingConnectionController(buildingConnectionServiceInstance as IBuildingConnectionService);

		// Act
		await ctrl.listBuildingConnections(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({
			"id":"123", 
			"floor1Id":'4321',
			"floor2Id":"1234",
			"posX": 8,
			"posY": 7
		}));
	});

	it('updateBuildingConnection buildingConnectionController + buildingConnectionService integration test using buildingConnectionRepository and buildingConnection stubs', async function () {	
		// Arrange
		let body={
			"id":"123",
			"floor1Id":'4321',
			"floor2Id":"1234",
			"posX": 8,
			"posY": 7
		}
        let req: Partial<Request> = {};
				req.body=body;

        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		sinon.stub(BuildingConnection, "create").returns(Result.ok({
			"id":"123", 
			"floor1Id": req.body.floor1Id,
			"floor2Id": req.body.floor2Id,
			"posX": req.body.posX,
			"posY": req.body.posY
		}));

		let buildingConnectionRepoInstance = Container.get("BuildingConnectionRepo");
		sinon.stub(buildingConnectionRepoInstance, "findByDomainId").returns(new Promise<BuildingConnection>((resolve, reject) => {
			resolve(BuildingConnection.create({
				"id":"123", 
				"floor1Id": req.body.floor1Id,
				"floor2Id": req.body.floor2Id,
				"posX": req.body.posX,
				"posY": req.body.posY
			}).getValue())
		}));

		sinon.stub(buildingConnectionRepoInstance, "save").returns(new Promise<BuildingConnection>((resolve, reject) => {
			resolve(BuildingConnection.create({
				"id":"123", 
				"floor1Id": req.body.floor1Id,
				"floor2Id": req.body.floor2Id,
				"posX": req.body.posX,
				"posY": req.body.posY
			}).getValue())
		}));

		let buildingConnectionServiceInstance = Container.get("BuildingConnectionService");

		const ctrl = new BuildingConnectionController(buildingConnectionServiceInstance as IBuildingConnectionService);

		// Act
		await ctrl.updateBuildingConnection(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({"id":"123","floor1Id": req.body.floor1Id,"floor2Id": req.body.floor2Id,"posX": req.body.posX,"posY": req.body.posY}));
	});

	it('fail updateBuildingConnection buildingConnectionController + buildingConnectionService integration test using buildingConnectionRepository and buildingConnection stubs', async function () {	
		// Arrange
		let body={
		}
        let req: Partial<Request> = {};
				req.body=body;

        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		sinon.stub(BuildingConnection, "create").returns(Result.fail({"error":"aaaaaaaaaa"}));

		let buildingConnectionRepoInstance = Container.get("BuildingConnectionRepo");
		sinon.stub(buildingConnectionRepoInstance, "findByDomainId").returns(new Promise<BuildingConnection>((resolve, reject) => {
			resolve(BuildingConnection.create(body  as IBuildingConnectionDTO).errorValue())
		}));

		sinon.stub(buildingConnectionRepoInstance, "save").returns(new Promise<BuildingConnection>((resolve, reject) => {
			resolve(BuildingConnection.create(body  as IBuildingConnectionDTO).errorValue())
		}));

		let buildingConnectionServiceInstance = Container.get("BuildingConnectionService");

		const ctrl = new BuildingConnectionController(buildingConnectionServiceInstance as IBuildingConnectionService);

		// Act
		await ctrl.updateBuildingConnection(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({"id":"123","floor1Id": req.body.floor1Id,"floor2Id": req.body.floor2Id,"posX": req.body.posX,"posY": req.body.posY}));
	});

});


