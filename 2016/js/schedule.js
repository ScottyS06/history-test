/* Data for the schedule. This will reflect the actual schedule on the main
** website. This will allow us to make schedule changes easily in case we need to.
** Each item will follow this design pattern.
** {
**   "id": {order of precedence} 
**   "name": "{name of the event}",
**   "start": "{start time of the event in standard local time format}"
**   "end": "{end time of the event in standard local time format}"
** }
** A new date could be created using `new Date(year, month, day, hours, minutes)`
*/
var schedule = [
    {
        id: 1,
        name: "Registration",
        start: new Date(2016, 9, 15, 16, 0),
        end: new Date(2016, 9, 15, 17, 0)
    },
    {
        id: 2,
        name: "Welcome",
        start: new Date(2016, 9, 15, 17, 0),
        end: new Date(2016, 9, 15, 18, 0)
    },
    {
        id: 3,
        name: "Dinner",
        start: new Date(2016, 9, 15, 18, 30),
        end: new Date(2016, 9, 15, 19, 30)
    },
    {
        id: 4,
        name: "Start Projects",
        start: new Date(2016, 9, 15, 19, 0),
    },
    {
        id: 5,
        name: "Workshops",
        start: new Date(2016, 9, 15, 19, 30),
        end: new Date(2016, 9, 15, 23, 30)
    },
    {
        id: 6,
        name: "Activites",
        start: new Date(2016, 9, 15, 22, 30),
        end: new Date(2016, 9, 16, 0, 30)
    },
    {
        id: 7,
        name: "Snack",
        start: new Date(2016, 9, 15, 23, 30),
        end: new Date(2016, 9, 16, 2, 30)
    },
    {
        id: 8,
        name: "Breakfast",
        start: new Date(2016, 9, 16, 7, 0),
        end: new Date(2016, 9, 16, 8, 30)
    },
    {
        id: 9,
        name: "Activites",
        start: new Date(2016, 9, 16, 9, 0),
        end: new Date(2016, 9, 16, 10, 30)
    },
    {
        id: 10,
        name: "Lunch",
        start: new Date(2016, 9, 16, 11, 30),
        end: new Date(2016, 9, 16, 12, 30)
    },
    {
        id: 11,
        name: "Submit Projects",
        end: new Date(2016, 9, 16, 15, 0)
    },
    {
        id: 12,
        name: "Judging",
        start: new Date(2016, 9, 16, 16, 0),
        end: new Date(2016, 9, 16, 17, 30)
    },
    {
        id: 13,
        name: "Dinner",
        start: new Date(2016, 9, 16, 17, 0),
        end: new Date(2016, 9, 16, 18, 0)
    },
    {
        id: 14,
        name: "Closing",
        start: new Date(2016, 9, 16, 18, 0),
        end: new Date(2016, 9, 16, 19, 30)
    }
]

/* This is essentially the metadata describing the attributes of the timeline
** TODO: these are random values.
*/
var config = {
    colors : {
        time: '#EA1875',
        line: '#000000',
        circle: '#000000',
        text: '#000000'
    },
    fontSize: 18,
    fontFamily: 'nevis',
    circleSize: 3,
    textPadding: 10,
    cellHeight: 50,
    svg: {
        width: 320,
        height: 320,
        margin: 20
    }
}

/* This function filters the data and returns an ordered list of events on that date
** date is the date of the month. Eg. 15th will be 15
*/
function getSortedData(date) {
    return schedule.filter(function (d) {
        return d.start ? d.start.getDate() == date : d.end.getDate() == date;
    }).sort(function (a, b) {
        return a.id > b.id;
    });
}

// processes the data to look the way we want it to
function processData(data) {
    return data.map(function (d) {
        var period = '{empty}';
        if (d.start && d.end) {
            period = timeToAMPM(d.start); 
        } else {
            period = timeToAMPM(d.start ? d.start : d.end);
        }
        return {
            period: period,
            text: d.name
        }
    });
}

// Converts a Date to time in hh:mm am/pm format
function timeToAMPM(d) {
    var hh = ((d.getHours() + 11) % 12 + 1);
    var mm = (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
    var ampm = d.getHours() < 12 ? 'am' : 'pm';
    return hh + ':' + mm + ampm;
}

/* This function draws the final timeline svg using d3
** It takes in the div selector to draw the svg in and 
** the day of which the data should be presented.
*/
function draw(div, day) {
    var data = processData(getSortedData(day));
    config.svg.height = Math.max(data.length * config.cellHeight, config.svg.height);

    var svg = d3.select(div).append("svg")
                .attr("width", config.svg.width)
                .attr("height", config.svg.height)
            .append("g")
                .attr("transform", "translate(" + config.svg.margin + "," + config.svg.margin + ")");
    
    var items = svg.selectAll('.items')
                    .data(data)
                    .enter();
    
    // Adding the circle Dots
    items.append('circle')
        .attr('cx', (config.svg.width - 2 * config.svg.margin) / 2)
        .attr('cy', function(d, i) { return config.cellHeight * i})
        .attr('r', config.circleSize)
        .style('fill', config.colors.circle);
    
    // Adding the connecting lines
    items.append('line')
        .attr('x1', (config.svg.width - 2 * config.svg.margin) / 2)
        .attr('x2', (config.svg.width - 2 * config.svg.margin) / 2)
        .attr('y1', function(d, i) { return config.cellHeight * i })
        .attr('y2', function(d, i) { return items.size() - 1 != i ? config.cellHeight * (i + 1) : config.cellHeight * i })
        .attr('stroke', config.colors.line);

    // Adding the times
    // NOTE: refer to https://bl.ocks.org/mbostock/7555321 for word wrap in case needed
    items.append('text')
        .attr('x', (config.svg.width - 2 * config.svg.margin) / 2 - config.textPadding)
        .attr('y', function(d, i) { return config.cellHeight * i + config.fontSize / 4})
        .attr('font-family', config.fontFamily)
        .attr('font-size', config.fontSize)
        .style('text-anchor', 'end')
        .style('fill', config.colors.time)
        .text(function (d) { return d.period });

    // Adding the name of the event
    items.append('text')
        .attr('x', (config.svg.width - 2 * config.svg.margin) / 2 + config.textPadding)
        .attr('y', function(d, i) { return config.cellHeight * i + config.fontSize / 4})
        .attr('font-family', config.fontFamily)
        .attr('font-size', config.fontSize)
        .style('text-anchor', 'start')
        .style('fill', config.colors.text)
        .text(function (d) { return d.text });
}

draw('#day1_context', 15);
draw('#day2_context', 16);
