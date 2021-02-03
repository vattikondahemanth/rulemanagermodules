const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "Europe/Brussels": [
      [
        -17.5,
        "-",
        "LMT",
        -2808604800000
      ],
      [
        -17.5,
        "-",
        "BMT",
        -2450952000000
      ],
      [
        0,
        "-",
        "WET",
        -1740355200000
      ],
      [
        -60,
        "-",
        "CET",
        -1693699200000
      ],
      [
        -60,
        "C-Eur",
        "CE%sT",
        -1613826000000
      ],
      [
        0,
        "Belgium",
        "WE%sT",
        -934668000000
      ],
      [
        -60,
        "C-Eur",
        "CE%sT",
        -799286400000
      ],
      [
        -60,
        "Belgium",
        "CE%sT",
        252374400000
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
    "Belgium": [
      [
        1918,
        "only",
        "-",
        "Mar",
        "9",
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
        1918,
        1919,
        "-",
        "Oct",
        "Sat>=1",
        [
          23,
          0,
          0,
          "s"
        ],
        0,
        "-"
      ],
      [
        1919,
        "only",
        "-",
        "Mar",
        "1",
        [
          23,
          0,
          0,
          "s"
        ],
        60,
        "S"
      ],
      [
        1920,
        "only",
        "-",
        "Feb",
        "14",
        [
          23,
          0,
          0,
          "s"
        ],
        60,
        "S"
      ],
      [
        1920,
        "only",
        "-",
        "Oct",
        "23",
        [
          23,
          0,
          0,
          "s"
        ],
        0,
        "-"
      ],
      [
        1921,
        "only",
        "-",
        "Mar",
        "14",
        [
          23,
          0,
          0,
          "s"
        ],
        60,
        "S"
      ],
      [
        1921,
        "only",
        "-",
        "Oct",
        "25",
        [
          23,
          0,
          0,
          "s"
        ],
        0,
        "-"
      ],
      [
        1922,
        "only",
        "-",
        "Mar",
        "25",
        [
          23,
          0,
          0,
          "s"
        ],
        60,
        "S"
      ],
      [
        1922,
        1927,
        "-",
        "Oct",
        "Sat>=1",
        [
          23,
          0,
          0,
          "s"
        ],
        0,
        "-"
      ],
      [
        1923,
        "only",
        "-",
        "Apr",
        "21",
        [
          23,
          0,
          0,
          "s"
        ],
        60,
        "S"
      ],
      [
        1924,
        "only",
        "-",
        "Mar",
        "29",
        [
          23,
          0,
          0,
          "s"
        ],
        60,
        "S"
      ],
      [
        1925,
        "only",
        "-",
        "Apr",
        "4",
        [
          23,
          0,
          0,
          "s"
        ],
        60,
        "S"
      ],
      [
        1926,
        "only",
        "-",
        "Apr",
        "17",
        [
          23,
          0,
          0,
          "s"
        ],
        60,
        "S"
      ],
      [
        1927,
        "only",
        "-",
        "Apr",
        "9",
        [
          23,
          0,
          0,
          "s"
        ],
        60,
        "S"
      ],
      [
        1928,
        "only",
        "-",
        "Apr",
        "14",
        [
          23,
          0,
          0,
          "s"
        ],
        60,
        "S"
      ],
      [
        1928,
        1938,
        "-",
        "Oct",
        "Sun>=2",
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
        1929,
        "only",
        "-",
        "Apr",
        "21",
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
        1930,
        "only",
        "-",
        "Apr",
        "13",
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
        1931,
        "only",
        "-",
        "Apr",
        "19",
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
        1932,
        "only",
        "-",
        "Apr",
        "3",
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
        1933,
        "only",
        "-",
        "Mar",
        "26",
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
        1934,
        "only",
        "-",
        "Apr",
        "8",
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
        1935,
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
        1936,
        "only",
        "-",
        "Apr",
        "19",
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
        1937,
        "only",
        "-",
        "Apr",
        "4",
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
        1938,
        "only",
        "-",
        "Mar",
        "27",
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
        1939,
        "only",
        "-",
        "Apr",
        "16",
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
        1939,
        "only",
        "-",
        "Nov",
        "19",
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
        "Feb",
        "25",
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
        "Sep",
        "17",
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
        "Apr",
        "2",
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
        1946,
        "only",
        "-",
        "May",
        "19",
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
        "only",
        "-",
        "Oct",
        "7",
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
    "Europe/Brussels": {
      "long": "Romance Standard Time",
      "group": "(GMT+01:00) Brussels, Copenhagen, Madrid, Paris"
    }
  }
});