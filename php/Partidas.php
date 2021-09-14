<?php
if(isset($_GET['user']) && isset($_GET['next'])){
    $user = $_GET['user'];
    $next =$_GET['next'];
    $cadena = explode('#',$user);
        $cadena[0] = $cadena[0] . '%23';
        $id = $cadena[0] . $cadena[1];
        header("Access-Control-Allow-Origin: *");
    $curl = curl_init();
        curl_setopt_array($curl, array(
        CURLOPT_URL => "https://api.tracker.gg/api/v2/warzone/standard/matches/atvi/$id?type=wz&next=$next",
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
}else{
    header("Access-Control-Allow-Origin: *");
     $user = $_GET['user'];
    $cadena = explode('#',$user);
        $cadena[0] = $cadena[0] . '%23';
        $id = $cadena[0] . $cadena[1];
    $curl = curl_init();
        curl_setopt_array($curl, array(
        CURLOPT_URL => "https://api.tracker.gg/api/v2/warzone/standard/matches/atvi/$id?type=wz",
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
};

?>