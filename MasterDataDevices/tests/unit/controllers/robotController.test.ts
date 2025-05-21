import 'reflect-metadata';

import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import { Result } from '../../../src/core/logic/Result';
import IRobotService from "../../../src/services/IServices/IRobotService";
import RobotController from "../../../src/controllers/robotController";
import IRobotDTO from '../../../src/dto/IRobotDTO';
import { Robot } from '../../../src/domain/robot';

describe('robot controller', function () {
	const sandbox = sinon.createSandbox();

	beforeEach(function() {
		Container.reset();
		let robotSchemaInstance = require("../../../src/persistence/schemas/robotSchema").default;
		Container.set("robotSchema", robotSchemaInstance);

		let robotRepoClass = require("../../../src/repos/robotRepo").default;
		let robotRepoInstance = Container.get(robotRepoClass);
		Container.set("RobotRepo", robotRepoInstance);

		let robotTypeSchemaInstance = require("../../../src/persistence/schemas/robotTypeSchema").default;
		Container.set("robotTypeSchema", robotTypeSchemaInstance);

		let robotTypeRepoClass = require("../../../src/repos/robotTypeRepo").default;
		let robotTypeRepoInstance = Container.get(robotTypeRepoClass);
		Container.set("RobotTypeRepo", robotTypeRepoInstance);

		let robotServiceClass = require("../../../src/services/robotService").default;
		let robotServiceInstance = Container.get(robotServiceClass);
		Container.set("RobotService", robotServiceInstance);
    });

	afterEach(function() {
		sandbox.restore();
	});

	//UNIT TESTS

    it('createRobot robotController unit test using robotService stub', async function () {
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

		let robotServiceInstance = Container.get("RobotService");
		const service=sinon.stub(robotServiceInstance, "createRobot").returns( Result.ok<IRobotDTO>( {
      		"id":"123", 
			"code": req.body.code,
            "name": req.body.name,
			"robotTypeId": req.body.robotTypeId,
			"number": req.body.number,
			"status": req.body.status,
            "description": req.body.description
		} ));

		const ctrl = new RobotController(service as IRobotService);

		// Act
		await ctrl.createRobot(<Request>req, <Response>res, <NextFunction>next);

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

	it('createRobot robotController unit test using robotService stub fail', async function () {
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

		let robotServiceInstance = Container.get("RobotService");
		const service=sinon.stub(robotServiceInstance, "createRobot").returns( Result.fail<IRobotDTO>({
			"error":"aaaaaaaaaaaaaaaaaa"
		}));

		const ctrl = new RobotController(service as IRobotService);

		// Act
		await ctrl.createRobot(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({"error":"aaaaaaaaaaaaaaaaaa"}));
	});

	it('disableRobot  robotController unit test using robotService stub', async function () {
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

		let robotServiceInstance = Container.get("RobotService");
		const service=sinon.stub(robotServiceInstance, "updateRobot").returns( Result.ok<IRobotDTO>( {
			"id":"123", 
			"code": req.body.code,
            "name": req.body.name,
			"robotTypeId": req.body.robotTypeId,
			"number": req.body.number,
			"status": req.body.status,
            "description": req.body.description
		} ));

		const ctrl = new RobotController(service as IRobotService);

		// Act
		await ctrl.disableRobot(<Request>req, <Response>res, <NextFunction>next);

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

	it('fail disableRobot  robotController unit test using robotService stub', async function () {
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

		let robotServiceInstance = Container.get("RobotService");
		const service=sinon.stub(robotServiceInstance, "updateRobot").returns( Result.fail<IRobotDTO>( {
      		"error":"aaaaaaaaaaaaaaaaaa"
		} ));

		const ctrl = new RobotController(service as IRobotService);

		// Act
		await ctrl.disableRobot(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({"error":"aaaaaaaaaaaaaaaaaa"}));
	});






	//INTEGRATION  TESTS

    it('createRobot robotController + robotService integration test using robotRepository and robot stubs', async function () {	
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

		let robotServiceInstance = Container.get("RobotService");

		const ctrl = new RobotController(robotServiceInstance as IRobotService);

		// Act
		await ctrl.createRobot(<Request>req, <Response>res, <NextFunction>next);

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

	it('fail createRobot robotController + robotService integration test using robotRepository and robot stubs', async function () {	
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

		sinon.stub(Robot, "create").returns(Result.fail({"error":"aaaaaaaaaaaaaaaaaa"}));

		let robotRepoInstance = Container.get("RobotRepo");
		sinon.stub(robotRepoInstance, "save").returns(new Promise<Robot>((resolve, reject) => {
			resolve(Robot.create(body as IRobotDTO).errorValue())
		}));

		let robotServiceInstance = Container.get("RobotService");

		const ctrl = new RobotController(robotServiceInstance as IRobotService);

		// Act
		await ctrl.createRobot(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({"error":"aaaaaaaaaaaaaaaaaa"}));
	});

	it('disableRobot robotController + robotService integration test using robotRepository and robot stubs', async function () {	
		// Arrange
		let body={
			"id":"123",
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
		sinon.stub(robotRepoInstance, "findByDomainId").returns(new Promise<Robot>((resolve, reject) => {
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

		let robotServiceInstance = Container.get("RobotService");

		const ctrl = new RobotController(robotServiceInstance as IRobotService);

		// Act
		await ctrl.disableRobot(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({"id":"123","code": req.body.code,"name": req.body.name,"robotTypeId": req.body.robotTypeId,"number": req.body.number,"status": req.body.status,"description": req.body.description}));
	});

	it('fail disableRobot robotController + robotService integration test using robotRepository and robot stubs', async function () {	
		// Arrange
		let body={
		}
        let req: Partial<Request> = {};
				req.body=body;

        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		sinon.stub(Robot, "create").returns(Result.fail({"error":"aaaaaaaaaa"}));

		let robotRepoInstance = Container.get("RobotRepo");
		sinon.stub(robotRepoInstance, "findByDomainId").returns(new Promise<Robot>((resolve, reject) => {
			resolve(Robot.create(body  as IRobotDTO).errorValue())
		}));

		sinon.stub(robotRepoInstance, "save").returns(new Promise<Robot>((resolve, reject) => {
			resolve(Robot.create(body  as IRobotDTO).errorValue())
		}));

		let robotServiceInstance = Container.get("RobotService");

		const ctrl = new RobotController(robotServiceInstance as IRobotService);

		// Act
		await ctrl.disableRobot(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({"id":"123","code": req.body.code,"name": req.body.name,"robotTypeId": req.body.robotTypeId,"number": req.body.number,"status": req.body.status,"description": req.body.description}));
	});

});


