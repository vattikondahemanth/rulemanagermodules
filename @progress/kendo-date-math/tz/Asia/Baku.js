const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "Asia/Baku": [
      [
        -199.4,
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
        715312800000
      ],
      [
        -240,
        "-",
        "+04",
        851990400000
      ],
      [
        -240,
        "EUAsia",
        "+04/+05",
        883526400000
      ],
      [
        -240,
        "Azer",
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
    "EUAsia": [
      [
        1981,
        "max",
        "-",
        "Mar",
        "lastSun",
        [
          1,
          0,
          0,
          "u"
        ],
        60,
        "S"
      ],
      [
        1979,
        1995,
        "-",
        "Sep",
        "lastSun",
        [
          1,
          0,
          0,
          "u"
        ],
        0,
        "-"
      ],
      [
        1996,
        "max",
        "-",
        "Oct",
        "lastSun",
        [
          1,
          0,
          0,
          "u"
        ],
        0,
        "-"
      ]
    ],
    "Azer": [
      [
        1997,
        2015,
        "-",
        "Mar",
        "lastSun",
        [
          4,
          0,
          0,
          null
        ],
        60,
        "-"
      ],
      [
        1997,
        2015,
        "-",
        "Oct",
        "lastSun",
        [
          5,
          0,
          0,
          null
        ],
        0,
        "-"
      ]
    ]
  },
  "titles": {
    "Asia/Baku": {
      "long": "Azerbaijan Standard Time",
      "group": "(GMT+04:00) Baku"
    }
  }
});