
buildings_path(O,D,P):-buildings_path2(O,D,[O],P).

buildings_path2(D,D,Ed,P):-!,reverse(Ed,P).
buildings_path2(A,D,Ed,P):-(bc(A,I);bc(I,A)),\+member(I,Ed),buildings_path2(I,D,[I|Ed],P).

floors_path(O,D,PEd,P):-floors(EdO,LPO),member(O,LPO),
                        floors(EdD,LPD),member(D,LPD),
                        buildings_path(EdO,EdD,PEd),
                        segue_pisos(O,D,PEd,P).

segue_pisos(PisoDest,PisoDest,_,[]).
segue_pisos(PisoDest1,PisoDest,[EdDest],[elevator(PisoDest1,PisoDest)]):-
    PisoDest\==PisoDest1,
    elevator(_,_,EdDest,LPisos,_,_), member(PisoDest1,LPisos), member(PisoDest,LPisos).
segue_pisos(PisoAct,PisoDest,[EdAct,EdSeg|LOutrosEd],[connection(PisoAct,PisoSeg)|LOutrasLig]):-
    (connection(_,EdAct,EdSeg,PisoAct,PisoSeg,_,_,_,_);connection(_,EdSeg,EdAct,PisoSeg,PisoAct,_,_,_,_)),
    segue_pisos(PisoSeg,PisoDest,[EdSeg|LOutrosEd],LOutrasLig).
segue_pisos(PisoAct,PisoDest,[EdAct,EdSeg|LOutrosEd],[elevator(PisoAct,PisoAct1),connection(PisoAct1,PisoSeg)|LOutrasLig]):-
    (connection(_,EdAct,EdSeg,PisoAct1,PisoSeg,_,_,_,_);connection(_,EdSeg,EdAct,PisoSeg,PisoAct1,_,_,_,_)),PisoAct1\==PisoAct,
    elevator(_,_,EdAct,LPisos,_,_),member(PisoAct,LPisos),member(PisoAct1,LPisos),
    segue_pisos(PisoSeg,PisoDest,[EdSeg|LOutrosEd],LOutrasLig).




% d escolher o caminho que envolve menos utilizacoes de elevadores e em
% caso de iguadade menos utilizacao de corredores, menos trocos 20%
%
% ?- melhor_caminho_pisos(j2,g4,LLigMelhor).
% LLigMelhor = [cor(j2, i2), cor(i2, h2), cor(h2, g2), elev(g2, g4)].
%
%


melhor_caminho_pisos(PisoOr,PisoDest,LLigMelhor):-
    findall(LLig,floors_path(PisoOr,PisoDest,_,LLig),LLLig),
    menos_elevadores(LLLig,LLigMelhor,_,_).


menos_elevadores([LLig],LLig,NElev,NCor):-conta(LLig,NElev,NCor).
menos_elevadores([LLig|OutrosLLig],LLigR,NElevR,NCorR):-
    menos_elevadores(OutrosLLig,LLigM,NElev,NCor),
    conta(LLig,NElev1,NCor1),
    (((NElev1<NElev;(NElev1==NElev,NCor1<NCor)),!,NElevR is NElev1, NCorR is NCor1,LLigR=LLig);
     (NElevR is NElev,NCorR is NCor,LLigR=LLigM)).

conta([],0,0).
conta([elevator(_,_)|L],NElev,NCor):-conta(L,NElevL,NCor),NElev is NElevL+1.
conta([connection(_,_)|L],NElev,NCor):-conta(L,NElev,NCorL),NCor is NCorL+1.

translate_path([],[]).
translate_path([elevator(A1,A2)|T],[elevator((C-N1),(C-N2))|R]):-
                floors(A,TEM),member(A1,TEM),
                building(A,C,_,_),floor(A1,_,N1,_,_),floor(A2,_,N2,_,_),translate_path(T,R).
translate_path([connection(A1,A2)|T],[connection((C1-N1),(C2-N2))|R]):-
                floors(A,TEM),member(A1,TEM),
                floors(B,TEM1),member(A2,TEM1),
                building(A,C1,_,_),building(B,C2,_,_),floor(A1,_,N1,_,_),floor(A2,_,N2,_,_),translate_path(T,R).

