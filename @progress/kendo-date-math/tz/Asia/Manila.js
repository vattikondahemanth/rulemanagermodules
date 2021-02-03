const dm = require('@progress/kendo-date-math');
dm.loadTimezone({
  "zones": {
    "Asia/Manila": [
      [
        956,
        "-",
        "LMT",
        -3944678400000
      ],
      [
        -484,
        "-",
        "LMT",
        -2229292800000
      ],
      [
        -480,
        "Phil",
        "P%sT",
        -873244800000
      ],
      [
        -540,
        "-",
        "JST",
        -794188800000
      ],
      [
        -480,
        "Phil",
        "P%sT",
        null
      ]
    ]
  },
  "rules": {
    "Phil": [
      [
        1936,
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
        60,
        "D"
      ],
      [
        1937,
        "only",
        "-",
        "Feb",
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
        1954,
        "only",
        "-",
        "Apr",
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
        1954,
        "only",
        "-",
        "Jul",
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
        1978,
        "only",
        "-",
        "Mar",
        "22",
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
        1978,
        "only",
        "-",
        "Sep",
        "21",
        [
          0,
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
    "Asia/Manila": {
      "long": "Singapore Standard Time",
      "group": "(GMT+08:00) Kuala Lumpur, Singapore"
    }
  }
});