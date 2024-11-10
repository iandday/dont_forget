/**
 * Generated by orval v7.1.1 🍺
 * Do not edit manually.
 * Shopping List API
 * Endpoints for interacting with the shopping list application
 * OpenAPI spec version: 1.0.0
 */
import type { ListCustomizationOutCategory } from './listCustomizationOutCategory'
import type { ListCustomizationOutCreatedAt } from './listCustomizationOutCreatedAt'
import type { ListCustomizationOutCreatedBy } from './listCustomizationOutCreatedBy'
import type { ListCustomizationOutDefaultQuantity } from './listCustomizationOutDefaultQuantity'
import type { ListCustomizationOutDefaultUnitOfMeasure } from './listCustomizationOutDefaultUnitOfMeasure'
import type { ListCustomizationOutId } from './listCustomizationOutId'
import type { ListCustomizationOutNotes } from './listCustomizationOutNotes'
import type { ListCustomizationOutUpdatedAt } from './listCustomizationOutUpdatedAt'
import type { ListCustomizationOutUpdatedBy } from './listCustomizationOutUpdatedBy'

export interface ListCustomizationOut {
  category?: ListCustomizationOutCategory
  created_at?: ListCustomizationOutCreatedAt
  created_by?: ListCustomizationOutCreatedBy
  'Default Quantity'?: ListCustomizationOutDefaultQuantity
  default_unit_of_measure?: ListCustomizationOutDefaultUnitOfMeasure
  id?: ListCustomizationOutId
  item: string
  notes?: ListCustomizationOutNotes
  'Purchase Count'?: number
  shopping_list: string
  stocked?: boolean
  updated_at?: ListCustomizationOutUpdatedAt
  updated_by?: ListCustomizationOutUpdatedBy
}
