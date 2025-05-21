import 'reflect-metadata';

import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import { Result } from '../../../src/core/logic/Result';
import RoomService from "../../../src/services/roomService";
import IRoomDTO from '../../../src/dto/IRoomDTO';
import { Room } from '../../../src/domain/room';
import IRoomRepo from '../../../src/services/IRepos/IRoomRepo';

describe('building service', function () {
	const sandbox = sinon.createSandbox();

	beforeEach(function() {
		Container.reset();
		let roomSchemaInstance = require("../../../src/persistence/schemas/roomSchema").default;
		Container.set("roomSchema", roomSchemaInstance);

		let roomRepoClass = require("../../../src/repos/roomRepo").default;
		let roomRepoInstance = Container.get(roomRepoClass);
		Container.set("RoomRepo", roomRepoInstance);
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

    it('createRoom roomService unit test using roomRepo and Room stub', async function () {
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
						"doorPosX":1,"doorPosY":1
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
            "height": req.body.height,"doorPosX":req.body.doorPosX,"doorPosY":req.body.doorPosY
        }));

		let roomRepoInstance = Container.get("RoomRepo");
		const   repo=sinon.stub(roomRepoInstance, "save").returns(new Promise<Room>((resolve, reject) => {
			resolve(Room.create({
                "id":"123", 
			    "floorId": req.body.floorId,
			    "name": req.body.name,
                "category": req.body.category,
                "description": req.body.description,
			    "posX": req.body.posX,
			    "posY": req.body.posY,
                "width": req.body.width,
                "height": req.body.height,"doorPosX":req.body.doorPosX,"doorPosY":req.body.doorPosY
            }).getValue())
		}));

		const service = new RoomService(repo as IRoomRepo,Container.get("FloorRepo"));

		// Act
		await service.createRoom(body as IRoomDTO);

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
            "height": req.body.height,"doorPosX":req.body.doorPosX,"doorPosY":req.body.doorPosY
        }));
	});

  it('fail createRoom roomService unit test using roomRepo and Room stub', async function () {
		// Arrange
        let body = { 
            "floorId": "123",
            "name": "abc",
            "category": "a",
            "description": "qwe",
            "posX": 1,
            "posY": 2,
            "width": 3,
            "height": 4,"doorPosX":1,"doorPosY":1
        };
        let req: Partial<Request> = {};
		req.body = body;
        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};
    
        sinon.stub(Room, "create").returns(Result.fail({"error":"aaaaaaaaaaaaaa"}));

		let roomRepoInstance = Container.get("RoomRepo");
		const repo=sinon.stub(roomRepoInstance, "save").returns(new Promise<Room>((resolve, reject) => {
			resolve(Room.create({
                "id":"123", 
			    "floorId": req.body.floorId,
			    "name": req.body.name,
                "category": req.body.category,
                "description": req.body.description,
			    "posX": req.body.posX,
			    "posY": req.body.posY,
                "width": req.body.width,
                "height": req.body.height,"doorPosX":req.body.doorPosX,"doorPosY":req.body.doorPosY
            }).getValue())
		}));

		const service = new RoomService(repo as IRoomRepo,Container.get("FloorRepo"));

		// Act
		await service.createRoom(body as IRoomDTO);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({"error":"aaaaaaaaaaaaaa"}));
	});


  //INTEGRATION   TESTS

  it('createRoom roomService + Room integration test using roomRepository stub', async function () {	
		// Arrange
		let body={
			"floorId": "123",
            "name": "abc",
            "category": "a",
            "description": "qwe",
            "posX": 1,
            "posY": 2,
            "width": 3,
            "height": 4,"doorPosX":1,"doorPosY":1
		}
        let req: Partial<Request> = {};
				req.body=body;

        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};
    
		let roomRepoInstance = Container.get("RoomRepo");
		const  repo=sinon.stub(roomRepoInstance, "save").returns(new Promise<Room>((resolve, reject) => {
			resolve(Room.create(body  as   IRoomDTO).getValue())
		}));

		let roomServiceInstance = Container.get("RoomService");

		const ctrl = new RoomService(repo as IRoomRepo,Container.get("FloorRepo"));

		// Act
		await ctrl.createRoom(body as  IRoomDTO);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({"id":"123","floorId": req.body.floorId,"name": req.body.name,"category": req.body.category,"description": req.body.description,"posX": req.body.posX,"posY": req.body.posY,"width": req.body.width,"height": req.body.height,"doorPosX":req.body.doorPosX,"doorPosY":req.body.doorPosY}));
	});

  it('fail createRoom roomService + Room integration test using roomRepository stub', async function () {	
		// Arrange
		let body={
		}
        let req: Partial<Request> = {};
				req.body=body;

        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};
    
		let roomRepoInstance = Container.get("RoomRepo");
		const  repo=sinon.stub(roomRepoInstance, "save").returns(new Promise<Room>((resolve, reject) => {
			resolve(Room.create(body as IRoomDTO).errorValue())
		}));

		let roomServiceInstance = Container.get("RoomService");

		const ctrl = new RoomService(repo as IRoomRepo,Container.get("FloorRepo"));

		// Act
		await ctrl.createRoom(body as  IRoomDTO);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({"error":"Must provide a building code(max 5 characters)"}));
	});

});


