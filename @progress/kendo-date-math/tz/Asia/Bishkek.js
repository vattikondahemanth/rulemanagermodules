const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "Asia/Bishkek": [
      [
        -298.4,
        "-",
        "LMT",
        -1441152000000
      ],
      [
        -300,
        "-",
        "+05",
        -1247529600000
      ],
      [
        -360,
        "RussiaAsia",
        "+06/+07",
        670384800000
      ],
      [
        -300,
        "RussiaAsia",
        "+05/+06",
        683604000000
      ],
      [
        -300,
        "Kyrgyz",
        "+05/+06",
        1123804800000
      ],
      [
        -360,
        "-",
        "+06",
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
    "Kyrgyz": [
      [
        1992,
        1996,
        "-",
        "Apr",
        "Sun>=7",
        [
          0,
          0,
          0,
          "s"
        ],
        60,
        "-"
      ],
      [
        1992,
        1996,
        "-",
        "Sep",
        "lastSun",
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
        1997,
        2005,
        "-",
        "Mar",
        "lastSun",
        [
          2,
          30,
          0,
          null
        ],
        60,
        "-"
      ],
      [
        1997,
        2004,
        "-",
        "Oct",
        "lastSun",
        [
          2,
          30,
          0,
          null
        ],
        0,
        "-"
      ]
    ]
  },
  "titles": {
    "Asia/Bishkek": {
      "long": "Central Asia Standard Time",
      "group": "(GMT+06:00) Astana, Dhaka"
    }
  }
});