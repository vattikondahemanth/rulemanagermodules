var setData = require('@progress/kendo-angular-intl').setData;
setData({
    name: "kok",
    likelySubtags: {
        kok: "kok-Deva-IN"
    },
    identity: {
        language: "kok"
    },
    territory: "IN",
    numbers: {
        symbols: {
            decimal: ".",
            group: ",",
            list: ";",
            percentSign: "%",
            plusSign: "+",
            minusSign: "-",
            exponential: "E",
            superscriptingExponent: "×",
            perMille: "‰",
            infinity: "∞",
            nan: "NaN",
            timeSeparator: ":"
        },
        decimal: {
            patterns: [
                "n"
            ],
            groupSize: [
                3,
                2
            ]
        },
        scientific: {
            patterns: [
                "nEn"
            ],
            groupSize: []
        },
        percent: {
            patterns: [
                "n%"
            ],
            groupSize: [
                3,
                2
            ]
        },
        currency: {
            patterns: [
                "$ n"
            ],
            groupSize: [
                3,
                2
            ],
            "unitPattern-count-other": "n $"
        },
        accounting: {
            patterns: [
                "$ n"
            ],
            groupSize: [
                3,
                2
            ]
        }
    }
});
