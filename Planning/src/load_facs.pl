:- dynamic building/4.
:- dynamic elevator/6.
:- dynamic connection/9.
:- dynamic floors/2.
:- dynamic floor/5.
:- dynamic bc/2.
:- dynamic room/6.
:- dynamic rtTask/2.
:- dynamic robotType/5.
:- dynamic robot/7.
:-dynamic token/1.
:-dynamic taskRequest/6.
:-dynamic time_desloc/3.
:-dynamic initial_desloc/2.
:-dynamic final_desloc/2.
:- dynamic geracoes/1.
:- dynamic populacao/1.
:- dynamic prob_cruzamento/1.
:- dynamic prob_mutacao/1.
:- dynamic genetic_time/1.
:- dynamic min_value/1.


login_url("http://localhost:4001/api/auth/signin/").
email('1201293@isep.ipp.pt').
pass('123456ola').
buildings_url("http://localhost:4000/api/buildings/").
floors_url("http://localhost:4000/api/floors/").
connections_url("http://localhost:4000/api/buildingConnections/").
elevators_url("http://localhost:4000/api/elevators/").
rooms_url("http://localhost:4000/api/rooms/").
robots_url("http://localhost:4000/api/robots/").
robottypes_url("http://localhost:4000/api/robotTypes/").
robottypestasks_url("http://localhost:4000/api/robot-type-tasks/").
tasks_url("http://localhost:5000/api/taskrequest/by-robot/").

get_buildings(Res):-
        buildings_url(URL),
        token(AuthorizationHeader),
       http_open(URL,ResultJSON,[request_header('Authorization'=AuthorizationHeader)]),
       json_read_dict(ResultJSON, ResultObj),
       assertBuildings(ResultObj,Res),
       close(ResultJSON).


assertBuildings([],[]).
assertBuildings([H|T],[H.id|R]):-assertz(building(H.id,H.code,H.width,H.depth)),assertBuildings(T,R).

get_floors([H],[S]):- !,get_floor(H,S).
get_floors([H|T],[S|R]):-
      get_floor(H,S),get_floors(T,R).

get_floor(B,I):-
  floors_url(A),
  concat(A,B,URL),
  token(AuthorizationHeader),
  http_open(URL,ResultJSON,[request_header('Authorization'=AuthorizationHeader)]),
  json_read_dict(ResultJSON, ResultObj),
  floors_array(ResultObj,I),
  assertz(floors(B,I)),
  close(ResultJSON).

floors_array([],[]).
floors_array([H|T],[H.id|R]):- assertz(floor(H.id,H.buildingId,H.number,H.map,H.initialPosition)),floors_array(T,R).

get_connections([H]):- !,get_connections_by_floor(H).
get_connections([H|T]):- get_connections_by_floor(H),get_connections(T).

get_connections_by_floor([H]):-get_connection(H).
get_connections_by_floor([H|T]):-get_connection(H),get_connections_by_floor(T).

get_connection(F):-
  connections_url(A),
  concat(A,F,URL),
  token(AuthorizationHeader),
  http_open(URL,ResultJSON,[request_header('Authorization'=AuthorizationHeader)]),
  json_read_dict(ResultJSON, ResultObj),
  assertConnections(ResultObj),
  close(ResultJSON).

assertConnections([]).
assertConnections([H|T]):-floors(B1,L1),member(H.floor1Id,L1),floors(B2,L2),member(H.floor2Id,L2),((bc(B1,B2);bc(B2,B1));assertz(bc(B1,B2))),assertz(connection(H.id,B1,B2,H.floor1Id,H.floor2Id,H.posXFloor1,H.posYFloor1,H.posXFloor2,H.posYFloor2)),assertConnections(T).


get_elevators([H]):-get_elevator(H).
get_elevators([H|T]):-get_elevator(H),get_elevators(T).

get_elevator(B):-
  elevators_url(A),
  concat(A,'building/',U),
  concat(U,B,URL),
  token(AuthorizationHeader),
  http_open(URL,ResultJSON,[request_header('Authorization'=AuthorizationHeader)]),
  json_read_dict(ResultJSON, ResultObj),
  assertElevator(ResultObj),
  close(ResultJSON).

%% falta adicionar posição elevadores

assertElevator([]).
assertElevator([H|T]):-assertz(elevator(H.id,H.code,H.buildingId,H.floorsIds,H.posX,H.posY)),assertElevator(T).

get_rooms([H]):-get_rooms_by_floor(H).
get_rooms([H|T]):-get_rooms_by_floor(H),get_rooms(T).

get_rooms_by_floor([H]):-get_room(H).
get_rooms_by_floor([H|T]):-get_room(H),get_rooms_by_floor(T).

