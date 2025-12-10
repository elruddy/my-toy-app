import { useState, useEffect } from 'react';
import { userService } from '../services/user.service.js';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

export function LoginForm({ onLogin, isSignup }) {
	const [credentials, setCredentials] = useState(
		userService.getEmptyCredentials()
	);

	// Dynamic schema (fixes signup/login logic)
	const validationSchema = Yup.object().shape({
		username: Yup.string()
			.min(2, 'Too Short!')
			.max(50, 'Too Long!')
			.required('Required'),
		password: Yup.string()
			.min(8, 'Password should be at least 8 characters')
			.required('Password is required'),
		...(isSignup && {
			fullname: Yup.string()
				.min(2, 'Too Short!')
				.max(50, 'Too Long!')
				.required('Required'),
		}),
	});

	return (
		<section className="myForm">
			<Formik
				initialValues={{ username: '', password: '', fullname: '' }}
				validationSchema={validationSchema}
				onSubmit={(values) => {
					onLogin(values);
					setCredentials(values);
				}}
			>
				{({ values, errors, touched }) => {
					useEffect(() => {
						setCredentials(values);
					}, [values]);

					return (
						<Form>
							<Field name="username" placeholder="User name" />
							{errors.username && touched.username && (
								<div className="error">{errors.username}</div>
							)}

							<Field name="password" type="password" placeholder="Password" />
							{errors.password && touched.password && (
								<div className="error">{errors.password}</div>
							)}

							{isSignup && (
								<>
									<Field name="fullname" placeholder="Full name" />
									{errors.fullname && touched.fullname && (
										<div className="error">{errors.fullname}</div>
									)}
								</>
							)}

							<button type="submit">{isSignup ? 'Signup' : 'Login'}</button>
						</Form>
					);
				}}
			</Formik>
		</section>
	);
}
