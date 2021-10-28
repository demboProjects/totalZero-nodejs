import User from "../schemas/User";
import { hash } from "bcryptjs";

class UserController {

    async create(request, response) {

        const { name, email, username, password, phone } = request.body

        const userData = await User.findOne({
            username
        });


        if (userData) {

            const veryUserExists = userData.username === username;

            if (veryUserExists) {
                return response.status(400).json({ error: "bad request" });
            }
        }


        const passwordCrypt = await hash(password, 8);


        const user = await User.create({
            name,
            email,
            username,
            password: passwordCrypt,
            phone
        })

        return response.json(user);
    }

    async index(request, response) {

        const users = await User.find();

        return response.json(users);
    }

}

export default new UserController;