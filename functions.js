

// Exemplo 1: retorna data formatada estilo PHP "Ymd"
export function get_data() {
  const agora = new Date();
  const ano  = agora.getFullYear();
  const mes  = String(agora.getMonth() + 1).padStart(2, "0");
  const dia  = String(agora.getDate()).padStart(2, "0");
  return `${ano}${mes}${dia}`;  // ex: 20250928
}

// Exemplo 2: retorna data + hora completa
export function get_data_hora() {
  const agora = new Date();
  const ano  = agora.getFullYear();
  const mes  = String(agora.getMonth() + 1).padStart(2, "0");
  const dia  = String(agora.getDate()).padStart(2, "0");
  const hora = String(agora.getHours()).padStart(2, "0");
  const min  = String(agora.getMinutes()).padStart(2, "0");
  const seg  = String(agora.getSeconds()).padStart(2, "0");
  return `${ano}-${mes}-${dia} ${hora}:${min}:${seg}`;
}