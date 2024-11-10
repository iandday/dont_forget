/**
 * Generated by orval v7.1.1 🍺
 * Do not edit manually.
 * Shopping List API
 * Endpoints for interacting with the shopping list application
 * OpenAPI spec version: 1.0.0
 */
import type { CategoryDetails } from './categoryDetails'
import type { ShoppingListOutMinimized } from './shoppingListOutMinimized'

export interface ListDetails {
  categories: CategoryDetails[]
  shopping_list: ShoppingListOutMinimized
}