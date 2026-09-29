export async function generatePortfolioInsights(portfolioData: string, customApiKey?: string): Promise<string> {
  const apiKey = customApiKey || 
                 (import.meta as any).env?.VITE_GEMINI_API_KEY || 
                 (import.meta as any).env?.GEMINI_API_KEY || 
                 localStorage.getItem('pearlport_gemini_api_key') || '';

  if (!apiKey || apiKey === 'YOUR_GEMINI_API_KEY_HERE') {
    return [
      "AI Insights Unavailable",
      "",
      "Please configure your Gemini API Key in the application settings or .env file to enable AI-powered portfolio insights, anomaly detection, and rebalancing suggestions."
    ].join('\n');
  }

  const prompt = `
You are an expert financial advisor AI. I will provide you with a user's current investment portfolio data (equities, fixed deposits, crypto, etc.) in JSON format.

Based on this data, provide the following insights:
1. **Portfolio Health Score**: Provide a score out of 100 based on diversification, asset allocation, and risk.
2. **Anomaly Detection**: Identify any unusual concentrations (e.g., too much weight in one sector or asset), underperforming assets, or risks.
3. **Watchlist & Price Targets**: Based on the existing equities, suggest 2-3 logical watchlist additions in similar or complementary sectors, along with basic rationale.
4. **Rebalancing Suggestions**: Suggest concrete actions to balance the portfolio (e.g., "sell X to buy Y", "increase fixed-income allocation").

Format the response in plain text with clear spacing. Use uppercase headers and hyphen bullet points. Do NOT use markdown symbols like asterisks or hash symbols, as the UI does not parse markdown.

Portfolio Data:
${portfolioData}
`.trim();

  const body = {
    contents: [
      {
        parts: [{ text: prompt }]
      }
    ],
    generationConfig: {
      temperature: 0.7
    }
  };

  try {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    if (res.status === 429) {
      return "AI Insights Unavailable: You have exceeded your Gemini API quota or rate limit. If you are on the free tier, please wait a moment and try again.";
    }

    if (!res.ok) {
      const errText = await res.text();
      return `Failed to generate insights. Error code: ${res.status}\n${errText}`;
    }

    const data = await res.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    return text || "No response received from Gemini.";
  } catch (e: any) {
    return `Network error occurred while fetching AI insights: ${e?.message || e}`;
  }
}
