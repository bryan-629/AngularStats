<?php
if($_GET['plataform'] && $_GET['query'] && $_GET['autocomplete']){

$query = $_GET['query'];
  if (strpos($query, ' ') !== false) {
    $query = str_replace(" ", "+", $query);
  }
    $curl = curl_init();
    
    
curl_setopt_array($curl, array(
  CURLOPT_URL => "https://api.tracker.gg/api/v2/warzone/standard/search?platform=atvi&query=$query&autocomplete=true",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => '',
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_HEADER=> false,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => 'GET',
));
header("Access-Control-Allow-Origin: *");
$datos = curl_exec($curl);
curl_close($curl);
echo $datos;
};

?>