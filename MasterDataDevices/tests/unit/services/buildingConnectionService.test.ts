import 'reflect-metadata';

import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import { Result } from '../../../src/core/logic/Result';
import BuildingConnectionService from "../../../src/services/buildingConnectionService";
import IBuildingConnectionDTO from '../../../src/dto/IBuildingConnectionDTO';
import { BuildingConnection } from '../../../src/domain/buildingConnection';
import IBuildingConnectionRepo from '../../../src/services/IRepos/IBuildingConnectionRepo';

describe('building service', function () {
	const sandbox = sinon.createSandbox();

	beforeEach(function() {
		Container.reset();
		let buildingConnectionSchemaInstance = require("../../../src/persistence/schemas/buildingConnectionSchema").default;
		Container.set("buildingConnectionSchema", buildingConnectionSchemaInstance);

		let buildingConnectionRepoClass = require("../../../src/repos/buildingConnectionRepo").default;
		let buildingConnectionRepoInstance = Container.get(buildingConnectionRepoClass);
		Container.set("BuildingConnectionRepo", buildingConnectionRepoInstance);
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

    it('createBuildingConnection  buildingConnectionService unit test using buildingConnectionRepo and BuildingConnection stub', async function () {
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
		const   repo=sinon.stub(buildingConnectionRepoInstance, "save").returns(new Promise<BuildingConnection>((resolve, reject) => {
			resolve(BuildingConnection.create({
                "id":"123", 
			    "floor1Id": req.body.floor1Id,
			    "floor2Id": req.body.floor2Id,
			    "posX": req.body.posX,
			    "posY": req.body.posY
            }).getValue())
		}));

		const service = new BuildingConnectionService(repo as IBuildingConnectionRepo,Container.get("FloorRepo"));

		// Act
		await service.createBuildingConnection(body as IBuildingConnectionDTO);

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

  it('fail createBuildingConnection buildingConnectionService unit test using buildingConnectionRepo and BuildingConnection stub', async function () {
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
    
        sinon.stub(BuildingConnection, "create").returns(Result.fail({"error":"aaaaaaaaaaaaaa"}));

		let buildingConnectionRepoInstance = Container.get("BuildingConnectionRepo");
		const repo=sinon.stub(buildingConnectionRepoInstance, "save").returns(new Promise<BuildingConnection>((resolve, reject) => {
			resolve(BuildingConnection.create({
                "id":"123", 
			    "floor1Id": req.body.floor1Id,
			    "floor2Id": req.body.floor2Id,
			    "posX": req.body.posX,
			    "posY": req.body.posY
            }).getValue())
		}));

		const service = new BuildingConnectionService(repo as IBuildingConnectionRepo,Container.get("FloorRepo"));

		// Act
		await service.createBuildingConnection(body as IBuildingConnectionDTO);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({"error":"aaaaaaaaaaaaaa"}));
	});

  it('updateBuildingConnection  buildingConnectionService unit test using buildingConnectionRepo and BuildingConnection stub', async function () {
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
		const   repo=sinon.stub(buildingConnectionRepoInstance, "findByDomainId").returns(new Promise<BuildingConnection>((resolve, reject) => {
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

		const service = new BuildingConnectionService(repo as IBuildingConnectionRepo,Container.get("FloorRepo"));

		// Act
		await service.updateBuildingConnection(body as IBuildingConnectionDTO);

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

  it('fail  updateBuildingConnection  buildingConnectionService unit test using buildingConnectionRepo and BuildingConnection stub', async function () {
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
    
        sinon.stub(BuildingConnection, "create").returns(Result.fail({"error":"aaaaaaaaaaaaaaa"}));

		let buildingConnectionRepoInstance = Container.get("BuildingConnectionRepo");
		const   repo=sinon.stub(buildingConnectionRepoInstance, "findByDomainId").returns(new Promise<BuildingConnection>((resolve, reject) => {
			resolve(BuildingConnection.create({
                "id":"123", 
			    "floor1Id": req.body.floor1Id,
			    "floor2Id": req.body.floor2Id,
			    "posX": req.body.posX,
			    "posY": req.body.posY
            }).errorValue())
		}));

      sinon.stub(buildingConnectionRepoInstance, "save").returns(new Promise<BuildingConnection>((resolve, reject) => {
			resolve(BuildingConnection.create({
                "id":"123", 
			    "floor1Id": req.body.floor1Id,
			    "floor2Id": req.body.floor2Id,
			    "posX": req.body.posX,
			    "posY": req.body.posY
            }).errorValue())
		}));

		const service = new BuildingConnectionService(repo as IBuildingConnectionRepo,Container.get("FloorRepo"));

		// Act
		await service.updateBuildingConnection(body as IBuildingConnectionDTO);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({"error":"aaaaaaaaaaaaaaa"}));
	});

  it('listBuildingConnections  buildingConnectionService unit test using buildingConnectionRepo and BuildingConnection stub', async function () {
		// Arrange
      
        let req: Partial<Request> = {};
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
		const   repo=sinon.stub(buildingConnectionRepoInstance, "findAll").returns(new Promise<BuildingConnection>((resolve, reject) => {
			resolve(BuildingConnection.create({
                "id":"123", 
			    "floor1Id": req.body.floor1Id,
			    "floor2Id": req.body.floor2Id,
			    "posX": req.body.posX,
			    "posY": req.body.posY
            }).getValue())
		}));

		const service = new BuildingConnectionService(repo as IBuildingConnectionRepo,Container.get("FloorRepo"));

		// Act
		await service.listBuildingConnections("123", "123");

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

  it('fail listBuildingConnections  buildingConnectionService unit test using buildingConnectionRepo and BuildingConnection stub', async function () {
		// Arrange
      
        let req: Partial<Request> = {};
        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};
    
        sinon.stub(BuildingConnection, "create").returns(Result.fail({"error":"assasss"}));

		let buildingConnectionRepoInstance = Container.get("BuildingConnectionRepo");
		const   repo=sinon.stub(buildingConnectionRepoInstance, "findAll").returns(new Promise<BuildingConnection>((resolve, reject) => {
			resolve(BuildingConnection.create({
                "id":"123", 
			    "floor1Id": req.body.floor1Id,
			    "floor2Id": req.body.floor2Id,
			    "posX": req.body.posX,
			    "posY": req.body.posY
            }).errorValue())
		}));

		const service = new BuildingConnectionService(repo as IBuildingConnectionRepo,Container.get("FloorRepo"));

		// Act
		await service.listBuildingConnections("123", "123");

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({"error":"assasss"}));
	});


  //INTEGRATION   TESTS

  it('createBuildingConnection buildingConnectionService + BuildingConnection integration test using buildingConnectionRepository stub', async function () {	
		// Arrange
		let body={
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
    
		let buildingConnectionRepoInstance = Container.get("BuildingConnectionRepo");
		const  repo=sinon.stub(buildingConnectionRepoInstance, "save").returns(new Promise<BuildingConnection>((resolve, reject) => {
			resolve(BuildingConnection.create(body  as   IBuildingConnectionDTO).getValue())
		}));

		let buildingConnectionServiceInstance = Container.get("BuildingConnectionService");

		const ctrl = new BuildingConnectionService(repo as IBuildingConnectionRepo,Container.get("FloorRepo"));

		// Act
		await ctrl.createBuildingConnection(body as  IBuildingConnectionDTO);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({"id":"123","floor1Id": req.body.floor1Id,"floor2Id": req.body.floor2Id,"posX": req.body.posX,"posY": req.body.posY}));
	});

  it('createBuildingConnection buildingConnectionService + BuildingConnection integration test using buildingConnectionRepository stub', async function () {	
		// Arrange
		let body={
		}
        let req: Partial<Request> = {};
				req.body=body;

        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};
    
		let buildingConnectionRepoInstance = Container.get("BuildingConnectionRepo");
		const  repo=sinon.stub(buildingConnectionRepoInstance, "save").returns(new Promise<BuildingConnection>((resolve, reject) => {
			resolve(BuildingConnection.create(body as IBuildingConnectionDTO).errorValue())
		}));

		let buildingConnectionServiceInstance = Container.get("BuildingConnectionService");

		const ctrl = new BuildingConnectionService(repo as IBuildingConnectionRepo,Container.get("FloorRepo"));

		// Act
		await ctrl.createBuildingConnection(body as  IBuildingConnectionDTO);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({"error":"Must provide a building code(max 5 characters)"}));
	});

});


