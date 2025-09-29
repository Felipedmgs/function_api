// index.js (ESM)
import { GaleriaService } from "./processo.js";
import * as utils from "./functions.js";
import { enviarParaApi } from "./api.js";
import fs from "fs";

async function run() {
  try {
    // Se preferir, pode passar as credenciais manualmente no construtor
    const galeria = new GaleriaService();

    // (A) Recebe JSON de fotos
    //const fotosJSON = await galeria.listarFotosJSON();
    //console.log("Fotos (JSON):", fotosJSON);

    // (B) Recebe títulos
    const titulos = await galeria.listarTitulos();
    console.log("Títulos:", titulos);

    // (C) Salva um JSON derivado dos títulos
   // const nomeArquivo = "export" + utils.get_data() + ".json"; //concatena data
    const nomeArquivo = "export.json";
    const info = await galeria.salvarTitulosComoJSON(nomeArquivo);
    console.log(`Arquivo '${info.caminho}' criado com ${info.total} registros.`);

    //chmando api, passando dados


    const resposta = await enviarParaApi(titulos); //dados da variavel

    const conteudo = await fs.promises.readFile("export.json", "utf8");//lendo dados direto ro arquivo json
    const dados = JSON.parse(conteudo);
    console.log("Resposta recebida:", dados);

    // (D) Exemplo: primeiras letras de cada título
    //const iniciais = await galeria.primeirasLetrasTitulos(1);
    //console.log("Iniciais:", iniciais);

    // (E) Clientes também como JSON
    //const clientes = await galeria.listarClientesJSON();
    //console.log("Clientes (JSON):", clientes);
  } catch (err) {
    console.error("Erro:", err);
  }
}

run();
