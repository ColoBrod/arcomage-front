module.exports = [
  /**
   * RED
   */
  {
    slug: "brick_shortage",
    title: "Brick Shortage",
    res: { id: 0, cost: 0 },
    desc: "All players lose 8 bricks",
    handler: (p, e) => {
      p.apply("bricks", -8);
      e.apply("bricks", -8);
    },
  },
  {
    slug: "lucky_cache",
    title: "Lucky Cache",
    res: { id: 0, cost: 0 },
    desc: "+2 Bricks. +2 Gems. Play again",
    handler: (p, e) => {
      p.apply("bricks", 2);
      p.apply("gems", 2);
      p.apply("playagain", 1);
    },
  },
  {
    slug: "friendly_terrain",
    title: "Friendly Terrain",
    res: { id: 0, cost: 1 },
    desc: "+1 Wall. Play again",
    handler: (p, e) => {
      p.apply("wall", 1);
      p.apply("playagain", 1);
    },
  },
  {
    slug: "miners",
    title: "Miners",
    res: { id: 0, cost: 3 },
    desc: "+1 Quarry",
    handler: (p, e) => {
      p.apply("quarry", 1);
    },
  },
  {
    slug: "mother_lode",
    title: "Mother Lode",
    res: { id: 0, cost: 4 },
    desc: "If quarry < enemy quarry, +2 quarry. Else, +1 quarry",
    handler: (p, e) => {
      // TODO
      if (p.res[0].income < e.res[0].income) p.apply("quarry", 2);
      else p.apply("quarry", 1);
    },
  },
  {
    // 5
    slug: "dwarven_miners",
    title: 'Dwarven Miners',
    desc: '+4 Wall, +1 quarry',
    res: { id: 0, cost: 7 },
    handler: (p, e) => {
      p.apply("wall", 4);
      p.apply("quarry", 1);
    },
  },
  {
    // 6
    slug: "work_overtime",
    title: 'Work Overtime',
    desc: '+5 Wall. You lose 6 gems',
    res: { id: 0, cost: 2 },
    handler: (p, e) => {
      p.apply("wall", 5);
      p.apply("gems", -6);
    },
  },
  {
    // 7
    slug: "copping_the_tech",
    title: 'Copping the Tech',
    desc: 'If quarry < enemy quarry, quarry = enemy quarry',
    res: { id: 0, cost: 5 },
    handler: (p, e) => {
      if (p.res[0].income < e.res[0].income)
        p.res[0].income = e.res[0].income;
    },
  },
  {
    // 8
    slug: "basic_wall",
    title: 'Basic Wall',
    desc: '+3 Wall',
    res: { id: 0, cost: 2 },
    handler: (p, e) => {
      p.apply("wall", 3)
    },
  },
  {
    // 9
    slug: "sturdy_wall",
    title: 'Sturdy Wall',
    desc: '+4 Wall',
    res: { id: 0, cost: 3 },
    handler: (p, e) => {
      p.apply("wall", 4)
    },
  },
  {
    // 10
    slug: "innovations",
    title: 'Innovations',
    desc: "+1 To all player's quarrys, you gain 4 gems",
    res: { id: 0, cost: 2 },
    handler: (p, e) => {
      p.apply("quarry", 1);
      e.apply("quarry", 1);
      p.apply("gems", 4);
    },
  },
  {
    // 11
    slug: "foundations",
    title: 'Foundations',
    desc: 'If wall = 0, +6 wall, else +3 wall',
    res: { id: 0, cost: 3 },
    handler: (p, e) => {
      if (p.wall == 0) p.apply("wall", 6);
      else p.apply("wall", 3);
    }
  },
  {
    // 12
    slug: "tremors",
    title: 'Tremors',
    desc: 'All walls take 5 damage. Play again',
    res: { id: 0, cost: 7 },
    handler: (p, e) => {
      p.apply("wall", -5);
      e.apply("wall", -5);
      p.apply("playagain");
    }
  },
  {
    // 13
    slug: "secret_room",
    title: 'Secret Room',
    desc: '+1 Magic. Play again',
    res: { id: 0, cost: 8 },
    handler: (p, e) => {
      p.apply("magic", 1);
      p.apply("playagain");
    }
  },
  {
    // 14
    slug: "earthquake",
    title: 'Earthquake',
    desc: "-1 To all player's quarrys",
    res: { id: 0, cost: 0 },
    handler: (p, e) => {
      p.apply("quarry", -1);
      e.apply("quarry", -1);
    }
  },
  {
    // 15
    slug: "big_wall",
    title: 'Big Wall',
    desc: '+6 Wall',
    res: { id: 0, cost: 5 },
    handler: (p, e) => {
      p.apply("wall", 6);
    }
  },
  {
    // 16
    slug: "collapse",
    title: 'Collapse!',
    desc: '-1 Enemy quarry',
    res: { id: 0, cost: 4 },
    handler: (p, e) => {
      e.apply("quarry", -1);
    }
  },
  {
    // 17
    slug: "new_equipment",
    title: 'New Equipment',
    desc: '+2 Quarry',
    res: { id: 0, cost: 6 },
    handler: (p, e) => {
      p.apply("quarry", 2);
    }
  },
  {
    // 18
    slug: "strip_mine",
    title: 'Strip Mine',
    desc: '-1 Quarry. +10 Wall. You gain 5 gems',
    res: { id: 0, cost: 0 },
    handler: (p, e) => {
      p.apply("quarry", -1);
      p.apply("wall", 10);
      p.apply("gems", 5);
    }
  },
  {
    // 19
    slug: "strip_mine",
    title: 'Reinforced Wall',
    desc: '+8 Wall',
    res: { id: 0, cost: 8 },
    handler: (p, e) => {
      p.apply("wall", 8);
    }
  },
  /**
   * 
   * =====================================================
   * 
   * blue
   */
  {
    slug: "quartz",
    title: "Quartz",
    res: { id: 1, cost: 1 },
    desc: "+1 Tower. Play again",
    handler: (p, e) => {
      p.apply("tower", 1);
      p.apply("playagain", 1);
    },
  },
  {
    slug: "smoky_quartz",
    title: "Smoky Quartz",
    res: { id: 1, cost: 2 },
    desc: "1 Damage to enemy tower. Play again",
    handler: (p, e) => {
      e.apply("tower", -1);
      p.apply("playagain", 1);
    },
  },
  {
    slug: "amethyst",
    title: "Amethyst",
    res: { id: 1, cost: 2 },
    desc: "+3 Tower",
    handler: (p, e) => {
      p.apply("tower", 3);
    },
  },
  {
    slug: "spell_weavers",
    title: "Spell Weavers",
    res: { id: 1, cost: 3 },
    desc: "+1 Magic",
    handler: (p, e) => {
      p.apply("magic", 1);
    }
  },
  {
    slug: "prism",
    title: "Prism",
    res: { id: 1, cost: 2 },
    desc: "Draw 1 card. Discard 1 card. Play again",
    handler: (p, e) => {
      p.apply("ddpa");
    },
  },
  {
    // 39
    slug: "lodestone",
    title: 'Lodestone',
    desc: "+3 Tower. This card can't be discarded without playing it",
    res: { id: 1, cost: 5 },
    handler: (p, e) => {
      p.apply("tower", 3);
    }
  },
  {
    // 40
    slug: "solar_flare",
    title: 'Solar Flare',
    desc: '+2 Tower. 2 Damage to enemy tower',
    res: { id: 1, cost: 4 },
    handler: (p, e) => {
      p.apply("tower", 2);
      e.apply("tower", -2)
    }
  },
  {
    // 41
    slug: "crystal_matrix",
    title: 'Crystal Matrix',
    desc: '+1 Magic. +3 Tower. +1 Enemy tower',
    res: { id: 1, cost: 6 },
    handler: (p, e) => {
      p.apply("magic", 1);
      p.apply("tower", 3);
      e.apply("tower", 1);
    }
  },
  {
    // 42
    slug: "gemstone_flaw",
    title: 'Gemstone Flaw',
    desc: '3 Damage to enemy tower',
    res: { id: 1, cost: 2 },
    handler: (p, e) => {
      e.apply("tower", -3);
    }
  },
  {
    // 43
    slug: "ruby",
    title: 'Ruby',
    desc: '+5 Tower',
    res: { id: 1, cost: 3 },
    handler: (p, e) => {
      p.apply("tower", 5);
    }
  },
  {
    // 44
    slug: "gem_spear",
    title: 'Gem Spear',
    desc: '5 Damage to enemy tower',
    res: { id: 1, cost: 4 },
    handler: (p, e) => {
      e.apply("tower", -5);
    }
  },
  {
    // 45
    slug: "power_burn",
    title: 'Power Burn',
    desc: '5 Damage to your tower. +2 Magic',
    res: { id: 1, cost: 3 },
    handler: (p, e) => {
      e.apply("tower", -5);
      p.apply("magic", 2);
    }
  },
  {
    // 46
    slug: "harmonic_vibe",
    title: 'Harmonic Vibe',
    desc: '+1 Magic. +3 Tower. +3 Wall',
    res: { id: 1, cost: 7 },
    handler: (p, e) => {
      p.apply("magic", 1);
      p.apply("tower", 3);
      p.apply("wall", 3);
    }
  },
  {
    // 47
    slug: "parity",
    title: 'Parity',
    desc: "All player's magic equals the highest player's magic",
    res: { id: 1, cost: 7 },
    handler: (p, e) => {
      if (p.res[1].income > e.res[1].income) e.res[1].income = p.res[1].income;
      else p.res[1].income = e.res[1].income;
    }
  },
  {
    // 48
    slug: "emerald",
    title: 'Emerald',
    desc: '+8 Tower',
    res: { id: 1, cost: 6 },
    handler: (p, e) => {
      p.apply("tower", 8);
    }
  },
  {
    // 49
    slug: "pearl_of_wisdom",
    title: 'Pearl of Wisdom',
    desc: '+5 Tower. +1 Magic',
    res: { id: 1, cost: 9 },
    handler: (p, e) => {
      p.apply("tower", 5);
      p.apply("magic", 1);
    }   
  },
  {
    // 50
    slug: "shatterer",
    title: 'Shatterer',
    desc: '-1 Magic. 9 Damage to enemy tower',
    res: { id: 1, cost: 8 },
    handler: (p, e) => {
      p.apply("magic", -1);
      e.apply("tower", -9);
    }   
  },
  {
    // 51
    slug: "crumblestone",
    title: 'Crumblestone',
    desc: '+5 Tower. Enemy loses 6 bricks',
    res: { id: 1, cost: 7 },
    handler: (p, e) => {
      p.apply("tower", 5);
      e.apply("bricks", -6);
    }
  },
  {
    // 52
    slug: "sapphire",
    title: 'Sapphire',
    desc: '+11 Tower',
    res: { id: 1, cost: 10 },
    handler: (p, e) => {
      p.apply("tower", 11);
    }
  },
  {
    // 53
    slug: "discord",
    title: 'Discord',
    desc: '7 Damage to all towers, all players magic -1',
    res: { id: 1, cost: 5 },
    handler: (p, e) => {
      p.apply("tower", -7);
      e.apply("tower", -7);
      p.apply("magic", -1);
      e.apply("magic", -1);
    }
  },


  /**
   * =========================
   * GREEN
   */
  {
    slug: "mad_cow_disease",
    title: "Mad Cow Disease",
    res: { id: 2, cost: 0 },
    desc: "All players lose 6 recruits",
    handler: (p, e) => {
      p.apply("recruits", -6);
      e.apply("recruits", -6);
    },
  },
  {
    slug: "faerie",
    title: "Faerie",
    res: { id: 2, cost: 1 },
    desc: "2 Damage. Play again",
    handler: (p, e) => {
      p.apply("playagain")
      e.apply("damage", 2);
    },
  },
  {
    slug: "moody_goblins",
    title: "Moody Goblins",
    res: { id: 2, cost: 1 },
    desc: "4 Damage. You lose 3 gems",
    handler: (p, e) => {
      e.apply("damage", 4);
      p.apply("gems", -3);
    },
  },
  {
    slug: "minotaur",
    title: "Minotaur",
    res: { id: 2, cost: 3 },
    desc: "+1 Dungeon",
    handler: (p, e) => {
      p.apply("dungeon", 1);
    },
  },
  {
    slug: "elven_scout",
    title: "Elven Scout",
    res: { id: 2, cost: 2 },
    desc: "Draw 1 card. Discard 1 card. Play again",
    handler: (p, e) => {
      p.apply("ddpa");
    },
  },
  {
    // 73
    slug: "goblin_mob",
    title: 'Goblin Mob',
    desc: '6 Damage. You take 3 damage',
    res: { id: 2, cost: 3 },
    handler: (p, e) => {
      e.apply("damage", 6);
      p.apply("damage", 3);
    },
  },
  {
    // 74
    slug: "goblin_archers",
    title: 'Goblin Archers',
    desc: '3 Damage to enemy tower. You take 1 damage',
    res: { id: 2, cost: 4 },
    handler: (p, e) => {
      e.apply("tower", -3);
      p.apply("damage", 1);
    },
  },
  {
    // 75
    slug: "shadow_faerie",
    title: 'Shadow Faerie',
    desc: '2 Damage to enemy tower. Play again',
    res: { id: 2, cost: 6 },
    handler: (p, e) => {
      e.apply("tower", -2);
      p.apply("playagain");
    },
  },
  {
    // 76
    slug: "orc",
    title: 'Orc',
    desc: '5 Damage',
    res: { id: 2, cost: 3 },
    handler: (p, e) => {
      e.apply("damage", 5);
    },
  },
  {
    // 77
    slug: "dwarves",
    title: 'Dwarves',
    desc: '4 Damage. +3 Wall',
    res: { id: 2, cost: 5 },
    handler: (p, e) => {
      e.apply("damage", 4);
      p.apply("wall", 3);
    },
  },
  
];

function common(p, e) {
}