import { Pinecone } from '@pinecone-database/pinecone';

export const pc = new Pinecone({ apiKey: process.env.PINECONE_KEY });