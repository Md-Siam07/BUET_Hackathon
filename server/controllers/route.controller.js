require('graphhopper-js-api-client');
 
window.onload = function() {
  let defaultKey = "a19f09d7-9299-4665-8516-1fa58fc6a087";
  let ghRouting = new GraphHopper.Routing({key: defaultKey}, {profile:"car", elevation: false});

  ghRouting.doRequest({points:[[8.534317, 47.400905], [8.538265, 47.394108]]})
    .then(function(json){
       // Add your own result handling here
       console.log(json);
    })
    .catch(function(err){
       console.error(err.message);
    });
};