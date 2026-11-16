# VICEPASS — Identity Studio v2.0

Aplicación web local para crear carnés y tarjetas **ficticias de roleplay** con estética Vice City. Incluye editor visual, 13 plantillas, fotografía local, personalización, exportación PNG y colección local.

## Inicio rápido en Windows
1. Descomprime el ZIP completo.
2. Abre la carpeta `VICEPASS`.
3. Haz doble clic en `STARTER.bat`.
4. Se iniciará un servidor local y se abrirá VICEPASS en Google Chrome (o en el navegador predeterminado si Chrome no está instalado).

**Requisito:** Python 3 instalado y disponible en PATH (`py -3` o `python`). Si no quieres usar el archivo BAT, puedes abrir `index.html` directamente o usar Live Server en VS Code.

La dirección local es `http://127.0.0.1:8000/`. No se publica en Internet ni requiere claves API.

## Funciones
- 13 tipos de personaje: Policía LSPD, Sheriff BCSO, FBI ficticio, detective, tráfico, criminal, ladrón de tiendas, atracador, fugitivo, civil, médico, mecánico y VIP.
- Datos editables: nombre, número, rango, departamento, fechas y notas.
- Fotografía local, color, cuatro estilos visuales y 27 fondos.
- Generación aleatoria de personajes.
- Vista previa en directo y exportación PNG de 1100 × 700.
- Guardado desde Carnet Studio o Caja de herramientas.
- Colección local: cargar, descargar desde el editor y eliminar diseños.
- Diseño responsive para PC y móviles.
- Atajos: Ctrl + S guarda; Ctrl + E exporta; R genera datos aleatorios (fuera de campos de texto).

## Archivos principales
- `index.html`: interfaz.
- `style.css`: diseño responsive, animaciones y estilos.
- `script.js`: editor, canvas, generador, colección y exportación.
- `STARTER.bat`: inicio local automático en Windows.
- `assets/backgrounds/`: fondos WebP.
- `assets/user-gallery/`: referencias visuales.
- `carnets/`: configuraciones JSON de plantillas.

## Privacidad y límites
Las fotografías y diseños se procesan localmente en el navegador. La colección usa `localStorage` del navegador; descarga los PNG que quieras conservar. Si borras los datos del navegador, podrías perder la colección.

VICEPASS crea props gráficos de ficción para historias y roleplay. Los diseños incluyen la marca visible **FICTIONAL ROLEPLAY — NOT AN OFFICIAL ID** y no sirven para acreditar identidad, empleo, autoridad ni permisos reales. Los nombres de agencias son ambientación ficticia. Proyecto fan-made no afiliado a Rockstar Games.
