/**
 * Generated by orval v7.1.1 🍺
 * Do not edit manually.
 * Shopping List API
 * Endpoints for interacting with the shopping list application
 * OpenAPI spec version: 1.0.0
 */
import type { ItemOutCreatedAt } from './itemOutCreatedAt'
import type { ItemOutCreatedBy } from './itemOutCreatedBy'
import type { ItemOutId } from './itemOutId'
import type { ItemOutNotes } from './itemOutNotes'
import type { ItemOutPhoto } from './itemOutPhoto'
import type { ItemOutUpdatedAt } from './itemOutUpdatedAt'
import type { ItemOutUpdatedBy } from './itemOutUpdatedBy'

export interface ItemOut {
  category: string
  created_at?: ItemOutCreatedAt
  created_by?: ItemOutCreatedBy
  default_quantity?: number
  id?: ItemOutId
  list_group: string
  name: string
  notes?: ItemOutNotes
  photo?: ItemOutPhoto
  plural_name: string
  unit_of_measure: string
  updated_at?: ItemOutUpdatedAt
  updated_by?: ItemOutUpdatedBy
}
