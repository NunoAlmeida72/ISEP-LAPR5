import 'reflect-metadata';

import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import { Result } from '../../../src/core/logic/Result';
import IRobotTypeService from "../../../src/services/IServices/IRobotTypeService";
import RobotTypeController from "../../../src/controllers/robotTypeController";
import IRobotTypeDTO from '../../../src/dto/IRobotTypeDTO';
import { RobotType } from '../../../src/domain/robotType';

describe('robotType controller', function () {
	const sandbox = sinon.createSandbox();

	beforeEach(function() {
    Container.reset();
		let robotTypeSchemaInstance = require("../../../src/persistence/schemas/robotTypeSchema").default;
		Container.set("robotTypeSchema", robotTypeSchemaInstance);

		let robotTypeRepoClass = require("../../../src/repos/robotTypeRepo").default;
		let robotTypeRepoInstance = Container.get(robotTypeRepoClass);
		Container.set("RobotTypeRepo", robotTypeRepoInstance);

		let robotTypeServiceClass = require("../../../src/services/robotTypeService").default;
		let robotTypeServiceInstance = Container.get(robotTypeServiceClass);
		Container.set("RobotTypeService", robotTypeServiceInstance);
    });

	afterEach(function() {
		sandbox.restore();
	});

	//UNIT TESTS

    it('createRobotType robotTypeController unit test using robotTypeService stub', async function () {
		// Arrange
    let body = { 
      type: "tipo",
      brand: "acer",
      model: "nitro",
      possibleTasks: []};
        let req: Partial<Request> = {};
		req.body = body;
        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		let robotTypeServiceInstance = Container.get("RobotTypeService");
		const service=sinon.stub(robotTypeServiceInstance, "createRobotType").returns( Result.ok<IRobotTypeDTO>( {
      "id":"123",  
        type: req.body.type,
        brand: req.body.brand,
        model: req.body.model,
        possibleTasks: req.body.possibleTasks}
         ));

		const ctrl = new RobotTypeController(service as IRobotTypeService);

		// Act
		await ctrl.createRobotType(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({ 
      "id":"123",  
        type: req.body.type,
        brand: req.body.brand,
        model: req.body.model,
        possibleTasks: req.body.possibleTasks}));
	});

  it('fail createRobotType robotTypeController unit test using robotTypeService stub', async function () {
		// Arrange
    let body = { 
      type: "tipo",
      brand: "acer",
      model: "nitro",
      possibleTasks: []};
        let req: Partial<Request> = {};
		req.body = body;
        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		let robotTypeServiceInstance = Container.get("RobotTypeService");
		const service=sinon.stub(robotTypeServiceInstance, "createRobotType").returns( Result.fail<IRobotTypeDTO>( {
      "error":"aaaaaaaaaaaaa"}
         ));

		const ctrl = new RobotTypeController(service as IRobotTypeService);

		// Act
		await ctrl.createRobotType(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({ 
      "error":"aaaaaaaaaaaaa"}));
	});

	//INTEGRATION  TESTS

    it('createRobotType robotTypeController + robotTypeService integration test using robotTypeRepoistory and robotType stubs', async function () {	
		// Arrange	
        let body = { type: "tipo",
        brand: "acer",
        model: "nitro",
        possibleTasks: [],
			id:"" };
        let req: Partial<Request> = {};
		req.body = body;

        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		sinon.stub(RobotType, "create").returns(Result.ok({"id":"123",
        type: req.body.type,
        brand: req.body.brand,
        model: req.body.model,
        possibleTasks: req.body.possibleTasks}));

		let robotTypeRepoInstance = Container.get("robotTypeRepo");
		sinon.stub(robotTypeRepoInstance, "save").returns(new Promise<RobotType>((resolve, reject) => {
			resolve(RobotType.create(body as IRobotTypeDTO).getValue())
		}));

		let robotTypeServiceInstance = Container.get("RobotTypeService");

		const ctrl = new RobotTypeController(robotTypeServiceInstance as IRobotTypeService);

		// Act
		await ctrl.createRobotType(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({ "id":"123",
    type: req.body.type,
    brand: req.body.brand,
    model: req.body.model,
    possibleTasks: req.body.possibleTasks}));
	});

  it('fail createRobotType robotTypeController + robotTypeService integration test using robotTypeRepoistory and robotType stubs', async function () {	
		// Arrange	
        let body = { };
        let req: Partial<Request> = {};
		req.body = body;

        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		sinon.stub(RobotType, "create").returns(Result.fail({"error":"aaaaaaaaaaa"}));

		let robotTypeRepoInstance = Container.get("robotTypeRepo");
		sinon.stub(robotTypeRepoInstance, "save").returns(new Promise<RobotType>((resolve, reject) => {
			resolve(RobotType.create(body as IRobotTypeDTO).errorValue())
		}));

		let robotTypeServiceInstance = Container.get("RobotTypeService");

		const ctrl = new RobotTypeController(robotTypeServiceInstance as IRobotTypeService);

		// Act
		await ctrl.createRobotType(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({"error":"aaaaaaaaaaa"}));
	});

	

});