translate_path2([],[]).
translate_path2([H|T],[C|R]):-building(H,C),translate_path2(T,R).

pathBetweenRooms(RoomOr,RoomDes,Path):-
		room(RoomOr,PisoOr,_,_,_,_),
		room(RoomDes,PisoDest,_,_,_,_),
		findall(LLig,floors_path(PisoOr,PisoDest,_,LLig),LLLig),
    menos_elevadores(LLLig,Path,_,_).

costBetweenRooms(RoomOr,RoomDes,C):-!,
		pathBetweenRooms(RoomOr,RoomDes,Path),
		calculateCostFromPath(Path,RoomDes,C2),
		((nth0(0,Path,elevator(P,_)),elevator(_,_,_,F,X,Y),member(P,F),room(RoomOr,_,_,_,X1,Y1),dfs(cel(Y,X),cel(Y1,X1),_,P,C1),C is C1+C2);
		(nth0(0,Path,connection(P,_)),((connection(_,_,_,P,_,X,Y,_,_));(connection(_,_,_,_,P,_,_,X,Y))),room(RoomOr,_,_,_,X1,Y1),dfs(cel(Y,X),cel(Y1,X1),_,P,C1),C is C1+C2)).


calculateCostFromPath([elevator(_,P)],Dest,C):- elevator(_,_,_,F,X,Y),member(P,F),!,room(Dest,_,_,_,X1,Y1),dfs(cel(Y,X),cel(Y1,X1),_,P,C1),C is C1+30.

calculateCostFromPath([connection(_,P)],Dest,C):- room(Dest,P,_,_,X1,Y1),((connection(_,_,_,P,_,X,Y,_,_));(connection(_,_,_,_,P,_,_,X,Y))),!,dfs(cel(Y,X),cel(Y1,X1),_,P,C1),C is C1+5.

calculateCostFromPath([connection(_,P1),connection(P2,P3)|T],Dest,C):-calculateCostFromPath([connection(P2,P3)|T],Dest,C2),((connection(_,_,_,P1,_,X,Y,_,_));(connection(_,_,_,_,P1,_,_,X,Y))),((connection(_,_,_,P2,_,X1,Y1,_,_));(connection(_,_,_,_,P2,_,_,X1,Y1))),dfs(cel(Y,X),cel(Y1,X1),_,P1,C1),C is C1+C2+5.

calculateCostFromPath([elevator(_,P1),connection(P2,P3)|T],Dest,C):- calculateCostFromPath([connection(P2,P3)|T],Dest,C2),elevator(_,_,_,F,X,Y),member(P1,F),((connection(_,_,_,P2,_,X1,Y1,_,_));(connection(_,_,_,_,P2,_,_,X1,Y1))),dfs(cel(Y,X),cel(Y1,X1),_,P1,C1),C is C1+C2+30.

calculateCostFromPath([connection(_,P1),elevator(P2,P3)|T],Dest,C):- calculateCostFromPath([elevator(P2,P3)|T],Dest,C2),((connection(_,_,_,P1,_,X,Y,_,_));(connection(_,_,_,_,P1,_,_,X,Y))),elevator(_,_,_,F,X1,Y1),member(P2,F),dfs(cel(Y,X),cel(Y1,X1),_,P1,C1),C is C1+C2+5.


dfs(cel(Y,X),cel(Y1,X1),Cam,P,C):-
	((X>X1,Orig=cel(Y1,X1),Dest=cel(Y,X));(Dest=cel(Y1,X1),Orig=cel(Y,X))),
	dfs2(Orig,Dest,[Orig],Cam,P,C).

dfs2(Dest,Dest,LA,Cam,_,0):-
	reverse(LA,Cam).

dfs2(Act,Dest,LA,Cam,P,C):-
	ligacel(Act,X,P,C1),
        \+ member(X,LA),
	dfs2(X,Dest,[X|LA],Cam,P,C2),C is C1+C2.

acessar_elemento(Map, Y, X, E) :-
    nth1(X, Map, L),
    nth1(Y, L, E). 

