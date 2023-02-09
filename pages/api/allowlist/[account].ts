import type { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import { promises as fs } from 'fs';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { account } = req.query;

  if (!account) {
    res.status(400).json({ error: 'No account passed' });
    return;
  }

  const lowerCaseAccount = account.toString().toLowerCase();

  // link to folder in root called 'proofs'
  const jsonDirectory = path.join(process.cwd(), 'proofs');

  try {
    const merkleJson = await fs.readFile(
      jsonDirectory + `/${lowerCaseAccount}.json`,
      'utf8',
    );

    console.log('merkleJson', merkleJson);

    res.status(200).json(merkleJson);
  } catch (error) {
    res.status(404).json({ error: 'Not found' });
  }
}
