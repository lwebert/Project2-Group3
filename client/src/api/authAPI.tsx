import type { UserLogin } from '../interfaces/UserLogin';

const login = async (userInfo: UserLogin) => {
  try {
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error('User information not retrieved, check network tab!');
    }

    return data;
  } catch (err) {
    console.log('Error from user login: ', err);
    return Promise.reject('Could not fetch user info');
  }
};

const signup = async (userInfo: UserLogin) => {
  try {
    const response = await fetch('/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    });

    const data = await response.json(); // is the token

    if (!response.ok) {
      throw new Error('Error creating user, please try again.');
    }

    return data;
  } catch (err) {
    console.log('Error from user signup: ', err);
    return Promise.reject('Could not create user');
  }
};

export { login, signup };
