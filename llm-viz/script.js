// Define dimensions for the SVG
const svgWidth = 600;
const svgHeight = 400;
const margin = { top: 30, right: 30, bottom: 50, left: 60 };
const width = svgWidth - margin.left - margin.right;
const height = svgHeight - margin.top - margin.bottom;

// Append SVG to the body
const svg = d3.select("#bar-chart")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

// Append a group element to SVG
const chart = svg.append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

// Load data from CSV
d3.csv("https://raw.githubusercontent.com/sfchronicle/police_pursuits/master/data/sfc_pursuit_fatalities.csv").then(data => {
    // Filter data for Missouri (MO) and years 2020-2024
    const filteredData = data.filter(d => d.state === "MO" && +d.year >= 2020 && +d.year <= 2024);

    // Aggregate data by year
    const aggregatedData = d3.rollup(filteredData, v => d3.sum(v, d => +d.number_killed), d => +d.year);

    // Convert aggregated data to array of objects
    const dataArray = Array.from(aggregatedData, ([year, deaths]) => ({ year: +year, deaths }));

    // Define X and Y scales
    const xScale = d3.scaleBand()
        .domain(dataArray.map(d => d.year))
        .range([0, width])
        .padding(0.1);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(dataArray, d => d.deaths)])
        .nice()
        .range([height, 0]);

    // Draw bars
    chart.selectAll(".bar")
        .data(dataArray)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", d => xScale(d.year))
        .attr("y", d => yScale(d.deaths))
        .attr("width", xScale.bandwidth())
        .attr("height", d => height - yScale(d.deaths))
        .on("mouseover", (event, d) => {
            tooltip.style("opacity", 1)
                .html(`Year: ${d.year}<br>Deaths: ${d.deaths}`)
                .style("left", `${event.pageX}px`)
                .style("top", `${event.pageY}px`);
        })
        .on("mouseout", () => {
            tooltip.style("opacity", 0);
        });

    // Draw X axis
    chart.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(xScale).tickFormat(d3.format("d")))
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("transform", "rotate(-45)");

    // Draw Y axis
    chart.append("g")
        .call(d3.axisLeft(yScale));

    // Append tooltip
    const tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);
});