verify_coordinates(Map,Col,Lin):-
		((acessar_elemento(Map,Col,Lin,0);acessar_elemento(Map,Col,Lin,4);acessar_elemento(Map,Col,Lin,5);acessar_elemento(Map,Col,Lin,6);acessar_elemento(Map,Col,Lin,7);acessar_elemento(Map,Col,Lin,8);acessar_elemento(Map,Col,Lin,9))).

cria_grafo(_,0,_,_):-!.
cria_grafo(Col,Lin,P,Map):-cria_grafo_lin(Col,Lin,P,Map),Lin1 is Lin-1,cria_grafo(Col,Lin1,P,Map).


cria_grafo_lin(0,_,_,_):-!.
cria_grafo_lin(Col,Lin,P,Map):-(verify_coordinates(Map,Col,Lin)),!,ColS is Col+1, ColA is Col-1, LinS is Lin+1,LinA is Lin-1,
    D is sqrt(2),
    (((verify_coordinates(Map,ColS,Lin),assertz(ligacel(cel(Col,Lin),cel(ColS,Lin),P,1)));true)),
    (((verify_coordinates(Map,ColA,Lin),assertz(ligacel(cel(Col,Lin),cel(ColA,Lin),P,1)));true)),
    (((verify_coordinates(Map,Col,LinS),assertz(ligacel(cel(Col,Lin),cel(Col,LinS),P,1)));true)),
    (((verify_coordinates(Map,Col,LinA),assertz(ligacel(cel(Col,Lin),cel(Col,LinA),P,1)));true)),
    ((((verify_coordinates(Map,ColS,LinS),verify_coordinates(Map,Col,LinS),verify_coordinates(Map,ColS,Lin)),assertz(ligacel(cel(Col,Lin),cel(ColS,LinS),P,D)));true)),
    ((((verify_coordinates(Map,ColS,LinA),verify_coordinates(Map,ColS,Lin),verify_coordinates(Map,Col,LinA)),assertz(ligacel(cel(Col,Lin),cel(ColS,LinA),P,D)));true)),
    ((((verify_coordinates(Map,ColA,LinA),verify_coordinates(Map,Col,LinA),verify_coordinates(Map,ColA,Lin)),assertz(ligacel(cel(Col,Lin),cel(ColA,LinA),P,D)));true)),
    ((((verify_coordinates(Map,ColA,LinS),verify_coordinates(Map,ColA,Lin),verify_coordinates(Map,Col,LinS)),assertz(ligacel(cel(Col,Lin),cel(ColA,LinS),P,D)));true)),
    Col1 is Col-1,
    cria_grafo_lin(Col1,Lin,P,Map).
cria_grafo_lin(Col,Lin,P,Map):-Col1 is Col-1,cria_grafo_lin(Col1,Lin,P,Map).






%genetic
%usar dfs
%tempo de movimento entre a posição de fim da tarefa 1 e a do inicio da tarefa 2
%assumindo elevador = 30, bc = 5, tile = 1, diagonal = raiz(2)
%:-dynamic geracoes/1.
%:-dynamic populacao/1.
%:-dynamic prob_cruzamento/1.
%:-dynamic prob_mutacao/1.
:- dynamic time_stop/1.
%:-dynamic min_value/1.
:- dynamic tarefasN/1.
:- dynamic genetic_best_path/1.
:- dynamic genetic_best_cost/1.
/*
%time_desloc(id tarefa 1,id tarefa 2,tempo)
time_desloc(t1,t2,5).
time_desloc(t2,t1,6).
time_desloc(t1,t3,8).
time_desloc(t3,t1,3).
time_desloc(t2,t3,7).
time_desloc(t3,t2,9).
time_desloc(t1,t4,12).
time_desloc(t4,t1,2).
time_desloc(t2,t4,4).
time_desloc(t4,t2,8).
time_desloc(t3,t4,10).
time_desloc(t4,t3,11).
time_desloc(t1,t5,18).
time_desloc(t2,t5,19).
time_desloc(t3,t5,6).
time_desloc(t4,t5,8).
time_desloc(t5,t1,3).
time_desloc(t5,t3,17).
time_desloc(t5,t2,16).
time_desloc(t5,t4,8).
time_desloc(t1,t6,3).
time_desloc(t2,t6,1).
time_desloc(t3,t6,2).
time_desloc(t4,t6,15).
time_desloc(t5,t6,10).
time_desloc(t6,t2,11).
time_desloc(t6,t1,6).
time_desloc(t6,t3,9).
time_desloc(t6,t4,13).
time_desloc(t6,t5,1).

%initial_desloc(id tarefa,tempo de deslocacao)
initial_desloc(t1,5).
initial_desloc(t2,7).
initial_desloc(t3,1).
initial_desloc(t4,18).
initial_desloc(t5,1).
initial_desloc(t6,3).

%final_desloc(id tarefa,tempo de deslocacao)
final_desloc(t1,7).
final_desloc(t2,9).
final_desloc(t3,12).
final_desloc(t4,2).
final_desloc(t5,5).
final_desloc(t6,6).


%tarefas
tarefa(t1).
tarefa(t2).
tarefa(t3).
tarefa(t4).
tarefa(t5).
tarefa(t6).

%tarefasN(Ntarefas)
tarefasN(6).
*/


