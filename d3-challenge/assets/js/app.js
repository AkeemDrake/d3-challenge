// Define SVG area dimensions
var svgWidth = 980;
var svgHeight = 660;

// Define the chart's margins as an object
var chartMargin = {
  top: 50,
  right: 50,
  bottom: 50,
  left: 50
};

// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Select body, append SVG area to it, and set the dimensions
var svg = d3.select("body")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

// Append a group to the SVG area and shift ('translate') it to the right and to the bottom
var chartGroup = svg.append("g")
  .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

// loading in the data
d3.csv("./data.csv").then(function(healthData) {
    console.log(healthData);

// casting the age and income data points
healthData.forEach(function(data) {
  data.age = +data.age;
  data.income = +data.income;
// scaling the x axis
var xLinearScale = d3.scaleLinear()
.domain([0, d3.max(healthData, d => d.age)])
.range([0, chartWidth]);
// scaling the y axis
var yLinearScale = d3.scaleLinear()
.domain([0, d3.max(healthData, d => d.income)])
.range([chartHeight, 0]);

//create axis
var xAxis = d3.axisBottom(xLinearScale).ticks(10);
var yAxis = d3.axisLeft(yLinearScale).ticks(10);

// set x to the bottom of the chart
chartGroup.append("g")
  .attr("transform", `translate(0, ${chartHeight})`)
  .call(xAxis);
// set y axis to the left of the chart
chartGroup.append("g")
  .call(yAxis);

  // make circles for the points on the graph
  svg.selectAll("circle")
  .data(healthData)
  .enter()
  .append("circle")
  .classed("stateCircle", true)
  .attr("cx", (d, i) => xLinearScale(d.age))
  .attr("cy", (d, i) => yLinearScale(d.income))
  .attr("r", 10);
  // add text to the circles
  svg.selectAll("text")
  .data(healthData)
  .enter()
  .append("text")
  .classed("stateText", true)
  .attr("x",(d, i) => xLinearScale(d.age))
  .attr("y",(d, i) => yLinearScale(d.income))
  .attr("stroke", "blue")
  .text((d)=> d.abbr);


})

})