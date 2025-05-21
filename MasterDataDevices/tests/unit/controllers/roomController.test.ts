import 'reflect-metadata';

import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import { Result } from '../../../src/core/logic/Result';
import IRoomService from "../../../src/services/IServices/IRoomService";
import RoomController from "../../../src/controllers/roomController";
import IRoomDTO from '../../../src/dto/IRoomDTO';
import { Room } from '../../../src/domain/room';

describe('buildingConnection controller', function () {
	const sandbox = sinon.createSandbox();

	beforeEach(function() {
		Container.reset();
		let roomSchemaInstance = require("../../../src/persistence/schemas/roomSchema").default;
		Container.set("roomSchema", roomSchemaInstance);

		let roomRepoClass = require("../../../src/repos/roomRepo").default;
		let roomRepoInstance = Container.get(roomRepoClass);
		Container.set("RoomRepo", roomRepoInstance);

		let floorSchemaInstance = require("../../../src/persistence/schemas/floorSchema").default;
		Container.set("floorSchema", floorSchemaInstance);

		let floorRepoClass = require("../../../src/repos/floorRepo").default;
		let floorRepoInstance = Container.get(floorRepoClass);
		Container.set("FloorRepo", floorRepoInstance);

		let roomServiceClass = require("../../../src/services/roomService").default;
		let roomServiceInstance = Container.get(roomServiceClass);
		Container.set("RoomService", roomServiceInstance);
    });

	afterEach(function() {
		sandbox.restore();
	});

	//UNIT TESTS

    it('createRoom  roomController unit test using roomService stub', async function () {
		// Arrange
        let body = { 
			"floorId": "123",
            "name": "abc",
            "category": "a",
            "description": "qwe",
            "posX": 1,
            "posY": 2,
            "width": 3,
            "height": 4,
						"doorPosX":1,
						"doorPosY":2
		};
        let req: Partial<Request> = {};
		req.body = body;
        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		let roomServiceInstance = Container.get("RoomService");
		const service=sinon.stub(roomServiceInstance, "createRoom").returns( Result.ok<IRoomDTO>( {
      		"id":"123", 
			"floorId": req.body.floorId,
			"name": req.body.name,
            "category": req.body.category,
            "description": req.body.description,
			"posX": req.body.posX,
			"posY": req.body.posY,
            "width": req.body.width,
            "height": req.body.height,
						"doorPosX":req.body.doorPosX,
						"doorPosY":req.body.doorPosY
		} ));

		const ctrl = new RoomController(service as IRoomService);

		// Act
		await ctrl.createRoom(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({ 
			"id":"123", 
			"floorId": req.body.floorId,
			"name": req.body.name,
            "category": req.body.category,
            "description": req.body.description,
			"posX": req.body.posX,
			"posY": req.body.posY,
            "width": req.body.width,
            "height": req.body.height,
						"doorPosX":req.body.doorPosX,
						"doorPosY":req.body.doorPosY
		}));
	});

	it('createRoom  roomController unit test using roomService stub fail', async function () {
		// Arrange
        let body = { 
			"floorId": "123",
            "name": "abc",
            "category": "a",
            "description": "qwe",
            "posX": 1,
            "posY": 2,
            "width": 3,
            "height": 4,
						"doorPosX":2,
						"doorPosY":2
		};
        let req: Partial<Request> = {};
		req.body = body;
        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		let roomServiceInstance = Container.get("RoomService");
		const service=sinon.stub(roomServiceInstance, "createRoom").returns( Result.fail<IRoomDTO>({
			"error":"aaaaaaaaaaaaaaaaaa"
		}));

		const ctrl = new RoomController(service as IRoomService);

		// Act
		await ctrl.createRoom(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({"error":"aaaaaaaaaaaaaaaaaa"}));
	});







	//INTEGRATION  TESTS

    it('createRoom roomController + roomService integration test using roomRepository and room stubs', async function () {	
		// Arrange	
        let body = {
			"floorId": "123",
            "name": "abc",
            "category": "a",
            "description": "qwe",
            "posX": 1,
            "posY": 2,
            "width": 3,
            "height": 4,
						"doorPosX":2,
						"doorPosY":2
		};
        let req: Partial<Request> = {};
		req.body = body;

        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		sinon.stub(Room, "create").returns(Result.ok({
			"id":"123", 
			"floorId": req.body.floorId,
			"name": req.body.name,
            "category": req.body.category,
            "description": req.body.description,
			"posX": req.body.posX,
			"posY": req.body.posY,
            "width": req.body.width,
            "height": req.body.height,
						"doorPosX":req.body.doorPosX,
						"doorPosY":req.body.doorPosY
		}));

		let roomRepoInstance = Container.get("RoomRepo");
		sinon.stub(roomRepoInstance, "save").returns(new Promise<Room>((resolve, reject) => {
			resolve(Room.create({
				"id":"123", 
				"floorId": req.body.floorId,
			    "name": req.body.name,
                "category": req.body.category,
                "description": req.body.description,
			    "posX": req.body.posX,
			    "posY": req.body.posY,
                "width": req.body.width,
                "height": req.body.height,
								"doorPosX":req.body.doorPosX,
								"doorPosY":req.body.doorPosY
			}).getValue())
		}));

		let roomServiceInstance = Container.get("RoomService");

		const ctrl = new RoomController(roomServiceInstance as IRoomService);

		// Act
		await ctrl.createRoom(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({
			"id":"123", 
			"floorId": req.body.floorId,
			"name": req.body.name,
            "category": req.body.category,
            "description": req.body.description,
			"posX": req.body.posX,
			"posY": req.body.posY,
            "width": req.body.width,
            "height": req.body.height,
						"doorPosX":req.body.doorPosX,
						"doorPosY":req.body.doorPosY
		}));
	});

	it('fail createRoom roomController + roomService integration test using roomRepository and room stubs', async function () {	
		// Arrange	
        let body = {
			"floorId": "123",
            "name": "abc",
            "category": "a",
            "description": "qwe",
            "posX": 1,
            "posY": 2,
            "width": 3,
            "height": 4,
						"doorPosX":2,
						"doorPosY":2
		};
        let req: Partial<Request> = {};
		req.body = body;

        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		sinon.stub(Room, "create").returns(Result.fail({"error":"aaaaaaaaaaaaaaaaaa"}));

		let roomRepoInstance = Container.get("RoomRepo");
		sinon.stub(roomRepoInstance, "save").returns(new Promise<Room>((resolve, reject) => {
			resolve(Room.create(body as IRoomDTO).errorValue())
		}));

		let roomServiceInstance = Container.get("RoomService");

		const ctrl = new RoomController(roomServiceInstance as IRoomService);

		// Act
		await ctrl.createRoom(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({"error":"aaaaaaaaaaaaaaaaaa"}));
	});

});


