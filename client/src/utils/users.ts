import AuthService from './auth';
import { User } from '../../../server/src/models/user';

class UsersService {
	async getUserIdByEmail() {
		// const profile = AuthService.getProfile();
		// if (!profile || !profile.username) {
		// 	throw new Error('Profile not found.');
		// }
		// const user = await User.findOne({
		// 	where: {
		// 		username: profile.username,
		// 	},
		// });
		// if (!user) {
		// 	throw new Error('User not found.');
		// }
		// return user.id;
	}
}

export default new UsersService();
