<?php

require_api( 'gpc_api.php' );
require_api( 'authentication_api.php' );

auth_ensure_user_authenticated();

header( 'Content-Type: application/json; charset=utf-8' );

$f_active = gpc_get_string( 'active', '' );

if( !in_array( $f_active, array( 'on', 'off' ), true ) ) {
	echo json_encode( array( 'ok' => false, 'error' => 'invalid parameter' ) );
	exit;
}

echo json_encode( array( 'ok' => true, 'active' => $f_active ) );
