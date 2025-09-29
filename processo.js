// teste.js (ESM)
import oracledb from "oracledb";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config({ path: "./prd.env" });

/**
 * Classe que encapsula consultas e entrega JSON pronto.
 * Observação: com OUT_FORMAT_OBJECT, o Oracle retorna chaves em MAIÚSCULAS (ID, TITULO, etc.).
 */
export class GaleriaService {
  constructor({
    user = process.env.DB_USER,
    password = process.env.DB_PASSWORD,
    connectString = process.env.DB_CONNECTION_STRING,
  } = {}) {
    this.cfg = { user, password, connectString };
  }

  /** Conexão sempre fechada, mesmo em caso de erro */
  async #withConnection(fn) {
    let conn;
    try {
      conn = await oracledb.getConnection(this.cfg);
      return await fn(conn);
    } finally {
      if (conn) {
        try { await conn.close(); } catch (e) { console.error("Erro ao fechar conexão:", e); }
      }
    }
  }

  /** Exemplo: retorna clientes como JSON (array de objetos) */
  async listarClientesJSON() {
    return this.#withConnection(async (connection) => {
      const result = await connection.execute(
        `SELECT id, nome, contato, cadastro FROM cliente`,
        [],
        { outFormat: oracledb.OUT_FORMAT_OBJECT }
      );
      // Se quiser normalizar nomes das chaves, faça o mapeamento aqui.
      return (result.rows || []).map(r => ({
        id: r.ID,
        nome: r.NOME,
        contato: r.CONTATO,
        cadastro: r.CADASTRO,
      }));
    });
  }

  /** Retorna fotos como JSON (array de objetos) */
  async listarFotosJSON() {
    return this.#withConnection(async (connection) => {
      const result = await connection.execute(
        `SELECT id, titulo, descricao, favorita, created_at, updated_at FROM galeria_foto`,
        [],
        { outFormat: oracledb.OUT_FORMAT_OBJECT }
      );
      return (result.rows || []).map(r => ({
        id: r.ID,
        titulo: r.TITULO ?? null,
        descricao: r.DESCRICAO ?? null,
        favorita: r.FAVORITA === 1 || r.FAVORITA === true,
        createdAt: r.CREATED_AT,
        updatedAt: r.UPDATED_AT,
      }));
    });
  }

  /** Apenas os títulos (string[]) */
  async listarTitulos() {
    const fotos = await this.listarFotosJSON();
    return fotos.map(f => f.titulo).filter(Boolean);
  }

  /** Gera e salva um JSON simples de nomes a partir de um array de títulos */
  async salvarTitulosComoJSON(caminho = "saida.json") {
    const titulos = await this.listarTitulos();
    const json = titulos.map(t => ({ nome: t }));
    const conteudo = JSON.stringify(json, null, 2);
    await fs.promises.writeFile(caminho, conteudo, "utf8");
    return { caminho, total: json.length };
  }

  /** Utilitário: fatia os títulos e retorna suas primeiras letras (debug/uso interno) */
  async primeirasLetrasTitulos(qtd = 1) {
    const titulos = await this.listarTitulos();
    return titulos.map(t => (t ?? "").substring(0, qtd));
  }
}