%parametros
%inicializa:-
	/*write('Numero de novas Geracoes: '),read(NG),
	(retract(geracoes(_));true), asserta(geracoes(NG)),
	write('Dimensao da Populacao: '),read(DP),
	(retract(populacao(_));true), asserta(populacao(DP)),
	write('Probabilidade de Cruzamento (%):'), read(P1), PC is P1/100,
	(retract(prob_cruzamento(_));true), asserta(prob_cruzamento(PC)),
	write('Probabilidade de Mutacao (%):'), read(P2), PM is P2/100,
	(retract(prob_mutacao(_));true), asserta(prob_mutacao(PM)),
	write('Time to stop:'), read(T), get_time(Time1), Time is Time1 + T,
	(retract(time_stop(_));true), asserta(time_stop(Time)),
	write('Min Value:'), read(V),
	(retract(min_value(_));true), asserta(min_value(V)).
	*/


gera(R):-
	%inicializa,
	gera_populacao(R,Pop),
	write('Pop='),write(Pop),nl,
	avalia_populacao(Pop,PopAv),
	write('PopAv='),write(PopAv),nl,
	ordena_populacao(PopAv,PopOrd),
	geracoes(NG),
	gera_geracao(0,NG,PopOrd).


gera_populacao(R,Pop):-
	populacao(TamPop),
	findall(Tarefa,taskRequest(Tarefa,R,_,_,_,_),ListaTarefas),
	length(ListaTarefas,NumT),
	assertz(tarefasN(NumT)),
	gera_populacao(TamPop,ListaTarefas,NumT,Pop).

gera_populacao(0,_,_,[]):-!.

gera_populacao(TamPop,ListaTarefas,NumT,[Ind|Resto]):-
	TamPop1 is TamPop-1,
	gera_populacao(TamPop1,ListaTarefas,NumT,Resto),
	gera_individuo(ListaTarefas,NumT,Ind),
	not(member(Ind,Resto)).

gera_populacao(TamPop,ListaTarefas,NumT,L):-
	gera_populacao(TamPop,ListaTarefas,NumT,L).

gera_individuo([G],1,[G]):-!.

gera_individuo(ListaTarefas,NumT,[G|Resto]):-
	NumTemp is NumT + 1, % To use with random
	random(1,NumTemp,N),
	retira(N,ListaTarefas,G,NovaLista),
	NumT1 is NumT-1,
	gera_individuo(NovaLista,NumT1,Resto).

retira(1,[G|Resto],G,Resto).
retira(N,[G1|Resto],G,[G1|Resto1]):-
	N1 is N-1,
	retira(N1,Resto,G,Resto1).

avalia_populacao([],[]).
avalia_populacao([Ind|Resto],[Ind*V|Resto1]):-
	avalia_first(Ind,I),
	avalia(Ind,V1),
	V is V1+I,
	avalia_populacao(Resto,Resto1).

avalia_first([T|_],V):-
	initial_desloc(T,V).

avalia([H],V):-
	final_desloc(H,V).

avalia([T,R|Resto],V):-
	time_desloc(T,R,Valor),
	avalia([R|Resto],V1),
	V is V1+Valor.

