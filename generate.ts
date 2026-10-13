import fs from "node:fs";
// https://github.com/Leanny/splat3/blob/main/data/language/USen_full_unicode.json
import LANG_EN from "./lang/us_en.json" with { type: "json" };

type InternalTableturfName =
	keyof (typeof LANG_EN)["CommonMsg/MiniGame/MiniGameCardName"];

type InternalClassName =
	keyof (typeof LANG_EN)["CommonMsg/Weapon/WeaponTypeName"];

type InternalWeaponName =
	keyof (typeof LANG_EN)["CommonMsg/Weapon/WeaponName_Main"];
type InternalVsWeaponName = Exclude<
	InternalWeaponName,
	| `${string}_Coop`
	| `${string}_Msn`
	| `${string}_RivalLv${string}`
	| `${string}_Sdodr`
	| `Free`
>;

type InternalSubName =
	keyof (typeof LANG_EN)["CommonMsg/Weapon/WeaponName_Sub"];
type InternalVsSubName = Exclude<
	InternalSubName,
	`${string}_Rival` | `${string}_Sdodr` | `${string}_Coop` | `SalmonBuddy`
>;

type InternalSpecialName =
	keyof (typeof LANG_EN)["CommonMsg/Weapon/WeaponName_Special"];
type InternalVsSpecialName = Exclude<
	InternalSpecialName,
	`${string}${"Mission" | "Sdodr" | "Rival" | "Coop" | "IkuraShoot" | `Gachihoko${string}` | "SuperLanding"}`
>;

type WeaponClassName = keyof typeof WEAPON_CLASSES;
type SubWeaponName = keyof typeof SUB_WEAPONS;
type SpecialWeaponName = keyof typeof SPECIAL_WEAPONS;
type Pfs = 160 | 170 | 180 | 190 | 200 | 210 | 220;
type Version =
	| "1.0.0"
	| "2.0.0"
	| "3.0.0"
	| "4.0.0"
	| "5.0.0"
	| "6.0.0"
	| "7.0.0"
	| "8.0.0"
	| "10.0.0"
	| "11.3.0";

type UnlockRequirements =
	| UnlockRequirementsStarter
	| UnlockRequirementsLevel
	| UnlockRequirementsStoryMode
	| UnlockRequirementsSideOrder
	| UnlockRequirementsRaidersSaveData;
type UnlockRequirementsStarter = {
	type: "starter";
};
type UnlockRequirementsLevel = {
	type: "level";
	// prettier-ignore
	level: 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30;
};
type UnlockRequirementsStoryMode = {
	type: "complete-story-mode";
};
type UnlockRequirementsSideOrder = {
	type: "side-order";
};
type UnlockRequirementsRaidersSaveData = {
	type: "complete-raiders";
};

type WeaponClass = {
	icon_id: number;
	internal: InternalClassName;
	order: number;
};
type SubWeapon = {
	id: number;
	internal: InternalVsSubName;
	internalTableturf?: InternalTableturfName;
};
type SpecialWeapon = {
	id: number;
	internal: InternalVsSpecialName;
	internalTableturf?: InternalTableturfName;
	added: Version;
};
type Weapon = {
	id: number;
	internal: InternalVsWeaponName;
	// If undefined, use the name from `internal`
	// If null, there is no tableturf card
	internalTableturf?: InternalTableturfName | undefined | null;
	class: WeaponClassName;
	sub: SubWeaponName;
	special: SpecialWeaponName;
	pfs: Pfs;
	added: Version;
	unlock: UnlockRequirements;
};

export const WEAPON_CLASSES = {
	Shooter: {
		icon_id: 0,
		internal: "Shooter",
		order: 0,
	},
	Roller: {
		icon_id: 5,
		internal: "Roller",
		order: 1,
	},
	Charger: {
		icon_id: 4,
		internal: "Charger",
		order: 2,
	},
	Slosher: {
		icon_id: 7,
		internal: "Slosher",
		order: 3,
	},
	Splatling: {
		icon_id: 3,
		internal: "Spinner",
		order: 4,
	},
	Dualies: {
		icon_id: 2,
		internal: "Maneuver",
		order: 5,
	},
	Brella: {
		icon_id: 8,
		internal: "Shelter",
		order: 6,
	},
	Blaster: {
		icon_id: 1,
		internal: "Blaster",
		order: 7,
	},
	Brush: {
		icon_id: 6,
		internal: "Brush",
		order: 8,
	},
	Stringer: {
		icon_id: 9,
		internal: "Stringer",
		order: 9,
	},
	Splatana: {
		icon_id: 10,
		internal: "Saber",
		order: 10,
	},
} as const satisfies Record<string, WeaponClass>;

export const SUB_WEAPONS = {
	SplatBomb: {
		id: 0,
		internal: "Bomb_Splash",
	},
	SuctionBomb: {
		id: 1,
		internal: "Bomb_Suction",
	},
	BurstBomb: {
		id: 2,
		internal: "Bomb_Quick",
	},
	Sprinkler: {
		id: 3,
		internal: "Sprinkler",
	},
	SplashWall: {
		id: 4,
		internal: "Shield",
	},
	FizzyBomb: {
		id: 5,
		internal: "Bomb_Fizzy",
	},
	CurlingBomb: {
		id: 6,
		internal: "Bomb_Curling",
	},
	Autobomb: {
		id: 7,
		internal: "Bomb_Robot",
	},
	SquidBeakon: {
		id: 8,
		internal: "Beacon",
	},
	PointSensor: {
		id: 9,
		internal: "PointSensor",
	},
	InkMine: {
		id: 10,
		internal: "Trap",
	},
	ToxicMist: {
		id: 11,
		internal: "PoisonMist",
	},
	AngleShooter: {
		id: 12,
		internal: "LineMarker",
	},
	Torpedo: {
		id: 13,
		internal: "Bomb_Torpedo",
		internalTableturf: "BombTako",
	},
} as const satisfies Record<string, SubWeapon>;

export const SPECIAL_WEAPONS = {
	Trizooka: {
		id: 1,
		internal: "SpUltraShot",
		added: "1.0.0",
	},
	BigBubbler: {
		id: 2,
		internal: "SpGreatBarrier",
		added: "1.0.0",
	},
	Zipcaster: {
		id: 3,
		internal: "SpSuperHook",
		added: "1.0.0",
	},
	TentaMissiles: {
		id: 4,
		internal: "SpMultiMissile",
		added: "1.0.0",
	},
	InkStorm: {
		id: 5,
		internal: "SpInkStorm",
		added: "1.0.0",
	},
	BooyahBomb: {
		id: 6,
		internal: "SpNiceBall",
		added: "1.0.0",
	},
	WaveBreaker: {
		id: 7,
		internal: "SpShockSonar",
		internalTableturf: "ShockSonar",
		added: "1.0.0",
	},
	InkVac: {
		id: 8,
		internal: "SpBlower",
		internalTableturf: "Kyuinki",
		added: "1.0.0",
	},
	KillerWail51: {
		id: 9,
		internal: "SpMicroLaser",
		internalTableturf: "SpMegaphoneLaser51",
		added: "1.0.0",
	},
	Inkjet: {
		id: 10,
		internal: "SpJetpack",
		internalTableturf: "Jetpack",
		added: "1.0.0",
	},
	UltraStamp: {
		id: 11,
		internal: "SpUltraStamp",
		added: "1.0.0",
	},
	CrabTank: {
		id: 12,
		internal: "SpChariot",
		internalTableturf: "Kanitank",
		added: "1.0.0",
	},
	Reefslider: {
		id: 13,
		internal: "SpSkewer",
		internalTableturf: "Chidori",
		added: "1.0.0",
	},
	TripleInkstrike: {
		id: 14,
		internal: "SpTripleTornado",
		internalTableturf: "TripleTornado",
		added: "1.0.0",
	},
	Tacticooler: {
		id: 15,
		internal: "SpEnergyStand",
		internalTableturf: "EnergyStand",
		added: "1.0.0",
	},
	SuperChump: {
		id: 16,
		internal: "SpFirework",
		added: "3.0.0",
	},
	KrakenRoyale: {
		id: 17,
		internal: "SpCastle",
		added: "3.0.0",
	},
	TripleSplashdown: {
		id: 18,
		internal: "SpPogo",
		added: "6.0.0",
	},
	SplattercolorScreen: {
		id: 19,
		internal: "SpChimney",
		added: "6.0.0",
	},
} as const satisfies Record<string, SpecialWeapon>;

