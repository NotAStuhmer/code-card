import express from 'express';
import { createClient } from '@supabase/supabase-js'
import cors from 'cors';

const supabaseUrl = 'https://ysixmugojpkfxxhsfcjh.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

//initialize the express app
const app = express();
const PORT = 3000;

//midlewares
app.use(cors()); //enable cors for all routes
app.use(express.json()); //parse json request bodies

//Get all Cards
app.get('/snippets', async (req, res) => {
    try{
        const { data, error } = await supabase
        .from('snippets')
        .select('*');
        if (error) throw error;
        res.status(200).json(data)
    } catch {
        res.status(500).json({error: error.message})
    }
});

//Get Specific Question by ID
app.get("/snippets", async (req, res) => {
    try {
        const {data, error} = await supabase
        .from('snippets')
        .select("*");
        .eq('id', id)
        .single ();

    if (error) throw error;

    if (!data) {
        return res.status(404).json({error: "Card not found"})
    }
    res.status(200).json(data);
    } catch {
        res.status(500).json({error: error.message})
    }
})


//Create New Card
app.post("/snippet", async (req, res) => {
    try {
        const { data, error } = await supabase


    } catch {

    }
})



//error handling middlewares
app.use(err, req, res, next) => {
    console.log(err)
    res.status(500).send("Global Error")
}

//listening port
app.listen(PORT, () + {
    console.log(`Server is running on port ${PORT}`)
})
