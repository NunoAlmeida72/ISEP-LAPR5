import 'reflect-metadata';

import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import { Result } from '../../../src/core/logic/Result';
import RobotService from "../../../src/services/robotService";
import IRobotDTO from '../../../src/dto/IRobotDTO';
import { Robot } from '../../../src/domain/robot';
import IRobotRepo from '../../../src/services/IRepos/IRobotRepo';

describe('building service', function () {
	const sandbox = sinon.createSandbox();

	beforeEach(function() {

		let taskSchemaInstance = require("../../../src/persistence/schemas/taskSchema").default;
		Container.set("taskSchema", taskSchemaInstance);

		let taskRepoClass = require("../../../src/repos/taskRepo").default;
		let taskRepoInstance = Container.get(taskRepoClass);
		Container.set("TaskRepo", taskRepoInstance);


		Container.reset();
		let robotSchemaInstance = require("../../../src/persistence/schemas/robotSchema").default;
		Container.set("robotSchema", robotSchemaInstance);

		let robotRepoClass = require("../../../src/repos/robotRepo").default;
		let robotRepoInstance = Container.get(robotRepoClass);
		Container.set("RobotRepo", robotRepoInstance);
    });
    let robotTypeSchemaInstance = require("../../../src/persistence/schemas/robotTypeSchema").default;
		Container.set("robotTypeSchema", robotTypeSchemaInstance);

		let robotTypeRepoClass = require("../../../src/repos/robotTypeRepo").default;
		let robotTypeRepoInstance = Container.get(robotTypeRepoClass);
		Container.set("RobotTypeRepo", robotTypeRepoInstance);

	afterEach(function() {
		sandbox.restore();
	});

	//UNIT TESTS

    it('createRobot  robotService unit test using robotRepo and Robot stub', async function () {
		// Arrange
        let body = { 
            "code": "123",
            "name": "abc",
            "robotTypeId": "a",
            "number": "123",
            "status": true,
            "description": "qwe"
        };
        let req: Partial<Request> = {};
		req.body = body;
        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};
    
        sinon.stub(Robot, "create").returns(Result.ok({
            "id":"123", 
		    "code": req.body.code,
            "name": req.body.name,
			"robotTypeId": req.body.robotTypeId,
			"number": req.body.number,
			"status": req.body.status,
            "description": req.body.description
        }));

		let robotRepoInstance = Container.get("RobotRepo");
		const   repo=sinon.stub(robotRepoInstance, "save").returns(new Promise<Robot>((resolve, reject) => {
			resolve(Robot.create({
                "id":"123", 
			    "code": req.body.code,
                "name": req.body.name,
			    "robotTypeId": req.body.robotTypeId,
			    "number": req.body.number,
			    "status": req.body.status,
                "description": req.body.description
            }).getValue())
		}));

		const service = new RobotService(repo as IRobotRepo,Container.get("RobotTypeRepo"),Container.get("TaskRepo"));

		// Act
		await service.createRobot(body as IRobotDTO);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({ 
            "id":"123", 
            "code": req.body.code,
            "name": req.body.name,
			"robotTypeId": req.body.robotTypeId,
			"number": req.body.number,
			"status": req.body.status,
            "description": req.body.description
        }));
	});

  it('fail createRobot  robotService unit test using robotRepo and Robot stub', async function () {
		// Arrange
        let body = { 
            "code": "123",
            "name": "abc",
            "robotTypeId": "a",
            "number": "123",
            "status": true,
            "description": "qwe"
        };
        let req: Partial<Request> = {};
		req.body = body;
        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};
    
        sinon.stub(Robot, "create").returns(Result.fail({"error":"aaaaaaaaaaaaaa"}));

		let robotRepoInstance = Container.get("RobotRepo");
		const repo=sinon.stub(robotRepoInstance, "save").returns(new Promise<Robot>((resolve, reject) => {
			resolve(Robot.create({
                "id":"123", 
			    "code": req.body.code,
                "name": req.body.name,
			    "robotTypeId": req.body.robotTypeId,
			    "number": req.body.number,
			    "status": req.body.status,
                "description": req.body.description
            }).getValue())
		}));

		const service = new RobotService(repo as IRobotRepo,Container.get("RobotTypeRepo"),Container.get("TaskRepo"));

		// Act
		await service.createRobot(body as IRobotDTO);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({"error":"aaaaaaaaaaaaaa"}));
	});

  it('disableRobot  robotService unit test using robotRepo and Robot stub', async function () {
		// Arrange
        let body = { 
            "code": "123",
            "name": "abc",
            "robotTypeId": "a",
            "number": "123",
            "status": true,
            "description": "qwe"
        };
        let req: Partial<Request> = {};
		req.body = body;
        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};
    
        sinon.stub(Robot, "create").returns(Result.ok({
            "id":"123", 
		    "code": req.body.code,
            "name": req.body.name,
			"robotTypeId": req.body.robotTypeId,
			"number": req.body.number,
			"status": req.body.status,
            "description": req.body.description
        }));

		let robotRepoInstance = Container.get("RobotRepo");
		const   repo=sinon.stub(robotRepoInstance, "findByDomainId").returns(new Promise<Robot>((resolve, reject) => {
			resolve(Robot.create({
                "id":"123", 
			    "code": req.body.code,
                "name": req.body.name,
			    "robotTypeId": req.body.robotTypeId,
			    "number": req.body.number,
			    "status": req.body.status,
                "description": req.body.description
            }).getValue())
		}));

      sinon.stub(robotRepoInstance, "save").returns(new Promise<Robot>((resolve, reject) => {
			resolve(Robot.create({
                "id":"123", 
			    "code": req.body.code,
                "name": req.body.name,
			    "robotTypeId": req.body.robotTypeId,
			    "number": req.body.number,
			    "status": req.body.status,
                "description": req.body.description
            }).getValue())
		}));

		const service = new RobotService(repo as IRobotRepo,Container.get("RobotTypeRepo"),Container.get("TaskRepo"));

		// Act
		await service.disableRobot("123");

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({ 
            "id":"123", 
            "code": req.body.code,
            "name": req.body.name,
			"robotTypeId": req.body.robotTypeId,
			"number": req.body.number,
			"status": req.body.status,
            "description": req.body.description
        }));
	});

  it('fail disableRobot robotService unit test using robotRepo and Robot stub', async function () {
		// Arrange
        let body = { 
            "code": "123",
            "name": "abc",
            "robotTypeId": "a",
            "number": "123",
            "status": true,
            "description": "qwe"
        };
        let req: Partial<Request> = {};
		req.body = body;
        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};
    
        sinon.stub(Robot, "create").returns(Result.fail({"error":"aaaaaaaaaaaaaaa"}));

		let robotRepoInstance = Container.get("RobotRepo");
		const   repo=sinon.stub(robotRepoInstance, "findByDomainId").returns(new Promise<Robot>((resolve, reject) => {
			resolve(Robot.create({
                "id":"123", 
			    "code": req.body.code,
                "name": req.body.name,
			    "robotTypeId": req.body.robotTypeId,
			    "number": req.body.number,
			    "status": req.body.status,
                "description": req.body.description
            }).errorValue())
		}));

      sinon.stub(robotRepoInstance, "save").returns(new Promise<Robot>((resolve, reject) => {
			resolve(Robot.create({
                "id":"123", 
			    "code": req.body.code,
                "name": req.body.name,
			    "robotTypeId": req.body.robotTypeId,
			    "number": req.body.number,
			    "status": req.body.status,
                "description": req.body.description
            }).errorValue())
		}));

		const service = new RobotService(repo as IRobotRepo,Container.get("RobotTypeRepo"),Container.get("TaskRepo"));

		// Act
		await service.disableRobot("123");

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({"error":"aaaaaaaaaaaaaaa"}));
	});


  //INTEGRATION   TESTS

  it('createRobot robotService + Robot integration test using robotRepository stub', async function () {	
		// Arrange
		let body={
			"code": "123",
            "name": "abc",
            "robotTypeId": "a",
            "number": "123",
            "status": true,
            "description": "qwe"
		}
        let req: Partial<Request> = {};
				req.body=body;

        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};
    
		let robotRepoInstance = Container.get("RobotRepo");
		const  repo=sinon.stub(robotRepoInstance, "save").returns(new Promise<Robot>((resolve, reject) => {
			resolve(Robot.create(body  as   IRobotDTO).getValue())
		}));

		let robotServiceInstance = Container.get("RobotService");

		const ctrl = new RobotService(repo as IRobotRepo,Container.get("RobotTypeRepo"),Container.get("TaskRepo"));

		// Act
		await ctrl.createRobot(body as  IRobotDTO);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({"id":"123","code": req.body.code,"name": req.body.name,"robotTypeId": req.body.robotTypeId,"number": req.body.number,"status": req.body.status,"description": req.body.description}));
	});

  it('fail createRobot robotService + Robot integration test using robotRepository stub', async function () {	
		// Arrange
		let body={
		}
        let req: Partial<Request> = {};
				req.body=body;

        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};
    
		let robotRepoInstance = Container.get("RobotRepo");
		const  repo=sinon.stub(robotRepoInstance, "save").returns(new Promise<Robot>((resolve, reject) => {
			resolve(Robot.create(body as IRobotDTO).errorValue())
		}));

		let robotServiceInstance = Container.get("BuildingConnectionService");

		const ctrl = new RobotService(repo as IRobotRepo,Container.get("RobotTypeRepo"),Container.get("TaskRepo"));

		// Act
		await ctrl.createRobot(body as  IRobotDTO);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({"error":"Must provide a building code(max 5 characters)"}));
	});

});


