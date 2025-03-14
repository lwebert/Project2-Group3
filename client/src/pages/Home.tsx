//Lauren
import { useState, useEffect, useLayoutEffect } from 'react';
import { retrieveUsers } from '../api/userAPI';
import type { UserData } from '../interfaces/UserData';
import ErrorPage from './ErrorPage';
import auth from '../utils/auth';

import FoodtruckForm from '../components/FoodtruckForm';
import FoodtruckDisplay from '../components/FoodtruckDisplay';
import { retrieveOwnerFoodtruck } from '../api/foodtruckAPI';
import FoodtruckData from '../interfaces/FoodtruckData';

const Home = () => {
	const [users, setUsers] = useState<UserData[]>([]);
	const [error, setError] = useState<boolean>(false);
	const [loginCheck, setLoginCheck] = useState<boolean>(false);
	const [hasFoodtruck, setHasFoodtruck] = useState<boolean>(false);
	const [userId, setUserId] = useState<number | null>(null);
	const [foodTruck, setFoodtruck] = useState<FoodtruckData | undefined>(
		undefined
	);

	useEffect(() => {
		if (loginCheck) {
			fetchUsers(); //grabs all users, sets to users state variable

			const loggedInUser = auth.getProfile();

			if (
				!loggedInUser ||
				!loggedInUser.id ||
				typeof loggedInUser.id !== 'number'
			) {
				console.error('Error retrieving logged in user information');
				return;
			} else {
				setUserId(loggedInUser.id);
				foodtruckcheck(loggedInUser.id);
			}
		}
	}, [loginCheck]);

	//Listens for FoodtruckForm.tsx handleSubmit event here
	const foodtruckSubmit = () => {
		setHasFoodtruck(true);
	};

	useLayoutEffect(() => {
		checkLogin();
	}, []);

	const checkLogin = () => {
		if (auth.loggedIn()) {
			console.log('logged in!');
			setLoginCheck(true);
		}
	};

	const foodtruckcheck = async (userid: number) => {
		try {
			const foodtruckData = await retrieveOwnerFoodtruck(userid);
			console.log('Retreive owner foodtruck data: ', foodtruckData);

			if (!foodtruckData) {
				setHasFoodtruck(false);
			} else {
				setFoodtruck(foodtruckData);
				setHasFoodtruck(true);
			}
		} catch (err) {
			console.error(
				'Error retrieving food truck data from user id.',
				err
			);
		}
	};

	const fetchUsers = async () => {
		try {
			const data = await retrieveUsers();
			setUsers(data);
			console.log('Users: ', users);
		} catch (err) {
			console.error('Failed to retrieve tickets:', err);
			setError(true);
		}
	};

	if (error) {
		return <ErrorPage />;
	}

	return (
		<>
			{!loginCheck ? (
				<div className="login-notice">
					<h1 className="hp-Title ">
						Foodtrucks coming to your area!
					</h1>
					<div className="hp-container">
						<div className="hp-card1">
							<h2>Monday</h2>
							<ul className="">
								<li className="hp-card-li">Matthew's Foodtruck</li>
								<li className="hp-card-li">Alices Foodtruck</li>
								<li className="hp-card-li">John's Foodtruck</li>
							</ul>
						</div>
						<div className="hp-card2">
						<h2>Tuesday</h2>
							<ul>
								<li className="hp-card-li">Mimi's Comfort Food</li>
								<li className="hp-card-li">Bob's Foodtruck</li>
							</ul>
						</div>
						<div className="hp-card3">
						<h2>Wednesday</h2>
							<ul>
								<li className="hp-card-li">Adams Appetizers</li>
								<li className="hp-card-li">John's Foodtruck</li>
								<li className="hp-card-li">Miya Moon</li>
							</ul>
						</div>
						<div className="hp-card4">
						<h2>Thursday</h2>
							<ul>
								<li className="hp-card-li">Taco's Locos</li>
								<li className="hp-card-li">Alice's Foodtruck</li>
								<li className="hp-card-li">Sam's Spaghetti Truck</li>
							</ul>
						</div>
						<div className="hp-card5">
						<h2>Friday</h2>
							<ul>
								<li className="hp-card-li">El Jefe</li>
								<li className="hp-card-li">Jims's Jimmies</li>
							</ul>
						</div>
					</div>
				</div>
			) : hasFoodtruck ? (
				<FoodtruckDisplay userId={userId} foodTruck={foodTruck} />
			) : (
				<FoodtruckForm
					userId={userId}
					foodtruckSubmit={foodtruckSubmit}
				/>
			)}
		</>
	);
};

export default Home;
