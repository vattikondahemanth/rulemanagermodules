const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "America/Scoresbysund": [
      [
        87.86666666666667,
        "-",
        "LMT",
        -1686096000000
      ],
      [
        120,
        "-",
        "-02",
        323834400000
      ],
      [
        120,
        "C-Eur",
        "-02/-01",
        354672000000
      ],
      [
        60,
        "EU",
        "-01/+00",
        null
      ]
    ]
  },
  "rules": {
    "C-Eur": [
      [
        1916,
        "only",
        "-",
        "Apr",
        "30",
        [
          23,
          0,
          0,
          null
        ],
        60,
        "S"
      ],
      [
        1916,
        "only",
        "-",
        "Oct",
        "1",
        [
          1,
          0,
          0,
          null
        ],
        0,
        "-"
      ],
      [
        1917,
        1918,
        "-",
        "Apr",
        "Mon>=15",
        [
          2,
          0,
          0,
          "s"
        ],
        60,
        "S"
      ],
      [
        1917,
        1918,
        "-",
        "Sep",
        "Mon>=15",
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
        1940,
        "only",
        "-",
        "Apr",
        "1",
        [
          2,
          0,
          0,
          "s"
        ],
        60,
        "S"
      ],
      [
        1942,
        "only",
        "-",
        "Nov",
        "2",
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
        1943,
        "only",
        "-",
        "Mar",
        "29",
        [
          2,
          0,
          0,
          "s"
        ],
        60,
        "S"
      ],
      [
        1943,
        "only",
        "-",
        "Oct",
        "4",
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
        1944,
        1945,
        "-",
        "Apr",
        "Mon>=1",
        [
          2,
          0,
          0,
          "s"
        ],
        60,
        "S"
      ],
      [
        1944,
        "only",
        "-",
        "Oct",
        "2",
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
        1945,
        "only",
        "-",
        "Sep",
        "16",
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
        1977,
        1980,
        "-",
        "Apr",
        "Sun>=1",
        [
          2,
          0,
          0,
          "s"
        ],
        60,
        "S"
      ],
      [
        1977,
        "only",
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
        1978,
        "only",
        "-",
        "Oct",
        "1",
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
        1979,
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
        1981,
        "max",
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
        "S"
      ],
      [
        1996,
        "max",
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
    "EU": [
      [
        1977,
        1980,
        "-",
        "Apr",
        "Sun>=1",
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
        1977,
        "only",
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
        1978,
        "only",
        "-",
        "Oct",
        "1",
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
    ]
  },
  "titles": {
    "America/Scoresbysund": {
      "long": "Azores Standard Time",
      "group": "(GMT-01:00) Azores"
    }
  }
});