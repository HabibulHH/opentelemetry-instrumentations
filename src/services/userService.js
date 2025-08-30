
const cache = require('../utils/cache');
const userRepository = require('../repositories/userRepository');

class UserService{

    async createUser(data){
       const user = await userRepository.create(data);
       await cache.set(`user:${user.id}`, user);
       return user;
    }

    async getUserById(id){
        const user = await cache.get(`user:${id}`);
        if(!user){
            const user = await userRepository.findById(id);
            await cache.set(`user:${id}`, user);
        }
        return user;
    }

    async updateUser(id, data){
        const user = await userRepository.update(id, data);
        if(!user){
            throw new Error('User not found');
        }
        await cache.set(`user:${id}`, user);
    }
    async deleteUser(id) {
        // delete user from db
        const result = await userRepository.delete(id);
        if (!result) {
            throw new Error('User not found');
        }
        // delete user from cache
        await cache.del(`user:${id}`);
        return result;
    }
    async getAllUsers(){
        const users = await userRepository.findAll();
        return users;
    }
}

module.exports = new UserService();