import { relation } from "./relations";
import { PricingData, DiscountKind } from "./pricing";

export type ServiceYear = 2020 | 2021 | 2022;
export type ServiceType = "Photography" | "VideoRecording" | "BlurayPackage" | "TwoDayEvent" | "WeddingSession";

export const updateSelectedServices = (
        previouslySelectedServices: ServiceType[],
        action: { type: "Select" | "Deselect"; service: ServiceType }) => {
    var result = [...previouslySelectedServices];
    var prerequisites = relation[action.service];
    switch (action.type) {
        case "Select":
            if (result.includes(action.service)) {
                return result;
            }

            var prerequisites = relation[action.service];
            var prerequisitesMet = prerequisites.length == 0 || result.some(p => prerequisites.includes(p));

            return prerequisitesMet ? [...result, action.service] : result;
        case "Deselect":
            if (!result.includes(action.service)) {
                return result;
            }

            result = result.filter(a => a !== action.service);
            result = result.filter(i => relation[i].length == 0 || result.some(p => relation[i].includes(p)))

            return result;
    }
};

export const calculatePrice = (selectedServices: ServiceType[], selectedYear: ServiceYear) => {
    var basePrice = 0;
    var finalPrice = 0;

    var servicesPricing = selectedServices.map((service: ServiceType) => {
        return { service, pricing: PricingData[service][selectedYear] };
    });

    basePrice = servicesPricing.reduce((a, serv) => { return a + serv.pricing.basePrice; }, 0)

    var discounts = new Array<number>();

    for (let item of servicesPricing) {

        var applicableDiscounts = item.pricing.discount.filter(c => c.services.every(s => selectedServices.includes(s)));

        for (let discount of applicableDiscounts) {
            switch (discount.kind) 
            {
                case DiscountKind.Package:
                    var prerequisitesPrice = servicesPricing.filter((s) => discount.services.includes(s.service)).reduce((a, serv) => { return a + serv.pricing.basePrice; }, 0);
                    discounts.push((item.pricing.basePrice + prerequisitesPrice) - discount.amount);
                    break;
                case DiscountKind.PriceDrop:
                    discounts.push(item.pricing.basePrice - discount.amount);
                    break;
            }
        }
    }

    finalPrice = discounts.length > 0 ? basePrice - Math.max(...discounts) : basePrice;

    return { basePrice, finalPrice };
};
