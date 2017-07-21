
/*
 * Vehicle search.
 */
var vehicleSearch = (function(){
/*
 * Array to hold list of vehicles added.
 */
var vehicleList = [];

/*
 * Constructor function to create vehicle object.
 */
function Vehicle(type, make, model){
	this.type = type;
	this.make = make;
	this.model = model;
}

/*
 * get list of all vehicles.
 */
var getVehicles = function(){
	return vehicleList;
};

/*
 * add vehicle object to the array
 */
var addVehicle = function(type, make, model){
	var vehicle = new Vehicle(type, make, model);
	vehicleList.push(vehicle);
};

/*
 * remove vehicle object from array at given index.
 */
var removeVehicle = function(index){
	vehiclList.splice(index, 1);
};

/*
 * Unit test code
 */
var test = function(){
	var audiA4 = new Vehicle("New", "Audi", "A4");
	vehicleList.push(audiA4);
	
	var audiA4 = new Vehicle("Certified", "Saturn", "Aura");
	vehicleList.push(audiA4);
	
	var audiA4 = new Vehicle("Used", "Ford", "Mustang");
	vehicleList.push(audiA4);
};

return{
	getVehicles: getVehicles,
	addVehicle: addVehicle,
	removeVehicle: removeVehicle,
	test: test
};

})();


$(document).ready(function(){
	
	/*
	 * show vehicle list as JSON format.
	 */
	$("#jsonFormat").bind("click", function(){
		var vehicleList = JSON.stringify(vehicleSearch.getVehicles());
		$(".json").text(vehicleList);
		$(".json").toggle(500);
		
		if($(this).val() == "Show JSON"){
			$(this).val("Hide JSON");
			$("#vehicleTbl").hide();
		}else{
			$(this).val("Show JSON");
			displayVehicleTbl(vehicleSearch.getVehicles());
		}
		
	});
	
	/*
	 * Search and filter vehicle list based on search input.
	 */
	$("#searchVehicle").bind("keyup", function(){
		var filter = $("#searchVehicle").val();
		if(filter.length >= 3){
			var result = null;
			result = $.grep(vehicleSearch.getVehicles(), function(vehicle, index){
				console.log(vehicle);
				if(vehicle.type.toLowerCase().indexOf(filter.toLowerCase()) >= 0 ||
				   vehicle.make.toLowerCase().indexOf(filter.toLowerCase()) >= 0 ||
				   vehicle.model.toLowerCase().indexOf(filter.toLowerCase()) >= 0){
					return vehicle;
				}
			});
		}else{
			result = vehicleSearch.getVehicles();
		}
		
		displayVehicleTbl(result);
	});
	
	/*
	 * Util function to display table.
	 */
	function displayVehicleTbl(vehicles){
		console.log(vehicles.length);
		var vehicleRow = '<table class="table table-bordered">';
		for(var i=0;i<vehicles.length;i++){
			var vehicleObj = vehicles[i]; 
			vehicleRow += "<tr><td>"+vehicleObj.type+"</td><td>"+vehicleObj.make+"</td><td>"+vehicleObj.model+"</td></tr>";
		}
		vehicleRow += '</table>';
		$("#vehicleTbl").html(vehicleRow);
		$("#vehicleTbl").show();
	}
	
	/*
	 * Add vehicle to list. Read search elements and fill vehicle list.
	 */
    $('#vehicleForm').submit(function(event){
    	if(!this.checkValidity()){
            return;
        }
		var type = $("#vehicleType").val();
		var make = $("#vehicleMake").val();
		var model = $("#vehicleModel").val();
		
		vehicleSearch.addVehicle(type, make, model);
		console.log(vehicleSearch.getVehicles());
		
		displayVehicleTbl(vehicleSearch.getVehicles());
		$(".message").css("display","none");
		event.preventDefault();
		this.reset();
    });
	
});
