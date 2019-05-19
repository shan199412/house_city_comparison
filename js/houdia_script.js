function thirdGraph(chosen_city) {
    // The previous data is cleared when the refresh occurs
    d3.select('.svg3').selectAll("*").remove();
    d3.select("#drop2").selectAll('*').remove();
    d3.select("#drop_rent").selectAll('*').remove();
    //get color for each bar
    var color = ["gold", "lightskyblue", "salmon", "lightgreen"];
    // modify the data into appropriate structure
    var mdata  =[];
    var k = 0;
// for each row in data
    for (var i=0; i<bi_data.length;i++){
        // every 7 rows include the number of crimes in the same city over 6 years

        if (i %7 ==0){
            var added = [];
            added["city_id"] = bi_data[i]["city_id"];
            added["city_name"] = bi_data[i]["city_name"];
            added["year"] = bi_data[i]["year"];
            added["1br Flat"] = bi_data[i]["value"];
        }
        // add the record to mdata for further usage
        else if (i %7 == 1){
            added["2br Flat"] = bi_data[i]["value"];
        }
        else if (i %7 == 2){
            added["3br Flat"] = bi_data[i]["value"];
        }
        else if (i %7 == 3){
            added["2br House"] = bi_data[i]["value"];
        }
        else if (i %7 == 4){
            added["3br House"] = bi_data[i]["value"];
        }
        else if (i %7 == 5){
            added["4br House"] = bi_data[i]["value"];
        }
        else {
            added["All Properties"] = bi_data[i]["value"];
            mdata[k] = added;
            k = k +1;
        }
    }

// modify the data into appropriate structure
    var sdata = [];
    for (i=0; i < mdata.length; i++){
        record = mdata[i];
        if (chosen_city.includes(record["city_id"])){
            sdata.push(record);
        }
    }
    //for the effect of tips
    var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(function(d) {
            return "<strong>Number of Years Took To Buy A House:</strong> <span style='color:hotpink'>" + d.value + "</span>";
        })

    // for the show of chosen city
    for (num=0; num < chosen_city.length; num++) {
        var city = chosen_city[num];

        for (z = 0; z < mdata.length; z++){
            if (mdata[z]['city_id'] == city){
                var city_name = mdata[z]['city_name'];
                break;
            }
        }

        var data = [];
        for (k = 0; k < mdata.length; k++) {
            record = mdata[k];
            if (record['city_id'] == chosen_city[num]) {
                data.push(record);
            }
        }
        // console.log(data)

        // the margin, width, and height of the svg
        var margin = {top: 40, right: 0, bottom: 30, left: 100},
            width = 300 - margin.left - margin.right,
            height = 250 - margin.top - margin.bottom;
        // create an svg in html
        var svg = d3.select(".svg3").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        svg.call(tip);
        // filter year
        // Get every column value
        var elements = Object.keys(data[0])
            .filter(function (d) {
                return ((d != "city_name") & (d != "city_id") & (d != "year"));
            });
        var selection = elements[0];
        // determine the domain of the y axis
        var y = d3.scale.linear()
            .domain([d3.min(sdata, function (d) {
                return +d[selection];
            })/8*7, d3.max(sdata, function (d) {
                return +d[selection];
            })])
            .range([height, 0]);
        // determine the domian of the x axis
        var x = d3.scale.ordinal()
            .domain(data.map(function (d) {
                return d.year;
            }))
            .rangeBands([0, width]);

        // function to create the x axis
        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");
        //function to create the y axis
        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left");
        // draw on svg, add x axis
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .selectAll("text")
            .style("font-size", "10px")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", "-.55em")
            .attr("transform", "rotate(-90)");

// draw on svg, add x axis
        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("x",0 )
            .attr("y", -40)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .style("font-size", "10px")
            .text("Percentage Of Income Spent On Rent");
        // draw the bar charts
        svg.selectAll("rectangle")
            .data(data)
            .enter()
            .append("rect")
            .attr("class", "rectangle")
            .attr("width", width / data.length -15)
            .attr("height", function (d) {
                return height - y(+d[selection]);
            })
            .attr("x", function (d, i) {
                return (width / data.length) * i +7.5;
            })
            .attr("y", function (d) {
                return y(+d[selection]);
            })
            // the bar of Mlebourne Metro will be dark red, others would be blue
            .attr("fill", function(d){ return color[num]; })
            .append("title")
            .text(function (d) {
                return d.year + " : " + Math.floor(d[selection]*100)/100 +"% of income";
            });
            // add title
        svg.append("text")
            .attr("x", (width / 2))
            .attr("y", 0 - (margin.top / 2))
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            // .style("text-decoration", "underline")
            .text(city_name);

        if (num == 0) {
            var selector = d3.select("#drop_rent")
                .append("select")
                .attr("id", "dropdown")
                .on("change", function (d) {
                    selection = document.getElementById("dropdown");

                    y.domain([d3.min(sdata, function (d) {
                        return +d[selection.value];
                    })/8*7, d3.max(sdata, function (d) {
                        return +d[selection.value];
                    })]);

                    yAxis.scale(y);

                    d3.selectAll(".rectangle")
                        .transition()
                        .attr("height", function (d) {
                            return height - y(+d[selection.value]);
                        })
                        .attr("x", function (d, i) {
                            return (width / data.length) * (i%5) + 7.5 ;
                        })
                        .attr("y", function (d) {
                            return y(+d[selection.value]);
                        })
                        .ease("linear")
                        .select("title")
                        .text(function (d) {
                            return d.year + " : " + Math.floor(d[selection]*100)/100 +"% of income";
                        });

                    d3.selectAll("g.y.axis")
                        .transition()
                        .call(yAxis);

                });
            // add values to the drop down button
            selector.selectAll("option")
                .data(elements)
                .enter().append("option")
                .attr("value", function (d) {
                    return d;
                })
                .text(function (d) {
                    return d;
                })


            ;
        }
    }
}

