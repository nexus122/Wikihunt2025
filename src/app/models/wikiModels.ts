export interface WikiModel {
  titulo: string;
  descripcion: string;
  url: string;
  imagen: string | null;
  enlacesInternos: string[];
}
