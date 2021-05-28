function loadCharts(id) {

  console.log(id)

 //To load Charts 
 d3.json("samples.json").then((data)=>{

   console.log(data);


   //display metadata
  
   var metadata = data.metadata 

   console.log(metadata)

   var selectedMetaData = metadata.filter(obj => obj.id == id)[0];

   console.log(selectedMetaData)

   var selectedResults = d3.select("#sample-metadata");

   selectedResults.html("");

   Object.entries(selectedMetaData).forEach((key) => {
     console.log(key),
     selectedResults.append("h5").text(key[0] + ": " + key[1]);  
   });
  
   //To get data id 
  var selectedData = data.samples.filter(obj => obj.id == id)

  console.log(selectedData);

 // To return first ten arrays 
 var otuidsBar = selectedData[0].otu_ids.slice(0, 10).reverse();
 var samplevaluesBar = selectedData[0].sample_values.slice(0, 10).reverse();
 var otulabelsBar = selectedData[0].otu_labels.slice(0, 10).reverse();

 console.log(otuidsBar);
 console.log(samplevaluesBar);
 console.log(otulabelsBar);

 //Change format to a text 
 var otuidsBar = otuidsBar.map(d => "OTU " + d)

 console.log(otuidsBar)


 // // Build Bar Chart
 
 var trace1 = {
   x: samplevaluesBar,
   y: otuidsBar,
   text: otulabelsBar,
   name: "Greek",
   type: "bar",
   orientation: "h"
 };

 // data
 var chartData = [trace1];

 // Apply the group bar mode to the layout
 var layout = {
   title: "Top 10 OTUs",
   margin: {
     l: 100,
     r: 100,
     t: 30,
     b: 20
   }
 };

 // Render the plot
 Plotly.newPlot("bar", chartData, layout)


 // // Build Bubble Chart
 
 var otuidsBubble = selectedData[0].otu_ids;
 var samplevaluesBubble = selectedData[0].sample_values;
 var otulabelsBubble = selectedData[0].otu_labels;

 console.log(otuidsBubble);
 console.log(samplevaluesBubble);
 console.log(otulabelsBubble);

 var trace2 = {
   x: otuidsBubble,
   y: samplevaluesBubble,
   mode: 'markers',
   marker: {
     color: otuidsBubble,
     size: samplevaluesBubble
   }
 };
 
 var data = [trace2];
 
 var layout = {
   title: ' Each Sample for Bubble Chart',
   height: 600,
   width: 1000
 };
 
 Plotly.newPlot("bubble", data, layout);
 

  });
}

//Plug in the data 

d3.json("samples.json").then((data)=>{

 //console.log(data);

 //console.log(data.names);

 var dropdown = d3.select("#selDataset");

 data.names.forEach(name => {

   //append to select dropdown 
   dropdown.append("option").text(name).property("value", name);
 })

 var id = data.names[0]; 

 loadCharts(id)

})



function optionChanged(selectedID) {

 loadCharts(selectedID);
};
