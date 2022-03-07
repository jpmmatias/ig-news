import { NextApiRequest, NextApiResponse } from "next";
export default function (request: NextApiRequest, response:NextApiResponse) {
    const users = [
        {id:1, name:'João'},
        {id:2, name:'Pedro'},
        {id:3, name:'Matias'}
    ]

    return response.json(users);
}