const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "America/Swift_Current": [
      [
        431.3333333333333,
        "-",
        "LMT",
        -2030227200000
      ],
      [
        420,
        "Canada",
        "M%sT",
        -749599200000
      ],
      [
        420,
        "Regina",
        "M%sT",
        -599702400000
      ],
      [
        420,
        "Swift",
        "M%sT",
        70941600000
      ],
      [
        360,
        "-",
        "CST",
        null
      ]
    ]
  },
  "rules": {
    "Canada": [
      [
        1918,
        "only",
        "-",
        "Apr",
        "14",
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
        "only",
        "-",
        "Oct",
        "27",
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
        "30",
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
        1974,
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
        1974,
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
    "Regina": [
      [
        1918,
        "only",
        "-",
        "Apr",
        "14",
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
        "only",
        "-",
        "Oct",
        "27",
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
        1930,
        1934,
        "-",
        "May",
        "Sun>=1",
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
        1930,
        1934,
        "-",
        "Oct",
        "Sun>=1",
        [
          0,
          0,
          0,
          null
        ],
        0,
        "S"
      ],
      [
        1937,
        1941,
        "-",
        "Apr",
        "Sun>=8",
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
        1937,
        "only",
        "-",
        "Oct",
        "Sun>=8",
        [
          0,
          0,
          0,
          null
        ],
        0,
        "S"
      ],
      [
        1938,
        "only",
        "-",
        "Oct",
        "Sun>=1",
        [
          0,
          0,
          0,
          null
        ],
        0,
        "S"
      ],
      [
        1939,
        1941,
        "-",
        "Oct",
        "Sun>=8",
        [
          0,
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
        1946,
        "only",
        "-",
        "Apr",
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
        1946,
        "only",
        "-",
        "Oct",
        "Sun>=8",
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
        1947,
        1957,
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
        1947,
        1957,
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
        1959,
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
        1959,
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
      ]
    ],
    "Swift": [
      [
        1957,
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
        1957,
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
        1959,
        1961,
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
        1959,
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
        1960,
        1961,
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
      ]
    ]
  },
  "titles": {
    "America/Swift_Current": {
      "long": "Canada Central Standard Time",
      "group": "(GMT-06:00) Saskatchewan"
    }
  }
});