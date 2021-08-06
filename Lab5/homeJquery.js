//Used Professor Pascucci's Website Resouces for Reference 
//Used W3Schools for any reference needed with SQL


//runs when DOM is ready.
$(document).ready(function () {
    //This ajax request adds a house to the database (POST)
    $("addHomeButton").on("click", function () {
        var strURL = "https://localhost:44345/Lab5_API.Controllers/House/NewHouse" // directs to the houseController
        $("#display").html(""); //clears the div contents 

        var addHouse = new Object();
        addHouse.HomeOwner = record["#addOwner"].ToString();
        addHouse.Address = record["#addAddress"].ToString();
        addHouse.Status = record["#typeHouse"].ToString();
        addHouse.City = record["#addCity"].ToString();
        addHouse.State = record["#addState"].ToString();
        addHouse.ZipCode = int.Parse(record["#addZipcode"].ToString());
        addHouse.houseType = record["#statusHome"].ToString();
        addHouse.Price = int.Parse(record["#addPrice"].ToString());
        addHouse.SquareFootage = int.Parse(record["#addFootager"].ToString());
        addHouse.numOfBedrooms = int.Parse(record["#addBedrooms"].ToString());
        addHouse.Year = int.Parse(record["#addYear"].ToString());
        addHouse.Description = record["#addDescriptionHome"].ToString();
        addHouse.Image = record["#addImage"].ToString();
        addHouse.numOfBathrooms = int.Parse(record["#addBathrooms"].ToString());

        var strInput = JSON.stringify(addHouse);

        //make an AJAX Request  to get a house and display the response in the appropiate div

        $.ajax({
            type: "POST",
            url: strURL,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: strInput,
            //this means what happens when the data transfers to the database

            success: function (data) {
                var result = data;
                if (result == "true") {
                    $("#displayAddHome").html("House was successfully added to the database");
                } else {
                    $("#displayAddHome").html("House was not able to be added to the database");
                }
            },
            error: function (req, status, error) {
                alert("error: " + req.responseText + " | " + status + " | " + error);
            }
        }); //end of ajax method

    });

    //delete home method 
    $("deleteHomeButton").on("click", function () {
        var strURL = "https://localhost:44345/Lab5_API.Controllers/House/DeleteHouse/(HomeID)"; //goes to the houseController cs to find the DELETE'
        var param = $("#deleteHome").val();

        $("#displayDeleteHome").html("");  //clear the div contents
        //method does the "DELETE" Operation
        $.ajax({
            type: "DELETE",
            url: strURL + param,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            //this means what happens when the data transfers to the database

            success: function (data) {
                var deleteData = data;
                if (deleteData == true) {
                    $("#displayDeleteHome").html("Home ID: " + param + "  deleted");

                } else {
                    $("#displayDeleteHome").html("Home ID was not deleted" + "No Home ID" + param);

                }
            },
            error: function (req, status, error) {
                alert("error: " + req.responseText + " | " + status + " | " + error);
            }
        });

    });

    //updates the home 


    $("updateHomeButton").on("click", function () {
        var strURL = "https://localhost:44345/Lab5_API.Controllers/House/UpdateHouse/(HomeID)" // directs to the houseController
        var param = $("#updateHomeID").val();

        $("#display").html(""); //clears the div contents 

        var addHouse = new Object();
        addHouse.HomeID = int.Parse(record["#updateNewHomeID"].ToString());
        addHouse.HomeOwner = record["#updateOwner"].ToString();
        addHouse.Address = record["#updateAddress"].ToString();
        addHouse.Status = record["#updateStatus"].ToString();
        addHouse.City = record["#updateCity"].ToString();
        addHouse.State = record["#updateState"].ToString();
        addHouse.ZipCode = int.Parse(record["#updateZipcode"].ToString());
        addHouse.houseType = record["#typeHouse"].ToString();
        addHouse.Price = int.Parse(record["#updatePrice"].ToString());
        addHouse.SquareFootage = int.Parse(record["#updateFootager"].ToString());
        addHouse.numOfBedrooms = int.Parse(record["#updateBedrooms"].ToString());
        addHouse.Year = int.Parse(record["#updateYear"].ToString());
        addHouse.Description = record["#updateDescriptionHome"].ToString();
        addHouse.Image = record["#updateImage"].ToString();
        addHouse.numOfBathrooms = int.Parse(record["#updateBathrooms"].ToString());

        var strInput = JSON.stringify(addHouse);

        //make an AJAX Request  to update a house and display the response in the appropiate div

        $.ajax({
            type: "PUT",
            url: strURL + param,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: strInput,
            //this means what happens when the data transfers to the database

            success: function (data) {
                var result = data;
                if (result == "true") {
                    $("#displayUpdateHome").html("Home ID " + param + "Has been updated");
                } else {
                    $("#displayUpdateHome").html("Home ID " + param + "was not been updated");
                }
            },
            error: function (req, status, error) {
                alert("error: " + req.responseText + " | " + status + " | " + error);
            }
        }); //end of ajax method

    });

    //GET method for finding the type of home

    $("searchHouse").on("click", function () {

        var strURL = "https://localhost:44345/Lab5_API.Controllers/House/pickHome/(houseType)"; //goes to the houseController cs to find the GET'
        var param = $("#searchType").val();

        $("#displayTypeHome").html("");  //clear the div contents
        //method does the "GET" Operation
        $.ajax({
            type: "GET",
            url: strURL + param,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            //this means what happens when the data transfers to the database

            success: function (data) {
                var homeType = data;
                $.each(homeType, function (index, addHouse) {
                    $("#displayTypeHome").append;
                    $("#displayTypeHome").append($('<img>', {
                        id: 'homeImage', src: addHouse.Image  //adds image for the get request

                    }));

                    $("#displayTypeHome").append("<p>".concat("HomeID: ", addHouse.HomeID,
                        " <br> <br> Home Owner: ", addHouse.HomeOwner,
                        "<br><br> Real Estate Agent: ", addHouse.RealEstateAgent,
                        "<br> <br> Address :", addHouse.Address,
                        "<br> <br> City :", addHouse.City,
                        "<br> <br> State :", addHouse.State,
                        "<br> <br> Status :", addHouse.Status,
                        "<br> <br> House Type :", addHouse.houseType,
                        "<br> <br> Square Footage  :", addHouse.SquareFootage,
                        "<br> <br> Number of Bedrooms :", addHouse.numOfBedrooms,
                        "<br> <br> Number pf Bathrooms :", addHouse.numOfBathrooms,
                        "<br> <br> Year :", addHouse.Year,
                        "<br> <br> Image :", addHouse.Image,
                        "<br> <br> Price :", addHouse.Price,
                        "<br> <br> Zip Code :", addHouse.ZipCode,
                        "<br> <br> Description :", addHouse.Description,
                        "<br><br>"));





                });



            },



            error: function (req, status, error) {
                alert("error: " + req.responseText + " | " + status + " | " + error);
            }
        });//end of the following ajax method

    });

    //Close Home List

    $("closeSearch").on("click", function () {
        $("searchHouse").html("");



    });


    //This method will be finding the specific real estate agent name

    $("#REAgentButton").click(function () {
        var strURL = "https://localhost:44345/Lab5_API.Controllers/House/getZipcode/(zipcode)"; //goes to the houseController cs to find the GET'
        var param = $("#agentHome").val();

        $("#displayREAgent").html("");  //clear the div contents
        //method does the "GET" Operation
        $.ajax({
            type: "GET",
            url: strURL + param,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            //this means what happens when the data transfers to the database

            success: function (data) {
                var homeType = data;
                $.each(homeType, function (index, addHouse) {
                    $("#displayREAgent").append;
                    $("#displayREAgent").append($('<img>', {
                        id: 'homeImage', src: addHouse.Image  //adds image for the get request

                    }));

                    $("#displayREAgent").append("<p>".concat("HomeID: ", addHouse.HomeID,
                        " <br> <br> Home Owner: ", addHouse.HomeOwner,
                        "<br><br> Real Estate Agent: ", addHouse.RealEstateAgent,
                        "<br> <br> Address :", addHouse.Address,
                        "<br> <br> City :", addHouse.City,
                        "<br> <br> State :", addHouse.State,
                        "<br> <br> Status :", addHouse.Status,
                        "<br> <br> House Type :", addHouse.houseType,
                        "<br> <br> Square Footage  :", addHouse.SquareFootage,
                        "<br> <br> Number of Bedrooms :", addHouse.numOfBedrooms,
                        "<br> <br> Number pf Bathrooms :", addHouse.numOfBathrooms,
                        "<br> <br> Year :", addHouse.Year,
                        "<br> <br> Image :", addHouse.Image,
                        "<br> <br> Price :", addHouse.Price,
                        "<br> <br> Zip Code :", addHouse.ZipCode,
                        "<br> <br> Description :", addHouse.Description,
                        "<br><br>"));





                });



            },



            error: function (req, status, error) {
                alert("error: " + req.responseText + " | " + status + " | " + error);
            }
        });//end of the following ajax method

    });

    //Close Home List

    $("closeButton").on("click", function () {
        $("REAgentButton").html("");



    });

    //This method HAs the user search for homes based on the search criteria such as price, squarefootage, number of beds, etc)

    $("#searchButton").click(function () {
        var strURL = "https://localhost:44345/Lab5_API.Controllers/House/listHomePrice/(price)"; //goes to the houseController cs to find the GET'
        var param = $("#searchHouse").val();

        $("#displaySearchCriteria").html("");  //clear the div contents
        //method does the "GET" Operation
        $.ajax({
            type: "GET",
            url: strURL + param,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            //this means what happens when the data transfers to the database

            success: function (data) {
                var homeType = data;
                $.each(homeType, function (index, addHouse) {
                    $("#displaySearchCriteria").append;
                    $("#displaySearchCriteria").append($('<img>', {
                        id: 'homeImage', src: addHouse.Image  //adds image for the get request

                    }));

                    $("#displaySearchCriteria").append("<p>".concat("HomeID: ", addHouse.HomeID,
                        " <br> <br> Home Owner: ", addHouse.HomeOwner,
                        "<br><br> Real Estate Agent: ", addHouse.RealEstateAgent,
                        "<br> <br> Address :", addHouse.Address,
                        "<br> <br> City :", addHouse.City,
                        "<br> <br> State :", addHouse.State,
                        "<br> <br> Status :", addHouse.Status,
                        "<br> <br> House Type :", addHouse.houseType,
                        "<br> <br> Square Footage  :", addHouse.SquareFootage,
                        "<br> <br> Number of Bedrooms :", addHouse.numOfBedrooms,
                        "<br> <br> Number pf Bathrooms :", addHouse.numOfBathrooms,
                        "<br> <br> Year :", addHouse.Year,
                        "<br> <br> Image :", addHouse.Image,
                        "<br> <br> Price :", addHouse.Price,
                        "<br> <br> Zip Code :", addHouse.ZipCode,
                        "<br> <br> Description :", addHouse.Description,
                        "<br><br>"));



                });
            },
            error: function (req, status, error) {
                alert("error: " + req.responseText + " | " + status + " | " + error);
            }
        });//end of the following ajax method

    });

    //Close Home List

    $("searchCloseButton").on("click", function () {
        $("searchButton").html("");



    });



    // THe following method Changes the home ID

    $("#statusHomeID").on("change", function () {
        var strURL = "https://localhost:44345/Lab5_API.Controllers/House/getHomeId/(homeID)"; //goes to the houseController cs to find the GET'
        var param = $("#statusHomeID").val(); //used for get requests

        $("#displayStatusHomeID").html("");  //clears the div contents

        $.ajax({

            type: "GET",
            url: strURL + param,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            //this means what happens when the data transfers to the database

            success: function (picture) {

                $("#displayStatusHomeID").append($('<img>', {

                    id: 'statusImage', src: picture.Image  //adds image for the get request

                }));

            },
            //sends error if it wasnt passed through
            error: function (req, status, error) {
                alert("error: " + req.responseText + " | " + status + " | " + error);
            }



        });//End of AJAX Method.


    });


    //Makes the button Change when the user clicks to change the status

    $("#statusButton").on("click", function () {

        var strURL = "https://localhost:44345/Lab5_API.Controllers/House/UpdateHouse/(HomeID)S"; //goes to the houseController cs to find the PUT'
        var param = $("#statusHomeID").val(); //used for get, put

        $("#displayStatusHouse").html("");  //clears the div contents

        let house = new Object();
        house.Status = $("#statusHome").val();


        let strInput = JSON.stringify(addHouse);

        $.ajax({

            type: "PUT",
            url: strURL + param,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: strInput,
            //this means what happens when the data transfers to the database
            success: function (data) {
                let house = data;

                if (house == "true") {
                    $("#displayStatusHouse").html("Status " + param + "Has been updated" + house.Status);
                } else {
                    $("#displayStatusHouse").html("Status " + param + "was not been updated");
                }

            },
            //sends error if it wasnt passed through
            error: function (req, status, error) {
                alert("error: " + req.responseText + " | " + status + " | " + error);
            }


        });//End of AJAX Method.


    });



});





















