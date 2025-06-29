const handleSave = async (index) => {
  const user = users[index];

  try {
    // Envoi vers Google Sheets
    const response = await fetch('https://script.google.com/macros/s/TON_URL_APP_SCRIPT/exec', {
      method: 'POST',
      body: JSON.stringify({
        action: 'updateUser',
        email: user.Email,
        role: user.Role,
        actif: user.Actif === true || user.Actif === 'true' ? 'true' : 'false',
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();
    console.log('Sheets updated:', result.message);
  } catch (error) {
    console.error('Erreur lors de la sauvegarde Google Sheets :', error);
  }
};