ordena_populacao(PopAv,PopAvOrd):-
	bsort(PopAv,PopAvOrd).

bsort([X],[X]):-!.
bsort([X|Xs],Ys):-
	bsort(Xs,Zs),
	btroca([X|Zs],Ys).


btroca([X],[X]):-!.

btroca([X*VX,Y*VY|L1],[Y*VY|L2]):-
	VX>VY,!,
	btroca([X*VX|L1],L2).

btroca([X|L1],[X|L2]):-btroca(L1,L2).




gera_geracao(G,G,[X*VX|_]):-!,
	write('Final: '),nl,
	write('Geracao '), write(G), write(':'), nl, write(X*VX),
	asserta(genetic_best_cost(VX)),
	asserta(genetic_best_path(X)).

%check se o tempo de execucao ja terminou
gera_geracao(N,_,[X*VX|_]):-
	get_time(Now),
	time_stop(Time),
	Now>=Time,!,nl,write('Tempo de exec terminado'),nl,
	write('Final: '),nl,
	write('Geracao '), write(N), write(':'), nl, write(X*VX), nl,
	asserta(genetic_best_cost(VX)),
	asserta(genetic_best_path(X)).

%check se o melhor caminho tem valor inferior ou igual ao definido
gera_geracao(N,_,[X*VX|_]):-
	min_value(V),
	VX=<V,!,
	nl,write('Final: '),nl,
	write('Geracao '), write(N), write(':'), nl, write(X*VX), nl,
	asserta(genetic_best_cost(VX)),
	asserta(genetic_best_path(X)).

gera_geracao(N,G,[X,Y|Pop]):-
	write('Geracao '), write(N), write(':'), nl, write([X,Y|Pop]), nl,

	%mix antes de cruzar
	random_permutation([X,Y|Pop],Pop1),
	cruzamento(Pop1,NPop1),
	mutacao(NPop1,NPop),
	avalia_populacao(NPop,NPopAv),

	%juntar old e new gen, sem repetidos, usando append + remove_duplicates pq union nao da
	append([X,Y|Pop],NPopAv,NPopAv1),
	remove_duplicates(NPopAv1,NPopAvNoDupes),
	%ordenar
	ordena_populacao(NPopAvNoDupes,NPopOrd),

	%tirar top, n = 25% de pop size inical
	populacao(TamPop),
	NBest is TamPop//4,
	tam_pop_fraction(NBest,NBest1),
	%separar os NBest1 elementos de NPopOrd para a lista Best, restantes para a left
	list_transfer(NBest1,NPopBest,NPopLeft,NPopOrd),

	%gerar peso random, peso = aval * val random entre 0 e 1
	add_weights(NPopLeft,NPopWeighted),
	%ordenar por peso
	ordena_populacao(NPopWeighted,NPopWeightedOrd),
	%tirar peso
	remove_weights(NPopWeightedOrd,NPopOrd1),

	%tirar top, n = 75% de pop size inicial
	NTam is TamPop-NBest1,
	%separar os NTam elementos de NPopOrd1 para a lista Best1, restantes para a left1
	list_transfer(NTam,NPopBest1,_,NPopOrd1),

	%juntar tudo
	append(NPopBest,NPopBest1,NPopFinal),
	ordena_populacao(NPopFinal,NPopFinal1),
	N1 is N+1,
	gera_geracao(N1,G,NPopFinal1).

add_weights([],[]).

add_weights([H*V|NPop],[H*V*W1|NPopWeighted]):-
	random(W),
	W1 is W*V,
	add_weights(NPop,NPopWeighted).

remove_weights([],[]).

remove_weights([H*_|NPop],[H|NPop1]):-
	remove_weights(NPop,NPop1).

tam_pop_fraction(N,N1):-
	N<2, N1 is 2.

tam_pop_fraction(N,N1):-
	N1 is N.

remove_duplicates([], []).

remove_duplicates([Head | Tail], Result) :-
	member(Head, Tail), !,
	remove_duplicates(Tail, Result).

remove_duplicates([Head | Tail], [Head | Result]) :-
	remove_duplicates(Tail, Result).

list_transfer(N,NPopBest,NPopLeft,NPopOrd):-
	length(NPopBest,N),
	append(NPopBest,NPopLeft,NPopOrd).

