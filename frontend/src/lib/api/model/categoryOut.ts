/**
 * Generated by orval v7.1.1 🍺
 * Do not edit manually.
 * Shopping List API
 * Endpoints for interacting with the shopping list application
 * OpenAPI spec version: 1.0.0
 */
import type { CategoryOutCreatedAt } from './categoryOutCreatedAt'
import type { CategoryOutCreatedBy } from './categoryOutCreatedBy'
import type { CategoryOutId } from './categoryOutId'
import type { CategoryOutUpdatedAt } from './categoryOutUpdatedAt'
import type { CategoryOutUpdatedBy } from './categoryOutUpdatedBy'

export interface CategoryOut {
  created_at?: CategoryOutCreatedAt
  created_by?: CategoryOutCreatedBy
  id?: CategoryOutId
  name: string
  shopping_list_group: string
  updated_at?: CategoryOutUpdatedAt
  updated_by?: CategoryOutUpdatedBy
}
