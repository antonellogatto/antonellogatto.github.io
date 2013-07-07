var BLACK = [50/255, 50/255, 50/255];
var BROWN = [202/255, 141/255, 72/255];

var barcelona_day_bed = function(color){
	//legs
	var legs37 = T([0, 1])([0.11, 0.11])(CYLINDER(0.11, 1.57)([12, 1]));
	var barcelona_day_bed_legs = STRUCT([legs37, T([0])([8.85+0.11])(legs37), T([1])([4.8-0.22]), legs37, T([0])([8.85+0.11])(legs37)]);

	//base
	var points086 = [[-1.25, 0.22, 2], [-1.82, -0.35, 2], [-1.82, -0.35, 1.57], [-1.25, 0.22, 1.57]];
	var points087 = [[10.21, 0.22, 2], [10.78, -0.35, 2], [10.78, -0.35, 1.57], [10.21, 0.22, 1.57]];
	var base_surf0 = bs2([points086, points087]);
	var base_surf1 = bs2([[[-1.25, 0.22, 2], [-1.25, 0.22, 1.57]], [[10.21, 0.22, 2], [10.21, 0.22, 1.57]]]);
	var points088 = [[-1.25, 4.58, 2], [-1.82, 4.8+0.35, 2], [-1.82, 4.8+0.35, 1.57], [-1.25, 4.58, 1.57]];
	var base_surf2 = bs2([points086, points088]);
	var base_surf3 = bs2([[[-1.25, 0.22, 2], [-1.25, 0.22, 1.57]], [[-1.25, 4.58, 2], [-1.25, 4.58, 1.57]]]);
	var points089 = [[10.21, 4.58, 2], [10.78, 4.8+0.35, 2], [10.78, 4.8+0.35, 1.57], [10.21, 4.58, 1.57]];
	var base_surf4 = bs2([points087, points089]);
	var base_surf5 = bs2([[[10.21, 0.22, 2], [10.21, 0.22, 1.57]], [[10.21, 4.58, 2], [10.21, 4.58, 1.57]]]);
	var base_surf6 = bs2([points088, points089]);
	var base_surf7 = bs2([[[-1.25, 4.58, 2], [-1.25, 4.58, 1.57]], [[10.21, 4.58, 2], [10.21, 4.58, 1.57]]]);
	var barcelona_day_bed_base = STRUCT([base_surf0, base_surf1, base_surf2, base_surf3, base_surf4, base_surf5, base_surf6, base_surf7]);

	//ropes 
	var points090 = [[0.22, 2], [-0.35, 2], [-0.35, 1.57], [0.22, 1.57]];
	var points091 = [[4.58, 2], [4.8+0.35, 2], [4.8+0.35, 1.57], [4.58, 1.57]];
	var points092 = [[0.22, 2+0.02], [-0.35-0.02, 2+0.02], [-0.35-0.02, 1.57-0.02], [0.22, 1.57-0.02]];
	var points093 = [[4.58, 2+0.02], [4.8+0.35+0.02, 2+0.02], [4.8+0.35+0.02, 1.57-0.02], [4.58, 1.57-0.02]];
	var rope10 = T([2])([-0.75])(EXTRUDE([0.5])(bs2([points090, points092])));
	var rope11 = T([2])([-0.75])(EXTRUDE([0.5])(bs2([points091, points093])));
	var rope12 = T([2])([-0.75])(EXTRUDE([0.5])(bs2([[[0.22, 2], [0.22, 2+0.02]], [[4.58, 2], [4.58, 2+0.02]]])));

	var barcelona_day_bed_ropes = R([1, 2])(PI/2)(R([0, 2])([PI/2])(COLOR([50/255, 50/255, 50/255])(STRUCT(REPLICA(11)([rope10, rope11, rope12, T([2])([0.5+0.5])])))));

	//mattress
	var mattress = T([0, 1, 2])([-1.65, -0.25, 2+0.02])(CUBOID([12.27, 5.25, 0.45]));

	//mattress squares
	var points094 = [[-1.1, -0.25, 2.47], [-1.1, -0.25, 2.65], [-1.1, 0.625, 2.65], [-1.1, 0.625, 2.47]];
	var pill24 = bs3([[[-1.65, -0.25, 2.47], [-1.65, 0.625, 2.47]], points094, [[-0.535, -0.25, 2.47], [-0.535, 0.625, 2.47]]]);
	var square_row = STRUCT(REPLICA(6)([pill24, T([1])([0.875])]));
	var pillow_squares0 = STRUCT(REPLICA(11)([square_row, T([0])([1.115])]));

	//mattress buttons
	var pillow_button03 = T([0, 1, 2])([-0.535, 0.625, 2.47+0.01])(CYLINDER(0.04, 0.01)([12, 1]));
	var pillow_buttons_row3 = STRUCT(REPLICA(5)([pillow_button03, T([1])([0.875])]));
	var pillow_buttons03 = STRUCT(REPLICA(10)([pillow_buttons_row3, T([0])([1.115])]));
	var barcelona_day_bed_mattress = STRUCT([mattress, pillow_squares0, pillow_buttons03]);

	//pillow 
	var pillow = T([1, 2])([-0.125, 2+0.02+0.4+0.45])(R([1, 2])([-PI/2])(CYLINDER(0.4, 5)([16,1])));

	return STRUCT([barcelona_day_bed_base, barcelona_day_bed_legs, barcelona_day_bed_ropes, COLOR(color), barcelona_day_bed_mattress, pillow]);
}

//creation and positioning

var bed = T([0,1,2])([45, 8.2, 70])(R([1, 2])([-PI/2])(barcelona_day_bed(BROWN)));

DRAW(bed);