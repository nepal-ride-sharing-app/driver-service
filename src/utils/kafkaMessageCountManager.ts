import fs from 'fs';
import path from 'path';

const countFilePath = path.resolve(__dirname, '../../data/kafka_message_count.json');

export const getCount = (): number => {
    if (fs.existsSync(countFilePath)) {
      const data = fs.readFileSync(countFilePath, 'utf-8');
      const { count } = JSON.parse(data);
      return count;
    } else {
      // Create the file with an initial count of 1 if it does not exist
      const initialCount = 0;
      fs.writeFileSync(countFilePath, JSON.stringify({ count: initialCount }), 'utf-8');
      return initialCount;
    }
  };
  

export const incrementCount = (): number => {
  const currentCount = getCount();
  const newCount = currentCount + 1;
  fs.writeFileSync(countFilePath, JSON.stringify({ count: newCount }), 'utf-8');
  return newCount;
};