list_transfer(N,NPopBest,NPopLeft,NPopOrd):-
	list_transfer(N,NPopBest,NPopLeft,NPopOrd).

gerar_pontos_cruzamento(P1,P2):-
	gerar_pontos_cruzamento1(P1,P2).

gerar_pontos_cruzamento1(P1,P2):-
	tarefasN(N),
	NTemp is N+1,
	random(1,NTemp,P11),
	random(1,NTemp,P21),
	P11\==P21,!,
	((P11<P21,!,P1=P11,P2=P21);(P1=P21,P2=P11)).

gerar_pontos_cruzamento1(P1,P2):-
	gerar_pontos_cruzamento1(P1,P2).


cruzamento([],[]).
cruzamento([Ind*_],[Ind]).
cruzamento([Ind1*_,Ind2*_|Resto],[NInd1,NInd2|Resto1]):-
	gerar_pontos_cruzamento(P1,P2),
	prob_cruzamento(Pcruz),random(0.0,1.0,Pc),
	((Pc =< Pcruz,!,
        cruzar(Ind1,Ind2,P1,P2,NInd1),
	cruzar(Ind2,Ind1,P1,P2,NInd2));
	(NInd1=Ind1,NInd2=Ind2)),
	cruzamento(Resto,Resto1).

preencheh([],[]).

preencheh([_|R1],[h|R2]):-
	preencheh(R1,R2).


sublista(L1,I1,I2,L):-
	I1 < I2,!,
	sublista1(L1,I1,I2,L).

sublista(L1,I1,I2,L):-
	sublista1(L1,I2,I1,L).

sublista1([X|R1],1,1,[X|H]):-!,
	preencheh(R1,H).

sublista1([X|R1],1,N2,[X|R2]):-!,
	N3 is N2 - 1,
	sublista1(R1,1,N3,R2).

sublista1([_|R1],N1,N2,[h|R2]):-
	N3 is N1 - 1,
	N4 is N2 - 1,
	sublista1(R1,N3,N4,R2).

rotate_right(L,K,L1):-
	tarefasN(N),
	T is N - K,
	rr(T,L,L1).

rr(0,L,L):-!.

rr(N,[X|R],R2):-
	N1 is N - 1,
	append(R,[X],R1),
	rr(N1,R1,R2).


elimina([],_,[]):-!.

elimina([X|R1],L,[X|R2]):-
	not(member(X,L)),!,
	elimina(R1,L,R2).

elimina([_|R1],L,R2):-
	elimina(R1,L,R2).

insere([],L,_,L):-!.
insere([X|R],L,N,L2):-
	tarefasN(T),
	((N>T,!,N1 is N mod T);N1 = N),
	insere1(X,N1,L,L1),
	N2 is N + 1,
	insere(R,L1,N2,L2).


insere1(X,1,L,[X|L]):-!.
insere1(X,N,[Y|L],[Y|L1]):-
	N1 is N-1,
	insere1(X,N1,L,L1).

cruzar(Ind1,Ind2,P1,P2,NInd11):-
	sublista(Ind1,P1,P2,Sub1),
	tarefasN(NumT),
	R is NumT-P2,
	rotate_right(Ind2,R,Ind21),
	elimina(Ind21,Sub1,Sub2),
	P3 is P2 + 1,
	insere(Sub2,Sub1,P3,NInd1),
	eliminah(NInd1,NInd11).


eliminah([],[]).

eliminah([h|R1],R2):-!,
	eliminah(R1,R2).

eliminah([X|R1],[X|R2]):-
	eliminah(R1,R2).

mutacao([],[]).
mutacao([Ind|Rest],[NInd|Rest1]):-
	prob_mutacao(Pmut),
	random(0.0,1.0,Pm),
	((Pm < Pmut,!,mutacao1(Ind,NInd));NInd = Ind),
	mutacao(Rest,Rest1).

mutacao1(Ind,NInd):-
	gerar_pontos_cruzamento(P1,P2),
	mutacao22(Ind,P1,P2,NInd).

