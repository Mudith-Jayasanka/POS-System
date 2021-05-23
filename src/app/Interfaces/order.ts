import { CustomerDetails } from "./customer-details";
import { OrderDetails } from "./order-details";
import { OtherOrderInfo } from "./other-order-info";
import { ProductOrder } from "./product-order";

export interface Order {
    customerDetails : CustomerDetails;
    orderDetails : OrderDetails;
    productOrders : ProductOrder[];
    otherInfo : OtherOrderInfo;
}
