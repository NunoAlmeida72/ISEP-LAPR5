import 'reflect-metadata';

import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import { Result } from '../../../src/core/logic/Result';
import BuildingService from "../../../src/services/buildingService";
import IBuildingDTO from '../../../src/dto/IBuildingDTO';
import { Building } from '../../../src/domain/building';
import IBuildingRepo from '../../../src/services/IRepos/IBuildingRepo';

describe('building service', function () {
	const sandbox = sinon.createSandbox();

	beforeEach(function() {
		Container.reset();
		let buildingSchemaInstance = require("../../../src/persistence/schemas/buildingSchema").default;
		Container.set("buildingSchema", buildingSchemaInstance);

		let buildingRepoClass = require("../../../src/repos/buildingRepo").default;
		let buildingRepoInstance = Container.get(buildingRepoClass);
		Container.set("BuildingRepo", buildingRepoInstance);
    });
    let floorSchemaInstance = require("../../../src/persistence/schemas/floorSchema").default;
		Container.set("floorSchema", floorSchemaInstance);

		let floorRepoClass = require("../../../src/repos/floorRepo").default;
		let floorRepoInstance = Container.get(floorRepoClass);
		Container.set("FloorRepo", floorRepoInstance);

	afterEach(function() {
		sandbox.restore();
	});

	//UNIT TESTS

    it('createBuilding  buildingService unit test using buildingRepo and Building stub', async function () {
		// Arrange
        let body = { 
        "name":'AAAA',
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
    
    sinon.stub(Building, "create").returns(Result.ok({"id":"123", 
		"name": req.body.name,
		"code":req.body.code,
		"description": req.body.description,
		"width": req.body.width,
		"depth": req.body.depth}));

		let buildingRepoInstance = Container.get("BuildingRepo");
		const   repo=sinon.stub(buildingRepoInstance, "save").returns(new Promise<Building>((resolve, reject) => {
			resolve(Building.create({"id":"123", 
			"name": req.body.name,
			"code":req.body.code,
			"description": req.body.description,
			"width": req.body.width,
			"depth": req.body.depth}).getValue())
		}));

		const service = new BuildingService(repo as IBuildingRepo,Container.get("FloorRepo"));

		// Act
		await service.createBuilding(body as IBuildingDTO);

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

  it('fail createBuilding buildingService unit test using buildingRepo and Building stub', async function () {
		// Arrange
        let body = { 
        "name":'AAAA',
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
    
    sinon.stub(Building, "create").returns(Result.fail({"error":"aaaaaaaaaaaaaa"}));

		let buildingRepoInstance = Container.get("BuildingRepo");
		const repo=sinon.stub(buildingRepoInstance, "save").returns(new Promise<Building>((resolve, reject) => {
			resolve(Building.create({"id":"123", 
			"name": req.body.name,
			"code":req.body.code,
			"description": req.body.description,
			"width": req.body.width,
			"depth": req.body.depth}).getValue())
		}));

		const service = new BuildingService(repo as IBuildingRepo,Container.get("FloorRepo"));

		// Act
		await service.createBuilding(body as IBuildingDTO);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({"error":"aaaaaaaaaaaaaa"}));
	});

  it('updateBuilding  buildingService unit test using buildingRepo and Building stub', async function () {
		// Arrange
        let body = { 
        "name":'AAAA',
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
    
    sinon.stub(Building, "create").returns(Result.ok({"id":"123", 
		"name": req.body.name,
		"code":req.body.code,
		"description": req.body.description,
		"width": req.body.width,
		"depth": req.body.depth}));

		let buildingRepoInstance = Container.get("BuildingRepo");
		const   repo=sinon.stub(buildingRepoInstance, "findByDomainId").returns(new Promise<Building>((resolve, reject) => {
			resolve(Building.create({"id":"123", 
			"name": req.body.name,
			"code":req.body.code,
			"description": req.body.description,
			"width": req.body.width,
			"depth": req.body.depth}).getValue())
		}));

      sinon.stub(buildingRepoInstance, "save").returns(new Promise<Building>((resolve, reject) => {
			resolve(Building.create({"id":"123", 
			"name": req.body.name,
			"code":req.body.code,
			"description": req.body.description,
			"width": req.body.width,
			"depth": req.body.depth}).getValue())
		}));

		const service = new BuildingService(repo as IBuildingRepo,Container.get("FloorRepo"));

		// Act
		await service.updateBuilding(body as IBuildingDTO);

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

  it('fail  updateBuilding  buildingService unit test using buildingRepo and Building stub', async function () {
		// Arrange
        let body = { 
        "name":'AAAA',
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
    
    sinon.stub(Building, "create").returns(Result.fail({"error":"aaaaaaaaaaaaaaa"}));

		let buildingRepoInstance = Container.get("BuildingRepo");
		const   repo=sinon.stub(buildingRepoInstance, "findByDomainId").returns(new Promise<Building>((resolve, reject) => {
			resolve(Building.create({"id":"123", 
			"name": req.body.name,
			"code":req.body.code,
			"description": req.body.description,
			"width": req.body.width,
			"depth": req.body.depth}).errorValue())
		}));

      sinon.stub(buildingRepoInstance, "save").returns(new Promise<Building>((resolve, reject) => {
			resolve(Building.create({"id":"123", 
			"name": req.body.name,
			"code":req.body.code,
			"description": req.body.description,
			"width": req.body.width,
			"depth": req.body.depth}).errorValue())
		}));

		const service = new BuildingService(repo as IBuildingRepo,Container.get("FloorRepo"));

		// Act
		await service.updateBuilding(body as IBuildingDTO);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({ 
      "error":"aaaaaaaaaaaaaaa"}));
	});

  it('listBuildings  buildingService unit test using buildingRepo and Building stub', async function () {
		// Arrange
      
        let req: Partial<Request> = {};
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
		const   repo=sinon.stub(buildingRepoInstance, "findAll").returns(new Promise<Building>((resolve, reject) => {
			resolve(Building.create({"id":"123", 
			"name": req.body.name,
			"code":req.body.code,
			"description": req.body.description,
			"width": req.body.width,
			"depth": req.body.depth}).getValue())
		}));

		const service = new BuildingService(repo as IBuildingRepo,Container.get("FloorRepo"));

		// Act
		await service.listBuildings();

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

  it('listBuildings  buildingService unit test using buildingRepo and Building stub', async function () {
		// Arrange
      
        let req: Partial<Request> = {};
        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};
    
    sinon.stub(Building, "create").returns(Result.fail({"error":"assasss"}));

		let buildingRepoInstance = Container.get("BuildingRepo");
		const   repo=sinon.stub(buildingRepoInstance, "findAll").returns(new Promise<Building>((resolve, reject) => {
			resolve(Building.create({"id":"123", 
			"name": req.body.name,
			"code":req.body.code,
			"description": req.body.description,
			"width": req.body.width,
			"depth": req.body.depth}).errorValue())
		}));

		const service = new BuildingService(repo as IBuildingRepo,Container.get("FloorRepo"));

		// Act
		await service.listBuildings();

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({ 
      "error":"assasss"}));
	});

	it('listBuildingsInFloorLimit buildingService unit test using buildingRepo and Building stub', async function () {
		// Arrange
        let req: Partial<Request> = {};
        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};
    
		sinon.stub(Building, "create").returns(Result.ok({
			"id":"123", 
			"name": req.body.name,
			"code":req.body.code,
			"description": req.body.description,
			"width": req.body.width,
			"depth": req.body.depth
		}));

		let buildingRepoInstance = Container.get("BuildingRepo");
		const   repo=sinon.stub(buildingRepoInstance, "findAll").returns(new Promise<Building>((resolve, reject) => {
			resolve(Building.create({"id":"123", 
			"name": req.body.name,
			"code":req.body.code,
			"description": req.body.description,
			"width": req.body.width,
			"depth": req.body.depth}).getValue())
		}));

		const service = new BuildingService(repo as IBuildingRepo,Container.get("FloorRepo"));

		// Act
		await service.listBuildingsInFloorLimit(1,5);

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

  it('fail listBuildingsInFloorLimit buildingService unit test using buildingRepo and Building stub', async function () {
		// Arrange
      	let req: Partial<Request> = {};
        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};
    
    	sinon.stub(Building, "create").returns(Result.fail({"error":"test_error"}));

		let buildingRepoInstance = Container.get("BuildingRepo");
		const   repo=sinon.stub(buildingRepoInstance, "findAll").returns(new Promise<Building>((resolve, reject) => {
			resolve(Building.create({
				"id":"123", 
				"name": req.body.name,
				"code":req.body.code,
				"description": req.body.description,
				"width": req.body.width,
				"depth": req.body.depth
			}).errorValue())
		}));

		const service = new BuildingService(repo as IBuildingRepo,Container.get("FloorRepo"));

		// Act
		await service.listBuildingsInFloorLimit(1,5);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({ 
      "error":"test_error"}));
	});


  //INTEGRATION   TESTS

  it('createBuilding buildingService + Building integration test using buildingRepoistory stub', async function () {	
		// Arrange
		let body={
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
    
		let buildingRepoInstance = Container.get("BuildingRepo");
		const  repo=sinon.stub(buildingRepoInstance, "save").returns(new Promise<Building>((resolve, reject) => {
			resolve(Building.create(body  as   IBuildingDTO).getValue())
		}));

		let buildingServiceInstance = Container.get("BuildingService");

		const ctrl = new BuildingService(repo as IBuildingRepo,Container.get("FloorRepo"));

		// Act
		await ctrl.createBuilding(body as  IBuildingDTO);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({"id":"123","name":req.body.name,"code":req.body.code,"description":req.body.description,"width":req.body.width,"depth": req.body.depth}));
	});

  it('createBuilding buildingService + Building integration test using buildingRepoistory stub', async function () {	
		// Arrange
		let body={
		}
        let req: Partial<Request> = {};
				req.body=body;

        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};
    
		let buildingRepoInstance = Container.get("BuildingRepo");
		const  repo=sinon.stub(buildingRepoInstance, "save").returns(new Promise<Building>((resolve, reject) => {
			resolve(Building.create(body as IBuildingDTO).errorValue())
		}));

		let buildingServiceInstance = Container.get("BuildingService");

		const ctrl = new BuildingService(repo as IBuildingRepo,Container.get("FloorRepo"));

		// Act
		await ctrl.createBuilding(body as  IBuildingDTO);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({"error":"Must provide a building code(max 5 characters)"}));
	});

});


