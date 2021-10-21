var arrData = [
	{ id: 1, val: 200 },
	{ id: 1, val: 150 },
	{ id: 1, val: 280 },
];

var margin = { top: 20, right: 20, bottom: 30, left: 50 },
	width = 960 - margin.left - margin.right,
	height = 500 - margin.top - margin.bottom;

var x = d3.scaleLinear().range([0, width]);

var y = d3.scaleLinear().range([height, 0]);

var xAxis = d3.axisBottom(x).tickFormat(function (d) {
	return d.x;
});

var yAxis = d3.axisLeft(y);

var line = d3
	.line()
	.x(function (d) {
		return x(d.id);
	})
	.y(function (d) {
		return y(d.val);
	});

var svg = d3
	.select('body')
	.append('svg')
	.attr('width', width + margin.left + margin.right)
	.attr('height', height + margin.top + margin.bottom)
	.append('g')
	.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

var data = arrData.map(function (d) {
	return {
		id: d[0],
		val: d[1],
	};
});

console.log(data);

x.domain(
	d3.extent(data, function (d) {
		return d.id;
	})
);
y.domain(
	d3.extent(data, function (d) {
		return d.val;
	})
);

svg.append('g')
	.attr('class', 'x axis')
	.attr('transform', 'translate(0,' + height + ')')
	.call(xAxis);

svg.append('g')
	.attr('class', 'y axis')
	.call(yAxis)
	.append('text')
	.attr('transform', 'rotate(-90)')
	.attr('y', 6)
	.attr('dy', '.71em')
	.style('text-anchor', 'end')
	.text('Value');

svg.append('path').datum(data).attr('class', 'line').attr('d', line);
