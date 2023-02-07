import mongoClient from "@/lib/mongoClient";

import { NextApiRequest, NextApiResponse } from "next";

import { SignUpRequestBody } from "@/interfaces/auth";

interface SignUpRequest extends NextApiRequest {
  body: SignUpRequestBody;
}

export default async function handler(
  req: SignUpRequest,
  res: NextApiResponse
) {
  let client;

  try {
    client = await mongoClient.connect();
  } catch (err) {
    res.status(500).json({ error: err });
    client?.close();
    return;
  }

  const db = client.db("user");

  const user = await db
    .collection("userProfile")
    .findOne({ email: req.body.email });

  if (user) {
    res.status(503).json({ error: { message: "User already exists" } });
    client.close();
    return;
  }

  try {
    await db.collection("userProfile").insertOne(req.body);

    res.status(201).json({ data: req.body });
  } catch (err) {
    res.status(503).json({ error: err });
  }

  client.close();
}
