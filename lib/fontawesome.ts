// Font Awesome en SVG : on importe la feuille minimale nous-mêmes (dans le layout)
// et on empêche la lib d'injecter son CSS au runtime (évite le flash d'icônes géantes).
import { config } from "@fortawesome/fontawesome-svg-core";

config.autoAddCss = false;
