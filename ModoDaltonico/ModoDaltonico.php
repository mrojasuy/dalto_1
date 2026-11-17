<?php

class ModoDaltonicoPlugin extends MantisPlugin {

	public function register() {
		$this->name        = plugin_lang_get( 'nombre' );
		$this->description = plugin_lang_get( 'descripcion' );
		$this->version     = '1.0.0';
		$this->requires    = array( 'MantisCore' => '2.0.0' );
		$this->author      = 'Equipo Accesibilidad';
		$this->contact     = '';
		$this->url         = '';
		$this->page        = 'config';
	}

	public function config() {
		return array(
			'enabled'       => ON,
			'contrast_type' => 'protanopia',
		);
	}

	public function events() {
		return array();
	}

	public function hooks() {
		return array(
			'EVENT_MENU_MAIN'       => 'menu_main',
			'EVENT_LAYOUT_RESOURCES' => 'layout_resources',
		);
	}

	public function menu_main( $p_event ) {
		if( plugin_config_get( 'enabled' ) == OFF ) {
			return array();
		}
		return array(
			'<a href="' . string_attribute( plugin_page( 'config' ) ) . '">'
			. string_display( plugin_lang_get( 'configuracion' ) )
			. '</a>',
		);
	}

	public function layout_resources( $p_event ) {
		if( plugin_config_get( 'enabled' ) == OFF ) {
			return '';
		}

		$t_active        = plugin_config_get( 'enabled' ) == ON ? 'true' : 'false';
		$t_contrast_type = string_attribute( plugin_config_get( 'contrast_type' ) );

		$t_strings = array(
			'protanopia'   => plugin_lang_get( 'protanopia' ),
			'deuteranopia' => plugin_lang_get( 'deuteranopia' ),
			'tritanopia'   => plugin_lang_get( 'tritanopia' ),
			'modo_activo'  => plugin_lang_get( 'modo_activo' ),
			'modo_inactivo' => plugin_lang_get( 'modo_inactivo' ),
			'activar'      => plugin_lang_get( 'activar' ),
			'desactivar'   => plugin_lang_get( 'desactivar' ),
		);

		$t_html = '<link rel="stylesheet" href="' . string_attribute( plugin_file( 'modoDaltonico.css' ) ) . '" />' . "\n";

		$t_html .= '<script>window.ModoDaltonicoConfig = ' . json_encode( array(
			'initialActive' => plugin_config_get( 'enabled' ) == ON,
			'contrastType'  => plugin_config_get( 'contrast_type' ),
			'toggleUrl'     => plugin_page( 'toggle' ),
			'activeLabel'   => plugin_lang_get( 'indicador_activo' ),
			'inactiveLabel' => plugin_lang_get( 'modo_inactivo' ),
			'strings'       => $t_strings,
		) ) . ';</script>' . "\n";

		$t_html .= '<script src="' . string_attribute( plugin_file( 'modoDaltonico.js' ) ) . '"></script>' . "\n";

		return $t_html;
	}

	public function install() {
		return true;
	}

	public function uninstall() {
		// nothing to clean up
	}
}
