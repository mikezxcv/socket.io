import pg from "pg";
const { Pool } = pg;
import dotenv from "dotenv";
dotenv.config(); //

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,

  ssl: {
    rejectUnauthorized: false,
  },
});

const get = (req, res) => {
  res.status(200).send("Hello From Get");
};
const post = (req, res) => {
  res.status(200).send("Hello From Post");
};

const getDocumentosGenerales = async (req, res) => {
  try {
    console.log("getDocumentosGenerales");
    console.log(req.query)
    const { id_documento} = req.query;

    const result = await pool.query(
      "SELECT g.* FROM public.generales g JOIN public.documento_generales doc_gen ON g.id = doc_gen.generales_id where doc_gen.documento_id = $1",
      [id_documento]
    );

    console.log("Leido exitosamente");
    const response = result.rows;
    console.log(result.rows);

    // res.status(200).json(response.map((item) => item.data_generales) || undefined );
    res.status(200).json(response);
  } catch (error) {
    console.error("Error al leer:", error);
    res.status(500).json({ error: "Error al obtener los documentos generales" });
  }
};


export { get, post, getDocumentosGenerales };
