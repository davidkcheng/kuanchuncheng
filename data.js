
		var height = 200;
		var width = 200;
		var svg = d3.select("body").append("svg")
	    .attr("width", width).attr("height",height);
	    var dataset = [
                [5, 20], [480, 90], [250, 50], [100, 33], [330, 95],
                [410, 12], [475, 44], [25, 67], [85, 21], [220, 88]
              ];   
     	// var dataset = [
     	// 	[5, 20], [10, 100], [20, 300]

     	// ]; 
     	var radius = 3;

        var max_x = d3.max(dataset, function(d) { return d[0]; });
        var min_x = d3.min(dataset, function(d) { return d[0]; });
        var max_y = d3.max(dataset, function(d) { return d[1]; });
        var min_y = d3.min(dataset, function(d) { return d[1]; });


        // console.log(min_x);
        // console.log(max_x);
        // console.log(min_y);
        // console.log(max_y);
        if (max_y > max_x) {
        	var yScale = d3.scale.linear().domain([min_y, max_y]).range([height - radius, 0 + radius]); // function
        	var ratio = yScale(max_y)/max_y;
        	var xScale = d3.scale.linear().domain([min_x, max_x]).range([0 + radius,  max_x*ratio - radius]); // function
        	

        	svg.selectAll("circle")
			   .data(dataset)
			   .enter()
			   .append("circle")
			   .attr("cx", function(d) {
			   		return xScale(d[0]);
			   })
			   .attr("cy", function(d) {
			   		return yScale(d[1]);
			   })
			   .attr("r", radius);
        }
        else {
        	var xScale = d3.scale.linear().domain([0, max_x]).range([0 + radius, height - radius]); // function
        	var ratio = xScale(max_x)/max_x;// 要改
        	var yScale = d3.scale.linear().domain([0, max_y]).range([max_y*ratio - radius, 0 + radius]); // function
        	 		
        	 svg.selectAll("circle")
			   .data(dataset)
			   .enter()
			   .append("circle")
			   .attr("cx", function(d) {
			   		return xScale(d[0]);
			   })
			   .attr("cy", function(d) {
			   		return yScale(d[1]);
			   })
			   .attr("r", radius);
        }
        

        var xAxis = d3.svg.axis()
        				.scale(xScale).orient("bottom").ticks(5);
        // xAxis.tickFormat("30%");

        svg.append("g").attr("class", "axis").call(xAxis).attr("transform", "translate(0, " + (yScale(0)) + ")");

		var yAxis = d3.svg.axis()
        				.scale(yScale).orient("right").ticks(5);

        svg.append("g").attr("class", "axis").call(yAxis);


      

        svg.selectAll("circle")
		.data(dataset)
			     .transition().duration(1500)
		  	      .each("start", function() {
					   d3.select(this)
				          .attr("fill", "magenta")
				          .attr("r", 7);
				   })
		  	      .attr("cx", function(d) {
			   		return xScale(Math.random() * max_x);
				   })
				   .attr("cy", function(d) {
				   		return yScale(Math.random() * max_y);
				   })
				   .transition()
				   .duration(1000)
				   .attr("fill", "black")
				   .attr("r", 2);
