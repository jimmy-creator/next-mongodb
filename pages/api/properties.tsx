import type { NextApiRequest,NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";

export default async (req: NextApiRequest, res: NextApiResponse<string>) =>{
    const mongoClient = await clientPromise;

    const data = await mongoClient.db().collection('nft-collection').find().toArray()
    data.map((idx,val)=>{
        console.log(val,idx.tokenId)
    })
    res.status(200).json(JSON.parse(JSON.stringify(data)));
};