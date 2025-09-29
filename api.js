// api.js
import axios from "axios";

/**
 * Envia dados para API de teste (httpbin).
 * @param {Array|Object} payload - JSON que será enviado
 * @returns {Object} resposta da API
 */
export async function enviarParaApi(payload) {
  try {
    const response = await axios.post("https://httpbin.org/post", payload, {
      headers: { "Content-Type": "application/json" }
    });
    return response.data;
  } catch (err) {
    console.error("Erro ao enviar para API:", err.message);
    throw err;
  }
}
