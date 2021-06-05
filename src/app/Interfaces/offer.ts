import { OfferProductDetails } from "./offer-product-details";

export interface Offer {
    OfferName:string;
    OfferCode:string;
    OfferUnitPrice:string;
    AdditionalInfo:string;
    offerProducts : OfferProductDetails[];
}