const WEAPONS = {
	//
	// SHOOTERS
	//
	SplooshOMatic: {
		id: 0,
		internal: "Shooter_Short_00",
		sub: "CurlingBomb",
		special: "UltraStamp",
		pfs: 190,
		class: "Shooter",
		unlock: { type: "level", level: 9 },
		added: "1.0.0",
	},
	NeoSplooshOMatic: {
		id: 1,
		internal: "Shooter_Short_01",
		sub: "SquidBeakon",
		special: "KillerWail51",
		pfs: 170,
		class: "Shooter",
		unlock: { type: "level", level: 13 },
		added: "3.0.0",
	},
	SplattershotJr: {
		id: 10,
		internal: "Shooter_First_00",
		sub: "SplatBomb",
		special: "BigBubbler",
		pfs: 180,
		class: "Shooter",
		unlock: { type: "starter" },
		added: "1.0.0",
	},
	CustomSplattershotJr: {
		id: 11,
		internal: "Shooter_First_01",
		sub: "Torpedo",
		special: "WaveBreaker",
		pfs: 190,
		class: "Shooter",
		unlock: { type: "level", level: 6 },
		added: "2.0.0",
	},
	SplashOMatic: {
		id: 20,
		internal: "Shooter_Precision_00",
		sub: "BurstBomb",
		special: "CrabTank",
		pfs: 210,
		class: "Shooter",
		unlock: { type: "level", level: 16 },
		added: "1.0.0",
	},
	NeoSplashOMatic: {
		id: 21,
		internal: "Shooter_Precision_01",
		sub: "SuctionBomb",
		special: "TripleInkstrike",
		pfs: 200,
		class: "Shooter",
		unlock: { type: "level", level: 21 },
		added: "3.0.0",
	},
	SplashOMaticGckO: {
		id: 22,
		internal: "Shooter_Precision_02",
		internalTableturf: null,
		sub: "ToxicMist",
		special: "InkStorm",
		pfs: 180,
		class: "Shooter",
		unlock: { type: "level", level: 22 },
		added: "10.0.0",
	},
	AerosprayMG: {
		id: 30,
		internal: "Shooter_Blaze_00",
		sub: "FizzyBomb",
		special: "Reefslider",
		pfs: 180,
		class: "Shooter",
		unlock: { type: "level", level: 5 },
		added: "1.0.0",
	},
	AerosprayRG: {
		id: 31,
		internal: "Shooter_Blaze_01",
		sub: "Sprinkler",
		special: "BooyahBomb",
		pfs: 190,
		class: "Shooter",
		unlock: { type: "level", level: 18 },
		added: "2.0.0",
	},
	ColorzAerospray: {
		id: 32,
		internal: "Shooter_Blaze_02",
		internalTableturf: null,
		sub: "BurstBomb",
		special: "SplattercolorScreen",
		pfs: 180,
		class: "Shooter",
		unlock: { type: "level", level: 19 },
		added: "10.0.0",
	},
	Splattershot: {
		id: 40,
		internal: "Shooter_Normal_00",
		sub: "SuctionBomb",
		special: "Trizooka",
		pfs: 200,
		class: "Shooter",
		unlock: { type: "level", level: 2 },
		added: "1.0.0",
	},
	TentatekSplattershot: {
		id: 41,
		internal: "Shooter_Normal_01",
		sub: "SplatBomb",
		special: "TripleInkstrike",
		pfs: 190,
		class: "Shooter",
		unlock: { type: "level", level: 10 },
		added: "2.0.0",
	},
	GlamorzSplattershot: {
		id: 42,
		internal: "Shooter_Normal_02",
		internalTableturf: null,
		sub: "BurstBomb",
		special: "KrakenRoyale",
		pfs: 190,
		class: "Shooter",
		unlock: { type: "level", level: 12 },
		added: "10.0.0",
	},
	HeroShotReplica: {
		id: 45,
		internal: "Shooter_Normal_H",
		internalTableturf: "HeroShooter",
		sub: "SuctionBomb",
		special: "Trizooka",
		pfs: 200,
		class: "Shooter",
		unlock: { type: "complete-story-mode" },
		added: "1.0.0",
	},
	OctoShotReplica: {
		id: 46,
		internal: "Shooter_Normal_O",
		internalTableturf: null,
		sub: "SplatBomb",
		special: "TripleInkstrike",
		pfs: 190,
		class: "Shooter",
		unlock: { type: "side-order" },
		added: "7.0.0",
	},
	OrderShotReplica: {
		id: 47,
		internal: "Shooter_Normal_Oct",
		internalTableturf: null,
		sub: "SuctionBomb",
		special: "Trizooka",
		pfs: 200,
		class: "Shooter",
		unlock: { type: "side-order" },
		added: "7.0.0",
	},
	PlasticBottleShotReplica: {
		id: 48,
		internal: "Shooter_Normal_S",
		internalTableturf: null,
		sub: "SplatBomb",
		special: "TripleInkstrike",
		pfs: 190,
		class: "Shooter",
		unlock: { type: "complete-raiders" },
		added: "11.3.0",
	},
	Gal52: {
		id: 50,
		internal: "Shooter_Gravity_00",
		sub: "SplashWall",
		special: "KillerWail51",
		pfs: 210,
		class: "Shooter",
		unlock: { type: "level", level: 11 },
		added: "1.0.0",
	},
	Gal52Deco: {
		id: 51,
		internal: "Shooter_Gravity_01",
		sub: "CurlingBomb",
		special: "SplattercolorScreen",
		pfs: 190,
		class: "Shooter",
		unlock: { type: "level", level: 14 },
		added: "7.0.0",
	},
	NZap85: {
		id: 60,
		internal: "Shooter_QuickMiddle_00",
		sub: "SuctionBomb",
		special: "Tacticooler",
		pfs: 200,
		class: "Shooter",
		unlock: { type: "level", level: 6 },
		added: "1.0.0",
	},
	NZap89: {
		id: 61,
		internal: "Shooter_QuickMiddle_01",
		sub: "Autobomb",
		special: "SuperChump",
		pfs: 170,
		class: "Shooter",
		unlock: { type: "level", level: 11 },
		added: "3.0.0",
	},
	SplattershotPro: {
		id: 70,
		internal: "Shooter_Expert_00",
		sub: "AngleShooter",
		special: "CrabTank",
		pfs: 190,
		class: "Shooter",
		unlock: { type: "level", level: 9 },
		added: "1.0.0",
	},
	ForgeSplattershotPro: {
		id: 71,
		internal: "Shooter_Expert_01",
		sub: "SuctionBomb",
		special: "BooyahBomb",
		pfs: 200,
		class: "Shooter",
		unlock: { type: "level", level: 20 },
		added: "2.0.0",
	},
	SplattershotProFrzN: {
		id: 72,
		internal: "Shooter_Expert_02",
		internalTableturf: null,
		sub: "SplatBomb",
		special: "TentaMissiles",
		pfs: 180,
		class: "Shooter",
		unlock: { type: "level", level: 23 },
		added: "10.0.0",
	},
	Gal96: {
		id: 80,
		internal: "Shooter_Heavy_00",
		sub: "Sprinkler",
		special: "InkVac",
		pfs: 190,
		class: "Shooter",
		unlock: { type: "level", level: 17 },
		added: "1.0.0",
	},
	Gal96Deco: {
		id: 81,
		internal: "Shooter_Heavy_01",
		sub: "SplashWall",
		special: "KrakenRoyale",
		pfs: 210,
		class: "Shooter",
		unlock: { type: "level", level: 23 },
		added: "3.0.0",
	},
	ClawzGal96: {
		id: 82,
		internal: "Shooter_Heavy_02",
		internalTableturf: null,
		sub: "AngleShooter",
		special: "Tacticooler",
		pfs: 190,
		class: "Shooter",
		unlock: { type: "level", level: 24 },
		added: "10.0.0",
	},
	JetSquelcher: {
		id: 90,
		internal: "Shooter_Long_00",
		sub: "AngleShooter",
		special: "InkVac",
		pfs: 180,
		class: "Shooter",
		unlock: { type: "level", level: 15 },
		added: "1.0.0",
	},
	CustomJetSquelcher: {
		id: 91,
		internal: "Shooter_Long_01",
		sub: "ToxicMist",
		special: "InkStorm",
		pfs: 180,
		class: "Shooter",
		unlock: { type: "level", level: 20 },
		added: "3.0.0",
	},
	JetSquelcherCobR: {
		id: 92,
		internal: "Shooter_Long_02",
		internalTableturf: null,
		sub: "BurstBomb",
		special: "TripleSplashdown",
		pfs: 190,
		class: "Shooter",
		unlock: { type: "level", level: 21 },
		added: "10.0.0",
	},
	SplattershotNova: {
		id: 100,
		internal: "Shooter_QuickLong_00",
		sub: "PointSensor",
		special: "KillerWail51",
		pfs: 190,
		class: "Shooter",
		unlock: { type: "level", level: 8 },
		added: "2.0.0",
	},
	AnnakiSplattershotNova: {
		id: 101,
		internal: "Shooter_QuickLong_01",
		sub: "InkMine",
		special: "Inkjet",
		pfs: 210,
		class: "Shooter",
		unlock: { type: "level", level: 12 },
		added: "4.0.0",
	},
	//
	// SEMI-AUTO
	//
	L3Nozzlenose: {
		id: 300,
		internal: "Shooter_TripleQuick_00",
		sub: "CurlingBomb",
		special: "CrabTank",
		pfs: 190,
		class: "Shooter",
		unlock: { type: "level", level: 13 },
		added: "1.0.0",
	},
	L3NozzlenoseD: {
		id: 301,
		internal: "Shooter_TripleQuick_01",
		sub: "BurstBomb",
		special: "UltraStamp",
		pfs: 200,
		class: "Shooter",
		unlock: { type: "level", level: 19 },
		added: "3.0.0",
	},
	GlitterzL3Nozzlenose: {
		id: 302,
		internal: "Shooter_TripleQuick_02",
		internalTableturf: null,
		sub: "SplatBomb",
		special: "Inkjet",
		pfs: 200,
		class: "Shooter",
		unlock: { type: "level", level: 20 },
		added: "10.0.0",
	},
	H3Nozzlenose: {
		id: 310,
		internal: "Shooter_TripleMiddle_00",
		sub: "PointSensor",
		special: "Tacticooler",
		pfs: 190,
		class: "Shooter",
		unlock: { type: "level", level: 24 },
		added: "1.0.0",
	},
	H3NozzlenoseD: {
		id: 311,
		internal: "Shooter_TripleMiddle_01",
		sub: "SplashWall",
		special: "BigBubbler",
		pfs: 200,
		class: "Shooter",
		unlock: { type: "level", level: 27 },
		added: "4.0.0",
	},
	H3NozzlenoseVipR: {
		id: 312,
		internal: "Shooter_TripleMiddle_02",
		internalTableturf: null,
		sub: "SuctionBomb",
		special: "TripleInkstrike",
		pfs: 200,
		class: "Shooter",
		unlock: { type: "level", level: 29 },
		added: "10.0.0",
	},
	Squeezer: {
		id: 400,
		internal: "Shooter_Flash_00",
		sub: "SplashWall",
		special: "Trizooka",
		pfs: 220,
		class: "Shooter",
		unlock: { type: "level", level: 19 },
		added: "1.0.0",
	},
	FoilSqueezer: {
		id: 401,
		internal: "Shooter_Flash_01",
		sub: "Autobomb",
		special: "SplattercolorScreen",
		pfs: 190,
		class: "Shooter",
		unlock: { type: "level", level: 25 },
		added: "6.0.0",
	},
	//
	// BLASTERS
	//
	LunaBlaster: {
		id: 200,
		internal: "Blaster_Short_00",
		sub: "SplatBomb",
		special: "Zipcaster",
		pfs: 170,
		class: "Blaster",
		unlock: { type: "level", level: 13 },
		added: "1.0.0",
	},
	LunaBlasterNeo: {
		id: 201,
		internal: "Blaster_Short_01",
		sub: "FizzyBomb",
		special: "UltraStamp",
		pfs: 200,
		class: "Blaster",
		unlock: { type: "level", level: 24 },
		added: "2.0.0",
	},
	OrderBlasterReplica: {
		id: 205,
		internal: "Blaster_Short_O",
		internalTableturf: null,
		sub: "SplatBomb",
		special: "Zipcaster",
		pfs: 170,
		class: "Blaster",
		unlock: { type: "side-order" },
		added: "7.0.0",
	},
	Blaster: {
		id: 210,
		internal: "Blaster_Middle_00",
		sub: "Autobomb",
		special: "BigBubbler",
		pfs: 190,
		class: "Blaster",
		unlock: { type: "level", level: 3 },
		added: "1.0.0",
	},
	CustomBlaster: {
		id: 211,
		internal: "Blaster_Middle_01",
		sub: "PointSensor",
		special: "TripleSplashdown",
		pfs: 190,
		class: "Blaster",
		unlock: { type: "level", level: 8 },
		added: "6.0.0",
	},
	GleamzBlaster: {
		id: 212,
		internal: "Blaster_Middle_02",
		internalTableturf: null,
		sub: "SquidBeakon",
		special: "CrabTank",
		pfs: 180,
		class: "Blaster",
		unlock: { type: "level", level: 9 },
		added: "10.0.0",
	},
	RangeBlaster: {
		id: 220,
		internal: "Blaster_Long_00",
		sub: "SuctionBomb",
		special: "WaveBreaker",
		pfs: 210,
		class: "Blaster",
		unlock: { type: "level", level: 11 },
		added: "1.0.0",
	},
	CustomRangeBlaster: {
		id: 221,
		internal: "Blaster_Long_01",
		sub: "SplatBomb",
		special: "KrakenRoyale",
		pfs: 210,
		class: "Blaster",
		unlock: { type: "level", level: 15 },
		added: "8.0.0",
	},
	ClashBlaster: {
		id: 230,
		internal: "Blaster_LightShort_00",
		sub: "SplatBomb",
		special: "Trizooka",
		pfs: 180,
		class: "Blaster",
		unlock: { type: "level", level: 22 },
		added: "1.0.0",
	},
	ClashBlasterNeo: {
		id: 231,
		internal: "Blaster_LightShort_01",
		sub: "CurlingBomb",
		special: "SuperChump",
		pfs: 170,
		class: "Blaster",
		unlock: { type: "level", level: 26 },
		added: "3.0.0",
	},
	RapidBlaster: {
		id: 240,
		internal: "Blaster_Light_00",
		sub: "InkMine",
		special: "TripleInkstrike",
		pfs: 190,
		class: "Blaster",
		unlock: { type: "level", level: 7 },
		added: "1.0.0",
	},
	RapidBlasterDeco: {
		id: 241,
		internal: "Blaster_Light_01",
		sub: "Torpedo",
		special: "Inkjet",
		pfs: 210,
		class: "Blaster",
		unlock: { type: "level", level: 10 },
		added: "3.0.0",
	},
	RapidBlasterPro: {
		id: 250,
		internal: "Blaster_LightLong_00",
		sub: "ToxicMist",
		special: "InkVac",
		pfs: 180,
		class: "Blaster",
		unlock: { type: "level", level: 26 },
		added: "1.0.0",
	},
	RapidBlasterProDeco: {
		id: 251,
		internal: "Blaster_LightLong_01",
		sub: "AngleShooter",
		special: "KillerWail51",
		pfs: 200,
		class: "Blaster",
		unlock: { type: "level", level: 29 },
		added: "4.0.0",
	},
	RapidBlasterProWntR: {
		id: 252,
		internal: "Blaster_LightLong_02",
		internalTableturf: null,
		sub: "SuctionBomb",
		special: "Tacticooler",
		pfs: 200,
		class: "Blaster",
		unlock: { type: "level", level: 30 },
		added: "10.0.0",
	},
	SBlast92: {
		id: 260,
		internal: "Blaster_Precision_00",
		sub: "Sprinkler",
		special: "Reefslider",
		pfs: 180,
		class: "Blaster",
		unlock: { type: "level", level: 20 },
		added: "4.0.0",
	},
	SBlast91: {
		id: 261,
		internal: "Blaster_Precision_01",
		sub: "BurstBomb",
		special: "BooyahBomb",
		pfs: 210,
		class: "Blaster",
		unlock: { type: "level", level: 27 },
		added: "6.0.0",
	},
	//
	// ROLLERS
	//
	CarbonRoller: {
		id: 1000,
		internal: "Roller_Compact_00",
		sub: "Autobomb",
		special: "Zipcaster",
		pfs: 160,
		class: "Roller",
		unlock: { type: "level", level: 6 },
		added: "1.0.0",
	},
	CarbonRollerDeco: {
		id: 1001,
		internal: "Roller_Compact_01",
		sub: "BurstBomb",
		special: "Trizooka",
		pfs: 190,
		class: "Roller",
		unlock: { type: "level", level: 22 },
		added: "2.0.0",
	},
	CarbonRollerAngL: {
		id: 1002,
		internal: "Roller_Compact_02",
		internalTableturf: null,
		sub: "FizzyBomb",
		special: "SuperChump",
		pfs: 170,
		class: "Roller",
		unlock: { type: "level", level: 23 },
		added: "10.0.0",
	},
	SplatRoller: {
		id: 1010,
		internal: "Roller_Normal_00",
		sub: "CurlingBomb",
		special: "BigBubbler",
		pfs: 180,
		class: "Roller",
		unlock: { type: "level", level: 2 },
		added: "1.0.0",
	},
	KrakOnSplatRoller: {
		id: 1011,
		internal: "Roller_Normal_01",
		sub: "SquidBeakon",
		special: "KrakenRoyale",
		pfs: 170,
		class: "Roller",
		unlock: { type: "level", level: 7 },
		added: "3.0.0",
	},
	OrderRollerReplica: {
		id: 1015,
		internal: "Roller_Normal_O",
		internalTableturf: null,
		sub: "CurlingBomb",
		special: "BigBubbler",
		pfs: 180,
		class: "Roller",
		unlock: { type: "side-order" },
		added: "7.0.0",
	},
	DynamoRoller: {
		id: 1020,
		internal: "Roller_Heavy_00",
		sub: "Sprinkler",
		special: "Tacticooler",
		pfs: 210,
		class: "Roller",
		unlock: { type: "level", level: 12 },
		added: "1.0.0",
	},
	GoldDynamoRoller: {
		id: 1021,
		internal: "Roller_Heavy_01",
		sub: "SplatBomb",
		special: "SuperChump",
		pfs: 190,
		class: "Roller",
		unlock: { type: "level", level: 17 },
		added: "5.0.0",
	},
	StarzDynamoRoller: {
		id: 1022,
		internal: "Roller_Heavy_02",
		internalTableturf: null,
		sub: "PointSensor",
		special: "KillerWail51",
		pfs: 180,
		class: "Roller",
		unlock: { type: "level", level: 18 },
		added: "10.0.0",
	},
	FlingzaRoller: {
		id: 1030,
		internal: "Roller_Hunter_00",
		sub: "InkMine",
		special: "TentaMissiles",
		pfs: 210,
		class: "Roller",
		unlock: { type: "level", level: 20 },
		added: "1.0.0",
	},
	FoilFlingzaRoller: {
		id: 1031,
		internal: "Roller_Hunter_01",
		sub: "SuctionBomb",
		special: "SplattercolorScreen",
		pfs: 200,
		class: "Roller",
		unlock: { type: "level", level: 24 },
		added: "7.0.0",
	},
	BigSwigRoller: {
		id: 1040,
		internal: "Roller_Wide_00",
		sub: "SplashWall",
		special: "InkVac",
		pfs: 180,
		class: "Roller",
		unlock: { type: "level", level: 16 },
		added: "2.0.0",
	},
	BigSwigRollerExpress: {
		id: 1041,
		internal: "Roller_Wide_01",
		sub: "AngleShooter",
		special: "InkStorm",
		pfs: 180,
		class: "Roller",
		unlock: { type: "level", level: 18 },
		added: "4.0.0",
	},
	PlanetzBigSwigRoller: {
		id: 1042,
		internal: "Roller_Wide_02",
		internalTableturf: null,
		sub: "Torpedo",
		special: "TripleSplashdown",
		pfs: 180,
		class: "Roller",
		unlock: { type: "level", level: 21 },
		added: "10.0.0",
	},
	//
	// BRUSHES
	//
	Inkbrush: {
		id: 1100,
		internal: "Brush_Mini_00",
		sub: "SplatBomb",
		special: "KillerWail51",
		pfs: 180,
		class: "Brush",
		unlock: { type: "level", level: 7 },
		added: "1.0.0",
	},
	InkbrushNouveau: {
		id: 1101,
		internal: "Brush_Mini_01",
		sub: "InkMine",
		special: "UltraStamp",
		pfs: 190,
		class: "Brush",
		unlock: { type: "level", level: 15 },
		added: "2.0.0",
	},
	Octobrush: {
		id: 1110,
		internal: "Brush_Normal_00",
		sub: "SuctionBomb",
		special: "Zipcaster",
		pfs: 190,
		class: "Brush",
		unlock: { type: "level", level: 4 },
		added: "1.0.0",
	},
	OctobrushNouveau: {
		id: 1111,
		internal: "Brush_Normal_01",
		sub: "SquidBeakon",
		special: "InkStorm",
		pfs: 180,
		class: "Brush",
		unlock: { type: "level", level: 9 },
		added: "5.0.0",
	},
	CometzOctobrush: {
		id: 1112,
		internal: "Brush_Normal_02",
		internalTableturf: null,
		sub: "Autobomb",
		special: "KrakenRoyale",
		pfs: 190,
		class: "Brush",
		unlock: { type: "level", level: 11 },
		added: "10.0.0",
	},
	OrderbrushReplica: {
		id: 1115,
		internal: "Brush_Normal_O",
		internalTableturf: null,
		sub: "SuctionBomb",
		special: "Zipcaster",
		pfs: 190,
		class: "Brush",
		unlock: { type: "side-order" },
		added: "7.0.0",
	},
	Painbrush: {
		id: 1120,
		internal: "Brush_Heavy_00",
		sub: "CurlingBomb",
		special: "WaveBreaker",
		pfs: 190,
		class: "Brush",
		unlock: { type: "level", level: 14 },
		added: "4.0.0",
	},
	PainbrushNouveau: {
		id: 1121,
		internal: "Brush_Heavy_01",
		sub: "PointSensor",
		special: "TentaMissiles",
		pfs: 190,
		class: "Brush",
		unlock: { type: "level", level: 16 },
		added: "6.0.0",
	},
	PainbrushBrnZ: {
		id: 1122,
		internal: "Brush_Heavy_02",
		internalTableturf: null,
		sub: "SplashWall",
		special: "Trizooka",
		pfs: 190,
		class: "Brush",
		unlock: { type: "level", level: 18 },
		added: "10.0.0",
	},
	//
	// CHARGERS
	//
	ClassicSquiffer: {
		id: 2000,
		internal: "Charger_Quick_00",
		sub: "PointSensor",
		special: "BigBubbler",
		pfs: 190,
		class: "Charger",
		unlock: { type: "level", level: 8 },
		added: "1.0.0",
	},
	NewSquiffer: {
		id: 2001,
		internal: "Charger_Quick_01",
		sub: "Autobomb",
		special: "Zipcaster",
		pfs: 180,
		class: "Charger",
		unlock: { type: "level", level: 11 },
		added: "7.0.0",
	},
	SplatCharger: {
		id: 2010,
		internal: "Charger_Normal_00",
		sub: "SplatBomb",
		special: "InkVac",
		pfs: 190,
		class: "Charger",
		unlock: { type: "level", level: 2 },
		added: "1.0.0",
	},
	ZFSplatCharger: {
		id: 2011,
		internal: "Charger_Normal_01",
		sub: "SplashWall",
		special: "TripleInkstrike",
		pfs: 200,
		class: "Charger",
		unlock: { type: "level", level: 9 },
		added: "3.0.0",
	},
	SplatChargerCamO: {
		id: 2012,
		internal: "Charger_Normal_02",
		internalTableturf: null,
		sub: "Sprinkler",
		special: "CrabTank",
		pfs: 200,
		class: "Charger",
		unlock: { type: "level", level: 10 },
		added: "10.0.0",
	},
	OrderChargerReplica: {
		id: 2015,
		internal: "Charger_Normal_O",
		internalTableturf: null,
		sub: "SplatBomb",
		special: "InkVac",
		pfs: 190,
		class: "Charger",
		unlock: { type: "side-order" },
		added: "7.0.0",
	},
	Splatterscope: {
		id: 2020,
		internal: "Charger_NormalScope_00",
		sub: "SplatBomb",
		special: "InkVac",
		pfs: 190,
		class: "Charger",
		unlock: { type: "level", level: 10 },
		added: "1.0.0",
	},
	ZFSplatterscope: {
		id: 2021,
		internal: "Charger_NormalScope_01",
		sub: "SplashWall",
		special: "TripleInkstrike",
		pfs: 200,
		class: "Charger",
		unlock: { type: "level", level: 15 },
		added: "3.0.0",
	},
	SplatterscopeCamO: {
		id: 2022,
		internal: "Charger_NormalScope_02",
		internalTableturf: null,
		sub: "Sprinkler",
		special: "CrabTank",
		pfs: 200,
		class: "Charger",
		unlock: { type: "level", level: 17 },
		added: "10.0.0",
	},
	Eliter4K: {
		id: 2030,
		internal: "Charger_Long_00",
		sub: "InkMine",
		special: "WaveBreaker",
		pfs: 210,
		class: "Charger",
		unlock: { type: "level", level: 18 },
		added: "1.0.0",
	},
	CustomEliter4K: {
		id: 2031,
		internal: "Charger_Long_01",
		sub: "SquidBeakon",
		special: "KrakenRoyale",
		pfs: 210,
		class: "Charger",
		unlock: { type: "level", level: 20 },
		added: "7.0.0",
	},
	Eliter4KScope: {
		id: 2040,
		internal: "Charger_LongScope_00",
		sub: "InkMine",
		special: "WaveBreaker",
		pfs: 210,
		class: "Charger",
		unlock: { type: "level", level: 27 },
		added: "1.0.0",
	},
	CustomEliter4KScope: {
		id: 2041,
		internal: "Charger_LongScope_01",
		sub: "SquidBeakon",
		special: "KrakenRoyale",
		pfs: 210,
		class: "Charger",
		unlock: { type: "level", level: 28 },
		added: "7.0.0",
	},
	Bamboozler14MkI: {
		id: 2050,
		internal: "Charger_Light_00",
		sub: "Autobomb",
		special: "KillerWail51",
		pfs: 190,
		class: "Charger",
		unlock: { type: "level", level: 23 },
		added: "1.0.0",
	},
	Bamboozler14MkII: {
		id: 2051,
		internal: "Charger_Light_01",
		sub: "FizzyBomb",
		special: "SuperChump",
		pfs: 190,
		class: "Charger",
		unlock: { type: "level", level: 26 },
		added: "8.0.0",
	},
	GooTuber: {
		id: 2060,
		internal: "Charger_Keeper_00",
		sub: "Torpedo",
		special: "TentaMissiles",
		pfs: 200,
		class: "Charger",
		unlock: { type: "level", level: 25 },
		added: "1.0.0",
	},
	CustomGooTuber: {
		id: 2061,
		internal: "Charger_Keeper_01",
		sub: "FizzyBomb",
		special: "UltraStamp",
		pfs: 200,
		class: "Charger",
		unlock: { type: "level", level: 28 },
		added: "5.0.0",
	},
	Snipewriter5H: {
		id: 2070,
		internal: "Charger_Pencil_00",
		sub: "Sprinkler",
		special: "Tacticooler",
		pfs: 220,
		class: "Charger",
		unlock: { type: "level", level: 14 },
		added: "2.0.0",
	},
	Snipewriter5B: {
		id: 2071,
		internal: "Charger_Pencil_01",
		sub: "SplashWall",
		special: "InkStorm",
		pfs: 200,
		class: "Charger",
		unlock: { type: "level", level: 19 },
		added: "6.0.0",
	},
	//
	// SLOSHERS
	//
	Slosher: {
		id: 3000,
		internal: "Slosher_Strong_00",
		sub: "SplatBomb",
		special: "TripleInkstrike",
		pfs: 220,
		class: "Slosher",
		unlock: { type: "level", level: 3 },
		added: "1.0.0",
	},
	SlosherDeco: {
		id: 3001,
		internal: "Slosher_Strong_01",
		sub: "AngleShooter",
		special: "Zipcaster",
		pfs: 170,
		class: "Slosher",
		unlock: { type: "level", level: 12 },
		added: "2.0.0",
	},
	OrderSlosherReplica: {
		id: 3005,
		internal: "Slosher_Strong_O",
		internalTableturf: null,
		sub: "SplatBomb",
		special: "TripleInkstrike",
		pfs: 220,
		class: "Slosher",
		unlock: { type: "side-order" },
		added: "7.0.0",
	},
	TriSlosher: {
		id: 3010,
		internal: "Slosher_Diffusion_00",
		sub: "ToxicMist",
		special: "Inkjet",
		pfs: 180,
		class: "Slosher",
		unlock: { type: "level", level: 10 },
		added: "1.0.0",
	},
	TriSlosherNouveau: {
		id: 3011,
		internal: "Slosher_Diffusion_01",
		sub: "FizzyBomb",
		special: "Tacticooler",
		pfs: 200,
		class: "Slosher",
		unlock: { type: "level", level: 17 },
		added: "3.0.0",
	},
	TriSlosherAshN: {
		id: 3012,
		internal: "Slosher_Diffusion_02",
		internalTableturf: null,
		sub: "SplatBomb",
		special: "SplattercolorScreen",
		pfs: 180,
		class: "Slosher",
		unlock: { type: "level", level: 19 },
		added: "10.0.0",
	},
	SloshingMachine: {
		id: 3020,
		internal: "Slosher_Launcher_00",
		sub: "FizzyBomb",
		special: "BooyahBomb",
		pfs: 210,
		class: "Slosher",
		unlock: { type: "level", level: 14 },
		added: "1.0.0",
	},
	SloshingMachineNeo: {
		id: 3021,
		internal: "Slosher_Launcher_01",
		sub: "PointSensor",
		special: "Trizooka",
		pfs: 190,
		class: "Slosher",
		unlock: { type: "level", level: 21 },
		added: "5.0.0",
	},
	Bloblobber: {
		id: 3030,
		internal: "Slosher_Bathtub_00",
		sub: "Sprinkler",
		special: "InkStorm",
		pfs: 190,
		class: "Slosher",
		unlock: { type: "level", level: 19 },
		added: "1.0.0",
	},
	BloblobberDeco: {
		id: 3031,
		internal: "Slosher_Bathtub_01",
		sub: "AngleShooter",
		special: "KrakenRoyale",
		pfs: 190,
		class: "Slosher",
		unlock: { type: "level", level: 23 },
		added: "5.0.0",
	},
	Explosher: {
		id: 3040,
		// what the fuck?????
		internal: "Slosher_Washtub_00",
		sub: "PointSensor",
		special: "InkStorm",
		pfs: 200,
		class: "Slosher",
		unlock: { type: "level", level: 29 },
		added: "1.0.0",
	},
	CustomExplosher: {
		id: 3041,
		internal: "Slosher_Washtub_01",
		sub: "SplashWall",
		special: "TripleSplashdown",
		pfs: 190,
		class: "Slosher",
		unlock: { type: "level", level: 30 },
		added: "7.0.0",
	},
	DreadWringer: {
		id: 3050,
		internal: "Slosher_Double_00",
		sub: "SuctionBomb",
		special: "Reefslider",
		pfs: 200,
		class: "Slosher",
		unlock: { type: "level", level: 15 },
		added: "5.0.0",
	},
	DreadWringerD: {
		id: 3051,
		internal: "Slosher_Double_01",
		sub: "SquidBeakon",
		special: "WaveBreaker",
		pfs: 190,
		class: "Slosher",
		unlock: { type: "level", level: 18 },
		added: "7.0.0",
	},
	HornzDreadWringer: {
		id: 3052,
		internal: "Slosher_Double_02",
		internalTableturf: null,
		sub: "CurlingBomb",
		special: "CrabTank",
		pfs: 200,
		class: "Slosher",
		unlock: { type: "level", level: 20 },
		added: "10.0.0",
	},
	//
	// SPLATLINGS
	//
	MiniSplatling: {
		id: 4000,
		internal: "Spinner_Quick_00",
		sub: "BurstBomb",
		special: "UltraStamp",
		pfs: 200,
		class: "Splatling",
		unlock: { type: "level", level: 12 },
		added: "1.0.0",
	},
	ZinkMiniSplatling: {
		id: 4001,
		internal: "Spinner_Quick_01",
		sub: "ToxicMist",
		special: "BigBubbler",
		pfs: 200,
		class: "Splatling",
		unlock: { type: "level", level: 25 },
		added: "2.0.0",
	},
	MiniSplatlingRtlR: {
		id: 4002,
		internal: "Spinner_Quick_02",
		internalTableturf: null,
		sub: "SquidBeakon",
		special: "Trizooka",
		pfs: 200,
		class: "Splatling",
		unlock: { type: "level", level: 27 },
		added: "10.0.0",
	},
	HeavySplatling: {
		id: 4010,
		internal: "Spinner_Standard_00",
		sub: "Sprinkler",
		special: "WaveBreaker",
		pfs: 210,
		class: "Splatling",
		unlock: { type: "level", level: 4 },
		added: "1.0.0",
	},
	HeavySplatlingDeco: {
		id: 4011,
		internal: "Spinner_Standard_01",
		sub: "PointSensor",
		special: "KrakenRoyale",
		pfs: 200,
		class: "Splatling",
		unlock: { type: "level", level: 15 },
		added: "1.0.0",
	},
	OrderSplatlingReplica: {
		id: 4015,
		internal: "Spinner_Standard_O",
		internalTableturf: null,
		sub: "Sprinkler",
		special: "WaveBreaker",
		pfs: 210,
		class: "Splatling",
		unlock: { type: "side-order" },
		added: "7.0.0",
	},
	HydraSplatling: {
		id: 4020,
		internal: "Spinner_Hyper_00",
		sub: "Autobomb",
		special: "BooyahBomb",
		pfs: 190,
		class: "Splatling",
		unlock: { type: "level", level: 20 },
		added: "1.0.0",
	},
	CustomHydraSplatling: {
		id: 4021,
		internal: "Spinner_Hyper_01",
		sub: "InkMine",
		special: "SplattercolorScreen",
		pfs: 190,
		class: "Splatling",
		unlock: { type: "level", level: 23 },
		added: "8.0.0",
	},
	TorrentzHydraSplatling: {
		id: 4022,
		internal: "Spinner_Hyper_02",
		internalTableturf: null,
		sub: "Sprinkler",
		special: "BigBubbler",
		pfs: 200,
		class: "Splatling",
		unlock: { type: "level", level: 26 },
		added: "10.0.0",
	},
	BallpointSplatling: {
		id: 4030,
		internal: "Spinner_Downpour_00",
		sub: "FizzyBomb",
		special: "Inkjet",
		pfs: 210,
		class: "Splatling",
		unlock: { type: "level", level: 30 },
		added: "1.0.0",
	},
	BallpointSplatlingNouveau: {
		id: 4031,
		internal: "Spinner_Downpour_01",
		sub: "InkMine",
		special: "InkVac",
		pfs: 200,
		class: "Splatling",
		unlock: { type: "level", level: 30 },
		added: "5.0.0",
	},
	Nautilus47: {
		id: 4040,
		internal: "Spinner_Serein_00",
		sub: "PointSensor",
		special: "InkStorm",
		pfs: 190,
		class: "Splatling",
		unlock: { type: "level", level: 28 },
		added: "1.0.0",
	},
	Nautilus79: {
		id: 4041,
		internal: "Spinner_Serein_01",
		sub: "SuctionBomb",
		special: "TripleSplashdown",
		pfs: 200,
		class: "Splatling",
		unlock: { type: "level", level: 29 },
		added: "7.0.0",
	},
	HeavyEditSplatling: {
		id: 4050,
		internal: "Spinner_HyperShort_00",
		sub: "CurlingBomb",
		special: "Tacticooler",
		pfs: 200,
		class: "Splatling",
		unlock: { type: "level", level: 13 },
		added: "5.0.0",
	},
	HeavyEditSplatlingNouveau: {
		id: 4051,
		internal: "Spinner_HyperShort_01",
		sub: "SplatBomb",
		special: "CrabTank",
		pfs: 200,
		class: "Splatling",
		unlock: { type: "level", level: 17 },
		added: "8.0.0",
	},
	//
	// DUALIES
	//
	DappleDualies: {
		id: 5000,
		internal: "Maneuver_Short_00",
		sub: "SquidBeakon",
		special: "Tacticooler",
		pfs: 180,
		class: "Dualies",
		unlock: { type: "level", level: 14 },
		added: "1.0.0",
	},
	DappleDualiesNouveau: {
		id: 5001,
		internal: "Maneuver_Short_01",
		sub: "Torpedo",
		special: "Reefslider",
		pfs: 190,
		class: "Dualies",
		unlock: { type: "level", level: 26 },
		added: "2.0.0",
	},
	DappleDualiesNocT: {
		id: 5002,
		internal: "Maneuver_Short_02",
		internalTableturf: null,
		sub: "SplatBomb",
		special: "KillerWail51",
		pfs: 190,
		class: "Dualies",
		unlock: { type: "level", level: 28 },
		added: "10.0.0",
	},
	SplatDualies: {
		id: 5010,
		internal: "Maneuver_Normal_00",
		sub: "SuctionBomb",
		special: "CrabTank",
		pfs: 200,
		class: "Dualies",
		unlock: { type: "level", level: 3 },
		added: "1.0.0",
	},
	EnperrySplatDualies: {
		id: 5011,
		internal: "Maneuver_Normal_01",
		sub: "CurlingBomb",
		special: "TripleSplashdown",
		pfs: 190,
		class: "Dualies",
		unlock: { type: "level", level: 10 },
		added: "6.0.0",
	},
	TwinklezSplatDualies: {
		id: 5012,
		internal: "Maneuver_Normal_02",
		internalTableturf: null,
		sub: "FizzyBomb",
		special: "BigBubbler",
		pfs: 190,
		class: "Dualies",
		unlock: { type: "level", level: 15 },
		added: "10.0.0",
	},
	OrderDualieReplicas: {
		id: 5015,
		internal: "Maneuver_Normal_O",
		internalTableturf: "ManeuverSdodr",
		sub: "SuctionBomb",
		special: "CrabTank",
		pfs: 200,
		class: "Dualies",
		unlock: { type: "side-order" },
		added: "7.0.0",
	},
	GloogaDualies: {
		id: 5020,
		internal: "Maneuver_Gallon_00",
		sub: "SplashWall",
		special: "BooyahBomb",
		pfs: 180,
		class: "Dualies",
		unlock: { type: "level", level: 21 },
		added: "1.0.0",
	},
	GloogaDualiesDeco: {
		id: 5021,
		internal: "Maneuver_Gallon_01",
		sub: "PointSensor",
		special: "Trizooka",
		pfs: 190,
		class: "Dualies",
		unlock: { type: "level", level: 26 },
		added: "7.0.0",
	},
	DualieSquelchers: {
		id: 5030,
		internal: "Maneuver_Dual_00",
		sub: "SplatBomb",
		special: "WaveBreaker",
		pfs: 200,
		class: "Dualies",
		unlock: { type: "level", level: 8 },
		added: "1.0.0",
	},
	CustomDualieSquelchers: {
		id: 5031,
		internal: "Maneuver_Dual_01",
		sub: "SquidBeakon",
		special: "SuperChump",
		pfs: 200,
		class: "Dualies",
		unlock: { type: "level", level: 16 },
		added: "4.0.0",
	},
	HoofzDualieSquelchers: {
		id: 5032,
		internal: "Maneuver_Dual_02",
		internalTableturf: null,
		sub: "PointSensor",
		special: "SplattercolorScreen",
		pfs: 190,
		class: "Dualies",
		unlock: { type: "level", level: 17 },
		added: "10.0.0",
	},
	DarkTetraDualies: {
		id: 5040,
		internal: "Maneuver_Stepper_00",
		sub: "Autobomb",
		special: "Reefslider",
		pfs: 200,
		class: "Dualies",
		unlock: { type: "level", level: 17 },
		added: "1.0.0",
	},
	LightTetraDualies: {
		id: 5041,
		internal: "Maneuver_Stepper_01",
		sub: "Sprinkler",
		special: "Zipcaster",
		pfs: 190,
		class: "Dualies",
		unlock: { type: "level", level: 24 },
		added: "4.0.0",
	},
	DouserDualiesFF: {
		id: 5050,
		internal: "Maneuver_Long_00",
		sub: "InkMine",
		special: "KillerWail51",
		pfs: 190,
		class: "Dualies",
		unlock: { type: "level", level: 22 },
		added: "7.0.0",
	},
	CustomDouserDualiesFF: {
		id: 5051,
		internal: "Maneuver_Long_01",
		sub: "BurstBomb",
		special: "TripleInkstrike",
		pfs: 200,
		class: "Dualies",
		unlock: { type: "level", level: 27 },
		added: "8.0.0",
	},
	//
	// BRELLAS
	//
	SplatBrella: {
		id: 6000,
		internal: "Shelter_Normal_00",
		sub: "Sprinkler",
		special: "TripleInkstrike",
		pfs: 210,
		class: "Brella",
		unlock: { type: "level", level: 5 },
		added: "1.0.0",
	},
	SorellaBrella: {
		id: 6001,
		internal: "Shelter_Normal_01",
		sub: "Autobomb",
		special: "Inkjet",
		pfs: 210,
		class: "Brella",
		unlock: { type: "level", level: 19 },
		added: "5.0.0",
	},
	OrderBrellaReplica: {
		id: 6005,
		internal: "Shelter_Normal_O",
		internalTableturf: null,
		sub: "Sprinkler",
		special: "TripleInkstrike",
		pfs: 210,
		class: "Brella",
		unlock: { type: "side-order" },
		added: "7.0.0",
	},
	TentaBrella: {
		id: 6010,
		internal: "Shelter_Wide_00",
		sub: "SquidBeakon",
		special: "InkVac",
		pfs: 190,
		class: "Brella",
		unlock: { type: "level", level: 16 },
		added: "1.0.0",
	},
	TentaSorellaBrella: {
		id: 6011,
		internal: "Shelter_Wide_01",
		sub: "InkMine",
		special: "Trizooka",
		pfs: 200,
		class: "Brella",
		unlock: { type: "level", level: 22 },
		added: "4.0.0",
	},
	TentaBrellaCreM: {
		id: 6012,
		internal: "Shelter_Wide_02",
		internalTableturf: null,
		sub: "ToxicMist",
		special: "SuperChump",
		pfs: 180,
		class: "Brella",
		unlock: { type: "level", level: 25 },
		added: "10.0.0",
	},
	UndercoverBrella: {
		id: 6020,
		internal: "Shelter_Compact_00",
		sub: "InkMine",
		special: "Reefslider",
		pfs: 180,
		class: "Brella",
		unlock: { type: "level", level: 18 },
		added: "1.0.0",
	},
	UndercoverSorellaBrella: {
		id: 6021,
		internal: "Shelter_Compact_01",
		sub: "Torpedo",
		special: "SplattercolorScreen",
		pfs: 180,
		class: "Brella",
		unlock: { type: "level", level: 23 },
		added: "6.0.0",
	},
	PatternzUndercoverBrella: {
		id: 6022,
		internal: "Shelter_Compact_02",
		internalTableturf: null,
		sub: "CurlingBomb",
		special: "KillerWail51",
		pfs: 180,
		class: "Brella",
		unlock: { type: "level", level: 27 },
		added: "10.0.0",
	},
	RecycledBrella24MkI: {
		id: 6030,
		internal: "Shelter_Focus_00",
		sub: "AngleShooter",
		special: "BigBubbler",
		pfs: 190,
		class: "Brella",
		unlock: { type: "level", level: 13 },
		added: "7.0.0",
	},
	RecycledBrella24MkII: {
		id: 6031,
		internal: "Shelter_Focus_01",
		sub: "ToxicMist",
		special: "TripleSplashdown",
		pfs: 190,
		class: "Brella",
		unlock: { type: "level", level: 20 },
		added: "8.0.0",
	},
	//
	// STRINGER
	//
	TriStringer: {
		id: 7010,
		internal: "Stringer_Normal_00",
		sub: "ToxicMist",
		special: "KillerWail51",
		pfs: 190,
		class: "Stringer",
		unlock: { type: "level", level: 4 },
		added: "1.0.0",
	},
	InklineTriStringer: {
		id: 7011,
		internal: "Stringer_Normal_01",
		sub: "Sprinkler",
		special: "SuperChump",
		pfs: 200,
		class: "Stringer",
		unlock: { type: "level", level: 11 },
		added: "5.0.0",
	},
	BulbzTriStringer: {
		id: 7012,
		internal: "Stringer_Normal_02",
		internalTableturf: null,
		sub: "AngleShooter",
		special: "Inkjet",
		pfs: 200,
		class: "Stringer",
		unlock: { type: "level", level: 13 },
		added: "10.0.0",
	},
	OrderStringerReplica: {
		id: 7015,
		internal: "Stringer_Normal_O",
		internalTableturf: null,
		sub: "ToxicMist",
		special: "KillerWail51",
		pfs: 190,
		class: "Stringer",
		unlock: { type: "side-order" },
		added: "7.0.0",
	},
	Reeflux450: {
		id: 7020,
		internal: "Stringer_Short_00",
		sub: "CurlingBomb",
		special: "TentaMissiles",
		pfs: 210,
		class: "Stringer",
		unlock: { type: "level", level: 10 },
		added: "1.0.0",
	},
	Reeflux450Deco: {
		id: 7021,
		internal: "Stringer_Short_01",
		sub: "SplashWall",
		special: "Reefslider",
		pfs: 200,
		class: "Stringer",
		unlock: { type: "level", level: 12 },
		added: "6.0.0",
	},
	Reeflux450MilK: {
		id: 7022,
		internal: "Stringer_Short_02",
		internalTableturf: null,
		sub: "Torpedo",
		special: "BooyahBomb",
		pfs: 210,
		class: "Stringer",
		unlock: { type: "level", level: 16 },
		added: "10.0.0",
	},
	WellstringV: {
		id: 7030,
		internal: "Stringer_Explosion_00",
		sub: "Autobomb",
		special: "UltraStamp",
		pfs: 200,
		class: "Stringer",
		unlock: { type: "level", level: 19 },
		added: "8.0.0",
	},
	CustomWellstringV: {
		id: 7031,
		internal: "Stringer_Explosion_01",
		sub: "PointSensor",
		special: "WaveBreaker",
		pfs: 190,
		class: "Stringer",
		unlock: { type: "level", level: 24 },
		added: "8.0.0",
	},
	//
	// SPLATANAS
	//
	SplatanaStamper: {
		id: 8000,
		internal: "Saber_Normal_00",
		sub: "BurstBomb",
		special: "Zipcaster",
		pfs: 210,
		class: "Splatana",
		unlock: { type: "level", level: 15 },
		added: "1.0.0",
	},
	SplatanaStamperNouveau: {
		id: 8001,
		internal: "Saber_Normal_01",
		sub: "ToxicMist",
		special: "CrabTank",
		pfs: 210,
		class: "Splatana",
		unlock: { type: "level", level: 20 },
		added: "6.0.0",
	},
	StickerzSplatanaStamper: {
		id: 8002,
		internal: "Saber_Normal_02",
		internalTableturf: null,
		sub: "Autobomb",
		special: "BooyahBomb",
		pfs: 190,
		class: "Splatana",
		unlock: { type: "level", level: 22 },
		added: "10.0.0",
	},
	OrderSplatanaReplica: {
		id: 8005,
		internal: "Saber_Normal_O",
		internalTableturf: null,
		sub: "BurstBomb",
		special: "Zipcaster",
		pfs: 210,
		class: "Splatling",
		unlock: { type: "side-order" },
		added: "7.0.0",
	},
	SplatanaWiper: {
		id: 8010,
		internal: "Saber_Lite_00",
		internalTableturf: "SaberLight00",
		sub: "Torpedo",
		special: "UltraStamp",
		pfs: 190,
		class: "Splatana",
		unlock: { type: "level", level: 5 },
		added: "1.0.0",
	},
	SplatanaWiperDeco: {
		id: 8011,
		internal: "Saber_Lite_01",
		internalTableturf: "SaberLight01",
		sub: "SquidBeakon",
		special: "TentaMissiles",
		pfs: 190,
		class: "Splatana",
		unlock: { type: "level", level: 10 },
		added: "4.0.0",
	},
	SplatanaWiperRusT: {
		id: 8012,
		internal: "Saber_Lite_02",
		internalTableturf: null,
		sub: "CurlingBomb",
		special: "Trizooka",
		pfs: 190,
		class: "Splatana",
		unlock: { type: "level", level: 14 },
		added: "10.0.0",
	},
	MintDecavitator: {
		id: 8020,
		internal: "Saber_Heavy_00",
		sub: "SuctionBomb",
		special: "BigBubbler",
		pfs: 210,
		class: "Splatana",
		unlock: { type: "level", level: 21 },
		added: "8.0.0",
	},
	CharcoalDecavitator: {
		id: 8021,
		internal: "Saber_Heavy_01",
		sub: "SplashWall",
		special: "Inkjet",
		pfs: 200,
		class: "Splatling",
		unlock: { type: "level", level: 25 },
		added: "8.0.0",
	},
} as const satisfies Record<string, Weapon>;

