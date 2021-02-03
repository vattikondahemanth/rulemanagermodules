const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "Asia/Yerevan": [
      [
        -178,
        "-",
        "LMT",
        -1441152000000
      ],
      [
        -180,
        "-",
        "+03",
        -405129600000
      ],
      [
        -240,
        "RussiaAsia",
        "+04/+05",
        670384800000
      ],
      [
        -180,
        "RussiaAsia",
        "+03/+04",
        811908000000
      ],
      [
        -240,
        "-",
        "+04",
        883526400000
      ],
      [
        -240,
        "RussiaAsia",
        "+04/+05",
        1325289600000
      ],
      [
        -240,
        "Armenia",
        "+04/+05",
        null
      ]
    ]
  },
  "rules": {
    "RussiaAsia": [
      [
        1981,
        1984,
        "-",
        "Apr",
        "1",
        [
          0,
          0,
          0,
          null
        ],
        60,
        "-"
      ],
      [
        1981,
        1983,
        "-",
        "Oct",
        "1",
        [
          0,
          0,
          0,
          null
        ],
        0,
        "-"
      ],
      [
        1984,
        1995,
        "-",
        "Sep",
        "lastSun",
        [
          2,
          0,
          0,
          "s"
        ],
        0,
        "-"
      ],
      [
        1985,
        2010,
        "-",
        "Mar",
        "lastSun",
        [
          2,
          0,
          0,
          "s"
        ],
        60,
        "-"
      ],
      [
        1996,
        2010,
        "-",
        "Oct",
        "lastSun",
        [
          2,
          0,
          0,
          "s"
        ],
        0,
        "-"
      ]
    ],
    "Armenia": [
      [
        2011,
        "only",
        "-",
        "Mar",
        "lastSun",
        [
          2,
          0,
          0,
          "s"
        ],
        60,
        "-"
      ],
      [
        2011,
        "only",
        "-",
        "Oct",
        "lastSun",
        [
          2,
          0,
          0,
          "s"
        ],
        0,
        "-"
      ]
    ]
  },
  "titles": {
    "Asia/Yerevan": {
      "long": "Caucasus Standard Time",
      "group": "(GMT+04:00) Yerevan"
    }
  }
});