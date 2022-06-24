var visConfig = {
    "widgetSets": [
        "basic",
        "echarts",
        "jqplot",
        {
            "name": "jqui",
            "depends": [
                "basic"
            ]
        },
        {
            "name": "materialdesign",
            "depends": [
                "basic"
            ]
        },
        "plumb",
        "swipe",
        "tabs",
        "vis-inventwo"
    ]
};
if (typeof exports !== 'undefined') {
    exports.config = visConfig;
} else {
    visConfig.language = window.navigator.userLanguage || window.navigator.language;
}
