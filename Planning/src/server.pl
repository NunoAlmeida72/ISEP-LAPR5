:- use_module(library(http/thread_httpd)).
:- use_module(library(http/http_dispatch)).
:- use_module(library(http/http_parameters)).
:- use_module(library(http/http_open)).
:- use_module(library(http/http_client)).
:- use_module(library(http/http_server)).
:- use_module(library(http/http_cors)).
:- use_module(library(http/json_convert)).
:- use_module(library(http/http_json)).
:- use_module(library(http/json)).


:- consult('load_facs.pl').
:- consult('algorithms.pl').
%Server

startServer(Port):-
        http_server(http_dispatch, [port(Port)]),
        asserta(port(Port)).

:- set_setting(http:cors, [*]).

inicializar_sistema:-
	carrega_factos().

inicializar_server:-
    startServer(5100),!,
    login,
    inicializar_sistema,!.

stopServer:-
    apaga_factos(),
    retract(port(Port)),
    http_stop_server(Port,_).

:- inicializar_server.
 
:- http_handler('/api/pathFloors',pathFloors,[]).


pathFloors(Request):-
    cors_enable(Request,[ methods([get,options])]),
    http_parameters(Request, [id1(ID1, [string]), id2(ID2, [string])]),
    melhor_caminho_pisos(ID1,ID2,Cam),
    format('Content-type: application/json~n~n'),
    format('{"result": "~w"}', [Cam]).

:- http_handler('/api/pathRooms',pathRooms,[]).


pathRooms(Request):-
    cors_enable(Request,[ methods([get,options])]),
    http_parameters(Request, [id1(ID1, [string]), id2(ID2, [string])]),
    room(ID1,F1,_,_,_,_), 
    room(ID2,F2,_,_,_,_),
    melhor_caminho_pisos(F1,F2,Cam),
    translate_path(Cam,Cam1),
    format('Content-type: application/json~n~n'),
    format('{"result": "~w"}', [Cam1]).

:- http_handler('/api/dfs/path',dfsPath,[]).


dfsPath(Request):-
    cors_enable(Request,[ methods([get,options])]),
    http_parameters(Request, [cel1(CEL1, [string]), cel2(CEL2, [string]), floorId(ID, [string])]),
    term_string(CEL1Term, CEL1),
    term_string(CEL2Term, CEL2),
    dfs(CEL1Term,CEL2Term,CAM,ID,_),
    listToJson(CAM,JsonList),
    reply_json(JsonList).   

listToJson(List, JsonList) :-
    maplist(cel_to_json, List, JsonList).

cel_to_json(cel(X, Y), [X, Y]).

:- http_handler('/api/path/rooms',roomsPath,[]).


roomsPath(Request):-
cors_enable(Request,[ methods([get,options])]),
   http_parameters(Request, [id1(ID1, [string]), id2(ID2, [string])]),
    room(ID1,F1,_,_,_,_), 
    room(ID2,F2,_,_,_,_),
    melhor_caminho_pisos(F1,F2,Cam),
    pathToJson(Cam,JsonList),
    reply_json(JsonList).   

pathToJson(List, JsonList) :-
    maplist(path_to_json, List, JsonList).

path_to_json(elevator(X, Y), json{'elevator':[X, Y]}).
path_to_json(connection(X, Y), json{'connection':[X, Y]}).


:- http_handler('/api/taskRequest/sequence',sequence_task_requests,[]).


sequence_task_requests(Request):-
    cors_enable(Request,[ methods([get,options])]),
    http_parameters(Request, [id1(ID, [string])]),
    plano_atendimento(ID,S,C),
    format('Content-type: application/json~n~n'),
    format('{"sequence": "~w","cost": "~w"}', [S,C]).
 
:- http_handler('/api/taskRequest/genetic',genetic_sequence,[]).


genetic_sequence(Request):-
    cors_enable(Request,[ methods([get,options])]),
    http_parameters(Request, [id1(ID, [string])]),
    atendimento_genetic(ID,S,C),
    format('Content-type: application/json~n~n'),
    format('{"sequence": "~w","cost": "~w"}', [S,C]).

:- http_handler('/api/pathBuildings',pathBuildings,[]).


pathBuildings(Request):-
    cors_enable(Request,[ methods([get,options])]),
    http_parameters(Request, [id1(ID1, [string]), id2(ID2, [string])]),
    buildings_path(ID1,ID2,Cam),
    translate_path2(Cam,C),
    format('Content-type: application/json~n~n'),
    format('{"result": "~w"}', [C]).
    
    
 %   buildings_path(X,Y,Cam),
  %  translate_path2(Cam,C),
   % reply_json(C).




