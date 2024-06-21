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
import type { Equipment } from './Equipment';
import {
    EquipmentFromJSON,
    EquipmentFromJSONTyped,
    EquipmentToJSON,
} from './Equipment';
import type { InstructionDuration } from './InstructionDuration';
import {
    InstructionDurationFromJSON,
    InstructionDurationFromJSONTyped,
    InstructionDurationToJSON,
} from './InstructionDuration';

/**
 * 
 * @export
 * @interface InstructionEntity
 */
export interface InstructionEntity {
    /**
     * 
     * @type {Date}
     * @memberof InstructionEntity
     */
    createdAt?: Date;
    /**
     * 
     * @type {Date}
     * @memberof InstructionEntity
     */
    updatedAt?: Date;
    /**
     * 
     * @type {number}
     * @memberof InstructionEntity
     */
    id?: number;
    /**
     * 
     * @type {number}
     * @memberof InstructionEntity
     */
    number?: number;
    /**
     * 
     * @type {string}
     * @memberof InstructionEntity
     */
    step?: string;
    /**
     * 
     * @type {Array<IngredientEntity>}
     * @memberof InstructionEntity
     */
    ingredients?: Array<IngredientEntity>;
    /**
     * 
     * @type {Array<Equipment>}
     * @memberof InstructionEntity
     */
    equipment?: Array<Equipment>;
    /**
     * 
     * @type {InstructionDuration}
     * @memberof InstructionEntity
     */
    length?: InstructionDuration;
}

/**
 * Check if a given object implements the InstructionEntity interface.
 */
export function instanceOfInstructionEntity(value: object): value is InstructionEntity {
    return true;
}

export function InstructionEntityFromJSON(json: any): InstructionEntity {
    return InstructionEntityFromJSONTyped(json, false);
}

export function InstructionEntityFromJSONTyped(json: any, ignoreDiscriminator: boolean): InstructionEntity {
    if (json == null) {
        return json;
    }
    return {
        
        'createdAt': json['createdAt'] == null ? undefined : (new Date(json['createdAt'])),
        'updatedAt': json['updatedAt'] == null ? undefined : (new Date(json['updatedAt'])),
        'id': json['id'] == null ? undefined : json['id'],
        'number': json['number'] == null ? undefined : json['number'],
        'step': json['step'] == null ? undefined : json['step'],
        'ingredients': json['ingredients'] == null ? undefined : ((json['ingredients'] as Array<any>).map(IngredientEntityFromJSON)),
        'equipment': json['equipment'] == null ? undefined : ((json['equipment'] as Array<any>).map(EquipmentFromJSON)),
        'length': json['length'] == null ? undefined : InstructionDurationFromJSON(json['length']),
    };
}

export function InstructionEntityToJSON(value?: InstructionEntity | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'createdAt': value['createdAt'] == null ? undefined : ((value['createdAt']).toISOString()),
        'updatedAt': value['updatedAt'] == null ? undefined : ((value['updatedAt']).toISOString()),
        'id': value['id'],
        'number': value['number'],
        'step': value['step'],
        'ingredients': value['ingredients'] == null ? undefined : ((value['ingredients'] as Array<any>).map(IngredientEntityToJSON)),
        'equipment': value['equipment'] == null ? undefined : ((value['equipment'] as Array<any>).map(EquipmentToJSON)),
        'length': InstructionDurationToJSON(value['length']),
    };
}

