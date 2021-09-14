
<?php
if($_GET['MatchId']){

$matchId= $_GET['MatchId'];
    
header("Access-Control-Allow-Origin: *");
$curl = curl_init();
curl_setopt_array($curl, array(
  CURLOPT_URL => "https://api.tracker.gg/api/v2/warzone/standard/matches/$matchId",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => '',
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_HEADER=> false,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => 'GET',
));

$datos = curl_exec($curl);
curl_close($curl);
echo $datos;
};

?>