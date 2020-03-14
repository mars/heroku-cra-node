import React from 'react';
import { useForm } from 'react-hook-form';
import './styles.css';

export function RegisterForm() {
	const { register, errors, handleSubmit, watch } = useForm();
	const onSubmit = async data => {
		const response = await fetch('/api/register', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data)
		});

		console.log(response)
	};
	const isHelpProvider = watch('helpProvider', false);

	return (
		<div className="RegisterForm">
			<form onSubmit={handleSubmit(onSubmit)}>
				<label htmlFor="role">Olen abi pakkuja</label>
				<input type="checkbox" name="helpProvider" ref={register} />
					<br />
				<label htmlFor="phoneNumber">Telefoni number</label>
				<input
					type="number"
					name="phoneNumber"
					placeholder="55331312"
					ref={register({
						required: 'Palun sisestage telefoni number',
						minLength: {
							minValue: 5,
							message: 'Miinimum pikkus on 5',
						},
					})}
				/>
				<br />
					{errors.phoneNumber && errors.phoneNumber.message}
				<br />
				{!isHelpProvider && (
					<div>
					<label htmlFor="need">Abivajaduse kirjeldus</label>
						<textarea rows="4" cols="50"
						name="need"
						placeholder="Olen Tartus karantiinis ja ei saa liikuda. 
							Mul on vaja, et keegi Kohilas mu koertele süüa viiks."
						ref={register({
							required: 'Abivajaduse kirjeldus on nõutud',
							minLength: {
								value: 25,
								message: 'Sisestage vähemalt 25 tähemärki.',
							},
						})}
					/>
					<br />
						{errors.need && errors.need.message}
					<br />
					</div>
				)}
				
				<label htmlFor="location">Asukoht</label>
				<input
					name="location"
					placeholder="Hageri, Kohila vald"
					type="text"
					ref={register({
						required: 'Palun sisestage asukoht',
						minLength: {
							value: 5,
							message: 'Asukoht peaks olema vähemalt 5 tähemärki.',
						},
					})}
				/>
					<br />
						{errors.location && errors.location.message}
					<br />

				{isHelpProvider && (
					<div>
					<label htmlFor="helpGivingRadius">Abistamise raadius</label>
					<select name="helpGivingRadius" ref={register}>
						<option value="2">2</option>
						<option value="5">5</option>
						<option value="10">10</option>
						<option value="25">25</option>
						<option value="all">Üle Eesti</option>
					</select>
					<br />
					</div>)}
				
			
				<button type="submit">Salvesta</button>
			</form>
		</div>
	);
}