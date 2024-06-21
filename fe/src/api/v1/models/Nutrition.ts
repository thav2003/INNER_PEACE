/* tslint:disable */
/* eslint-disable */
/**
 * Backend API
 * This API exposes endpoints to manage demo.
 *
 * The version of the OpenAPI document: 1.0.0
 * Contact: vuthase172485@fpt.edu.vn
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { mapValues } from '../runtime';
import type { IngredientEntity } from './IngredientEntity';
import {
    IngredientEntityFromJSON,
    IngredientEntityFromJSONTyped,
    IngredientEntityToJSON,
} from './IngredientEntity';
import type { WeightPerServing } from './WeightPerServing';
import {
    WeightPerServingFromJSON,
    WeightPerServingFromJSONTyped,
    WeightPerServingToJSON,
} from './WeightPerServing';
import type { Nutrient } from './Nutrient';
import {
    NutrientFromJSON,
    NutrientFromJSONTyped,
    NutrientToJSON,
} from './Nutrient';
import type { Flavonoid } from './Flavonoid';
import {
    FlavonoidFromJSON,
    FlavonoidFromJSONTyped,
    FlavonoidToJSON,
} from './Flavonoid';
import type { Property } from './Property';
import {
    PropertyFromJSON,
    PropertyFromJSONTyped,
    PropertyToJSON,
} from './Property';
import type { CaloricBreakdown } from './CaloricBreakdown';
import {
    CaloricBreakdownFromJSON,
    CaloricBreakdownFromJSONTyped,
    CaloricBreakdownToJSON,
} from './CaloricBreakdown';

/**
 * 
 * @export
 * @interface Nutrition
 */
export interface Nutrition {
    /**
     * 
     * @type {Array<Nutrient>}
     * @memberof Nutrition
     */
    nutrients?: Array<Nutrient>;
    /**
     * 
     * @type {Array<Property>}
     * @memberof Nutrition
     */
    properties?: Array<Property>;
    /**
     * 
     * @type {Array<Flavonoid>}
     * @memberof Nutrition
     */
    flavonoids?: Array<Flavonoid>;
    /**
     * 
     * @type {Array<IngredientEntity>}
     * @memberof Nutrition
     */
    ingredients?: Array<IngredientEntity>;
    /**
     * 
     * @type {CaloricBreakdown}
     * @memberof Nutrition
     */
    caloricBreakdown?: CaloricBreakdown;
    /**
     * 
     * @type {WeightPerServing}
     * @memberof Nutrition
     */
    weightPerServing?: WeightPerServing;
}

/**
 * Check if a given object implements the Nutrition interface.
 */
export function instanceOfNutrition(value: object): value is Nutrition {
    return true;
}

export function NutritionFromJSON(json: any): Nutrition {
    return NutritionFromJSONTyped(json, false);
}

export function NutritionFromJSONTyped(json: any, ignoreDiscriminator: boolean): Nutrition {
    if (json == null) {
        return json;
    }
    return {
        
        'nutrients': json['nutrients'] == null ? undefined : ((json['nutrients'] as Array<any>).map(NutrientFromJSON)),
        'properties': json['properties'] == null ? undefined : ((json['properties'] as Array<any>).map(PropertyFromJSON)),
        'flavonoids': json['flavonoids'] == null ? undefined : ((json['flavonoids'] as Array<any>).map(FlavonoidFromJSON)),
        'ingredients': json['ingredients'] == null ? undefined : ((json['ingredients'] as Array<any>).map(IngredientEntityFromJSON)),
        'caloricBreakdown': json['caloricBreakdown'] == null ? undefined : CaloricBreakdownFromJSON(json['caloricBreakdown']),
        'weightPerServing': json['weightPerServing'] == null ? undefined : WeightPerServingFromJSON(json['weightPerServing']),
    };
}

export function NutritionToJSON(value?: Nutrition | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'nutrients': value['nutrients'] == null ? undefined : ((value['nutrients'] as Array<any>).map(NutrientToJSON)),
        'properties': value['properties'] == null ? undefined : ((value['properties'] as Array<any>).map(PropertyToJSON)),
        'flavonoids': value['flavonoids'] == null ? undefined : ((value['flavonoids'] as Array<any>).map(FlavonoidToJSON)),
        'ingredients': value['ingredients'] == null ? undefined : ((value['ingredients'] as Array<any>).map(IngredientEntityToJSON)),
        'caloricBreakdown': CaloricBreakdownToJSON(value['caloricBreakdown']),
        'weightPerServing': WeightPerServingToJSON(value['weightPerServing']),
    };
}