const seenIds = new Set();
const seenInternalIds = new Set();
for (const weapon of Object.values(WEAPONS)) {
	if (seenIds.has(weapon.id)) {
		throw new Error(`ID ${weapon.id} has already been seen`);
	}
	if (seenInternalIds.has(weapon.internal)) {
		throw new Error(`Internal ID ${weapon.internal} has already been seen`);
	}

	seenIds.add(weapon.id);
	seenInternalIds.add(weapon.internal);
}
for (const sub of Object.values(SUB_WEAPONS)) {
	if (seenInternalIds.has(sub.internal)) {
		throw new Error(`Internal ID ${sub.internal} has already been seen`);
	}

	seenInternalIds.add(sub.internal);
}
for (const special of Object.values(SPECIAL_WEAPONS)) {
	if (seenInternalIds.has(special.internal)) {
		throw new Error(`Internal ID ${special.internal} has already been seen`);
	}

	seenInternalIds.add(special.internal);
}

function mapObject<I, O>(
	object: Record<string, I>,
	mapper: (before: NoInfer<I>) => O
): Record<string, O> {
	return Object.fromEntries(
		Object.entries(object).map(([k, v]) => [k, mapper(v)])
	);
}

const BASE_URL =
	"https://raw.githubusercontent.com/Leanny/splat3/refs/heads/main";
