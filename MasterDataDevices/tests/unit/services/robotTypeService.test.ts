import 'reflect-metadata';

import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import { Result } from '../../../src/core/logic/Result';
import RobotTypeService from "../../../src/services/robotTypeService";
import IRobotTypeDTO from '../../../src/dto/IRobotTypeDTO';
import { RobotType } from '../../../src/domain/robotType';
import IRobotTypeRepo from '../../../src/services/IRepos/IRobotTypeRepo';
import { Task } from '../../../src/domain/task';
import ITaskDTO from '../../../src/dto/ITaskDTO';
import ITaskRepo from '../../../src/services/IRepos/ITaskRepo';

describe('robotType service', function () {
	const sandbox = sinon.createSandbox();

	beforeEach(function() {
		Container.reset();

		let taskSchemaInstance = require("../../../src/persistence/schemas/taskSchema").default;
		Container.set("taskSchema", taskSchemaInstance);

		let taskRepoClass = require("../../../src/repos/taskRepo").default;
		let taskRepoInstance = Container.get(taskRepoClass);
		Container.set("TaskRepo", taskRepoInstance);


		let robotTypeSchemaInstance = require("../../../src/persistence/schemas/robotTypeSchema").default;
		Container.set("robotTypeSchema", robotTypeSchemaInstance);

		let robotTypeRepoClass = require("../../../src/repos/robotTypeRepo").default;
		let robotTypeRepoInstance = Container.get(robotTypeRepoClass);
		Container.set("RobotTypeRepo", robotTypeRepoInstance);
  });

	afterEach(function() {
		sandbox.restore();
	});

	//UNIT TESTS

    it('createRobotType  robotTypeService unit test using robotTypeRepo and robotType stub', async function () {
		// Arrange
        let body = { 
          type: "tipo",
          brand: "acer",
          model: "nitro",
          possibleTasks: ["surveillance"]};
        let req: Partial<Request> = {};
		req.body = body;
        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		let taskRepoInstance = Container.get("TaskRepo");
		const  taskRepo=sinon.stub(taskRepoInstance, "findByDomainId").returns(new Promise<Task>((resolve, reject) => {
			resolve(Task.create({id:"11",name:"asdasd"} as ITaskDTO).getValue())
		}));
    
    sinon.stub(RobotType, "create").returns(Result.ok({"id":"123", 
		"type": req.body.type,
		"brand":req.body.brand,
		"model": req.body.model,
		"possibleTasks": req.body.possibleTasks}));

		let robotTypeRepoInstance = Container.get("RobotTypeRepo");
		const   repo=sinon.stub(robotTypeRepoInstance, "save").returns(new Promise<RobotType>((resolve, reject) => {
			resolve(RobotType.create(body  as IRobotTypeDTO).getValue())
		}));

		const service = new RobotTypeService(repo as IRobotTypeRepo,taskRepo as ITaskRepo);

		// Act
		await service.createRobotType(body as IRobotTypeDTO);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({ 
      "id":"123", 
		"type": req.body.type,
		"brand":req.body.brand,
		"model": req.body.model,
		"possibleTasks": req.body.possibleTasks}));
	});

  it('fail createRobotType  robotTypeService unit test using robotTypeRepo and robotType stub', async function () {
		// Arrange
        let body = { 
          type: "tipo",
          brand: "acer",
          model: "nitro",
          possibleTasks: ["surveillance"]};
        let req: Partial<Request> = {};
		req.body = body;
        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		let taskRepoInstance = Container.get("TaskRepo");
		const  taskRepo=sinon.stub(taskRepoInstance, "findByDomainId").returns(new Promise<Task>((resolve, reject) => {
			resolve(Task.create({id:"11",name:"asdasd"} as ITaskDTO).getValue())
		}));
    
    sinon.stub(RobotType, "create").returns(Result.fail({"error":"aaaaaaaaa"}));

		let robotTypeRepoInstance = Container.get("RobotTypeRepo");
		const   repo=sinon.stub(robotTypeRepoInstance, "save").returns(new Promise<RobotType>((resolve, reject) => {
			resolve(RobotType.create(body  as IRobotTypeDTO).getValue())
		}));

		const service = new RobotTypeService(repo as IRobotTypeRepo,taskRepo as ITaskRepo);

		// Act
		await service.createRobotType(body as IRobotTypeDTO);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({ 
      "error":"aaaaaaaaa"}));
	});


  //INTEGRATION   TESTS

  it('createRobotType robotTypeService + robotType integration test using robotTypeRepoistory stub', async function () {	
		// Arrange
		let body = { 
      type: "tipo",
      brand: "acer",
      model: "nitro",
      possibleTasks: ["surveillance"]};
        let req: Partial<Request> = {};
				req.body=body;

        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		let taskRepoInstance = Container.get("TaskRepo");
		const  taskRepo=sinon.stub(taskRepoInstance, "findByDomainId").returns(new Promise<Task>((resolve, reject) => {
			resolve(Task.create({id:"11",name:"asdasd"} as ITaskDTO).getValue())
		}));
    
		let robotTypeRepoInstance = Container.get("RobotTypeRepo");
		const  repo=sinon.stub(robotTypeRepoInstance, "save").returns(new Promise<RobotType>((resolve, reject) => {
			resolve(RobotType.create(body  as   IRobotTypeDTO).getValue())
		}));

		let robotTypeServiceInstance = Container.get("RobotTypeService");

		const ctrl = new RobotTypeService(repo as IRobotTypeRepo,taskRepo as ITaskRepo);

		// Act
		await ctrl.createRobotType(body as  IRobotTypeDTO);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({"name":req.body.name,"code":req.body.code,"description":req.body.description,"width":req.body.width,"depth": req.body.depth}));
	});

  it('fail createRobotType robotTypeService + robotType integration test using robotTypeRepoistory stub', async function () {	
		// Arrange
		let body = {};
        let req: Partial<Request> = {};
				req.body=body;

        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		let taskRepoInstance = Container.get("TaskRepo");
		const  taskRepo=sinon.stub(taskRepoInstance, "findByDomainId").returns(new Promise<Task>((resolve, reject) => {
			resolve(Task.create({id:"11",name:"asdasd"} as ITaskDTO).getValue())
		}));

    
		let robotTypeRepoInstance = Container.get("RobotTypeRepo");
		const  repo=sinon.stub(robotTypeRepoInstance, "save").returns(new Promise<RobotType>((resolve, reject) => {
			resolve(RobotType.create(body  as   IRobotTypeDTO).getValue())
		}));

		let robotTypeServiceInstance = Container.get("RobotTypeService");

		const ctrl = new RobotTypeService(repo as IRobotTypeRepo,taskRepo as ITaskRepo);

		// Act
		await ctrl.createRobotType(body as  IRobotTypeDTO);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({"error":"Must provide a Robot Type type (max 25 characters)"}));
	});

});


