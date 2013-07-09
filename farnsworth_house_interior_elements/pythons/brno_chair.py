BROWN = [202/255, 141/255, 72/255];

def BRNO_CHAIR(color):

	points100 = [[2.98, 3], [2.63, 5.23], [2.62, 5.53], [4.76, 5.26]];
	points101 = [[2.91, 3], [2.55, 5.35], [2.55, 5.59], [4.78, 5.32]];
	leg_surf00 = BS2([points100, points101]);

	leg000 = PROD([leg_surf00, Q(0.16)]);

	points102 = [[2.91, 3], [3, 2.48], [3.11, 2.59], [4.8, 2.59]];
	points103 = [[2.98, 3], [3.03, 2.48], [3.29, 2.68], [4.8, 2.64]];
	leg_surf01 = BS2([points102, points103]);

	leg001 = PROD([leg_surf01, Q(0.16)]);

	points104 = [[4.4, 2.64], [4.4-0.16, 2.64]];
	points105 = [[4.4, 2.59], [4.4-0.16, 2.59]];
	leg_surf02 = BS2([points104, points105]);

	leg002 = PROD([leg_surf02, Q(2.05)]);

	brno_legs = STRUCT([leg000, leg001, T([3])([0.16]), leg002, T([3])([2.05]), leg000, leg001]);

	points106 = [[4.49, 4.44], [4.55, 5.77], [4.63, 6], [4.85, 5.89]];
	points107 = [[4.65, 4.23], [4.85, 5.89]];
	pill100 = PROD([BS2([points106, points107]), Q(2.05)]);

	points108 = [[2.69, 4.24], [2.32, 4.56], [3.73, 4.41], [4.48, 4.45]];
	points109 = [[4.65, 4.23], [4.49, 4.44]];
	pill101 = PROD([BS2([points108, points109]), Q(2.05)]);

	brno_pillows = STRUCT([COLOR(color), T([3])([0.16]), pill100, pill101]);

	return STRUCT([brno_pillows, brno_legs]);

#creation and positioning

brno_chair0 = T([1, 2, 3])([42, 5.62, 48])(R([1, 3])(PI/2)(BRNO_CHAIR(BROWN)));

brno_chair1 = T([1, 2, 3])([46, 5.62, 50])(R([1, 3])(-PI/2)(BRNO_CHAIR(BROWN)));
brno_chair2 = T([1, 2, 3])([42, 5.62, 50])(R([1, 3])(-PI/2)(BRNO_CHAIR(BROWN)));

chairs = STRUCT([brno_chair1, brno_chair2, brno_chair0]);

VIEW(chairs);