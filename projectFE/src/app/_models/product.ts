import { category } from './category';

export class products {
   
     _id: string;
     name: string;
     desc: string;
     price: number;
     rating: number;
     imgurl: string;
     currency:string;
     view: number;
     category: category[];
     qty: number;
    
}