function thirdGraph_b(chosen_city) {

    d3.select('.svg3b').selectAll("*").remove();
    d3.select("#drop_rent").selectAll("*").remove();


    var color = ["gold", "lightskyblue", "salmon", "lightgreen"];

    var selection = ["unit","house","land"]

    var mdata  =[];
    var k = 0;
    for (i=0; i<bi_data2.length;i++){
        if (i %3 ==0){
            var added = [];
            added["city_id"] = bi_data2[i]["city_id"];
            added["city_name"] = bi_data2[i]["city_name"];
            added["year"] = bi_data2[i]["year"];
            added["unit"] = bi_data2[i]["value"];
        }
        else if (i %3 == 1){
            added["house"] = bi_data2[i]["value"];
        }
        else {
            added["land"] = bi_data2[i]["value"];
            mdata[k] = added;
            k = k +1;
        }
    }
    var sdata = [];
    for (i=0; i < mdata.length; i++){
        record = mdata[i];
        if (chosen_city.includes(record["city_id"])){
            sdata.push(record);
        }
    }
    var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(function(d) {
            return "<strong>Number of Years Took To Buy A House:</strong> <span style='color:hotpink'>" + d.value + "</span>";
        })


    for (num=0; num < chosen_city.length; num++) {
        var city = chosen_city[num];

        for (z = 0; z < mdata.length; z++){
            if (mdata[z]['city_id'] == city){
                var city_name = mdata[z]['city_name'];
                break;
            }
        }

        var data = [];
        for (k = 0; k < mdata.length; k++) {
            record = mdata[k];
            if (record['city_id'] == chosen_city[num]) {
                data.push(record);
            }
        }
        // console.log(data)


        var margin = {top: 40, right: 0, bottom: 30, left: 100},
            width = 300 - margin.left - margin.right,
            height = 250 - margin.top - margin.bottom;

        var svg = d3.select(".svg3b").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        svg.call(tip);
        // filter year
        // Get every column value
        var elements = Object.keys(data[0])
            .filter(function (d) {
                return ((d != "city_name") & (d != "city_id") & (d != "year"));
            });
        var selection = elements[0];

        var y = d3.scale.linear()
            .domain([ d3.min(sdata, function (d) {
                return +d[selection];
            })/8*7, d3.max(sdata, function (d) {
                return +d[selection];
            })])
            .range([height, 0]);

        var x = d3.scale.ordinal()
            .domain(data.map(function (d) {
                return d.year;
            }))
            .rangeBands([0, width]);


        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");

        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left");

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .selectAll("text")
            .style("font-size", "10px")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", "-.55em")
            .attr("transform", "rotate(-90)");


        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("x",0 )
            .attr("y", -40)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .style("font-size", "10px")
            .text("Number of Years Took to Buy a House");

        svg.selectAll("rectangle")
            .data(data)
            .enter()
            .append("rect")
            .attr("class", "rectangle")
            .attr("width", width / data.length - 15)
            .attr("height", function (d) {
                return height - y(+d[selection]);
            })
            .attr("x", function (d, i) {
                return (width / data.length) * i + 7.5;
            })
            .attr("y", function (d) {
                return y(+d[selection]);
            })
            .attr("fill", function(d){ return color[num]; })
            .style("margin-top", "10px")
            .append("title")
            .text(function (d) {
                return d.year + " : " + Math.floor(d[selection]*100)/100 + " years";
            });

        svg.append("text")
            .attr("x", (width / 2))
            .attr("y", 0 - (margin.top / 2))
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            // .style("text-decoration", "underline")
            .text(city_name);

        if (num == 0) {
            var selector = d3.select("#drop2")
                .append("select")
                .attr("id", "dropdown2")
                .on("change", function (d) {
                    selection = document.getElementById("dropdown2");

                    y.domain([ d3.min(sdata, function (d) {
                        return +d[selection.value];
                    })/8*7, d3.max(sdata, function (d) {
                        return +d[selection.value];
                    })]);

                    yAxis.scale(y);

                    d3.selectAll(".rectangle")
                        .transition()
                        .attr("height", function (d) {
                            return height - y(+d[selection.value]);
                        })
                        .attr("x", function (d, i) {
                            return (width / data.length) * (i%5) +7.5 ;
                        })
                        .attr("y", function (d) {
                            return y(+d[selection.value]);
                        })
                        .ease("linear")
                        .select("title")
                        .text(function (d) {
                            return d.year + " : " + Math.floor(d[selection.value]*100)/100 + " years";
                        });

                    d3.selectAll("g.y.axis")
                        .transition()
                        .call(yAxis);

                });

            selector.selectAll("option")
                .data(elements)
                .enter().append("option")
                .attr("value", function (d) {
                    return d;
                })
                .text(function (d) {
                    return d;
                })
            ;
        }
    }
}