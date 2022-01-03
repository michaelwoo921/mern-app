import mongoose from 'mongoose';

export function checkObjectId(id: string) {
  // check id is a valid object id
  return (req: any, res: any, next: Function) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ msg: 'invalid ID' });
    }
    next();
  };
}
