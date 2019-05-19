<?php
if (!defined('ABSPATH')) {
	exit;
}
$username = "zxl101";
$password = "S079z079";
$host = "mytestdb.cjkcq2pcruvk.us-east-2.rds.amazonaws.com";
$database="iter2";

$connect = mysqli_connect( $host, $username, $password, $database );

$myquery3 = "select c.city_id,city_name, year(rent_year) as year, (rent_price/7*365)/median_income_per_person_per_year * 100 as per_income, house_type 
            from rent as r join city as c on r.city_id = c.city_id 
            join rent_house_type as rht on r.house_type_id = rht.rent_house_type_id 
            join income as i on i.city_id = c.city_id and year(i.year) = year(rent_year);";

$query3 = mysqli_query($connect, $myquery3);

$data    = array();
while ( $row = mysqli_fetch_assoc( $query3 ) ) {
	$element = array();
	$element["type"] = $row["house_type"];
	$element['value'] = $row['per_income'];
	$element['year'] = $row['year'];
	$element['city_id'] = $row['city_id'];
	$element['city_name'] = $row['city_name'];
	$data[] = $element;
}


$myquery3b = "select c.city_id, city_name, year(buy_house_year) as year, buy_house_price/median_income_per_person_per_year as num_year, buy_house_type from buy_house as bh join city as c on bh.city_id = c.city_id 
join buy_house_type as bht on bh.buy_house_type_id = bht.buy_house_type_id 
join income as i on i.city_id = c.city_id and year(i.year) = year(buy_house_year);";

$query3b = mysqli_query($connect, $myquery3b);

$data2    = array();
while ( $row = mysqli_fetch_assoc( $query3b ) ) {
	$element = array();
	$element["type"] = $row["buy_house_type"];
	$element['value'] = $row['num_year'];
	$element['year'] = $row['year'];
	$element['city_id'] = $row['city_id'];
	$element['city_name'] = $row['city_name'];
	$data2[] = $element;
}
?>


<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
	<meta charset="utf-8">
	<script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
	<link rel="stylesheet" href="css/houcity_style.css">
	<script type="text/javascript" src="js/houcity_script.js"></script>
	<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css">

	<link rel="stylesheet" href="css/houdia_style.css">
	<script src="http://d3js.org/d3.v3.min.js"></script>
	<script src="http://labratrevenge.com/d3-tip/javascripts/d3.tip.v0.6.3.js"></script>
	<script src="https://d3js.org/d3-axis.v1.min.js"></script>
</head>

<body>
<!--<div class="section2_c" >-->
<!--	<div id="form1" style="text-align: center">-->
<!--		<p></p>-->
<!--		<label class="text_label_c">Select a city you would like to compare:</label>-->
<!--		<br>-->
<!--		<select id="city_c">-->
<!--			<option value="0">--select a city--</option>-->
<!--			<option value="1">Ballarat</option>-->
<!--			<option value="2">Greater Bendigo</option>-->
<!--			<option value="3">Greater Geelong</option>-->
<!--			<option value="4">Greater Shepparton</option>-->
<!--			<option value="5">Horsham</option>-->
<!--			<option value="6">Latrobe</option>-->
<!--			<option value="7">Mildura</option>-->
<!--			<option value="8">Wangaratta</option>-->
<!--			<option value="9">Warrnambool</option>-->
<!--			<option value="10">Wodonga</option>-->
<!--		</select>-->
<!--	</div>-->
<!--</div>-->
<br>
<div class="section3_c" style="text-align: center">
	<p></p>
	<label class="text_label_c">Select up to four Regional Cities to compare:</label>
	<hr>
    <br>
	<div id="checkbox" style="text-align: center">

		<label class="city_d" id="1">
			<input class="checkcity" type="checkbox" id="1">
			Ballarat
			<span class="checkmark4"></span>
		</label>

		<label class="city_d" id="2">
			<input class="checkcity" type="checkbox" id="2">
			Greater Bendigo
			<span class="checkmark4"></span>
		</label>

		<label class="city_d" id="3">
			<input class="checkcity" type="checkbox" id="3">
			Greater Geelong
			<span class="checkmark4"></span>
		</label>

		<label class="city_d" id="4">
			<input class="checkcity" type="checkbox" id="4">
			Greater Shepparton
			<span class="checkmark4"></span>
		</label>

		<label class="city_d" id="5">
			<input class="checkcity" type="checkbox" id="5">
			Horsham
			<span class="checkmark4"></span>
		</label>
		<br>

		<label class="city_d" id="6">
			<input class="checkcity" type="checkbox" id="6">
			Latrobe
			<span class="checkmark4"></span>
		</label>

		<label class="city_d" id="7">
			<input class="checkcity" type="checkbox" id="7">
			Mildura
			<span class="checkmark4"></span>
		</label>

		<label class="city_d" id="8">
			<input class="checkcity" type="checkbox" id="8">
			Wangaratta
			<span class="checkmark4"></span>
		</label>

		<label class="city_d" id="9">
			<input class="checkcity" type="checkbox" id="9">
			Warrnambool
			<span class="checkmark4"></span>
		</label>

		<label class="city_d" id="10">
			<input class="checkcity" type="checkbox" id="10">
			Wodonga
			<span class="checkmark4"></span>
		</label>

	</div>
	<p></p>
	<div class="s_button_c">
		<button class="submit_button_c">Submit</button>
	</div>
    <p></p>


	<div class="alert1" style="display: none">
		<p style="text-align: center; color: red; font-size: 22px; font-weight: bold;">You can't only choose one city!</p>
	</div>


<!-- Two button for user to choose rent or buy-->
    <div class="select_type" style="display: none">
        <div class="type_choice">
            <button id="rent_but2" class="rent_but">Rent</button>
            <button id="buy_but2" class="buy_but">Buy</button>
        </div>
    </div>
    <p></p>
<!--rent part-->
<!--the diagram title for rent-->





    <br>
        <div class="diagram_rent_title" style="display: none; text-align: center">
            <span>Select One type of Residence </span>
        </div>
        <div id="drop_rent" style="display: none"></div><br>
        <div class="diagram_title" style="display: none">
            <span style="font-size: 20px; font-weight: bold">------ <i class="far fa-chart-bar"> Different types of rent as a percentage of annual income per person</i> ------</span>
        </div>

	<div class="svg3" style="display: none"></div>


<!--buy part-->

        <div class="diagram_buy_title" style="display: none; text-align: center">
            <span>Select One type of Residence </span>
        </div>
        <div id="drop2" style="display: none"></div><br>
        <div class="diagram_title2" style="display: none">
            <span style="font-size: 20px; font-weight: bold">------ <i class="far fa-chart-bar"> Different types of buy as a percentage of annual income per person</i> ------</span>
        </div>

        <div class="svg3b" style="display: none">
        </div>

</body>

<script>
    // load the data from php
    var bi_data = <?php echo json_encode($data); ?>;
    var bi_data2 = <?php echo json_encode($data2); ?>;

</script>
</html>
