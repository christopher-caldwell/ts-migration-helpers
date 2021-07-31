const uniqueCards = [
    {
        "id": 1076,
        "title": "Admiral Chiraneau",
        "image": "admiral-chiraneau.png",
        "set": "officer",
        "points": 10,
        "faction": "imperial",
        "unique": true,
        "available": true
    },
    {
        "id": 1205,
        "title": "Admiral Montferrat",
        "image": "admiral-montferrat.png",
        "set": "officer",
        "points": 5,
        "faction": "imperial",
        "unique": true,
        "available": true
    },
    {
        "id": 1308,
        "title": "Admiral Titus",
        "image": "admiral-titus.png",
        "set": "officer",
        "points": 2,
        "faction": "imperial",
        "unique": true,
        "available": true
    },
    {
        "id": 1307,
        "title": "Agent Kallus",
        "image": "agent-kallus.png",
        "set": "officer",
        "points": 3,
        "faction": "imperial",
        "unique": true,
        "available": true
    },
    {
        "id": 1012,
        "title": "Captain Brunson",
        "image": "captain-brunson.png",
        "set": "officer",
        "points": 5,
        "faction": "imperial",
        "unique": true,
        "available": true
    },
    {
        "id": 1206,
        "title": "Captain Needa",
        "image": "captain-needa.png",
        "set": "officer",
        "points": 2,
        "faction": "imperial",
        "unique": true,
        "available": true
    },
    {
        "id": 1309,
        "title": "Commandant Aresko",
        "image": "commandant-aresko.png",
        "set": "officer",
        "points": 7,
        "faction": "imperial",
        "unique": true,
        "available": true
    },
    {
        "id": 1078,
        "title": "Director Isard",
        "image": "director-isard.png",
        "set": "officer",
        "points": 3,
        "faction": "imperial",
        "unique": true,
        "available": true
    },
    {
        "id": 1104,
        "title": "Governor Pryce",
        "image": "governor-pryce.png",
        "set": "officer",
        "points": 7,
        "faction": "imperial",
        "unique": true,
        "available": true
    },
    {
        "id": 1014,
        "title": "Instructor Goran",
        "image": "instructor-goran.png",
        "set": "officer",
        "points": 7,
        "faction": "imperial",
        "unique": true,
        "available": true
    },
    {
        "id": 1399,
        "title": "Minister Tua",
        "image": "minister-tua.png",
        "set": "officer",
        "points": 2,
        "faction": "imperial",
        "unique": true,
        "available": true
    },
    {
        "id": 1008,
        "title": "Taskmaster Grint",
        "image": "taskmaster-grint.png",
        "set": "officer",
        "points": 5,
        "faction": "imperial",
        "unique": true,
        "available": true
    },
    {
        "id": 2672,
        "title": "The Grand Inquisitor",
        "image": "the-grand-inquisitor.png",
        "set": "officer",
        "points": 4,
        "faction": "imperial",
        "unique": true,
        "available": true
    },
    {
        "id": 1084,
        "title": "Wulff Yularen",
        "image": "wulff-yularen.png",
        "set": "officer",
        "points": 7,
        "faction": "imperial",
        "unique": true,
        "available": true
    },
    {
        "id": 2791,
        "title": "Hondo Ohnaka",
        "image": "hondo-ohnaka.png",
        "set": "officer",
        "points": 2,
        "unique": true,
        "available": true
    },
    {
        "id": 1017,
        "title": "Strategic Adviser",
        "image": "strategic-adviser.png",
        "set": "officer",
        "points": 4,
        "unique": true,
        "available": true
    },
    {
        "id": 1311,
        "title": "Chart Officer",
        "image": "chart-officer.png",
        "set": "officer",
        "points": 2
    },
    {
        "id": 1393,
        "title": "Damage Control Officer",
        "image": "damage-control-officer.png",
        "set": "officer",
        "points": 5
    },
    {
        "id": 1077,
        "title": "Defense Liaison",
        "image": "defense-liaison.png",
        "set": "officer",
        "points": 3
    },
    {
        "id": 1225,
        "title": "Engineering Captain",
        "image": "engineering-captain.png",
        "set": "officer",
        "points": 6
    },
    {
        "id": 1310,
        "title": "Flight Commander",
        "image": "flight-commander.png",
        "set": "officer",
        "points": 3
    },
    {
        "id": 1079,
        "title": "Intel Officer",
        "image": "intel-officer.png",
        "set": "officer",
        "points": 7
    },
    {
        "id": 1228,
        "title": "Navigation Officer",
        "image": "navigation-officer.png",
        "set": "officer",
        "points": 6
    },
    {
        "id": 1312,
        "title": "Skilled First Officer",
        "image": "skilled-first-officer.png",
        "set": "officer",
        "points": 1
    },
    {
        "id": 1209,
        "title": "Support Officer",
        "image": "support-officer.png",
        "set": "officer",
        "points": 4
    },
    {
        "id": 1227,
        "title": "Tactical Expert",
        "image": "tactical-expert.png",
        "set": "officer",
        "points": 6
    },
    {
        "id": 1082,
        "title": "Veteran Captain",
        "image": "veteran-captain.png",
        "set": "officer",
        "points": 3
    },
    {
        "id": 1083,
        "title": "Weapons Liaison",
        "image": "weapons-liaison.png",
        "set": "officer",
        "points": 3
    },
    {
        "id": 1226,
        "title": "Wing Commander",
        "image": "wing-commander.png",
        "set": "officer",
        "points": 6
    },
    {
        "id": 1088,
        "title": "Engine Techs",
        "image": "engine-techs.png",
        "set": "support-team",
        "points": 8
    },
    {
        "id": 1089,
        "title": "Engineering Team",
        "image": "engineering-team.png",
        "set": "support-team",
        "points": 5
    },
    {
        "id": 1316,
        "title": "Fighter Coordination Team",
        "image": "fighter-coordination-team.png",
        "set": "support-team",
        "points": 3
    },
    {
        "id": 1317,
        "title": "Medical Team",
        "image": "medical-team.png",
        "set": "support-team",
        "points": 1
    },
    {
        "id": 1090,
        "title": "Nav Team",
        "image": "nav-team.png",
        "set": "support-team",
        "points": 4
    },
    {
        "id": 1262,
        "title": "Projection Experts",
        "image": "projection-experts.png",
        "set": "support-team",
        "points": 6
    },
    {
        "id": 1390,
        "title": "All fighters, Follow Me!",
        "image": "all-fighters-follow-me.png",
        "set": "fleet-command",
        "points": 5,
        "unique": true
    },
    {
        "id": 1395,
        "title": "Entrapment Formation!",
        "image": "entrapment-formation.png",
        "set": "fleet-command",
        "points": 5,
        "unique": true
    },
    {
        "id": 1282,
        "title": "Intensify Firepower!",
        "image": "intensify-firepower.png",
        "set": "fleet-command",
        "points": 6,
        "unique": true
    },
    {
        "id": 1404,
        "title": "Shields to Maximum!",
        "image": "shields-to-maximum.png",
        "set": "fleet-command",
        "points": 6,
        "unique": true
    },
    {
        "id": 1230,
        "title": "Boosted Comms",
        "image": "boosted-comms.png",
        "set": "offensive-retrofit",
        "points": 4
    },
    {
        "id": 2673,
        "title": "Disposable Capacitors",
        "image": "disposable-capacitors.png",
        "set": "offensive-retrofit",
        "points": 3
    },
    {
        "id": 1091,
        "title": "Expanded Hangar Bay",
        "image": "expanded-hangar-bay.png",
        "set": "offensive-retrofit",
        "points": 5
    },
    {
        "id": 1019,
        "title": "Hardend Bulkheads",
        "image": "hardend-bulkheads.png",
        "set": "offensive-retrofit",
        "points": 5
    },
    {
        "id": 1212,
        "title": "Phylon Q7 Tractor Beams",
        "image": "phylon-q7-tractor-beams.png",
        "set": "offensive-retrofit",
        "points": 6,
        "modification": true
    },
    {
        "id": 1092,
        "title": "Point-Defense Reroute",
        "image": "point-defense-reroute.png",
        "set": "offensive-retrofit",
        "points": 5
    },
    {
        "id": 1214,
        "title": "Quad Laser Turrets",
        "image": "quad-laser-turrets.png",
        "set": "offensive-retrofit",
        "points": 5
    },
    {
        "id": 1402,
        "title": "Rapid Launch Bays",
        "image": "rapid-launch-bays.png",
        "set": "offensive-retrofit",
        "points": 6
    },
    {
        "divider": true
    },
    {
        "id": 2790,
        "title": "Cham Syndulla",
        "image": "swm27-cham-syndulla.png",
        "set": "offensive-retrofit",
        "points": 5,
        "faction": "rebel",
        "unique": true,
        "dual": "weapons-team"
    },
    {
        "id": 1005,
        "title": "Jyn Erso",
        "image": "jyn-erso.png",
        "set": "offensive-retrofit",
        "points": 4,
        "faction": "rebel",
        "unique": true,
        "dual": "weapons-team"
    },
    {
        "id": 1013,
        "title": "Darth Vader",
        "image": "darth-vader.png",
        "set": "offensive-retrofit",
        "points": 3,
        "faction": "imperial",
        "unique": true,
        "available": true,
        "dual": "weapons-team",
        "equipped": false
    },
    {
        "id": 2052,
        "title": "Boarding Engineers",
        "image": "boarding-engineers.png",
        "set": "offensive-retrofit",
        "points": 2,
        "dual": "weapons-team"
    },
    {
        "id": 2053,
        "title": "Boarding Troopers",
        "image": "boarding-troopers.png",
        "set": "offensive-retrofit",
        "points": 3,
        "dual": "weapons-team"
    },
    {
        "id": 1300,
        "title": "G-8 Experimental Projector",
        "image": "experimental_projector.png",
        "set": "experimental-retrofit",
        "points": 8,
        "unique": true
    },
    {
        "id": 1302,
        "title": "Grav Shift Reroute",
        "image": "grav-shift-reroute.png",
        "set": "experimental-retrofit",
        "points": 2,
        "unique": true
    },
    {
        "id": 1299,
        "title": "G7-X Grav Well Projector",
        "image": "g7_x_grav_well_projector.png",
        "set": "experimental-retrofit",
        "points": 2
    },
    {
        "id": 1301,
        "title": "Targeting Scrambler",
        "image": "targeting-scrambler.png",
        "set": "experimental-retrofit",
        "points": 5
    },
    {
        "id": 1232,
        "title": "Avenger",
        "image": "avenger.png",
        "set": "title",
        "points": 5,
        "faction": "imperial",
        "unique": true,
        "ship": ["imperial-class-star-destroyer"],
        "equipped": false
    },
    {
        "id": 1391,
        "title": "Centicore",
        "image": "centicore.png",
        "set": "title",
        "points": 3,
        "faction": "imperial",
        "unique": true,
        "ship": ["arquitens"],
        "equipped": false
    },
    {
        "id": 1280,
        "title": "Chimaera",
        "image": "chimaera.png",
        "set": "title",
        "points": 4,
        "faction": "imperial",
        "unique": true,
        "ship": ["imperial-class-star-destroyer"],
        "equipped": false
    },
    {
        "id": 1107,
        "title": "Corrupter",
        "image": "corrupter.png",
        "set": "title",
        "points": 5,
        "faction": "imperial",
        "unique": true,
        "ship": ["victory-class-star-destroyer"],
        "equipped": false
    },
    {
        "id": 1118,
        "title": "Demolisher",
        "image": "demolisher.png",
        "set": "title",
        "points": 10,
        "faction": "imperial",
        "unique": true,
        "ship": ["gladiator-class-star-destroyer"],
        "equipped": false
    },
    {
        "id": 1233,
        "title": "Devastator",
        "image": "devastator.png",
        "set": "title",
        "points": 10,
        "faction": "imperial",
        "unique": true,
        "ship": ["imperial-class-star-destroyer"],
        "equipped": false
    },
    {
        "id": 1108,
        "title": "Dominator",
        "image": "dominator.png",
        "set": "title",
        "points": 12,
        "faction": "imperial",
        "unique": true,
        "ship": ["victory-class-star-destroyer"],
        "equipped": false
    },
    {
        "id": 1397,
        "title": "Hand of Justice",
        "image": "hand-of-justice.png",
        "set": "title",
        "points": 4,
        "faction": "imperial",
        "unique": true,
        "ship": ["arquitens"],
        "equipped": false
    },
    {
        "id": 1235,
        "title": "Impetuous",
        "image": "impetuous.png",
        "set": "title",
        "points": 4,
        "faction": "imperial",
        "unique": true,
        "ship": ["raider-class-corvette"],
        "equipped": false
    },
    {
        "id": 1119,
        "title": "Insidious",
        "image": "insidious.png",
        "set": "title",
        "points": 3,
        "faction": "imperial",
        "unique": true,
        "ship": ["gladiator-class-star-destroyer"],
        "equipped": false
    },
    {
        "id": 1236,
        "title": "Instigator",
        "image": "instigator.png",
        "set": "title",
        "points": 4,
        "faction": "imperial",
        "unique": true,
        "ship": ["raider-class-corvette"],
        "equipped": false
    },
    {
        "id": 1324,
        "title": "Interdictor",
        "image": "interdictor.png",
        "set": "title",
        "points": 3,
        "faction": "imperial",
        "unique": true,
        "ship": ["interdictor"],
        "equipped": false
    },
    {
        "id": 2667,
        "title": "Pursuant",
        "image": "pursuant.png",
        "set": "title",
        "points": 2,
        "faction": "imperial",
        "unique": true,
        "ship": ["quasar"],
        "equipped": false
    },
    {
        "id": 1234,
        "title": "Relentless",
        "image": "relentless.png",
        "set": "title",
        "points": 3,
        "faction": "imperial",
        "unique": true,
        "ship": ["imperial-class-star-destroyer"],
        "equipped": false
    },
    {
        "id": 1011,
        "title": "Sovereign",
        "image": "sovereign.png",
        "set": "title",
        "points": 4,
        "faction": "imperial",
        "unique": true,
        "ship": ["imperial-class-star-destroyer"],
        "equipped": false
    },
    {
        "id": 2668,
        "title": "Squall",
        "image": "squall.png",
        "set": "title",
        "points": 3,
        "faction": "imperial",
        "unique": true,
        "ship": ["quasar"],
        "equipped": false
    },
    {
        "id": 2669,
        "title": "Stronghold",
        "image": "stronghold.png",
        "set": "title",
        "points": 5,
        "faction": "imperial",
        "unique": true,
        "ship": ["quasar"],
        "equipped": false
    },
    {
        "id": 1323,
        "title": "Suppressor",
        "image": "suppressor.png",
        "set": "title",
        "points": 4,
        "faction": "imperial",
        "unique": true,
        "ship": ["gozanti"],
        "equipped": false
    },
    {
        "id": 1322,
        "title": "Vector",
        "image": "vector.png",
        "set": "title",
        "points": 2,
        "faction": "imperial",
        "unique": true,
        "ship": ["gozanti"],
        "equipped": false
    },
    {
        "id": 1109,
        "title": "Warlord",
        "image": "warlord.png",
        "set": "title",
        "points": 8,
        "faction": "imperial",
        "unique": true,
        "ship": ["victory-class-star-destroyer"],
        "equipped": false
    },
    {
        "id": 1007,
        "title": "Seventh Fleet Star Destroyer",
        "image": "seventh-fleet.png",
        "set": "title",
        "points": 5,
        "faction": "imperial",
        "ship": ["gladiator-class-star-destroyer", "imperial-class-star-destroyer", "victory-class-star-destroyer"],
        "equipped": false
    },
    {
        "id": 1006,
        "title": "Caitken and Shollan",
        "image": "caitken-and-shollan.png",
        "set": "weapons-team",
        "points": 6,
        "faction": "rebel",
        "unique": true,
        "equipped": false,
        "available": true
    },
    {
        "id": 1315,
        "title": "Fire-Control Team",
        "image": "fire-control-team.png",
        "set": "weapons-team",
        "points": 2,
        "available": true
    },
    {
        "id": 1085,
        "title": "Flight Controllers",
        "image": "flight-controllers.png",
        "set": "weapons-team",
        "points": 6,
        "available": true
    },
    {
        "id": 1086,
        "title": "Gunnery Team",
        "image": "gunnery-team.png",
        "set": "weapons-team",
        "points": 7,
        "available": true
    },
    {
        "id": 1211,
        "title": "Ordnance Experts",
        "image": "ordnance-experts.png",
        "set": "weapons-team",
        "points": 4,
        "available": true
    },
    {
        "id": 1210,
        "title": "Ruthless Strategists",
        "image": "ruthless-strategists.png",
        "set": "weapons-team",
        "points": 4,
        "available": true
    },
    {
        "id": 1087,
        "title": "Sensor Team",
        "image": "sensor-team.png",
        "set": "weapons-team",
        "points": 5,
        "available": true
    },
    {
        "id": 1314,
        "title": "Veteran Gunners",
        "image": "veteran-gunners.png",
        "set": "weapons-team",
        "points": 5,
        "available": true
    },
    {
        "divider": true
    },
    {
        "id": 2790,
        "title": "Cham Syndulla",
        "image": "cham-syndulla.png",
        "set": "weapons-team",
        "points": 5,
        "faction": "rebel",
        "unique": true,
        "dual": "offensive-retrofit",
        "equipped": false
    },
    {
        "id": 1005,
        "title": "Jyn Erso",
        "image": "jyn-erso.png",
        "set": "weapons-team",
        "points": 4,
        "faction": "rebel",
        "unique": true,
        "dual": "offensive-retrofit",
        "equipped": false
    },
    {
        "id": 1013,
        "title": "Darth Vader",
        "image": "darth-vader.png",
        "set": "weapons-team",
        "points": 3,
        "faction": "imperial",
        "unique": true,
        "available": true,
        "dual": "offensive-retrofit",
        "equipped": false
    },
    {
        "id": 2052,
        "title": "Boarding Engineers",
        "image": "boarding-engineers.png",
        "set": "weapons-team",
        "points": 2,
        "dual": "offensive-retrofit",
        "available": true
    },
    {
        "id": 2053,
        "title": "Boarding Troopers",
        "image": "boarding-troopers.png",
        "set": "weapons-team",
        "points": 3,
        "dual": "offensive-retrofit",
        "available": true
    },

    {
        "id": 1304,
        "title": "Admiral Konstantine",
        "image": "admiral-konstantine.png",
        "set": "commander",
        "points": 23,
        "faction": "imperial",
        "unique": true,
        "equipped": false,
        "available": true
    },
    {
        "id": 1069,
        "title": "Admiral Motti",
        "image": "admiral-motti.png",
        "set": "commander",
        "points": 24,
        "faction": "imperial",
        "unique": true,
        "equipped": false,
        "available": true
    },
    {
        "id": 1179,
        "title": "Admiral Ozzel",
        "image": "admiral-ozzel.png",
        "set": "commander",
        "points": 20,
        "faction": "imperial",
        "unique": true,
        "equipped": false,
        "available": true
    },
    {
        "id": 1070,
        "title": "Admiral Screed",
        "image": "admiral-screed.png",
        "set": "commander",
        "points": 26,
        "faction": "imperial",
        "unique": true,
        "equipped": false,
        "available": true
    },
    {
        "id": 2670,
        "title": "Admiral Sloane",
        "image": "admiral-sloane.png",
        "set": "commander",
        "points": 24,
        "faction": "imperial",
        "unique": true,
        "equipped": false,
        "available": true
    },
    {
        "id": 1180,
        "title": "Darth Vader",
        "image": "darth-vader-commander.png",
        "set": "commander",
        "points": 36,
        "faction": "imperial",
        "unique": true,
        "group": "vader",
        "equipped": false,
        "available": true
    },
    {
        "id": 1182,
        "title": "Emperor Palpatine",
        "image": "palpatine.png",
        "set": "commander",
        "points": 35,
        "faction": "imperial",
        "unique": true,
        "equipped": false,
        "available": true
    },
    {
        "id": 1303,
        "title": "General Tagge",
        "image": "general-tagge.png",
        "set": "commander",
        "points": 25,
        "faction": "imperial",
        "unique": true,
        "equipped": false,
        "available": true
    },
    {
        "id": 1284,
        "title": "Grand Admiral Thrawn",
        "image": "grand-admiral-thrawn.png",
        "set": "commander",
        "points": 32,
        "faction": "imperial",
        "unique": true,
        "equipped": false,
        "available": true
    },
    {
        "id": 1073,
        "title": "Grand Moff Tarkin",
        "image": "tarkin.png",
        "set": "commander",
        "points": 38,
        "faction": "imperial",
        "unique": true,
        "equipped": false,
        "available": true
    },
    {
        "id": 1400,
        "title": "Moff Jerjerrod",
        "image": "moff-jerjerrod.png",
        "set": "commander",
        "points": 23,
        "faction": "imperial",
        "unique": true,
        "equipped": false,
        "available": true
    }

];

export default uniqueCards;