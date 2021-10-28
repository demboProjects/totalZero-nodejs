import { sign } from "jsonwebtoken";
import User from "../schemas/User";
import { compare } from "bcryptjs";

class SessionController {

    async create(request, response) {
        const { username, password } = request.body;

        // busando o usario pelo usernam no BD
        const user = await User.findOne({
            username
        });

        if (!user) {
            return response.status(404).json({ error: "user not found" });
        }

        const matchPassword = await compare(password, user.password);

        if (!matchPassword) {
            return response.status(404).json({ error: "Incurret password or username" });
        }

        // const user_id = JSON.stringify(user._id);

        const token = sign({}, "6cf95d5af0d4ebd604f456edf6694f15", {
            subject: new String(user._id),
            expiresIn: "1d"
        });

        return response.json({
            token,
            user
        })

    }

}

export default new SessionController();