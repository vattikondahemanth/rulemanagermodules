const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "America/Bahia_Banderas": [
      [
        421,
        "-",
        "LMT",
        -1514764860000
      ],
      [
        420,
        "-",
        "MST",
        -1343091600000
      ],
      [
        360,
        "-",
        "CST",
        -1234828800000
      ],
      [
        420,
        "-",
        "MST",
        -1220317200000
      ],
      [
        360,
        "-",
        "CST",
        -1207180800000
      ],
      [
        420,
        "-",
        "MST",
        -1191369600000
      ],
      [
        360,
        "-",
        "CST",
        -873849600000
      ],
      [
        420,
        "-",
        "MST",
        -661564800000
      ],
      [
        480,
        "-",
        "PST",
        31449600000
      ],
      [
        420,
        "Mexico",
        "M%sT",
        1270346400000
      ],
      [
        360,
        "Mexico",
        "C%sT",
        null
      ]
    ]
  },
  "rules": {
    "Mexico": [
      [
        1939,
        "only",
        "-",
        "Feb",
        "5",
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
        1939,
        "only",
        "-",
        "Jun",
        "25",
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
        1940,
        "only",
        "-",
        "Dec",
        "9",
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
        1941,
        "only",
        "-",
        "Apr",
        "1",
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
        1943,
        "only",
        "-",
        "Dec",
        "16",
        [
          0,
          0,
          0,
          null
        ],
        60,
        "W",
        ""
      ],
      [
        1944,
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
        0,
        "S"
      ],
      [
        1950,
        "only",
        "-",
        "Feb",
        "12",
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
        1950,
        "only",
        "-",
        "Jul",
        "30",
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
        1996,
        2000,
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
        1996,
        2000,
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
        2001,
        "only",
        "-",
        "May",
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
        2001,
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
        2002,
        "max",
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
        2002,
        "max",
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
    "America/Bahia_Banderas": {
      "long": "Central Standard Time (Mexico)",
      "group": "(GMT-06:00) Guadalajara, Mexico City, Monterrey"
    }
  }
});