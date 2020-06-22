import { ServiceYear, ServiceType } from ".";

export enum DiscountKind {
    Package = 1,
    PriceDrop
}

class DiscountParameters {
    constructor(prerequisites: ServiceType[], amount: number, discountKind: DiscountKind) {
        this.services = prerequisites;
        this.amount = amount;
        this.kind = discountKind;
    }

    services: ServiceType[];
    amount: number;
    kind: DiscountKind;
}

class PricingInfo {
    constructor(basePrice: number) {
        this.basePrice = basePrice;
        this.discount = new Array<DiscountParameters>();
    }

    basePrice: number;
    discount: DiscountParameters[];
}

type PricingMatrix = Record<ServiceType, Record<ServiceYear, PricingInfo>>;

export const PricingData: PricingMatrix = {
    Photography: {
        "2020": new PricingInfo(1700),
        "2021": new PricingInfo(1800),
        "2022": new PricingInfo(1900)
    },
    VideoRecording: {
        "2020": new PricingInfo(1700),
        "2021": new PricingInfo(1800),
        "2022": new PricingInfo(1900)
    },
    WeddingSession: {
        "2020": new PricingInfo(600),
        "2021": new PricingInfo(600),
        "2022": new PricingInfo(600)
    },
    BlurayPackage: {
        "2020": new PricingInfo(300),
        "2021": new PricingInfo(300),
        "2022": new PricingInfo(300)
    },
    TwoDayEvent: {
        "2020": new PricingInfo(400),
        "2021": new PricingInfo(400),
        "2022": new PricingInfo(400)
    }
}

PricingData["Photography"][2020].discount.push(new DiscountParameters(["VideoRecording"], 2200, DiscountKind.Package));
PricingData["Photography"][2021].discount.push(new DiscountParameters(["VideoRecording"], 2300, DiscountKind.Package));
PricingData["Photography"][2022].discount.push(new DiscountParameters(["VideoRecording"], 2500, DiscountKind.Package));
PricingData["WeddingSession"][2020].discount.push(new DiscountParameters(["Photography"], 300, DiscountKind.PriceDrop));
PricingData["WeddingSession"][2021].discount.push(new DiscountParameters(["Photography"], 300, DiscountKind.PriceDrop));
PricingData["WeddingSession"][2022].discount.push(new DiscountParameters(["Photography"], 0, DiscountKind.PriceDrop));
PricingData["WeddingSession"][2020].discount.push(new DiscountParameters(["VideoRecording"], 300, DiscountKind.PriceDrop));
PricingData["WeddingSession"][2021].discount.push(new DiscountParameters(["VideoRecording"], 300, DiscountKind.PriceDrop));
PricingData["WeddingSession"][2022].discount.push(new DiscountParameters(["VideoRecording"], 300, DiscountKind.PriceDrop));
