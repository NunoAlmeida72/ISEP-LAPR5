import 'reflect-metadata';

import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import { Result } from '../../../src/core/logic/Result';
import IElevatorService from "../../../src/services/IServices/IElevatorService";
import ElevatorController from "../../../src/controllers/elevatorController";
import IElevatorDTO from '../../../src/dto/IElevatorDTO';
import { Elevator } from '../../../src/domain/elevator';

describe('elevator controller', function () {
	const sandbox = sinon.createSandbox();

	beforeEach(function() {
		Container.reset();
		let elevatorSchemaInstance = require("../../../src/persistence/schemas/elevatorSchema").default;
		Container.set("elevatorSchema", elevatorSchemaInstance);

		let elevatorRepoClass = require("../../../src/repos/elevatorRepo").default;
		let elevatorRepoInstance = Container.get(elevatorRepoClass);
		Container.set("ElevatorRepo", elevatorRepoInstance);

		let floorSchemaInstance = require("../../../src/persistence/schemas/floorSchema").default;
		Container.set("floorSchema", floorSchemaInstance);

		let floorRepoClass = require("../../../src/repos/floorRepo").default;
		let floorRepoInstance = Container.get(floorRepoClass);
		Container.set("FloorRepo", floorRepoInstance);

		let elevatorServiceClass = require("../../../src/services/elevatorService").default;
		let elevatorServiceInstance = Container.get(elevatorServiceClass);
		Container.set("ElevatorService", elevatorServiceInstance);
    });

	afterEach(function() {
		sandbox.restore();
	});

    // UNIT TESTS

    it('createElevator elevatorController unit test using elevatorService stub', async function () {
		// Arrange
        let body = {
            "buildingId": '123',
            "floorsIds":[],
            "code": 'B101',
            "brand":"2dasdas",
            "model":"dasdas",
            "serialNumber": 'adasdasd',
            "description": 'A description',
            "posX":1,
            "posY":1
        };
        let req: Partial<Request> = {};
		req.body = body;
        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		let elevatorServiceInstance = Container.get("ElevatorService");
		const service=sinon.stub(elevatorServiceInstance, "createElevator").returns( Result.ok<IElevatorDTO>( {
            "id": "123",
            "buildingId": req.body.buildingId,
            "floorsIds": req.body.floorsIds,
            "code": req.body.code,
            "brand": req.body.brand,
            "model": req.body.model,
            "serialNumber": req.body.serialNumber,
            "description": req.body.description,
            "posX": req.body.posX,
            "posY": req.body.posY
        }));

		const ctrl = new ElevatorController(service as IElevatorService);

		// Act
		await ctrl.createElevator(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({ 
            "id": "123",
            "buildingId": req.body.buildingId,
            "floorsIds": req.body.floorsIds,
            "code": req.body.code,
            "brand": req.body.brand,
            "model": req.body.model,
            "serialNumber": req.body.serialNumber,
            "description": req.body.description,
            "posX": req.body.posX,
            "posY": req.body.posY
        }));
	});

    it('createElevator elevatorController unit test using elevatorService stub fail', async function () {
		// Arrange
        let body = {
            "buildingId": '123',
            "floorsIds":[],
            "code": 'B101',
            "brand":"2dasdas",
            "model":"dasdas",
            "serialNumber": 'adasdasd',
            "description": 'A description',
            "posX":1,
            "posY":1
        };
        let req: Partial<Request> = {};
		req.body = body;
        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		let elevatorServiceInstance = Container.get("ElevatorService");
		const service=sinon.stub(elevatorServiceInstance, "createElevator").returns( Result.fail<IElevatorDTO>( {
      "error":"test_error"
		} ));

		const ctrl = new ElevatorController(service as IElevatorService);

		// Act
		await ctrl.createElevator(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({"error":"test_error"}));
	});

    it('updateElevator elevatorController unit test using elevatorService stub', async function () {
		// Arrange
        let body = {
            "id" : '123',
            "buildingId": '123',
            "floorsIds":[],
            "code": 'B101',
            "brand":"2dasdas",
            "model":"dasdas",
            "serialNumber": 'adasdasd',
            "description": 'A different description',
            "posX":1,
            "posY":1
        };
        let req: Partial<Request> = {};
		req.body = body;
        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		let elevatorServiceInstance = Container.get("ElevatorService");
		const service=sinon.stub(elevatorServiceInstance, "updateElevator").returns( Result.ok<IElevatorDTO>( {
            "id": "123",
            "buildingId": req.body.buildingId,
            "floorsIds": req.body.floorsIds,
            "code": req.body.code,
            "brand": req.body.brand,
            "model": req.body.model,
            "serialNumber": req.body.serialNumber,
            "description": req.body.description,
            "posX": req.body.posX,
            "posY": req.body.posY
		} ));

		const ctrl = new ElevatorController(service as IElevatorService);

		// Act
		await ctrl.updateElevator(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({ 
            "id": "123",
            "buildingId": req.body.buildingId,
            "floorsIds": req.body.floorsIds,
            "code": req.body.code,
            "brand": req.body.brand,
            "model": req.body.model,
            "serialNumber": req.body.serialNumber,
            "description": req.body.description,
            "posX": req.body.posX,
            "posY": req.body.posY
        }));
	});

	it('fail updateElevator elevatorController unit test using elevatorService stub', async function () {
		// Arrange
        let body = {
            "id" : '123',
            "buildingId": '123',
            "floorsIds":[],
            "code": 'B101',
            "brand":"2dasdas",
            "model":"dasdas",
            "serialNumber": 'adasdasd',
            "description": 'A different description',
            "posX":1,
            "posY":1
        };
        let req: Partial<Request> = {};
		req.body = body;
        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		let elevatorServiceInstance = Container.get("ElevatorService");
		const service=sinon.stub(elevatorServiceInstance, "updateElevator").returns( Result.fail<IElevatorDTO>( {
      "error":"test_error"
		} ));

		const ctrl = new ElevatorController(service as IElevatorService);

		// Act
		await ctrl.updateElevator(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({ 
      "error":"test_error"}));
	});

    it('listElevators elevatorController unit test using elevatorService stub', async function () {
		// Arrange
        let req: Partial<Request> = {};
        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		let elevatorServiceInstance = Container.get("ElevatorService");
		const service=sinon.stub(elevatorServiceInstance, "listElevators").returns( Result.ok<IElevatorDTO>( {
            "id": "123",
            "buildingId": req.body.buildingId,
            "floorsIds": req.body.floorsIds,
            "code": req.body.code,
            "brand": req.body.brand,
            "model": req.body.model,
            "serialNumber": req.body.serialNumber,
            "description": req.body.description,
            "posX": req.body.posX,
            "posY": req.body.posY
		} ));

		const ctrl = new ElevatorController(service as IElevatorService);

		// Act
		await ctrl.listElevators(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({
            "id": "123",
            "buildingId": req.body.buildingId,
            "floorsIds": req.body.floorsIds,
            "code": req.body.code,
            "brand": req.body.brand,
            "model": req.body.model,
            "serialNumber": req.body.serialNumber,
            "description": req.body.description,
            "posX": req.body.posX,
            "posY": req.body.posY
        }));
	});

	it('fail listElevators elevatorController unit test using elevatorService stub', async function () {
		// Arrange
        let req: Partial<Request> = {};
        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		let elevatorServiceInstance = Container.get("ElevatorService");
		const service=sinon.stub(elevatorServiceInstance, "listElevators").returns( Result.fail<IElevatorDTO>( {
      "error":"test_error"
		} ));

		const ctrl = new ElevatorController(service as IElevatorService);

		// Act
		await ctrl.listElevators(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({"id":"123", 
		"error":"test_error"}));
	});

	//INTEGRATION  TESTS

    it('createElevator elevatorController + elevatorService integration test using elevatorRepository and elevator stubs', async function () {	
		// Arrange	
        let body = {
            "buildingId": '123',
            "floorsIds":[],
            "code": 'B101',
            "brand":"2dasdas",
            "model":"dasdas",
            "serialNumber": 'adasdasd',
            "description": 'A description',
            "posX":1,
            "posY":1
        };
        let req: Partial<Request> = {};
		req.body = body;

        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		sinon.stub(Elevator, "create").returns(Result.ok({
            "id": "123",
            "buildingId": req.body.buildingId,
            "floorsIds": req.body.floorsIds,
            "code": req.body.code,
            "brand": req.body.brand,
            "model": req.body.model,
            "serialNumber": req.body.serialNumber,
            "description": req.body.description,
            "posX": req.body.posX,
            "posY": req.body.posY
        }));

		let elevatorRepoInstance = Container.get("ElevatorRepo");
		sinon.stub(elevatorRepoInstance, "save").returns(new Promise<Elevator>((resolve, reject) => {
			resolve(Elevator.create({
                "id": "123",
                "buildingId": req.body.buildingId,
                "floorsIds": req.body.floorsIds,
                "code": req.body.code,
                "brand": req.body.brand,
                "model": req.body.model,
                "serialNumber": req.body.serialNumber,
                "description": req.body.description,
                "posX": req.body.posX,
                "posY": req.body.posY
            }).getValue())
		}));

		let elevatorServiceInstance = Container.get("ElevatorService");

		const ctrl = new ElevatorController(elevatorServiceInstance as IElevatorService);

		// Act
		await ctrl.createElevator(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({ 
            "id": "123",
            "buildingId": req.body.buildingId,
            "floorsIds": req.body.floorsIds,
            "code": req.body.code,
            "brand": req.body.brand,
            "model": req.body.model,
            "serialNumber": req.body.serialNumber,
            "description": req.body.description,
            "posX": req.body.posX,
            "posY": req.body.posY
        }));
	});

	it('fail createElevator elevatorController + elevatorService integration test using elevatorRepository and elevator stubs', async function () {	
		// Arrange	
        let body = { 
            "id": '123',
            "buildingId": '123',
            "floorsIds":[],
            "code": 'B101',
            "brand":"2dasdas",
            "model":"dasdas",
            "serialNumber": 'adasdasd',
            "description": 'A description',
            "posX":1,
            "posY":1
        };
        let req: Partial<Request> = {};
		req.body = body;

        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		sinon.stub(Elevator, "create").returns(Result.fail({"error":"test_error"}));

		let elevatorRepoInstance = Container.get("ElevatorRepo");
		sinon.stub(elevatorRepoInstance, "save").returns(new Promise<Elevator>((resolve, reject) => {
			resolve(Elevator.create(body as IElevatorDTO).errorValue())
		}));

		let elevatorServiceInstance = Container.get("ElevatorService");

		const ctrl = new ElevatorController(elevatorServiceInstance as IElevatorService);

		// Act
		await ctrl.createElevator(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({ "error":"test_error"}));
	});

	it('updateElevator elevatorController + elevatorService integration test using elevatorRepository and elevator stubs', async function () {	
		// Arrange
		let body={
			"id": '123',
            "buildingId": '123',
            "floorsIds":[],
            "code": 'B101',
            "brand":"2dasdas",
            "model":"dasdas",
            "serialNumber": 'adasdasd',
            "description": 'A different description',
            "posX":1,
            "posY":1
		}
        let req: Partial<Request> = {};
				req.body=body;

        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		sinon.stub(Elevator, "create").returns(Result.ok({
            "id": "123",
            "buildingId": req.body.buildingId,
            "floorsIds": req.body.floorsIds,
            "code": req.body.code,
            "brand": req.body.brand,
            "model": req.body.model,
            "serialNumber": req.body.serialNumber,
            "description": req.body.description,
            "posX": req.body.posX,
            "posY": req.body.posY
        }));

		let elevatorRepoInstance = Container.get("ElevatorRepo");
		sinon.stub(elevatorRepoInstance, "findByDomainId").returns(new Promise<Elevator>((resolve, reject) => {
			resolve(Elevator.create({
                "id": "123",
                "buildingId": req.body.buildingId,
                "floorsIds": req.body.floorsIds,
                "code": req.body.code,
                "brand": req.body.brand,
                "model": req.body.model,
                "serialNumber": req.body.serialNumber,
                "description": req.body.description,
                "posX": req.body.posX,
                "posY": req.body.posY
            }).getValue())
		}));

		sinon.stub(elevatorRepoInstance, "save").returns(new Promise<Elevator>((resolve, reject) => {
			resolve(Elevator.create({
                "id": "123",
                "buildingId": req.body.buildingId,
                "floorsIds": req.body.floorsIds,
                "code": req.body.code,
                "brand": req.body.brand,
                "model": req.body.model,
                "serialNumber": req.body.serialNumber,
                "description": req.body.description,
                "posX": req.body.posX,
                "posY": req.body.posY
            }).getValue())
        }));

		let elevatorServiceInstance = Container.get("ElevatorService");

		const ctrl = new ElevatorController(elevatorServiceInstance as IElevatorService);

		// Act
		await ctrl.updateElevator(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({
            "id": "123",
            "buildingId": req.body.buildingId,
            "floorsIds": req.body.floorsIds,
            "code": req.body.code,
            "brand": req.body.brand,
            "model": req.body.model,
            "serialNumber": req.body.serialNumber,
            "description": req.body.description,
            "posX": req.body.posX,
            "posY": req.body.posY
        }));
	});

	it('fail updateElevator elevatorController + elevatorService integration test using elevatorRepository and elevator stubs', async function () {	
		// Arrange
		let body={
		}
        let req: Partial<Request> = {};
				req.body=body;

        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		sinon.stub(Elevator, "create").returns(Result.fail({"error":"test_error"}));

		let elevatorRepoInstance = Container.get("ElevatorRepo");
		sinon.stub(elevatorRepoInstance, "findByDomainId").returns(new Promise<Elevator>((resolve, reject) => {
			resolve(Elevator.create(body as IElevatorDTO).errorValue())
		}));

		sinon.stub(elevatorRepoInstance, "save").returns(new Promise<Elevator>((resolve, reject) => {
			resolve(Elevator.create(body as IElevatorDTO).errorValue())
		}));

		let elevatorServiceInstance = Container.get("ElevatorService");

		const ctrl = new ElevatorController(elevatorServiceInstance as IElevatorService);

		// Act
		await ctrl.updateElevator(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({
            "id": "123",
            "buildingId": req.body.buildingId,
            "floorsIds": req.body.floorsIds,
            "code": req.body.code,
            "brand": req.body.brand,
            "model": req.body.model,
            "serialNumber": req.body.serialNumber,
            "description": req.body.description,
            "posX": req.body.posX,
            "posY": req.body.posY
        }));
	});

    it('listElevators elevatorController + elevatorService integration test using elevatorRepository and elevator stubs', async function () {	
		// Arrange	
        let req: Partial<Request> = {};
        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		sinon.stub(Elevator, "create").returns(Result.ok({
            "id": '123',
            "buildingId": '123',
            "floorsIds":[],
            "code": 'B101',
            "brand":"2dasdas",
            "model":"dasdas",
            "serialNumber": 'adasdasd',
            "description": 'A description',
            "posX":1,
            "posY":1
        }));

		let elevatorRepoInstance = Container.get("ElevatorRepo");
		sinon.stub(elevatorRepoInstance, "findAll").returns(new Promise<Elevator>((resolve, reject) => {
			resolve(Elevator.create({
                "id": '123',
                "buildingId": '123',
                "floorsIds":[],
                "code": 'B101',
                "brand":"2dasdas",
                "model":"dasdas",
                "serialNumber": 'adasdasd',
                "description": 'A different description',
                "posX":1,
                "posY":1
            }).getValue())
		}));

		let elevatorServiceInstance = Container.get("ElevatorService");

		const ctrl = new ElevatorController(elevatorServiceInstance as IElevatorService);

		// Act
		await ctrl.listElevators(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({
            "id": "123",
            "buildingId": req.body.buildingId,
            "floorsIds": req.body.floorsIds,
            "code": req.body.code,
            "brand": req.body.brand,
            "model": req.body.model,
            "serialNumber": req.body.serialNumber,
            "description": req.body.description,
            "posX": req.body.posX,
            "posY": req.body.posY
        }));
	});

});


