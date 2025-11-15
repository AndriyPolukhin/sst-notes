import { useState } from 'react'
import config from '../config'
import { API } from 'aws-amplify'
import { onError } from '../lib/errorLib'
import { useNavigate } from 'react-router-dom'
import { type BillingType } from '../types/billing'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(config.STRIPE_KEY)

import './Settings.css'
import { BillingForm, type BillingFormType } from '../components/BillingForm'
import { Elements } from '@stripe/react-stripe-js'

export default function Settings() {
	const nav = useNavigate()
	const [isLoading, setIsLoading] = useState(false)

	function billUser(details: BillingType) {
		return API.post('notes', '/billing', {
			body: details,
		})
	}

	const handleFormSubmit: BillingFormType['onSubmit'] = async (
		storage,
		info,
	) => {
		if (info.error) {
			onError(info.error)
			return
		}

		setIsLoading(true)

		try {
			await billUser({
				storage,
				source: info.token?.id,
			})

			alert('Your card has been charged successfully!')
			nav('/')
		} catch (error) {
			onError(error)
			setIsLoading(false)
		}
	}

	return (
		<div className='Settings'>
			<Elements
				stripe={stripePromise}
				options={{
					fonts: [
						{
							cssSrc: 'https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800',
						},
					],
				}}
			>
				<BillingForm
					isLoading={isLoading}
					onSubmit={handleFormSubmit}
				/>
			</Elements>
		</div>
	)
}
