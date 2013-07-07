var BROWN = [202/255, 141/255, 72/255];

var brno_chair = function(color){

	var points100 = [[2.98, 3], [2.63, 5.23], [2.62, 5.53], [4.76, 5.26]];
	var points101 = [[2.91, 3], [2.55, 5.35], [2.55, 5.59], [4.78, 5.32]];
	var leg_surf00 = bs2([points100, points101]);

	var leg000 = EXTRUDE([0.16])(leg_surf00);

	var points102 = [[2.91, 3], [3, 2.48], [3.11, 2.59], [4.8, 2.59]];
	var points103 = [[2.98, 3], [3.03, 2.48], [3.29, 2.68], [4.8, 2.64]];
	var leg_surf01 = bs2([points102, points103]);

	var leg001 = EXTRUDE([0.16])(leg_surf01);

	var points104 = [[4.4, 2.64], [4.4-0.16, 2.64]];
	var points105 = [[4.4, 2.59], [4.4-0.16, 2.59]];
	var leg_surf02 = bs2([points104, points105]);

	var leg002 = EXTRUDE([2.05])(leg_surf02);

	var brno_legs = STRUCT([leg000, leg001, T([2])([0.16]), leg002, T([2])([2.05]), leg000, leg001]);

	var points106 = [[4.49, 4.44], [4.55, 5.77], [4.63, 6], [4.85, 5.89]];
	var points107 = [[4.65, 4.23], [4.85, 5.89]];
	var pill100 = EXTRUDE([2.05])(bs2([points106, points107]));

	var points108 = [[2.69, 4.24], [2.32, 4.56], [3.73, 4.41], [4.48, 4.45]];
	var points109 = [[4.65, 4.23], [4.49, 4.44]];
	var pill101 = EXTRUDE([2.05])(bs2([points108, points109]));

	var brno_pillows = STRUCT([COLOR(color), T([2])([0.16]), pill100, pill101]);

	return STRUCT([brno_pillows, brno_legs]);

}

//creazione e posizionamento

var brno_chair0 = T([0, 1, 2])([42, 5.62, 48])(R([0,2])([PI/2])(brno_chair(BROWN)));

DRAW(brno_chair0);

var brno_chair1 = T([0, 1, 2])([46, 5.62, 50])(R([0,2])([-PI/2])(brno_chair(BROWN)));
var brno_chair2 = T([0, 1, 2])([42, 5.62, 50])(R([0,2])([-PI/2])(brno_chair(BROWN)));

DRAW(brno_chair1);
DRAW(brno_chair2);