function getTableturfCardUrl(id: string | null): string | null {
	if (id === null) {
		return null;
	}

	const withoutUnderscore = id.replaceAll("_", "");
	const hasTableturfCard =
		withoutUnderscore in LANG_EN["CommonMsg/MiniGame/MiniGameCardName"];
	if (!hasTableturfCard) {
		throw new Error(`Expected ${id} to have a tableturf card.`);
	}
	return `${BASE_URL}/images/minigame/card/${withoutUnderscore}.png`;
}

function lang<const N extends keyof typeof LANG_EN>(
	namespace: N,
	key: keyof (typeof LANG_EN)[N]
) {
	return {
		en: LANG_EN[namespace][key],
	};
}

const CLASSES_FOR_OUTPUT = mapObject(WEAPON_CLASSES, (value: WeaponClass) => {
	return {
		...value,
		lang: lang("CommonMsg/Weapon/WeaponTypeName", value.internal),
		image: {
			"2d": `${BASE_URL}/images/weapon_type/IconTypeWpn_${value.icon_id.toString().padStart(2, "0")}.png`,
		},
	};
});
const WEAPONS_FOR_OUTPUT = mapObject(WEAPONS, (value: Weapon) => {
	return {
		...value,
		lang: lang("CommonMsg/Weapon/WeaponName_Main", value.internal),
		image: {
			tableturf: getTableturfCardUrl(
				value.internalTableturf === undefined
					? value.internal
					: value.internalTableturf
			),
			"2d": `${BASE_URL}/images/weapon_flat/Path_Wst_${value.internal}.png`,
			"3d": `${BASE_URL}/images/weapon/Wst_${value.internal}.png`,
		},
	};
});
const SUBS_FOR_OUTPUT = mapObject(SUB_WEAPONS, (value: SubWeapon) => {
	return {
		...value,
		lang: lang("CommonMsg/Weapon/WeaponName_Sub", value.internal),
		image: {
			tableturf: getTableturfCardUrl(value.internalTableturf ?? value.internal),
			"2d": `${BASE_URL}/images/subspe/Wsb_${value.internal}00.png`,
		},
	};
});
const SPECIALS_FOR_OUTPUT = mapObject(
	SPECIAL_WEAPONS,
	(value: SpecialWeapon) => {
		return {
			...value,
			lang: lang("CommonMsg/Weapon/WeaponName_Special", value.internal),
			image: {
				tableturf: getTableturfCardUrl(
					value.internalTableturf ?? value.internal
				),
				"2d": `${BASE_URL}/images/subspe/Wsp_${value.internal}00.png`,
			},
		};
	}
);

const OUTPUT = {
	classes: CLASSES_FOR_OUTPUT,
	weapons: WEAPONS_FOR_OUTPUT,
	subs: SUBS_FOR_OUTPUT,
	specials: SPECIALS_FOR_OUTPUT,
};
fs.writeFile("./weapons.json", JSON.stringify(OUTPUT, null, "\t"), () => {});
