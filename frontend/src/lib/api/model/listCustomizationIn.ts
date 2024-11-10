/**
 * Generated by orval v7.1.1 🍺
 * Do not edit manually.
 * Shopping List API
 * Endpoints for interacting with the shopping list application
 * OpenAPI spec version: 1.0.0
 */
import type { ListCustomizationInCategoryId } from './listCustomizationInCategoryId'
import type { ListCustomizationInDefaultQuantity } from './listCustomizationInDefaultQuantity'
import type { ListCustomizationInDefaultUnitOfMeasureId } from './listCustomizationInDefaultUnitOfMeasureId'
import type { ListCustomizationInId } from './listCustomizationInId'
import type { ListCustomizationInNotes } from './listCustomizationInNotes'

export interface ListCustomizationIn {
  category_id?: ListCustomizationInCategoryId
  'Default Quantity'?: ListCustomizationInDefaultQuantity
  default_unit_of_measure_id?: ListCustomizationInDefaultUnitOfMeasureId
  id?: ListCustomizationInId
  item_id: string
  notes?: ListCustomizationInNotes
  'Purchase Count'?: number
  shopping_list_id: string
  stocked?: boolean
}