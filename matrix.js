function adjacency() {
            
    var promiseWrapper = (d) => new Promise(resolve => d3.csv(d, (p) => resolve(p)))
    
    Promise.all([promiseWrapper("dataset/nodelist_year.csv"),promiseWrapper("dataset/edgelist_year.csv")]).then(resolve => {
        createAdjacencyMatrix1(resolve[0],resolve[1])    
    })
    // console.log(Promise.all([promiseWrapper("nodelist.csv"),promiseWrapper("edgelist.csv")]))
    
    var promiseWrapper = (d) => new Promise(resolve => d3.csv(d, (p) => resolve(p)))
    
    Promise.all([promiseWrapper("dataset/nodelist_day.csv"),promiseWrapper("dataset/edgelist_day.csv")]).then(resolve => {
        createAdjacencyMatrix2(resolve[0],resolve[1])    
    })

    function createAdjacencyMatrix1(nodes,edges){
        
        var edgeHash = {};
        edges.forEach(edge =>{
            var id = edge.source + "-" + edge.target
            edgeHash[id] = edge
        })
                
        var matrix = [], wei = []
        nodes.forEach((source, a) => {
            nodes.forEach((target, b) => {
                var grid = {id: source.id + "-" + target.id, x: b, y: a, weight: 0};
                if(edgeHash[grid.id]){
                    grid.weight = edgeHash[grid.id].weight;                    
                }
            wei.push(grid.weight)
            matrix.push(grid)
            })
        });       
        
        var svg = d3.select("#m_year")

        d3.select("#ma_year").append("g")
            .attr("transform","translate(50,50)")
            .attr("id","adjacencyG")
            .selectAll("rect")
            .data(matrix)
            .enter()
            .append("rect")
            .attr("class","grid_year")
            .attr("width",50)
            .attr("height",50)
            .attr("x", d=> d.x*50)
            .attr("y", d=> d.y*50)
            .style("fill", function(d) {
                if (d.weight > 0) {
                    return "red";
                } else if (d.weight < 0) {
                    return "blue";
                }
            })
            .style("fill-opacity", function(d) {                           
                if (d.weight > 0) {
                    return d.weight*0.01;
                } else if (d.weight < 0) {
                    return (-d).weight*0.01;
                } else if (d.weight == 0) {
                    return 0;
                }
            })
        
        d3.select("#ma_year").append("g")
            .attr("transform","translate(50,50)")
            .selectAll("text")
            .data(matrix)
            .enter()
            .append("text")
            .text(function(d) {
                if (d.weight != 0) {
                    return (d.weight*0.01).toFixed(2);                    
                }
            })
            .attr("class", "ytext")
            .attr("width",25)
            .attr("height",25)
            .attr("x", (d) => d.x*50 + 7.5)
            .attr("y", (d) => d.y*50 + 30)
            

        d3.select("#ma_year").append("g")
            .attr("transform","translate(50,40)")
            .selectAll("text")
            .data(nodes)
            .enter()
            .append("text")
            .attr("x", (d,i) => i * 50 + 27.5)
            .text(d => d.id)
            .style("text-anchor","middle")
            .style("font-size","9px")
            .style("font-weight","bold")
            
        d3.select("#ma_year")
            .append("g").attr("transform","translate(45,50)")
            .selectAll("text")
            .data(nodes)
            .enter()
            .append("text")
            .attr("y",(d,i) => i * 50 + 27.5)
            .text(d => d.id)
            .style("text-anchor","end")
            .style("font-size","12px")
            .style("font-weight","bold")
        
        d3.selectAll("rect.grid_year, .ytext").on("mouseover", gridOver); 
        function gridOver(d) {                                        
            d3.selectAll("rect.grid_year").style("stroke-width", function(p) { return p.x == d.x || p.y == d.y ? "4px" : "1px"});            
        }
        d3.selectAll("rect.grid_year, .ytext").on("mouseout", gridOut); 
        function gridOut(d) { 
            d3.selectAll("rect.grid_year").style("stroke-width", "");
        }
        
    }
    function createAdjacencyMatrix2(nodes,edges){
    
        var edgeHash = {};
        edges.forEach(edge =>{
            var id = edge.source + "-" + edge.target
            edgeHash[id] = edge
        })
                
        var matrix = []
        nodes.forEach((source, a) => {
            nodes.forEach((target, b) => {
                var grid = {id: source.id + "-" + target.id, x: b, y: a, weight: 0};
                if(edgeHash[grid.id]){
                    grid.weight = edgeHash[grid.id].weight;
                }
            matrix.push(grid)
            })
        })

        var svg = d3.select("#m_year")                
        d3.select("#ma_day").append("g")
            .attr("transform","translate(50,50)")
            .attr("id","adjacencyG")
            .selectAll("rect")
            .data(matrix)
            .enter()
            .append("rect")
            .attr("class","grid_day")
            .attr("width",50)
            .attr("height",50)
            .attr("x", d=> d.x*50)
            .attr("y", d=> d.y*50)
            .style("fill", function(d) {
                if (d.weight > 0) {
                    return "red";
                } else if (d.weight < 0) {
                    return "blue";
                }
            })
            .style("fill-opacity", function(d) {                        
                if (d.weight > 0) {
                    return d.weight*0.01;
                } else if (d.weight < 0) {                    
                    return (-d.weight)*0.01;
                } else if (d.weight == 0) {
                    return 0;
                }
            })

        d3.select("#ma_day").append("g")
            .attr("transform","translate(50,50)")
            .selectAll("text")
            .data(matrix)
            .enter()
            .append("text")
            .text(function(d) {
                if (d.weight != 0) {                    
                    return (d.weight*0.01).toFixed(2);                    
                }                
            })
            .attr("class", "ctext")
            .attr("width",25)
            .attr("height",25)
            .attr("x", (d) => d.x*50 + 7.5)
            .attr("y", (d) => d.y*50 + 30)
            .style("font-size", function (d) {
                if (d.weight<0){
                    return "9pt"
                }
            })
            .style('fill', function (d) {
                if (d.weight<0){
                    return "white"
                }
            })

        d3.select("#ma_day").append("g")
            .attr("transform","translate(50,40)")
            .selectAll("text")
            .data(nodes)
            .enter()
            .append("text")
            .attr("x", (d,i) => i * 50 + 27.5)
            .text(d => d.id)
            .style("text-anchor","middle")
            .style("font-size","10px")
            .style("font-weight","bold")
            
        d3.select("#ma_day")
            .append("g").attr("transform","translate(45,50)")
            .selectAll("text")
            .data(nodes)
            .enter()
            .append("text")
            .attr("y",(d,i) => i * 50 + 27.5)
            .text(d => d.id)
            .style("text-anchor","end")
            .style("font-size","12px")
            .style("font-weight","bold")

        d3.selectAll("rect.grid_day, .ctext").on("mouseover", gridOver2); 
        function gridOver2(d) {
            d3.selectAll("rect.grid_day").style("stroke-width", function(p) { return p.x == d.x || p.y == d.y ? "4px" : "1px"});
        }
        d3.selectAll("rect.grid_day, .ctext").on("mouseout", gridOut); 
        function gridOut(d) {
            d3.selectAll("rect.grid_day").style("stroke-width", "");
        }
    }
}