mutacao22([G1|Ind],1,P2,[G2|NInd]):-
	!, P21 is P2-1,
	mutacao23(G1,P21,Ind,G2,NInd).
mutacao22([G|Ind],P1,P2,[G|NInd]):-
	P11 is P1-1, P21 is P2-1,
	mutacao22(Ind,P11,P21,NInd).

mutacao23(G1,1,[G2|Ind],G2,[G1|Ind]):-!.
mutacao23(G1,P,[G|Ind],G2,[G|NInd]):-
	P1 is P-1,
	mutacao23(G1,P1,Ind,G2,NInd).


%%sequencia de execução de tarefas e escolha da mais rapida

ver_tempo([T],Tempo):- final_desloc(T,C),Tempo is C.
ver_tempo([T1,T2|R],Tempo):-
				ver_tempo([T2|R],Tempo2),
				time_desloc(T1,T2,Tempo1),
				Tempo is Tempo2+Tempo1.

plano_atendimento(R,MelhorPlano,T) :-
    findall(I, taskRequest(I,R,_,_,_,_), Ts),
		set_times(Ts),
		assertStartAndEndTimes(Ts),
		findall(Plano,permutation(Ts,Plano),Planos),
		asserta(melhor_sol(_,10000)),
		descobrir_melhor(Planos),
		retract(melhor_sol(MelhorPlano1,T)),
		translate_sequence(MelhorPlano1,MelhorPlano),retractall(time_desloc(_,_,_)),retractall(initial_desloc(_,_)),retractall(final_desloc(_,_)).

atendimento_genetic(R,MelhorPlano,T) :-
	findall(I, taskRequest(I,R,_,_,_,_), Ts),
	set_times(Ts),
	assertStartAndEndTimes(Ts),
	get_time(Time1), genetic_time(T),
	Time is Time1 + T,
	asserta(time_stop(Time)),
	gera(R),
	genetic_best_path(MelhorPlano1),
	genetic_best_cost(T),
	translate_sequence(MelhorPlano1,MelhorPlano),
	retractall(time_desloc(_,_,_)),retractall(initial_desloc(_,_)),retractall(final_desloc(_,_)),
	retractall(genetic_best_path(_)),retractall(genetic_best_cost(_)),retractall(time_stop(_)),
	retractall(tarefasN(_)).

descobrir_melhor([]).
descobrir_melhor([H|T]):-better_cam_atendimento(H),descobrir_melhor(T).
				
better_cam_atendimento(Plano):-
			ver_tempo(Plano,Tempo1),
			nth0(0,Plano,I),
			initial_desloc(I,Tempo2),
			Tempo is Tempo1+Tempo2,
			melhor_sol(_,T),
			((Tempo<T,retract(melhor_sol(_,_)),asserta(melhor_sol(Plano,Tempo))));true.

translate_sequence([],[]).

translate_sequence([H|T],[N|F]):-taskRequest(H,_,_,_,_,N),translate_sequence(T,F).
  
set_times(TasksList) :-
    findall((T1, T2), (
        member(T1, TasksList),
        member(T2, TasksList),
        T1 \= T2
    ), Pares),
    assert_combinacoes(Pares).

assert_combinacoes([]).
assert_combinacoes([(Tarefa1, Tarefa2)|Resto]) :-
    taskRequest(Tarefa1,_,_,_,E,_),taskRequest(Tarefa2,_,_,S,_,_),
    ((E==S,C is 0);
    (costBetweenRooms(E,S,C))),
    assertz(time_desloc(Tarefa1, Tarefa2,C)),
    assert_combinacoes(Resto).


assertStartAndEndTimes([]).

assertStartAndEndTimes([H|T]):- 
    taskRequest(H,_,_,S,E,_),
    room(S,F1,_,_,X3,Y3),room(E,F2,_,_,X4,Y4),
    floor(F1,_,_,_,[X1,Y1]),floor(F2,_,_,_,[X2,Y2]),
    dfs(cel(Y1,X1),cel(Y3,X3),_,F1,Custo1),
    assertz(initial_desloc(H,Custo1)),
    dfs(cel(Y2,X2),cel(Y4,X4),_,F2,Custo2),
    assertz(final_desloc(H,Custo2)),
    assertStartAndEndTimes(T).

