function parseEnv() {
    const envVariables = process.env;

    const rssEnvVariables = Object.entries(envVariables).filter(([key, value]) => key.startsWith('RSS_'));

    rssEnvVariables.forEach(([key, value]) => {
        console.log(`RSS_${key}=${value};`);
    });
}
parseEnv();
