export async function Log(stack, level, pkg, message, extra = {}) {
  const payload = {
    stack,
    level,
    package: pkg,
    message,
    timestamp: new Date().toISOString(),
    ...extra,
  };

  try {
    const response = await fetch('http://20.244.56.144/evaluation-service/logs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer <YOUR_TOKEN_HERE>'
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      console.log('[LOG SENT]', payload);
    } else {
      const errorText = await response.text();
      console.error('[SERVER ERROR]', response.status, errorText);
    }
  } catch (err) {
    console.error('[LOGGING ERROR]', err);
  }
}
