import { Component, HostListener, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';
import { MenuService } from 'src/app/services/menu.service';

interface Alumno {
  nombre: string,
  matricula: string,
  licenciatura: string,
  campus: string,
  url_imagen: string
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  listProduct: Product[] = []

  fechaActual: string = '';
  horaActual: string = '';
  vigencia: string = '';
  private intervalId: any;
  public alumno: Alumno = {} as Alumno;
  public datosQR: any;
  public isLandscape: boolean = false;
  public tam: any = 300;

  constructor(
    private _productService: ProductService,
    private _menuService: MenuService,
  ) {
    this.checkOrientation();
  }

  ngOnInit(): void {
    this.ObtenerUsuario();
    this.actualizarVigencia();
  }

  getProducts() {
    this._productService.getProducts().subscribe(data => {
      this.listProduct = data;
    })
  }

  async ObtenerUsuario() {
    this.alumno.nombre = 'Irving Rafael Conde Marín'
    this.alumno.matricula = '201963033'
    this.alumno.licenciatura = 'Ingeniería en Software'
    this.alumno.campus = 'Ixtaczoquitlán'
    this.alumno.url_imagen = 'https://firebasestorage.googleapis.com/v0/b/listasasistencia-f6f1d.appspot.com/o/images%2Fportada_love-live-sunshine-39.jpg?alt=media&token=c5b7ac01-feeb-4f49-b5eb-e5279af10f0f'
    this.GenerarQR();
  }

  GenerarQR() {
    this.datosQR = this.alumno.matricula + ',' + this.alumno.nombre + ',Presente';
  }

  actualizarVigencia() {

    this.vigencia = `Vigencia Enero 2024 - Junio 2024`;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.checkOrientation();
  }

  private checkOrientation() {
    this.isLandscape = window.innerWidth > window.innerHeight;
    if (this.isLandscape) {
      this.tam = 150;
    } else {
      this.tam = 340;
    }
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.onResize);
  }

}
