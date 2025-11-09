import { test, expect } from 'vitest'
import { Billing } from '../'

test('Lowest tier', () => {
	const storage = 10

	const cost = 4000
	const expectedCost = Billing.compute(storage)

	expect(cost).toEqual(expectedCost)
})

test('Middle tier', () => {
	const storage = 50

	const cost = 5000
	const expectedCost = Billing.compute(storage)

	expect(cost).toEqual(expectedCost)
})

test('Highest tier', () => {
	const storage = 101

	const cost = 10100
	const expectedCost = Billing.compute(storage)

	expect(cost).toEqual(expectedCost)
})
