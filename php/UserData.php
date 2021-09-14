<?php
if(isset($_GET['user'])){
    $user = $_GET['user'];

    $cadena = explode('#',$user);
        $cadena[0] = $cadena[0] . '%23';
        $id = $cadena[0] . $cadena[1];
    $curl = curl_init();
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
        curl_setopt_array($curl, array(
        CURLOPT_URL => "https://api.tracker.gg/api/v2/warzone/standard/profile/atvi/$id",
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => '',
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 0,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => 'GET',
        ));
        
        $datos = curl_exec($curl);
        
        curl_close($curl);
        echo $datos;
}
?>