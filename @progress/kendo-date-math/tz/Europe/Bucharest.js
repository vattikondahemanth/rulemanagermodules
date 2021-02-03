const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "Europe/Bucharest": [
      [
        -104.4,
        "-",
        "LMT",
        -2469398400000
      ],
      [
        -104.4,
        "-",
        "BMT",
        -1213142400000
      ],
      [
        -120,
        "Romania",
        "EE%sT",
        354679200000
      ],
      [
        -120,
        "C-Eur",
        "EE%sT",
        694137600000
      ],
      [
        -120,
        "Romania",
        "EE%sT",
        788832000000
      ],
      [
        -120,
        "E-Eur",
        "EE%sT",
        883526400000
      ],
      [
        -120,
        "EU",
        "EE%sT",
        null
      ]
    ]
  },
  "rules": {
    "Romania": [
      [
        1932,
        "only",
        "-",
        "May",
        "21",
        [
          0,
          0,
          0,
          "s"
        ],
        60,
        "S"
      ],
      [
        1932,
        1939,
        "-",
        "Oct",
        "Sun>=1",
        [
          0,
          0,
          0,
          "s"
        ],
        0,
        "-"
      ],
      [
        1933,
        1939,
        "-",
        "Apr",
        "Sun>=2",
        [
          0,
          0,
          0,
          "s"
        ],
        60,
        "S"
      ],
      [
        1979,
        "only",
        "-",
        "May",
        "27",
        [
          0,
          0,
          0,
          null
        ],
        60,
        "S"
      ],
      [
        1979,
        "only",
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
        1980,
        "only",
        "-",
        "Apr",
        "5",
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
        1980,
        "only",
        "-",
        "Sep",
        "lastSun",
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
        1991,
        1993,
        "-",
        "Mar",
        "lastSun",
        [
          0,
          0,
          0,
          "s"
        ],
        60,
        "S"
      ],
      [
        1991,
        1993,
        "-",
        "Sep",
        "lastSun",
        [
          0,
          0,
          0,
          "s"
        ],
        0,
        "-"
      ]
    ],
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
    "E-Eur": [
      [
        1977,
        1980,
        "-",
        "Apr",
        "Sun>=1",
        [
          0,
          0,
          0,
          null
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
          0,
          0,
          0,
          null
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
          0,
          0,
          0,
          null
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
          0,
          0,
          0,
          null
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
          0,
          0,
          0,
          null
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
          0,
          0,
          0,
          null
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
    "Europe/Bucharest": {
      "long": "GTB Standard Time",
      "group": "(GMT+02:00) Athens, Bucharest, Istanbul"
    }
  }
});