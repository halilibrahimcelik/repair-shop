import 'dotenv/config';
import { drizzle } from 'drizzle-orm/neon-http';
import { eq } from 'drizzle-orm';
import { postsTable, usersTable } from './schema';

const db = drizzle(process.env.DATABASE_URL!);

async function main() {
  const user: typeof usersTable.$inferInsert = {
    name: 'John',
    age: 30,
    email: 'john@example.com',
  };

  await db.insert(usersTable).values(user);
  console.log('New user created!');

  const users = await db.select().from(usersTable);
  console.log('Getting all users from the database: ', users);
  /*
  const users: {
    id: number;
    name: string;
    age: number;
    email: string;
  }[]
  */

  await db
    .update(usersTable)
    .set({
      age: 31,
    })
    .where(eq(usersTable.email, user.email));
  console.log('User info updated!');

  // await db.delete(usersTable).where(eq(usersTable.email, user.email));
  // console.log('User deleted!');
}

//main();

// const registerWithSameEmail = async () => {
//   try {
//     await db.insert(usersTable).values({
//       name: 'aa',
//       age: 222,
//       email: 'john@example.com',
//     });
//   } catch (error) {
//     console.log(error);
//     console.log('same email error');
//   }
// };
//registerWithSameEmail();

const createNewPost = async () => {
  try {
    await db.insert(postsTable).values({
      content: 'this is a new post',
      id: 12,
      title: 'new post',
      userId: 2,
      createdAt: new Date(),
    });
  } catch (error) {
    console.log(error);
  }
};
createNewPost();
