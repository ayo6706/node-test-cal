import express from "express";
import routes from "./routes";


const app = express();

app.use(express.json());

routes(app)
app.listen(3000, "localhost", async () => {

    console.log(`Server listing at http://localhost:3000`);
    

});


