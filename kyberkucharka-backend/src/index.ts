import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import recipeRoutes from "./routes/recipeRoutes";
import {
  createTables,
  dropTables,
  getIngredients,
  initTables,
  printAllUsers,
} from "./databaseFunctions";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

dropTables().then(() => createTables()).then(()=> initTables()).then(async ()=> {const a = await getIngredients(); console.log(a)});
//initTables();

app.use(cors());
app.use(express.json());
app.use("/api", recipeRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("This is an API server. If you are seeing this message, you are not in the correct place. Use /api/<something> to interact with this server, or just use Postman or something similar.");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});