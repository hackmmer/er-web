import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { IProduct } from '../../models/product';

import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-menu',
  imports: [TranslatePipe, CurrencyPipe],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  products: IProduct[] = [
    {
      "name": "Bocata La Picante",
      "price": 6.90,
      "description": "Chorizo picante, queso manchego y pimientos asados",
      "imageUrl": "assets/img/bocata.png",
      "stock": 15,
      "category": "Bocadillos",
      "ingredients": [
        {
          'name':'Ensalada',
          'price':2,
          'isAvailable': false,
          'stock': 5,
          'isAlergen': false,
          'isVegetarian': false,
          'isVegan': false
        }
      ],
      "isAvailable":true,
      "isVegetarian": false,
      "isVegan": false,
      "preparationTime": 8
    },
    {
      "name": "Vegano Deluxe",
      "price": 7.50,
      "description": "Hamburguesa de lentejas, aguacate y vegetales frescos",
      "imageUrl": "assets/img/atun.png",
      "stock": 0,
      "category": "Bocadillos",
      "ingredients": [],
      "isAvailable":true,
      "isVegetarian": true,
      "isVegan": true,
      "preparationTime": 10
    },
    {
      "name": "Desayuno Andaluz",
      "price": 4.20,
      "description": "Tostada con tomate triturado, jamón serrano y aceite de oliva",
      "imageUrl": "assets/img/dog.png",
      "stock": 20,
      "category": "Desayunos",
      "isAvailable":true,
      "ingredients": [],
      "isVegetarian": false,
      "isVegan": false,
      "preparationTime": 5
    },
    {
      "name": "Patatas Bravas",
      "price": 3.50,
      "description": "Patatas fritas con salsa brava y alioli",
      "imageUrl": "assets/img/burguer.png",
      "stock": 25,
      "category": "Acompañamientos",
      "ingredients": [],
      "isAvailable":true,
      "isVegetarian": true,
      "isVegan": false,
      "preparationTime": 7
    },
    {
      "name": "Queso Fundido",
      "price": 5.80,
      "description": "Mezcla de quesos fundidos con champiñones",
      "imageUrl": "assets/img/hotdog.png",
      "stock": 8,
      "category": "Tapas",
      "ingredients": [],
      "isAvailable":true,
      "isVegetarian": true,
      "isVegan": false,
      "preparationTime": 9
    },
    {
      "name": "Ensalada Fresca",
      "price": 6.30,
      "description": "Mezcla de lechugas, tomate cherry, maíz y vinagreta",
      "imageUrl": "assets/img/leyenda.png",
      "stock": 12,
      "category": "Ensaladas",
      "ingredients": [],
      "isAvailable":true,
      "isVegetarian": true,
      "isVegan": true,
      "preparationTime": 6
    },
    {
      "name": "Coca-Cola",
      "price": 1.80,
      "description": "Refresco de cola 330ml",
      "imageUrl": "assets/img/bravas.png",
      "stock": 50,
      "category": "Bebidas",
      "ingredients": [],
      "isAvailable":true,
      "isVegetarian": true,
      "isVegan": true,
      "preparationTime": 1
    },
    {
      "name": "Café con Leche",
      "price": 1.60,
      "description": "Café espresso con leche vaporizada",
      "imageUrl": "assets/img/pollo.png",
      "stock": 30,
      "category": "Bebidas Calientes",
      "ingredients": [],
      "isAvailable":true,
      "isVegetarian": true,
      "isVegan": false,
      "preparationTime": 3
    },
    {
      "name": "Tarta de Chocolate",
      "price": 4.00,
      "description": "Tarta casera de chocolate negro",
      "imageUrl": "assets/img/polloroque.png",
      "stock": 6,
      "category": "Postres",
      "ingredients": [],
      "isAvailable":true,
      "isVegetarian": true,
      "isVegan": false,
      "preparationTime": 2
    },
    {
      "name": "Agua Mineral",
      "price": 1.20,
      "description": "Botella 500ml",
      "imageUrl": "assets/img/mixto.png",
      "stock": 40,
      "category": "Bebidas",
      "ingredients": [],
      "isAvailable":true,
      "isVegetarian": true,
      "isVegan": true,
      "preparationTime": 1
    }
  ]


}
