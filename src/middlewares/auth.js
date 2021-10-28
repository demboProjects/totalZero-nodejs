import { verify } from 'jsonwebtoken';

export default async (request, response, next) => {

    const authHeader = request.headers.authorization;

    if (!authHeader) {
        return response.status(401).json({ error: "user not authorizated" });
    }

    // bear tokennnkhiufejqiuqr

    const [, token] = authHeader.split(" ");

    try {
        const decode = verify(token, "6cf95d5af0d4ebd604f456edf6694f15");
        // console.log(decode);
        return next();
    } catch (error) {
        return response.status(401).json({ error: "jwt token invalid" });
    }

}