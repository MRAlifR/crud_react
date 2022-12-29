import axios from 'axios';

const springApi = axios.create({
	baseURL: 'http://localhost:8080/api/v1',
});

const createUser = async (user) => {
	await springApi.post('/users', user);
};

const editUser = async (user) => {
	await springApi.put(`/users/${user.userid}`, user);
};

const deleteUser = async (user) => {
	await springApi.delete(`/users/${user.userid}`);
};

const fetchUsers = async () => {
	const payload = await springApi.get('/users');
	const users = payload.data;
	return users;
};

export {
	springApi,
	createUser,
	editUser,
	deleteUser,
	fetchUsers
};
