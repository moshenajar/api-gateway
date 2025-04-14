
export class ProductItem {
    productID?:number;
    productSku: string;
    productName: string;
    productPrice: number;
    productShortName: string;
    ProductDescription: string;
    LocalDateTime: Date;
    deliveryTimeSpan:string;
    categoryId: number;
    categoryName: string;
    productImageUrl: string;
}



export class Product {
    id?: string;
    ban: number;
    userId: string;
    status: number;
    product:ProductItem;
    isInventoryManagementRequired:boolean;
}


