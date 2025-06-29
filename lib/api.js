const API_URL = "https://script.google.com/macros/s/AKfycbzm3MrvKRQy75IMnHosYHC1zHvIIxq-kf53ZwV9J2YatrP6C90MCO7JJHjSFxOnQdle/exec";

// 📤 Envoyer un nouveau ticket
export async function createTicket(ticketData) {
  const response = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({
      type: "create_ticket",
      data: ticketData
    }),
    headers: {
      "Content-Type": "application/json"
    }
  });
  return response.json();
}

// 📥 Récupérer tous les tickets (pour admin ou filtré côté client)
export async function getTickets(email = null) {
  const response = await fetch(API_URL + `?type=get_tickets${email ? `&email=${email}` : ''}`);
  return response.json();
}

// 📌 Mettre à jour un ticket (ex : statut, discussion…)
export async function updateTicket(ticketData) {
  const response = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({
      type: "update_ticket",
      data: ticketData
    }),
    headers: {
      "Content-Type": "application/json"
    }
  });
  return response.json();
}
