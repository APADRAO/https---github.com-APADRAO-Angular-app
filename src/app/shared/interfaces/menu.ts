export interface Submenu {
  nome: string;
  icone: string;
  nmLink: string;
  nmAtributo: string;
}

export interface Menu {
  menuName: string;
  listaMenu: Submenu;
}

export interface Menus {
  menus: Menu[];
}

