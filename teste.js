// index.js
import oracledb from "oracledb";
import dotenv from "dotenv";
import fs from "fs";


// carrega variáveis do prd.env
dotenv.config({ path: "./prd.env" });

async function run() {
  const connection = await oracledb.getConnection({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    connectString: process.env.DB_CONNECTION_STRING
  });




  // SELECT 1: clientes
  const clientes = await connection.execute(
    `SELECT id, nome, contato, cadastro FROM cliente`,
    [],
    { outFormat: oracledb.OUT_FORMAT_OBJECT }
  );
  //console.table(clientes.rows);



  // SELECT 2: galeria_foto
  const fotos = await connection.execute(
    `SELECT id, titulo, descricao, favorita, created_at, updated_at FROM galeria_foto`,
    [],
    { outFormat: oracledb.OUT_FORMAT_OBJECT }
  );
  //console.table(fotos.rows);

  
  
  const titulos = fotos.rows.map(r => r.TITULO); // em minúsculas porque alias
  console.log("Lista de títulos:", titulos);


//gerando json
const titulos2 = [ "Lua", "Minha primeira foto" ];
const json = titulos2.map(t => ({ nome: t }));

console.log(JSON.stringify(json, null, 2));

const conteudo = JSON.stringify(json, null, 2);
//cria um arquivo JSON
await fs.promises.writeFile("saida.json", conteudo, "utf8");

console.log("Arquivo 'saida.json' criado com sucesso!");



const texto = "Felipe Domingues";
//console.log(texto.substring(0, 6)); // "Felipe"
let v = texto.slice(0, 6);
let v2 = texto.substring(0,2)
let arr = titulos[1];
arr = arr.substring(0,1);
//if (arr.length >2) console.log('ok');
//else console.log(arr);

for (let i=0; i<titulos.length; i++) {
  let t = titulos[i];
  console.log(t.substring(0,1));
}

  await connection.close();
}

run().catch(err => console.error("Erro:", err));

