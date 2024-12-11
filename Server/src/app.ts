import express from "express";
import {json} from "body-parser";

const App = express();
App.use(json());

export default App;