get_room(I):-
  rooms_url(A),
  concat(A,I,URL),
  token(AuthorizationHeader),
  http_open(URL,ResultJSON,[request_header('Authorization'=AuthorizationHeader)]),
  json_read_dict(ResultJSON, ResultObj),
  assertRoom(ResultObj),
  close(ResultJSON).

assertRoom([]).
assertRoom([H|T]):-(assertz(room(H.id,H.floorId,H.name,H.category,H.doorPosX,H.doorPosY))),assertRoom(T).

get_robot_type_tasks():-
  robottypestasks_url(URL),
  token(AuthorizationHeader),
  http_open(URL,ResultJSON,[request_header('Authorization'=AuthorizationHeader)]),
  json_read_dict(ResultJSON, ResultObj),
  assertRTTask(ResultObj),
  close(ResultJSON).

assertRTTask([]).
assertRTTask([H|T]):-assertz(rtTask(H.id,H.name)),assertRTTask(T). 

get_robot_types():-
  robottypes_url(URL),
  token(AuthorizationHeader),
  http_open(URL,ResultJSON,[request_header('Authorization'=AuthorizationHeader)]),
  json_read_dict(ResultJSON, ResultObj),
  assertRT(ResultObj),
  close(ResultJSON).

assertRT([]).
assertRT([H|T]):-assertz(robotType(H.id,H.type,H.brand,H.model,H.possibleTasks)),assertRT(T). 

get_robot(R):-
  robots_url(URL),
  token(AuthorizationHeader),
  http_open(URL,ResultJSON,[request_header('Authorization'=AuthorizationHeader)]),
  json_read_dict(ResultJSON, ResultObj),
  assertRobot(ResultObj,R),
  close(ResultJSON).

assertRobot([],[]).
assertRobot([H|T],[H.id|Res]):-assertz(robot(H.id,H.robotTypeId,H.code,H.name,H.number,H.status,H.description)),assertRobot(T,Res). 

get_tasks([H]):-get_tasks_robot(H).

get_tasks([H|T]):-get_tasks_robot(H),get_tasks(T).

get_tasks_robot(RI):-
  tasks_url(A),
  concat(A,RI,URL),
  token(AuthorizationHeader),
  http_open(URL,ResultJSON,[request_header('Authorization'=AuthorizationHeader)]),
  json_read_dict(ResultJSON, ResultObj),
  assertTR(ResultObj,RI),
  close(ResultJSON).

assertTR([],_).
assertTR([H|T],I):-assertz(taskRequest(H.id,I,H.status,H.startingPoint,H.endingPoint,H.name)),assertTR(T,I).

carrega_factos():-get_buildings(Res),get_floors(Res,ResF),get_connections(ResF),get_elevators(Res),get_rooms(ResF),get_robot_type_tasks,get_robot_types,get_robot(R),get_tasks(R),
generate_floors_graph(ResF),
asserta(geracoes(20)),
asserta(populacao(10)),
asserta(prob_cruzamento(0.6)),
asserta(prob_mutacao(0.25)),
asserta(genetic_time(30)),
asserta(min_value(30)).

apaga_factos():-retractall(building(_,_,_,_)),retractall(floors(_,_)),retractall(connection(_,_,_,_,_,_,_,_,_)),retractall(elevator(_,_,_,_,_,_)),retractall(bc(_,_)),retractall(room(_,_,_,_,_,_)),retractall(rtTask(_,_)),retractall(robotType(_,_,_,_,_)),retractall(robot(_,_,_,_,_,_,_)),retractall(floor(_,_,_,_,_)),retractall(token(_)),retractall(taskRequest(_,_,_,_,_,_)),retractall(ligacel(_,_,_,_)),retractall(geracoes(_)),retractall(populacao(_)),retractall(prob_cruzamento(_)),retractall(prob_mutacao(_)),retractall(genetic_time(_)),retractall(min_value()).

login():-
  email(Email),pass(Pass),
  http_post([ protocol(http),
            host(localhost),
            port(4001),
            path('/api/auth/signin')
          ],
          json(json([email=Email, password=Pass])),
          Reply,
          []),
      extract_token(Reply).

extract_token(json([_|P])) :-
    member(token=Token,P),
    atomic_list_concat(['Bearer', Token], ' ',BearerToken),
    assertz(token(BearerToken)).


generate_graphs([H]):- floor(H,B,_,M,_),building(B,_,W,D),W1 is W+1,D1 is D+1,cria_grafo(W1,D1,H,M).

generate_graphs([H|T]):- floor(H,B,_,M,_),building(B,_,W,D),W1 is W+1,D1 is D+1,cria_grafo(W1,D1,H,M),generate_graphs(T).

generate_floors_graph([H]):-generate_graphs(H).

generate_floors_graph([H|T]):-generate_graphs(H),generate_floors_graph(T).

