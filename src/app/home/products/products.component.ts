import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  listProducts: any;
  listProductsFilter: any;

  filtro!: FormGroup;

  constructor(
              private formBuilder: FormBuilder,
              private service: ServiceService,
              private cookie: CookieService,
              private router: Router
  ) {  }

  ngOnInit(): void {
    this.cookie.deleteAll();
    this.filtro = this.formBuilder.group({
      filtroNombre: ['',Validators.maxLength(2)],
      filtroID: ['',Validators.maxLength(2)]
    });
    this.getProducts();
    this.getCategories();
  }

  getProducts(){
    this.service.getProducts().subscribe(result => {
      console.log(result);
      
      this.listProducts = result
      this.listProductsFilter = this.listProducts;  
        }, error => {
          console.log(error);
        })
  }

  getCategories(){
    this.service.getCategories().subscribe(result => {
      console.log(result);       
        }, error => {
          console.log(error);
        })
    }

  

  filtrarCategoria(category: any){
    this.listProductsFilter = this.listProducts.filter((element: { category: any; }) => element.category === category);
  }


  filtrarNombre(){    
    this.listProductsFilter = this.listProducts.filter((element: { nombres: string | any[]; apellidos: string | any[]; }) => {      
      return element.nombres.includes((this.filtro.get('filtroNombre')!.value)) ||    
      element.apellidos.includes((this.filtro.get('filtroNombre')!.value))
    });    
  }

  filtrarID(){
    this.listProductsFilter = this.listProducts.filter((element: { tipoID: string | any[]; }) => {      
      return element.tipoID.includes(this.filtro.get('filtroID')!.value.toUpperCase());
    });
  }



























  createCredit(){
    this.router.navigate(['/Credit'])
  }

  editCredit(credit: string){      
    this.cookie.set('credit', btoa(JSON.stringify(credit)));
    this.router.navigate(['/Credit'])
  }

  deleteCredit(credit: any){
    Swal.fire({
      title: '<p style="color: #10BBB5; font: normal normal bold 20px/24px Raleway;">Eliminar credito</p>',
      html:  'Eliminarás toda la información <br>' +
             'de este crédito. ¿Estás segur@?',
      icon: 'warning',
      iconColor: '#10BBB5',
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#10BBB5'
    })

    }
  }
