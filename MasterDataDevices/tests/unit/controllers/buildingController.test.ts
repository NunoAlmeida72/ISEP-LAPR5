import 'reflect-metadata';

import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import { Result } from '../../../src/core/logic/Result';
import IBuildingService from "../../../src/services/IServices/IBuildingService";
import BuildingController from "../../../src/controllers/buildingController";
import IBuildingDTO from '../../../src/dto/IBuildingDTO';
import { Building } from '../../../src/domain/building';

describe('building controller', function () {
	const sandbox = sinon.createSandbox();

	beforeEach(function() {
		Container.reset();
		let buildingSchemaInstance = require("../../../src/persistence/schemas/buildingSchema").default;
		Container.set("buildingSchema", buildingSchemaInstance);

		let buildingRepoClass = require("../../../src/repos/buildingRepo").default;
		let buildingRepoInstance = Container.get(buildingRepoClass);
		Container.set("BuildingRepo", buildingRepoInstance);

		let floorSchemaInstance = require("../../../src/persistence/schemas/floorSchema").default;
		Container.set("floorSchema", floorSchemaInstance);

		let floorRepoClass = require("../../../src/repos/floorRepo").default;
		let floorRepoInstance = Container.get(floorRepoClass);
		Container.set("FloorRepo", floorRepoInstance);

		let buildingServiceClass = require("../../../src/services/buildingService").default;
		let buildingServiceInstance = Container.get(buildingServiceClass);
		Container.set("BuildingService", buildingServiceInstance);
    });

	afterEach(function() {
		sandbox.restore();
	});

	//UNIT TESTS

    it('createBuilding  buildingController unit test using buildingService stub', async function () {
		// Arrange
        let body = { "name":'AAAA',
        "code":"DEI",
        "description": "Departamento engenharia eletro",
        "width": 8,
        "depth": 7};
        let req: Partial<Request> = {};
		req.body = body;
        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		let buildingServiceInstance = Container.get("BuildingService");
		const service=sinon.stub(buildingServiceInstance, "createBuilding").returns( Result.ok<IBuildingDTO>( {
      "id":"123", 
			"name": req.body.name,
			"code":req.body.code,
			"description": req.body.description,
			"width": req.body.width,
			"depth": req.body.depth
		} ));

		const ctrl = new BuildingController(service as IBuildingService);

		// Act
		await ctrl.createBuilding(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({ 
      "id":"123", 
    "name": req.body.name,
    "code":req.body.code,
    "description": req.body.description,
    "width": req.body.width,
    "depth": req.body.depth}));
	});

	it('createBuilding buildingController unit test using buildingService stub fail', async function () {
		// Arrange
        let body = { "name":'AAAA',
        "code":"DEI",
        "description": "Departamento engenharia eletro",
        "width": 8,
        "depth": 7};
        let req: Partial<Request> = {};
		req.body = body;
        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		let buildingServiceInstance = Container.get("BuildingService");
		const service=sinon.stub(buildingServiceInstance, "createBuilding").returns( Result.fail<IBuildingDTO>({
			"error":"aaaaaaaaaaaaaaaaaa"
		}));

		const ctrl = new BuildingController(service as IBuildingService);

		// Act
		await ctrl.createBuilding(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({"error":"aaaaaaaaaaaaaaaaaa"}));
	});

	it('updateBuilding  buildingController unit test using buildingService stub', async function () {
		// Arrange
        let body = { "id":'123',
        "code":"DEI",
        "description": "Departamento engenharia eletro",
        "width": 1,
        "depth": 7};
        let req: Partial<Request> = {};
		req.body = body;
        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		let buildingServiceInstance = Container.get("BuildingService");
		const service=sinon.stub(buildingServiceInstance, "updateBuilding").returns( Result.ok<IBuildingDTO>( {
      "id":"123", 
			"name": req.body.name,
			"code":req.body.code,
			"description": req.body.description,
			"width": req.body.width,
			"depth": req.body.depth
		} ));

		const ctrl = new BuildingController(service as IBuildingService);

		// Act
		await ctrl.updateBuilding(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({ 
      "id":"123", 
    "name": req.body.name,
    "code":req.body.code,
    "description": req.body.description,
    "width": req.body.width,
    "depth": req.body.depth}));
	});

	it('fail updateBuilding  buildingController unit test using buildingService stub', async function () {
		// Arrange
        let body = { "id":'123',
        "code":"DEI",
        "description": "Departamento engenharia eletro",
        "width": 1,
        "depth": 7};
        let req: Partial<Request> = {};
		req.body = body;
        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		let buildingServiceInstance = Container.get("BuildingService");
		const service=sinon.stub(buildingServiceInstance, "updateBuilding").returns( Result.fail<IBuildingDTO>( {
      "error":"aaaaaaaaaaaaaaaaaa"
		} ));

		const ctrl = new BuildingController(service as IBuildingService);

		// Act
		await ctrl.updateBuilding(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({ 
      "error":"aaaaaaaaaaaaaaaaaa"}));
	});



	it('listBuildings buildingController unit test using buildingService stub', async function () {
		// Arrange
        let req: Partial<Request> = {};
        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		let buildingServiceInstance = Container.get("BuildingService");
		const service=sinon.stub(buildingServiceInstance, "listBuildings").returns( Result.ok<IBuildingDTO>( {
      "id":"123", 
		"name": req.body.name,
		"code":req.body.code,
		"description": req.body.description,
		"width": req.body.width,
		"depth": req.body.depth
		} ));

		const ctrl = new BuildingController(service as IBuildingService);

		// Act
		await ctrl.listBuildings(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({"id":"123", 
		"name": req.body.name,
		"code":req.body.code,
		"description": req.body.description,
		"width": req.body.width,
		"depth": req.body.depth}));
	});

	it('fail  listBuildings buildingController unit test using buildingService stub', async function () {
		// Arrange
        let req: Partial<Request> = {};
        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		let buildingServiceInstance = Container.get("BuildingService");
		const service=sinon.stub(buildingServiceInstance, "listBuildings").returns( Result.fail<IBuildingDTO>( {
      "error":"aaaaaaaaaaaaaaaaaa"
		} ));

		const ctrl = new BuildingController(service as IBuildingService);

		// Act
		await ctrl.listBuildings(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({"error":"aaaaaaaaaaaaaaaaaa"}));
	});

	it('listBuildingsInFloorLimit buildingController unit test using buildingService stub', async function () {
		// Arrange
        let req: Partial<Request> = {};
        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		let buildingServiceInstance = Container.get("BuildingService");
		const service=sinon.stub(buildingServiceInstance, "listBuildingsInFloorLimit").returns( Result.ok<IBuildingDTO>( {
      		"id":"123", 
			"name": req.body.name,
			"code":req.body.code,
			"description": req.body.description,
			"width": req.body.width,
			"depth": req.body.depth
		} ));

		const ctrl = new BuildingController(service as IBuildingService);

		// Act
		await ctrl.listBuildingsInFloorLimit(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({
			"id":"123", 
			"name": req.body.name,
			"code":req.body.code,
			"description": req.body.description,
			"width": req.body.width,
			"depth": req.body.depth
		}));
	});

	it('fail listBuildingsInFloorLimit buildingController unit test using buildingService stub', async function () {
		// Arrange
        let req: Partial<Request> = {};
        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		let buildingServiceInstance = Container.get("BuildingService");
		const service=sinon.stub(buildingServiceInstance, "listBuildingsInFloorLimit").returns( Result.fail<IBuildingDTO>( {
      "error":"test_error"
		} ));

		const ctrl = new BuildingController(service as IBuildingService);

		// Act
		await ctrl.listBuildingsInFloorLimit(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({ 
		"error":"test_error"}));
	});







	//INTEGRATION  TESTS

    it('createBuilding buildingController + buildingService integration test using buildingRepoistory and building stubs', async function () {	
		// Arrange	
        let body = { "name":'AAAA',
        "code":"DEI",
        "description": "Departamento engenharia eletro",
        "width": 8,
        "depth": 7 };
        let req: Partial<Request> = {};
		req.body = body;

        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		sinon.stub(Building, "create").returns(Result.ok({"id":"123", 
		"name": req.body.name,
		"code":req.body.code,
		"description": req.body.description,
		"width": req.body.width,
		"depth": req.body.depth}));

		let buildingRepoInstance = Container.get("BuildingRepo");
		sinon.stub(buildingRepoInstance, "save").returns(new Promise<Building>((resolve, reject) => {
			resolve(Building.create({"id":"123", 
			"name": req.body.name,
			"code":req.body.code,
			"description": req.body.description,
			"width": req.body.width,
			"depth": req.body.depth}).getValue())
		}));

		let buildingServiceInstance = Container.get("BuildingService");

		const ctrl = new BuildingController(buildingServiceInstance as IBuildingService);

		// Act
		await ctrl.createBuilding(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({ "id":"123", 
		"name": req.body.name,
		"code":req.body.code,
		"description": req.body.description,
		"width": req.body.width,
		"depth": req.body.depth}));
	});

	it('fail createBuilding buildingController + buildingService integration test using buildingRepoistory and building stubs', async function () {	
		// Arrange	
        let body = { "name":'AAAA',
        "code":"DEI",
        "description": "Departamento engenharia eletro",
        "width": 8,
        "depth": 7 };
        let req: Partial<Request> = {};
		req.body = body;

        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		sinon.stub(Building, "create").returns(Result.fail({"error":"aaaaaaaaaaaaaaaaaa"}));

		let buildingRepoInstance = Container.get("BuildingRepo");
		sinon.stub(buildingRepoInstance, "save").returns(new Promise<Building>((resolve, reject) => {
			resolve(Building.create(body as IBuildingDTO).errorValue())
		}));

		let buildingServiceInstance = Container.get("BuildingService");

		const ctrl = new BuildingController(buildingServiceInstance as IBuildingService);

		// Act
		await ctrl.createBuilding(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({ "error":"aaaaaaaaaaaaaaaaaa"}));
	});

	it('listBuildings buildingController + buildingService integration test using buildingRepoistory and building stubs', async function () {	
		// Arrange	
        let req: Partial<Request> = {};
        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		sinon.stub(Building, "create").returns(Result.ok({"id":"123",
			"name":'AAAA',
		"code":"DEI",
		"description": "Departamento engenharia eletro",
		"width": 8,
		"depth": 7}));

		let buildingRepoInstance = Container.get("BuildingRepo");
		sinon.stub(buildingRepoInstance, "findAll").returns(new Promise<Building>((resolve, reject) => {
			resolve(Building.create({"id":"123", 
			"name":'AAAA',
        "code":"DEI",
        "description": "Departamento engenharia eletro",
        "width": 8,
        "depth": 7}).getValue())
		}));

		let buildingServiceInstance = Container.get("BuildingService");

		const ctrl = new BuildingController(buildingServiceInstance as IBuildingService);

		// Act
		await ctrl.listBuildings(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({"id":"123", 
		"name":'AAAA',
        "code":"DEI",
        "description": "Departamento engenharia eletro",
        "width": 8,
        "depth": 7}));
	});

	it('updateBuilding buildingController + buildingService integration test using buildingRepoistory and building stubs', async function () {	
		// Arrange
		let body={
			"id":"123",
			"name":'AAAA',
			"code":"DEI",
			"description": "Departamento engenharia eletro",
			"width": 8,
			"depth": 7
		}
        let req: Partial<Request> = {};
				req.body=body;

        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		sinon.stub(Building, "create").returns(Result.ok({"id":"123", 
			"name":req.body.name,
			"code":req.body.code,
			"description": req.body.description,
			"width": req.body.width,
			"depth": req.body.depth}));

		let buildingRepoInstance = Container.get("BuildingRepo");
		sinon.stub(buildingRepoInstance, "findByDomainId").returns(new Promise<Building>((resolve, reject) => {
			resolve(Building.create({"id":"123", 
			"name":req.body.name,
        "code":req.body.code,
        "description": req.body.description,
        "width": req.body.width,
        "depth":  req.body.depth}).getValue())
		}));

		sinon.stub(buildingRepoInstance, "save").returns(new Promise<Building>((resolve, reject) => {
			resolve(Building.create({"id":"123", 
			"name":req.body.name,
        "code":req.body.code,
        "description": req.body.description,
        "width": req.body.width,
        "depth":  req.body.depth}).getValue())
		}));

		let buildingServiceInstance = Container.get("BuildingService");

		const ctrl = new BuildingController(buildingServiceInstance as IBuildingService);

		// Act
		await ctrl.updateBuilding(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({"id":"123","name":req.body.name,"code":req.body.code,"description":req.body.description,"width":req.body.width,"depth": req.body.depth}));
	});

	it('fail updateBuilding buildingController + buildingService integration test using buildingRepoistory and building stubs', async function () {	
		// Arrange
		let body={
		}
        let req: Partial<Request> = {};
				req.body=body;

        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		sinon.stub(Building, "create").returns(Result.fail({"error":"aaaaaaaaaa"}));

		let buildingRepoInstance = Container.get("BuildingRepo");
		sinon.stub(buildingRepoInstance, "findByDomainId").returns(new Promise<Building>((resolve, reject) => {
			resolve(Building.create(body  as IBuildingDTO).errorValue())
		}));

		sinon.stub(buildingRepoInstance, "save").returns(new Promise<Building>((resolve, reject) => {
			resolve(Building.create(body  as IBuildingDTO).errorValue())
		}));

		let buildingServiceInstance = Container.get("BuildingService");

		const ctrl = new BuildingController(buildingServiceInstance as IBuildingService);

		// Act
		await ctrl.updateBuilding(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({"id":"123","name":req.body.name,"code":req.body.code,"description":req.body.description,"width":req.body.width,"depth": req.body.depth}));
	});

	it('listBuildingsInFloorLimit buildingController + buildingService integration test using buildingRepository and building stubs', async function () {	
		// Arrange	
        let req: Partial<Request> = {};
        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		sinon.stub(Building, "create").returns(Result.ok({
			"id":"123",
			"name":'AAAA',
			"code":"DEI",
			"description": "Departamento engenharia eletro",
			"width": 8,
			"depth": 7
		}));

		let buildingRepoInstance = Container.get("BuildingRepo");
		sinon.stub(buildingRepoInstance, "findAll").returns(new Promise<Building>((resolve, reject) => {
			resolve(Building.create({
				"id":"123", 
				"name":'AAAA',
				"code":"DEI",
				"description": "Departamento engenharia eletro",
				"width": 8,
				"depth": 7
			}).getValue())
		}));

		let buildingServiceInstance = Container.get("BuildingService");

		const ctrl = new BuildingController(buildingServiceInstance as IBuildingService);

		// Act
		await ctrl.listBuildingsInFloorLimit(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({
			"id":"123", 
			"name":'AAAA',
			"code":"DEI",
			"description": "Departamento engenharia eletro",
			"width": 8,
			"depth": 7
		}));
	});

});


