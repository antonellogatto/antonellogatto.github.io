BLACK = [50/255, 50/255, 50/255];
BROWN = [202/255, 141/255, 72/255];

def BARCELONA_DAY_BED (color):
	#legs
	legs37 = T([1, 2])([0.11, 0.11])(CYLINDER([0.11, 1.57])(12));
	barcelona_day_bed_legs = STRUCT([legs37, T([1])([8.85+0.11])(legs37), T([2])([4.8-0.22]), legs37, T([1])([8.85+0.11])(legs37)]);

	#base
	points086 = [[-1.25, 0.22, 2], [-1.82, -0.35, 2], [-1.82, -0.35, 1.57], [-1.25, 0.22, 1.57]];
	points087 = [[10.21, 0.22, 2], [10.78, -0.35, 2], [10.78, -0.35, 1.57], [10.21, 0.22, 1.57]];
	base_surf0 = BS2([points086, points087]);
	base_surf1 = BS2([[[-1.25, 0.22, 2], [-1.25, 0.22, 1.57]], [[10.21, 0.22, 2], [10.21, 0.22, 1.57]]]);
	points088 = [[-1.25, 4.58, 2], [-1.82, 4.8+0.35, 2], [-1.82, 4.8+0.35, 1.57], [-1.25, 4.58, 1.57]];
	base_surf2 = BS2([points086, points088]);
	base_surf3 = BS2([[[-1.25, 0.22, 2], [-1.25, 0.22, 1.57]], [[-1.25, 4.58, 2], [-1.25, 4.58, 1.57]]]);
	points089 = [[10.21, 4.58, 2], [10.78, 4.8+0.35, 2], [10.78, 4.8+0.35, 1.57], [10.21, 4.58, 1.57]];
	base_surf4 = BS2([points087, points089]);
	base_surf5 = BS2([[[10.21, 0.22, 2], [10.21, 0.22, 1.57]], [[10.21, 4.58, 2], [10.21, 4.58, 1.57]]]);
	base_surf6 = BS2([points088, points089]);
	base_surf7 = BS2([[[-1.25, 4.58, 2], [-1.25, 4.58, 1.57]], [[10.21, 4.58, 2], [10.21, 4.58, 1.57]]]);
	barcelona_day_bed_base = STRUCT([base_surf0, base_surf1, base_surf2, base_surf3, base_surf4, base_surf5, base_surf6, base_surf7]);

	#ropes 
	points090 = [[0.22, 2], [-0.35, 2], [-0.35, 1.57], [0.22, 1.57]];
	points091 = [[4.58, 2], [4.8+0.35, 2], [4.8+0.35, 1.57], [4.58, 1.57]];
	points092 = [[0.22, 2+0.02], [-0.35-0.02, 2+0.02], [-0.35-0.02, 1.57-0.02], [0.22, 1.57-0.02]];
	points093 = [[4.58, 2+0.02], [4.8+0.35+0.02, 2+0.02], [4.8+0.35+0.02, 1.57-0.02], [4.58, 1.57-0.02]];
	rope10 = T([1, 3])([-4.8, 0.75])(EXTRUDE([None, BS2([points090, points092]), -0.5]));
	rope11 = T([1, 3])([-4.8, 0.75])(EXTRUDE([None, BS2([points091, points093]), -0.5]));
	rope12 = T([1, 3])([-4.8, 0.75])(EXTRUDE([None, BS2([[[0.22, 2], [0.22, 2+0.02]], [[4.58, 2], [4.58, 2+0.02]]]), -0.5]));

	barcelona_day_bed_ropes = (R([2, 3])(PI/2)(R([1, 3])(PI/2)(COLOR([50/255, 50/255, 50/255])(STRUCT(NN(11)([rope10, rope11, rope12, T([3])([-0.5-0.5])]))))));

	#mattress
	mattress = T([1, 2, 3])([-1.65, -0.25, 2+0.02])(CUBOID([12.27, 5.25, 0.45]));

	#mattress squares
	points094 = [[-1.1, -0.25, 2.47], [-1.1, -0.25, 2.65], [-1.1, 0.625, 2.65], [-1.1, 0.625, 2.47]];
	pill24 = BS3([[[-1.65, -0.25, 2.47], [-1.65, 0.625, 2.47]], points094, [[-0.535, -0.25, 2.47], [-0.535, 0.625, 2.47]]]);
	square_row = STRUCT(NN(6)([pill24, T([2])([0.875])]));
	pillow_squares0 = STRUCT(NN(11)([square_row, T([1])([1.115])]));

	#mattress buttons
	pillow_button03 = T([1, 2, 3])([-0.535, 0.625, 2.47+0.01])(CYLINDER([0.04, 0.01])(12));
	pillow_buttons_row3 = STRUCT(NN(5)([pillow_button03, T([2])([0.875])]));
	pillow_buttons03 = STRUCT(NN(10)([pillow_buttons_row3, T([1])([1.115])]));
	barcelona_day_bed_mattress = STRUCT([mattress, pillow_squares0, pillow_buttons03]);

	#pillow 
	pillow = T([2, 3])([-0.125, 2+0.02+0.4+0.45])(R([2, 3])(-PI/2)(CYLINDER([0.4, 5])(16)));

	return STRUCT([barcelona_day_bed_base, barcelona_day_bed_legs, barcelona_day_bed_ropes, COLOR(color), barcelona_day_bed_mattress, pillow]);

#creation and positioning

bed = T([1, 2, 3])([45, 8.2, 70])(R([1, 2])(-PI/2)(BARCELONA_DAY_BED(BROWN)));

VIEW(bed);