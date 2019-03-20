<?php
    add_action( "wp_ajax_get_vehicle", "wp_ajax_get_vehicle" );
	add_action( "wp_ajax_nopriv_get_vehicle", "wp_ajax_get_vehicle" );

	function wp_ajax_get_vehicle() {
		$data = array(
		   "make" => $_POST["make"],
		   "model" => $_POST["model"],
		   "year" => $_POST["year"],
		   "fuel" => $_POST["fuel"],
		   "HP" => $_POST["HP"],
		   "CC" => $_POST["CC"],
       );
       
       //var_dump($data);
       //exit;
	   $ch = curl_init();
	   //$data = array("make" => "AUDI","model" => "Q5","year"=>"2012","fuel" => "Diesel", "HP" => "208", "CC" => "2967" );
	   $data_string = json_encode($data);
	   curl_setopt($ch, CURLOPT_URL, "https://www.ecu-data.net/vehicle");
	   curl_setopt($ch, CURLOPT_REFERER, 'https://www.topgear-tuning.com/find-your-vehicle/');
	   curl_setopt($ch, CURLOPT_POST, 1);
	   curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);  //Post Fields    
	   curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	   $headers = [        
		   "Accept" =>  "application/json, text/plain, */*",
		   "Content-Type" => "application/json",                                                                                            
		   'Content-Length' =>strlen($data_string),
		   "Origin" => "https://www.topgear-tuning.com",
		   "Referer" =>  "https://www.topgear-tuning.com/find-your-vehicle/",
		   "User-Agent" => "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36"
	   ];
	   curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
	   curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 1);
	   curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
   
	   $server_output = curl_exec ($ch);
	   echo( $server_output) ;
	   curl_close ($ch);
   
	   die;    
    }
    

    function custom_js_scripts() {
        
        wp_enqueue_script( 'chart-js', get_theme_file_uri('vehicle/js/Chart.bundle.js'));
        wp_enqueue_style( 'vehicle-css', get_theme_file_uri('vehicle/css/vehicle.css'));
    }
    add_action( 'wp_enqueue_scripts', 'custom_js_scripts' );