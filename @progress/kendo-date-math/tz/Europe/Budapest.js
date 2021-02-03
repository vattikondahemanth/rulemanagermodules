const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "Europe/Budapest": [
      [
        -76.33333333333333,
        "-",
        "LMT",
        -2500934400000
      ],
      [
        -60,
        "C-Eur",
        "CE%sT",
        -1609545600000
      ],
      [
        -60,
        "Hungary",
        "CE%sT",
        -906768000000
      ],
      [
        -60,
        "C-Eur",
        "CE%sT",
        -757468800000
      ],
      [
        -60,
        "Hungary",
        "CE%sT",
        338954400000
      ],
      [
        -60,
        "EU",
        "CE%sT",
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
    "Hungary": [
      [
        1918,
        "only",
        "-",
        "Apr",
        "1",
        [
          3,
          0,
          0,
          null
        ],
        60,
        "S"
      ],
      [
        1918,
        "only",
        "-",
        "Sep",
        "16",
        [
          3,
          0,
          0,
          null
        ],
        0,
        "-"
      ],
      [
        1919,
        "only",
        "-",
        "Apr",
        "15",
        [
          3,
          0,
          0,
          null
        ],
        60,
        "S"
      ],
      [
        1919,
        "only",
        "-",
        "Nov",
        "24",
        [
          3,
          0,
          0,
          null
        ],
        0,
        "-"
      ],
      [
        1945,
        "only",
        "-",
        "May",
        "1",
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
        1945,
        "only",
        "-",
        "Nov",
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
        1946,
        "only",
        "-",
        "Mar",
        "31",
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
        1946,
        1949,
        "-",
        "Oct",
        "Sun>=1",
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
        1947,
        1949,
        "-",
        "Apr",
        "Sun>=4",
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
        1950,
        "only",
        "-",
        "Apr",
        "17",
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
        1950,
        "only",
        "-",
        "Oct",
        "23",
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
        1954,
        1955,
        "-",
        "May",
        "23",
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
        1954,
        1955,
        "-",
        "Oct",
        "3",
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
        1956,
        "only",
        "-",
        "Jun",
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
        1956,
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
        1957,
        "only",
        "-",
        "Jun",
        "Sun>=1",
        [
          1,
          0,
          0,
          null
        ],
        60,
        "S"
      ],
      [
        1957,
        "only",
        "-",
        "Sep",
        "lastSun",
        [
          3,
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
        "6",
        [
          1,
          0,
          0,
          null
        ],
        60,
        "S"
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
    "Europe/Budapest": {
      "long": "Central Europe Standard Time",
      "group": "(GMT+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague"
    }
  }
});