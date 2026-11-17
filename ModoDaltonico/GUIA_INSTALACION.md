# Guía de Instalación y Uso - Plugin "Modo Daltónico"

## Instalación

1. Copie la carpeta `ModoDaltonico` dentro de `<raíz_mantisbt>/plugins/`.
2. Ingrese a MantisBT como administrador.
3. Vaya a **Administración → Complementos** (Manage → Plugins).
4. Busque **"Modo Daltónico"** en la lista de plugins disponibles.
5. Haga clic en **Instalar** junto al nombre del plugin.

## Configuración

1. Una vez instalado, el plugin aparece en la lista de **Plugins Instalados**.
2. Haga clic en el nombre del plugin para acceder a la **página de configuración**.
3. Desde allí puede:
   - **Activar o desactivar** el plugin globalmente.
   - **Seleccionar el tipo de contraste** por defecto: Protanopia, Deuteranopia o Tritanopia.
4. Presione **Guardar** para aplicar los cambios.

## Uso del Botón Flotante

- Al estar el plugin activo, aparece un **botón flotante** (icono de ojo) en la esquina inferior derecha de todas las páginas de MantisBT.
- Haga clic en el botón para **activar o desactivar** el modo daltónico.
- Cuando el modo está activo:
  - El botón se resalta en azul.
  - Aparece un **indicador** con el tipo de contraste activo.
  - Se muestra un **selector desplegable** para cambiar entre los tres modos de daltonismo.
- La configuración visual se guarda en el navegador (localStorage) y se mantiene entre pestañas y sesiones.

## Tipos de Contraste

| Modo          | Descripción                       |
|---------------|-----------------------------------|
| Protanopia    | Para usuarios que no distinguen el rojo  |
| Deuteranopia  | Para usuarios que no distinguen el verde |
| Tritanopia    | Para usuarios que no distinguen el azul  |

## Compatibilidad

- **MantisBT:** 2.0 o superior.
- **Navegadores:** Google Chrome, Safari y Microsoft Edge (versiones recientes).

## Notas Técnicas

- El plugin aplica filtros SVG (CSS `filter`) al nivel de la página, sin modificar directamente los colores de los elementos.
- No interfiere con otros plugins ni con los temas de MantisBT.
- La persistencia es exclusivamente en el navegador del usuario (localStorage), sin carga adicional al servidor.

---

# Installation and Usage Guide - "Colorblind Mode" Plugin

## Installation

1. Copy the `ModoDaltonico` folder into `<mantisbt_root>/plugins/`.
2. Log into MantisBT as an administrator.
3. Go to **Administration → Plugins** (Manage → Plugins).
4. Find **"Colorblind Mode"** in the list of available plugins.
5. Click **Install** next to the plugin name.

## Configuration

1. Once installed, the plugin appears in the **Installed Plugins** list.
2. Click the plugin name to access the **configuration page**.
3. From there you can:
   - **Enable or disable** the plugin globally.
   - **Select the default contrast type**: Protanopia, Deuteranopia, or Tritanopia.
4. Press **Save** to apply changes.

## Using the Floating Button

- When the plugin is active, a **floating button** (eye icon) appears in the bottom-right corner of all MantisBT pages.
- Click the button to **enable or disable** colorblind mode.
- When the mode is active:
  - The button is highlighted in blue.
  - An **indicator badge** shows the active contrast type.
  - A **dropdown selector** appears to switch between the three colorblind modes.
- The visual configuration is saved in the browser (localStorage) and persists across tabs and sessions.

## Contrast Types

| Mode          | Description                              |
|---------------|------------------------------------------|
| Protanopia    | For users who cannot distinguish red     |
| Deuteranopia  | For users who cannot distinguish green   |
| Tritanopia    | For users who cannot distinguish blue    |

## Compatibility

- **MantisBT:** 2.0 or higher.
- **Browsers:** Google Chrome, Safari, and Microsoft Edge (recent versions).

## Technical Notes

- The plugin applies SVG filters (CSS `filter`) at the page level, without directly modifying element colors.
- It does not interfere with other plugins or MantisBT themes.
- Persistence is exclusively in the user's browser (localStorage), with no additional server load.
