const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "America/Indiana/Tell_City": [
      [
        347.05,
        "-",
        "LMT",
        -2717668023000
      ],
      [
        360,
        "US",
        "C%sT",
        -725932800000
      ],
      [
        360,
        "Perry",
        "C%sT",
        -179359200000
      ],
      [
        300,
        "-",
        "EST",
        -86400000
      ],
      [
        300,
        "US",
        "E%sT",
        62985600000
      ],
      [
        300,
        "-",
        "EST",
        1143943200000
      ],
      [
        360,
        "US",
        "C%sT",
        null
      ]
    ]
  },
  "rules": {
    "US": [
      [
        1918,
        1919,
        "-",
        "Mar",
        "lastSun",
        [
          2,
          0,
          0,
          null
        ],
        60,
        "D"
      ],
      [
        1918,
        1919,
        "-",
        "Oct",
        "lastSun",
        [
          2,
          0,
          0,
          null
        ],
        0,
        "S"
      ],
      [
        1942,
        "only",
        "-",
        "Feb",
        "9",
        [
          2,
          0,
          0,
          null
        ],
        60,
        "W",
        ""
      ],
      [
        1945,
        "only",
        "-",
        "Aug",
        "14",
        [
          23,
          0,
          0,
          "u"
        ],
        60,
        "P",
        ""
      ],
      [
        1945,
        "only",
        "-",
        "Sep",
        "lastSun",
        [
          2,
          0,
          0,
          null
        ],
        0,
        "S"
      ],
      [
        1967,
        2006,
        "-",
        "Oct",
        "lastSun",
        [
          2,
          0,
          0,
          null
        ],
        0,
        "S"
      ],
      [
        1967,
        1973,
        "-",
        "Apr",
        "lastSun",
        [
          2,
          0,
          0,
          null
        ],
        60,
        "D"
      ],
      [
        1974,
        "only",
        "-",
        "Jan",
        "6",
        [
          2,
          0,
          0,
          null
        ],
        60,
        "D"
      ],
      [
        1975,
        "only",
        "-",
        "Feb",
        "23",
        [
          2,
          0,
          0,
          null
        ],
        60,
        "D"
      ],
      [
        1976,
        1986,
        "-",
        "Apr",
        "lastSun",
        [
          2,
          0,
          0,
          null
        ],
        60,
        "D"
      ],
      [
        1987,
        2006,
        "-",
        "Apr",
        "Sun>=1",
        [
          2,
          0,
          0,
          null
        ],
        60,
        "D"
      ],
      [
        2007,
        "max",
        "-",
        "Mar",
        "Sun>=8",
        [
          2,
          0,
          0,
          null
        ],
        60,
        "D"
      ],
      [
        2007,
        "max",
        "-",
        "Nov",
        "Sun>=1",
        [
          2,
          0,
          0,
          null
        ],
        0,
        "S"
      ]
    ],
    "Perry": [
      [
        1946,
        "only",
        "-",
        "Apr",
        "lastSun",
        [
          2,
          0,
          0,
          null
        ],
        60,
        "D"
      ],
      [
        1946,
        "only",
        "-",
        "Sep",
        "lastSun",
        [
          2,
          0,
          0,
          null
        ],
        0,
        "S"
      ],
      [
        1953,
        1954,
        "-",
        "Apr",
        "lastSun",
        [
          2,
          0,
          0,
          null
        ],
        60,
        "D"
      ],
      [
        1953,
        1959,
        "-",
        "Sep",
        "lastSun",
        [
          2,
          0,
          0,
          null
        ],
        0,
        "S"
      ],
      [
        1955,
        "only",
        "-",
        "May",
        "1",
        [
          0,
          0,
          0,
          null
        ],
        60,
        "D"
      ],
      [
        1956,
        1963,
        "-",
        "Apr",
        "lastSun",
        [
          2,
          0,
          0,
          null
        ],
        60,
        "D"
      ],
      [
        1960,
        "only",
        "-",
        "Oct",
        "lastSun",
        [
          2,
          0,
          0,
          null
        ],
        0,
        "S"
      ],
      [
        1961,
        "only",
        "-",
        "Sep",
        "lastSun",
        [
          2,
          0,
          0,
          null
        ],
        0,
        "S"
      ],
      [
        1962,
        1963,
        "-",
        "Oct",
        "lastSun",
        [
          2,
          0,
          0,
          null
        ],
        0,
        "S"
      ]
    ]
  },
  "titles": {
    "America/Indiana/Tell_City": {
      "long": "Central Standard Time",
      "group": "(GMT-06:00) Central Time (US & Canada)"
    }
  }
});