#trasformazioni aggiustate

BLACK = [50/255, 50/255, 50/255];
BROWN = [202/255, 141/255, 72/255];

def barcelona_pouf(color):

	#legs
	points062 = [[5.46, 4.67], [4.87, 5.27], [4.49, 5.42], [4.1, 5.37]];
	points063 = [[5.55, 4.72], [5.24, 4.94], [4.73, 5.56], [4.1, 5.44]];
	legs30 = BS2([points062, points063]);

	points064 = [[5.46, 4.67], [5.17, 4.3], [4.5, 3.87], [3.9, 3.92]];
	points065 = [[5.57, 4.59], [5.41, 4.65], [4.97, 3.82], [3.91, 3.87]];
	legs31 = BS2([points064, points065]);

	points066 = [[5.57, 4.59], [5.75, 4.49], [6.3, 3.8], [7.18, 3.87]];
	points067 = [[5.64, 4.64], [5.9, 4.47], [6.26, 3.9], [7.19, 3.92]];
	legs32 = BS2([points066, points067]);

	points068 = [[5.64, 4.64], [5.52, 4.64], [6.36, 5.48], [7, 5.37]];
	points069 = [[5.55, 4.72], [5.75, 4.72], [6.21, 5.57], [7, 5.44]];
	legs33 = BS2([points068, points069]);

	legs34 = MKPOL([[[5.46, 4.67], [5.57, 4.59], [5.64, 4.64], [5.55, 4.72]], [[0, 1, 2], [0, 2, 3]], None]);

	barcelona_pouf_legs0 = STRUCT([EXTRUDE([0.16]), legs30, legs31, legs32, legs33, legs34]);

	legs35 = BS2([[[4.1, 5.37], [4.1, 5.44]], [[4.26, 5.37], [4.26, 5.44]]]);
	legs36 = BS2([[[7, 5.37], [7, 5.44]], [[6.84, 5.37], [6.84, 5.44]]]);

	barcelona_pouf_legs1 = STRUCT([EXTRUDE([2.78]), legs35, legs36]);

	barcelona_pouf_legs = STRUCT([barcelona_pouf_legs0, T([3])([0.16]), barcelona_pouf_legs1, T([3])([2.78]), barcelona_pouf_legs0]);

	#ropes

	points070 = [[4.26, 5.37], [4.1, 5.37], [4.1, 5.44], [7, 5.44], [7, 5.37], [6.84, 5.37]];
	points071 = [[4.26, 5.37-0.02], [4.1-0.02, 5.37-0.02], [4.1-0.02, 5.44+0.02], [7+0.02, 5.44+0.02], [7+0.02, 5.37-0.02], [6.84, 5.37-0.02]];
	ropeNUBS08 =  NUBS(S1)(1)([0,0,1,2,3,4,5,5])(points070);
	ropeNUBS09 =  NUBS(S1)(1)([0,0,1,2,3,4,5,5])(points071);
	rope09 = T([3])([0.18])(EXTRUDE([0.22])(MAP(BEZIER(S2)([ropeNUBS08, ropeNUBS09]))(domain2D)));
	barcelona_pouf_ropes = COLOR([50/255, 50/255, 50/255])(STRUCT(REPLICA(7)([rope09, T([3])([0.22+0.20])])));

	#pillow 

	points072 = [[4.05, 5.46, 0], [4.05, 5.46, -0.1], [4.55, 5.46, -0.1], 
		[6.55, 5.46, -0.1], [7.05, 5.46, -0.1], [7.05, 5.46, 0], 
		[7.05, 5.46, 3.1], [7.05, 5.46, 3.2], [6.55, 5.46, 3.2], 
		[4.55, 5.46, 3.2], [4.05, 5.46, 3.2], [4.05, 5.46, 3.1], [4.05, 5.46, 1], [4.05, 5.46, 0]];
	points073 = [[4.05, 5.76, 0], [4.05, 5.76, -0.1], [4.55, 5.76, -0.1], 
		[6.55, 5.76, -0.1], [7.05, 5.76, -0.1], [7.05, 5.76, 0], 
		[7.05, 5.76, 3.1], [7.05, 5.76, 3.2], [6.55, 5.76, 3.2], 
		[4.55, 5.76, 3.2], [4.05, 5.76, 3.2], [4.05, 5.76, 3.1], [4.05, 5.76, 1], [4.05, 5.76, 0]];

	pillNUBS00 =  NUBS(S1)(2)([0,0,0,1,2,3,4,5,6,7,8,9,10,11,13,13,13])(points072);
	pillNUBS01 =  NUBS(S1)(2)([0,0,0,1,2,3,4,5,6,7,8,9,10,11,13,13,13])(points073);
	pill_surf0 = MAP(BEZIER(S2)([pillNUBS00, [5.5, 5.46, 1]]))(domain2D);
	pill_surf1 = MAP(BEZIER(S2)([pillNUBS01, [5.5, 5.76, 1]]))(domain2D);
	pill_surf2 = MAP(BEZIER(S2)([pillNUBS00, pillNUBS01]))(domain2D);

	#pillow_squares

	points074 = [[4.1, 5.76, -0.025], [4.79, 5.76, -0.1]];
	points075 = [[4.05, 5.76, 0.3], [4.05, 5.94, 0.3], [4.79, 5.94, 0.3], [4.79, 5.76, 0.3]];
	points076 = [[4.1, 5.76, 0.7], [4.79, 5.76, 0.7]];
	pill20 = BS3([points074, points075, points076]);

	points077 = [[5.54, 5.76, -0.1], [4.79, 5.76, -0.1]];
	points078 = [[5.54, 5.76, 0.3], [5.54, 5.94, 0.3], [4.79, 5.94, 0.3], [4.79, 5.76, 0.3]];
	points079 = [[5.54, 5.76, 0.7], [4.79, 5.76, 0.7]];
	pill21 = BS3([points077, points078, points079]);

	points080 = [[5.54, 5.76, -0.1], [6.29, 5.76, -0.1]];
	points081 = [[5.54, 5.76, 0.3], [5.54, 5.94, 0.3], [6.28, 5.94, 0.3], [6.29, 5.76, 0.3]];
	points082 = [[5.54, 5.76, 0.7], [6.29, 5.76, 0.7]];
	pill22 = BS3([points080, points081, points082]);

	points083 = [[7, 5.76, -0.05], [6.29, 5.76, -0.1]];
	points084 = [[7.05, 5.76, 0.3], [6.94, 5.91, 0.3], [6.28, 5.94, 0.3], [6.29, 5.76, 0.3]];
	points085 = [[7, 5.76, 0.7], [6.29, 5.76, 0.7]];
	pill23 = BS3([points083, points084, points085]);

	pillow_squares = STRUCT(REPLICA(4)([pill20, pill21, pill22, pill23, T([3])([0.825])]));

	#pillow buttons

	pillow_button02 = T([1, 2, 3])([4.79, 5.76+0.01, 0.7])(R([2, 3])(PI/2)(CYLINDER(0.04, 0.01)([12, 1])));
	pillow_buttons_row2 = STRUCT(REPLICA(3)([pillow_button02, T([1])([0.75])]));
	pillow_buttons02 = STRUCT(REPLICA(3)([pillow_buttons_row2, T([3])([0.825])]));
	barcelona_pouf_pillow = STRUCT([pill_surf0, pill_surf1, pill_surf2, pillow_squares, pillow_buttons02]);

	return STRUCT([barcelona_pouf_legs, barcelona_pouf_ropes, COLOR(color), barcelona_pouf_pillow]);

#creazione e posizionamento

pouf = T([1, 2, 3])([53, 4.35, 56.5])(barcelona_pouf(BROWN));

VIEW(pouf);