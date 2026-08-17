export async function generatePlayerBio(playerName: string, stats: any): Promise<string> {
  try {
    const prompt = `Generate a 2-sentence basketball player bio for ${playerName} with PPG: ${stats.ppg}, RPG: ${stats.rpg}, APG: ${stats.apg}. Keep it under 100 characters.`;
    const response = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      body: JSON.stringify({ model: 'llama2', prompt, stream: false }),
    });
    const data = await response.json();
    return data.response || 'Rising basketball star.';
  } catch (e) {
    return 'Basketball player building their legacy.';
  }
}

export async function generateHighlightCaption(title: string): Promise<string> {
  try {
    const prompt = `Create a 1-line highlight caption for: "${title}". Keep it under 50 characters and exciting.`;
    const response = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      body: JSON.stringify({ model: 'llama2', prompt, stream: false }),
    });
    const data = await response.json();
    return data.response || title;
  } catch (e) {
    return title;
  }
}
