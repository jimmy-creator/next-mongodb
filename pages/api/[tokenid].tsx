import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { tokenid } = req.query;

  const mongoClient = await clientPromise;
  const collection = mongoClient.db().collection("nft-collection");

  // Create a unique index on the tokenId field
  await collection.createIndex({ tokenId: 1 }, { unique: true });

  // Find the document with the matching tokenId
  const data = await collection.findOne({ tokenId: parseInt(tokenid as string, 10) });

  res.status(200).json(data);
};
